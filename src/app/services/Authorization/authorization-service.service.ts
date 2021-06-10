import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PortalResourcesServiceService} from '../portal-resources-service.service';
import { Logger } from '../../../Logger';
import {EVENT, LOCAL_STORAGE, USER_TYPE, SESSION_STORAGE} from '../../constants';
import {EncodingService} from '../EncodingService/encoding-service.service';

export interface LoginResponse {
  encryptedPassword: string;
  expirationTime: string;
  loginId: string;
  oauth2Authentication: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {

  constructor(private http: HttpClient, private portalResourcesServiceService: PortalResourcesServiceService,
              private encodeService: EncodingService) { }

  private logger = new Logger('AuthorizationService');

  userType = USER_TYPE.GUEST;

  user = {};

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
          this.portalResourcesServiceService.portalResources.peEnabled &&
          this.portalResourcesServiceService.portalResources.ssoRedirectUrl;

        // TODO check that Pole-Emploi authentication works

        if (isSsoPe) {
          this.logger.log('Redirect to PE websso sign in page %s', this.portalResourcesServiceService.portalResources.ssoRedirectUrl);
          window.location.href = this.portalResourcesServiceService.portalResources.ssoRedirectUrl;
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

      this.http.post(this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href, credentials, {
        headers: new HttpHeaders(headers)
      }).toPromise()
        .then( (res) => {
          this.onLoginSuccess(res, isSaveKeepMe);
        }, this.onLoginError);
    });
    // this.logger.log('Login request. Start');
    // if (!window.localStorage) {
    //   this.logger.warn('Browser does not support localStorage.');
    // }
    // let credentials;
    //
    // if (isKeepMe && this.isKeepMeEnabled()) {
    //   this.logger.log('Keep me: Use credentials from  local storage ');
    //   credentials = {
    //     login: window.localStorage[LOCAL_STORAGE.USER_DATA.LOGIN],
    //     encryptedPassword: window.localStorage[LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD],
    //     organizationAlias: window.localStorage[LOCAL_STORAGE.ALIAS]
    //   };
    // } else if (!isKeepMe && (loginValue || passwordValue)) {
    //   this.logger.log('User entered credentials');
    //   credentials = {
    //     // TODO make depends on URL
    //     // organizationAlias: this.$stateParams.alias || 'default'
    //     organizationAlias: 'dev-org208'
    //   };
    // } else if (useSSO || window.localStorage[LOCAL_STORAGE.UPS_TOKEN]) {
    //   this.logger.log('No credentials, but seews IWA is enabled or have token');
    // } else {
    //   this.logger.log('No credentials, no iwa, reject login and clear user data');
    //   this.clearUserData();
    //   const isSsoPe =
    //     // TODO make possible get sso by URL
    //     // this.$location.search().sso === 'pe-websso' &&
    //     this.portalResourcesServiceService.portalResources.peEnabled &&
    //     this.portalResourcesServiceService.portalResources.ssoRedirectUrl;
    //
    //   // TODO check that Pole-Emploi authentication works
    //
    //   if (isSsoPe) {
    //     this.logger.log('Redirect to PE websso sign in page %s', this.portalResourcesServiceService.portalResources.ssoRedirectUrl);
    //     window.location.href = this.portalResourcesServiceService.portalResources.ssoRedirectUrl;
    //   } else {
    //     this.logger.log('Seems websso is not used');
    //   }
    //
    //   return this.$q.reject();
    // }
    //
    // let headers = {};
    // if (loginValue) {
    //   headers = {
    //     Authorization: 'UnifiedPortal ' + this.encodeService.encode(loginValue + ':' + passwordValue),
    //     'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
    //   };
    // }
    //
    // this.http.post(this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href, credentials, {
    //   headers: new HttpHeaders(headers)
    // }).toPromise()
    //   .then( (res) => {
    //   this.onLoginSuccess(res, isSaveKeepMe);
    // }, this.onLoginError);

