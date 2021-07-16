import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {DirectiveUtilsService} from '../../shared/services/DirectiveUtilsService/directive-utils.service';

@Component({
  selector: 'app-mobile-page-header',
  templateUrl: './mobile-page-header.component.html',
  styleUrls: ['./mobile-page-header.component.less']
})
export class MobilePageHeaderComponent implements OnInit, OnDestroy {
  private itemClicked: boolean;
  private selectedOption: number;
  toggled: boolean;
  @Input() options: any;
  @Input() attr: any;
  @Input() title: any;
  private elRef: ElementRef;
  private element: any;

  constructor(private directiveUtilsService: DirectiveUtilsService,
              elRef: ElementRef) {
    this.elRef = elRef;
    // this.disabled = elRef.nativeElement.getAttribute('disabled') === null ? null : !!elRef.nativeElement.getAttribute('disabled');
  }

  ngOnInit(): void {
    // @ts-ignore
    this.element = $(this.elRef.nativeElement).find('.default-select');
    this.selectedOption = 0;
    this.itemClicked = false;

    this.addListeners(this.element);
  }

  removeListeners(element) {
    this.toggled = false;

    if (element[0]) {
      element.unbind('click');
    }

    document.removeEventListener('click', this.onClick);
  }

  addListeners(element) {
    document.addEventListener('click', this.onClick);

    element.bind('click', () => {
      this.toggled = !this.toggled;
      this.itemClicked = true;
    });
  }

  performAction(index) {
    // if selectedOption defined in the options then controller should worked with it.
    // Originally selectedoption value has saved. When the options modified without this property
    // controller will use originally selectedOption.
    if(this.options.selectedOption !== undefined) {
      this.options.selectedOption = index;
    } else {
      this.selectedOption = index;
    }
    if (this.attr.length > 1) {
      this.options[index].func(this.attr[index]);
    } else {
      this.options[index].func(this.attr[0]);
    }
  }

  getSelectedOption() {
    return this.options.selectedOption === undefined ? this.selectedOption : this.options.selectedOption;
  }

  private onClick() {
    if (!this.itemClicked) {
      this.toggled = false;
    }
    this.itemClicked = !this.itemClicked;
  }

  ngOnDestroy(): void {
    this.removeListeners(this.element);
  }

}
