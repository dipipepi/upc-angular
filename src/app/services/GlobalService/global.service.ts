import {Injectable, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ACClientService} from '../ACClientService/acclient.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  maxVrName = 25;
  maxVrNameWithSpace = 22;
  maxVrNumber = 23;
  sessionId: string;

  constructor(private titleService: Title,
              private acClientService: ACClientService) { }

  isThereClientToDownload(): boolean {
    return !!this.acClientService.clientData.latestVersion;
  }

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

}
