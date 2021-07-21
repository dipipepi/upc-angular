import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ACClientService} from '../../../services/ACClientService/acclient.service';
import {BrowserInfoService} from '../../../services/BrowserInfoService/browser-info.service';
import {EventService} from '../../services/EventService/event.service';
import {EVENT} from '../../../constants';
import {AuthorizationService} from '../../../services/AuthorizationService/authorization.service';
import {JoinButtonService} from '../../../services/JoinButtonServices/join-button.service';

class JoinButtonServices {
}

@Component({
  selector: 'app-join-guest-button',
  templateUrl: './join-guest-button.component.html',
  styleUrls: ['./join-guest-button.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class JoinGuestButtonComponent implements OnInit, OnDestroy {
  @Input() meetingId;
  @Input() name;
  @Input() isDisabled;
  @Input() isConferenceExists;
  @Input() externalClass: string;

  clientIsInstalled = this.acClientService.clientData.isInstalled;
  haveDownloadedClient = window.localStorage.haveDownloadedClient === 'true';
  availableDevices = [];
  joinOptions = this.joinButtonServices.optionsForJoinButtons(this, 'GB');
  // TODO check attributes of element
  private attr: any;
  private meetingIdPattern =  /^[0-9]{1,32}(\*\*\*[0-9]{0,16}(\*[0-9]{0,16})?)?$/;
  private meetingIdIsCorrect: boolean;
  private doubleClick = false;
  private checkDevice: any;

  constructor(private acClientService: ACClientService,
              private browserInfoService: BrowserInfoService,
              private eventService: EventService,
              public joinButtonServices: JoinButtonService,
              private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {

    if (this.browserInfoService.isWebRTCBrowser()) {
      navigator.mediaDevices.enumerateDevices()
        .then((fetchedDevices) => {
          this.availableDevices = fetchedDevices;
        });

      // this.startInterval();
    }

    this.eventService.on(EVENT.CUSTOM.VIDEO_CALLING_PREFERENCES_CHANGED, (val) => {
      for (const option of this.joinOptions){
        if (option.className === 'audio-video-swc' || option.className === 'audio-video-ac') {
          option.videoPreferences = val;
        }
      }
      this.joinButtonServices.translateTooltips().then(() => {
        this.joinButtonServices.changeTooltip(this.joinOptions);
      });
    });

    // init tooltips for buttons
    this.joinButtonServices.translateTooltips().then(() => {
      this.joinButtonServices.changeTooltip(this.joinOptions);
    });

    this.eventService.on(EVENT.CUSTOM.DEVICE_CHANGE, () => {
      this.startInterval();
    });

    this.eventService.on(EVENT.CUSTOM.CLIENT_WAS_DETECTED, () => {
      this.clientIsInstalled = this.acClientService.clientData.isInstalled;
    });

    this.eventService.on(EVENT.CUSTOM.STOP_CHECKING_INTERVAL, () => {
      clearInterval(this.checkDevice);
      this.checkDevice = undefined;
    });
  }

  performAction(index): void {
    if (!this.doubleClick) {
      const attribute = this.attr ? this.attr.length > 1 ? this.attr[index] : this.attr[0] : {};
      const delegateToJoin = (index, attribute) => {
        this.joinOptions[index].func(attribute);
        this.doubleClick = true;
      };
      if (this.joinOptions[index].className === 'audio-video-ac') {
        if (!this.haveDownloadedClient && this.isConferenceExists) {
          delegateToJoin(index, attribute);
        } else {
          if (this.authorizationService.userType === 'GUEST' && this.meetingId && this.name && this.isConferenceExists) {
            delegateToJoin(index, attribute);
          } else if(this.authorizationService.userType === 'SIGN_IN' && this.meetingId && this.isConferenceExists) {
            delegateToJoin(index, attribute);
          }
        }
      } else if (this.authorizationService.userType === 'GUEST' && this.meetingId && this.name && this.isConferenceExists) {
        delegateToJoin(index, attribute);
      } else if (this.authorizationService.userType === 'SIGN_IN' && this.meetingId && this.isConferenceExists) {
        delegateToJoin(index, attribute);
      }
      setTimeout(() => {
        this.doubleClick = false;
      }, 1000);
    }
  }

  isActiveButton(option) {
    this.meetingIdIsCorrect = !!this.meetingIdPattern.exec(this.meetingId);
    if (this.authorizationService.userType === 'GUEST') {
      if (option.className === 'audio-video-swc' || option.className === 'present-only' || option.className === 'audio-video-ac') {
        return (!!this.meetingId && !!this.name) && this.isConferenceExists && this.meetingIdIsCorrect;
      } else {
        if (JSON.parse(window.localStorage.haveDownloadedClient)) {
          return (!!this.meetingId && !!this.name) && this.isConferenceExists && this.meetingIdIsCorrect;
        } else {
          return true;
        }
      }
    } else {
      if (option.className === 'audio-video-swc' || option.className === 'present-only' || option.className === 'audio-video-ac') {
        return !!this.meetingId && this.isConferenceExists && this.meetingIdIsCorrect;
      } else {
        if (JSON.parse(window.localStorage.haveDownloadedClient)) {
          return !!this.meetingId && this.isConferenceExists && this.meetingIdIsCorrect;
        } else {
          return true;
        }
      }
    }
  }

  private updateDeviceList(): void {
    navigator.mediaDevices.enumerateDevices()
      .then((fetchedDevices) =>{
        this.availableDevices = fetchedDevices;
      });
  }

  private startInterval = (): void => {
    this.checkDevice = setInterval(() => {
      this.updateDeviceList();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.checkDevice);
  }



}
