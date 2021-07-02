import {Component, Input, OnInit, Output, EventEmitter, ElementRef, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {DirectiveUtilsService} from '../service/DirectiveUtilsService/directive-utils.service';
import {KEY_CODE} from '../../constants';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.less']
})
export class CustomSelectComponent implements OnInit, OnDestroy, OnChanges {
  elRef: ElementRef;
  toggled: boolean;
  private element;
  @Input() key: string;
  @Input() value: string;
  @Input() disabled: boolean;
  @Input() options: any;
  @Input() model: any;
  @Input() placeholder = '';
  @Output() ngModelChange = new EventEmitter<string>();
  private onOptionClicked: any;
  private itemClicked = false;
  private el: any;

  constructor(private directiveUtilsService: DirectiveUtilsService,
              elRef: ElementRef) {
    this.elRef = elRef;
    // this.disabled = elRef.nativeElement.getAttribute('disabled') === null ? null : !!elRef.nativeElement.getAttribute('disabled');
  }

  ngOnDestroy(): void {
    this.removeListeners(this.element);
  }

  ngOnInit(): void {
    // @ts-ignore
    this.element = $(this.elRef.nativeElement).find('.default-select');

    if (this.key === undefined || this.value === undefined) {
      this.key = 'id';
      this.value = 'name';
    }

    // this.disabled = true;

    if (!this.disabled) {
      this.addListeners(this.element);
    }

    // this.init(this.disabled, this.element);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  selectOption(option: any):void {
    if (this.onOptionClicked) {
      this.onOptionClicked(option, this.model.id);
    }
    this.scrollToCurrentPosition();
    this.ngModelChange.emit(option);
  }

  // showList($event: MouseEvent): void {
  //   if(!this.toggled){
  //     this.toggled = true;
      // setTimeout(() => {this.directiveUtilsService.fitDropdownPosition(this.elRef.nativeElement.childNodes[0]);}, 100);
      // this.directiveUtilsService.fitDropdownPosition(this.elRef.nativeElement.childNodes[0]);
  //     $event.stopPropagation();
  //   }
  // }

  inputModelChange():void {}

  private scrollToCurrentPosition(initialize?): void {
    setTimeout(() => {
      const block = this.element.find('.dropdown-block');
      const selectedItem = this.element.find('li.selected');
      const itemOffsetInBlock = (selectedItem.offset() && selectedItem.offset().top || 0) - (block.offset() && block.offset().top || 0);
      if(initialize) {
        block.scrollTop(itemOffsetInBlock);
        return;
      }
      if(itemOffsetInBlock >= block.innerHeight() - 2*selectedItem.innerHeight()) {
        block.scrollTop(block.scrollTop() + selectedItem.innerHeight());
        return;
      }
      if (itemOffsetInBlock <= 0) {
        block.scrollTop(block.scrollTop() + itemOffsetInBlock - selectedItem.innerHeight());
        return;
      }
    });
  }

  private onClick(): void {
    if (!this.itemClicked) {
      this.toggled = false;
    }
    this.itemClicked = !this.itemClicked;
  }

  private onScroll(event): void {
    if (!this.el || !this.el[0].contains(event.target)) {
      this.toggled = false;
      document.removeEventListener('scroll', this.onScroll, true);
    }
  }

  private init(disabled, element): void {
    this.el = element;

    if (disabled) {
      this.removeListeners(element);
      return;
    }

    this.addListeners(element);
  }

  private removeListeners(element?): void {
    this.toggled = false;
    this.disabled = true;

    if (element[0]) {
      element[0].removeAttribute('tabIndex');
      element.unbind('click');
      element.unbind('keydown');
    }

    document.removeEventListener('click', this.onClick.bind(this));
  }

  private addListeners(element): void {
    this.el = element;

    element[0].tabIndex = 0;
    this.disabled = false;

    document.addEventListener('click', this.onClick.bind(this));

    element.bind('click', (e) => {
      if (e.target.tagName !== 'SELECT' && !this.toggled) {
        this.toggled = !this.toggled;

        setTimeout(() => {
          this.directiveUtilsService.fitDropdownPosition(element[0]);
        }, 5);
        element[0].focus();
        this.itemClicked = true;
        document.addEventListener('scroll', this.onScroll.bind(this), true);
        if(this.toggled) {
          this.scrollToCurrentPosition(true);
        }
      }
    });

    element.bind('keydown', (e) => {
      let index = -1;
      const len = this.options.length;
      switch (e.keyCode) {
        case KEY_CODE.ESC:
          if (this.toggled) {
            this.toggled = false;
            e.stopPropagation();
          }
          break;
        case KEY_CODE.TAB:
          this.toggled = false;
          break;
        case KEY_CODE.UP:
          for (let i = 0; i < len; i++) {
            if (this.options[i][this.key] === this.model[this.key] && this.options[i][this.value] === this.model[this.value]) {
              index = i;
              break;
            }
          }
          if (index > 0) {
            this.selectOption(this.options[index - 1]);
          }
          e.preventDefault();
          break;
        case KEY_CODE.DOWN:
          index = -1;
          for (let i = 0; i < len; i++) {
            if (this.options[i][this.key] === this.model[this.key] && this.options[i][this.value] === this.model[this.value]) {
              index = i;
              break;
            }
          }
          if (index < len - 1) {
            this.selectOption(this.options[index + 1]);
          }
          e.preventDefault();
          break;
        case KEY_CODE.ENTER:
          this.toggled = !this.toggled;
          break;
        case KEY_CODE.SPACE:
          this.toggled = true;
          break;
      }

      if (this.toggled) {
        // @ts-ignore
        this.directiveUtilsService.fitDropdownPosition(element[0]);
        document.addEventListener('scroll', this.onScroll, true);
      }
    });
  }
}
