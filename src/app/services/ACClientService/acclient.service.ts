import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BROWSERS, CLIENT_TYPE, ERROR_CODE, EVENT, MEETING_TYPE, OS, UP_CLIENT_CONNECTION_SETTINGS, URL} from '../../constants';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {VersionService} from '../BrowserInfoService/browser-info.service';
import {CustomDeviceDetectorService} from '../CustomDeviceDetectorService/custom-device-detector.service';
import {LaunchService} from '../../shared/services/LaunchService/launch.service';
import {GlobalService} from '../GlobalService/global.service';
import * as _ from 'lodash';
import {EventService} from '../../shared/services/EventService/event.service';

@Injectable({
  providedIn: 'root'
})
export class ACClientService {

  public clientData;
  private clientDetectionRequestInterval = 800;
  private timeOutDelay = 20000;
  private timeOutMobileClientOpen = 2500;
  private CLIENT_IS_DISABLED = 0;
  private hasCheckedStorageForAC = false;
  private hasWebdeploymentDataFetched = false;
  private canRunCache = {};
  private canShowDownloadButtonCache = false;
  private defaultClientData = {
    isInstalled: false,
    clientName: 'Avaya Equinox',
    videoCapable: true,     // even if there are no client we have to have some default properties :)
    version: 3.3,
    isUpdateRequired: false,
    isMeetMeOnly: true
  };
  logger = new Logger('ACClientService');

  constructor(private http: HttpClient,
              private userSettingsService: UserSettingsService,
              private versionService: VersionService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private launchService: LaunchService,
              private globalService: GlobalService,
              private eventService: EventService) {

    this.initClientData();
  }

