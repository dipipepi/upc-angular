import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PortalResources, PortalResourcesServiceService} from '../portal-resources-service.service';
import {Logger} from '../../../Logger';
import {LOCAL_STORAGE, SESSION_STORAGE, USER_TYPE} from '../../constants';
import {EncodingService} from '../EncodingService/encoding-service.service';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {RecordingService} from '../RecordingService/recording.service';
import {PictureService} from '../PictureUtils/picture.service';
import {ContactsService} from '../ContactsService/contacts.service';
import {ScheduleService} from '../ScheduleService/schedule.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export interface LoginResponse {
  encryptedPassword: string;
  expirationTime: string;
  loginId: string;
  oauth2Authentication: boolean;
  token: string;
}

export interface User{
  fullName: string;
  lastName: string;
  login: string;
  mobilePhoneNumbers: any[];
  name: string;
  officePhoneNumber: string;
  pictureUrl: string;
  scopiaId?: string;
  pictureData?: string;
}

export interface Token{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient, private portalResourcesServiceService: PortalResourcesServiceService,
              private encodeService: EncodingService,
              private userSettingsService: UserSettingsService,
              private recordingService: RecordingService,
              private pictureUtils: PictureService,
              private contactsService: ContactsService,
              private scheduleService: ScheduleService) { }

  private logger = new Logger('AuthorizationService');

  userType = USER_TYPE.GUEST;

  user: User | {};

  isAuthorizedUser = false;

  loginResponse: LoginResponse;

  login (isKeepMe: boolean, loginValue: string, passwordValue: string, isSaveKeepMe: boolean, useSSO?: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.logger.log('Login request. Start');
      if (!window.localStorage) {
        this.logger.warn('Browser does not support localStorage.');
      }
      let credentials;

      if (isKeepMe && this.isKeepMeEnabled()) {
        this.logger.log('Keep me: Use credentials from  local storage ');
        credentials = {
          login: window.localStorage[LOCAL_STORAGE.USER_DATA.LOGIN],
          encryptedPassword: window.localStorage[LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD],
          organizationAlias: window.localStorage[LOCAL_STORAGE.ALIAS]
        };
      } else if (!isKeepMe && (loginValue || passwordValue)) {
        this.logger.log('User entered credentials');
        credentials = {
          // TODO make depends on URL
          // organizationAlias: this.$stateParams.alias || 'default'
          organizationAlias: 'dev-org208'
        };
      } else if (useSSO || window.localStorage[LOCAL_STORAGE.UPS_TOKEN]) {
        this.logger.log('No credentials, but seews IWA is enabled or have token');
      } else {
        this.logger.log('No credentials, no iwa, reject login and clear user data');
        this.clearUserData();
        const isSsoPe =
          // TODO make possible get sso by URL
          // this.$location.search().sso === 'pe-websso' &&
          this.userSettingsService.portalResources.peEnabled &&
          this.userSettingsService.portalResources.ssoRedirectUrl;

        // TODO check that Pole-Emploi authentication works

        if (isSsoPe) {
          this.logger.log('Redirect to PE websso sign in page %s', this.userSettingsService.portalResources.ssoRedirectUrl);
          window.location.href = this.userSettingsService.portalResources.ssoRedirectUrl;
        } else {
          this.logger.log('Seems websso is not used');
        }

        reject();
      }

      let headers = {};
      if (loginValue) {
        headers = {
          Authorization: 'UnifiedPortal ' + this.encodeService.encode(loginValue + ':' + passwordValue),
          'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
        };
      }

      resolve(this.http.post<PortalResources>(this.userSettingsService.portalResources.resources.authentication.POST.login.href,
        credentials, {
        headers: new HttpHeaders(headers)
      }).toPromise()
        .then( (res) => {
          this.onLoginSuccess(res, isSaveKeepMe);
        }, this.onLoginError));
    });
  }

  logout (): Promise<any> {
    return this.http.post(this.userSettingsService.portalResources.resources.authentication.POST.logout.href, {}, {
      headers: new HttpHeaders({Authorization: `UPToken ${window.localStorage.getItem('UPS_TOKEN')}`})
    })
      .toPromise()
      .then((response => {
        this.clearUserData().then(() => {
          window.localStorage.removeItem('oauth2Authentication');
          // this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGOUT); // TODO make analog of this event
        });
        return response;
      }));
  }

  // clearUserData(): Promise<any> {
  //   return new Promise<any>(() => {
  //     // this.MessageUtilsService.closeOutlookExtensionNotification(); // TODO make MessageUtilsService
  //     this.logger.log('ClearUserData: change user type to guest');
  //     this.userType = USER_TYPE.GUEST;
  //     window.localStorage.removeItem(LOCAL_STORAGE.UPS_TOKEN);
  //     this.logger.log('UPS token has been removed from localStorage');
  //     window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.LOGIN);
  //     window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD);
  //     window.localStorage.removeItem(LOCAL_STORAGE.ALIAS);
  //     window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
  //     this.logger.log('Keep me: Removed user data from local storage ');
  //     this.user = {};
  //     this.logger.log('Stop Services: AvayaContactsService, AvayaUserService, AvayaMeetingManagementService');
  //     this.contactsService.stopAvayaClientServices();
  //     this.userSettingsService.stopAvayaUserService();
  //     this.scheduleService.stopAvayaMeetingManagementService();
  //     this.logger.log('Get resources for GUEST');
  //     // request resources for guest user
  //
  //     this.userSettingsService.fetchResources().then( () => {
  //       return new Promise<void>((resolve, reject) => {
  //         this.logger.log('Resources for GUEST are received. Logout from ACSR service');
  //
  //         this.recordingService.initAvayaRecordingManagementService();
  //         this.recordingService.authenticationService.logout().done((res, res2) => {
  //           this.logger.log('RecordingService: logout: %o : %o', res, res2);
  //           resolve();
  //         }).fail((res) => {
  //           this.logger.warn('RecordingService: logout fail. Response=%o', res);
  //           reject();
  //         }).always(() => {
  //           this.logger.log('Firing user type change event');
  //           // this.$rootScope.$broadcast(EVENT.CUSTOM.RESOURCES_UPDATED); // TODO make analog of this event
  //         });
  //       });
  //     });
  //   });
  // }

  clearUserData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // this.MessageUtilsService.closeOutlookExtensionNotification(); // TODO create this method
      this.logger.log('ClearUserData: change user type to guest');
      this.userType = USER_TYPE.GUEST;
      window.localStorage.removeItem(LOCAL_STORAGE.UPS_TOKEN);
      this.logger.log('UPS token has been removed from localStorage');
      window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.LOGIN);
      window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD);
      window.localStorage.removeItem(LOCAL_STORAGE.ALIAS);
      window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
      this.logger.log('Keep me: Removed user data from local storage ');
      delete this.user;
      delete this.userSettingsService.userSettings;
      this.logger.log('Stop Services: AvayaContactsService, AvayaUserService, AvayaMeetingManagementService');
      this.contactsService.stopAvayaClientServices();
      this.userSettingsService.stopAvayaUserService();
      this.scheduleService.stopAvayaMeetingManagementService();
      this.logger.log('Get resources for GUEST');
      // request resources for guest user
      resolve(this.userSettingsService.fetchResources(true).then( () => {
        this.logger.log('Resources for GUEST are received. Logout from ACSR service');

        this.recordingService.initAvayaRecordingManagementService();
        this.recordingService.authenticationService.logout().done((res, res2) => {
          this.logger.log('RecordingService: logout: %o : %o', res, res2);
          // resolve();
        }).fail((res) => {
          this.logger.warn('RecordingService: logout fail. Response=%o', res);
          reject();
        }).always(() => {
          this.logger.log('Firing user type change event');
          // this.$rootScope.$broadcast(this.EVENT.CUSTOM.RESOURCES_UPDATED); // TODO make analog of this event
        });

      }));
    });
  }

  validateToken(): Promise<Token> {
    return new Promise((resolve, reject) => {
      const token = window.localStorage.getItem('UPS_TOKEN');

      // TODO Finish the sso authorization
      // if(this.$location.$$search.code && this.$location.$$search.session_state && this.$location.$$search.state){
      //   const authParams = {
      //     oauth2State: this.$location.$$search.state,
      //     oauth2SessionState: this.$location.$$search.session_state,
      //     oauth2Code: this.$location.$$search.code
      //   };
      //
      //   return this.loginOauth2(authParams);
      // }

      if (token || this.isKeepMeEnabled()) {
        const headers = {
          Authorization: 'UPToken ' + token,
          'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
        };
        const url = this.userSettingsService.portalResources.resources.authentication.POST.login.href;
        const parameters = {
          method: 'POST',
          url: this.userSettingsService.portalResources.resources.authentication.POST.login.href,
          headers,
          data: undefined
        };

        if (this.isKeepMeEnabled()) {
          const dataForKeepMe = {
            login: window.localStorage[LOCAL_STORAGE.USER_DATA.LOGIN],
            encryptedPassword: window.localStorage[LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD],
            organizationAlias: window.localStorage[LOCAL_STORAGE.ALIAS]
          };

          parameters.data = JSON.stringify(dataForKeepMe);

        }

        resolve(this.http.post(url, {}, {
          headers: new HttpHeaders(headers)
        }).toPromise().then((response) => {
          return new Promise((resolve1, reject1) => {
            resolve1(this.onLoginSuccess(response, false, undefined));
          });
        }, this.onLoginError));
      } else {
        if (this.isPeSSOEnabled()) {
          this.usePoleEmployeeSSOLogin();
        } else {
          this.userType = USER_TYPE.GUEST;
          // this.$rootScope.$broadcast(this.EVENT.CUSTOM.RESOURCES_UPDATED); // TODO create analog of this event
          this.recordingService.initAvayaRecordingManagementService();
          reject();
        }
      }
    });
  }

  loginOauth2 (oauth2Params): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let requestParams;
        const tokenUrl = this.userSettingsService.portalResources.oauthCodeToTokenExchangeUrl;
        if (oauth2Params.refreshToken) {
          requestParams = {
            client_id: this.userSettingsService.portalResources.oauth2ClientId,
            grant_type: 'refresh_token',
            refresh_token: oauth2Params.refreshToken
          };
          // clear refresh token - since it becomes invalid after first usage
          // and we need to clear it to prevent additional requests with old refresh token
        } else {
          const oauth2State = oauth2Params.oauth2State;
          const oauth2SessionState = oauth2Params.oauth2SessionState;
          const oauth2Code = oauth2Params.oauth2Code;
          this.logger.info('Trying to perform OAuth2 with params ', oauth2State, oauth2SessionState, oauth2Code);
          const state = JSON.parse(atob(oauth2State));
          const clientState = JSON.parse(atob(state.client_state));
          requestParams = {
            state: oauth2State,
            session_state: oauth2SessionState,
            code: oauth2Code,
            client_id: clientState.client_id,
            redirect_uri: clientState.redirect_uri
          };
        }

        return this.http.get(tokenUrl, requestParams).toPromise().then((res) => {
          // @ts-ignore
          const accessToken = res.data.access_token;
          // @ts-ignore
          const refreshToken = res.data.refresh_token;
          window.localStorage.setItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN, refreshToken);
          window.history.replaceState({}, document.title, '/portal/tenants/' +
            this.userSettingsService.portalResources.tenantAlias);
          const headers = {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
          };
          const params = {
            method: 'POST',
            url: this.userSettingsService.portalResources.resources.authentication.POST.login.href,
            data: null,
            params: null,
            headers: headers || {
              'Content-Type': 'application/json'
            },
            responseType: undefined
          };
          return this.http.post(this.userSettingsService.portalResources.resources.authentication.POST.login.href, {}, {
            headers: new HttpHeaders(params.headers)
          }).toPromise().then((response) => {
            this.onLoginSuccess(response, null, undefined);
          }, (e) => {
            // this.MessageUtilsService.showError(this.$translate.instant('LOGIN.ERROR.ERC_AUTH_USER_NAME')); //TODO create this method
            window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
            this.onLoginError(e);
          });
        }, (e) => {
          window.history.replaceState({}, document.title, '/portal/tenants/' +
            this.userSettingsService.portalResources.tenantAlias);
          window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
          this.onLoginError(e);
          this.logger.error('Unable to perform oauth 2 authentication', e);
        });
      } catch (e) {
        this.logger.error('Unable to perform oauth 2 authentication', e);
        reject(e);
      }
    });
  }

  private isKeepMeEnabled(): string {
    return window.localStorage.getItem(LOCAL_STORAGE.USER_DATA.LOGIN) &&
      window.localStorage.getItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD) &&
      window.localStorage.getItem(LOCAL_STORAGE.ALIAS);
  }

  private onLoginSuccess (response: any, isSaveKeepMe: any, credentials?: { login: any; }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(response.oauth2Authentication){
        window.localStorage.setItem('oauth2Authentication', String(response.oauth2Authentication));
      }
      const onFetchResourcesSuccess = (): Promise<any> => {
        return new Promise<any>((resolve1, reject1) => {
          const onFetchUserSettingsSuccess = (userConfigResponse): Promise<any> => {
            return new Promise((resolve2) => {
              this.isAuthorizedUser = true;
              this.logger.log('User settings fetched successfully');
              if (isSaveKeepMe) {
                window.localStorage.setItem(LOCAL_STORAGE.USER_DATA.LOGIN, response.loginId);
                window.localStorage.setItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD, response.encryptedPassword);
                this.logger.log('Keep me: Saved user data to local storage ');
              }

              // window.localStorage.setItem(LOCAL_STORAGE.ALIAS, this.$stateParams.alias); //TODO get alias from URL
              window.localStorage.setItem(LOCAL_STORAGE.ALIAS, 'dev-org208');
              const userConfig = userConfigResponse.userConfig;
              this.user = {
                login: (credentials && credentials.login) ? credentials.login : '',
                name: userConfig.givenName,
                lastName: userConfig.surname,
                scopiaId: userConfig.conferencing.scopiaUserId,
                pictureUrl: userConfig.pictureUrl,
                officePhoneNumber: userConfig.officePhoneNumber,
                mobilePhoneNumbers: userConfig.mobilePhoneNumbers,
                fullName: userConfig.givenName + ' ' + userConfig.surname
              };
              this.pictureUtils.extendObjectByPictureData(this.user);
              this.userSettingsService.fetchLocations();
              this.userType = USER_TYPE.SIGN_IN;

              // TODO create following service and method
              this.recordingService.authenticationService.login(response.token).done((res, res2) => {
                this.logger.log('RecordingService: Login: %o : %o', res, res2);
              }).fail(() => {
                this.logger.warn('RecordingService: Login fail');
              }).always(() => {
                // TODO make analog of this event
                // this.$rootScope.$broadcast(this.EVENT.CUSTOM.RESOURCES_UPDATED);
                // this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGIN);
                // this.$rootScope.$broadcast(this.EVENT.CUSTOM.STOP_RECORDING);
              });

              // TODO make analog of this event
              // this.$rootScope.$broadcast(this.EVENT.CUSTOM.CHECK_VIRTUAL_ROOM_PIN_UPDATE);
              resolve2(response);
            });
          };
          const onFetchUserSettingsError = (userConfigResponse): Promise<any> => {
            return new Promise<any>((resolve2, reject2) => {
              this.logger.warn('User settings request failed, login rejected');
              this.clearUserData();
              reject2(userConfigResponse);
            });
          };

          this.logger.log('Resources are fetched');
          this.contactsService.startAvayaClientServices();
          this.userSettingsService.startAvayaUserService();
          this.scheduleService.startAvayaMeetingManagementService();
          this.recordingService.initAvayaRecordingManagementService();

          resolve1(this.userSettingsService.fetchUserSettings().then(onFetchUserSettingsSuccess, onFetchUserSettingsError));
        });

      };

      const onFetchResourcesError = (fetchResourcesResponse): Promise<any> => {
        return new Promise<any>((resolve1, reject1) => {
          this.logger.warn('User resources request failed, login rejected');
          this.clearUserData();
          reject1(fetchResourcesResponse);
        });
      };

      // TODO make analog of this event
      // if (response.data.encryptedPassword){
      //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGIN_WITH_CREDENTIALS);
      // }
      this.logger.log('User is logged in, Token received');
      window.localStorage.setItem(LOCAL_STORAGE.UPS_TOKEN, response.token);
      // @ts-ignore
      window.sessionStorage.setItem(SESSION_STORAGE.SESSION_IS_ACTIVE, true);
      this.logger.log('UPS token has been added to localStorage');

      resolve(this.userSettingsService.fetchResources().then(onFetchResourcesSuccess, onFetchResourcesError));
    });
  }

  private onLoginError = (response): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      if (this.getOauth2RefreshToken()) {
        return this.loginOauth2({refreshToken: this.getOauth2RefreshToken()});
      } else {
        if(this.isPeSSOEnabled()){
          this.usePoleEmployeeSSOLogin();
        } else {
          if(window.localStorage.getItem('oauth2Authentication')){
            window.localStorage.removeItem('oauth2Authentication');
          }
          this.logger.log('User is not logged in');
          this.clearUserData();
          reject(response);
        }
      }
    });
  }

  private getOauth2RefreshToken(): string {
    return window.localStorage.getItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
  }

  private isPeSSOEnabled(): boolean{
    // return this.$location.search().sso === 'pe-websso' && //TODO get sso by URL
    //   !!this.PortalResources.resources.peEnabled &&
    //   !!this.PortalResources.resources.ssoRedirectUrl

    return false;
  }

  private usePoleEmployeeSSOLogin(): void{
    this.logger.log('Redirect to PE websso sign in page %s', this.userSettingsService.portalResources.ssoRedirectUrl);
    window.location.href = this.userSettingsService.portalResources.ssoRedirectUrl;
  }

  private asObservable(subject: Subject<any>): Observable<any> {
    return new Observable(fn => subject.subscribe(fn));
  }
}
