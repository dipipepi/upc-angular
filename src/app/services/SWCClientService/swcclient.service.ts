import { Injectable } from '@angular/core';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import {BROWSERS, CLIENT_TYPE, ERROR_CODE, URL, USER_TYPE} from '../../constants';
import {VersionService} from '../BrowserInfoService/browser-info.service';
import {AuthorizationService} from '../AuthorizationService/authorization.service';
import {GlobalService} from '../GlobalService/global.service';
import {ActivatedRoute} from '@angular/router';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class SWCClientService {
  private logger = new Logger('SWCClientService');
  clientData = {
    isInstalled: false
  };
  private CLIENT_IS_DISABLED = 0;
  private canRunCache = {};
  useBrowserToJoin: boolean;
  constructor(private userSettingsService: UserSettingsService,
              private customDeviceDetectorService: CustomDeviceDetectorService,
              private versionService: VersionService,
              private authorizationService: AuthorizationService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  updateClientInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const checkBrowserSupport = () => {
        if (!(this.userSettingsService.portalResources &&
          this.userSettingsService.portalResources.clientSettings)) {
          this.logger.log('Tried to update SWC info while there are no UPS resources. Need to try it later. Now return false.');
          return false;
        }

        const version = this.customDeviceDetectorService.browser_version;
        let browser = this.customDeviceDetectorService.browser;
        this.logger.log('Browser is %s. Version is %s.', browser, version);

        if (browser === BROWSERS.MS_EDGE) {
          // compatibility fix
          browser = 'MS-Edge';
        }

        const cs = this.userSettingsService.portalResources.clientSettings;
        let browserFound = false;

        if (this.customDeviceDetectorService.isDesktop()) {
          this.logger.log('User have desktop.');
          for (const brow of cs.webMeetMeWebRTCBrowsers) {
            if (brow.title.toLowerCase() === browser.toLowerCase()) {
              if (this.isBrowserVersionSupported(version, brow.minVersion) &&
                (brow.excludedVersions === undefined ||
                  brow.excludedVersions === null ||
                  brow.excludedVersions.indexOf(version) === -1)) {
                browserFound = true;
              }
            }
          }
        } else {
          this.logger.log('User comes from mobile');
        }

        // return isWebRTCSupported() && browserFound;
        return browserFound;
      };

      this.setupUseBrowserValue();

      if (!(this.userSettingsService.portalResources && this.userSettingsService.portalResources.clientSettings)) {
        this.logger.log('Can\'t update SWC client info, resources is not initialized yet. Need to make it later');
        reject(ERROR_CODE.CLIENT.NO_RESOURCES);
      }

      // @ts-ignore
      this.clientData.isInstalled = checkBrowserSupport();
      this.updateClientInfoInStorage();

      this.canRunCache = {};

      resolve(this.clientData);
    });
  }

  canRun (presentationOnly): {result: boolean, error?: string} {
    const checkIfCanRun = (presentationOnly) => {
      this.logger.log('Check if can run SWC in ' + (presentationOnly ? 'PO' : 'a+v') + ' mode');
      if (!(this.userSettingsService.portalResources && this.userSettingsService.portalResources.clientSettings)) {
        this.logger.log('Can\'t update SWC client info, resources is not initialized yet. Need to make it later');
        return {
          result: false,
          error: ERROR_CODE.CLIENT.NO_RESOURCES
        };
      }

      if (this.userSettingsService.portalResources.clientSettings.webMeetMeClientEnableRank === this.CLIENT_IS_DISABLED) {
        return {
          result: false,
          error: 'Web Client is disabled in server settings'
        };
      }

      const browserVersion = this.customDeviceDetectorService.browser_version;
      let browserName = this.customDeviceDetectorService.browser;

      this.logger.log('Browser is %s. Version is %s.', browserName, browserVersion);

      if (browserName === BROWSERS.MS_EDGE) {
        // compatibility fix
        browserName = 'edge';
      }

      const supportedBrowsers = presentationOnly ?
        this.userSettingsService.portalResources.clientSettings.webMeetMeDataOnlyBrowsers :
        this.userSettingsService.portalResources.clientSettings.webMeetMeWebRTCBrowsers;
      let result = false;

      if (this.customDeviceDetectorService.isDesktop()) {
        this.logger.log('User have desktop.');
        for (const supBrowser of supportedBrowsers) {
          if (supBrowser.title.toLowerCase() === browserName.toLowerCase()) {
            if (supBrowser.excludedVersions === undefined ||
              supBrowser.excludedVersions === null ||
              supBrowser.excludedVersions.indexOf(browserVersion) === -1) {
              result = true;
            }
          }
        }
      } else {
        this.logger.log('User comes from mobile');
      }

      return {
        result
      };
    };

    if (!this.canRunCache.hasOwnProperty(presentationOnly)) {
      this.canRunCache[presentationOnly] = checkIfCanRun(presentationOnly);
    }

    return {result: true};
  }

  canShowAdjustButton(): boolean {
    return this.canRun(false).result;
  }

  canShowDownloadButton(): boolean {
    return false;
  }

  downloadClient(): void {
    this.logger.error('Cant download SWC client! It should never happen!');
  }

  openClientSettings(): void {
    let parameters = {
      audioOnly: false,
      brandingUrl: this.userSettingsService.portalResources.brandingUrl,
      dataOnly: false,
      middlewareUrl: this.userSettingsService.portalResources.resources.middleware.POST.createSwcInfo.href,
      ottMode: this.userSettingsService.portalResources.ottMode,
      testMode: true,
      // TODO: remove sg
      sgHost: window.location.hostname,
      sgPort: window.location.port,
      enabledLogs: window.localStorage.enabledLogs
    };

    parameters = this.globalService.encodeQueryData(parameters);

    // TODO use window.location.origin on portal
    // const swcURL = window.location.origin + URL.UWS.JOIN_MEET_ME_SWC + parameters;
    const swcURL = 'https://dev-cores200.uplab.com' + URL.UWS.JOIN_MEET_ME_SWC + parameters;
    this.logger.log('Open SWC settings / test mode via link: %s', swcURL);
    window.open(swcURL);
  }

  joinToMeeting(meetingOptions): void {
    let parameters = {
      oneTimeToken: meetingOptions.oneTimeToken,
      middlewareUrl: this.userSettingsService.portalResources.resources.middleware.POST.createSwcInfo.href,
      dataOnly: !!meetingOptions.presentationOnly,
      audioOnly: !!meetingOptions.audioOnly,
      displayName: meetingOptions.name,
      meetingId: meetingOptions.meetingId,
      brandingUrl: this.userSettingsService.portalResources.brandingUrl,
      ottMode: this.userSettingsService.portalResources.ottMode,
      // TODO: remove sg
      sgHost: window.location.hostname,
      sgPort: window.location.port,
      enabledLogs: window.localStorage.enabledLogs,
      nochat: meetingOptions.nochat,
      callMeBackWasUsed: !!meetingOptions.callMeBackWasUsed,
      // TODO get 'autojoin' from url
      autojoin: Boolean(this.route.snapshot.queryParams.autojoin)
    };

    parameters = this.globalService.encodeQueryData(parameters);

    // TODO use window.location.origin on portal
    // const swcURL = window.location.origin + URL.UWS.JOIN_MEET_ME_SWC + parameters;
    const swcURL = 'https://dev-cores200.uplab.com' + URL.UWS.JOIN_MEET_ME_SWC + parameters;
    meetingOptions.meetingURL = swcURL;

    this.logger.log('openSWC: Open SWC via link: %s', swcURL);
    if (meetingOptions.window) {
      this.logger.log('openSWC: Using existing tab from meetingOptions: %o', meetingOptions.window);
      meetingOptions.window.location.href = swcURL;
    } else {
      window.location.replace(swcURL);
    }
  }

  private updateClientInfoInStorage(): void {
    const newData = this.clientData;
    this.logger.log('Update client info for SWC client in storage: %o', newData);
    window.localStorage.setItem(CLIENT_TYPE.SWC, JSON.stringify(newData));
  }

  private isBrowserVersionSupported(browserVersion, minSupportedVersion): boolean {
    const isSupported = (this.versionService.compareVersions(browserVersion, minSupportedVersion) >= 0);
    this.logger.info('isBrowserVersionSupported: currentVersion=%s, minSupportedVersion=%s, isSupported=%s',
      browserVersion, minSupportedVersion, isSupported);
    return isSupported;
  }

  private setupUseBrowserValue(): void {
    const defaultUseBrowserForUser  = 'false';
    const defaultUseBrowserForGuest = '' + this.canRun(false).result;

    let newVal = this.authorizationService.userType === USER_TYPE.SIGN_IN ?
      JSON.parse(window.localStorage.useBrowserToJoinForSignedinUsers || defaultUseBrowserForUser) :
      JSON.parse(window.localStorage.useBrowserToJoinForGuest || defaultUseBrowserForGuest);

    if (this.userSettingsService.portalResources.clientSettings &&
      this.userSettingsService.portalResources.clientSettings.webMeetMeClientEnableRank === this.CLIENT_IS_DISABLED) {
      newVal = false;
    }

    if (this.useBrowserToJoin !== newVal) {
      this.useBrowserToJoin = newVal;
    }
  }

}