  async updateClientInfo(options?): Promise<Promise<void> | void> {
    const getACParamsInLoop = () => {
      return new Promise((resolve, reject) => {
        const getParams = () => {
          return this.http.post(
            resources.resources.middleware.POST.acResponse.href, clientRequestParameters, {
              headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
              })
            })
            .toPromise().then(
            (response) => {
              return new Promise((resolve1, reject1) => {
                if (_.isEqual('', response) && !timeOutEndAC) {
                  return;
                } else if (!_.isEqual('', response)) {
                  clearInterval(getACParamsLoop);
                  resolve1(response);
                }
              });
            },
            () => {
              return new Promise((resolve1, reject1) => {
                clearInterval(getACParamsLoop);
                this.logger.log('Error in request to AC parameters');
                resolve1({});
              });
            }
          ).finally(() => {
            return new Promise(resolve1 => {
              if (timeOutEndAC) {
                this.logger.warn('AC info was not updated, finished by timeout');
                clearInterval(getACParamsLoop);
                timeOutEndAC = false;
                resolve1({});
              }
            });
          });
        };

        this.logger.log('Starting getACParamsInLoop');
        const resources = this.userSettingsService.portalResources;

        if (resources &&
          resources.clientSettings &&
          // @ts-ignore
          resources.clientSettings.avayaCommunicatorClientEnableRank === this.CLIENT_IS_DISABLED) {
          reject('AC is disabled in resources!!! Skip update info.');
        }

        let timeOutEndAC = false;
        // let deferred = this.$q.defer();
        let getACParamsLoop;
        const clientRequestParameters = {
            session_id: options.sessionId,
            command: 'get_data'
          };


        this.logger.log('getACParamsInLoop: sessionId %s', options.sessionId);

        // request to server every 'clientDetectionRequestInterval' ms
        getACParamsLoop = setInterval(getParams, this.clientDetectionRequestInterval);

        // Set timeout to request
        timeOutEndAC = false;
        setTimeout(() => {
          timeOutEndAC = true;
        }, this.timeOutDelay);
        resolve(true);
      });
    };

    const updateClientWithWebdeploymentInfo = () => {
      return new Promise((resolve, reject) => {
        const parseACVersions = (response) => {
          const xmlResponse = response.data;
          // @ts-ignore
          const parsedResponse = xmlToJSON.parseString(xmlResponse);
          let itemName;
          let itemDescription;
          let itemOs;
          let itemVersion;
          let itemUrl;
          const downloadableItems = [];
          if (parsedResponse.rss &&
            parsedResponse.rss[0] &&
            parsedResponse.rss[0].channel &&
            parsedResponse.rss[0].channel[0] &&
            parsedResponse.rss[0].channel[0].item) {
            for (const item of parsedResponse.rss[0].channel[0].item) {
              itemName = item.title[0]._text;
              itemDescription = item.description[0]._text;
              itemOs = item.enclosure[0]._attr.os._value;
              itemVersion = item.enclosure[0]._attr.version._value.toString();
              itemUrl = item.enclosure[0]._attr.url._value;

              const acMinVersion = this.clientData.isMeetMeOnly ?
                this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientMeetMeMinVersion :
                this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientAuraMinVersion;
              if ((this.customDeviceDetector.os === OS.MAC && itemOs === 'macOSFreshInstaller' ||
                this.customDeviceDetector.os === OS.WINDOWS && itemOs === 'windows') &&
                !this.versionService.isUpdateRequired(itemVersion, acMinVersion)){
                downloadableItems.push({
                  name: itemName,
                  description: itemDescription,
                  os: itemOs,
                  version: itemVersion,
                  url: itemUrl
                });
              }
            }
          }
          return downloadableItems;
        };

        const getLatestDownloadableACVersion = (downloadableItems) => {
          let latestVersionItem = {};
          for (const item of downloadableItems) {
            // @ts-ignore
            if (!this.versionService.isUpdateRequired(item.version, latestVersionItem.version || 0)) {
              latestVersionItem = item;
            }
          }
          return latestVersionItem;
        };

        if (this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientEnableRank !== this.CLIENT_IS_DISABLED &&
          this.customDeviceDetector.isDesktop())
        {
          this.logger.log('Update webdeployment info');
          // fetch list of available AC packages from web deployment service
          let webdeploymentUrl = this.userSettingsService.portalResources.resources.webdeployment.GET.webdeployment.href;
          if (webdeploymentUrl.slice(-1) === '/') {
            webdeploymentUrl = webdeploymentUrl.slice(0, -1);
          }

          resolve(this.http.get(webdeploymentUrl, null).toPromise().then(
            (response) => {
              if (_.isEqual('', response)) {
                this.logger.log('webdeployment response is empty');
              } else {
                this.logger.log('webdeployment response ' + response);

                const downloadableItems = parseACVersions(response);
                const latestAvailableAndSupportedAC = downloadableItems.length !== 0 ?
                  getLatestDownloadableACVersion(downloadableItems) : undefined;
                if (!_.isEqual({}, latestAvailableAndSupportedAC)) {
                  this.logger.log('latest available and supported AC version: %o', latestAvailableAndSupportedAC);

                  this.clientData.latestVersion = latestAvailableAndSupportedAC;

                  this.updateClientInfoInStorage();
                }
              }
            },
            (response) => {
              this.logger.warn('checkInstalledClient: webdeployment response failure: %o', response);
              // TODO make analog of this method
              // this.MessageUtilsService.showError(this.$translate.instant('COMMON.NOTIFICATION.WEB_DEPLOYMENT_REQUEST_FAILED'),
              //   this.$translate.instant('COMMON.NOTIFICATION.WEB_DEPLOYMENT_REQUEST_FAILED_DESCRIPTION'));
            }
          ));

        }
        else {
          const message = 'Don\'t check webdeployment from mobile';
          this.logger.log(message);
          reject(message);
        }
      });
    };

    const checkIfNeedUpdateTheClient = () => {
      const canRunACinTEMode = () => {
        const domainMatched = (domain, domainList) => {
          let result = false;
          for (const listElem of domainList) {
            if (domain === listElem) {
              result = true;
              break;
            }
          }
          this.logger.log('domainMatched: domain %s domainList %s result is %s', domain, JSON.stringify(domainList), result);
          return result;
        };

        return this.clientData.sipReady && domainMatched(this.clientData.sipDomain,
          this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientAuraDomain);
      };

      this.clientData.isUpdateRequired = false;

      const acMinVersion = this.clientData.isMeetMeOnly ?
        this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientMeetMeMinVersion :
        this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientAuraMinVersion;

      if (this.versionService.isUpdateRequired(this.clientData.version, acMinVersion) ||
        // UPDATE_REQUIRED
        (!this.clientData.meetMeCapable && !canRunACinTEMode()) ||
        // WRONG_DOMAIN - after update should work due to meetMeCapable
        (!this.clientData.videoCapable &&
          !this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientAuraVideoIgnore)) {
        // VIDEO_CAPABILITIES_REQUIRED - after update should work due to videoCapable

        this.clientData.isUpdateRequired = true;
      }
    };

    if (!this.hasCheckedStorageForAC) {
      this.logger.log('Try to parse AC data from storage');
      try {
        const newClientData = JSON.parse(window.localStorage[CLIENT_TYPE.AC] || 'false');
        if (newClientData) {
          this.clientData = newClientData;
          this.hasCheckedStorageForAC = true;
        }

        this.clearLocalCaches();
      } catch(err) {
        this.logger.warn('Can\'t load AC data from storage, changes are not applied');
      }
    }

    if (!(this.userSettingsService.portalResources && this.userSettingsService.portalResources.clientSettings)) {
      this.logger.warn('There are not resources yet, need to update AC info later.');
    }

    if (!this.hasWebdeploymentDataFetched) {
      updateClientWithWebdeploymentInfo()
        .then(() => {
          this.hasWebdeploymentDataFetched = true;
          this.clearLocalCaches();

          if (this.clientData.isInstalled) {
            checkIfNeedUpdateTheClient();
          }
        })
        .catch((error) => {
          this.logger.error('Could not fetch webdeployment data and update client info! Error: %o', error);
        });
    }

    // for AC we need session id to continue
    if (!(options && options.sessionId)) {
      this.logger.warn('Can\'t update AC client info, session id is not specified!');
      return;
    }

    return await getACParamsInLoop().then(
      (parametersAC: any) => {

        if (!_.isEqual({}, parametersAC)) {
          this.logger.log('updateClientInfo: AC detected, response is %s', JSON.stringify(parametersAC));
          this.clientData.isInstalled = true;
          this.clientData.name = parametersAC.AppName || parametersAC.appName;
          this.clientData.version = parametersAC.AppVersion || parametersAC.appVersion;
          this.clientData.meetMeCapable =
            parametersAC.MeetMeCapable ||
            parametersAC.meetmeCapable ||
            parametersAC.meetMeCapable;     // can differ for old clients
          this.clientData.sipReady = parametersAC.SIPready;
          this.clientData.sipDomain = parametersAC.SIPDomain;
          this.clientData.videoCapable = parametersAC.VideoCapable || parametersAC.videoCapable;
          this.clientData.isMeetMeOnly = parametersAC.isMeetMeOnly;

          this.eventService.broadcast(EVENT.CUSTOM.CLIENT_WAS_DETECTED);
          checkIfNeedUpdateTheClient();
          this.updateClientInfoInStorage();
          this.clearLocalCaches();
        }
        if (this.canShowDownloadButtonCache) {
          // MessageUtilsService.showBlueRollover('COMMON.CLIENT_APP.UPDATE_REQUIRED', {link: clientData.latestVersion.url});
        }
        this.logger.log('updateClientInfo: client info %s', this.clientData);
      },
      (error) => {
        this.logger.warn('Error in checks on run App: %s', error);
      }
    ).catch((error) => {
      this.logger.error('Something goes wrong during AC info update: %o', error);
    });
  }

  canRun(presentationOnly): void {
    const checkIfCanRun = (presentationOnly) => {
      this.logger.log('Check if can launch AC');
      if (!(this.userSettingsService.portalResources && this.userSettingsService.portalResources.clientSettings)) {
        return {
          result: false,
          error: ERROR_CODE.CLIENT.NO_RESOURCES
        };
      }

      if (!this.clientData.isInstalled) {      // means we trust user
        this.logger.log('Seems AC is not installed, but we trust user.');
        return {
          result: true
        };
      }

      // actually we can run client anyway now. except resources absence.
      // if client is outdated we will just show notification

      return {
        result: true
      };
    };

    if (!this.canRunCache.hasOwnProperty(presentationOnly)) {
      this.canRunCache[presentationOnly] = checkIfCanRun(presentationOnly);
    }

    return this.canRunCache[presentationOnly];
  }

  canShowAdjustButton(): boolean {
    return this.customDeviceDetector.isDesktop() &&
      this.customDeviceDetector.os !== OS.ANDROID &&
      this.customDeviceDetector.os !== OS.IOS;
  }

  canShowDownloadButton(): boolean {
    return this.canShowDownloadButtonCache;
  }

  downloadClient(update?): void {
    if (!(this.clientData.latestVersion && this.clientData.latestVersion.url)) {
      this.logger.error('Cant find url for latest AC version!');
    } else {
      const updateParam = update ? '?upgrade=true' : '';
      const downloadURL = this.clientData.latestVersion.url + updateParam;
      window.open(downloadURL);
    }
  }

  openClientSettings(): void {

    const sessionId = uuidv4();
    const parameters = {
        portalUrl : this.encodeURIIfNeeded(window.location.origin +
          UP_CLIENT_CONNECTION_SETTINGS.frontEndUPCBaseURL +
          // TODO make alias dynamic
          // URL.UPC.BASE.replace(':alias', this.$stateParams.alias)),
          URL.UPC.BASE.replace(':alias', 'dev-org208')),
        session_id: sessionId
      };


    let url;
    const URL_WITHOUT_PARAMS = 'Avaya://DeviceManagement';
    const URL_WITH_PARAMS = 'Avaya://DeviceManagement?' + this.globalService.encodeQueryData(parameters);

    if (this.customDeviceDetector.os === OS.MAC) {
      if (this.clientData.isInstalled) {
        if (!this.versionService.isUpdateRequired(this.clientData.version, ERROR_CODE.CLIENT.MIN_VERSION)) {
          url = URL_WITH_PARAMS;
        } else {
          url = URL_WITHOUT_PARAMS;
        }
      } else {
        url = URL_WITH_PARAMS;
      }
    } else {
      url = URL_WITH_PARAMS;
    }


    this.logger.log('Open AC settings, url: %s', url);
    this.launchService.launchExternalApp(url);
    this.updateClientInfo({sessionId});
  }

  joinToMeeting(meetingOptions): void {
    if (this.clientData.isUpdateRequired) {
      throw ERROR_CODE.CLIENT.UPDATE_REQUIRED;
    }

    const audioOnly = meetingOptions.audioOnly ||
      meetingOptions.meetingType === MEETING_TYPE.AUDIO_ONLY ||
      (this.customDeviceDetector.isDesktop() && !this.clientData.videoCapable);
    const callType = audioOnly ? 'call' : 'video';

    // we can't detect clients with version < 3.4.x with the new flow, so
    // TODO: remove this legacy code in next releases if nothing fails
    // var legacySeparatorVersion = '3.2';
    const secondSeparator = '&';

    const legacyAddingModeratorPinVersion = '3.4';
    let meetingPasscode = meetingOptions.passcode || '';
    if (meetingPasscode && this.customDeviceDetector.isDesktop() &&
      this.versionService.compareVersions(legacyAddingModeratorPinVersion, this.clientData.version) > 0) {   // version < 3.4
      meetingPasscode = meetingPasscode.split('*')[0];
    }

    const sessionId = uuidv4();

    // TODO: rewrite it like in SWC client call, with parameters object - it would be more clear

    let appUrl = 'Avaya://' + callType + '?' +
      encodeURIComponent(meetingOptions.bridgeNumber) +
      secondSeparator + 'MeetingId=' + meetingOptions.meetingId +
      (meetingPasscode ? ('&MeetingPasscode=' + meetingPasscode) : '') +
      '&CorrelationToken=' + meetingOptions.token +
      '&presentationOnly=' + !!meetingOptions.presentationOnly +
      '&audioOnly=' + audioOnly +
      '&userName=' + encodeURIComponent(meetingOptions.name) +
      '&ServiceGWURL=' + this.encodeURIIfNeeded(window.location.origin + '/csa/resources/tenants/' +
        this.userSettingsService.portalResources.getTenantParams.tenantId) + '/' +
      (meetingOptions.uccpUrl ? '&uccpUrl=' + this.encodeURIIfNeeded(meetingOptions.uccpUrl) : '') +
      '&portalUrl=' + this.encodeURIIfNeeded(window.location.origin +
        UP_CLIENT_CONNECTION_SETTINGS.frontEndUPCBaseURL +
        // TODO make alias dynamic
        // URL.UPC.BASE.replace(':alias', this.$stateParams.alias)) +
        URL.UPC.BASE.replace(':alias', 'dev-org208')) +
      (this.userSettingsService.portalResources.acBrandingUrl ?
        '&acBrandingUrl=' + this.encodeURIIfNeeded(this.userSettingsService.portalResources.acBrandingUrl) : '') +
      '&session_id=' + sessionId;

    if (meetingOptions.ssoType) {
      appUrl += '&SSO-TYPE='+ meetingOptions.ssoType;
    }
    this.logger.log('Open external app (AC): %s', appUrl);
    meetingOptions.meetingURL = appUrl;

    if (this.customDeviceDetector.os === OS.ANDROID || this.customDeviceDetector.os === OS.IOS ||
      // we need to determine iOS in Desktop mode
      // https://github.com/srfrnk/ua-device-detector/issues/17
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      this.openMobileClient(appUrl);
    } else if (this.customDeviceDetector.isDesktop()) {
      this.launchService.launchExternalApp(appUrl);
      this.updateClientInfo({sessionId});
    }
  }

  clearClientData(): void {
    this.logger.log('Clear AC data from storage and local caches');
    const defaultClientData = {
      isInstalled: false,
      clientName: 'Avaya Equinox',
      videoCapable: true,     // even if there are no client we have to have some default properties :)
      version: 3.3,
      isUpdateRequired: false,
      isMeetMeOnly: true
    };

    const latestVersion = this.clientData.latestVersion;   // preserve it
    this.clientData = defaultClientData;
    this.clientData.latestVersion = latestVersion;

    this.updateClientInfoInStorage();
    this.clearLocalCaches();
  }

  downloadOutlookPlugIn(): void {
    if (this.customDeviceDetector.os === OS.MAC) {
      if (!this.userSettingsService.portalResources.outlookPluginDownloadUrlMac) {
        this.logger.error('Cant find url for latest outlook plugin!');
      } else {
        window.open(this.userSettingsService.portalResources.outlookPluginDownloadUrlMac);
      }
    }
    if (this.customDeviceDetector.os === OS.WINDOWS) {
      if (!this.userSettingsService.portalResources.outlookPluginDownloadUrlMac) {
        this.logger.error('Cant find url for latest outlook plugin!');
      } else {
        window.open(this.userSettingsService.portalResources.outlookPluginDownloadUrlWindows);
      }
    }
  }

  isThereClientToDownload(): boolean {
    return !!this.clientData.latestVersion;
  }

  private initClientData(): void {
    try {
      this.clientData = JSON.parse(window.localStorage[CLIENT_TYPE.AC] || 'false');
    } catch (err) {
      this.logger.log('Can\'t find AC client data in local storage, use default data.');
    }
    if (!this.clientData) {
      this.clientData = this.defaultClientData;
    }
  }

  private updateClientInfoInStorage():void {
    const newData = this.clientData || this.defaultClientData;
    this.logger.log('Update client info for AC client in storage: %o', newData);
    window.localStorage[CLIENT_TYPE.AC] = JSON.stringify(newData);
  }

  private clearLocalCaches(): void {
    this.canRunCache = {};   // lazy cache
    this.updateCanShowDownloadButtonCache();
  }

  private updateCanShowDownloadButtonCache = () => {
    let acMinVersion;
    const downloadMinVersion = this.clientData.latestVersion && this.clientData.latestVersion.version;

    if (!this.clientData.hasOwnProperty('isMeetMeOnly')) {
      this.clientData.isMeetMeOnly = true;
    }

    if (this.userSettingsService.portalResources && this.userSettingsService.portalResources.clientSettings) {
      acMinVersion = this.clientData.isMeetMeOnly ?
        this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientMeetMeMinVersion :
        this.userSettingsService.portalResources.clientSettings.avayaCommunicatorClientAuraMinVersion;
    }

    // have something to download and not a TE client there are no client or update is required
    this.canShowDownloadButtonCache = (this.clientData.latestVersion && this.clientData.latestVersion.url) &&
      this.clientData.isMeetMeOnly &&
      (!this.clientData.isInstalled ||
        this.versionService.isUpdateRequired(this.clientData.version, downloadMinVersion || acMinVersion));

    this.logger.log('Can show downloadACButton value updated to %o', this.canShowDownloadButtonCache);
  }

  private encodeURIIfNeeded(uri): string {
    // TODO: in future when all clients will support encoded urls - just encode them always
    if (uri.indexOf('&')!== -1) {
      return encodeURIComponent(uri);
    } else {
      return uri;
    }
  }

  private openMobileClient(meetingURL): void {
    const cancelFallbackRedirect = () => {
      document.removeEventListener('visibilitychange', cancelFallbackRedirect);
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    };

    document.addEventListener('visibilitychange', cancelFallbackRedirect);

    // Start fallback timer which will redirect the user to the proper app store
    let fallbackTimer = setTimeout(() => {
      document.removeEventListener('visibilitychange', cancelFallbackRedirect);
    }, this.timeOutMobileClientOpen);

    window.location.href = meetingURL;
  }
}
