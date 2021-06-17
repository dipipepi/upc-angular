import { Injectable } from '@angular/core';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {URL} from '../../constants';
import { Logger } from '../../../Logger';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  client;
  isInitialized = false;
  logger = new Logger('RecordingService');

  // @ts-ignore
  playerClient = new PlayerClient({
    flashPlugin: 'assets/libs/flash/StrobeMediaPlayback.swf',
    hlsPlugin: 'assets/libs/flash/flashlsOSMF_Avaya_1_0.swf',
    silverlightPlugin: '../../../assets/libs/silverlight/MediaPlayerTemplate.xap',
    playersConfiguration: 'assets/libs/jsplayerclient/playersConfigData.json',
    autoplay: true
  });

  constructor(private userSettingsService: UserSettingsService) { }

  initAvayaRecordingManagementService(): void {
    if (this.isInitialized) {
      return;
    }

    // @ts-ignore
    const authServer = new AvayaRecordingClient.Config.ServerInfo({
      host: window.location.hostname,
      port: window.location.port,
      isSecure: true,
      // @ts-ignore
      resources: new AvayaRecordingClient.Config.Resources.AuthorizationResources({
        authorizationUrl: this.userSettingsService.portalResources.resources.authentication.POST.contentServerToken.href
      })
    });

    // @ts-ignore
    const serviceServer = new AvayaRecordingClient.Config.ServerInfo({
      resources: {
        get baseUrl(): string {
          // @ts-ignore
          return this.userSettingsService.portalResources.assrUrl;
        },
        // @ts-ignore
        programResources: new AvayaRecordingClient.Config.Resources.ProgramResources({
          programsUrl: URL.ASSR.PROGRAMS,
          categoriesUrl: URL.ASSR.CATEGORIES
        })
      }
    });

    const clientConfig = {
      authServer,
      serviceServer
    };

    // @ts-ignore
    this.client = new AvayaRecordingClient(clientConfig);


    this.client.authenticationService.turnToUserModeCallbacks.add(() => {
      this.logger.log('Callback triggers when user logs in');
    });

    this.client.authenticationService.turnToGuestModeCallbacks.add(() => {
      this.logger.log('Callback triggers when user log out or token refresh is failed');
    });

    this.isInitialized = true;

    // this.$rootScope.$broadcast(this.EVENT.CUSTOM.RECORDING_SERVICE_INITIALIZED); // TODO make analog of this event

  }

  get authenticationService(): any {
    return this.client.authenticationService;
  }
}
