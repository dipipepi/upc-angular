import { Injectable } from '@angular/core';
import {currentAlias} from '../shared/commonVariables';
import {URL} from '../constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PortalResources {
  getTenantParams: any;
  isAemo: any;
  limits: any;
  photoUploadEnabled: boolean;
  sessionId: string;
  getRecParams: any;
  aadsServicesUrl: string;
  acBrandingUrl: string;
  acceptedUserAgentRegexp: string;
  appcastCheckInterval: number;
  assrUrl: string;
  bfcpUdpMaxPort: number;
  bfcpUdpMinPort: number;
  branding: {
    acBranding: string | null
    brandingStyle: string | null
    custom2: string | null
    custom3: string | null
    customAfterLaunch: string | null
    customGuest: string | null
    customLogo: string | null
    customScript: string | null
    customSignIn: string | null
    customStyle: string
    poweredByLogo: string | null
    swcCustomCssUrl: string | null
    upcFavicon: string
    webrtcFavicon: string
  };
  brandingRules: {
    disableTutorial: boolean
    hideCookieWarning: boolean
    hideJoinPresentationOnly: boolean
    hideJoinWithBrowser: boolean
    hideJoinWithNativeApp: boolean
    hideLoginButtonForExternalUsers: boolean
    hideRecordingDownload: boolean
    hideRecordingTab: boolean
    hideScheduleTab: boolean
    moveLogToTop: boolean
  };
  brandingRulesScopes: {
    hideJoinWithBrowser: string
    hideJoinWithNativeApp: string
    hideLoginButtonForExternalUsers: string
    hideRecordingDownload: string
  };
  brandingUrl: string;
  callMeEnabledInDataOnly: boolean;
  capabilities: string[];
  chromeScreensharingExtensionUrl: string;
  customLogoUrl: string | null;
  customProductName: string | null;
  disablePopupForAppDownload: boolean;
  disallowSequentialAndRepeatedDigits: boolean;
  excludedUserAgentRegExp: string | null;
  externalUser: boolean;
  firefoxScreensharingExtensionUrl: string;
  hideRecordingDownload: boolean;
  iwaEnabled: boolean;
  linkToMacClient: string | null;
  linkToWindowsClient: string | null;
  meetingPINMinimumLength: number;
  moderatorPINMinimumLength: number;
  multitenant: boolean;
  notificationMessages: { announcementActive: true
    announcementEndTime: string
    announcementLastEditTime: string
    announcementMessage: string
    announcementStartTime: string
  }[];
  oauth2AuthenticationUrl: string;
  oauth2ClientAuthenticationUrl: string;
  oauth2ClientId: string;
  oauthCodeToTokenExchangeUrl: string;
  ottMode: boolean;
  outlookPluginDownloadUrlMac: string;
  outlookPluginDownloadUrlWindows: string;
  peEnabled: boolean;
  portalVersion: string;
  recordingAndBroadcastPINMinimumLength: number;
  rtpPortLow: number;
  rtpPortRange: number;
  scopiaDesktopServerAvailablePackagesMacURL: string | null;
  scopiaDesktopServerAvailablePackagesWindowsURL: string | null;
  scopiaDesktopServerURL: string | null;
  ssoRedirectUrl: string;
  stunServers: any[];
  supportEmail: string | null;
  supportedAuthType: string | null;
  swcBackgroundChatColor: string | null;
  swcBackgroundRosterColor: string | null;
  swcFontChatColor: string | null;
  swcFontRosterColor: string | null;
  tenantAlias: string;
  unifiedPortalSSO: boolean;
  ebRtcShowModPinForWaitRoom: boolean;
  webrtcCustomProductName: string | null;
  webRtcLandingPageSettings: {
    autoCloseTime: number;
    logSavingAvailable: boolean;
    meetingQualityFeedbackAvailable: boolean;
    meetingQualityFeedbackURL: string;
    publicChatSavingAvailable: boolean;
    rosterSavingAvailable: boolean;
  };
  self: {
    email: string | null
    firstName: string | null
    lastName: string | null
    scopiaMemberId: string
    scopiaUserId: string | null
    userId: string | null
  };
  resources: {
    user: any;
    conference?: any;
    broadcastProfiles?: { href: string };
    pictures: any;
    'webdeployment': {
      'GET': {
        'webdeployment': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': [
            string
          ]
        }
      }
    },
    'middleware': {
      'POST': {
        'createJsession': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': string[]
        },
        'sdcResponse': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        },
        'createSwcInfo': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        },
        'createSession': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': string[]
        },
        'createConferenceToken': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        },
        'acResponse': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        }
      },
      'GET': {
        'getTenantAlias': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': string[]
        }
      }
    },
    'authentication': {
      'POST': {
        'contentServerToken': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': string[]
        },
        'logout': {
          'href': string,
          'requestTypes': string | null,
          'responseTypes': string | null
        },
        'getUserType': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        },
        'remindPassword': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string | null
        },
        'login': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string[]
        },
        'changePassword': {
          'href': string,
          'requestTypes': string[],
          'responseTypes': string | null
        }
      }
    }
  };
  clientSettings: {
    webMeetMeDataOnlyBrowsers: any[];
    'avayaCommunicatorClientAuraDomain': any[],
    'scopiaDesktopClientEnableRank': number,
    'scopiaDesktopClientMinVersion': string | null,
    'scopiaDesktopClientProductId': string | null,
    'scopiaDesktopClientFilename': string | null,
    'scopiaDesktopClientMacMinVersion': string | null,
    'scopiaDesktopClientMacPluginVersion': string | null,
    'scopiaDesktopClientMacShortVersion': string | null,
    'avayaCommunicatorClientEnableRank': number,
    'avayaCommunicatorClientAuraMinVersion': string,
    'avayaCommunicatorClientMeetMeMinVersion': string,
    'avayaCommunicatorClientAuraVideoIgnore': boolean,
    'webMeetMeClientEnableRank': number,
    'webMeetMeWebRTCBrowsers': {
      'excludedVersions': string[],
      'minVersion': string,
      'type': string | null,
      'title': string,
      'majorVersion': number
    }[],
    'clientConnection': {
      'frontEndScheme': string,
      'frontEndFQDN': string,
      'frontEndPort': string,
      'frontEndUPCBaseURL': string,
      'frontEndUPSBaseURL': string,
      'frontEndSWCBaseURL': string,
      'frontEndESGBaseURL': string,
      'useReverseProxyHost': boolean
    },
    'managementConnection': {
      'frontEndScheme': string,
      'frontEndFQDN': string,
      'frontEndPort': string,
      'frontEndManagementAPIBaseURL': string
    },
    'managementUIURL': string | null,
    'adminUIURL': string | null,
    'aadsURL': string | null,
    'sdsServers': any[],
    'allowPortalConferenceGuestAccess': boolean,
    'allowCsgConferenceGuestAccess': boolean,
    'allowRecordingGuestAccess': boolean,
    'defaultAndroidConferenceApp': string,
    'defaultIosConferenceApp': string
  };
}

