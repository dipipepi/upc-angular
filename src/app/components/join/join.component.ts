import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Logger } from '../../../Logger';
import {TranslateService} from '@ngx-translate/core';
import {DateFormatService} from '../../shared/services/DateFormatService/date-format.service';
import {ACClientService} from '../../services/ACClientService/acclient.service';
import {MeetingUtilsService} from '../../shared/services/MeetingUtilsService/meeting-utils.service';
import {EventService} from '../../shared/services/EventService/event.service';
import {BROWSERS, CLIENT_TYPE, DELAY, ERROR_CODE, EVENT, LOCAL_STORAGE, MOBILE_STORE_LINK, OS, STATE, USER_TYPE} from '../../constants';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {GlobalService} from '../../services/GlobalService/global.service';
import {BrowserInfoService, VersionService} from '../../services/BrowserInfoService/browser-info.service';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {ScheduleService} from '../../services/ScheduleService/schedule.service';
import {MatDialog} from '@angular/material/dialog';
import {ViewMeetingComponent} from '../view-meeting/view-meeting.component';
import {ClientStatusService} from '../../services/ClientStatusService/client-status.service';
import {SWCClientService} from '../../services/SWCClientService/swcclient.service';
import {JoinService} from '../../services/JoinService/join.service';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent implements OnInit, OnDestroy {
  dateFormat = this.dateFormatService.getDateFormat();
  clientSettingsOpened = false;
  isClientInstalled = this.accClientService.clientData.isInstalled;
  optionsForJoin = [];
  optionsForJoinGuest = [];
  plannedEndMeetingTime = this.meetingUtilsService.plannedEndTime;
  isConferenceExists = true;
  meetingStarted = false;
  meetingIdPattern = /^[0-9]{1,32}(\*\*\*[0-9]{0,16}(\*[0-9]{0,16})?)?$/;
  currentTime = Date.now();
  guestCaption = 'app/components/join/templates/GuestCaptionView.html';
  signInCaption = 'app/components/join/templates/SignInCaptionView.html';
  useBrowserMessage = 'Use browser';
  peEnabled: boolean;
  meeting: { name: string; id: string };

  private logger = new Logger('JoinController');
  private upcomingMeetingsTimeout = DELAY.UPCOMING_MEETINGS_TIMEOUT;
  private screenSharingExtensionOfferDelay = DELAY.SCREEN_SHARING_EXTENSION_OFFER_DELAY;
  private outlookPlugInOfferDelay = DELAY.OUTLOOK_PLUGIN_OFFER_DELAY;
  private autoJoinDelay = DELAY.AUTO_JOIN_DELAY;
  private hadAutoJoinHandledAlready = false;
  private autoJoinTimeoutPromise: any;
  private meetingDetailsPopup: any;
  meetingStartedMessage: string;
  isMobileButton: boolean;
  getAttendiesSeparator: (index: number, length: number) => string;
  canShowUseBrowserCheckbox: boolean;
  meetingOptions: any;
  browserWasUsedLastTime: any;
  logoType: string;
  customLogoStyle: any;
  customLogoSrc: string;
  isDesktop: boolean;
  checkBrowserExclusions: (dataOnly) => boolean;
  linkForDownloadApp: string;
  upcomingMeetings: any[];

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private dateFormatService: DateFormatService,
              private accClientService: ACClientService,
              private meetingUtilsService: MeetingUtilsService,
              public customDeviceDetectorService: CustomDeviceDetectorService,
              private eventService: EventService,
              private browserInfoService: BrowserInfoService,
              public userSettingsService: UserSettingsService,
              private scheduleService: ScheduleService,
              private dialog: MatDialog,
              private clientStatusService: ClientStatusService,
              private swcClientService: SWCClientService,
              private joinService: JoinService,
              private globalService: GlobalService,
              private versionService: VersionService,
              public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    console.log('hello route' , this.route);
    if(!window.localStorage.currentAndRecentOptions){
      window.localStorage.currentAndRecentOptions = JSON.stringify(this.optionsForJoin);
    }

    if(!window.localStorage.currentAndRecentOptionsForGuest){
      window.localStorage.currentAndRecentOptionsForGuest = JSON.stringify(this.optionsForJoinGuest);
    }

    window.localStorage.isOutlookPluginShown = window.localStorage.isOutlookPluginShown || false;

    this.eventService.on(ERROR_CODE.JOIN.WRONG_MEETING_ID, (event) => {
      this.isConferenceExists = false;
    });

    this.eventService.on(EVENT.CUSTOM.ID_WAS_CHANGED, () => {
      this.isConferenceExists = true;
    });

    window.localStorage.haveDownloadedClient = window.localStorage.haveDownloadedClient || false;
    // this.handleEvents();

    if (this.customDeviceDetectorService.isDesktop() && this.customDeviceDetectorService.browser === BROWSERS.CHROME &&
      this.globalService.offerScreenSharingExtension && !this.browserInfoService.isDataOnlyBrowserExclusion() &&
      // @ts-ignore
      !AvayaClientServices.Providers.ContentSharing.FeatureSupported.isSharingAnyTypeAvailable()) {
      setTimeout(() => {
        // TODO create this method
        // MessageUtilsService.showScreenSharingExtensionOffer(this.userSettingsService.portalResources);
      }, this.screenSharingExtensionOfferDelay);
    }

    if (this.userSettingsService.portalResources) {
      this.peEnabled = this.userSettingsService.portalResources.peEnabled;
    } else {
      this.peEnabled = false;
    }

    window.localStorage.videoCallingPreferences = window.localStorage.videoCallingPreferences || true;

    // this.updateUpcomingMeetings();
    // this.updateMyMeetings();
    // this.defineCustomHTML();

    this.meeting = {
      id: this.route.snapshot.queryParams.ID || '',
      name: this.route.snapshot.queryParams.ID || window.localStorage[LOCAL_STORAGE.GUEST_NAME] || ''
    };

    this.isMobileButton = !(this.customDeviceDetectorService.os === OS.MAC || this.customDeviceDetectorService.os === OS.WINDOWS);

    this.getAttendiesSeparator = this.meetingUtilsService.getAttendiesSeparator;

    this.canShowUseBrowserCheckbox = false;

    this.eventService.on(EVENT.CUSTOM.RESOURCES_UPDATED, () => {
      setTimeout(() => {
        // @ts-ignore
        this.canShowUseBrowserCheckbox = (this.accClientService.canRun(true).result ||
          // @ts-ignore
          this.accClientService.canRun(false).result) &&
          (this.swcClientService.canRun(true).result || this.swcClientService.canRun(false).result);
        // @ts-ignore
        this.useBrowserMessage = (this.accClientService.canRun(false).result && this.swcClientService.canRun(false).result) ?
          this.translate.instant('JOIN.USE_BROWSER_FOR_AUDIO_AND_VIDEO') :
          this.translate.instant('JOIN.USE_BROWSER_FOR_PRESENTATION_ONLY');
        // this.showAdminNotification();
      }, 100);
    });

    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGIN, this.checkAndShowFirstTimeDownloadRollover);
    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGOUT, this.checkAndShowFirstTimeDownloadRollover);

    this.initResources();

    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGIN_WITH_CREDENTIALS, () => {
      // this.showOutlookPlugIn();
    });

    this.isDesktop = this.customDeviceDetectorService.isDesktop();

    this.eventService.on(EVENT.CUSTOM.RESET_FIRST_LAUNCH_TUTORIALS, () => {
      // this.firstLaunchTutorial();
    });

    // this.showAdminNotification();

    this.checkBrowserExclusions = this.browserInfoService.checkBrowserExclusions;

    if (this.customDeviceDetectorService.os === OS.ANDROID || this.customDeviceDetectorService.os === OS.CHROME_OS) {
      this.linkForDownloadApp = MOBILE_STORE_LINK.ANDROID;
    } else if (this.customDeviceDetectorService.os === OS.IOS) {
      this.linkForDownloadApp = MOBILE_STORE_LINK.IOS;
    }


  }

  ngOnDestroy(): void {
    if (this.upcomingMeetingsTimeout) {
      clearTimeout(this.upcomingMeetingsTimeout);
    }


  }



  joinLastMeetingWithBrowser() {
    if (this.meetingOptions) {
      this.logger.log('Will try to join to this meeting in PO mode with current options %o', this.meetingOptions);
      this.meetingOptions.preferredClient = CLIENT_TYPE.SWC;

      if ((!this.meetingOptions.presentationOnly || this.meetingOptions.audioOnly) && !this.swcClientService.canRun(false).result) {
        this.meetingOptions.presentationOnly = true;
        this.meetingOptions.audioOnly = false;
      }

      this.joinService.joinToMeeting(this.meetingOptions.meetingId, this.meetingOptions);
    } else {
      this.logger.error('Try to join meeting in PO mode without meeting context!');
    }
  }

  canJoinLastMeetingWithBrowser() {
    if (!this.meetingOptions) {
      return false;
    }
    return this.swcClientService.canRun(true).result || this.swcClientService.canRun(false).result;
  }

  downloadACAndClearStorage() {
    this.accClientService.downloadClient();
    this.accClientService.clearClientData();
  }

  canDownloadAC() {
    return this.accClientService.canShowDownloadButton();
  }

  downloadClient() {
    return this.clientStatusService.downloadClient();
  }

  canShowDownloadButton() {
    return this.clientStatusService.canShowDownloadButton();
  }

  joinAnotherMeeting() {
    this.meetingStarted = false;
    this.clientSettingsOpened = false;
    delete this.meetingOptions;
    delete this.browserWasUsedLastTime;
  }

  initResources() {
    // default logo type is svg with predefined sizes
    this.logoType = 'svg-logo';
    this.customLogoStyle = '';

    if (!this.userSettingsService.portalResources) {
      this.customLogoStyle = {'background-image': 'none'};
    } else if (this.userSettingsService.portalResources.isAemo) {
      this.customLogoSrc = '/portal/assets/images/custom_logo.png';
      this.logoType = 'png-logo';
      this.customLogoStyle = {
      order: -1,
      'margin-bottom': 0
      };
    } else if (this.userSettingsService.portalResources.customLogoUrl) {
    // for svg we support only predefined size
      if (this.userSettingsService.portalResources.customLogoUrl.toLowerCase().indexOf('.svg') !== -1) {
        this.customLogoStyle = {'background-image' : 'url("' + this.userSettingsService.portalResources.customLogoUrl + '")'};
      } else {
        // for rest of formats - just use img tag
        this.customLogoSrc = this.userSettingsService.portalResources.customLogoUrl;
        this.logoType = 'png-logo';
        }
    }

    // poweredByLogo
    if (this.userSettingsService.portalResources.customLogoUrl && this.userSettingsService.portalResources.branding.poweredByLogo) {
      // @ts-ignore
      $(document).ready(() => {
        const img = new Image();
        const powered = document.querySelector('.powered-by-logo');

        if (!!powered && !powered.querySelector('img')) {
          if(this.customDeviceDetectorService.isDesktop()){
            img.addEventListener('load', () => {
              // @ts-ignore
              document.querySelector('.notifications-container').style.bottom = img.offsetHeight + 'px';
            });
          }
          img.src = this.userSettingsService.portalResources.branding.poweredByLogo;
          powered.appendChild(img);
        }
      });
    }
}

  showAdjustAV2dPage() {
    return this.clientSettingsOpened;
  }

  showSWC2dPage() {
    return !this.clientSettingsOpened &&  this.browserWasUsedLastTime;
  }

  showACClient2dPage() {
    return !this.clientSettingsOpened && !this.browserWasUsedLastTime;
  }

  showMessageIfClientNotStarted() {
    if (this.meetingOptions && this.browserWasUsedLastTime) {
      // swc caase
      return this.meetingOptions.meetingURL && this.route.snapshot.queryParams.autojoin;
    } else if (this.meetingOptions && !this.browserWasUsedLastTime) {
      // ac case
      return this.canJoinLastMeetingWithBrowser() || this.canDownloadAC();
    } else if (this.clientSettingsOpened) {
      // client settings case
      return this.canDownloadAC();
    } else {
      return false;
    }
  }

  showMeetingDetails(meeting, event) {
    let element = event.target;

    while (element.tagName !== 'LI') {
      element = element.parentElement;
    }

    const mainElement = document.getElementById('main');
    let preferredTop = element.getBoundingClientRect().top + mainElement.scrollTop - mainElement.getBoundingClientRect().top + 20;
    if (preferredTop < mainElement.scrollTop) {
      preferredTop = mainElement.scrollTop + 20;
    }

    const data = {
      meeting,
      preferredTop,
      preferredLeft: event.clientX + 20,
      meetingActions: [{
        name: this.translate.instant('SCHEDULE.CONTEXT_MENU.NEW_EMAIL'),
        func: () => { this.scheduleService.emailAttendees(meeting); }
      }, {
        name: this.translate.instant('SCHEDULE.CONTEXT_MENU.MEETING_OPTIONS'),
        func: () => { this.editMeeting(meeting); }
      }, {
        name: this.translate.instant('SCHEDULE.CONTEXT_MENU.CANCEL'),
        func: () => {},
        class: 'cancel'
      }]
    };

    const meetingView = document.getElementsByClassName('ngdialog-theme-meeting-details');
    if(meetingView.length !== 0){
      this.meetingDetailsPopup.close();
    }

    this.meetingDetailsPopup = this.dialog.open(ViewMeetingComponent, {
      data
    });

    // this.meetingDetailsPopup = ngDialog.open({
    //   template: 'app/components/meeting/templates/MeetingView.html',
    //   controller: 'ViewMeetingController',
    //   data: data,
    //   overlay: false,
    //   showClose: false,
    //   appendTo: '#main',
    //   closeByNavigation: true,
    //   closeByDocument: false,
    //   className: 'ngdialog-theme-meeting-details ngdialog-theme-upcoming-meeting-details',
    //   preCloseCallback: this.onCloseMeetingDetails,
    // });

    document.addEventListener('click', this.closeMeetingDetails);
  }

  openClientSettings(): void {

    if (this.browserInfoService.isWebRTCBrowser() && !(this.browserInfoService.isWebRTCBrowserExclusion() ||
      this.browserInfoService.isDataOnlyBrowserExclusion())) {
      this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
    } else {
      this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
    }

    this.clientStatusService.openClientSettings();

    if (this.clientStatusService.selectedClient === CLIENT_TYPE.AC) {
      this.clientSettingsOpened = true;
      this.meetingStartedMessage = 'JOIN.STARTED_SWC';
    }
  }

  canShowAdjustButton(): boolean {
    return this.clientStatusService.canShowAdjustButton();
  }

  private editMeeting(meeting) {
    this.scheduleService.editMeeting(meeting).then(this.updateUpcomingMeetings);
  }

  private checkAndShowFirstTimeDownloadRollover() {
    const latestVersion = !!this.accClientService.clientData.latestVersion ? this.accClientService.clientData.latestVersion.version : '';
    if (this.accClientService.clientData.isInstalled &&
      this.versionService.isUpdateRequired(this.accClientService.clientData.version, latestVersion) &&
      !this.globalService.isRolloverShowing &&
      this.accClientService.clientData.isMeetMeOnly === true) {
      // TODO create this method
      // this.MessageUtilsService.showBlueRollover('JOIN.OPTIONAL_UPGRADE_DOWNLOAD',
      // {link: this.accClientService.clientData.latestVersion.url});
      this.globalService.isRolloverShowing = true;
    }
    return;
  }

  private onCloseMeetingDetails() {
    document.removeEventListener('click', this.closeMeetingDetails);
  }

  private closeMeetingDetails(e) {
    if(document.getElementById(this.meetingDetailsPopup.id) &&
      (!(document.getElementById(this.meetingDetailsPopup.id).contains(e.target)) ||
      (document.getElementById(this.meetingDetailsPopup.id).contains(e.target) &&
        (e.target.classList.contains('main-container') || e.target.classList.contains('mobile-button'))))) {
      // this.dialog.close(this.meetingDetailsPopup.id);
      this.meetingDetailsPopup.close();
      document.removeEventListener('click', this.closeMeetingDetails);
    }
  }

  private updateUpcomingMeetings() {
    if (!this.upcomingMeetings) {
      this.upcomingMeetings = [];
    }

    if (this.authorizationService.userType === USER_TYPE.SIGN_IN && this.route.snapshot.routeConfig.path === STATE.JOIN) {
      this.scheduleService.service.getMeetingListStartsIn(5).fail((response) => {
        this.logger.warn('getMeetingListStartsIn request is failed: %s', JSON.stringify(response));
      }).done((response) => {
        this.logger.log('Success get meetings list by period: %o', response.meetings);
        if (response.meetings.length !== 0) {
          this.upcomingMeetings = response.meetings;
        } else {
          this.upcomingMeetings = [];
        }
        // TODO create this method
        // this.MessageUtilsService.closeFirstLaunchTutorials();
        this.firstLaunchTutorial();
      });
      this.upcomingMeetingsTimeout = setTimeout(this.updateUpcomingMeetings, 60000);
    } else {
      this.firstLaunchTutorial();
    }
  }
}
