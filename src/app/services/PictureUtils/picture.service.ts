import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Logger } from '../../../Logger';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  logger = new Logger('PictureUtils');
  defaultMaxSizeInBytes = 3145728;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
    extendObjectByPictureData(user, thatScope?: any) {
    // tslint:disable-next-line:variable-name
    const _arrayBufferToBase64 = ( buffer ) => {
      let binary = '';
      const bytes = new Uint8Array( buffer );
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
    };
    // expecting to have non-empty pictureUrl field
    if (user && user.pictureUrl) {
      this.getPictureData(user.pictureUrl)
        .subscribe((response) => {
          // @ts-ignore
          user.pictureData = 'data:' + response.headers()['content-type'] + ';base64,' + _arrayBufferToBase64(response);
        });
    }
    return user;
  }

  private getPictureData(url): Observable<Object> {
    const headers = {
      Authorization: `UPToken ${window.localStorage.getItem('UPS_TOKEN')}`
    };

    return this.http.get(url, {
      headers: new HttpHeaders(headers)
    });
  }
}
