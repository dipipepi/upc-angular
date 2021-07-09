import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BROWSERS, DATE_FORMAT} from '../../../constants';
import {UserSettingsService} from '../../../services/UserSettingsService/user-settings.service';
import {ACClientService} from '../../../services/ACClientService/acclient.service';
import {MeetingsLogsService} from '../../../services/MeetingsLogsService/meetings-logs.service';
import {StylesService} from '../../../services/StylesService/styles.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {VersionService} from '../../../services/BrowserInfoService/browser-info.service';
import {GlobalService} from '../../../services/GlobalService/global.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationComponent} from '../../authorization/authorization.component';

@Component({
  selector: 'app-guest-settings',
  templateUrl: '../templates/guest-settings.component.html',
  styleUrls: ['../user-settings/settings.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GuestSettingsComponent implements OnInit, OnChanges {
  inputTimeout: number;
  TAB = {
    CLIENT: 'client',
    PREFERENCES: 'preferences',
    SUPPORT: 'support'
  };

  dateFormatSettings;
  private originDateFormat = JSON.parse(window.localStorage.timeFormat);
  private currentDateSetting = _.cloneDeep(this.originDateFormat);

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
  private warningDialog;

  constructor(public translate: TranslateService,
              public acClientService: ACClientService,
              private userSettingsService: UserSettingsService,
              private meetingsLogsService: MeetingsLogsService,
              private stylesService: StylesService,
              public dialogRef: MatDialogRef<GuestSettingsComponent>,
              private customDeviceDetector: CustomDeviceDetectorService,
              private versionService: VersionService,
              public globalService: GlobalService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
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
      ], selected: undefined

    };
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

  ngOnChanges(changes: SimpleChanges): void {
  }

  setCurrentTab(tab): void {
    this.currentTab = this.currentTab === tab && this.stylesService.isMobileView() ? undefined : tab;
  }

  applySettings():void {
    this.originDateFormat = _.cloneDeep(this.currentDateSetting);
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

  // changeSaveLogs(): void {
  //   this.saveLogsCheckbox = !this.saveLogsCheckbox;
  // }

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

  private confirmDialog(): void {
    this.saveLogsCheckbox = !this.saveLogsCheckbox;
    this.warningDialog.close();
  }

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

  setDateFormat(dateFormat: string): void{
    this.dateFormatSettings.selected = dateFormat;
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

@Component({
  selector: 'app-warning-save-logs',
  templateUrl: '../templates/WarningSaveLogsDialog.html',
  styleUrls: ['../user-settings/settings.component.less']
})
export class WarningSaveLogsDialogComponent {
  confirm = this.data.confirm;
  cancel = this.data.cancel;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<GuestSettingsComponent>) {
  }
}

@Component({
  selector: 'app-show-not-logs',
  templateUrl: '../templates/HaveNotLogsDialog.html',
  styleUrls: ['../user-settings/settings.component.less']
})
export class ShowHaveNotLogDialogComponent {
  constructor(public dialogRef: MatDialogRef<GuestSettingsComponent>) {
  }
}
