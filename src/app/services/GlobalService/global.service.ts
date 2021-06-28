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
}
