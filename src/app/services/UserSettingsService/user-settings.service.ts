import { Injectable } from '@angular/core';
import {LOCAL_STORAGE, STATUS_CODE, URL} from '../../constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PortalResources} from '../portal-resources-service.service';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  logger = new Logger('UserSettingsService');

  portalResources: PortalResources;
  userSettings;

  pictureUrls;

  // @ts-ignore
  client = new AvayaUserClient(new AvayaUserClient.Config.ClientConfig({
    resources: {}
  }));
  service = this.client.userService;

  constructor(private http: HttpClient) { }

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
          const headers = {Accept : 'application/vnd.avaya.acs.resources.v7+json, application/vnd.avaya.acs.resources.v1+json'};
          return this.http.get(resourcesUrl, {
            headers: new HttpHeaders(headers)
          }).toPromise().then(
            (response) => {
              this.logger.log('Get acs resources request success, response = %o', response);
              // @ts-ignore
              return response.data;
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
          this.service.resources = new AvayaUserClient.Config.Resources(this.portalResources.resources);
        }

        if (this.portalResources.resources.pictures) {
          this.pictureUrls = {
            get: this.portalResources.resources.pictures.GET.getUserPicture.href,
            post: this.portalResources.resources.pictures.POST.uploadUserPicture.href,
            delete: this.portalResources.resources.pictures.DELETE.deleteUserPicture.href
          };
        }

        console.log('hello trigger');
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
    if (!this.service) {
      this.logger.error('try to fetch user settings without existing service! make sure you start it already.');
      return this.$q.reject('User Settings Service is not initialised yet!');
    }

    return this.service.getUserConfig().fail((response) => {
      this.logger.warn('user settings request failed');
      this.logger.debug(JSON.stringify(response));
      //TODO make broadcast analog
      // if (response.status === this.STATUS_CODE.UNAUTHORIZED) {
      //   this.$rootScope.$broadcast(this.EVENT.CUSTOM.UNAUTHORIZED_ACCESS);
      // }
      return response;
    }).done((response) => {
      this.logger.debug('user settings request success');
      this.userSettings = response.userConfig;
      this.userSettings.photoUploadEnabled = this.$rootScope.resources.photoUploadEnabled || false;
      this.userSettings.maxPictureSizeInKB = this.$rootScope.resources.limits && this.$rootScope.resources.limits.maxPictureSizeInKB || 300;
      return response;
    });
  }
}
