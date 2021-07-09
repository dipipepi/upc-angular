import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {AuthorizationService, User} from '../../services/AuthorizationService/authorization.service';
import {TranslateService} from '@ngx-translate/core';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {DirectiveUtilsService} from '../services/DirectiveUtilsService/directive-utils.service';
import {EVENT, KEY_CODE} from '../../constants';
import {GlobalService} from '../../services/GlobalService/global.service';
import {EventService} from '../services/EventService/event.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TagSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() placeholder: string;
  @Input() primary: string;
  @Input() secondary: string;
  @Input() tertiary: string;
  @Input() callback;
  @Input() options;
  @Input() uniqueProperty;
  @Input() isForParticipant;
  @Input() selected;
  @Input() isForUserSearch;
  @Input() searching;
  @Input() onChange;
  @Input() beforeTagAdded;
  @Input() showHint;
  @Input() selectedFilter;
  @Input() selectedFilterRefresh;
  @Input() maxParticipants;
  @Input() isMaxParticipantExceeded;
  @Output() selectedChanged = new EventEmitter<any>();

  user: User | {};
  translatedPlaceholder: any;
  moveHintWithScroll: { transform: string } | string;
  showHintToHint: boolean;
  currentItem: number;
  private element: any;
  private el: any;
  filteredOptions: any;
  search: string;
  toggled: boolean;
  disabled: boolean;
  private itemClicked: boolean;
  readyToDelete: boolean;
  private defaultFilteredOptionsCount: number;
  private filteredOptionsCount: number;
  private allFilteredOptions: any;
  filteredSelected: any;

  constructor(public authorizationService: AuthorizationService,
              public translate: TranslateService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private elRef: ElementRef,
              private directiveUtilsService: DirectiveUtilsService,
              private globalService: GlobalService,
              private eventService: EventService) {
    this.disabled = elRef.nativeElement.getAttribute('disabled') === null ? null : !!elRef.nativeElement.getAttribute('disabled');
  }

  ngOnDestroy(): void {
    this.removeListeners(this.element);
    }

  ngOnInit(): void {
    this.defaultFilteredOptionsCount = 10;
    this.filteredOptionsCount = this.defaultFilteredOptionsCount;
    // @ts-ignore
    this.element = $(this.elRef.nativeElement.childNodes);
    this.user = this.globalService.user;
    this.translatedPlaceholder = this.translate.instant(this.placeholder);
    this.moveHintWithScroll = '';
    this.showHintToHint = this.showHint && this.customDeviceDetector.isDesktop();

    this.currentItem = 0;
    if (!this.selected) {
      this.selected = [];
    }

    this.updateFilteredOptions();

    if (!this.disabled) {
      this.addListeners(this.element);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedFilterRefresh && !changes.selectedFilterRefresh.firstChange){
      this.unsubscribeFilterRefresh();
    }

    if(changes.options && !changes.options.firstChange){
      this.updateFilteredOptions();
    }

    if(changes.selected && !changes.selected.firstChange){
        this.updateSelected();
        this.updateFilteredOptions();
    }

  }

  maxParticipantsIsExceeded(): boolean {
    if (!!this.isForParticipant && !!this.maxParticipants && this.maxParticipants !== -1) {
      if (this.selected.length > this.maxParticipants) {
        this.isMaxParticipantExceeded = true;
        return true;
      } else {
        this.isMaxParticipantExceeded = false;
        return false;
      }
    } else {
      return false;
    }
  }

  updatePosition(): void {
    if (!this.el) {
      return;
    }
    setTimeout(() => {
      setTimeout(() => {
        // @ts-ignore
        if($(this.el[0]).find('.dropdown-block').length !== 0){
          this.directiveUtilsService.fitDropdownPosition(this.el[0], false, true);
        }
      }, 50);
    });
  }

  parse(obj, path): any {
    return path.split('.').reduce((prev, curr) => {
      return (prev ? prev[curr] : undefined);
    }, obj || self);
  }

  addTag(index): void {
    const item = this.filteredOptions[index];
    if (item) {
      if (this.beforeTagAdded) {
        Promise.all(this.beforeTagAdded(item)).then(() =>{
          this.selected.push(item);
          this.selectedChanged.emit(this.selected);
          this.eventService.broadcast(EVENT.CUSTOM.MOVE_TAG_IN_TAG_SELECTOR);

          this.search = '';
          this.currentItem = 0;
          if (this.onChange) {
            this.onChange();
          }
        });
      } else {
        this.selected.push(item);
        this.selectedChanged.emit(this.selected);
        this.eventService.broadcast(EVENT.CUSTOM.MOVE_TAG_IN_TAG_SELECTOR);

        this.search = '';
        this.currentItem = 0;
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  removeTag(index): void {
    this.selected.splice(index, 1);
    this.selectedChanged.emit(this.selected);

    this.eventService.broadcast(EVENT.CUSTOM.MOVE_TAG_IN_TAG_SELECTOR);
    if (this.onChange) {
      this.onChange();
    }
  }

  handleOptionsScroll (optionsElement): void {
    const scrollProportion = optionsElement.scrollTop / (optionsElement.scrollHeight - optionsElement.clientHeight);
    if (scrollProportion > 0.9 && this.allFilteredOptions.length > this.filteredOptionsCount) {
      this.filteredOptionsCount += this.defaultFilteredOptionsCount;
      this.updateCountOfFilteredOptions();
      setTimeout(() => {
      });
    }
  }

  searchChanged(searchText): void {
    this.callback(searchText, this.search);
    this.search = searchText;
  }

  private unsubscribeFilterRefresh(): void {
    if (this.selectedFilterRefresh && this.selectedFilterRefresh.then) {
      this.selectedFilterRefresh.then(undefined, undefined, () => {
        this.updateSelected();
      });
    }
  }

  private init(disabled, element): void {
    if (disabled) {
      this.removeListeners(element);
      return;
    }

    this.addListeners(element);
  }

  private removeListeners(element): void {
    this.toggled = false;
    this.disabled = true;

    if (element[0]) {
      element.unbind('click');
      if (this.customDeviceDetector.isDesktop()) {
        element.children().unbind('DOMMouseScroll mousewheel onmousewheel');
      }
    }

    document.removeEventListener('click', this.onClick.bind(this));
  }

  private addListeners(element): void {
    // @ts-ignore
    this.el = $(element);
    this.disabled = false;

    document.addEventListener('click', this.onClick.bind(this));

    if (this.customDeviceDetector.isDesktop()) {
      element.children().bind('DOMMouseScroll mousewheel onmousewheel', (e) => {
        this.updateHintScroll();
      });
    }

    element.bind('click', () => {
      this.toggled = true;
      this.updatePosition();
      this.updateHintScroll();
      this.itemClicked = true;
    });

    element.bind('keydown', (e) => {
      this.toggled = true;

      if (e.keyCode !== KEY_CODE.BACKSPACE) {
        this.readyToDelete = false;
      }

      switch (e.keyCode) {
        case KEY_CODE.BACKSPACE:
          if (!this.search && this.readyToDelete) {
            const removedItem = this.selected[this.selected.length - 1];
            this.selected.splice(this.selected.length - 1, 1);
            this.options.push(removedItem);
            this.readyToDelete = false;
          }
          // @ts-ignore
          if (!this.search && this.selected.length > 0 && this.selected[this.selected.length - 1].userId !== this.user.scopiaId) {
            this.readyToDelete = true;
          }
          break;
        case KEY_CODE.TAB:
          this.toggled = false;
          this.currentItem = 0;
          break;
        case KEY_CODE.UP:
          if (this.toggled && this.currentItem > 0) {
            this.checkIfNextInView();
            this.currentItem--;
          }
          e.preventDefault();
          break;
        case KEY_CODE.DOWN:
          if (this.currentItem < this.filteredOptions.length - 1) {
            this.checkIfNextInView();
            this.currentItem++;
          }
          e.preventDefault();
          break;
        case KEY_CODE.ENTER:
          if (!this.search) {
            break;
          }
          this.addTag(this.currentItem);
          this.updateHintScroll();
          e.preventDefault();
          break;
      }
    });
  }

  private onClick(): void {
    if (!this.itemClicked) {
      this.toggled = false;
      this.readyToDelete = false;
    }
    this.itemClicked = !this.itemClicked;
  }

  private updateHintScroll(): void {
    if (this.el) {
      setTimeout(() => {
        const tagContainer = this.el.children()[0];
        this.moveHintWithScroll = {transform: 'translateY(-' + tagContainer.scrollTop + 'px)'};
      }, 100);
    }
  }

  private updateFilteredOptions(): void {
    this.allFilteredOptions = this.options.filter((option) => {
      // @ts-ignore
      if(option.userId !== this.user.scopiaId){
        return !this.selected.some((selectedItem) => {
          return selectedItem[this.uniqueProperty] === option[this.uniqueProperty];
        });
      } else {
        return false;
      }
    });
    this.allFilteredOptions.sort((a, b) => {
      if (a[this.primary] > b[this.primary]) {
        return 1;
      } else if (a[this.primary] < b[this.primary]) {
        return -1;
      }
      if (a[this.secondary] > b[this.secondary]) {
        return 1;
      } else if (a[this.secondary] < b[this.secondary]) {
        return -1;
      }
      if (a[this.tertiary] > b[this.tertiary]) {
        return 1;
      } else if (a[this.tertiary] < b[this.tertiary]) {
        return -1;
      }

      return 0;
    });

    this.filteredOptionsCount = this.defaultFilteredOptionsCount;
    if (this.currentItem >= this.filteredOptionsCount) {
      this.currentItem = 0;
    }

    this.updateCountOfFilteredOptions();
    this.updatePosition();
  }

  private updateCountOfFilteredOptions(): void {
    this.allFilteredOptions = this.allFilteredOptions || [];
    this.filteredOptions = this.allFilteredOptions.slice(0, this.filteredOptionsCount);
  }

  private checkIfNextInView(): void {
    // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let tagOptionsElement, selectedOptionElement, classes, i, elChildren = this.el.children();

    if (!this.el || !elChildren) {
      return;
    }

    for (i = 0; i < elChildren.length; i++) {
      classes = elChildren[i].className !== undefined ? elChildren[i].className.split(' ') : [];
      if (classes.length > 0 && classes.indexOf('tag-options') > -1) {
        tagOptionsElement = elChildren[i];
        break;
      }
    }

    if (!tagOptionsElement) {
      return;
    }

    for (const optionsElement of tagOptionsElement.childNodes) {
      classes = optionsElement.className !== undefined ? optionsElement.className.split(' ') : [];
      if (classes.length > 1 && classes.indexOf('tag-option') > -1 && classes.indexOf('selected') > -1) {
        selectedOptionElement = optionsElement;
        break;
      }
    }

    if (!selectedOptionElement) {
      return;
    }

    const offset = selectedOptionElement.offsetTop - tagOptionsElement.scrollTop;
    if (offset + selectedOptionElement.clientHeight * 2 > tagOptionsElement.clientHeight) {
      // @ts-ignore
      $(tagOptionsElement).animate({
        scrollTop: tagOptionsElement.scrollTop + offset
      }, 250);
    }
    if (selectedOptionElement.offsetTop - selectedOptionElement.clientHeight < tagOptionsElement.scrollTop) {
      // @ts-ignore
      $(tagOptionsElement).animate({
        scrollTop: selectedOptionElement.offsetTop - selectedOptionElement.clientHeight
      }, 250);
    }
  }

  private updateSelected(): void {
    if (this.selected && this.selectedFilter) {
      // TODO create this filter
      // this.$scope.filteredSelected = this.$filter('filter')(
      //   this.$scope.selected,
      //   this.$scope.selectedFilter
      // );
    } else {
      this.filteredSelected = this.selected;
    }
  }

}
