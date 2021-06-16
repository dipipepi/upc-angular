import { Injectable } from '@angular/core';
import {LOCAL_STORAGE, STATUS_CODE, URL} from '../../constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PortalResources} from '../portal-resources-service.service';
import { Logger } from '../../../Logger';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  logger = new Logger('UserSettingsService');

  portalResources: PortalResources;
  userSettings;

  pictureUrls;
  locations;

  // @ts-ignore
  client = new AvayaUserClient(new AvayaUserClient.Config.ClientConfig({
    resources: {}
  }));
  service = this.client.userService;

  constructor(private http: HttpClient,
              private translate: TranslateService) { }

  fetchResources(fetchAsGuest?: boolean): Promise<PortalResources> {
    return new Promise<any>((resolve, reject) => {
      const fetchUPSResources = () => {
        // const alias = this.$stateParams.alias || window.location.href.split('/')[5]; //TODO set alias dynamic
        // const resourcesUrl = window.location.origin + URL.UPS.RESOURCES + alias + '/'; //TODO set resourcesUrl dynamic
        const token = fetchAsGuest ? undefined : window.localStorage[LOCAL_STORAGE.UPS_TOKEN];
        const resourcesUrl = 'https://dev-cores208.uplab.com/ups/resources/';
        let headers = {};

        if(!fetchAsGuest) {
          headers = {
            Authorization: 'UPToken ' + token
          };
        }

        return this.http.get(resourcesUrl, {headers: new HttpHeaders(headers)}).toPromise().then((response) => {
          if (response) {
            this.logger.log('Got UPS resources successfully, response = %o', response);
            // @ts-ignore //TODO check return type
            return response;   // make compatible with ACS response
          }
        })
          .catch((response) => {
            this.logger.warn('Get resources request fail, response=%o', response);
            return response;
          });
      };

      const fetchACSResourcesAndPatchResponse = (upsResourcesResponse) => {
        const fetchACSResources = () => {
          this.logger.log('Try to get ACS resources');
          const origin = upsResourcesResponse.aadsServicesUrl ?
            upsResourcesResponse.aadsServicesUrl :
            window.location.origin;
          const resourcesUrl = origin + URL.ACS.RESOURCES;
          const headers = {
            Accept : 'application/vnd.avaya.acs.resources.v7+json, application/vnd.avaya.acs.resources.v1+json',
            Authorization: `UPToken ${window.localStorage[LOCAL_STORAGE.UPS_TOKEN]}`
          };
          return this.http.get(resourcesUrl, {
            headers: new HttpHeaders(headers)
          }).toPromise().then(
            (response) => {
              this.logger.log('Get acs resources request success, response = %o', response);
              // @ts-ignore
              return response;
            },
            (response) => {
              if (response.status === STATUS_CODE.UNAUTHORIZED) {
                // that will happen if UPS token is expired - will show appropriate message later in chain
                return upsResourcesResponse;
              }

              this.logger.warn('Get acs resources request fail, response = %o', response);
              // TODO make this method
              // this.MessageUtilsService.showError('', this.$translate.instant('SETTINGS.ERROR.ACS_RESOURCES_NOT_FETCHED'));
              return response;
            }
          );
        };

        const mergeResources = (acsResponse) => {
          const resources = upsResourcesResponse;
          delete resources.resources.userdetails;

          // we only use this fields from acs now
          resources.resources.user = acsResponse.resources.user;
          resources.resources.pictures = acsResponse.resources.pictures;
          resources.photoUploadEnabled = acsResponse.photoUploadEnabled;
          resources.limits = acsResponse.limits;

          this.portalResources = resources;
          return resources;
        };

        if (fetchAsGuest || !window.localStorage[LOCAL_STORAGE.UPS_TOKEN]) {
          this.logger.log('Seems user is not logged in, skip fetching ACS resources');
          return upsResourcesResponse;
        }

        return fetchACSResources()
          .then(mergeResources);
      };

      const handleResources = (resources) => {
        this.logger.log('Get resources request success');
        this.portalResources = resources;

        if (this.portalResources.resources){
          if(!window.localStorage.currentAdminMessage){
            window.localStorage.currentAdminMessage = resources.notificationMessages.length !== 0 ?
              JSON.stringify(resources.notificationMessages[0]) : false;
          }
        }

        if (resources) {
          resources.isAemo = false;
        }
        if (this.portalResources.assrUrl) {
          this.portalResources.assrUrl = window.location.protocol + '//' + this.portalResources.assrUrl;
        }

        // @ts-ignore
        this.portalResources.getRecParams = new AvayaRecordingClient.Services.ProgramService.ProgramParams({
          tenantId: this.portalResources.self ? this.portalResources.self.scopiaMemberId : null,
          user: this.portalResources.self ? this.portalResources.self.userId : null
        });

        // @ts-ignore
        this.portalResources.getChatParams = new AvayaRecordingClient.Services.ChatService.ChatParams({
          tenantId: this.portalResources.getRecParams.tenantId,
          user: this.portalResources.getRecParams.user
        });

        // @ts-ignore
        this.portalResources.getSystemSettingsParams = new AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams({
          tenantId: this.portalResources.getRecParams.tenantId,
          user: this.portalResources.getRecParams.user
        });

        // @ts-ignore
        this.portalResources.getTenantParams = new AvayaRecordingClient.Services.TenantService.TenantParams({
          tenantId: this.portalResources.getRecParams.tenantId,
          user: this.portalResources.getRecParams.user
        });

        if (this.service) {
          // @ts-ignore
          this.service.resources = new AvayaUserClient.Config.Resources(this.portalResources);
        }

        if (this.portalResources.resources.pictures) {
          this.pictureUrls = {
            get: this.portalResources.resources.pictures.GET.getUserPicture.href,
            post: this.portalResources.resources.pictures.POST.uploadUserPicture.href,
            delete: this.portalResources.resources.pictures.DELETE.deleteUserPicture.href
          };
        }

        // TODO this can be replaced with client side UUID generation
        return this.http.get(this.portalResources.resources.middleware.POST.createSession.href).toPromise()
          .then((session) => {
            // @ts-ignore
            this.portalResources.sessionId = session.sessionId;
            resolve(this.portalResources);
          });
      };

      return fetchUPSResources()
        .then(fetchACSResourcesAndPatchResponse)
        .then(handleResources);
    });
  }

  fetchUserSettings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!this.service) {
        this.logger.error('try to fetch user settings without existing service! make sure you start it already.');
        reject('User Settings Service is not initialised yet!');
      }

      return this.service.getUserConfig().fail((response) => {
        this.logger.warn('user settings request failed');
        this.logger.debug(JSON.stringify(response));
        // TODO make broadcast analog
        // if (response.status === this.STATUS_CODE.UNAUTHORIZED) {
        //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.UNAUTHORIZED_ACCESS);
        // }
        reject(response);
      }).done((response) => {
        this.logger.debug('user settings request success');
        this.userSettings = response.userConfig;
        this.userSettings.photoUploadEnabled = this.portalResources.photoUploadEnabled || false;
        this.userSettings.maxPictureSizeInKB = this.portalResources.limits &&
          this.portalResources.limits.maxPictureSizeInKB || 300;
        resolve(response);
      });
    });

  }

  stopAvayaUserService(): void {
    if (this.service) {
      this.service.stop();
      this.logger.log('AvayaUserService stopped');
    }
  }

  startAvayaUserService(): void {
    if (!this.pictureUrls) {
      this.logger.error('Picture Urls is not fetched yet, can\'s start User Service!');
      // this.MessageUtilsService.showError('', this.$translate.instant('SETTINGS.ERROR.NO_DATA_TO_INIT_USER_SERVICE')); // make this method
      return;
    }
    this.service.start(window.localStorage[LOCAL_STORAGE.UPS_TOKEN], this.pictureUrls);
    this.logger.log('AvayaUserService started');
  }

  fetchLocations(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // const alias = this.$stateParams.alias || window.location.href.split('/')[5]; // TODO set alias dynamic
      const alias = 'dev-org208';
      // const locationUrl = window.location.origin + URL.UPS.RESOURCES + alias + '/location/'; // TODO make locationUrl dynamic
      const locationUrl = 'https://dev-cores208.uplab.com/ups/resources/tenants/dev-org208/location/';
      return this.http.get(locationUrl, {
        headers: new HttpHeaders({Authorization: `UPToken ${window.localStorage[LOCAL_STORAGE.UPS_TOKEN]}`})
      }).toPromise().then(
        (response: any) => {
          this.logger.log('Get locations request success');
          this.locations = response.location;
          this.translate.get('SETTINGS.AUTO').subscribe(res => {
            this.locations.splice(0, 0, { locationId: '', name: res });
          });
          resolve(response);
        },
        (response) => {
          this.logger.log('Get locations request fail');
          reject(response);
        }
      );
    });
  }
}
