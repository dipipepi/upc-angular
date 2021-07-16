import {Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserSettingsService} from '../../../services/UserSettingsService/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {PictureService} from '../../../services/PictureUtils/picture.service';
import { Logger } from '../../../../Logger';
import {AuthorizationService} from '../../../services/AuthorizationService/authorization.service';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {StylesService} from '../../../services/StylesService/styles.service';
import {MeetingsLogsService} from '../../../services/MeetingsLogsService/meetings-logs.service';
import {BROWSERS, DATE_FORMAT, EVENT, OS, PIN_MAX_LENGTH, PIN_TYPE} from '../../../constants';
import {PinService} from '../../../shared/services/PinService/pin.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ACClientService} from '../../../services/ACClientService/acclient.service';
import {VersionService} from '../../../services/BrowserInfoService/browser-info.service';
import {ContactsService} from '../../../services/ContactsService/contacts.service';
import {
  ShowHaveNotLogDialogComponent,
  WarningSaveLogsDialogComponent
} from '../guest-settings/guest-settings.component';
import {GlobalService} from '../../../services/GlobalService/global.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {CustomValidatorsService} from '../../../shared/custom-validators/custom-validators.service';
import {EventService} from '../../../shared/services/EventService/event.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: '../templates/user-settings.component.html',
  styleUrls: ['./settings.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('virtualRoomForm') virtualRoomForm: NgForm;
  private inputTimeout: any;
  private originDateFormat: any;
  private thatScope: this;
  locations: any;
  private photoWasDeleted: boolean;
  private logger: any;
  userSettings: any;
  pictureErrorMessage: any;
  private originalSettings: any;
  private userService: any;
  user: any;
  isDesktop: any;
  isMobileView: any;
  filteredEndpoints: any[];
  videoCalling: boolean;
  indexedDbIsCompatibility: boolean;
  supportEmail: string;
  saveLogsCheckbox: any;
  roomFormScope: any;
  roomNamePattern: RegExp;
  pinData: { permanentPin: string; moderatorPin: string; accessPinEnabled: boolean };
  recordingNotSupportedTitle: any;
  meetingPinMaxLength: any;
  moderatorPinMaxLength: any;
  TAB: {
    PASSWORD?: string;
    GENERAL?: string;
    USER?: string;
    ROOM?: string;
    SUPPORT: string; PREFERENCES: string; CLIENT: string };
  currentDateSetting: any;
  dateFormatSettings: {
    selected?: any;
    options: ({ format: any; id: string })[] };
  useDefaultTimeFormat: any;
  use24HourFormat: any;
  currentDataFormat: string;
  timeFormat: { selected: string };
  private currentLocation: any;
  private newPicture: any;
  availableVoicePromptLanguagesCopy: any;
  voicePromptLanguage: { options: any; selected: any };
  // tslint:disable-next-line:variable-name
  private _defaultVirtualRoom: any;
  defaultVirtualRoom: any;
  currentRoom: any;
  private announcementList: ({ name: any; id: string })[];
  private allowPresentPolicyList: ({ name: any; id: string })[];
  virtualRoomNumber: { options: any; selected: any };
  meetingType: { options: any; selected: any };
  virtualRoomInvitationLanguages: any;
  virtualRoomVoicePromptLanguage: any;
  virtualRoomDialInLocations: any;
  private originalAccessPinEnabled: any;
  moderatorPinMinLength: any;
  entryAnnouncement: any;
  exitAnnouncement: any;
  allowPresentPolicy: any;
  meetingPinMinLength: any;
  isMeetingPinContainsSequentialOrRepeatedSymbols: boolean;
  errorMaxPlayToneNumber: boolean;
  errorMaxPlayNameNumber: boolean;
  haveDualInData: boolean;
  isModeratorPinContainsSequentialOrRepeatedSymbols: any;
  isModeratorPinPatternCorrect: boolean;
  isMeetingPinPatternCorrect: boolean;
  changePasswordForm: any;
  haveIndexedDB: boolean;
  currentTab: any;
  ACData: any;
  canShowDownloadPlugin: boolean;
  isChrome: boolean;
  isMac: boolean;
  isWindows: boolean;
  showSharingPlaginLink: any;
  searching: boolean;
  filteredContacts: any[];
  delegatedUsers: any;
  private warningDialog: any;
  isOAuthUser: any;
  isMultiTenant: boolean;
  changePasswordReactiveForm: FormGroup;
  translateParamsModeratorPin: { minLength: number; maxLength: number };
  translateParamsMeetingPin: { minLength: number; maxLength: number };

  constructor(public userSettingsService: UserSettingsService,
              public translate: TranslateService,
              private pictureUtils: PictureService,
              public authorizationService: AuthorizationService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private stylesService: StylesService,
              private meetingsLogsService: MeetingsLogsService,
              public pinService: PinService,
              public dialogRef: MatDialogRef<UserSettingsComponent>,
              public acClientService: ACClientService,
              @Inject(MAT_DIALOG_DATA) public data,
              private versionService: VersionService,
              private contactsService: ContactsService,
              private dialog: MatDialog,
              public globalService: GlobalService,
              public formBuilder: FormBuilder,
              private customValidators: CustomValidatorsService,
              private eventService: EventService) { }

  ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.logger = new Logger('SettingsController');
    this.thatScope = this;
    this.originDateFormat = JSON.parse(window.localStorage.timeFormat);
    this.moderatorPinMinLength = this.userSettingsService.portalResources.moderatorPINMinimumLength;
    this.meetingPinMinLength = this.userSettingsService.portalResources.meetingPINMinimumLength;
    this.translateParamsModeratorPin = {minLength: this.moderatorPinMinLength || 0,
      maxLength: PIN_MAX_LENGTH.MODERATOR_PIN};
    this.translateParamsMeetingPin = {minLength: this.meetingPinMinLength || 0,
      maxLength: PIN_MAX_LENGTH.MEETING_PIN};

    this.originalSettings = _.cloneDeep(this.userSettingsService.getUserSettings());
    this.locations = this.userSettingsService.getLocations();

    this.isDesktop = this.customDeviceDetector.isDesktop();
    this.isMobileView = this.stylesService.isMobileView();

    this.isOAuthUser = window.localStorage.oauth2Authentication || false;

    this.filteredEndpoints = [];

    this.indexedDbIsCompatibility = this.meetingsLogsService.compatibility();
    this.supportEmail = this.userSettingsService.portalResources && this.userSettingsService.portalResources.supportEmail;

    if (this.indexedDbIsCompatibility) {
      this.saveLogsCheckbox = JSON.parse(window.localStorage.enabledLogs);
    } else {
      this.saveLogsCheckbox = false;
    }

    this.roomNamePattern = /^[^"\/~!#$%\^&*()=+\[\]\{\}\\\|;<>\?]{1,80}$/;

    this.pinData = {
      moderatorPin: '',
      accessPinEnabled: false,
      permanentPin: ''
    };

    this.recordingNotSupportedTitle = this.translate.instant('SETTINGS.ROOM_TAB.RECORDING_NOT_SUPPORTED');

    this.TAB = {
      CLIENT: 'client',
      PREFERENCES: 'preferences',
      SUPPORT: 'support'
    };

    this.currentDateSetting = _.cloneDeep(this.originDateFormat);

    this.dateFormatSettings = {
      options: [
        {
          id: DATE_FORMAT.MM_DD_YY,
          format: this.translate.instant('SETTINGS.PREFERENCES_TAB.DATE_FORMATS.MM_DD_YY')
        },
        {
          id: DATE_FORMAT.DD_MM_YY,
          format: this.translate.instant('SETTINGS.PREFERENCES_TAB.DATE_FORMATS.DD_MM_YY')
        }
      ],
    };
    this.dateFormatSettings.selected = this.searchById(this.currentDateSetting.dateFormat, this.dateFormatSettings.options);

    this.useDefaultTimeFormat = this.originDateFormat.useDefault;

    this.use24HourFormat = this.originDateFormat.use24HourFormat;

    this.currentDataFormat = this.originDateFormat.dateFormat;


    this.videoCalling = this.userSettingsService.getCurrentVideoCheck();

    this.timeFormat = {
      selected: ''
    };

    if (!!this.originalSettings.conferencing.meetingServiceList) {
      this.originalSettings.conferencing.meetingServiceList.sort(this.sortMeetingTypeList);
    }
    this.originalSettings.conferencing.meetingServiceList.forEach((meetingService) => {
      meetingService.prefixAndName = ((meetingService.prefix && meetingService.prefix !== 'N/A') ?
        (meetingService.prefix + ' - ') : '') + meetingService.name;
      if (meetingService.prefixAndName.length > 30) {
        meetingService.prefixAndName = meetingService.prefixAndName.substring(0, 29) + '...';
        meetingService.tooltip = ((meetingService.prefix && meetingService.prefix !== 'N/A') ?
          (meetingService.prefix + ' - ') : '') + meetingService.name;
      }
    });

    this.userSettings = _.cloneDeep(this.originalSettings);

    this.currentLocation = this.searchById(this.userSettings.conferencing.locationId, this.locations, 'locationId');

    this.userSettings.conferencing.virtualRoomSettings.forEach((room) => {
      room.previousWaitingRoomValue = room.waitingRoom;
    });

    if (this.isDesktop) {
      this.userSettings.videoCalling = this.videoCalling;
      this.userSettings.saveLogsCheckbox = this.saveLogsCheckbox;
      // tslint:disable-next-line:no-unused-expression
      this.newPicture;
      this.photoWasDeleted = false;
      // this.userSettings.userPicture = this.user.pictureData;
    }

    this.availableVoicePromptLanguagesCopy = _.cloneDeep(this.userSettings.conferencing.availableVoicePromptLanguages);

    this.voicePromptLanguage = {
      options : this.userSettingsService.getLocalizedAudioPromptLanguage(this.availableVoicePromptLanguagesCopy),
      selected : this.searchById(this.userSettings.voicePromptLanguage , this.availableVoicePromptLanguagesCopy)
    };

    this.locations = {
      selected: this.currentLocation,
      options: this.sortByKey(this.locations, 'name')
    };

    const noneDefaultVirtualRoom = {name: 'None', virtualRoomId: null};

    // find first room with enabled defaultRoom flag
    this._defaultVirtualRoom = this.searchById(this.userSettings.conferencing.defaultVirtualRoom,
      this.userSettings.conferencing.virtualRoomSettings, 'virtualRoomId');
    this.defaultVirtualRoom = {
      selected: this._defaultVirtualRoom,
      options: _.cloneDeep(this.userSettings.conferencing.virtualRoomSettings)
    };

    if(this.userSettings.conferencing.defaultVirtualRoom === 'None'){
      this.defaultVirtualRoom.selected = noneDefaultVirtualRoom;
    }

    if(this.userSettings.conferencing.virtualRoomSettings.length > 1){
      this.defaultVirtualRoom.options.push(noneDefaultVirtualRoom);
    }

    if (this._defaultVirtualRoom) {
      this.currentRoom = this._defaultVirtualRoom;
    } else if (this.userSettings.conferencing.virtualRoomSettings.length) {
      // show first room in VR list on VR tab if default room is not assigned
      this.currentRoom = this.userSettings.conferencing.virtualRoomSettings[0];
    }

    this.announcementList = [
      {
        id: '0',
        name: this.translate.instant('SETTINGS.ROOM_TAB.ANNOUNCEMENT_LIST.NONE')
      },
      {
        id: '1',
        name: this.translate.instant('SETTINGS.ROOM_TAB.ANNOUNCEMENT_LIST.TONE')
      },
      {
        id: '2',
        name: this.translate.instant('SETTINGS.ROOM_TAB.ANNOUNCEMENT_LIST.NAME')
      }
    ];

    this.allowPresentPolicyList = [
      {
        id: 'MODERATOR',
        name: this.translate.instant('SETTINGS.ROOM_TAB.SHARING_LIST.ONLY_MODERATOR')
      },
      {
        id: 'MODERATOR_AND_REGISTERED_USERS',
        name: this.translate.instant('SETTINGS.ROOM_TAB.SHARING_LIST.MODERATOR_AND_REGISTERED_USER')
      },
      {
        id: 'EVERYONE',
        name: this.translate.instant('SETTINGS.ROOM_TAB.SHARING_LIST.EVERYONE')
      }
    ];

    if (this.userSettings.conferencing.virtualRoomSettings.length) {
      this.virtualRoomNumber = {
        selected: this.currentRoom,
        options: this.userSettings.conferencing.virtualRoomSettings
      };

      this.virtualRoomVoicePromptLanguage = {
        options : this.userSettingsService.getLocalizedLanguage(this.userSettings.conferencing.availableVoicePromptLanguages),
        selected : this.searchById(this.currentRoom.voicePromptLanguage , this.userSettings.conferencing.availableVoicePromptLanguages)
      };

      this.entryAnnouncement = {
        options: this.announcementList,
        selected: this.searchById(this.currentRoom.entryAnnouncement, this.announcementList)
      };

      this.exitAnnouncement = {
        options: this.announcementList,
        selected: this.searchById(this.currentRoom.exitAnnouncement, this.announcementList)
      };

      if (this.currentRoom.maxPlayToneNumber === '') {
        this.roomFormScope.roomForm.maxPlayToneNumber.$setValidity('required', false);
      }

      this.virtualRoomDialInLocations = {
        options : this.sortByKey(this.userSettings.conferencing.availableDialInLocations, 'label'),
        selected : this.searchById(this.currentRoom.preferredDialInLocation , this.userSettings.conferencing.availableDialInLocations)
      };

      this.haveDualInData = this.virtualRoomDialInLocations.options.length !== 0;

      this.allowPresentPolicy = {
        options: this.allowPresentPolicyList,
        selected: this.searchById(this.currentRoom.allowPresentPolicy, this.allowPresentPolicyList)
      };

      this.virtualRoomInvitationLanguages = {
        options : this.userSettingsService.getLocalizedLanguage(this.userSettings.conferencing.availableInvitationLanguages),
        selected : this.searchById(this.currentRoom.invitationLanguage , this.userSettings.conferencing.availableInvitationLanguages)
      };

      this.setCurrentVirtualRoom(this.currentRoom);
    }

    if(this.userSettings.conferencing.localUser && !this.isOAuthUser){

      this.changePasswordReactiveForm = this.formBuilder.group({
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      }, {validators: this.customValidators.passwordsMatch()});
    }

    this.ACData = this.acClientService.clientData || undefined;
    if (this.customDeviceDetector.os === OS.MAC && this.userSettingsService.portalResources.outlookPluginDownloadUrlMac) {
      this.canShowDownloadPlugin = true;
    }
    else { this.canShowDownloadPlugin = !!(this.customDeviceDetector.os === OS.WINDOWS &&
      this.userSettingsService.portalResources.outlookPluginDownloadUrlWindows);
    }

    this.isChrome = this.customDeviceDetector.browser === BROWSERS.CHROME;
    this.isMac = this.customDeviceDetector.os === OS.MAC;
    this.isWindows = this.customDeviceDetector.os === OS.WINDOWS;

    // TODO make analog of this watch
    // $scope.$watch(() => {
    //   return window.localStorage.AC;
    // }, (newVal) => {
    //
    //   if (newVal) {
    //     $scope.refreshClientInfo();
    //   }
    // });

    // @ts-ignore
    this.showSharingPlaginLink = !AvayaClientServices.Providers.ContentSharing.FeatureSupported.isSharingAnyTypeAvailable();

    this.filteredContacts = [];

    this.delegatedUsers = _.cloneDeep(this.userSettings.conferencing.delegatedUsers);

    // TODO make analog of this watch and check than analog working correct
    // $scope.$watch('currentRoom.attendees.length', (newValue, oldValue) => {
    //   this.logger.info('currentRoom.attendees.length is changed. newValue=%s, oldValue=%s', newValue, oldValue);
    //   if (newValue > oldValue) {
    //     $scope.currentRoom.attendees = $filter('unique')($scope.currentRoom.attendees, 'terminalId');
    //   }
    // });

    this.TAB = {
      USER: 'user',
      ROOM: 'room',
      GENERAL: 'general',
      CLIENT: 'client',
      PASSWORD: 'password',
      PREFERENCES: 'preferences',
      SUPPORT: 'support'
    };

    this.currentTab = this.TAB.USER;

    this.userService = this.userSettingsService.getAvayaUserService();
    this.pictureErrorMessage = undefined;

    // TODO make this method
    // $scope.deletePhotoWithConfirmation = () => {
    //   this.logger.log('Ask user to confirm removing photo');
    //
    //   if ($scope.isDesktop) {
    //     ngDialog.openConfirm({
    //       template: 'app/components/settings/templates/ConfirmDeletePhoto.html',
    //       closeByNavigation: true,
    //       showClose: false,
    //       className: 'ngdialog-theme-request-popup ngdialog-confirm-delete-user-photo'
    //     }).then(() => {
    //       this.logger.log('Removing user photo');
    //       if ($scope.isDesktop) {
    //         this.deleteCurrentPhoto();
    //       } else {
    //         this.deletePhoto();
    //       }
    //     });
    //   } else {
    //     const confirmationText = $translate.instant('SETTINGS.USER_TAB.DELETE_PHOTO_TITLE') + '\n' +
    //       $translate.instant('SETTINGS.USER_TAB.DELETE_PHOTO_DESCRIPTION');
    //     if (confirm(confirmationText)) {
    //       if ($scope.isDesktop) {
    //         this.deleteCurrentPhoto();
    //       } else {
    //         this.deletePhoto();
    //       }
    //     }
    //   }
    // };

    // TODO make this method
    // $scope.uploadNewPhoto = () => {
    //   setTimeout(() => {
    //     this.thatScope.$apply();
    //     //@ts-ignore
    //     $('.upload-avatar-image').click();
    //   });
    // };

    // TODO make this method
    // $scope.setPictureInSettings = (image) => {
    //   const files = image;
    //   const reader = new FileReader();
    //
    //   reader.onload = ((theFile) => {
    //     return (e) => {
    //       $scope.userSettings.userPicture = e.target.result;
    //       $scope.$digest();
    //     };
    //   })(files);
    //
    //   reader.readAsDataURL(files);
    // };

    // TODO make this method
    // $scope.changePhoto = (element) => {
    //   if (element.value) {
    //     this.logger.log('Changing user photo');
    //
    //     const fileExtension = element.value.substring(element.value.lastIndexOf('.') + 1).toLowerCase();
    //     const validExtensions = ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
    //     if (validExtensions.indexOf(fileExtension) === -1) {
    //       this.logger.log('Invalid file extension!');
    //       MessageUtilsService.showError($translate.instant('UTILITIES.FILE_READER.DENIED_EXTENSION'),
    //         $translate.instant('UTILITIES.FILE_READER.FORMAT_ERROR', {types: validExtensions.toString()}));
    //       return;
    //     }
    //
    //     if (!this.thatScope.userSettings.maxPictureSizeInKB ||
    //       element.files[0].size/1024 < this.thatScope.userSettings.maxPictureSizeInKB) {
    //       this.logger.log('Image file is small enough, use it as is.');
    //       if ($scope.isDesktop) {
    //         this.newPicture = element.files[0];
    //         $scope.setPictureInSettings(element.files[0]);
    //       } else {
    //         this.sendPicture(element.files[0]);
    //       }
    //       return;
    //     }
    //
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext('2d');
    //     //@ts-ignore
    //     const _URL = window.URL || window.webkitURL;
    //     const img = new Image();
    //     img.onload = () => {
    //       //@ts-ignore
    //       const origW = this.width;
    //       //@ts-ignore
    //       const origH = this.height;
    //       const sx0 = Math.max((origW - origH)/2, 0);
    //       const sy0 = Math.max((origH - origW)/2, 0);
    //       const sWH = Math.min(origH, origW);
    //
    //       const scaleForFirst = Math.sqrt(element.files[0].size/(1024*this.thatScope.userSettings.maxPictureSizeInKB)) * 1.1; // +10%
    //
    //       const fitImageAndSend = (scale) => {
    //         const dWH = sWH / scale;
    //         canvas.width = canvas.height = dWH;
    //
    //         context.drawImage(img, sx0, sy0, sWH, sWH, 0, 0, dWH, dWH);
    //         canvas.toBlob((result) => {
    //           if (result.size/1024 < this.thatScope.userSettings.maxPictureSizeInKB) {
    //             this.logger.log('Send user photo');
    //             if ($scope.isDesktop) {
    //               this.newPicture = result;
    //               $scope.setPictureInSettings(result);
    //             } else {
    //               this.sendPicture(result);
    //             }
    //           } else {
    //             const newScale = scale * Math.sqrt(result.size / (1024 * this.thatScope.userSettings.maxPictureSizeInKB)) * 1.1;
    //             this.logger.log('New photo does not fit into limits, try again');
    //             fitImageAndSend(newScale);
    //           }
    //         });
    //       }
    //
    //       fitImageAndSend(scaleForFirst);
    //     };
    //     img.src = _URL.createObjectURL(element.files[0]);
    //   }
    // };

    // TODO make this method
    // $scope.mobilePictureOptions = [{
    //   name: $translate.instant('SETTINGS.USER_TAB.UPLOAD_NEW'),
    //   func: () => {
    //     $scope.uploadNewPhoto();
    //   }
    // },{
    //   name: $translate.instant('SETTINGS.USER_TAB.DELETE'),
    //   func: () => {
    //     $scope.deletePhotoWithConfirmation();
    //   }
    // }, {
    //   name: $translate.instant('SETTINGS.USER_TAB.CANCEL'),
    //   func: () => {},
    //   class: 'cancel'
    // }];

    this.originalSettings = _.cloneDeep(this.userSettings);

    // If we haven't DB, hide button
    if (this.indexedDbIsCompatibility) {
      this.meetingsLogsService.openDb()
        .then((db) => {
          this.haveIndexedDB = true;
          return db;
        }, (db) => {
          this.haveIndexedDB = false;
          return db;
        })
        .then((db) => {
          this.meetingsLogsService.closeDb(db);
        });
    }

    if(this.data.virtualRoomNeedUpdate){
      this.currentTab = this.TAB.ROOM;
      const roomToUpdate = this.searchById(this.data.virtualRoomNeedUpdate.virtualRoomId,
        this.userSettings.conferencing.virtualRoomSettings, 'virtualRoomId');
      this.currentRoom = roomToUpdate;
      this.virtualRoomNumber.selected = roomToUpdate;
    }

    this.isMultiTenant = this.userSettingsService.portalResources.multitenant;
  }

  endpointsRemoved(attendees): void {
    this.currentRoom.attendees = attendees;
  }

  isShowLocalTab():boolean {
    return this.customDeviceDetector.isDesktop();
  }

  setRoomFormScope(scope): void{
    this.roomFormScope = scope;
  }

  isShowClientTab():any {
    return (this.customDeviceDetector.os === OS.WINDOWS || this.customDeviceDetector.os === OS.MAC) &&
      this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientEnableRank;
  }

  locationsSelected(location?): void {
    this.logger.log('location changed');
    this.locations.selected = location;
    this.userSettings.conferencing.locationId = this.locations.selected.locationId;
  }

  defaultRoomWasChanged($event?: string): void {
    this.logger.log('default Virtual Room changed', $event);
    // disable defaultRoom flags in all rooms
    const virtualRooms = this.userSettings.conferencing.virtualRoomSettings;
    for (const vr of virtualRooms) {
      vr.defaultRoom = false;
    }
    // set selected room as default
    this.defaultVirtualRoom.selected = $event;
    this.defaultVirtualRoom.selected.defaultRoom = true;
    this.userSettings.conferencing.defaultVirtualRoom = this.defaultVirtualRoom.selected.virtualRoomId;
  }

  virtualRoomNumberSelected(currentRoom): void {
    this.setCurrentVirtualRoom(currentRoom);
  }

  meetingTypeSelected(event): void {
    this.logger.log('meetingType changed');
    if (event) {
      this.currentRoom.serviceTemplateId = event.serviceId;
      this.currentRoom.servicePrefix = event.prefix;
    }
  }

  moderatorPinChanged(pin): void {
    this.pinService.isPinCorrect(this.pinData.moderatorPin, PIN_TYPE.MODERATOR_PIN, this);
    if (this.isEmpty(pin)) {
      this.currentRoom.moderatorPIN = '';
      this.currentRoom.waitingRoom = false;

    } else {
      this.currentRoom.moderatorPIN = btoa(pin);
    }
  }

  isEmpty(value): boolean {
    return value === undefined || value === null || value === '';
  }

  changeWaitingRoom(): void {
    if(!!this.currentRoom.moderatorPIN){
      this.currentRoom.previousWaitingRoomValue = this.currentRoom.waitingRoom;
    }
  }

  currentRoomModeratorPIN(): void {
    // TODO get old and new value
    // if(newVal !== '' && oldVal === ''){
      this.currentRoom.waitingRoom = this.currentRoom.previousWaitingRoomValue;
    // }
  }

  accessPinCheckboxChanged(value): void {
    if(this.meetingPinMinLength !== 0){
      this.pinData.accessPinEnabled = true;
    } else{
      if (!this.pinData.accessPinEnabled) {
        this.pinData.permanentPin = '';
        this.currentRoom.accessPIN = '';
        this.currentRoom.oneTimePINRequired = false;
      }
    }

    if(value){
      setTimeout(() => {
        this.virtualRoomForm.controls.accessPin.setErrors({required: true});
      });
    }
  }

  pinRadioStateChanged(event): void {
    if(this.currentRoom.oneTimePINRequired){
      this.isMeetingPinContainsSequentialOrRepeatedSymbols = false;
    }
    this.pinData.permanentPin = '';
    this.currentRoom.accessPIN = '';
    if(this.pinData.accessPinEnabled && event.target.value === 'on'){
      setTimeout(() => {
        this.virtualRoomForm.controls.accessPin.setErrors({required: true});
      });
    }
  }

  permanentPinChanged(): void {
    this.pinService.isPinCorrect(this.pinData.permanentPin, PIN_TYPE.MEETING_PIN, this);
    if (this.isEmpty(this.pinData.permanentPin)) {
      this.currentRoom.accessPIN = '';
      this.isMeetingPinContainsSequentialOrRepeatedSymbols = false;
    } else {
      this.pinService.isPinCorrect(this.pinData.permanentPin, PIN_TYPE.MEETING_PIN, this);
      this.currentRoom.accessPIN = btoa(this.pinData.permanentPin);
    }
  }

  isAllowRecordingDisabled (): boolean {
    return this.userSettings.conferencing.allowRecording !== 'ON' || this.currentRoom.allowRecording === 'DISABLED';
  }

  virtualRoomVoicePromptLanguageSelected(language): void {
    this.virtualRoomVoicePromptLanguage.selected = language;
    this.logger.log('virtualRoomVoicePromptLanguage changed to %s', language.displayName);
    this.currentRoom.voicePromptLanguage = language.id;
  }

  entryAnnouncementSelected(announcement): void {
    if (announcement) {
      this.entryAnnouncement.selected = announcement;
      this.logger.log('entryAnnouncement changed to %s', announcement.name);
      this.currentRoom.entryAnnouncement = announcement.id;
    }
  }

  exitAnnouncementSelected(announcement): void {
    if (announcement) {
      this.exitAnnouncement.selected = announcement;
      this.logger.log('exitAnnouncement changed to %s', announcement.name);
      this.currentRoom.exitAnnouncement = announcement.id;
    }
  }

  currentRoomMaxPlayToneNumber(): void {
    if (this.currentRoom.maxPlayToneNumber) {
      this.currentRoom.maxPlayToneNumber = +this.currentRoom.maxPlayToneNumber;
      if (+this.currentRoom.maxPlayToneNumber > 100) {
        this.errorMaxPlayToneNumber = true;
        // this.roomFormScope.roomForm.maxPlayToneNumber.$setValidity('required', false);
        return;
      }
    }
    this.errorMaxPlayToneNumber = false;
  }

  currentRoomMaxPlayNameNumber(): void {
    if (this.currentRoom.maxPlayNameNumber) {
      this.currentRoom.maxPlayNameNumber = +this.currentRoom.maxPlayNameNumber;
      if (+this.currentRoom.maxPlayNameNumber > 100) {
        this.errorMaxPlayNameNumber = true;
        // this.roomFormScope.roomForm.maxPlayNameNumber.$setValidity('required', false);
        return;
      }
    }
    this.errorMaxPlayNameNumber = false;
  }

  virtualRoomDialInLocationsSelected(language): void {
        if (language) {
          this.virtualRoomDialInLocations.selected = language;
          this.logger.log('virtualRoomDialInLocations changed to %s', language.displayName);
          this.currentRoom.preferredDialInLocation = language.id;
        }
  }

  setDateFormat(dateFormat: string): void{
    this.dateFormatSettings.selected = dateFormat;
  }

  allowPresentPolicySelected(allowPresentPolicyOptions): void {
        if (allowPresentPolicyOptions) {
          this.allowPresentPolicy.selected = allowPresentPolicyOptions;
          this.logger.log('allowPresentPolicy changed to %s', allowPresentPolicyOptions.name);
          this.currentRoom.allowPresentPolicy = allowPresentPolicyOptions.id;
        }
  }

  virtualRoomInvitationLanguagesSelected(language): void {
    this.logger.log('virtualRoomInvitationLanguages changed to %s', language.displayName);
    this.virtualRoomInvitationLanguages.selected = language;
    this.currentRoom.invitationLanguage = language.id;
  }

  areAllPinsCorrect(): boolean {
    return this.isMeetingPinCorrect() && this.isModeratorPinCorrects();
  }

  canChangeMeetingType(): boolean {
    return this.currentRoom.fixedMeetingType === true;
  }

  saveSettingsAndClose(): Promise<any> {
    return this.applySettings().then(() => {
      this.dialogRef.close();
    });
  }

  cancelSettings(): void {
    this.dialogRef.close();
  }

  applySettings(): Promise<any> {
    return new Promise<any>(resolve => {

      const confirmSettings = () => {
        // const deferredPassword = $q.defer();
        // const deferredSettings = $q.defer();
        const confirmPassword = () => {
          return new Promise<any>((resolve1, reject) => {


            if (this.changePasswordReactiveForm && this.changePasswordReactiveForm.dirty) {
              this.logger.info('Change password by apply button');
              resolve1(this.changePassword());
              // $scope.$broadcast(EVENT.CUSTOM.CHANGE_PASSWORD, {
              //   form: $scope.changePasswordForm.form.changePasswordForm,
              //   promise: deferredPassword
              // });
            } else {
              resolve1(true);
            }


          });
        };
        const confirmUserSettings = () => {
          return new Promise((resolve1, reject1) => {
            if (this.settingsChanged()) {
              this.logger.log('settings changed, need to upload to server');
              if (this.isVirtualRoomFormValid()) {
                resolve1(this.prepareAndUploadSettings().then(
                  () => {
                    return new Promise(resolve2 => {
                      window.localStorage.videoCallingPreferences = this.videoCalling;
                      window.localStorage.enabledLogs = this.saveLogsCheckbox;
                      if (!this.saveLogsCheckbox) {
                        this.meetingsLogsService.deleteLogs();
                        this.haveIndexedDB = false;
                      }
                      // @ts-ignore
                      this.originDateFormat = _.cloneDeep(this.currentDateSetting);
                      this.originalAccessPinEnabled = this.data.accessPinEnabled;
                      window.localStorage.timeFormat = JSON.stringify(this.currentDateSetting);
                      if (this.isDesktop) {
                        if (this.photoWasDeleted) {
                          this.deletePhoto();
                          this.photoWasDeleted = false;
                        }

                        if (!!this.newPicture) {
                          this.sendPicture(this.newPicture);
                        }
                      }
                      resolve2(true);
                    });
                  }, (e) => {
                    return new Promise((resolve2, reject) => {
                      reject();
                    });
                  }));
              } else {
                reject1();
              }
            } else {
              this.logger.log('settings not changed, no need to upload to server');
              resolve1(true);
            }
          });
        };

        // if (this.changePasswordForm && $scope.changePasswordForm.form.changePasswordForm.$dirty) {
        //   this.logger.info('Change password by apply button');
        //   $scope.$broadcast(EVENT.CUSTOM.CHANGE_PASSWORD, {
        //     form: $scope.changePasswordForm.form.changePasswordForm,
        //     promise: deferredPassword
        //   });
        // } else {
        //   deferredPassword.resolve();
        // }

        // if (this.settingsChanged()) {
        //   this.logger.log('settings changed, need to upload to server');
        //   if (this.isVirtualRoomFormValid()) {
        //     this.prepareAndUploadSettings().then(
        //       () => {
        //         deferredSettings.resolve();
        //         window.localStorage.videoCallingPreferences = this.videoCalling;
        //         window.localStorage.enabledLogs = this.saveLogsCheckbox;
        //         if (!this.saveLogsCheckbox) {
        //           this.meetingsLogsService.deleteLogs();
        //           this.haveIndexedDB = false;
        //         }
        //         // @ts-ignore
        //         this.originDateFormat = _.cloneDeep($scope.currentDateSetting);
        //         this.originalAccessPinEnabled = this.data.accessPinEnabled;
        //         window.localStorage.timeFormat = JSON.stringify(this.currentDateSetting);
        //         if (this.isDesktop) {
        //           if (this.photoWasDeleted) {
        //             this.deletePhoto();
        //             this.photoWasDeleted = false;
        //           }
        //
        //           if (!!this.newPicture) {
        //             this.sendPicture(this.newPicture);
        //           }
        //         }
        //       }, () => {
        //         deferredSettings.reject();
        //       });
        //   } else {
        //     deferredSettings.reject();
        //   }
        // } else {
        //   this.logger.log('settings not changed, no need to upload to server');
        //   deferredSettings.resolve();
        // }
        this.setDefaultRoom();
        // resolve(confirmPassword().then(() => {
        //   resolve(confirmUserSettings().catch(() => {
        //     return new Promise((resolve1, reject) => {
        //       reject();
        //     });
        //   }));
        // }, () => {
        //   return new Promise((resolve1, reject) => {
        //     reject();
        //   });
        // }));
        return Promise.all([confirmPassword(), confirmUserSettings()]);
      };

      if(this.defaultVirtualRoom.selected.name !== 'None' && this.wasMeetingPinChanged()){
        return this.showPinWarning().then( () => {
          return new Promise<any>(resolve1 => {
            // confirmSettings
            resolve1(confirmSettings());
          });
        });
      } else {
        // confirmSettings
        resolve(confirmSettings());
      }
    });
  }

  settingsChanged(): boolean {
    if(this.currentTab === this.TAB.ROOM){
      return (!_.isEqual(this.userSettings, this.originalSettings) || this.isTimeFormatWasChanged()) && this.areAllPinsCorrect();
    } else {
      return (!_.isEqual(this.userSettings, this.originalSettings) || this.isTimeFormatWasChanged()) &&
        !(this.wasVirtualRoomSettingChanged() && !this.areAllPinsCorrect());
    }
  }

  // noinspection JSAnnotator
  needOptionalUpgrade(): boolean {
    if(this.ACData && this.ACData.latestVersion) {
      return this.versionService.isUpdateRequired(this.ACData.version, this.ACData.latestVersion.version);
    }
    else {
      return false;
    }
  }

  downloadOutlookPlugIn(): void {
    this.acClientService.downloadOutlookPlugIn();
  }

  downloadAC(): void {
    this.acClientService.downloadClient();
    if (this.isApplyDisabled()) {
      this.dialogRef.close();
    }

    // TODO make this method
    // MessageUtilsService.showDownloadSettingsDialog({isJoin: false});
  }

  removeClientInfo(): void {
    this.acClientService.clearClientData();
    this.ACData = this.acClientService.clientData;
    window.localStorage.haveDownloadedClient = false;
  }

  refreshClientInfo(): void {
    this.ACData = this.acClientService.clientData;
  }

  downloadChromePlugin(): void {
    if (this.userSettingsService.portalResources) {
      if (this.customDeviceDetector.browser === BROWSERS.CHROME &&
        this.userSettingsService.portalResources.chromeScreensharingExtensionUrl) {
        window.open(this.userSettingsService.portalResources.chromeScreensharingExtensionUrl, '_blank');
      } else if (this.customDeviceDetector.browser === BROWSERS.FIREFOX &&
        this.userSettingsService.portalResources.firefoxScreensharingExtensionUrl) {
        window.open(this.userSettingsService.portalResources.firefoxScreensharingExtensionUrl, '_blank');
      }
    }
  }

  canShowACDownloadButton(): boolean {
    return this.acClientService.canShowDownloadButton();
  }

  searchEndpointInputChanged(newvalue, oldvalue): void {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }

    const searchTerminals = (inputValue) => {
      if (inputValue) {
        this.searching = true;
        this.contactsService.searchTerminals(inputValue).
        then((terminals) => {
          this.searching = false;
          this.filteredEndpoints = terminals;
        });
      } else {
        this.filteredEndpoints = [];
        this.searching = false;
      }
    };

    this.inputTimeout = setTimeout(() => {
      searchTerminals(newvalue);
    }, 700);
  }

  toInputChanged(contactSearchTerm): void {
    const searchContacts = (searchTerm) => {

      if (searchTerm) {
        this.searching = true;
        this.contactsService.searchContacts(searchTerm).
        then((contacts) => {
          this.searching = false;
          this.filteredContacts = contacts;
        });
      } else {
        this.filteredContacts = [];
        this.searching = false;
      }
    };

    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }

    this.inputTimeout = setTimeout(() => {
      searchContacts(contactSearchTerm);
    }, 700);
  }

  selectedChanged(event): void {
    this.delegatedUsers = event;
  }

  removeUser(userId): void {
    this.delegatedUsers = this.delegatedUsers.filter(user => user.userId !== userId);
    this.userSettings.conferencing.delegatedUsers = this.delegatedUsers;
  }

  changePreferences(): void {
    this.videoCalling = !this.videoCalling;
    this.userSettings.videoCalling = this.videoCalling;
  }

  setPasswordFormToScope(form, token): void {
    this.changePasswordForm = {
      form,
      token
    };
  }

  isOKDisabled(): boolean {
    if(this.currentTab === this.TAB.ROOM){
      return !this.areAllPinsCorrect() || !this.isChangeFormValid();
    }
    return (this.wasVirtualRoomSettingChanged() && !this.areAllPinsCorrect()) || !this.isChangeFormValid();
  }

  isApplyDisabled(): boolean {
      if(this.currentTab === this.TAB.ROOM){
        return !this.isVirtualRoomFormValid() || !this.settingsChanged() || !this.isChangeFormValid();
      }
      if(!this.wasVirtualRoomSettingChanged()){
        return (!this.settingsChanged() || !this.isChangeFormValid());
      } else {
        return !this.isVirtualRoomFormValid() || !this.settingsChanged() || !this.isChangeFormValid();
      }

    // return ((this.virtualRoomForm && this.virtualRoomForm.form.status === 'INVALID') ||
    //   !this.settingsChanged() ||
    //   this.data.moderatorPin === undefined);

    // if(this.currentTab === this.TAB.ROOM){
    //   return ((this.virtualRoomForm && this.virtualRoomForm.form.status === 'INVALID') ||
    //     !this.settingsChanged());
    // }
    // return ((this.virtualRoomForm && this.virtualRoomForm.form.status === 'INVALID') ||
    //   !this.settingsChanged() || (this.wasVirtualRoomSettingChanged()));
    // ((this.roomFormScope && this.roomFormScope.roomForm.$invalid) ||
    //   !this.settingsChanged() ||
    //   this.data.moderatorPin === undefined) &&
    //   (this.changePasswordForm && (!this.changePasswordForm.form.changePasswordForm.$dirty ||
    //     this.changePasswordForm.form.changePasswordForm.newPassword.$error.required ||
    //     this.changePasswordForm.form.changePasswordForm.newPassword2.$error.required ||
    //     this.changePasswordForm.form.changePasswordForm.newPassword.$error.matchError ||
    //     this.changePasswordForm.form.changePasswordForm.newPassword2.$error.matchError ||
    //     this.changePasswordForm.form.changePasswordForm.currentPassword.$error.required ||
    //     this.changePasswordForm.form.changePasswordForm.currentPassword.$error.bad
    //   ));
  }

  setCurrentTab(tab): void {
    this.currentTab = this.currentTab === tab && this.isMobileView ? undefined : tab;

    if(tab !== this.TAB.PASSWORD && this.changePasswordReactiveForm){
      this.changePasswordReactiveForm.reset();
    }

    // need to set password type on pin inputs

    // @ts-ignore
    $('.vr-pin').attr('type', 'password');
    // @ts-ignore
    $('.participant-id-field').attr('type', 'password');
    // @ts-ignore
    $('.password-eye').removeClass('visible-pass').addClass('hidden-pass');
  }

  dateFormatSettingsSelected(): void {
    this.currentDateSetting.dateFormat = this.dateFormatSettings.selected.id;
  }

  changeTimeFormat(): void {
    this.useDefaultTimeFormat = !this.useDefaultTimeFormat;
    this.currentDateSetting.useDefault = this.useDefaultTimeFormat;
  }

  changeHourFormat(): void {
    this.use24HourFormat = !this.use24HourFormat;
    this.currentDateSetting.use24HourFormat = this.use24HourFormat;
  }

  isTimeFormatWasChanged(): boolean {
    return !_.isEqual(this.currentDateSetting, this.originDateFormat);
  }

  changeSaveLogs(): void {
    if(!this.warningDialog && this.saveLogsCheckbox){
      this.warningDialog = this.dialog.open(WarningSaveLogsDialogComponent, {
        data: {
          confirm: this.confirmDialog.bind(this)
        }
      });
      this.warningDialog.afterClosed().subscribe(() => {
        this.warningDialog = undefined;
      });
    } else {
      this.saveLogsCheckbox = !this.saveLogsCheckbox;
    }
  }

  downloadLogs(): void{
    if(this.haveIndexedDB){
      this.meetingsLogsService.downloadLogs();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  sendLogsEml(): void {
    if(this.haveIndexedDB){
      this.meetingsLogsService.sendLogsEml();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  sendLogsEmail(): void {
    if(this.haveIndexedDB){
      this.meetingsLogsService.sendLogsEmail();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  refreshParticipantId(): void {
    this.userSettingsService.getNewParticipantId().then((res:any) => {
      this.userSettings.conferencing.participantId = res.newParticipantId;
    });
  }

  voicePromptLanguageChanged(language): void {
    this.voicePromptLanguage.selected = language;
    if (language) {
      this.logger.log('voicePromptLanguage changed to %s', language.displayName);
      this.userSettings.voicePromptLanguage = language.id;
    }
  }

  changePassword(data?): Promise<any> {
    return new Promise<any>(resolve => {
      this.logger.info('Change password');
      // const form = data.form;
      // form.$error.server = false;
      // form.$error.server_bad_old_password = false;
      // form.$error.server_unable_use_old_password = false;
      // form.$error.server_change_frequency = false;
      // form.$error.server_change_repeated_chars = false;
      // form.$error.server_change_complexity = false;
      // form.$error.server_too_short = false;
      // form.$error.server_invalid_token = false;
      // form.$error.number_previous_passwords_cannot_reused = false;
      // form.$error.cannot_contain_loginId = false;
      // form.$error.must_contain_categories = false;
      // form.$error.cannot_contain_repeted_chars = false;
      // form.$error.cannot_contain_sequential_chars = false;

      this.logger.log('Start loading');
      // $scope.$emit(EVENT.CUSTOM.LOADING_STARTED);
      const onAlways = () => {
        setTimeout(() => {
          this.logger.log('Stop loading');
          // $rootScope.$broadcast(EVENT.CUSTOM.LOADING_FINISHED);
        });
      };

      const onDone = (response) => {
        return new Promise((resolve1, reject) => {
          this.logger.log('Password has been changed. Clean up form, %o', JSON.stringify(response));
          this.changePasswordForm.controls.currentPassword.patchValue('');
          this.changePasswordForm.controls.newPassword.patchValue('');
          this.changePasswordForm.controls.confirmPassword.patchValue('');
          this.changePasswordForm.reset();
          // form.$setPristine();
          // form.$setUntouched();
          resolve(response);
        });
      };

      const onFail = (response) => {
        return new Promise((resolve1, reject) => {
          this.logger.warn('Password has not been changed, %o', JSON.stringify(response));
          this.changePasswordReactiveForm.setErrors({errorFromServer: true});
          // form.$invalid = true;
          try {
            switch (response.responseJSON.error[0].errorCode) {
              case 'ERC_AUTH_PASSWORD_CHANGE_OLD_BAD':
                // form.$error.server_bad_old_password = true;
                this.changePasswordReactiveForm.setErrors({server_bad_old_password: true});
                if (this.changePasswordReactiveForm.controls.currentPassword.value) {
                  // form.currentPassword.$error.bad = true;
                  this.changePasswordReactiveForm.setErrors({bad: true});
                }
                break;
              case 'ERC_AUTH_PASSWORD_CHANGE_OLD_UNABLE_USE':
                // form.$error.server_unable_use_old_password = true;
                this.changePasswordReactiveForm.setErrors({server_unable_use_old_password: true});
                break;
              case 'ERROR_CANNOT_BECHANGE_FREQUENTLY':
                // form.$error.server_change_frequency = true;
                this.changePasswordReactiveForm.setErrors({server_change_frequency: true});
                break;
              case 'ERC_AUTH_PASSWORD_CHANGE_REPEATED_CHARS':
                // form.$error.server_change_repeated_chars = true;
                this.changePasswordReactiveForm.setErrors({server_change_repeated_chars: true});
                break;
              case 'ERC_AUTH_PASSWORD_CHANGE_COMPLEXITY':
                // form.$error.server_change_complexity = true;
                this.changePasswordReactiveForm.setErrors({server_change_complexity: true});
                break;
              case 'ERC_AUTH_PASSWORD_CHANGE_NEW_SHORT':
                // form.$error.server_too_short = true;
                this.changePasswordReactiveForm.setErrors({server_too_short: true});
                break;
              case 'ERC_AUTH_TOKEN_INVALID':
                // TODO: handle unauthorized access, broadcast appropriate event
                break;
              case 'ERC_AUTH_PASSWORD_CHANGE_TOKEN_INVALID':
                // form.$error.server_invalid_token = true;
                this.changePasswordReactiveForm.setErrors({server_invalid_token: true});
                break;
              case 'ERROR_CANNOT_MACTH_PASSWORD_HISTORY':
                // form.$error.number_previous_passwords_cannot_reused = true;
                this.changePasswordReactiveForm.setErrors({number_previous_passwords_cannot_reused: true});
                break;
              case 'ERROR_CANNOT_CONTAIN_LOGIN_ID':
                // form.$error.cannot_contain_loginId = true;
                this.changePasswordReactiveForm.setErrors({cannot_contain_loginId: true});
                break;
              case 'ERROR_MUST_CONTAIN_4_CATEGORIES':
                // form.$error.must_contain_categories = true;
                this.changePasswordReactiveForm.setErrors({must_contain_categories: true});
                break;
              case 'ERROR_CANNOT_CONTAIN_REPEATED_CHARS':
                // form.$error.cannot_contain_repeted_chars = true;
                this.changePasswordReactiveForm.setErrors({cannot_contain_repeted_chars: true});
                break;
              case 'ERROR_CANNOT_CONTAIN_SEQUENTIAL_CHARS':
                // form.$error.cannot_contain_sequential_chars = true;
                this.changePasswordReactiveForm.setErrors({cannot_contain_sequential_chars: true});
                break;
              case 'ERC_USER_NEW_PASSWORD_TOO_SHORT':
                // form.$error.server_too_short = true;
                this.changePasswordReactiveForm.setErrors({server_too_short: true});
                break;
              default:
                // form.$error.server = true;
                this.changePasswordReactiveForm.setErrors({server: true});
            }
          } catch (e) {
            this.changePasswordReactiveForm.setErrors({server: true});
          }

          reject(response);
        });
      };

      // if ($scope.password.confirmationToken) {
      //   this.logger.log('Guest tries to change password');
      //   UserSettingsService.getAvayaUserService()
      //     .changePassword(null, $scope.password.confirmationToken,
      //     $scope.password.newPassword, null, $rootScope.resources.resources.authentication.POST.changePassword.href)
      //     .fail(onFail).done(onDone).always(onAlways);
      // } else {
      //   this.logger.log('logged in tries to change password');
      //   UserSettingsService.getAvayaUserService()
      //     .changePassword($scope.password.currentPassword, null, $scope.password.newPassword, PortalResources.getTenantParams.user)
      //     .fail(onFail).done(onDone).always(onAlways);
      // }
      this.logger.log('logged in tries to change password');
      resolve(this.userSettingsService.getAvayaUserService().changePassword(this.changePasswordReactiveForm.value.currentPassword, null,
        this.changePasswordReactiveForm.value.newPassword, this.userSettingsService.portalResources.getTenantParams.user)
        .fail(onFail.bind(this)).done(onDone.bind(this)).always(onAlways.bind(this)));
    });
  }

  private isChangeFormValid(): boolean {
    return this.changePasswordReactiveForm ? this.changePasswordReactiveForm.status === 'VALID' : true;
  }

  private isVirtualRoomFormValid(): boolean {
    return this.virtualRoomForm ? this.virtualRoomForm.form.status === 'VALID' : true;
  }

  private setCurrentVirtualRoom(currentRoom): void {
    setTimeout(() => {
      this.setValidators();
      });


    this.virtualRoomNumber.selected = currentRoom;
    this.logger.log('virtualRoomNumber changed');
    this.currentRoom = currentRoom;

    const meetingType = this.searchById(this.currentRoom.serviceTemplateId, this.userSettings.conferencing.meetingServiceList, 'serviceId');
    this.meetingType = {
      selected: meetingType,
      options: this.userSettings.conferencing.meetingServiceList
    };
    this.virtualRoomInvitationLanguages.selected = this.searchById(this.currentRoom.invitationLanguage,
      this.userSettings.conferencing.availableInvitationLanguages);
    this.virtualRoomVoicePromptLanguage.selected = this.searchById(this.currentRoom.voicePromptLanguage,
      this.userSettings.conferencing.availableVoicePromptLanguages);
    this.virtualRoomDialInLocations.selected = this.searchById(this.currentRoom.preferredDialInLocation,
      this.userSettings.conferencing.availableDialInLocations);

    this.pinData.accessPinEnabled = (!!(this.currentRoom.accessPIN || this.currentRoom.oneTimePINRequired)) ||
      this.userSettingsService.portalResources.meetingPINMinimumLength !== 0;
    this.originalAccessPinEnabled = this.pinData.accessPinEnabled;
    this.pinData.moderatorPin = (this.currentRoom.moderatorPIN ? atob(this.currentRoom.moderatorPIN) : '');
    this.pinService.setModeratorPinVariables(this, this.pinData.moderatorPin);
    this.entryAnnouncement.selected = this.searchById(this.currentRoom.entryAnnouncement, this.announcementList);
    this.exitAnnouncement.selected = this.searchById(this.currentRoom.exitAnnouncement, this.announcementList);
    this.allowPresentPolicy.selected = this.searchById(this.currentRoom.allowPresentPolicy, this.allowPresentPolicyList);

    if (this.currentRoom.oneTimePINRequired) {
      this.pinData.permanentPin = '';
    } else {
      this.pinData.permanentPin = (this.currentRoom.accessPIN ? atob(this.currentRoom.accessPIN) : '');
    }

    this.pinService.setMeetingPinVariables(this, false, this.pinData.permanentPin);
    //
    // this.pinService.isPinCorrect(this.data.moderatorPin, PIN_TYPE.MODERATOR_PIN, this);
    // this.pinService.isPinCorrect(this.data.permanentPin, PIN_TYPE.MEETING_PIN, this);

    this.currentRoom.attendees = this.globalService.filterUnique(this.currentRoom.attendees, 'terminalId');
  }

  private setValidators(): void {
    this.virtualRoomForm.form.get('roomName').setValidators([Validators.required, Validators.pattern(this.roomNamePattern)]);
    this.virtualRoomForm.form.get('maxPlayToneNumber').setValidators([Validators.max(100), Validators.required]);
    this.virtualRoomForm.form.get('maxPlayNameNumber').setValidators([Validators.max(100), Validators.required]);
    if(this.userSettingsService.portalResources.moderatorPINMinimumLength !== 0) {
      this.virtualRoomForm.form.get('moderatorPin').setValidators([Validators.minLength(
        this.userSettingsService.portalResources.moderatorPINMinimumLength),
        this.customValidators.isPinContainsSequentialOrRepeatedSymbols(), Validators.required]);
    } else {
      this.virtualRoomForm.form.get('moderatorPin').setValidators([Validators.minLength(
        this.userSettingsService.portalResources.moderatorPINMinimumLength),
        this.customValidators.isPinContainsSequentialOrRepeatedSymbols()]);
    }
    this.virtualRoomForm.controls.moderatorPin.updateValueAndValidity();
    this.virtualRoomForm.form.get('accessPin').setValidators([Validators.minLength(
      this.userSettingsService.portalResources.meetingPINMinimumLength),
      this.customValidators.isPinContainsSequentialOrRepeatedSymbols()]);
    this.virtualRoomForm.controls.accessPin.updateValueAndValidity();
  }

  private wasVirtualRoomSettingChanged(): boolean {
    return !_.isEqual(this.currentRoom, this.searchById(this.originalSettings.conferencing.defaultVirtualRoom,
      this.originalSettings.conferencing.virtualRoomSettings, 'virtualRoomId'));
  }

  private showHaveNotLogDialog(): void {
    // const dialogConfig = this.dialog
    //   {
    //   template: 'app/components/settings/templates/HaveNotLogsDialog.html',
    //   className: 'ngdialog-theme-log',
    //   showClose: true,
    //   overlay: true,
    //   closeByEscape: true,
    //   closeByNavigation: true,
    //   trapFocus: false
    // };

    this.dialog.open(ShowHaveNotLogDialogComponent);

    // this.ngDialog.open(dialogConfig);
  }

  private confirmDialog(): void {
    this.saveLogsCheckbox = !this.saveLogsCheckbox;
    this.warningDialog.close();
  }

  private isMeetingPinCorrect(): boolean {
    if(this.pinData.accessPinEnabled){
      if(this.currentRoom.oneTimePINRequired){
        return true;
      } else {
        if(this.pinData.permanentPin){
          return this.virtualRoomForm ? this.virtualRoomForm.controls.accessPin?.status === 'VALID' : true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  private isModeratorPinCorrects (): boolean {
    return this.virtualRoomForm ? this.virtualRoomForm.controls.moderatorPin?.status === 'VALID' : true;
    // return !this.isModeratorPinContainsSequentialOrRepeatedSymbols && this.isModeratorPinPatternCorrect;
  }

  // idName is an optional parameter
  // "id" key name is used as default for search by
  private searchById(idValue, myArray, idName?): any {
    if (idName === undefined) {
      idName = 'id';
    }
    if (myArray) {
      for (const el of myArray) {
        if (el[idName] === idValue) {
          return el;
        }
      }
    }
  }

  private deleteCurrentPhoto():void {
    if (!!this.userSettings.userPicture) {
      this.userSettings.userPicture = undefined;
      this.photoWasDeleted = true;
    } else {
      this.logger.warn('Fail on delete user picture');
      this.pictureErrorMessage = this.translate.instant('SETTINGS.USER_TAB.CANT_REMOVE_IMAGE_ERROR_MESSAGE');
    }
  }

  private deletePhoto():void {
    this.userService.deletePicture()
      .then(() => {
        this.user.pictureUrl = undefined;
        this.user.pictureData = undefined;
        this.pictureErrorMessage = undefined;
      }, () => {
        this.logger.warn('Fail on delete user picture');
        this.pictureErrorMessage = this.translate.instant('SETTINGS.USER_TAB.CANT_REMOVE_IMAGE_ERROR_MESSAGE');
      });
  }

  private sendPicture(image):void {
    this.userService.postPicture(image)
      .then(() => {
        return this.userService.getPicture();
      }, (response) => {
        this.logger.warn('Fail on uploading user image');
        this.thatScope.pictureErrorMessage = this.translate.instant('SETTINGS.USER_TAB.UPLOADING_ERROR');
      })
      .then((url) => {
        if (url) {
          this.thatScope.user.pictureUrl = undefined;
          this.thatScope.user.pictureData = undefined;
          this.thatScope.user.pictureUrl = url;
          this.pictureUtils.extendObjectByPictureData(this.globalService.user, this.thatScope);
        }
        this.thatScope.pictureErrorMessage = undefined;
      });
  }

  // tslint:disable-next-line:variable-name
  private sortMeetingTypeList(obj_1, obj_2): any {

    if (obj_1.prefix !== 'N/A' && obj_2.prefix !== 'N/A') {
      // tslint:disable-next-line:radix
      return parseInt(obj_1.prefix) - parseInt(obj_2.prefix);
    } else {
      return 1;
    }
  }

  private sortByKey(array, key): boolean {
    // tslint:disable-next-line:variable-name
    return array.sort((el_1, el_2) => {
      const x = el_1[key];
      const y = el_2[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  private wasMeetingPinChanged(): boolean {
    const originMeetingPins = [];
    const currentMeetingPins = [];
    const finnalyArray = [];

    this.originalSettings.conferencing.virtualRoomSettings.forEach( (elem) => {
      if(elem.virtualRoomId !== null){
        originMeetingPins.push(atob(elem.accessPIN));
      }
    });

    this.userSettings.conferencing.virtualRoomSettings.forEach( (elem) => {
      if(elem.virtualRoomId !== null){
        currentMeetingPins.push(atob(elem.accessPIN));
      }
    });

    if(originMeetingPins.length === 0 || currentMeetingPins.length === 0){
      return false;
    }

    for(let i = 0; i < originMeetingPins.length; i++){
      if(originMeetingPins[i] !== currentMeetingPins[i]){
        finnalyArray.push(currentMeetingPins[i]);
      }
    }

    return finnalyArray.length !== 0 || this.originalAccessPinEnabled !== this.pinData.accessPinEnabled;
  }

  private showPinWarning(): Promise<any> {
    return new Promise<any>(resolve => {
      const warningMessage = this.translate.instant('SETTINGS.MEETING_PIN_DIALOG_MESSAGE_CAN_RESERVE');
      this.warningDialog = this.dialog.open(ShowPinWarningComponent, {
        data: {
          warningMessage
        }
      });
      this.warningDialog.afterClosed().subscribe(() => {
        resolve(true);
      });
    });
  }

  private prepareAndUploadSettings(): Promise<any> {
    return new Promise<any>(resolve => {
      const delegatedUsers = [];

      for(const delegUsers of this.userSettings.conferencing.delegatedUsers){
        delegatedUsers.push(this.prepareUserDelegatedObject(delegUsers));
      }

      const userDetailsUpdate = {
        locationId: this.locations.selected.locationId,
        delegatedUsers,
        defaultVirtualRoom: (this.defaultVirtualRoom.selected ? this.defaultVirtualRoom.selected.virtualRoomId : null),
        preferences: [],
        // @ts-ignore
        virtualRoomSettings: _.cloneDeep(this.userSettings.conferencing.virtualRoomSettings),
        voicePromptLanguage: this.userSettings.voicePromptLanguage,
        participantId: undefined
      };

      for(let i = 0; i < userDetailsUpdate.virtualRoomSettings.length; i++){
        if(userDetailsUpdate.virtualRoomSettings[i].name === 'None'){
          userDetailsUpdate.virtualRoomSettings.splice(i, 1);
        }
      }

      if(!this.isMultiTenant){
        userDetailsUpdate.participantId = this.userSettings.conferencing.participantId;
      }

      const isDefaultVRChanged = userDetailsUpdate.defaultVirtualRoom !== this.originalSettings.conferencing.defaultVirtualRoom;

      // @ts-ignore
      resolve(this.userSettingsService.uploadUserSettings(new AvayaUserClient.UserService.UserDetailsUpdate(userDetailsUpdate)).then(
        (response) => {
          this.logger.log('User settings uploaded successfully');
          // @ts-ignore
          this.originalSettings = _.cloneDeep(this.userSettings);
          this.userSettingsService.updateUserSettings(this.originalSettings);
          if (isDefaultVRChanged) {
            this.eventService.broadcast(EVENT.CUSTOM.DEFAULT_VIRTUAL_ROOM_UPDATED);
          }
          return response;
        },
        (response) => {
          return new Promise((resolve1, reject) => {
            this.logger.warn('User settings update request failed');
            const error = {
              message: this.translate.instant('SETTINGS.ERROR.SETTINGS_UPDATE_FAILED')
            };
            if (response && response.responseJSON && response.responseJSON.errorMsg && response.responseJSON.displayMsg &&
              response.responseJSON.errorMsg === 'iView update error') {
              if (response.responseJSON.displayMsg === 'FAILURE-WaitingRoomMustBeEnabled') {
                error.message = this.translate.instant('SETTINGS.ERROR.WAITING_ROOM_MUST_BE_ENABLED');
              } else if (response.responseJSON.displayMsg === 'FAILURE-ModeratorPINRequired') {
                error.message = this.translate.instant('SETTINGS.ERROR.MODERATOR_PIN_REQUIRED');
              } else if (response.responseJSON.displayMsg.indexOf('ERROR - Service Template') !== -1) {
                error.message = this.translate.instant('SETTINGS.ERROR.WRONG_MEETING_TYPE');
              }
            }
            // TODO make this method
            // this.MessageUtilsService.showError(error.caption, error.message);
            reject(response);
          });
        }
      ));
    });
  }

  private prepareUserDelegatedObject(user: {$$hashKey?: string
    emailAddress?: string
    firstName: string
    lastName: string
    loginId?: string
    phone?: string
    pictureUrl?: string | undefined
    userId: string}): {userId: string} {
    return {
      userId: user.userId,
    };
  }

  private setDefaultRoom(): void {
    for (const room of this.userSettings.conferencing.virtualRoomSettings){
      if(room.virtualRoomId === this.defaultVirtualRoom.selected.virtualRoomId){
        room.defaultRoom = true;
        break;
      }
    }

    this.userSettingsService.updateUserSettings(this.userSettings);
  }
}


@Component({
  selector: 'app-show-pin-warning',
  templateUrl: '../templates/WarningMeetingPinWasChanged.html',
  styleUrls: ['../user-settings/settings.component.less']
})
export class ShowPinWarningComponent {
  constructor(public dialogRef: MatDialogRef<ShowPinWarningComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }
}
