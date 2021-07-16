import { Injectable } from '@angular/core';
import {GlobalService} from '../GlobalService/global.service';
import {
  CLIENT_TYPE,
  ERROR_CODE,
  EVENT,
  LOCAL_STORAGE,
  MEETING_TYPE,
  PARTICIPANT_MODE,
  SSO_TYPE,
  STATUS_CODE,
  USER_TYPE
} from '../../constants';
import {TranslateService} from '@ngx-translate/core';
import {Logger} from '../../../Logger';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventService} from '../../shared/services/EventService/event.service';
import {AuthorizationService} from '../AuthorizationService/authorization.service';
import {ClientStatusService} from '../ClientStatusService/client-status.service';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {SuccessGetTokenComponent} from '../../components/join/success-get-toket/success-get-toket.component';
import {FailGetTokenComponent} from '../../components/join/fail-get-toket/fail-get-toket.component';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JoinService {
  private logger = new Logger('JoinService');

  constructor(private globalService: GlobalService, private translate: TranslateService,
              private userSettingsService: UserSettingsService, private http: HttpClient,
              private eventService: EventService,
              private authorizationService: AuthorizationService,
              private clientStatusService: ClientStatusService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  joinToMeeting(meetingIdAndPasscode, options): Promise<any> | void {

    this.logger.info('joinToMeeting: meetingIdAndPasscode = ' + meetingIdAndPasscode);
    options = options || {};
    let pass;
    let accessPin;
    let moderatorPin;

    options.name = (this.authorizationService.userType === USER_TYPE.SIGN_IN) ?
      this.globalService.user.login || this.globalService.user.fullName : // signed in user
      options.name || this.translate.instant('JOIN.GUEST');   // guest user

    if (this.authorizationService.userType === USER_TYPE.GUEST && options.name) {
      window.localStorage[LOCAL_STORAGE.GUEST_NAME] = options.name;
    }

    if (!options.meetingId) {
      options.meetingId = meetingIdAndPasscode.split('***')[0];
      pass = meetingIdAndPasscode.split('***')[1];
      if (pass) {
        accessPin = pass.split('*')[0];
        moderatorPin = pass.split('*')[1];
      }
      options.passcode = moderatorPin || accessPin;
      options.oneTimePin = accessPin;
      if(moderatorPin){
        options.moderatorPin = moderatorPin;
      }

    }

    if (Boolean(this.route.snapshot.queryParams.dataonly)) {
      options.presentationOnly = true;
    }

    if (this.route.snapshot.queryParams.clienttype) {
      this.logger.info('Client type defined in URL, type=\'%s\'', Boolean(this.route.snapshot.queryParams.clienttype));
    }

    options.nochat = Boolean(this.route.snapshot.queryParams.nochat);

    if (options.preferredClient) {
      this.logger.log('joinToMeeting: preferred client = %s', options.preferredClient);
    } else if (this.route.snapshot.queryParams.clienttype) {
      switch (this.route.snapshot.queryParams.clienttype) {
        case 'web':
          options.preferredClient = CLIENT_TYPE.SWC;
          break;
        case 'meetme':
          options.preferredClient = CLIENT_TYPE.AC;
          this.logger.log('joinToMeeting: select AC even for meetme mode');
          break;
        case 'uc':
          options.preferredClient = CLIENT_TYPE.AC;
          break;
        default:
          this.logger.warn('preferred client type is invalid, type=%s, selecting client type by priority');
      }
      this.logger.log('joinToMeeting: selected preferred client = %s', options.preferredClient);
    }

    this.logger.info('Preferred client client type is %s', options.preferredClient);

    options.preferredClient = options.preferredClient || this.clientStatusService.selectedClient;

    if (options.preferredClient === CLIENT_TYPE.AC && this.userSettingsService.portalResources.peEnabled) {
      options.ssoType = SSO_TYPE.PEWEBSSO;
    }

    if ((options.preferredClient === CLIENT_TYPE.SWC) &&
      this.clientStatusService.canRunTheClient(options.presentationOnly, options.preferredClient) &&
      !Boolean(this.route.snapshot.queryParams.autojoin)) {
      this.logger.log('joinToMeeting: open new tab for SWC');
      options.window = window.open('', '_blank');
    }

    return this.startConference(options)
      .catch( (error) => {
        return new Promise((resolve, reject) => {
          this.logger.warn('Client is not selected. Error=%s', JSON.stringify(error));

          switch (error.errorCode || error) {
            case ERROR_CODE.CLIENT.SWC_PO_ONLY_SUPPORTED:
              // TODO create this method
              // this.MessageUtilsService.showUnsupportedSWCModeError(options);
              break;
            case ERROR_CODE.CLIENT.NO_RESOURCES:
              // very rare case, almost impossible
              // TODO create this method
              // this.MessageUtilsService.showError(this.translate.instant('MSG_UTILS.NOTIFICATION.NO_RESOURCES'));
              break;
            case ERROR_CODE.CLIENT.PREFERRED_CLIENT_ISSUE:
              // TODO create this method
              // this.MessageUtilsService.showError(this.translate.instant('COMMON.CLIENT_APP.PREFERRED_CLIENT_ISSUE'));
              break;
            case ERROR_CODE.CLIENT.UPDATE_REQUIRED:
              // TODO create this method
              // this.MessageUtilsService.showForceUpdate(options);
              break;
            case ERROR_CODE.JOIN.MEETING_NOT_STARTED_YET:
              // TODO create this method
              // this.MessageUtilsService.showError(this.translate.instant('JOIN.ERROR.MEETING_NOT_STARTED_YET'));
              break;
            case ERROR_CODE.JOIN.FAIL_TO_JOIN_UNAUTHORIZED_PARTICIPANT_ID:
              // TODO create this method
              // this.MessageUtilsService.showError(error.caption, this.translate.instant(
              // 'JOIN.ERROR.FAIL_TO_JOIN_UNAUTHORIZED_PARTICIPANT_ID'));
              break;
            default:
              if (error.caption && error.message) {
                // it comes from getToken request fail handler
                if(error.errorCode !== 'ERC_WRONG_CURRENT_CONFERENCE' &&
                  error.errorCode !== 'ERC_DISALLOW_INITIATE_NON_VIRTUAL_ROOM_MEETING'){
                  // TODO create this method
                  // this.MessageUtilsService.showError(error.caption, error.message).finally(() => {
                  //   // @ts-ignore
                  //   $('.ngdialog-theme-meeting-options').remove();
                  // });
                } else {
                  this.logger.error('Something goes wrong in StartConference: %o', error);
                }

              } else {
                this.logger.error('Something goes wrong in StartConference: %o', error);
              }
          }
          reject(error);
        });
      });
  }

  private startConference(options, oneTimePin?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logger.log('Start conference with, options: %o', options);

      if (!options.meetingId) {
        // This should not happen
        this.logger.error('startConference: Can\'t start conference without MeetingID!');
        reject('Can\'t start conference without MeetingID!');
      }

      if (!options.passcode) {
        // This can happen
        this.logger.warn('startConference: Meeting passcode is not specified');
      }

      if (!options.name) {
        // This should not happen
        this.logger.error('startConference: Can\'t start conference without user name!');
        reject('Can\'t start conference without user name!');
      }

      if ((options.preferredClient === CLIENT_TYPE.SWC) &&
        this.clientStatusService.canRunTheClient(options.presentationOnly, options.preferredClient) && !options.window &&
        !Boolean(this.route.snapshot.queryParams.autojoin)) {
        this.logger.log('startConference: open new tab for SWC');
        options.window = window.open('', '_blank');
      }
      const onSuccessGetToken = (response) => {
        const showAssignOneTimePin = () => {
          closeExistingBlankTab();
          return this.dialog.open(SuccessGetTokenComponent, {
            data: {
              options,
              confirm: this.confirmSuccessGetToken
            },
            panelClass: 'ngdialog-theme-request-popup'
          });
          // return this.ngDialog.openConfirm({
          //   template: 'app/components/join/templates/AssignOneTimePinView.html',
          //   closeByNavigation: true,
          //   showClose: false,
          //   className: 'ngdialog-theme-request-popup',
          //   controller: ['$scope', ($scope) => {
          //     $scope.join = () => {
          //       this.logger.log('showAssignOneTimePin: assigned oneTimePin %o and call startConference again' + $scope.oneTimePin);
          //       $scope.confirm( this.startConference(options, $scope.oneTimePin) );
          //     };
          //     $scope.cancelJoin = () => {
          //       this.logger.log('showAssignOneTimePin: join canceled');
          //       $scope.closeThisDialog();
          //     };
          //   }]
          // });
        };

        const errors = response.data && response.data.error ? response.data.error : undefined;
        const errorCode = _.isArray(errors) && errors[0] ? errors[0].errorCode : 'undefined';
        if (errorCode === ERROR_CODE.JOIN.ERC_JC_ONE_TIME_PIN_REQUIRED && !options.oneTimePin) {
          return showAssignOneTimePin();
        } else if (errorCode === ERROR_CODE.JOIN.ERC_JC_ONE_TIME_PIN_REQUIRED && options.oneTimePin){
          this.startConference(options, options.oneTimePin);
        } else {
          if (response.data.meetingType === MEETING_TYPE.AUDIO_ONLY && !options.presentationOnly) {
            options.audioOnly = true;
          }
          if (!response.data.passcode) {
            delete response.data.passcode;
          }
          _.extend(options, response.data);

          if(this.authorizationService.userType === USER_TYPE.SIGN_IN){
            this.updateOptionsList(response);
          } else {
            this.updateGuestOptionsList(response);
          }
          return this.clientStatusService.joinToMeetingIfPossible(options);
        }
      };

      const onFailGetToken = (response) => {
        const errors = response.data && response.data.error ? response.data.error : undefined;
        // @ts-ignore
        const errorCode = angular.isArray(errors) && errors[0] ? errors[0].errorCode : 'undefined';
        const showWaitingForModerator = () => {
          closeExistingBlankTab();
          return this.dialog.open(FailGetTokenComponent, {
            data: {
              options,
              confirm: this.confirmSuccessGetToken
            },
            panelClass: 'ngdialog-theme-request-popup'
          });
          // return this.ngDialog.openConfirm({
          //   template: 'app/components/join/templates/WaitingForModeratorView.html',
          //   closeByNavigation: false,
          //   closeByDocument: false,
          //   closeByEscape: false,
          //   showClose: false,
          //   className: 'ngdialog-theme-request-popup',
          //   controller: ['$scope', '$interval', ($scope, $interval) => {
          //     const startTime = new Date().getTime();
          //     const countDown = 30;
          //     $scope.seconds = countDown;
          //     const updateTime = () => {
          //       const currentTime = new Date().getTime();
          //       const diff = currentTime - startTime;
          //       $scope.seconds = countDown - Math.floor(diff / 1000);
          //       if ($scope.seconds < 1) {
          //         $interval.cancel(counter);
          //         $scope.join();
          //       }
          //     };
          //     const counter = $interval(updateTime, 500);
          //
          //     $scope.join = () => {
          //       $interval.cancel(counter);
          //       this.logger.log('showWaitingForModerator: try to join again');
          //       $scope.confirm( this.startConference(options, $scope.oneTimePin) );
          //     };
          //
          //     $scope.cancelJoin = () => {
          //       $interval.cancel(counter);
          //       this.logger.log('showWaitingForModerator: join canceled');
          //       $scope.closeThisDialog('join canceled');
          //     };
          //   }]
          // });
        };

        if (errorCode === ERROR_CODE.JOIN.ERC_JC_FORBIDDEN_ONE_TIME_PIN_REQUIRED) {
          return showWaitingForModerator();
        } else {
          throw this.getReadableError(response.status, response.data.error);
        }
      };

      const closeExistingBlankTab = () => {
        if (options.window) {
          this.logger.log('startConference: close existing blank tab');
          options.window.close();
          delete options.window;
        }
      };

      return this.getToken(options, oneTimePin)
        .finally(() => {
        })
        .then(onSuccessGetToken, onFailGetToken)
        .then(() => {
          setTimeout( () => {
            this.eventService.broadcast(EVENT.CUSTOM.CONFERENCE_STARTED, options);
          });
        })
        .catch((ex) => {
          this.logger.error('startConference: Something goes wrong in startConference: %o', ex);
          closeExistingBlankTab();
          throw ex;
        });
    });
  }

  private confirmSuccessGetToken(options, oneTimePin): void{
    this.startConference(options, oneTimePin);
  }

  private getToken(options, oneTimePin?): Promise<any> {
    this.logger.log('getToken: conferenceId=%s options=%o ', options.meetingId, options);
    const parameters = {
      conferenceId: options.meetingId,
      sessionId: this.globalService.sessionId,
      moderatorPin: options.moderatorPin,
      passcode: options.passcode,
      ignorePresentationError: true,
      oneTimePin: undefined,
      userName: undefined,
      callBackNumber: undefined,
      participantMode: undefined
    };

    if(oneTimePin){
      parameters.oneTimePin = oneTimePin;
    }

    if (options.name) {
      parameters.userName = options.name.replace(/\s+/g, ' ').replace(/^\s(.*)$/, '$1');
    }

    if (options.callbackNumber) {
      parameters.callBackNumber = options.callbackNumber.replace(/\s/g, '');
    }

    if (options.presentationOnly) {
      parameters.participantMode = PARTICIPANT_MODE.PRESENTATION_ONLY;
    } else if (options.audioOnly) {
      parameters.participantMode = PARTICIPANT_MODE.AUDIO_WITH_PRESENTATION;
    } else {
      parameters.participantMode = PARTICIPANT_MODE.AUDIO_VIDEO_WITH_PRESENTATION;
    }

    // tslint:disable-next-line:prefer-const
    let headers;
    if(window.localStorage.UPS_TOKEN){
      headers.Authorization = window.localStorage.UPS_TOKEN;
    }

    return this.http.post(this.userSettingsService.portalResources.resources.middleware.POST.createConferenceToken.href, parameters,
      {
      headers: new HttpHeaders(headers)
    }).toPromise();

    // return this.HttpConnectionService.post(LOCAL_STORAGE.UPS_TOKEN,
    // this.userSettingsService.portalResources.resources.middleware.POST.createConferenceToken.href, parameters);
  }

  private getReadableError(status, errors): object {
    let errorCode;
    let errorMessage;
    let caption;
    caption = 'JOIN.ERROR.CAPTION';
    // @ts-ignore
    errorCode = _.isArray(errors) && errors[0] ? errors[0].errorCode : 'undefined';
    if (status === STATUS_CODE.SERVICE_UNAVAILABLE) {
      errorMessage = 'JOIN.ERROR.SERVICE_UNAVAILABLE';
    } else {
      switch (errorCode) {
        case ERROR_CODE.GENERAL.INTERNAL_SERVER_ERROR:
          errorMessage = 'JOIN.ERROR.SERVICE_INTERNAL_ERROR';
          break;
        case ERROR_CODE.GENERAL.MISSING_REQUEST_PARAM:
          errorMessage = 'JOIN.ERROR.MISSING_REQUEST_PARAM';
          break;
        case ERROR_CODE.AUTH.TOKEN_EXPIRED:
          errorMessage = 'JOIN.ERROR.TOKEN_EXPIRED';
          break;
        case ERROR_CODE.AUTH.TOKEN_INVALID:
          errorMessage = 'JOIN.ERROR.TOKEN_INVALID';
          break;
        case ERROR_CODE.JOIN.INCORRECT_INPUT:
          errorMessage = 'JOIN.ERROR.INVALID_MEETING_ID';
          break;
        case ERROR_CODE.JOIN.ERC_WRONG_CURRENT_CONFERENCE:
          this.eventService.broadcast(ERROR_CODE.JOIN.WRONG_MEETING_ID);
          errorMessage = 'JOIN.ERROR.WRONG_CURRENT_CONFERENCE';
          break;
        case ERROR_CODE.JOIN.ERC_DISALLOW_INITIATE_NON_VIRTUAL_ROOM_MEETING:
          this.eventService.broadcast(ERROR_CODE.JOIN.WRONG_MEETING_ID);
          errorMessage = 'JOIN.ERROR.WRONG_CURRENT_CONFERENCE';
          break;
        case ERROR_CODE.JOIN.ERC_JC_FORBIDDEN_ONE_TIME_PIN_REQUIRED:
          errorMessage = 'JOIN.ERROR.FORBIDDEN_ONE_TIME_PIN_REQUIRED';
          break;
        case ERROR_CODE.JOIN.ERC_LOCKED_CONFERENCE:
          errorMessage = 'JOIN.ERROR.ERC_LOCKED_CONFERENCE';
          break;
        case ERROR_CODE.JOIN.ERC_START_CONF_FAILED:
          errorMessage = 'JOIN.ERROR.ERC_START_CONF_FAILED';
          break;
        case ERROR_CODE.JOIN.ERC_NO_DEFAULT_MCU_SERVICE_DEFINED_IN_VIRTUAL_ROOM:
          errorMessage = 'JOIN.ERROR.ERC_NO_DEFAULT_MCU_SERVICE_DEFINED_IN_VIRTUAL_ROOM';
          break;
        case ERROR_CODE.JOIN.ERC_WEB_COLLABORATION_DISABLED:
          errorMessage = 'JOIN.ERROR.ERC_WEB_COLLABORATION_DISABLED';
          break;
        case ERROR_CODE.JOIN.MEETING_NOT_STARTED_YET:
          caption = undefined;
          errorMessage = 'JOIN.ERROR.MEETING_NOT_STARTED_YET';
          break;
        case ERROR_CODE.JOIN.ERC_VIRTUAL_ROOM_NOT_ALLOW_INSTANT_MEETING:
          caption = undefined;
          errorMessage = 'JOIN.ERROR.ERC_VIRTUAL_ROOM_NOT_ALLOW_INSTANT_MEETING';
          break;
        case ERROR_CODE.JOIN.ERC_AUTH_ACCESS_DENIED:
          errorMessage = 'JOIN.ERROR.ERC_AUTH_ACCESS_DENIED';
          break;

        default:
          errorMessage = 'JOIN.ERROR.ERROR';
          break;
      }
    }
    return {
      caption: this.translate.instant(caption),
      message: this.translate.instant(errorMessage),
      errorCode
    };
  }

  private updateOptionsList(token): void | boolean{

    const currentOptions = JSON.parse(window.localStorage.currentAndRecentOptions) || '';

    const numberIsVR = currentOptions.some((item) => {
      if (!item.className) {
        return item.number === token.data.conferenceId;
      }
      return false;
    });

    if (numberIsVR) {
      return;
    }

    let haveOptionInList = false;
    let numberOptionInList;
    let currentRecentCount = 0;
    let lastRecentOprion = 0;

    for(let i = 0; i < currentOptions.length; i++) {
      if (currentOptions[i].className) {
        currentRecentCount++;
        if (currentOptions[i].number === token.data.conferenceId) {
          haveOptionInList = true;
          numberOptionInList = i;
        }
      }
    }
    if (currentRecentCount > 4 && !haveOptionInList) {
      for (let j = 0; j < currentOptions.length; j++) {
        if (currentOptions[j].className){
          lastRecentOprion = j;
          break;
        }
      }
      currentOptions.splice(lastRecentOprion, 1);
    }

    let vrNumberForDisplay = '';
    let vrNameForDisplay = '';
    let tooltip = '';

    if (token.data.meetingName !== null){

      if (token.data.meetingName.length > this.globalService.maxVrName ||
        token.data.conferenceId.length > this.globalService.maxVrNameWithSpace) {
        tooltip = token.data.meetingName + ' - ' + token.data.conferenceId;
      }

      if (token.data.meetingName.length > 26) {
        if (token.data.meetingName.indexOf(' ') !== -1) {
          vrNameForDisplay = token.data.meetingName.slice(0, this.globalService.maxVrName) + '...';
        } else {
          vrNameForDisplay = token.data.meetingName.slice(0, this.globalService.maxVrNameWithSpace) + '...';
        }
      } else {
        vrNameForDisplay = token.data.meetingName;
      }
    } else {
      if (token.data.conferenceId.length > this.globalService.maxVrNameWithSpace) {
        vrNameForDisplay = token.data.conferenceId.slice(0, this.globalService.maxVrNameWithSpace) + '...';
        tooltip = token.data.conferenceId;
      } else {
        vrNameForDisplay = token.data.conferenceId;
      }
    }

    if (token.data.conferenceId.length > this.globalService.maxVrNumber) {
      vrNumberForDisplay =  '...' + token.data.conferenceId.substr(-this.globalService.maxVrNumber);
    } else {
      vrNumberForDisplay = token.data.conferenceId;
    }

    if (haveOptionInList) {
      currentOptions.splice(numberOptionInList, 1);
    }

    currentOptions.push({
      name: vrNameForDisplay,
      tooltip,
      fullName: token.data.meetingName || '',
      number: token.data.conferenceId,
      numberForDisplay: vrNumberForDisplay,
      url: window.location.href + '?ID=' + token.data.conferenceId,
      className: 'recent'
    });

    window.localStorage.currentAndRecentOptions = JSON.stringify(currentOptions);
  }

  private updateGuestOptionsList(token): void {
    const currentOptions = JSON.parse(window.localStorage.currentAndRecentOptionsForGuest) || '';

    let haveOptionInList = false;
    let numberOptionInList;
    let currentRecentCount = 0;
    let lastRecentOprion = 0;

    for(let i = 0; i < currentOptions.length; i++) {
      if (currentOptions[i].className) {
        currentRecentCount++;
        if (currentOptions[i].number === token.data.conferenceId) {
          haveOptionInList = true;
          numberOptionInList = i;
        }
      }
    }
    if (currentRecentCount > 4 && !haveOptionInList) {
      for (let j = 0; j < currentOptions.length; j++) {
        if (currentOptions[j].className){
          lastRecentOprion = j;
          break;
        }
      }
      currentOptions.splice(lastRecentOprion, 1);
    }
    let vrNumberForDisplay = '';
    let vrNameForDisplay = '';
    let tooltip = '';

    if (token.data.meetingName !== null){

      if (token.data.meetingName.length > this.globalService.maxVrName ||
        token.data.conferenceId.length > this.globalService.maxVrNameWithSpace) {
        tooltip = token.data.meetingName + ' - ' + token.data.conferenceId;
      }

      if (token.data.meetingName.length > 26) {
        if (token.data.meetingName.indexOf(' ') !== -1) {
          vrNameForDisplay = token.data.meetingName.slice(0, this.globalService.maxVrName) + '...';
        } else {
          vrNameForDisplay = token.data.meetingName.slice(0, this.globalService.maxVrNameWithSpace) + '...';
        }
      } else {
        vrNameForDisplay = token.data.meetingName;
      }
    } else {
      if (token.data.conferenceId.length > this.globalService.maxVrNameWithSpace) {
        vrNameForDisplay = token.data.conferenceId.slice(0, this.globalService.maxVrNameWithSpace) + '...';
        tooltip = token.data.conferenceId;
      } else {
        vrNameForDisplay = token.data.conferenceId;
      }
    }

    if (token.data.conferenceId.length > this.globalService.maxVrNumber) {
      vrNumberForDisplay =  '...' + token.data.conferenceId.substr(-this.globalService.maxVrNumber);
    } else {
      vrNumberForDisplay = token.data.conferenceId;
    }

    if (haveOptionInList) {
      currentOptions.splice(numberOptionInList, 1);
    }

    currentOptions.push({
      name: vrNameForDisplay,
      tooltip,
      fullName: token.data.meetingName || '',
      number: token.data.conferenceId,
      numberForDisplay: vrNumberForDisplay,
      url: window.location.href + '?ID=' + token.data.conferenceId,
      className: 'recent'
    });

    window.localStorage.currentAndRecentOptionsForGuest = JSON.stringify(currentOptions);
  }
}