@Injectable({
  providedIn: 'root'
})
export class PortalResourcesServiceService {

  constructor(private http: HttpClient) {}

  portalResources;

  // tslint:disable-next-line:typedef
  fetchResources(fetchAsGuest?: boolean) : Observable<PortalResources> {
    const alias = currentAlias || window.location.href.split('/')[5];
    let resourcesUrl = window.location.origin + URL.UPS.RESOURCES + alias + '/';
    resourcesUrl = 'https://dev-cores208.uplab.com/ups/resources/';
    const token = fetchAsGuest ? undefined : window.localStorage.UPS_TOKEN;

    return this.http.get<PortalResources>(resourcesUrl);

    // const fetchUPSResources = () => {
    //
    //   return this.HttpConnectionService.get(token, resourcesUrl)
    //     .then((response) => {
    //       if (response) {
    //         this.logger.log('Got UPS resources successfully, response = %o', response);
    //         return response.data;   // make compatible with ACS response
    //       }
    //     })
    //     .then((response) => {
    //       return this.LocalizationService.initLocalization(response)
    //         .then(() => {
    //           return response;
    //         });
    //     })
    //     .catch((response) => {
    //       this.logger.warn('Get resources request fail, response=%o', response);
    //
    //       this.LocalizationService.initLocalization(null)
    //         .then(() => {
    //           let alertMessage = this.$translate.instant('SETTINGS.ERROR.RESOURCES_NOT_FETCHED', {
    //             errorMessage: response.data &&
    //             response.data.error &&
    //             response.data.error[0] ? response.data.error[0].errorCode : ''
    //           });
    //           if (response.data && response.data.error && response.data.error[0] && response.data.error[0].errorCode === this.ERROR_CODE.AUTH.ORG_NOT_EXIST) {
    //             alertMessage = 'SETTINGS.ERROR.ORG_NOT_EXIST';
    //           }
    //           if (response.status !== this.STATUS_CODE.UNAUTHORIZED) {
    //             this.$translate(alertMessage).then((res) => {
    //               alert(res);
    //             });
    //           }
    //         });
    //       return this.$q.reject(response);
    //     });
    // }
  }

  }

