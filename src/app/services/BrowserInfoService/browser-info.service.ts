import { Injectable } from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import {BROWSERS} from '../../constants';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';

export interface BrowserData{
  dataOnly: {
    excludedVersions: any[] | null
    majorVersion: number
    minVersion: string
    title: string
    type: any | null
  } | any[];

  webRTC: {
    excludedVersions: any[] | null
    majorVersion: number
    minVersion: string
    title: string
    type: any | null
  } | any[];
}

@Injectable({
  providedIn: 'root'
})
export class BrowserInfoService {

  // currentData = this.getCurrentBrowserData();

  isItOldEdge = this.deviceService.browser === BROWSERS.MS_EDGE;

  constructor(private deviceService: DeviceDetectorService,
              private userSettingsService: UserSettingsService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private versionService: VersionService,
              public translate: TranslateService) {
  }


  private static checkBrowserRegExp(regExp): boolean {
    let res;
    const userAgent = window.navigator.userAgent;
    res = userAgent.match(regExp);
    return !!res && userAgent.match(regExp).length !== 0;
  }

  private isAcceptedBrowserRegExp(): boolean {
    if(!this.userSettingsService.portalResources){
      return false;
    }

    if(!this.userSettingsService.portalResources.acceptedUserAgentRegexp){
      return false;
    }
    const regExp: RegExp = new RegExp(this.userSettingsService.portalResources.acceptedUserAgentRegexp);
    return BrowserInfoService.checkBrowserRegExp(regExp);
  }

  private isForbiddenBrowserRegExp(): boolean {
    if(!this.userSettingsService.portalResources){
      return false;
    }

    if(!this.userSettingsService.portalResources.excludedUserAgentRegExp){
      return false;
    }
    const regExp: RegExp = new RegExp(this.userSettingsService.portalResources.excludedUserAgentRegExp);
    return BrowserInfoService.checkBrowserRegExp(regExp);
  }


  // tslint:disable-next-line:typedef
  private getCurrentBrowserData(): BrowserData | boolean {
    if(!this.userSettingsService.portalResources){
      return false;
    }

    const currentBrowserData = {
      webRTC: [],
      dataOnly: []
    };

    for (const browser of this.userSettingsService.portalResources.clientSettings.webMeetMeWebRTCBrowsers){
      if (this.getBrowserName() === browser.title){
        // @ts-ignore
        currentBrowserData.webRTC = browser;
      }
    }

    for (const browser of this.userSettingsService.portalResources.clientSettings.webMeetMeDataOnlyBrowsers){
      if (this.getBrowserName() === browser.title){
        // @ts-ignore
        currentBrowserData.dataOnly = browser;
      }
    }

    return currentBrowserData;
  }

  // Define browser detection function
  private getBrowserName(): string {
    if (this.customDeviceDetector.browser === BROWSERS.CHROME) {
      return 'Chrome';
    } else if (this.customDeviceDetector.browser === BROWSERS.FIREFOX) {
      return 'Firefox';
    } else if (this.customDeviceDetector.browser === BROWSERS.SAFARI) {
      return 'Safari';
    } else if (this.customDeviceDetector.browser === BROWSERS.OPERA) {
      return 'Opera';
    } else if (this.customDeviceDetector.browser === BROWSERS.YANDEX) {
      return 'Yandex';
    } else if (this.customDeviceDetector.browser === BROWSERS.IE) {
      return 'IE';
    } else if (this.customDeviceDetector.browser === BROWSERS.MS_EDGE_CHROMIUM) {
      return 'Edge';
    } else if (this.customDeviceDetector.browser === BROWSERS.CORDOVA) {
      return 'Cordova';
    } else if (this.customDeviceDetector.browser === BROWSERS.FB_MESSANGER) {
      return 'FB-Messanger';
    } else {
      return 'Unknown';
    }
  }

  private getBrowserVersion(): string {
    return this.customDeviceDetector.browser_version;
  }

  private compareVersions(currentVersion: string, resourcesVersion: string): number {
    const decimalPointOfResourcesVersion = resourcesVersion.split('.').length;

    const currentVersionToCompare = currentVersion.split('.').slice(0, decimalPointOfResourcesVersion).join('.');
    const resourcesVersionToCompare = resourcesVersion.split('.').slice(0, decimalPointOfResourcesVersion).join('.');
    return this.versionService.compareVersions(currentVersionToCompare, resourcesVersionToCompare);
  }

