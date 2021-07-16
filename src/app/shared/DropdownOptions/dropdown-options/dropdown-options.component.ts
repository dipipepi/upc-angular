import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ERROR_CODE, KEY_CODE, BROWSERS} from '../../../constants';
import * as _ from 'lodash';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {DirectiveUtilsService} from '../../services/DirectiveUtilsService/directive-utils.service';

@Component({
  selector: 'app-dropdown-options',
  templateUrl: './dropdown-options.component.html',
  styleUrls: ['./dropdown-options.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownOptionsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() attr;
  @Input() name;
  @Input() toggled;
  @Input() baseOptions;
  @Input() externalClass: string;
  itemClicked = false;
  el: any;
  isListenersExists = false;
  isClipboardInitialized = false;
  currentItem: number;
  isDesktop: boolean;
  currentSecondItem: any;
  translatedName: string;
  positions: any;
  options: any;
  disabled: any;
  mobileSafariStyle: any;
  private element: any;

  constructor(public customDeviceDetector: CustomDeviceDetectorService,
              private directiveUtils: DirectiveUtilsService,
              private elRef: ElementRef) {
    this.disabled = elRef.nativeElement.getAttribute('disabled') === null ? null : !!elRef.nativeElement.getAttribute('disabled');
  }

  ngOnInit(): void {
    if (this.name) {
      this.translatedName = this.name || '';
    }

    this.options = _.cloneDeep(this.baseOptions);

    this.currentItem = 0;

    this.isDesktop = this.customDeviceDetector.isDesktop();

    this.translatedName = '';

  }

  private onScroll = (event) => {
    if (!this.el || !this.el[0].contains(event.target)) {
      this.toggled = false;
      document.removeEventListener('scroll', this.onScroll, true);
    }
  }

  private onClick = (e) => {
    if (e.target.className !== 'ie-fix' && e.target.className.indexOf('dropdown-item') === -1) {
      this.toggled = false;
      if (this.options[this.currentItem].hover) {
        this.options[this.currentItem].hover = false;
      }
      this.currentItem = 0;
      this.currentSecondItem = undefined;
    }
    this.itemClicked = !this.itemClicked;
  }

  private removeListeners(element) {
    this.toggled = false;

    if (element[0]) {
      element[0].removeAttribute('tabIndex');
      element.unbind('click');
      element.unbind('keydown');
    }

    document.removeEventListener('click', this.onClick, true);
    this.isListenersExists = false;
  }

  private addListeners(element) {
    if (this.isListenersExists) {
      return;
    }
    this.isListenersExists = true;

    element[0].tabIndex = 0;

    document.addEventListener('click', this.onClick, true);

    element.bind('click', (e) => {
      if (this.options[this.currentItem].hover) {
        this.options[this.currentItem].hover = false;
        this.currentSecondItem = undefined;
      }
      if (e.target.className === 'ie-fix') {
        // toggle menu
        if(window.localStorage.selectedType === ERROR_CODE.JOIN.AUDIO_VIDEO_PRESENTATION){
          this.currentItem = 0;
        }
        else if(window.localStorage.selectedType === ERROR_CODE.JOIN.AUDIO_PRESENTATION){
          this.currentItem = 1;
        }
        else if(window.localStorage.selectedType === ERROR_CODE.JOIN.PRESENTATION_ONLY){
          this.currentItem = 2;
        }
        else{
          this.currentItem = 0;
        }

        this.toggled = !this.toggled;
      } else if (e.target.tagName === 'UL') {
        // case for mobile view when UL has fullscreen size
        this.toggled = false;
      } else if (e.target.tagName !== 'LI') {
        // case when click on button and invoke first menu handler
        // 2d argument indicates it, dont remove - it is in use
        // TODO: think about how to make possible to specify default behavior on options declaration side
        //  I mean now it will always call options[0].func, but what if I need some other option by default?
        this.toggled = false;
        this.options[0].func(this.attr[0], true);
      }

      if (this.toggled) {
        setTimeout(() => {
          this.positions = this.directiveUtils.fitDropdownPosition(element[0], true);
        });
        // this.positions = this.directiveUtils.fitDropdownPosition(element[0], true);
        document.addEventListener('scroll', this.onScroll, true);

        if (!this.isClipboardInitialized) {
          this.options.forEach((option) => {
            if (option.isCopyLink) {
              const uniqueId = 'tempId' + (new Date()).getTime();
              option.clipboardClass = uniqueId;
              // @ts-ignore
              option.clipboard = new Clipboard('.' + uniqueId);
              option.clipboard.on('success', (e) => {
                // TODO create this method
                // MessageUtilsService.showPlainNotification($translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.COPIED'), true);
              });
            }
          });
          this.isClipboardInitialized = true;
        }
      }
      element[0].focus();
      this.itemClicked = true;
    });

    element.bind('keydown', (e) => {
      switch (e.keyCode) {
        case KEY_CODE.ESC:
          if (this.toggled) {
            this.toggled = false;
            this.currentItem = 0;
            this.currentSecondItem = undefined;
            e.stopPropagation();
          }
          break;
        case KEY_CODE.TAB:
          this.toggled = false;
          this.currentItem = 0;
          this.currentSecondItem = undefined;
          break;
        case KEY_CODE.UP:
          if (this.toggled) {
            if (this.currentItem > 0 && this.currentSecondItem === undefined) {
              this.currentItem--;
              if (this.options[this.currentItem].options) {
                this.options[this.currentItem].hover = true;
                this.getChildMenuPositionStyles();
              }
              if (this.options[this.currentItem + 1].options) {
                this.options[this.currentItem + 1].hover = false;
              }
            }
            if (this.currentSecondItem !== undefined && this.currentSecondItem > 0) {
              this.currentSecondItem -= 1;
            }
          }
          e.preventDefault();
          break;
        case KEY_CODE.DOWN:
          if (!this.toggled) {
            this.toggled = true;
            e.preventDefault();
            break;
          }
          if (this.currentItem < this.options.length - 1 && this.currentSecondItem === undefined) {
            this.currentItem += 1;
            if (this.options[this.currentItem].options) {
              this.options[this.currentItem].hover = true;
              this.getChildMenuPositionStyles();
            }
            if (this.options[this.currentItem - 1].options) {
              this.options[this.currentItem - 1].hover = false;
            }
          }
          if (this.currentSecondItem !== undefined && this.currentSecondItem < this.options[this.currentItem].options.length - 1) {
            this.currentSecondItem += 1;
          }
          e.preventDefault();
          break;
        case KEY_CODE.LEFT:
          if (!this.toggled) {
            this.toggled = true;
            e.preventDefault();
            break;
          }
          if (this.options[this.currentItem].options && this.currentSecondItem === undefined) {
            this.currentSecondItem = 0;
          }
          e.preventDefault();
          break;
        case KEY_CODE.RIGHT:
          if (!this.toggled) {
            this.toggled = true;
            e.preventDefault();
            break;
          }
          if (this.options[this.currentItem].options && this.currentSecondItem !== undefined) {
            this.currentSecondItem = undefined;
          }
          e.preventDefault();
          break;
        case KEY_CODE.ENTER:
        case KEY_CODE.SPACE:
          let currentOptions;
          const attribute = this.attr ? this.attr.length > 1 ? this.attr[this.currentItem] : this.attr[0] : {};

          if (this.options[this.currentItem].options && this.currentSecondItem !== undefined) {
            currentOptions = this.options[this.currentItem].options[this.currentSecondItem];

            if (currentOptions.clipboardClass) {
              // We generate click because Clipboard don't work with keydown and with other element than button
              // @ts-ignore
              document.querySelector('.' + currentOptions.clipboardClass).click();
            } else {
              currentOptions.func(attribute);
            }
          } else if (!this.options[this.currentItem].options && this.currentSecondItem === undefined) {
            currentOptions = this.options[this.currentItem];

            if (currentOptions.clipboardClass) {
              // We generate click because Clipboard don't work with keydown and with other element than button
              // @ts-ignore
              document.querySelector('.' + currentOptions.clipboardClass).click();
            } else {
              currentOptions.func(attribute);
            }
          } else {
            return;
          }
          this.toggled = false;
          if (this.options[this.currentItem].hover) {
            this.options[this.currentItem].hover = false;
          }
          this.currentItem = 0;
          this.currentSecondItem = undefined;
          e.preventDefault();
          break;
      }

      if (this.toggled) {
        setTimeout(() => {
          this.positions = this.directiveUtils.fitDropdownPosition(element[0], true);
        });
        // this.positions = this.directiveUtils.fitDropdownPosition(element[0], true);
        document.addEventListener('scroll', this.onScroll, true);
      }
    });
  }

  init(disabled, element) {
    this.el = element;

    if (disabled) {
      this.removeListeners(element);
      return;
    }

    this.addListeners(element);
  }

  performAction(index, options?, ind?) {
    const currentOptions = options || this.options;
    const attribute = this.attr ? this.attr.length > 1 ? this.attr[index] : this.attr[0] : {};
    if (!Array.isArray(currentOptions[index]) && !currentOptions[index].options) {
      currentOptions[index].func(attribute, currentOptions[index].originalName);
      this.toggled = false;
      this.options.forEach((element) => {
        if (element.hover) {
          element.hover = false;
        }
      });
      if (ind && this.baseOptions[ind].hover) {
        this.options[ind].hover = false;
      }
      this.currentItem = index;
    }
  }

  getLink(index) {
    if (this.attr.length > 1) {
      return this.options[index].generateLink(this.attr[index]);
    } else {
      return this.options[index].generateLink(this.attr[0]);
    }
  }

  getChildMenuPositionStyles(indexOfChildElement?, countOfOptionsInChildElement?, parentMenuPositionX?) {
    const positionStylesObject: any = {};

    const position = this.positions.top + (26 * (indexOfChildElement + 1) - 26);
    if ((position + (26 * countOfOptionsInChildElement)) > window.innerHeight) {
      positionStylesObject.top = position - (26 * (countOfOptionsInChildElement - 1));
    } else {
      positionStylesObject.top = position;
    }

    if (parentMenuPositionX + (parentMenuPositionX * 2) > window.innerWidth) {
      // @ts-ignore
      positionStylesObject.right = window.innerWidth - parentMenuPositionX;
    } else {
      // @ts-ignore
      positionStylesObject.left = parentMenuPositionX + parentMenuPositionX;
    }

    return positionStylesObject;
  }

  initialize() {
    if (this.customDeviceDetector.browser === BROWSERS.SAFARI) {
      workaroundForSafari();
      window.addEventListener('orientationchange', workaroundForSafari);
    }

    function workaroundForSafari() {
      if (window.innerWidth <= 800) {
        this.mobileSafariStyle = {
          // @ts-ignore
          height: $(window).height() + 'px'
        };
      } else {
        this.mobileSafariStyle = {};
      }
    }

    this.options.forEach((option) => {
      if (option.clipboard) {
        option.clipboard.off('success');
      }
    });
    this.isClipboardInitialized = false;
    // recover options. When we invoke initialize()
    // after updating attr some options can be removed.
    this.options = this.baseOptions ? _.cloneDeep(this.baseOptions) : this.options;
    for (let i = 0; this.options[i]; i++) {
      if (!this.options[i]) {
        this.options[i] = {};
      }
      const option = this.options[i];
      if (option.redefineByCondition &&
        typeof option.redefineByCondition === 'function') {
        option.redefineByCondition(this.attr[0]);
        // remove items from options list
        if (option.class && option.class.indexOf('dropdown-item-hide') !== -1) {
          this.options.splice(this.options.indexOf(option), 1);
          i--;
        }
      }
    }
    const optionsLength = this.options.length;
    if (optionsLength > 1 &&
      typeof(this.options[optionsLength - 1].class) === 'string' &&
      this.options[optionsLength - 1].class.indexOf('cancel') > -1) {
      this.options[optionsLength - 2].class += ' dropdown-item-last';
    }
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.element = $(this.elRef.nativeElement).find('.dropdown-options');
    this.addListeners(this.element);
    // @ts-ignore
    // this.init(this.disabled, $(this.elRef.nativeElement).find('.dropdown-options'));
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(_.isEqual(changes.attr.previousValue, changes.attr.currentValue)){
      this.initialize();
    }
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.removeListeners(this.element);
    document.removeEventListener('click', this.onClick, true);
  }



}
