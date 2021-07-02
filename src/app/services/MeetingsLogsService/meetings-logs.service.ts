import { Injectable } from '@angular/core';
import {BROWSERS, INDEXED_DB, SWC_LOGS} from '../../constants';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class MeetingsLogsService {
  private logger = new Logger('MeetingsLogsService');

  constructor(private userSettingsService: UserSettingsService,
              private customDeviceDetector: CustomDeviceDetectorService) { }

  public compatibility(): boolean {
    if (!window.indexedDB) {
      this.logger.warn('IndexedDB isn\'t supported');
      return false;
    }

    return true;
  }

  openDb(): Promise<any> {
    return new Promise((resolve, reject) => {
      let db;

      this.logger.log('openDb %s', INDEXED_DB.DB_NAME);
      const request = window.indexedDB.open(INDEXED_DB.DB_NAME, INDEXED_DB.DB_VERSION);
      const globalThis = this;


      request.onsuccess = function (): void {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        db = this.result;
        resolve(db);
        globalThis.logger.log('openDb DONE', db);
      };

      request.onerror = (event:any) => {
        reject(db);
        this.logger.warn('Database error: ', event.target.errorCode);
      };

      request.onupgradeneeded = (event: any) => {
        db = event.target.result;
        if (!db.objectStoreNames.length) {
          this.deleteLogs();
          event.target.errorCode = 'DB does not exist';
          request.onerror(event);
        } else {
          resolve(db);
        }
      };

    });
  }

  closeDb(db): void {
    db.close();
    this.logger.log('close DB done');
  }

  sendLogsEml(): void {
    const name = this.createName();
    this.openDb()
      .then((db) => {
        return this.getLogs(db);
      })
      .then((logs) => {
        return this.createZip(logs, name);
      })
      .then((logs) => {
        return this.getBase64(logs);
      })
      .then((logs) => {
        return this.createEmlFile(logs, name);
      })
      .then((logs) => {
        this.logger.log('Downloading eml file to send log');
        this.download(logs);
      })
      .catch((error) => {
        this.logger.error('Error', error);
      });
  }

  sendLogsEmail(): void {
    const link = window.location.origin + '/portal/tenants/' + this.userSettingsService.portalResources.tenantAlias;

    const object = SWC_LOGS.SUBJECT + link;
    const body = SWC_LOGS.BODY + this.userSettingsService.portalResources.portalVersion;
    const email = this.userSettingsService.portalResources.supportEmail;

    window.location.href = 'mailto:' + email + '?subject=' + object + '&body=' + encodeURI(body);
  }

  downloadLogs(): void {
    const name = this.createName();
    this.openDb()
      .then((db) => {
        return this.getLogs(db);
      })
      .then((logs) => {
        return this.createZip(logs, name);
      })
      .then((logs) => {
        this.logger.log('Downloading logs');
        this.download(logs);
      })
      .catch((error) => {
        this.logger.error('Error', error);
      });
  }

  deleteLogs(): void {
    const request = window.indexedDB.deleteDatabase(INDEXED_DB.DB_NAME);
    request.onsuccess = () => {
      this.logger.log('Deleted database successfully');
    };
    request.onerror = () => {
      this.logger.log('Couldn\'t delete database');
    };
    request.onblocked = (e) => {
      this.logger.log('Couldn\'t delete database due to the operation being blocked', e);
    };
  }

  download(data): void {
    if (this.customDeviceDetector.browser === BROWSERS.MS_EDGE || this.customDeviceDetector.browser === BROWSERS.IE) {
      window.navigator.msSaveOrOpenBlob(data, data.name);
    } else {
      // tslint:disable-next-line:one-variable-per-declaration
      const a = document.createElement('a'),
        url = URL.createObjectURL(data);
      a.href = url;
      a.download = data.name;
      document.body.appendChild(a);
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  private getLogs(db): Promise<any> {
    return new Promise((resolve) => {

      const textArr = [];
      // tslint:disable-next-line:variable-name
      let string;

      const trans = db.transaction([INDEXED_DB.DB_STORE_NAME], 'readwrite');
      const store = trans.objectStore(INDEXED_DB.DB_STORE_NAME);

      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const storedObjectText = cursor.value.text;
          textArr.push(storedObjectText);

          cursor.continue();
        } else {
          string = textArr.join(' ');
          resolve(string);
        }
        this.closeDb(db);
      };
    });
  }

  private createEmlFile(data, filename): Promise<any> {
    return new Promise((resolve, reject) => {

      const link = window.location.origin + '/portal/tenants/' + this.userSettingsService.portalResources.tenantAlias;

      const object = SWC_LOGS.SUBJECT + link;
      const body = SWC_LOGS.BODY + this.userSettingsService.portalResources.portalVersion;
      const email = this.userSettingsService.portalResources.supportEmail;

      const originalMail = {
        to: email,
        cc: '',
        subject: object,
        fromName: '',
        from: ' ',
        body,
        cids: [],
        attaches : [{
          base64: data.data,
          cid: undefined,
          name: data.name,
          type: 'base64',
          visible: false
        }]
      };

      // @ts-ignore
      let mimeTxt = Mime.toMimeTxt(originalMail);
      mimeTxt = 'X-Unsent: 1\n' + mimeTxt;

      const file = new Blob([mimeTxt], { type: 'text/plain' });
      // @ts-ignore
      file.name = filename + '.eml';
      resolve(file);
    });
  }

  private getBase64(file): Promise<any> {
    return new Promise<any>(resolve => {

      const reader = new FileReader();
      let encoded:string;
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
        }
        if ((encoded.length % 4) > 0) {
          // @ts-ignore
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve({
          data: encoded,
          name: file.name
        });
      };
      reader.onerror = (error) => {
        this.logger.log('Error: ', error);
      };
    });
  }

  // tslint:disable-next-line:typedef
  private createZip(data, filename) {
    // @ts-ignore
    const zipFile = new JSZip();

    zipFile.file(filename + '.log', data);

    return zipFile.generateAsync({type:'blob'})
      .then((content) => {
        const file = new Blob([content], { type: 'text/plain' });
        // @ts-ignore
        file.name = filename + '.zip';
        return file;
      });
  }

  private createName(): string {
    return 'swc_' + this.getlogDate();
  }

  private getlogDate():string {
    const date = new Date();
    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ':' +
      ('0' + date.getSeconds()).slice(-2) + '.' +
      ('00' + date.getMilliseconds()).slice(-3);
  }
}
