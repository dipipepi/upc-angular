import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor(private translate: TranslateService) {
    // @ts-ignore
    moment.locale(translate.defaultLang);
  }

  timeSettings(): any {
    return JSON.parse(window.localStorage.timeFormat);
  }

  checkDate(startDate, endDate): boolean {
    // @ts-ignore
    startDate = new moment(startDate);
    // @ts-ignore
    endDate = new moment(endDate);
    // @ts-ignore
    const currentDate = moment();
    return currentDate.isBetween(startDate, endDate);
  }

  getMinuteMoment(): string {
    let hoursMoment;

    if (this.timeSettings().useDefault){
      hoursMoment = 'LT';
    } else {
      if (this.timeSettings().use24HourFormat) {
        hoursMoment = 'HH:mm';
      } else {
        hoursMoment = 'h:mm A';
      }
    }

    return hoursMoment;
  }

  getDateFormat(): { fullDate: string; mediumDate: string; mediumTime: string; shortTime: string; longDate: string; shortDate: string } {
    const format = {
      fullDate: 'fullDate',
      longDate: 'longDate',
      mediumDate: 'mediumDate',
      shortDate: 'shortDate',
      mediumTime: 'mediumTime',
      shortTime: 'shortTime'
    };

    if (!this.timeSettings().useDefault){
      if (this.timeSettings().dateFormat === 'MM/DD/YY') {
        format.fullDate = 'EEEE, MMMM d, y';
        format.longDate = 'MMMM d, y';
        format.mediumDate = 'MMM d, y';
        format.shortDate = 'M/d/yy';
      } else {
        format.fullDate = 'EEEE, d MMMM, y';
        format.longDate = 'd MMMM, y';
        format.mediumDate = 'd MMM, y';
        format.shortDate = 'd/M/yy';
      }

      if (this.timeSettings().use24HourFormat){
        format.mediumTime = 'H:mm:ss';
        format.shortTime = 'H:mm';
      } else {
        format.mediumTime = 'h:mm:ss a';
        format.shortTime = 'h:mm a';
      }
    }
    return format;
  }
}
