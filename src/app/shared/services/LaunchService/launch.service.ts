import { Injectable } from '@angular/core';
import { Logger } from '../../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private logger = new Logger('LaunchService');

  constructor() { }

  launchExternalApp(extAppUrl: string): void {
    const openUrl = () => {
      this.logger.log('open url:%s', extAppUrl);

      const getSysContainer = () => {
        this.logger.log('get sysContainer element');
        let sysContainer = document.getElementById('sysContainer');
        if (!sysContainer) {
          sysContainer = document.createElement('div');
          sysContainer.id = 'sysContainer';
          sysContainer.style.position = 'absolute';
          sysContainer.style.top = String(0);
          sysContainer.style.left = String(0);
          document.body.appendChild(sysContainer);
        }
        return sysContainer;
      };

      const openExtAppInFrame = () => {
        this.logger.log('open url via new iframe element');
        let extAppFrame = document.getElementById('extAppIframe');
        if (extAppFrame) {
          extAppFrame.parentNode.removeChild(extAppFrame);
        }
        extAppFrame = document.createElement('iframe');
        extAppFrame.id = 'extAppIframe';
        extAppFrame.style.height = '1px';
        extAppFrame.style.width = '1px';
        extAppFrame.style.left = '-100px';
        extAppFrame.style.position = 'absolute';
        getSysContainer().appendChild(extAppFrame);
        // @ts-ignore
        extAppFrame.contentWindow.location.href = extAppUrl;
      };

      if (navigator.msLaunchUri) {
        // IE way to launch URIs
        this.logger.log('open url via msLaunchUri api');
        navigator.msLaunchUri(extAppUrl);
      } else {
        try {
          openExtAppInFrame();
        } catch (e) {
          this.logger.error('Can\'t open url, got exception: %o', e);
        }
      }
    };

    openUrl();
  }
}