  private isBrowserExclusion(dataOnly, browsersData): boolean {
    if (dataOnly) {
      if(browsersData.exclusions.dataOnly.length !== 0 && browsersData.exclusions.dataOnly.excludedVersions !== null) {
        for (const browser of browsersData.exclusions.dataOnly.excludedVersions){
          if(this.compareVersions(this.customDeviceDetector.browser_version, browser) === 0){
            return true;
          }
        }
      }
      return false;
    } else {
      if(browsersData.exclusions.dataOnly.length !== 0 && browsersData.exclusions.dataOnly.excludedVersions !== null){
        for (const browser of browsersData.exclusions.dataOnly.excludedVersions){
          if(this.compareVersions(this.customDeviceDetector.browser_version, browser) === 0){
            return true;
          }
        }
      }

      if (browsersData.exclusions.webRTC.length !== 0 && browsersData.exclusions.webRTC.excludedVersions !== null){
        for (const browser of browsersData.exclusions.webRTC.excludedVersions){
          if(this.compareVersions(this.customDeviceDetector.browser_version, browser) === 0){
            return true;
          }
        }
      }

      return this.isForbiddenBrowserRegExp();
    }
  }

  public isBrowserSupported(): boolean {

    if(!this.userSettingsService.portalResources){
      return false;
    }

    if(this.isItOldEdge) {
      return false;
    }

    const webMeetMeWebRTCBrowsers = this.userSettingsService.portalResources.clientSettings.webMeetMeWebRTCBrowsers;
    const webMeetMeDataOnlyBrowsers = this.userSettingsService.portalResources.clientSettings.webMeetMeDataOnlyBrowsers;

    for(const browser of webMeetMeWebRTCBrowsers){
      if(browser.title.toLowerCase().indexOf(this.getBrowserName().toLowerCase().trim())  > -1){
        return true;
      }
    }

    for(const browser of webMeetMeDataOnlyBrowsers){
      if(browser.title.toLowerCase().indexOf(this.getBrowserName().toLowerCase().trim())  > -1){
        return true;
      }
    }

    return this.isAcceptedBrowserRegExp();
  }

  public isWebRTCBrowser(): boolean {
    if(!this.userSettingsService.portalResources){
      return false;
    }

    if(this.isItOldEdge) {
      return false;
    }

    if(this.isForbiddenBrowserRegExp()){
      return false;
    }

    if(this.isAcceptedBrowserRegExp()){
      return true;
    }

    const webMeetMeWebRTCBrowsers = this.userSettingsService.portalResources.clientSettings.webMeetMeWebRTCBrowsers;

    for(const browser of webMeetMeWebRTCBrowsers){
      if(browser.title.toLowerCase().indexOf(this.getBrowserName().toLowerCase().trim())  > -1){
        return true;
      }
    }
    return false;
  }

  public isFreshVersion(): boolean {

    if(!this.isBrowserSupported() || !this.userSettingsService.portalResources){
      return false;
    }

    let supportedBrowserVersion: string | number = 0;

    const webMeetMeWebRTCBrowsers = this.userSettingsService.portalResources.clientSettings.webMeetMeWebRTCBrowsers;
    const webMeetMeDataOnlyBrowsers = this.userSettingsService.portalResources.clientSettings.webMeetMeDataOnlyBrowsers;

    for(const browser of webMeetMeDataOnlyBrowsers){
      if(browser.title.toLowerCase().indexOf(this.getBrowserName().toLowerCase().trim())  > -1){
        supportedBrowserVersion = browser.minVersion;
        break;
      }
    }

    for(const browser of webMeetMeWebRTCBrowsers){
      if(browser.title.toLowerCase().indexOf(this.getBrowserName().toLowerCase().trim())  > -1){
        if(this.versionService.isUpdateRequired(supportedBrowserVersion, browser.minVersion)){
          supportedBrowserVersion = browser.minVersion;
        }
        break;
      }
    }

    const currentBrowserVersionArray = this.getBrowserVersion().split('.');
    // @ts-ignore
    const supportedBrowserVersionArray = supportedBrowserVersion.split('.');

    const minArrayLength = Math.min(currentBrowserVersionArray.length, supportedBrowserVersionArray.length);

    // Compare versions
    for(let j = 0; j < minArrayLength; j++){
      if(Number(currentBrowserVersionArray[j]) > Number(supportedBrowserVersionArray[j])){
        return true;
      } else if(Number(currentBrowserVersionArray[j]) < Number(supportedBrowserVersionArray[j])){
        return false;
      }
    }

    // Equals
    return true;
  }

