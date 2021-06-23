import {Injectable} from '@angular/core';
import {Logger} from '../../../Logger';
import {ERROR_CODE, LOCAL_STORAGE} from '../../constants';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {PictureService} from '../PictureUtils/picture.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  logger = new Logger('ContactsService');
  started = false;
  user;
  service;
  private terminalsSearchRequest: any;
  private terminalsSearchRetrieval: any;
  private contactsSearchRequest: any;
  private contactsSearchRetrieval: any;

  constructor(private userSettingsService: UserSettingsService,
              private pictureUtils: PictureService) { }

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

  searchTerminals(searchString): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.terminalsSearchRequest) {
        this.terminalsSearchRetrieval.cancel();
      }
      // this.terminalsSearchDeferred = this.terminalsSearchDeferred ? this.terminalsSearchDeferred : this.$q.defer();
      const filteredTerminals = [];

      this.logger.log('new terminals search for \"' + searchString + '\"');

      // @ts-ignore
      this.terminalsSearchRequest = new AvayaClientServices.Services.Contacts.ContactSearchRequest(searchString, 'TERMINAL', 'ALL', 10, 0, 'CONFERENCE_ONLY');

      this.terminalsSearchRetrieval = this.service.searchContacts(this.terminalsSearchRequest);
      this.terminalsSearchRetrieval.getDataSet().addOnDataSetChangedCallback((data, type) => {
        // @ts-ignore
        if (type === AvayaClientServices.Base.DataSetChangeTypes.ADDED) {
          this.logger.log('Received ' + data.length + ' terminals search results');
          data.forEach((contact) => {
            this.logger.log('search found terminal. Terminal name=%s, contactData=%o', contact.getTerminal().getTerminalName(), contact);
            const terminal = {
              terminalName: contact.getTerminal().getTerminalName(),
              terminalId: contact.getTerminal().getTerminalId(),
              terminalNumber: undefined
            };
            const phoneNumbers = contact.getPhoneNumbers().getValues();
            terminal.terminalNumber = phoneNumbers.length > 0 ? phoneNumbers[0].getPhoneNumber() : '';
            filteredTerminals.push(terminal);
          });
        }
      });

      this.terminalsSearchRetrieval.addOnDataRetrievalDoneCallback(() => {
        this.logger.log('Terminal search completed successfully, result=%o', filteredTerminals);
        // if (this.terminalsSearchDeferred) {
        resolve(filteredTerminals);
        // }
        this.terminalsSearchRequest = undefined;
        // this.terminalsSearchDeferred = undefined;
      });

      this.terminalsSearchRetrieval.addOnDataRetrievalFailedCallback((error) => {
        this.logger.warn('Terminal search request fail: %o', error);
        if (error.getReason() !== ERROR_CODE.CONTACT_SEARCH.REQUEST_CANCELED) {
          reject(error);
        }
        // this.terminalsSearchDeferred = undefined;
      });

      // return this.terminalsSearchDeferred.promise;
    });
  }

  searchContacts(searchString: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const patchContactWithLoginIdByEmail = (contact: any) => {
        return new Promise<any>((resolve1, reject1) => {
          const fillIfEmpty = (target: object, source: any[], fields: any[]) => {
            if (!fields || !fields.length) {
              return;
            }

            fields.forEach((field) => {
              if (!target[field] && source[field]) {
                target[field] = source[field];
              }
            });
          };

          // const deferred = this.$q.defer();
          // @ts-ignore
          this.logger.log('Seems %s have no loginId, trying to find it.', contact.emailAddress);

          // @ts-ignore
          this.searchContactByEmail(contact.emailAddress, (fullContact) => {
            // @ts-ignore
            this.logger.log('Contact %s is found, its login id is %s', contact.emailAddress, fullContact.loginId);
            fillIfEmpty(contact, fullContact, ['userId', 'loginId', 'firstName', 'lastName', 'pictureUrl', 'pictureData', 'phone']);
            resolve1(true);
          }, (error) => {
            // @ts-ignore
            this.logger.warn('Can\'t find user by email %s, its login id is still empty! This can cause incorrect contacts behavior. ' +
              'Error: %o', contact.emailAddress, error);
            reject1();
          });
        });
      };

      if (this.contactsSearchRequest && this.contactsSearchRetrieval) {
        this.contactsSearchRetrieval.cancel();
      }
      // this.contactsSearchDeferred = this.contactsSearchDeferred ? this.contactsSearchDeferred : this.$q.defer();

      const filteredContacts = [];

      this.logger.log('new contacts search for \"' + searchString + '\"');
      // @ts-ignore
      this.contactsSearchRequest = new AvayaClientServices.Services.Contacts.ContactSearchRequest(encodeURIComponent(searchString), 'ALL', 'ALL', 10, 0, 'CONFERENCE_ONLY');
      this.contactsSearchRetrieval = this.service.searchContacts(this.contactsSearchRequest);

      this.contactsSearchRetrieval.getDataSet().addOnDataSetChangedCallback((contacts, type) => {
        // @ts-ignore
        if (type === AvayaClientServices.Base.DataSetChangeTypes.ADDED) {
          this.logger.log('Received ' + contacts.length + ' contacts search results');
          contacts.forEach((contact) => {
            this.logger.log('search found contact. Contact name=%s %s, contactData=%o',
              contact.getFirstName().getValue(), contact.getLastName().getValue(), contact);
            if (contact.getEmailAddresses().getValues().length) {
              filteredContacts.push(this.pictureUtils.extendObjectByPictureData({
                userId: contact.getScopiaUserId().getValue(),
                loginId: contact.getScopiaLoginId().getValue(),
                emailAddress: contact.getEmailAddresses().getValues().length ? contact.getEmailAddresses().getValues()[0].getAddress() : '',
                firstName: contact.getFirstName().getValue(),
                lastName: contact.getLastName().getValue(),
                pictureUrl: contact.getPictureUrl(),
                phone: contact.getPhoneNumbers() &&
                contact.getPhoneNumbers().getValues()[0] ?
                  contact.getPhoneNumbers().getValues()[0].getPhoneNumber() :
                  undefined
              }));
            }
          });
        }
      });

      this.contactsSearchRetrieval.addOnDataRetrievalDoneCallback(() => {
        this.logger.log('Contact search completed, contacts = %o.', filteredContacts);

        // if (this.contactsSearchDeferred) {
        // check if some of contacts don't have loginId
        // it could happen due to stupid ACS contact search architecture
        this.logger.log('Will check if every contact have login id.');

        const checkingContacts = [];
        for (const contact of filteredContacts) {
          if (!contact.loginId) {
            checkingContacts.push(patchContactWithLoginIdByEmail(contact));
          }
        }

        resolve(Promise.all(checkingContacts)
          .then(() => {
            this.logger.log('Contact search completed, resolve request by contacts = %o', filteredContacts);
            return filteredContacts;
          }));
        // }
        // this.contactsSearchDeferred = undefined;
        this.contactsSearchRequest = undefined;
      });

      this.contactsSearchRetrieval.addOnDataRetrievalFailedCallback((error) => {
        this.logger.warn('Contact search request fail: ' + error);
        if (error.getReason() !== ERROR_CODE.CONTACT_SEARCH.REQUEST_CANCELED) {
          reject(error);
        }
        // this.contactsSearchDeferred = undefined;
      });

      // return this.contactsSearchDeferred.promise;
    });
  }
}
