import {Injectable, SimpleChanges} from '@angular/core';
import {User} from '../AuthorizationService/authorization.service';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  maxVrName = 25;
  maxVrNameWithSpace = 22;
  maxVrNumber = 23;
  sessionId: string;
  offerScreenSharingExtension: boolean;
  user: User | any;
  isRolloverShowing: boolean;
  haveMic: boolean;
  isAdminNotificationShowing = window.localStorage.isAdminNotificationShowing || true;
  wasAdminMessageClosed = false;

  constructor() { }

  valueChanged(valueName: string, valueObject: SimpleChanges): boolean  {
    return valueObject[valueName] !== undefined && valueObject[valueName].previousValue !== undefined;
  }

  filterUnique(array: any[], propertyName: string): any[]{
    const res = [];

    array.forEach(item => {
      const count = res.filter(x => x[propertyName] === item[propertyName]).length;

      if(count === 0) {
        res.push(item);
      }
    });

    return res;
  }

  encodeQueryData(data): any {
    const ret = [];
    // tslint:disable-next-line:forin
    for (const d in data) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
  }

  haveConnectedMicrophone(deviceList) {
    if(deviceList){
      this.haveMic = false;

      for (const device of deviceList){
        if (device.kind === 'audioinput') {
          this.haveMic = true;
          break;
        }
      }
      return this.haveMic;
    } else{
      return false;
    }
  }

}
