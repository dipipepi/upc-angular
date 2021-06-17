import { Component, OnInit } from '@angular/core';
import { Logger } from '../../../../Logger';
import {TranslateService} from '@ngx-translate/core';
import {DATE_FORMAT} from '../../../constants';
import {element} from 'protractor';

@Component({
  selector: 'app-guest-settings',
  templateUrl: './guest-settings.component.html',
  styleUrls: ['./guest-settings.component.less']
})
export class GuestSettingsComponent implements OnInit {
  inputTimeout: number;
  TAB = {
    CLIENT: 'client',
    PREFERENCES: 'preferences'
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


  private logger = new Logger('SettingsGuestController');
  private originDateFormat = JSON.parse(window.localStorage.timeFormat);
  private currentDateSetting = Object.assign({}, this.originDateFormat);

  useDefaultTimeFormat = this.originDateFormat.useDefault;
  use24HourFormat = this.originDateFormat.use24HourFormat;
  currentDataFormat = this.originDateFormat.dateFormat;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.dateFormatSettings.selected = this.searchById(this.currentDateSetting.dateFormat, this.dateFormatSettings.options);
  }

  // tslint:disable-next-line:typedef
  private searchById(idValue, myArray, idName?) {
    if (idName === undefined) {
      idName = 'id';
    }
    if (myArray) {
      for(let element of myArray){
        if (element[idName] === idValue) {
          return element;
        }
      }
    }
  }

}
