import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  private display: any;
  constructor() {
    this.display = this.getDisplayOptions();
  }

  public isMobileView = (): boolean => {
    return window.innerWidth < 800;
  }

  public isLandscape = () => {
    if ((window.innerWidth !== this.display.innerWidth && window.innerHeight !== this.display.innerHeight) ||
      (screen.width !== this.display.screenWidth && screen.height !== this.display.screenHeight)) {
      this.display = this.getDisplayOptions();
      // will not update display options and landscape orientation if keyboard opens
      //  because it change only one screen dimension
    }
    return this.display.isLandscape;
  }

  private getDisplayOptions = () => {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      screenWidth: screen.width,
      screenHeight: screen.height,
      isLandscape: window.innerWidth > window.innerHeight || screen.width > screen.height
    };
  }
}
