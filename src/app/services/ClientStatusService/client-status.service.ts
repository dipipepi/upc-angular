import { Injectable } from '@angular/core';
import {CLIENT_TYPE, ERROR_CODE} from '../../constants';
import {ACClientService} from '../ACClientService/acclient.service';
import {SWCClientService} from '../SWCClientService/swcclient.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class ClientStatusService {
  selectedClient: string | boolean;
  private logger = new Logger('ClientStatusService');

  constructor(private acClientService: ACClientService,
              private swcClientService: SWCClientService,
              private customDeviceDetectorService: CustomDeviceDetectorService) { }

  clientData(): boolean {
    return this.selectedClient === CLIENT_TYPE.AC ? this.acClientService.clientData : this.swcClientService.clientData;
  }

  canRunTheClient(presentationOnly, client): void | { result: boolean; error?: string } {    // 2d attribute is optional
    return this.getClientService(client).canRun(presentationOnly);
  }

  updateClientsInfo(): void {
    try {
      this.swcClientService.updateClientInfo();
      this.acClientService.updateClientInfo();
    } catch(error) {
      this.logger.warn('Cant update clients info, error: %s', error);
    }
  }

  canShowAdjustButton(): boolean {
    return this.getClientService().canShowAdjustButton();
  }

  canShowDownloadButton(): boolean {
    return this.getClientService().canShowDownloadButton();
  }

  downloadClient(): void {
    this.getClientService().downloadClient();
  }

  openClientSettings(): void {
    this.getClientService().openClientSettings();
  }

  joinToMeetingIfPossible(meetingOptions): void {
    let preferredClient = meetingOptions.preferredClient;
    if (!this.customDeviceDetectorService.isDesktop()) {
      this.logger.log('Seems it is mobile device, will join with AC.');
      preferredClient = CLIENT_TYPE.AC;
    }

    const ifCanRuntTheClient: any = this.canRunTheClient(meetingOptions.presentationOnly, preferredClient);
    if (!ifCanRuntTheClient.result) {
      if (this.selectedClient === CLIENT_TYPE.SWC &&
        !meetingOptions.presentationOnly &&
        this.swcClientService.canRun(true).result &&
        !this.swcClientService.canRun(false).result) {

        throw ERROR_CODE.CLIENT.SWC_PO_ONLY_SUPPORTED;
      }
      throw ifCanRuntTheClient.error || ERROR_CODE.CLIENT.PREFERRED_CLIENT_ISSUE;
    }

    return this.getClientService(preferredClient).joinToMeeting(meetingOptions);
  }

  private getClientService = (client?) => {
    // for internal use only
    return (client || this.selectedClient) === CLIENT_TYPE.AC ? this.acClientService : this.swcClientService;
  }
}