  public browserNotSupportedMsg(): Promise<string> {
    return this.translate.get(['GENERAL.BROWSERS.YOUR', 'GENERAL.BROWSERS.BROWSER', 'GENERAL.BROWSERS.BROWSER',
      'GENERAL.BROWSERS.BROWSER_NOT_SUPPORTED']).toPromise().then( (res) => {
      return ((this.getBrowserName() === 'Unknown') ? (res['GENERAL.BROWSERS.YOUR'] + ' ' +
        res['GENERAL.BROWSERS.BROWSER']) : (this.getBrowserName() + ' ' + res['GENERAL.BROWSERS.BROWSER']))  + ' ' + res['GENERAL.BROWSERS.BROWSER_NOT_SUPPORTED'];
    });
  }

  public browserOutOfDateMsg(): Promise<string> {
    return this.translate.get(['GENERAL.BROWSERS.YOUR', 'GENERAL.BROWSERS.BROWSER', 'GENERAL.BROWSERS.BROWSER_OUT_OF_DATE']).toPromise()
      .then( () => {
      return this.translate.instant('GENERAL.BROWSERS.YOUR') + ' ' + ((this.getBrowserName() === 'Unknown') ? '' :
        (this.getBrowserName())) + ' ' + this.translate.instant('GENERAL.BROWSERS.BROWSER') + ' ' +
        this.translate.instant('GENERAL.BROWSERS.BROWSER_OUT_OF_DATE');
    });
  }

  public isWebRTCBrowserExclusion(): boolean {
    let res;
    const currentData = this.getCurrentBrowserData();

    // @ts-ignore
    if (currentData && currentData.webRTC.length !== 0 && currentData.webRTC.excludedVersions !== null){
      // @ts-ignore
      for (const browser of currentData.webRTC.excludedVersions){
        // @ts-ignore
        if (this.compareVersions(this.getBrowserVersion(), browser) === 0){
          res = true;
          break;
        } else {
          res = false;
        }
      }
    } else {
      res = false;
    }

    return res;
  }

  public isDataOnlyBrowserExclusion(): boolean {
    let res;
    const currentData = this.getCurrentBrowserData();

    // @ts-ignore
    if (currentData && currentData.dataOnly.length !== 0 && currentData.dataOnly.excludedVersions !== null){
      // @ts-ignore
      for (const browser of currentData.dataOnly.excludedVersions){
        // @ts-ignore
        if (this.compareVersions(this.getBrowserVersion(), browser) === 0){
          res = true;
          break;
        } else {
          res = false;
        }
      }
    } else {
      res = false;
    }

    return res;
  }

  public checkBrowserExclusions(dataOnly): boolean {
    if(!this.userSettingsService.portalResources){
      return false;
    }

    if(this.isItOldEdge) {
      return false;
    }

    if(this.isForbiddenBrowserRegExp()){
      return false;
    }

    const browsersData = {
      currentVersion: this.customDeviceDetector.browser_version,
      exclusions: this.getCurrentBrowserData()
    };

    if(!dataOnly){
      // @ts-ignore
      return (browsersData.exclusions.webRTC.length !== 0 && browsersData.exclusions.dataOnly.length !== 0 &&
        !this.isBrowserExclusion(dataOnly, browsersData)) || this.isAcceptedBrowserRegExp();
    } else {
      // @ts-ignore
      return (browsersData.exclusions.dataOnly.length !== 0 && !this.isBrowserExclusion(dataOnly, browsersData)) ||
        this.isAcceptedBrowserRegExp();
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  constructor() {}

  compareVersions(sVersion1, sVersion2): number {
    // v1 < v2   => -1
    // v1 == v2  => 0
    // v1 > v2   => +1

    // it is ok if version contains some literals in the end - parseInt will stop when see it
    if (!sVersion2) {
      return +1;
    }
    const aVersion1 = ('' + sVersion1).split('.');
    const aVersion2 = ('' + sVersion2).split('.');

    while (aVersion1.length < aVersion2.length) {
      aVersion1.push('0');
    }
    while (aVersion1.length > aVersion2.length) {
      aVersion2.push('0');
    }

    for (let i = 0; i < aVersion1.length; i++) {
      const nVersion1 = parseInt(aVersion1[i], 10);
      const nVersion2 = parseInt(aVersion2[i], 10);

      if (isNaN(nVersion1) || nVersion1 < nVersion2)
      {
        return -1;
      }
      if (isNaN(nVersion1) || nVersion1 > nVersion2)
      {
        return +1;
      }
    }
    return 0;
  }

  isUpdateRequired(currentVersion, minVersion): boolean {
    return this.compareVersions(currentVersion, minVersion) < 0;
  }
}
