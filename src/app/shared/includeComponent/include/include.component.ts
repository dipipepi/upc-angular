import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.less']
})
export class IncludeComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() src: any;
  private elRef: ElementRef;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    // $(this.elRef.nativeElement.childNodes).append(this.src);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.src.previousValue !== changes.src.currentValue){
      // @ts-ignore
      $(this.elRef.nativeElement.childNodes).append(this.src);
    }
  }

}
