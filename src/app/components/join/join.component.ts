import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Logger } from '../../../Logger';
import {TranslateService} from '@ngx-translate/core';
import {DateFormatService} from '../../shared/services/DateFormatService/date-format.service';
import {ACClientService} from '../../services/ACClientService/acclient.service';
import {MeetingUtilsService} from '../../shared/services/MeetingUtilsService/meeting-utils.service';
import {EventService} from '../../shared/services/EventService/event.service';
import {
  BROWSERS,
  CLIENT_TYPE,
  DELAY,
  ERROR_CODE,
  EVENT,
  LOCAL_STORAGE,
  MOBILE_STORE_LINK,
  OS,
  STATE,
  UP_CLIENT_CONNECTION_SETTINGS,
  USER_TYPE,
  URL
} from '../../constants';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {GlobalService} from '../../services/GlobalService/global.service';
import {BrowserInfoService, VersionService} from '../../services/BrowserInfoService/browser-info.service';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {ScheduleService} from '../../services/ScheduleService/schedule.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ViewMeetingComponent} from '../view-meeting/view-meeting.component';
import {ClientStatusService} from '../../services/ClientStatusService/client-status.service';
import {SWCClientService} from '../../services/SWCClientService/swcclient.service';
import {JoinService} from '../../services/JoinService/join.service';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {GuestSettingsComponent} from '../settings/guest-settings/guest-settings.component';
import {EnterNameToJoinViewComponent} from './enter-name-to-join/enter-name-to-join.component';
import {RequestToOpenMobileClientComponent} from './request-to-open-mobile-client/request-to-open-mobile-client.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class JoinComponent implements OnInit, OnDestroy {
  dateFormat = this.dateFormatService.getDateFormat();
  clientSettingsOpened = false;
  isClientInstalled = this.accClientService.clientData.isInstalled;
  optionsForJoin = [];
  optionsForJoinGuest = [];
  plannedEndMeetingTime = this.meetingUtilsService.plannedEndTime.bind(this.meetingUtilsService);
  isConferenceExists = true;
  meetingStarted = false;
  meetingIdPattern = /^[0-9]{1,32}(\*\*\*[0-9]{0,16}(\*[0-9]{0,16})?)?$/;
  currentTime = Date.now();
  guestCaption = `<div class=\'join-caption\'>${this.translate.instant('JOIN.CAPTION')}</div>`;
  signInCaption: any;
  useBrowserMessage = 'Use browser';
  peEnabled: boolean;
  meeting: {
    attendees?: any;
    name: string; id: string };

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
  myMeetings: any;
  custom2: string;
  custom3: string;
  customAfterLaunch: string;
  availableDevices: MediaDeviceInfo[];
  translateParams: any;
  private isMeetingDetailsDialogOpen: boolean;
  upLegalStatement: any;

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
              public globalService: GlobalService,
              private versionService: VersionService,
              public authorizationService: AuthorizationService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
    this.handleEvents();

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
    this.eventService.broadcast(EVENT.CUSTOM.VIDEO_CALLING_PREFERENCES_CHANGED, window.localStorage.videoCallingPreferences);

    this.updateUpcomingMeetings();
    this.updateMyMeetings();
    this.defineCustomHTML();

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

    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGIN, this.checkAndShowFirstTimeDownloadRollover.bind(this));
    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGOUT, this.checkAndShowFirstTimeDownloadRollover.bind(this));

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

    this.translateParams = {
      link: this.meetingOptions?.meetingURL,
      n: this.meeting.attendees?.length - 3
    };

    // this.upLegalStatement = this.sanitizer.bypassSecurityTrustHtml(this.translate.instant('JOIN.LEGAL_TEXT.DEFAULT'));

    this.translate.get('JOIN.LEGAL_TEXT.DEFAULT').subscribe(s => {
      this.upLegalStatement = this.sanitizer.bypassSecurityTrustHtml(s);
    });
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
      data,
      restoreFocus: false,
      position: {
        left: data.preferredLeft + 'px',
        top: data.preferredTop + 141 + 'px'
      },
      panelClass: 'ngdialog-theme-meeting-details',
      hasBackdrop: false
    });

    this.meetingDetailsPopup.afterOpened().subscribe(()=>{
      document.addEventListener('click', this.closeMeetingDetails.bind(this));
      this.isMeetingDetailsDialogOpen = true;
    });

    this.meetingDetailsPopup.afterClosed().subscribe(()=>{
      document.removeEventListener('click', this.closeMeetingDetails.bind(this));
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

    // document.addEventListener('click', this.closeMeetingDetails.bind(this));
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

  isThereClientToDownload() {
    return !!this.accClientService.clientData.latestVersion;
  }

  private editMeeting(meeting) {
    // TODO create this method
    // this.scheduleService.editMeeting(meeting).then(this.updateUpcomingMeetings.bind(this));
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
    document.removeEventListener('click', this.closeMeetingDetails.bind(this));
  }

  private closeMeetingDetails(e) {

    if(this.isMeetingDetailsDialogOpen && document.getElementById(this.meetingDetailsPopup?.id) &&
      (!(document.getElementById(this.meetingDetailsPopup?.id).contains(e.target)) ||
      (document.getElementById(this.meetingDetailsPopup?.id).contains(e.target) &&
        (e.target.classList.contains('main-container') || e.target.classList.contains('mobile-button'))))) {
      // this.dialog.close(this.meetingDetailsPopup.id);
      this.meetingDetailsPopup.close();
      this.meetingDetailsPopup = null;
      document.removeEventListener('click', this.closeMeetingDetails.bind(this));
      this.isMeetingDetailsDialogOpen = false;
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
      this.upcomingMeetingsTimeout = setTimeout(this.updateUpcomingMeetings.bind(this), 60000);
    } else {
      this.firstLaunchTutorial();
    }
  }

  private updateMyMeetings() {
    this.logger.info('updateMyMeetings()');
    if (!this.myMeetings) {
      this.myMeetings = {
        virtualRooms: []
      };
    }
    if (this.authorizationService.userType === USER_TYPE.SIGN_IN && this.route.snapshot.routeConfig.path === STATE.JOIN) {
      this.optionsForJoin = [];
      const userSettings = this.userSettingsService.getUserSettings();
      const defaultVRId = userSettings.conferencing.defaultVirtualRoom;
      this.myMeetings.virtualRooms = userSettings.conferencing.virtualRoomSettings || [];

      if (this.myMeetings.virtualRooms.length !== 0) {
        this.myMeetings.virtualRooms.forEach((item) => {
          let vrNumberForDisplay = '';
          let vrNameForDisplay = '';
          let tooltip = '';
          if (item.name.length > 26) {
            if (item.name.indexOf(' ') !== -1) {
              vrNameForDisplay = item.name.slice(0, this.globalService.maxVrName) + '...';
            } else {
              vrNameForDisplay = item.name.slice(0, this.globalService.maxVrNameWithSpace) + '...';
            }
          } else {
            vrNameForDisplay = item.name;
          }

          if (item.number.length > this.globalService.maxVrNumber) {
            vrNumberForDisplay =  '...' + item.number.substr(-this.globalService.maxVrNumber);
          } else {
            vrNumberForDisplay = item.number;
          }

          if (item.name.length > this.globalService.maxVrName || item.number.length > this.globalService.maxVrNameWithSpace) {
            tooltip = item.name + ' - ' + item.number;
          }

          let pin = '';
          if (item.accessPIN) {
            pin = '*' + atob(item.accessPIN);
          }
          this.optionsForJoin.push({
            name: vrNameForDisplay,
            fullName: item.name || '',
            number: item.number,
            numberForDisplay: vrNumberForDisplay,
            tooltip,
            url:  window.location.href + '?ID=' + item.number + pin
          });
        });
      }

      // $scope.optionsForJoin.push(JSON.parse($window.localStorage.currentAndRecentOptions));
      JSON.parse(window.localStorage.currentAndRecentOptions).forEach((item) => {
        if(item.className){
          this.optionsForJoin.push(item);
        }
      });


      if(window.localStorage.currentAndRecentOptions === '[]'){
        window.localStorage.currentAndRecentOptions = JSON.stringify(this.optionsForJoin);
      }


      if (this.myMeetings.virtualRooms.length === 0) {
        return;
      }

      this.myMeetings.virtualRooms.forEach((virtualRoom) => {

        virtualRoom.url = window.location.origin + UP_CLIENT_CONNECTION_SETTINGS.frontEndUPCBaseURL +
          // TODO get alias from url
          // URL.UPC.BASE.replace(':alias', this.$stateParams.alias) + URL.UPC.JOIN + '?ID=' + virtualRoom.number;
          URL.UPC.BASE.replace(':alias', 'dev-org200') + URL.UPC.JOIN + '?ID=' + virtualRoom.number;
        if (!this.myMeetings.selectedVirtualRoom && defaultVRId === virtualRoom.virtualRoomId) {
          this.myMeetings.selectedVirtualRoom = virtualRoom;
        }
      });

      if (!this.myMeetings.selectedVirtualRoom) {
        this.myMeetings.selectedVirtualRoom = this.myMeetings.virtualRooms[0];
        this.eventService.broadcast(EVENT.CUSTOM.SET_VIRTUAL_ROOM_NUMBER, this.myMeetings.selectedVirtualRoom);
      } else {
        this.eventService.broadcast(EVENT.CUSTOM.SET_VIRTUAL_ROOM_NUMBER, this.myMeetings.selectedVirtualRoom);
      }
    } else {
      this.optionsForJoinGuest = JSON.parse(window.localStorage.currentAndRecentOptionsForGuest);
    }

    // autoInsert id meeting for mobile
    setTimeout(() => {
      if (!this.customDeviceDetectorService.isDesktop()) {
        if(Boolean(this.route.snapshot.queryParams.ID)){
          this.meeting.id = this.route.snapshot.queryParams.ID;
        } else if((!Boolean(this.route.snapshot.queryParams.ID)) && this.authorizationService.userType !== 'GUEST'){
          if(this.myMeetings.selectedVirtualRoom){
            this.meeting.id = this.myMeetings.selectedVirtualRoom.number;
          }
        } else if((!Boolean(this.route.snapshot.queryParams.ID)) && this.authorizationService.userType === 'GUEST'){
          const lastJoinId = this.optionsForJoinGuest.length - 1;
          if(this.optionsForJoinGuest.length !== 0){
            this.meeting.id = this.optionsForJoinGuest[lastJoinId].number;
          } else {
            this.meeting.id = '';
          }
        }
      }
    }, 300);


  }

  private turnToGuestMode() {
    this.logger.info('Turn to guest mode');
    this.meetingStarted = false;
    clearTimeout(this.upcomingMeetingsTimeout);
    this.upcomingMeetings = [];
    this.myMeetings.virtualRooms = [];
    this.myMeetings.selectedVirtualRoom = undefined;
  }

  private defineCustomHTML() {
    if (!this.userSettingsService.portalResources) {
      this.logger.info('defineCustomHTML: Resources are not defined yet.');
      return;
    }

    if (this.userSettingsService.portalResources.branding) {
      this.signInCaption = this.userSettingsService.portalResources.branding.customSignIn || this.signInCaption;
      this.guestCaption = this.userSettingsService.portalResources.branding.customGuest || this.guestCaption;
      this.custom2 = this.userSettingsService.portalResources.branding.custom2;
      this.custom3 = this.userSettingsService.portalResources.branding.custom3;
      this.customAfterLaunch = this.userSettingsService.portalResources.branding.customAfterLaunch;
    }
  }

  private handleEvents() {
    const shouldShowDownloadDialog = () => {
      return this.clientStatusService.selectedClient === CLIENT_TYPE.AC &&
        !this.isClientInstalled && !this.userSettingsService.portalResources.disablePopupForAppDownload;
    };

    const globalThis = this;

    const guestNameRequestToJoin = (meeting) => {
      this.logger.log('user name is requested for a meeting, id=%s', meeting.id);

      // TODO create this dialog
      // const dialogConfig = {
      //   template: 'app/components/join/templates/EnterNameToJoinView.html',
      //   closeByNavigation: false,
      //   closeByDocument: false,
      //   closeByEscape: false,
      //   showClose: false,
      //   className: 'ngdialog-theme-request-popup',
      //   controller: ['$scope', ($scope) => {
      //     $scope.meeting = meeting;
      //     $scope.join = function() {
      //       this.eventService.broadcast(EVENT.CUSTOM.AUTO_FILL_UPDATE);
      //       if (this.browserInfoService.isWebRTCBrowser()) {
      //         if(this.browserInfoService.isWebRTCBrowserExclusion() || this.browserInfoService.isDataOnlyBrowserExclusion()){
      //           this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
      //         } else {
      //           this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
      //         }
      //       } else {
      //         this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
      //       }
      //
      //       if (this.customDeviceDetectorService.isDesktop()) {
      //         if (shouldShowDownloadDialog()) {
      //           const options = {
      //             meetingId: this.data.meeting.id,
      //             joinMode: {
      //               name: this.data.meeting.name,
      //               audioOnly: !JSON.parse(window.localStorage.videoCallingPreferences)
      //             }
      //           };
      //           // TODO create this method
      //           // globalThis.MessageUtilsService.showDownloadDialog(options);
      //         } else {
      //           setTimeout(() => {
      //             this.joinService.joinToMeeting(this.data.meeting.id, {
      //               name: this.data.meeting.name,
      //               audioOnly: !!this.route.snapshot.queryParams.dataonly ? false :
      //                 !JSON.parse(window.localStorage.videoCallingPreferences)
      //             });
      //           }, 500);
      //         }
      //       } else {
      //         requestToOpenMobileClient($scope.meeting);
      //
      //         setTimeout(() => {
      //           this.joinService.joinToMeeting($scope.meeting.id, {
      //             name: $scope.meeting.name,
      //             audioOnly: !!this.route.snapshot.queryParams.dataonly ? false :
      //             !JSON.parse(window.localStorage.videoCallingPreferences)
      //           });
      //         }, 500);
      //       }
      //
      //       this.closeThisDialog();
      //     };
      //     $scope.cancel = function() {
      //       this.closeThisDialog();
      //     };
      //   }]
      // };
      this.dialog.open(EnterNameToJoinViewComponent, {
        data: {
          meeting,
          shouldShowDownloadDialog,
          requestToOpenMobileClient
        },
        panelClass: 'ngdialog-theme-request-popup'
      });
    };

    // workaround for Android - request authorized user to open SMC in case of autojoin
    const requestToOpenMobileClient = (meeting) => {

      this.dialog.open(RequestToOpenMobileClientComponent, {
        data: {
          meeting
        },
        panelClass: 'ngdialog-theme-request-popup'
      });
      // TODO create this dialog
      // const dialogConfig = {
      //   template: 'app/components/join/templates/RequestToOpenMobileClient.html',
      //   closeByNavigation: false,
      //   closeByDocument: false,
      //   closeByEscape: false,
      //   showClose: false,
      //   className: 'ngdialog-theme-request-popup',
      //   controller: ['$scope', function($scope) {
      //     $scope.meeting = meeting;
      //     $scope.join = function() {
      //       globalThis.$timeout(function() {
      //         globalThis.JoinService.joinToMeeting($scope.meeting.id, {
      //           name: $scope.meeting.name,
      //           audioOnly: !JSON.parse(globalThis.$window.localStorage.videoCallingPreferences)
      //         });
      //       }, 500);
      //       this.closeThisDialog();
      //     };
      //     $scope.cancel = function() {
      //       this.closeThisDialog();
      //     };
      //   }]
      // };
      // return this.ngDialog.openConfirm(dialogConfig);
    };

    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGIN, () => {
      this.logger.info('Handle \'SUCCESSFUL_LOGIN\' event');
      this.optionsForJoin = JSON.parse(window.localStorage.currentAndRecentOptions);

      // TODO create this method
      // this.MessageUtilsService.closeFirstLaunchTutorials();
      if (this.upcomingMeetingsTimeout) {
        clearTimeout(this.upcomingMeetingsTimeout);
      }
      this.updateUpcomingMeetings();
      this.updateMyMeetings();
      this.signInCaption = `<div class="join-caption">${this.translate.instant('JOIN.WELCOME_USER', {userName: this.globalService.user.name})}</div>`;
    });

    this.eventService.on(EVENT.CUSTOM.SUCCESSFUL_LOGOUT, () => {
      this.optionsForJoinGuest = JSON.parse(window.localStorage.currentAndRecentOptionsForGuest);
      this.logger.info('Handle \'SUCCESSFUL_LOGOUT\' event');

      // TODO create this method
      // this.MessageUtilsService.closeFirstLaunchTutorials();
      this.firstLaunchTutorial();
      this.turnToGuestMode();
    });

    this.eventService.on(EVENT.CUSTOM.UNAUTHORIZED_ACCESS, () => {
      this.logger.info('Handle \'UNAUTHORIZED_ACCESS\' event');
      this.turnToGuestMode();
    });

    this.eventService.on(EVENT.CUSTOM.RESOURCES_UPDATED, this.defineCustomHTML.bind(this));

    if (this.browserInfoService.isWebRTCBrowser() && this.customDeviceDetectorService.isDesktop()) {
      navigator.mediaDevices.enumerateDevices()
        .then((fetchedDevices) => {
          this.availableDevices = fetchedDevices;
        });
    }
    // TODO rework to remove events
    this.eventService.on(EVENT.CUSTOM.CHECK_AUTO_JOIN, () => {
      this.logger.info('Checking autojoin property');

      if (Boolean(this.route.snapshot.queryParams.autojoin) && this.route.snapshot.queryParams.ID && !this.hadAutoJoinHandledAlready) {
        if (this.autoJoinTimeoutPromise) {
          // it will work if we fetched data for guest and right after that refetch for signed-in user
          this.logger.log('Autojoining is in progress, lets restart it with updated resources');
          clearTimeout(this.autoJoinTimeoutPromise);
        }

        if(this.browserInfoService.isWebRTCBrowser() && !!this.availableDevices &&
          !this.globalService.haveConnectedMicrophone(this.availableDevices)) {
          const options = {
            meetingId: this.meeting.id,
            joinMode: {
              name: this.meeting.name,
              audioOnly: !window.localStorage.videoCallingPreferences
            }
          };
          // TODO create this method
          // this.MessageUtilsService.showMicrophoneDialog(options);
          return;
        } else {
          this.autoJoinTimeoutPromise = setTimeout(() => {
            this.logger.info('Execute autojoin scenario');
            if (this.meeting.name === '' && this.authorizationService.userType !== USER_TYPE.SIGN_IN) {
              // workaround for android - user manual action is required to open external app
              guestNameRequestToJoin(this.meeting);
            } else if (this.customDeviceDetectorService.os === OS.ANDROID || this.customDeviceDetectorService.os === OS.IOS) {
              requestToOpenMobileClient(this.meeting);
            } else {
              if(!this.route.snapshot.queryParams.dataonly && !this.route.snapshot.queryParams.clienttype){
                if(!this.getAutoJoinType()){
                  return;
                } else{
                  this.clientStatusService.selectedClient = this.getAutoJoinType();
                }
              }
              if(!!this.route.snapshot.queryParams.dataonly){
                this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
              }

              if (this.customDeviceDetectorService.isDesktop()) {
                if (shouldShowDownloadDialog()) {
                  const options = {
                    meetingId: this.meeting.id,
                    joinMode: {
                      name: this.meeting.name,
                      audioOnly: !JSON.parse(window.localStorage.videoCallingPreferences)
                    }
                  };
                  // TODO create this method
                  // this.MessageUtilsService.showDownloadDialog(options);
                } else {
                  setTimeout(() => {
                    this.joinService.joinToMeeting(this.meeting.id, {
                      name: this.meeting.name,
                      audioOnly: !!this.route.snapshot.queryParams.dataonly ? false :
                        !JSON.parse(window.localStorage.videoCallingPreferences)
                    });
                  }, 500);
                }
              } else {
                setTimeout(() => {
                  this.joinService.joinToMeeting(this.meeting.id, {
                    name: this.meeting.name,
                    audioOnly: !!this.route.snapshot.queryParams.dataonly ? false : !JSON.parse(window.localStorage.videoCallingPreferences)
                  });
                }, 500);
              }

            }
            this.hadAutoJoinHandledAlready = true;
          }, this.autoJoinDelay);
        }
      }
    });

    this.eventService.on(EVENT.DEFAULT.STATE_CHANGE_START, () => {
      this.logger.info('Handle \'STATE_CHANGE_START\' event');
      this.globalService.offerScreenSharingExtension = false;
      // TODO create this methids
      // this.MessageUtilsService.closeScreenSharingExtension();
      // this.MessageUtilsService.closeFirstLaunchTutorials();
      // this.MessageUtilsService.closeOutlookExtensionNotification();
    });

    this.eventService.on(EVENT.CUSTOM.CONFERENCE_STARTED, (event, meetingOptions) => {
      this.logger.info('Handle \'CONFERENCE_STARTED\' event');
      this.optionsForJoin = JSON.parse(window.localStorage.currentAndRecentOptions);
      this.optionsForJoinGuest = JSON.parse(window.localStorage.currentAndRecentOptionsForGuest);
      this.meetingStarted = true;
      if (this.customDeviceDetectorService.isDesktop()) {
        this.meetingOptions = meetingOptions;

        if (meetingOptions.preferredClient === CLIENT_TYPE.AC) {
          this.meetingStartedMessage = 'JOIN.STARTED_AC';
          this.browserWasUsedLastTime = false;
        } else {    // == CLIENT_TYPE.SWC
          this.browserWasUsedLastTime = true;
          this.meetingStartedMessage = 'JOIN.STARTED_SWC';
        }
      }
    });

    this.eventService.on(EVENT.CUSTOM.DEFAULT_VIRTUAL_ROOM_UPDATED, () => {
      this.logger.info('Handle \'DEFAULT_VIRTUAL_ROOM_UPDATED\' event');
      this.myMeetings.selectedVirtualRoom = undefined;
      this.updateMyMeetings();
    });
  }

  private haveOutlookPlugInToDownload() {
    if (this.customDeviceDetectorService.os === OS.WINDOWS) {
      return this.userSettingsService.portalResources.outlookPluginDownloadUrlWindows !== '';
    } else if (this.customDeviceDetectorService.os === OS.MAC) {
      return this.userSettingsService.portalResources.outlookPluginDownloadUrlMac !== '';
    }
  }

  private showOutlookPlugIn() {
    setTimeout(() => {
      if(this.haveOutlookPlugInToDownload() && this.customDeviceDetectorService.isDesktop() &&
        this.authorizationService.userType === USER_TYPE.SIGN_IN && !this.accClientService.clientData.isInstalled &&
        !JSON.parse(window.localStorage.isOutlookPluginShown)){
        setTimeout(() => {
          // TODO create this method
          // this.MessageUtilsService.OutlookExtensionNotificationView(this.userSettingsService.portalResources);
        }, this.outlookPlugInOfferDelay);
      }
    }, 2000);
  }

  private firstLaunchTutorial() {
    if (this.customDeviceDetectorService.isDesktop()) {
      // TODO create this method
      // this.MessageUtilsService.FirstLaunchTutorialOverlay(this);
    }
  }

  private showAdminNotification() {
    if (this.userSettingsService.portalResources) {
      if (this.userSettingsService.portalResources.notificationMessages.length !== 0){
        this.userSettingsService.isNewAdminNotification();
        if(JSON.parse(window.localStorage.isAdminNotificationShowing) && !this.globalService.isAdminNotificationShowing &&
          this.customDeviceDetectorService.isDesktop() && !this.globalService.wasAdminMessageClosed) {
          this.userSettingsService.showAdminNotification();
          this.globalService.isAdminNotificationShowing = true;
        }
      }
    }
  }

  private getAutoJoinType (): string | boolean {
    let isJoinWithBrowserButtonVisible: boolean = this.browserInfoService.isWebRTCBrowser() &&
      !this.browserInfoService.isWebRTCBrowserExclusion();
    let isJoinWithAppButtonVisible = true;

    if(this.userSettingsService.portalResources.brandingRules){
      if(isJoinWithBrowserButtonVisible){
        isJoinWithBrowserButtonVisible = !this.userSettingsService.portalResources.brandingRules.hideJoinWithBrowser;
      }
      isJoinWithAppButtonVisible = !this.userSettingsService.portalResources.brandingRules.hideJoinWithNativeApp;
    }

    if(this.browserInfoService.isWebRTCBrowser()){
      if(isJoinWithBrowserButtonVisible && isJoinWithAppButtonVisible){
        return window.localStorage.getItem('lastSelectedClient') || CLIENT_TYPE.SWC;
      }
      if(!isJoinWithBrowserButtonVisible && isJoinWithAppButtonVisible){
        return CLIENT_TYPE.AC;
      }

      if(isJoinWithBrowserButtonVisible && !isJoinWithAppButtonVisible){
        return CLIENT_TYPE.SWC;
      }

      return false;

    } else {
      if(isJoinWithAppButtonVisible){
        return CLIENT_TYPE.AC;
      } else {
        return false;
      }
    }
  }
}
