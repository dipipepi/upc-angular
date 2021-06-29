import {Injectable, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ACClientService} from '../ACClientService/acclient.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

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

  // hasFormErrors(errors): boolean{
  //   let res = false;
  //   for(const err of errors) {
  //
  //   }
  // }

}
