import { Injectable } from '@angular/core';
import { Logger } from '../../../Logger';
import { LOCAL_STORAGE } from '../../constants';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  logger = new Logger('ContactsService');
  started = false;
  user;
  service;

  constructor(private userSettingsService: UserSettingsService) { }

  startAvayaClientServices():void {
    const parsedAADSServicesUrl = this.userSettingsService.portalResources.aadsServicesUrl.match('^([^:/\\?#]+):?//([^:/\\?#]*)(?::([^/\\?#]*))??$');

    // @ts-ignore
    const config = new AvayaClientServices.Config.UserConfiguration();
    config.acsConfiguration.enabled = true;
    // @ts-ignore
    config.acsConfiguration.credentialProvider = new AvayaClientServices.Config.CredentialTokenProvider(
      window.localStorage.getItem(LOCAL_STORAGE.UPS_TOKEN));
    // @ts-ignore
    config.acsConfiguration.networkProviderConfiguration.restConfig = new AvayaClientServices.Config.ServerInfo(
      parsedAADSServicesUrl[2],
      // tslint:disable-next-line:radix
      parseInt(parsedAADSServicesUrl[3]),
      parsedAADSServicesUrl[1] ? (parsedAADSServicesUrl[1] === 'https' || parsedAADSServicesUrl[1] === 'wss') : false
    );
    config.mediaConfiguration.mediaEngineEnabled = false;

    // @ts-ignore
    const client = new AvayaClientServices(config.clientConfiguration);
    client.registerLogger(this.logger);
    this.user = client.createUser(config);

    this.service = this.user.getContacts();

    this.user.start()
      .done(() => {
        this.logger.log('ContactsService started successfully');
        this.started = true;
      })
      .fail((error) => {
        this.logger.log(error);
      });
  }

  stopAvayaClientServices():void {
    if (this.started) {
      this.service.addOnContactsServiceUnavailableCallback(() => {
        this.logger.log('Contact Service in unavailable');
      });

      this.user.stop()
        .done(() => {
          this.logger.log('Contact Service is stopped successfully');
        })
        .fail((error) => {
          this.logger.log(error);
        });

      this.started = false;
    }
  }
}
