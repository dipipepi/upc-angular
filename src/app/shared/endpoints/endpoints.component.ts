import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class EndpointsComponent implements OnInit, OnDestroy {
  private scrollDiv = document.createElement('div');
  private animationId;
  private timelineContainer;
  private markersContainer;
  private titlesContainer;
  private scrolling;
  private baseStart: any;
  hours: any[];
  @Input() endpoints: any;
  @Input() start: any;
  @Input() duration: any;
  @Input() disabled: any;
  @Output() endpointsRemoved = new EventEmitter<string>();
  hovered: any;
  swiped: any;
  scrollbarWidth: number;
  private element: any;
  private elRef: ElementRef;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.element = $(this.elRef.nativeElement).find('.endpoints');
    if(this.baseStart){
      // @ts-ignore
      this.start = !this.start ? moment(this.baseStart, 'HH:mm A').hours() * 60 + moment(this.baseStart, 'HH:mm A').minutes() : this.start;
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (callback) => {
        return window.setTimeout(callback, 1000 / 60);
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = (id) => {
        clearTimeout(id);
      };
    }

    this.scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(this.scrollDiv);

    this.scrollbarWidth = this.scrollDiv.offsetWidth - this.scrollDiv.clientWidth;
    document.body.removeChild(this.scrollDiv);

    this.hours = [];
    for (let i = 0; i < 25; i++) {
      this.hours.push(i + ':00');
    }

    this.addListeners(this.element);
  }

  ngOnDestroy(): void {
    this.removeListeners(this.element);
  }

  removeEndpoint(index): void {
    this.endpoints.splice(index, 1);
    this.endpointsRemoved.emit(this.endpoints);
  }

  onMouseOver(index): void {
    this.hovered = index;
  }

  onMouseOut(): void {
    this.hovered = null;
  }

  onTitleSwipe(index): void {
    this.swiped = index;
  }

  cancelSwipe(): void {
    this.swiped = null;
  }

  scrollHorizontally(delta): void {
    if (this.scrolling) {
      return;
    }

    this.scrolling = true;

    if (this.timelineContainer.scrollLeft + delta < 0) {
      delta = -this.timelineContainer.scrollLeft;
    }
    if (this.timelineContainer.scrollLeft + delta > this.timelineContainer.scrollWidth -
      this.timelineContainer.getBoundingClientRect().width) {
      delta = this.timelineContainer.scrollWidth - this.timelineContainer.getBoundingClientRect().width -
        this.timelineContainer.scrollLeft;
    }
    const scrollStep = delta / 10;
    const targetScroll = this.timelineContainer.scrollLeft + delta;
    const scrollInterval = setInterval(() => {
        if (this.timelineContainer.scrollLeft !== targetScroll) {
          this.timelineContainer.scrollLeft += scrollStep;
        } else {
          clearInterval(scrollInterval);
          this.scrolling = false;
        }
      },15);
  }

  private scrollListener = (): void => {
    const top = this.timelineContainer.scrollTop;
    const left = this.timelineContainer.scrollLeft;
    this.markersContainer.style.transform = 'translate3d(-' + left + 'px, 0, 0)';
    this.markersContainer.style.WebkitTransform = 'translate3d(-' + left + 'px, 0, 0)';
    this.titlesContainer.style.transform = 'translate3d(0, -' + top + 'px, 0)';
    this.titlesContainer.style.WebkitTransform = 'translate3d(0, -' + top + 'px, 0)';

    this.animationId = window.requestAnimationFrame(this.scrollListener);
  }

  private addListeners(element): void{
    this.timelineContainer = element[0].querySelector('.endpoints-timeline');
    this.markersContainer = element[0].querySelector('.markers-container');
    this.titlesContainer = element[0].querySelector('.titles-container');
    this.scrollListener();
  }

  private removeListeners(element): void {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

}
