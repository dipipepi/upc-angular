import { Injectable } from '@angular/core';
import {DeviceDetectorService, ReTree} from 'ngx-device-detector';
import {OS} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CustomDeviceDetectorService {

  constructor(private deviceDetector: DeviceDetectorService) {

  }

  get browser(): string {
    const regex = 'YaBrowser';
    const userAgent = navigator.userAgent;

    if(userAgent.indexOf(regex) === -1){
      return this.deviceDetector.browser;
    } else {
      return 'Yandex';
    }
  }

  get browser_version(): string {
    return this.deviceDetector.browser_version;
  }

  get device(): string {
    return this.deviceDetector.device;
  }

  get deviceType(): string {
    return this.deviceDetector.deviceType;
  }

  get orientation(): string {
    return this.deviceDetector.orientation;
  }

  get os(): string {
    return this.deviceDetector.os;
  }

  get os_version(): string {
    return this.deviceDetector.os_version;
  }

  get platformId(): string {
    // @ts-ignore
    return this.deviceDetector.platformId;
  }

  get reTree(): ReTree {
    return this.deviceDetector.reTree;
  }

  get ua(): string {
    return this.deviceDetector.ua;
  }

  public isDesktop(): boolean {
    if(this.deviceDetector.os === OS.CHROME_OS){
      return false;
    } else {
      return this.deviceDetector.isDesktop();
    }
  }

  public isMobile(): boolean {
    return this.deviceDetector.isMobile();
  }

  public isTablet(): boolean {
    if(this.deviceDetector.os === OS.CHROME_OS){
      return true;
    } else {
      return this.deviceDetector.isTablet();
    }
  }

}
