import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserSettingsService} from '../../../services/UserSettingsService/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {PictureService} from '../../../services/PictureUtils/picture.service';
import { Logger } from '../../../../Logger';
import {AuthorizationService} from '../../../services/AuthorizationService/authorization.service';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {StylesService} from '../../../services/StylesService/styles.service';
import {MeetingsLogsService} from '../../../services/MeetingsLogsService/meetings-logs.service';
import {BROWSERS, DATE_FORMAT, OS, PIN_TYPE} from '../../../constants';
import {PinService} from '../../../shared/service/PinService/pin.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ACClientService} from '../../../services/ACClientService/acclient.service';
import {VersionService} from '../../../services/BrowserInfoService/browser-info.service';
import {ContactsService} from '../../../services/ContactsService/contacts.service';
import {ShowHaveNotLogDialogComponent, WarningSaveLogsDialogComponent} from '../guest-settings/guest-settings.component';
import {GlobalService} from '../../../services/GlobalService/global.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordsMatch} from '../../../shared/CustomValidators';

@Component({
  selector: 'app-user-settings',
  templateUrl: '../templates/user-settings.component.html',
  styleUrls: ['./settings.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserSettingsComponent implements OnInit, OnDestroy {
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
  data: { permanentPin: string; moderatorPin: string; accessPinEnabled: boolean };
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
  virtualRoomReactiveForm: FormGroup;

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
              private versionService: VersionService,
              private contactsService: ContactsService,
              private dialog: MatDialog,
              public globalService: GlobalService,
              public formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.logger = new Logger('SettingsController');
    this.thatScope = this;
    this.originDateFormat = JSON.parse(window.localStorage.timeFormat);

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

    this.data = {
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

    // TODO check analog of this watch
    // $scope.$watch('locations.selected',() => {
    //   this.logger.log('location changed');
    //   $scope.userSettings.conferencing.locationId = $scope.locations.selected.locationId;
    // });

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

      this.virtualRoomReactiveForm = new FormGroup({
        moderatorPin: new FormControl(this.data.moderatorPin),
        accessPin: new FormControl(this.data.permanentPin)
      });

      this.setCurrentVirtualRoom(this.currentRoom);
    }

    if(this.userSettings.conferencing.localUser && !this.isOAuthUser){
      // this.changePasswordReactiveForm = new FormGroup({
      //   currentPassword: new FormControl(''),
      //   newPassword: new FormControl('', Validators.required),
      //   confirmPassword: new FormControl('')
      // }, [passwordsMatch]);

      this.changePasswordReactiveForm = this.formBuilder.group({
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      }, {validators: passwordsMatch()});
    }
    // TODO check than analog working correct
    //   $scope.$watch('meetingType.selected',(meetingType) => {
    //     this.logger.log('meetingType changed');
    //     if (meetingType) {
    //       $scope.currentRoom.serviceTemplateId = meetingType.serviceId;
    //       $scope.currentRoom.servicePrefix = meetingType.prefix;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('currentRoom.moderatorPIN', (newVal, oldVal) => {
    //     if(newVal !== '' && oldVal === ''){
    //       $scope.currentRoom.waitingRoom = $scope.currentRoom.previousWaitingRoomValue;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('virtualRoomVoicePromptLanguage.selected',(language) => {
    //     if (language) {
    //       this.logger.log('virtualRoomVoicePromptLanguage changed to %s', language.displayName);
    //       $scope.currentRoom.voicePromptLanguage = language.id;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('entryAnnouncement.selected',(announcement) => {
    //     if (announcement) {
    //       this.logger.log('entryAnnouncement changed to %s', announcement.name);
    //       $scope.currentRoom.entryAnnouncement = announcement.id;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('exitAnnouncement.selected',(announcement) => {
    //     if (announcement) {
    //       this.logger.log('exitAnnouncement changed to %s', announcement.name);
    //       $scope.currentRoom.exitAnnouncement = announcement.id;
    //     }
    //   });
    //

    // TODO check than analog working correct
    //   $scope.$watch('currentRoom.maxPlayToneNumber',() => {
    //     if ($scope.currentRoom.maxPlayToneNumber) {
    //       $scope.currentRoom.maxPlayToneNumber = +$scope.currentRoom.maxPlayToneNumber + 0;
    //       if (+$scope.currentRoom.maxPlayToneNumber > 100) {
    //         $scope.errorMaxPlayToneNumber = true;
    //         $scope.roomFormScope.roomForm.maxPlayToneNumber.$setValidity("required", false);
    //         return;
    //       }
    //     }
    //     $scope.errorMaxPlayToneNumber = false;
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('currentRoom.maxPlayNameNumber', () => {
    //     if ($scope.currentRoom.maxPlayNameNumber) {
    //       $scope.currentRoom.maxPlayNameNumber = +$scope.currentRoom.maxPlayNameNumber + 0;
    //       if (+$scope.currentRoom.maxPlayNameNumber > 100) {
    //         $scope.errorMaxPlayNameNumber = true;
    //         $scope.roomFormScope.roomForm.maxPlayNameNumber.$setValidity("required", false);
    //         return;
    //       }
    //     }
    //     $scope.errorMaxPlayNameNumber = false;
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('virtualRoomDialInLocations.selected', (language) => {
    //     if (language) {
    //       this.logger.log('virtualRoomDialInLocations changed to %s', language.displayName);
    //       $scope.currentRoom.preferredDialInLocation = language.id;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('allowPresentPolicy.selected', (allowPresentPolicyOptions) => {
    //     if (allowPresentPolicyOptions) {
    //       this.logger.log('allowPresentPolicy changed to %s', allowPresentPolicyOptions.name);
    //       $scope.currentRoom.allowPresentPolicy = allowPresentPolicyOptions.id;
    //     }
    //   });

    // TODO check than analog working correct
    //   $scope.$watch('virtualRoomInvitationLanguages.selected', (language) => {
    //     if (language) {
    //       this.logger.log('virtualRoomInvitationLanguages changed to %s', language.displayName);
    //       $scope.currentRoom.invitationLanguage = language.id;
    //     }
    //   });
    // }
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

    // TODO check than analog working correct
    // $scope.$watch('dateFormatSettings.selected', () => {
    //   $scope.currentDateSetting.dateFormat = $scope.dateFormatSettings.selected.id;
    // });


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

    // TODO get virtualRoomNeedUpdate from data when dialog opening
    // if($scope.$parent.virtualRoomNeedUpdate){
    //   $scope.currentTab = $scope.TAB.ROOM;
    //   const roomToUpdate = this.searchById($scope.$parent.virtualRoomNeedUpdate.virtualRoomId,
    //   $scope.userSettings.conferencing.virtualRoomSettings, "virtualRoomId");
    //   $scope.currentRoom = roomToUpdate;
    //   $scope.virtualRoomNumber.selected = roomToUpdate;
    // }

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
    this.pinService.isPinCorrect(this.data.moderatorPin, PIN_TYPE.MODERATOR_PIN, this);
    if (this.isEmpty(this.data.moderatorPin)) {
      this.currentRoom.moderatorPIN = '';
      this.currentRoom.waitingRoom = false;

    } else {
      this.currentRoom.moderatorPIN = btoa(this.data.moderatorPin);
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

  accessPinCheckboxChanged(): void {
    if(this.meetingPinMinLength !== 0){
      this.data.accessPinEnabled = true;
    } else{
      if (!this.data.accessPinEnabled) {
        this.data.permanentPin = '';
        this.currentRoom.accessPIN = '';
        this.currentRoom.oneTimePINRequired = false;
      }
    }
  }

  pinRadioStateChanged(): void {
    if(this.currentRoom.oneTimePINRequired){
      this.isMeetingPinContainsSequentialOrRepeatedSymbols = false;
    }
    this.data.permanentPin = '';
    this.currentRoom.accessPIN = '';
  }

  permanentPinChanged(): void {
    this.pinService.isPinCorrect(this.data.permanentPin, PIN_TYPE.MEETING_PIN, this);
    if (this.isEmpty(this.data.permanentPin)) {
      this.currentRoom.accessPIN = '';
      this.isMeetingPinContainsSequentialOrRepeatedSymbols = false;
    } else {
      this.pinService.isPinCorrect(this.data.permanentPin, PIN_TYPE.MEETING_PIN, this);
      this.currentRoom.accessPIN = btoa(this.data.permanentPin);
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
    // TODO get announcement
    if (announcement) {
      this.entryAnnouncement.selected = announcement;
      this.logger.log('entryAnnouncement changed to %s', announcement.name);
      this.currentRoom.entryAnnouncement = announcement.id;
    }
  }

  exitAnnouncementSelected(announcement): void {
    // TODO get announcement
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
        this.roomFormScope.roomForm.maxPlayToneNumber.$setValidity('required', false);
        return;
      }
    }
    this.errorMaxPlayToneNumber = false;
  }

  currentRoomMaxPlayNameNumber(): void {
    if (this.currentRoom.maxPlayNameNumber) {
      this.currentRoom.maxPlayNameNumber = +this.currentRoom.maxPlayNameNumber + 0;
      if (+this.currentRoom.maxPlayNameNumber > 100) {
        this.errorMaxPlayNameNumber = true;
        this.roomFormScope.roomForm.maxPlayNameNumber.$setValidity('required', false);
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
    // TODO get language
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
    // TODO create this method
    return new Promise<any>(resolve => {resolve(true);});
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
      return this.data.moderatorPin === undefined || !this.areAllPinsCorrect();
    }
    return this.data.moderatorPin === undefined || (this.wasVirtualRoomSettingChanged() && !this.areAllPinsCorrect());
  }

  isApplyDisabled(): boolean {
    return true;
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

  changePassword(data?): void {
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
      this.logger.log('Password has been changed. Clean up form, %o', JSON.stringify(response));
      // $scope.password.currentPassword = '';
      // $scope.password.newPassword = '';
      // $scope.password.newPassword2 = '';
      this.changePasswordForm.controls.currentPassword.setValue('');
      this.changePasswordForm.controls.newPassword.setValue('');
      this.changePasswordForm.controls.confirmPassword.setValue('');
      // form.$setPristine();
      // form.$setUntouched();
      // if (confirmationToken) {
      //   $state.go(STATE.JOIN);
      // }
      if (data.promise) {
        data.promise.resolve();
      }
    };

    const onFail = (response) => {
      this.logger.warn('Password has not been changed, %o', JSON.stringify(response));
      this.changePasswordReactiveForm.setErrors({errorFromServer: true});
      // form.$invalid = true;

      // switch (response.responseJSON.error[0].errorCode) {
      //   case 'ERC_AUTH_PASSWORD_CHANGE_OLD_BAD':
      //     form.$error.server_bad_old_password = true;
      //     if (form.currentPassword) {
      //       form.currentPassword.$error.bad = true;
      //     }
      //     break;
      //   case 'ERC_AUTH_PASSWORD_CHANGE_OLD_UNABLE_USE':
      //     form.$error.server_unable_use_old_password = true;
      //     break;
      //   case 'ERROR_CANNOT_BECHANGE_FREQUENTLY':
      //     form.$error.server_change_frequency = true;
      //     break;
      //   case 'ERC_AUTH_PASSWORD_CHANGE_REPEATED_CHARS':
      //     form.$error.server_change_repeated_chars = true;
      //     break;
      //   case 'ERC_AUTH_PASSWORD_CHANGE_COMPLEXITY':
      //     form.$error.server_change_complexity = true;
      //     break;
      //   case 'ERC_AUTH_PASSWORD_CHANGE_NEW_SHORT':
      //     form.$error.server_too_short = true;
      //     break;
      //   case 'ERC_AUTH_TOKEN_INVALID':
      //     // TODO: handle unauthorized access, broadcast appropriate event
      //     break;
      //   case 'ERC_AUTH_PASSWORD_CHANGE_TOKEN_INVALID':
      //     form.$error.server_invalid_token = true;
      //     break;
      //   case 'ERROR_CANNOT_MACTH_PASSWORD_HISTORY':
      //     form.$error.number_previous_passwords_cannot_reused = true;
      //     break;
      //   case 'ERROR_CANNOT_CONTAIN_LOGIN_ID':
      //     form.$error.cannot_contain_loginId = true;
      //     break;
      //   case 'ERROR_MUST_CONTAIN_4_CATEGORIES':
      //     form.$error.must_contain_categories = true;
      //     break;
      //   case 'ERROR_CANNOT_CONTAIN_REPEATED_CHARS':
      //     form.$error.cannot_contain_repeted_chars = true;
      //     break;
      //   case 'ERROR_CANNOT_CONTAIN_SEQUENTIAL_CHARS':
      //     form.$error.cannot_contain_sequential_chars = true;
      //     break;
      //   case 'ERC_USER_NEW_PASSWORD_TOO_SHORT':
      //     form.$error.server_too_short = true;
      //     break;
      //   default:
      //     form.$error.server = true;
      // }

      if (data.promise) {
        data.promise.reject();
      }
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

    this.userSettingsService.getAvayaUserService().changePassword(this.changePasswordReactiveForm.value.currentPassword, null,
      this.changePasswordReactiveForm.value.newPassword, this.userSettingsService.portalResources.getTenantParams.user)
      .fail(onFail).done(onDone).always(onAlways);
  }

  private setCurrentVirtualRoom(currentRoom): void {
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

    this.data.accessPinEnabled = (!!(this.currentRoom.accessPIN || this.currentRoom.oneTimePINRequired)) ||
      this.userSettingsService.portalResources.meetingPINMinimumLength !== 0;
    this.originalAccessPinEnabled = this.data.accessPinEnabled;
    this.data.moderatorPin = (this.currentRoom.moderatorPIN ? atob(this.currentRoom.moderatorPIN) : '');
    this.pinService.setModeratorPinVariables(this, this.data.moderatorPin);
    this.entryAnnouncement.selected = this.searchById(this.currentRoom.entryAnnouncement, this.announcementList);
    this.exitAnnouncement.selected = this.searchById(this.currentRoom.exitAnnouncement, this.announcementList);
    this.allowPresentPolicy.selected = this.searchById(this.currentRoom.allowPresentPolicy, this.allowPresentPolicyList);

    if (this.currentRoom.oneTimePINRequired) {
      this.data.permanentPin = '';
    } else {
      this.data.permanentPin = (this.currentRoom.accessPIN ? atob(this.currentRoom.accessPIN) : '');
    }

    this.pinService.setMeetingPinVariables(this, false, this.data.permanentPin);
    //
    // this.pinService.isPinCorrect(this.data.moderatorPin, PIN_TYPE.MODERATOR_PIN, this);
    // this.pinService.isPinCorrect(this.data.permanentPin, PIN_TYPE.MEETING_PIN, this);

    this.currentRoom.attendees = this.globalService.filterUnique(this.currentRoom.attendees, 'terminalId');
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
    if(this.data.accessPinEnabled){
      if(this.currentRoom.oneTimePINRequired){
        return true;
      } else {
        if(this.data.permanentPin){
          return !this.isMeetingPinContainsSequentialOrRepeatedSymbols && this.isMeetingPinPatternCorrect;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  private isModeratorPinCorrects (): boolean {
    return !this.isModeratorPinContainsSequentialOrRepeatedSymbols && this.isModeratorPinPatternCorrect;
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
          this.pictureUtils.extendObjectByPictureData(this.authorizationService.user, this.thatScope);
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
}
