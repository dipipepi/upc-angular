import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BROWSERS, DATE_FORMAT} from '../../../constants';
import {UserSettingsService} from '../../../services/UserSettingsService/user-settings.service';
import {ACClientService} from '../../../services/ACClientService/acclient.service';
import {MeetingsLogsService} from '../../../services/MeetingsLogsService/meetings-logs.service';
import {StylesService} from '../../../services/StylesService/styles.service';
import {MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {VersionService} from '../../../services/BrowserInfoService/browser-info.service';
import {GlobalService} from '../../../services/GlobalService/global.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-guest-settings',
  templateUrl: './guest-settings.component.html',
  styleUrls: ['./../user-settings/settings.component.less']
})
export class GuestSettingsComponent implements OnInit {
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  inputTimeout: number;
  TAB = {
    CLIENT: 'client',
    PREFERENCES: 'preferences',
    SUPPORT: 'support'
  };

  dateFormatSettings = {
    options: [
      {
        id: DATE_FORMAT.MM_DD_YY,
        format: this.translate.instant('SETTINGS.PREFERENCES_TAB.DATE_FORMATS.MM_DD_YY')
      },
      {
        id: DATE_FORMAT.DD_MM_YY,
        format: this.translate.instant('SETTINGS.PREFERENCES_TAB.DATE_FORMATS.DD_MM_YY')
      }
    ], selected: undefined

  };
  private originDateFormat = JSON.parse(window.localStorage.timeFormat);


  private currentDateSetting = _.clone(this.originDateFormat);

  useDefaultTimeFormat = this.originDateFormat.useDefault;
  use24HourFormat = this.originDateFormat.use24HourFormat;
  currentDataFormat = this.originDateFormat.dateFormat;

  clientInfo = this.acClientService.clientData;

  ACData = this.acClientService.clientData;

  videoCalling: boolean = this.userSettingsService.getCurrentVideoCheck();

  indexedDbIsCompatibility = this.meetingsLogsService.compatibility();
  supportEmail = this.userSettingsService.portalResources && this.userSettingsService.portalResources.supportEmail;
  public saveLogsCheckbox: any;
  currentTab = this.TAB.CLIENT;
  haveIndexedDB: boolean;
  isChrome = this.customDeviceDetector.browser === BROWSERS.CHROME;
  // @ts-ignore
  showSharingPlaginLink = !AvayaClientServices.Providers.ContentSharing.FeatureSupported.isSharingAnyTypeAvailable();


  constructor(public translate: TranslateService,
              private acClientService: ACClientService,
              private userSettingsService: UserSettingsService,
              private meetingsLogsService: MeetingsLogsService,
              private stylesService: StylesService,
              public dialogRef: MatDialogRef<GuestSettingsComponent>,
              private customDeviceDetector: CustomDeviceDetectorService,
              private versionService: VersionService,
              public globalService: GlobalService) { }

  ngOnInit(): void {
    this.dateFormatSettings.selected = this.searchById(this.currentDateSetting.dateFormat, this.dateFormatSettings.options);
    if (this.indexedDbIsCompatibility) {
      this.saveLogsCheckbox = JSON.parse(window.localStorage.enabledLogs);
    } else {
      this.saveLogsCheckbox = false;
    }

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
  }

  setCurrentTab(tab): void {
    this.currentTab = this.currentTab === tab && this.stylesService.isMobileView() ? undefined : tab;
  }

  applySettings():void {
    this.originDateFormat = _.clone(this.currentDateSetting);
    window.localStorage.timeFormat = JSON.stringify(this.currentDateSetting);
    window.localStorage.videoCallingPreferences = this.videoCalling;
    window.localStorage.enabledLogs = this.saveLogsCheckbox;
    if (!this.saveLogsCheckbox) {
      this.meetingsLogsService.deleteLogs();
      this.haveIndexedDB = false;
    }
  }

  saveSettingsAndClose(): void {
    this.applySettings();
    this.dialogRef.close();
  }

  isApplyDisabled():boolean {
    return (this.videoCalling !== JSON.parse(window.localStorage.videoCallingPreferences)) ||
      this.saveLogsCheckbox !== JSON.parse(window.localStorage.enabledLogs) || !_.isEqual(this.currentDateSetting, this.originDateFormat);
  }

  cancelSettings():void {
    this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  changePreferences() {
    this.videoCalling = !this.videoCalling;
  }

  changeSaveLogs(): void {
    this.saveLogsCheckbox = !this.saveLogsCheckbox;
  }

  downloadAC(): void {
    this.acClientService.downloadClient();
    this.dialogRef.close();
    // MessageUtilsService.showDownloadSettingsDialog({isJoin: false}); //TODO create this method
  }

  removeClientInfo():void {
    this.acClientService.clearClientData();
    this.ACData = this.acClientService.clientData;
    window.localStorage.haveDownloadedClient = false;
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

  needOptionalUpgrade(): boolean {
    if(this.ACData && this.ACData.latestVersion) {
      return this.versionService.isUpdateRequired(this.ACData.version, this.ACData.latestVersion.version);
    } else {
      return false;
    }
  }

  refreshClientInfo(): void {
    this.ACData = this.acClientService.clientData;
  }

  changeTimeFormat():void {
    this.useDefaultTimeFormat = !this.useDefaultTimeFormat;
    this.currentDateSetting.useDefault = this.useDefaultTimeFormat;
  }

  changeHourFormat(): void {
    this.use24HourFormat = !this.use24HourFormat;
    this.currentDateSetting.use24HourFormat = this.use24HourFormat;
  }

  // changeSaveLogs(): void {
  //   const dialogConfig = {
  //     template: 'app/components/settings/templates/WarningSaveLogsDialog.html',
  //     className: 'ngdialog-theme-log',
  //     showClose: true,
  //     overlay: true,
  //     closeByEscape: true,
  //     closeByNavigation: true,
  //     trapFocus: false
  //   };
  //
  //   if(this.saveLogsCheckbox){
  //     ngDialog.openConfirm(dialogConfig).then(() => {
  //       $scope.saveLogsCheckbox = !$scope.saveLogsCheckbox;
  //     });
  //   } else {
  //     $scope.saveLogsCheckbox = !$scope.saveLogsCheckbox;
  //   }
  // };

  downloadLogs():void {
    if(this.haveIndexedDB){
      this.meetingsLogsService.downloadLogs();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  sendLogsEml():void {
    if(this.haveIndexedDB){
      this.meetingsLogsService.sendLogsEml();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  sendLogsEmail():void {
    if(this.haveIndexedDB){
      this.meetingsLogsService.sendLogsEmail();
    } else{
      this.showHaveNotLogDialog();
    }
  }

  private showHaveNotLogDialog(): void {
    const dialogConfig = {
      template: 'app/components/settings/templates/HaveNotLogsDialog.html',
      className: 'ngdialog-theme-log',
      showClose: true,
      overlay: true,
      closeByEscape: true,
      closeByNavigation: true,
      trapFocus: false
    };
    // this.ngDialog.open(dialogConfig);
  }

  // tslint:disable-next-line:typedef
  private searchById(idValue, myArray, idName?) {
    if (idName === undefined) {
      idName = 'id';
    }
    if (myArray) {
      for(const el of myArray){
        if (el[idName] === idValue) {
          return el;
        }
      }
    }
  }

}
