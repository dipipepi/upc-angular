import {Component, OnInit} from '@angular/core';
import {PortalResourcesServiceService} from './services/portal-resources-service.service';
import {FormGroup} from '@angular/forms';
import {AuthorizationService} from './services/AuthorizationService/authorization.service';
import {LocalizationService} from './services/LocalizationService/localization.service';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsService} from './services/UserSettingsService/user-settings.service';
import { Logger } from '../Logger';
import {BROWSERS, DATE_FORMAT, OS, UP_CLIENT_CONNECTION_SETTINGS, USER_TYPE} from './constants';
import {CustomDeviceDetectorService} from './services/CustomDeviceDetectorService/custom-device-detector.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit{
  title = 'upc';
  name= '';
  isResourcesLoading = true;
  authForm: FormGroup;
  logger = new Logger('GlobalController');
  private hasStyle = false;
  private userClient;
  private defaultTimeFormat = JSON.stringify({
    useDefault : true,
    use24HourFormat : true,
    dateFormat : DATE_FORMAT.MM_DD_YY
  });

  private errorMessageAboutExpired;
  private errorMessageAboutWindowWidth;
  private widthError;

  constructor(public portalResourcesServiceService: PortalResourcesServiceService,
              private authorizationServiceService: AuthorizationService,
              private localization: LocalizationService,
              public translate: TranslateService,
              private userSettingsService: UserSettingsService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private titleService: Title) {
    translate.setDefaultLang(localization.initLocalization());
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // TODO 1) GET FIRST RESOURCES
    // TODO 2) CHECK TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) GET USER RESOURCES

    this.userSettingsService.fetchResources(true).then(() => {

      // tslint:disable-next-line:no-shadowed-variable
      this.authorizationServiceService.validateToken().then(() => {
        this.initializeMainComponent();
      }, () => {
        this.initializeMainComponent();
      });
      window.localStorage.timeFormat = !!window.localStorage.timeFormat ? window.localStorage.timeFormat :  this.defaultTimeFormat;

      window.localStorage.enabledLogs = window.localStorage.enabledLogs ? JSON.parse(window.localStorage.enabledLogs) : true;
    }, () => {
      alert('Error. Can not get resources');
    });
  }

  private useBranding(): void {
    this.logger.info('Receive event RESOURCES_UPDATED');
    // TODO test after changes with authentication refactoring
    this.addAuthenticatedUserClass();
    this.defineCustomFavicon();
    this.addExternalUserClass();


    if (this.hasStyle) {
      this.logger.info('Style is defined. Return');
      return;
    }
    if (this.userSettingsService.portalResources.branding && this.userSettingsService.portalResources.branding.customScript) {
      this.addScript(this.userSettingsService.portalResources.branding.customScript);
    }

    if (this.userSettingsService.portalResources.branding && this.userSettingsService.portalResources.branding.brandingStyle) {
      this.logger.info('Load branding style.min.css');
      this.addStylesheet(this.userSettingsService.portalResources.branding.brandingStyle);
    } else {
      this.logger.info('Load default style.min.css');
      this.addStylesheet(UP_CLIENT_CONNECTION_SETTINGS.frontEndUPCBaseURL + '/assets/styles/style.min.css');
    }

    if (this.userSettingsService.portalResources.branding && this.userSettingsService.portalResources.branding.customStyle) {
      this.logger.info('Load custom-style.css');
      this.addStylesheet(this.userSettingsService.portalResources.branding.customStyle);
    }

    if (this.userSettingsService.portalResources.isAemo) {
      this.addAemoStyle();
    }
  }

  private addAuthenticatedUserClass():void {
    if (this.authorizationServiceService.userType === USER_TYPE.SIGN_IN) {
      document.body.classList.add('up-authenticated-user');
      document.body.classList.remove('up-guest-user');
    } else {
      document.body.classList.add('up-guest-user');
      document.body.classList.remove('up-authenticated-user');
    }
  }

  private defineCustomFavicon():void {
    if (!this.userSettingsService.portalResources) {
      this.logger.info('defineCustomHTML: Resources are not defined yet.');
      return;
    }

    if (this.userSettingsService.portalResources.branding) {
      if (this.userSettingsService.portalResources.branding.upcFavicon) {
        const favicon = document.querySelector('link[rel="shortcut icon"]');
        if (favicon) {
          // @ts-ignore
          favicon.href = this.userSettingsService.portalResources.branding.upcFavicon;
        }
      }
    }
  }

  private addExternalUserClass():void {
    if (this.userSettingsService.portalResources.externalUser) {
      document.body.classList.add('up-external-user');
      document.body.classList.remove('up-internal-user');
    } else {
      document.body.classList.add('up-internal-user');
      document.body.classList.remove('up-external-user');
    }
  }

  private addScript(scriptUrl): void {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    head.appendChild(script);
  }

  private addStylesheet(stylesheet): void {
    if (this.customDeviceDetector.os === OS.WINDOWS && this.customDeviceDetector.browser === BROWSERS.IE) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = stylesheet;

      link.onload = () => {
        this.logger.info('Style has been loaded. onload');
        this.hasStyle = true;
      };

      head.appendChild(link);
    } else {
      const style = document.createElement('style');
      style.textContent = '@import "' + stylesheet + '"';
      try {
        this.logger.log('Style is loaded');
        this.hasStyle = true;
      } catch (e) {
        this.logger.log('Style is not loaded. try to check again');
      }

      document.getElementsByTagName('head').item(0).appendChild(style);
    }
  }

  private addAemoStyle(): void {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    style.innerText = 'label.thumbnail {' +
      '  pointer-events:none;' +
      '}' +
      '' +
      '[ng-if="broadcast.allowStreaming"] label.thumbnail {' +
      '  display:none !important;' +
      '}';
    head.appendChild(style);
  }

  private setTitle(): void {
    if (!this.userSettingsService.portalResources) {
      this.titleService.setTitle('');
    } else {
      this.titleService.setTitle(this.userSettingsService.portalResources.customProductName ||'Avaya Meetings');
    }
  }

  private initializeMainComponent():void {
    this.useBranding();
    this.setTitle();
    this.defineCustomFavicon();
    this.isResourcesLoading = false;
    window.localStorage.videoCallingPreferences = window.localStorage.videoCallingPreferences || true;
    window.localStorage.timeFormat = !!window.localStorage.timeFormat ? window.localStorage.timeFormat : this.defaultTimeFormat;
    window.localStorage.enabledLogs = window.localStorage.enabledLogs ? JSON.parse(window.localStorage.enabledLogs) : true;
  }
}

