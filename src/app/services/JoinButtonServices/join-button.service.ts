import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CLIENT_TYPE, DEFAULT_MOBILE_CLIENT, EVENT, OS} from '../../constants';
import {EventService} from '../../shared/services/EventService/event.service';
import {ClientStatusService} from '../ClientStatusService/client-status.service';
import {SWCClientService} from '../SWCClientService/swcclient.service';
import {JoinService} from '../JoinService/join.service';
import {ACClientService} from '../ACClientService/acclient.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {BrowserInfoService} from '../BrowserInfoService/browser-info.service';
import {GlobalService} from '../GlobalService/global.service';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class JoinButtonService {
  private logger = new Logger('JoinButtonService');

  private localizedTooltips;

  private tooltipLocalizationCode = [
    'JOIN_BUTTONS.JOIN_GUEST_BUTTON.BROWSER_AUDIO_VIDEO_TOOLTIP',
    'JOIN_BUTTONS.JOIN_GUEST_BUTTON.BROWSER_AUDIO_TOOLTIP',
    'JOIN_BUTTONS.JOIN_GUEST_BUTTON.AC_AUDIO_VIDEO_TOOLTIP',
    'JOIN_BUTTONS.JOIN_GUEST_BUTTON.AC_AUDIO_TOOLTIP',
    'JOIN_BUTTONS.JOIN_GUEST_BUTTON.PRESENTATION_ONLY_TOOLTIP'
  ];

  constructor(private translate: TranslateService,
              private eventService: EventService,
              private clientStatusService: ClientStatusService,
              private swcClientService: SWCClientService,
              private acClientService: ACClientService,
              private joinService: JoinService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private userSettingsService: UserSettingsService,
              private browserInfoService: BrowserInfoService,
              private globalService: GlobalService) { }

  translateTooltips() {
    return this.translate.get(this.tooltipLocalizationCode).toPromise().then((result) => {
      this.localizedTooltips = result;
      return result;
    });
  }

  changeTooltip(optionsList) {
    for (const option of optionsList) {
      if (option.className === 'audio-video-swc') {
        if (JSON.parse(window.localStorage.videoCallingPreferences)) {
          option.tooltip = this.localizedTooltips['JOIN_BUTTONS.JOIN_GUEST_BUTTON.BROWSER_AUDIO_VIDEO_TOOLTIP'];
        } else {
          option.tooltip = this.localizedTooltips['JOIN_BUTTONS.JOIN_GUEST_BUTTON.BROWSER_AUDIO_TOOLTIP'];
        }
      } else if (option.className === 'audio-video-ac') {
        if (JSON.parse(window.localStorage.videoCallingPreferences)) {
          option.tooltip = this.localizedTooltips['JOIN_BUTTONS.JOIN_GUEST_BUTTON.AC_AUDIO_VIDEO_TOOLTIP'];
        } else {
          option.tooltip = this.localizedTooltips['JOIN_BUTTONS.JOIN_GUEST_BUTTON.AC_AUDIO_TOOLTIP'];
        }
      } else if (option.className === 'present-only') {
        option.tooltip = this.localizedTooltips['JOIN_BUTTONS.JOIN_GUEST_BUTTON.PRESENTATION_ONLY_TOOLTIP'];
      }
    }
  }

  optionsForJoinButtons(scope, type) {
    const options = [];

    const globalThis = this;

    // Options for Join with browser button
    options.push({
      name: 'JOIN_BUTTONS.JOIN_GUEST_BUTTON.BROWSER_AUDIO_VIDEO',
      tooltip: '',
      className: 'audio-video-swc',
      videoPreferences: !!window.localStorage.videoCallingPreferences,
      func: (attr, lastType, isDefaultAction) => {
        window.localStorage.lastSelectedClient = CLIENT_TYPE.SWC;

        const options = {
          meetingId: scope.meetingId,
          joinMode: {
            name: scope.name
          }
        };

        if(!this.globalService.haveConnectedMicrophone(scope.availableDevices)) {
          this.eventService.broadcast(EVENT.CUSTOM.STOP_CHECKING_INTERVAL);
          // TODO create this method
          // this.MessageUtilsService.showMicrophoneDialog(options);
          return;
        }

        this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
        this.eventService.broadcast(EVENT.CUSTOM.AUTO_FILL_UPDATE);
        let presentationOnly = false;

        if (isDefaultAction && this.swcClientService.useBrowserToJoin && !this.swcClientService.canRun(false).result &&
          this.swcClientService.canRun(true).result) {
          presentationOnly = true;
        }

        const delay = () => {
          return new Promise(resolve => {
            setTimeout(() => {
              if(!JSON.parse(window.localStorage.videoCallingPreferences) && presentationOnly === false){
                this.joinService.joinToMeeting(scope.meetingId, {
                  audioOnly: true,
                  name: scope.name
                });
              } else {
                this.joinService.joinToMeeting(scope.meetingId, {
                  presentationOnly,
                  name: scope.name
                });
              }
              resolve(true);
            }, 300);
          });
        };

        delay().then(() => {
          if (type === 'UB') {
            scope.doubleClick = false;
          }
        });
      }
    });

    // Options for Join equinox button
    options.push({
      name: 'JOIN_BUTTONS.JOIN_GUEST_BUTTON.AC_AUDIO_VIDEO',
      tooltip: '',
      className: 'audio-video-ac',
      videoPreferences: !!window.localStorage.videoCallingPreferences,
      haveDownloadedClient: !!window.localStorage.haveDownloadedClient,
      func: (attr, lastType, isDefaultAction) => {
        this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
        this.eventService.broadcast(EVENT.CUSTOM.AUTO_FILL_UPDATE);
        let presentationOnly = false;
        if (isDefaultAction && this.swcClientService.useBrowserToJoin && !this.swcClientService.canRun(false).result &&
          this.swcClientService.canRun(true).result) {
          presentationOnly = true;
        }

        if (!window.localStorage.haveDownloadedClient) {
          window.localStorage.haveDownloadedClient = false;
        }

        if (!this.acClientService.clientData.isInstalled && window.localStorage.haveDownloadedClient === 'false' &&
          !this.userSettingsService.portalResources.disablePopupForAppDownload) {
          const options = {
            meetingId: scope.meetingId,
            joinMode: {
              presentationOnly,
              name: scope.name
            }
          };
          // TODO create this method
          // this.MessageUtilsService.showDownloadDialog(options);
        } else {
          window.localStorage.lastSelectedClient = CLIENT_TYPE.AC;

          const delay = () => {
            return new Promise(resolve => {
              setTimeout(() => {
                if (!JSON.parse(window.localStorage.videoCallingPreferences)) {
                  this.joinService.joinToMeeting(scope.meetingId, {
                    audioOnly: true,
                    name: scope.name
                  });
                } else {
                  this.joinService.joinToMeeting(scope.meetingId, {
                    presentationOnly,
                    name: scope.name
                  });
                }
                resolve(true);
              }, 300);
            });
          };

          delay().then(() => {
            if (type === 'UB') {
              scope.doubleClick = false;
            }
          });
        }
      }
    });

    // Options for Presentation only button
    options.push({
      name: 'JOIN_BUTTONS.JOIN_GUEST_BUTTON.PRESENTATION_ONLY',
      tooltip: '',
      className: 'present-only',
      func: (attr) => {
        this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
        window.localStorage.lastSelectedClient = CLIENT_TYPE.SWC;
        this.eventService.broadcast(EVENT.CUSTOM.AUTO_FILL_UPDATE);
        const delay = () => {
          return new Promise(resolve => {
            setTimeout(() => {
              let callMeEnabled = true;
              if (this.userSettingsService.portalResources.hasOwnProperty('callMeEnabledInDataOnly')) {
                callMeEnabled = this.userSettingsService.portalResources.callMeEnabledInDataOnly;
              }

              if (callMeEnabled) {
                this.showJoinOptions(scope.meetingId, scope.name);
              } else {
                this.joinService.joinToMeeting(scope.meetingId, {
                  presentationOnly: true,
                  name: scope.name
                });
              }
              resolve(true);
            }, 500);
          });
        };
        delay().then(() => {
          if (type === 'UB') {
            scope.doubleClick = false;
          }
        });
      },
      class: '',
      redefineByCondition(attr) {
        if (!(this.customDeviceDetector.isDesktop() || this.userSettingsService.resources &&
          globalThis.userSettingsService.portalResources.clientSettings &&
          ((globalThis.customDeviceDetector.os === OS.ANDROID
            ?globalThis.userSettingsService.portalResources.clientSettings.defaultAndroidConferenceApp :
            globalThis.customDeviceDetector.os === OS.IOS
              ?globalThis.userSettingsService.portalResources.clientSettings.defaultIosConferenceApp :
              undefined) === DEFAULT_MOBILE_CLIENT.AC))) {
          this.class += ' dropdown-item-hide';
        }
      }
    });

    return options;
  }

  isButtonVisible(button) {
    if(button.className === 'audio-video-swc'){
      return this.browserInfoService.checkBrowserExclusions(false) && this.customDeviceDetector.isDesktop();
    } else if(button.className === 'present-only') {
      return this.browserInfoService.checkBrowserExclusions(true) && this.customDeviceDetector.isDesktop();
    } else {
      return true;
    }
  }

  private showJoinOptions(meetingId, name) {
    // TODO create this method
    // this.MeetingOptionsService.showMeetingOptions(meetingId, name);
  }
}
