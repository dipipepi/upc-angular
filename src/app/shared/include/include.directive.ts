import {AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appInclude]'
})
export class IncludeDirective implements AfterViewInit{
  @Input('src') src: any;
  private element;

  constructor(
    private viewContainer: ViewContainerRef) {
    this.element = viewContainer.element.nativeElement;
  }

  ngAfterViewInit(): void {
    this.element.insertAdjacentHTML('afterbegin', this.src);
  }

}
