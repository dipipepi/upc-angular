import {Component, ElementRef, Input, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-show-password',
  templateUrl: './show-password.component.html',
  styleUrls: ['./show-password.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ShowPasswordComponent implements OnInit {
  @Input() inputElem;
  @Input() inputValue;
  private eyeIcon: any;
  wasPasswordHidden: boolean;

  constructor(private elemRef: ElementRef,
              public viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    // @ts-ignore
    this.inputElem = $(this.inputElem);
    // @ts-ignore
    this.wasPasswordHidden = this.inputElem.attr('type') === 'password';
    // @ts-ignore
    this.eyeIcon = $(this.elemRef.nativeElement.childNodes[0]);
  }

  showPassword(): void {
    if(this.inputElem.attr('type') === 'password'){
      this.inputElem.attr('type', 'text');
      this.eyeIcon.removeClass('hidden-pass').addClass('visible-pass');
    } else {
      this.inputElem.attr('type', 'password');
      this.eyeIcon.removeClass('visible-pass').addClass('hidden-pass');
    }
  }

}