    // return this.HttpConnectionService.post(this.LOCAL_STORAGE.UPS_TOKEN,
    //   this.PortalResources.resources.resources.authentication.POST.login.href,
    //   credentials ? JSON.stringify(credentials) : null,
    //   useSSO ? {useSSO : true} : null,
    //   headers)
    //   .then( (res) => {
    //     this.onLoginSuccess(res, isSaveKeepMe);
    //   }, this.onLoginError);
  }
  // login (login: string, password: string, isKeepMeSigned?: boolean): void {
  //   const headers = {
  //     Authorization: 'UnifiedPortal ' + btoa(login + ':' + password),
  //     'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
  //   };
  //
  //   const body = {
  //     organizationAlias: 'dev-org208'
  //   };
  //
  //   this.http.post<LoginResponse>(this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href, body, {
  //     headers: new HttpHeaders(headers)
  //   }).subscribe(res => {
  //     console.log('hello auth res', res);
  //     window.localStorage.UPS_TOKEN = res.token;
  //     this.loginResponse = res;
  //     this.isAuthorizedUser = true;
  //   });
  //
  // }

  logout (): void {
    const headers = {
      Authorization: `UPToken ${window.localStorage.UPS_TOKEN}`,
      'Content-Type': 'application/json'
    };

    this.http.post(this.portalResourcesServiceService.portalResources.resources.authentication.POST.logout.href, {}, {
      headers: new HttpHeaders(headers)
    }).subscribe(res => {
      console.log('hello logout', res);
      this.isAuthorizedUser = false;
    }, err => {
      console.log('hello logout', err);
    });
  }

  clearUserData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // this.MessageUtilsService.closeOutlookExtensionNotification(); // TODO make MessageUtilsService
      this.logger.log('ClearUserData: change user type to guest');
      this.userType = USER_TYPE.GUEST;
      window.localStorage.removeItem(LOCAL_STORAGE.UPS_TOKEN);
      this.logger.log('UPS token has been removed from localStorage');
      window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.LOGIN);
      window.localStorage.removeItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD);
      window.localStorage.removeItem(LOCAL_STORAGE.ALIAS);
      window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
      this.logger.log('Keep me: Removed user data from local storage ');
      this.user = {};
      this.logger.log('Stop Services: AvayaContactsService, AvayaUserService, AvayaMeetingManagementService');
      // TODO create following services and methods
      // this.ContactsService.stopAvayaClientServices();
      // this.UserSettingsService.stopAvayaUserService();
      // this.ScheduleService.stopAvayaMeetingManagementService();
      this.logger.log('Get resources for GUEST');
      // request resources for guest user
      // TODO create this service and methods
      // this.UserSettingsService.fetchResources().then( () => {
      //   this.logger.log('Resources for GUEST are received. Logout from ACSR service');
      //
      //   this.RecordingService.initAvayaRecordingManagementService();
      //   this.RecordingService.authenticationService.logout().done((res, res2) => {
      //     this.logger.log('RecordingService: logout: %o : %o', res, res2);
      //     resolve();
      //   }).fail((res) => {
      //     this.logger.warn('RecordingService: logout fail. Response=%o', res);
      //     reject();
      //   }).always(() => {
      //     this.logger.log('Firing user type change event');
      //     // this.$rootScope.$broadcast(EVENT.CUSTOM.RESOURCES_UPDATED); // TODO make analog of this event
      //   });
      // });
    });
  }

  validateToken (): void {
    const token = window.localStorage.getItem('UPS_TOKEN');

    // if(this.$location.$$search.code && this.$location.$$search.session_state && this.$location.$$search.state){
    //   const authParams = {
    //     oauth2State: this.$location.$$search.state,
    //     oauth2SessionState: this.$location.$$search.session_state,
    //     oauth2Code: this.$location.$$search.code
    //   };
    //
    //   return this.loginOauth2(authParams, undefined, this.onLoginError);
    // }

    if (token) {
      const headers = {
        Authorization: 'UPToken ' + token,
        'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
      };

      const body = {organizationAlias: 'dev-org208'};

      this.http.post(this.portalResourcesServiceService.portalResources.resources.authentication.POST.logout.href, null, {
        headers: new HttpHeaders(headers)
      }).subscribe(res => {
        this.isAuthorizedUser = true;
        console.log('hello valid token', res);
      });
    } else {
      this.isAuthorizedUser = false;
    }
  }

  loginOauth2 (oauth2Params): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let requestParams;
        const tokenUrl = this.portalResourcesServiceService.portalResources.oauthCodeToTokenExchangeUrl;
        if (oauth2Params.refreshToken) {
          requestParams = {
            client_id: this.portalResourcesServiceService.portalResources.oauth2ClientId,
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
            this.portalResourcesServiceService.portalResources.tenantAlias);
          const headers = {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
          };
          const params = {
            method: 'POST',
            url: this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href,
            data: null,
            params: null,
            headers: headers || {
              'Content-Type': 'application/json'
            },
            responseType: undefined
          };
          return this.http.post(this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href, {}, {
            headers: new HttpHeaders(params.headers)
          }).toPromise().then((response) => {
            this.onLoginSuccess(response, null, undefined);
          }, (e) => {
            // this.MessageUtilsService.showError(this.$translate.instant('LOGIN.ERROR.ERC_AUTH_USER_NAME')); //TODO create this method
            window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
            this.onLoginError(e);
          });

          // @ts-ignore
          // return this.$http(params)
          //   .then((response) => {
          //     this.onLoginSuccess(response, null, undefined);
          //   }, (e) => {
          //     // this.MessageUtilsService.showError(this.$translate.instant('LOGIN.ERROR.ERC_AUTH_USER_NAME')); //TODO create this method
          //     window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
          //     this.onLoginError(e);
          //   });
        }, (e) => {
          window.history.replaceState({}, document.title, '/portal/tenants/' +
            this.portalResourcesServiceService.portalResources.tenantAlias);
          window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
          this.onLoginError(e);
          this.logger.error('Unable to perform oauth 2 authentication', e);
        });

        // return this.$http({url: tokenUrl, method: 'GET', params: requestParams}).then((res) => {
        //   const accessToken = res.data.access_token;
        //   const refreshToken = res.data.refresh_token;
        //   window.localStorage.setItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN, refreshToken);
        //   window.history.replaceState({}, document.title, '/portal/tenants/' +
        //     this.portalResourcesServiceService.portalResources.tenantAlias);
        //   const headers = {
        //     Authorization: 'Bearer ' + accessToken,
        //     'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
        //   };
        //   const params = {
        //     method: 'POST',
        //     url: this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href,
        //     data: null,
        //     params: null,
        //     headers: headers || {
        //       'Content-Type': 'application/json'
        //     },
        //     responseType: undefined
        //   };
        //   // @ts-ignore
        //   return this.$http(params)
        //     .then((response) => {
        //       this.onLoginSuccess(response, null, undefined);
        //     }, (e) => {
        //       // this.MessageUtilsService.showError(this.$translate.instant('LOGIN.ERROR.ERC_AUTH_USER_NAME')); //TODO create this method
        //       window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
        //       this.onLoginError(e);
        //     });
        // }, (e) => {
        //   window.history.replaceState({}, document.title, '/portal/tenants/' +
        //     this.portalResourcesServiceService.portalResources.tenantAlias);
        //   window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
        //   this.onLoginError(e);
        //   this.logger.error('Unable to perform oauth 2 authentication', e);
        // });
      } catch (e) {
        this.logger.error('Unable to perform oauth 2 authentication', e);
        reject(e);
      }
    });

    // try {
    //   let requestParams;
    //   const tokenUrl = this.portalResourcesServiceService.portalResources.oauthCodeToTokenExchangeUrl;
    //   if (oauth2Params.refreshToken) {
    //     requestParams = {
    //       client_id: this.portalResourcesServiceService.portalResources.oauth2ClientId,
    //       grant_type: 'refresh_token',
    //       refresh_token: oauth2Params.refreshToken
    //     };
    //     // clear refresh token - since it becomes invalid after first usage
    //     // and we need to clear it to prevent additional requests with old refresh token
    //   } else {
    //     const oauth2State = oauth2Params.oauth2State;
    //     const oauth2SessionState = oauth2Params.oauth2SessionState;
    //     const oauth2Code = oauth2Params.oauth2Code;
    //     this.logger.info('Trying to perform OAuth2 with params ', oauth2State, oauth2SessionState, oauth2Code);
    //     const state = JSON.parse(atob(oauth2State));
    //     const clientState = JSON.parse(atob(state.client_state));
    //     requestParams = {
    //       state: oauth2State,
    //       session_state: oauth2SessionState,
    //       code: oauth2Code,
    //       client_id: clientState.client_id,
    //       redirect_uri: clientState.redirect_uri
    //     };
    //   }
    //
    //   return this.$http({url: tokenUrl, method: 'GET', params: requestParams}).then((res) => {
    //     const accessToken = res.data.access_token;
    //     const refreshToken = res.data.refresh_token;
    //     window.localStorage.setItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN, refreshToken);
    //     window.history.replaceState({}, document.title, '/portal/tenants/' +
    //       this.portalResourcesServiceService.portalResources.tenantAlias);
    //     const headers = {
    //       Authorization: 'Bearer ' + accessToken,
    //       'Content-Type': 'application/vnd.avaya.portal.authentication.login.v2+json'
    //     };
    //     const params = {
    //       method: 'POST',
    //       url: this.portalResourcesServiceService.portalResources.resources.authentication.POST.login.href,
    //       data: null,
    //       params: null,
    //       headers: headers || {
    //         'Content-Type': 'application/json'
    //       },
    //       responseType: undefined
    //     };
    //     // @ts-ignore
    //     return this.$http(params)
    //       .then((response) => {
    //         this.onLoginSuccess(response, null, undefined);
    //       }, (e) => {
    //         // this.MessageUtilsService.showError(this.$translate.instant('LOGIN.ERROR.ERC_AUTH_USER_NAME')); //TODO create this method
    //         window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
    //         this.onLoginError(e);
    //       });
    //   }, (e) => {
    //     window.history.replaceState({}, document.title, '/portal/tenants/' +
    //       this.portalResourcesServiceService.portalResources.tenantAlias);
    //     window.localStorage.removeItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
    //     this.onLoginError(e);
    //     this.logger.error('Unable to perform oauth 2 authentication', e);
    //   });
    // } catch (e) {
    //   this.logger.error('Unable to perform oauth 2 authentication', e);
    // }
  }

  private isKeepMeEnabled(): string {
    return window.localStorage.getItem(LOCAL_STORAGE.USER_DATA.LOGIN) &&
      window.localStorage.getItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD) &&
      window.localStorage.getItem(LOCAL_STORAGE.ALIAS);
  }

  private onLoginSuccess (response: any, isSaveKeepMe: any, credentials?: { login: any; }): Promise<any> {
    return new Promise((resolve, reject) => {
      if(response.oauth2Authentication){
        window.localStorage.setItem('oauth2Authentication', String(response.oauth2Authentication));
      }
      const onFetchResourcesSuccess = () => {
        const onFetchUserSettingsSuccess = (userConfigResponse) => {
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
          // TODO create following services and methods
          // this.PictureUtils.extendObjectByPictureData(this.$rootScope.user);
          // this.UserSettingsService.fetchLocations();
          this.userType = USER_TYPE.SIGN_IN;

          // TODO create following service and method
          // this.RecordingService.authenticationService.login(response.data.token).done((res, res2) => {
          //   this.logger.log('RecordingService: Login: %o : %o', res, res2);
          // }).fail(() => {
          //   this.logger.warn('RecordingService: Login fail');
          // }).always(() => {
          //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.RESOURCES_UPDATED);
          //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGIN);
          //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.STOP_RECORDING);
          //   setTimeout(() => {
          //     this.$rootScope.$apply();
          //   });
          // });

          // TODO make analog of this event
          // this.$rootScope.$broadcast(this.EVENT.CUSTOM.CHECK_VIRTUAL_ROOM_PIN_UPDATE);
          resolve(response);
        };
        const  onFetchUserSettingsError = (userConfigResponse) => {
          this.logger.warn('User settings request failed, login rejected');
          this.clearUserData();
          reject(userConfigResponse);
        };

        this.logger.log('Resources are fetched');

        // TODO create following services and methods
        // this.ContactsService.startAvayaClientServices();
        // this.UserSettingsService.startAvayaUserService();
        // this.ScheduleService.startAvayaMeetingManagementService();
        // this.RecordingService.initAvayaRecordingManagementService();

        // TODO create following service and method
        // return this.UserSettingsService.fetchUserSettings().then(onFetchUserSettingsSuccess, onFetchUserSettingsError);

      };

      const onFetchResourcesError = (fetchResourcesResponse) => {
        this.logger.warn('User resources request failed, login rejected');
        this.clearUserData();
        return reject(fetchResourcesResponse);
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
      // TODO create following service and method

      // return this.UserSettingsService.fetchResources().then(onFetchResourcesSuccess, onFetchResourcesError);
    });

    // if(response.oauth2Authentication){
    //   window.localStorage.setItem('oauth2Authentication', String(response.oauth2Authentication));
    // }
    // const onFetchResourcesSuccess = () => {
    //   const onFetchUserSettingsSuccess = (userConfigResponse) => {
    //     this.logger.log('User settings fetched successfully');
    //     if (isSaveKeepMe) {
    //       window.localStorage.setItem(LOCAL_STORAGE.USER_DATA.LOGIN, response.loginId);
    //       window.localStorage.setItem(LOCAL_STORAGE.USER_DATA.ENCRYPTED_PASSWORD, response.encryptedPassword);
    //       this.logger.log('Keep me: Saved user data to local storage ');
    //     }
    //
    //     // window.localStorage.setItem(LOCAL_STORAGE.ALIAS, this.$stateParams.alias); //TODO get alias from URL
    //     window.localStorage.setItem(LOCAL_STORAGE.ALIAS, 'dev-org208');
    //     const userConfig = userConfigResponse.userConfig;
    //     this.user = {
    //       login: (credentials && credentials.login) ? credentials.login : '',
    //       name: userConfig.givenName,
    //       lastName: userConfig.surname,
    //       scopiaId: userConfig.conferencing.scopiaUserId,
    //       pictureUrl: userConfig.pictureUrl,
    //       officePhoneNumber: userConfig.officePhoneNumber,
    //       mobilePhoneNumbers: userConfig.mobilePhoneNumbers,
    //       fullName: userConfig.givenName + ' ' + userConfig.surname
    //     };
    //     // TODO create following services and methods
    //     // this.PictureUtils.extendObjectByPictureData(this.$rootScope.user);
    //     // this.UserSettingsService.fetchLocations();
    //     this.userType = USER_TYPE.SIGN_IN;
    //
    //     // TODO create following service and method
    //     // this.RecordingService.authenticationService.login(response.data.token).done((res, res2) => {
    //     //   this.logger.log('RecordingService: Login: %o : %o', res, res2);
    //     // }).fail(() => {
    //     //   this.logger.warn('RecordingService: Login fail');
    //     // }).always(() => {
    //     //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.RESOURCES_UPDATED);
    //     //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGIN);
    //     //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.STOP_RECORDING);
    //     //   setTimeout(() => {
    //     //     this.$rootScope.$apply();
    //     //   });
    //     // });
    //
    //     // TODO make analog of this event
    //     // this.$rootScope.$broadcast(this.EVENT.CUSTOM.CHECK_VIRTUAL_ROOM_PIN_UPDATE);
    //     return response;
    //   };
    //   const  onFetchUserSettingsError = (userConfigResponse) => {
    //     this.logger.warn('User settings request failed, login rejected');
    //     this.clearUserData();
    //     return this.$q.reject(userConfigResponse);
    //   };
    //
    //   this.logger.log('Resources are fetched');
    //
    //   // TODO create following services and methods
    //   // this.ContactsService.startAvayaClientServices();
    //   // this.UserSettingsService.startAvayaUserService();
    //   // this.ScheduleService.startAvayaMeetingManagementService();
    //   // this.RecordingService.initAvayaRecordingManagementService();
    //
    //   return this.UserSettingsService.fetchUserSettings().then(onFetchUserSettingsSuccess, onFetchUserSettingsError);
    //
    // };
    //
    // const onFetchResourcesError = (fetchResourcesResponse) => {
    //   this.logger.warn('User resources request failed, login rejected');
    //   this.clearUserData();
    //   return this.$q.reject(fetchResourcesResponse);
    // };
    //
    // // TODO make analog of this event
    // // if (response.data.encryptedPassword){
    // //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.SUCCESSFUL_LOGIN_WITH_CREDENTIALS);
    // // }
    // this.logger.log('User is logged in, Token received');
    // window.localStorage.setItem(LOCAL_STORAGE.UPS_TOKEN, response.token);
    // // @ts-ignore
    // window.sessionStorage.setItem(this.SESSION_STORAGE.SESSION_IS_ACTIVE, true);
    // this.logger.log('UPS token has been added to localStorage');
    //
    // return this.UserSettingsService.fetchResources().then(onFetchResourcesSuccess, onFetchResourcesError);
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

    // if (this.getOauth2RefreshToken()) {
    //   return this.loginOauth2({refreshToken: this.getOauth2RefreshToken()}, null, this.onLoginError);
    // } else {
    //   if(this.isPeSSOEnabled()){
    //     this.usePoleEmployeeSSOLogin();
    //   } else {
    //     if(window.localStorage.getItem('oauth2Authentication')){
    //       window.localStorage.removeItem('oauth2Authentication');
    //     }
    //     this.logger.log('User is not logged in');
    //     this.clearUserData();
    //     return this.$q.reject(response);
    //   }
    // }
  }

  private getOauth2RefreshToken(): string {
    return window.localStorage.getItem(LOCAL_STORAGE.OAUTH2_REFRESH_TOKEN);
  }

  private isPeSSOEnabled(): boolean{
    // return this.$location.search().sso === 'pe-websso' && //TODO get sso by URL
    //   !!this.PortalResources.resources.peEnabled &&
    //   !!this.PortalResources.resources.ssoRedirectUrl

    return !!this.portalResourcesServiceService.portalResources.peEnabled &&
      !!this.portalResourcesServiceService.portalResources.ssoRedirectUrl;
  }

  private usePoleEmployeeSSOLogin(): void{
    this.logger.log('Redirect to PE websso sign in page %s', this.portalResourcesServiceService.portalResources.ssoRedirectUrl);
    window.location.href = this.portalResourcesServiceService.portalResources.ssoRedirectUrl;
  }
}
