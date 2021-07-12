import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GuestSettingsComponent} from '../../settings/guest-settings/guest-settings.component';
import {EventService} from '../../../shared/services/EventService/event.service';
import {BrowserInfoService} from '../../../services/BrowserInfoService/browser-info.service';
import {ClientStatusService} from '../../../services/ClientStatusService/client-status.service';
import {CustomDeviceDetectorService} from '../../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {JoinService} from '../../../services/JoinService/join.service';
import {ActivatedRoute} from '@angular/router';
import {CLIENT_TYPE, EVENT} from '../../../constants';

@Component({
  selector: 'app-enter-name-to-join',
  templateUrl: './enter-name-to-join.html',
  styleUrls: ['./enter-name-to-join.less']
})
export class EnterNameToJoinViewComponent {
  constructor(public dialogRef: MatDialogRef<EnterNameToJoinViewComponent>,
              private eventService: EventService,
              private browserInfoService: BrowserInfoService,
              private clientStatusService: ClientStatusService,
              private customDeviceDetectorService: CustomDeviceDetectorService,
              private joinService: JoinService,
              @Inject(MAT_DIALOG_DATA) public data,
              private route: ActivatedRoute) {

  }

  join() {
    this.eventService.broadcast(EVENT.CUSTOM.AUTO_FILL_UPDATE);
    if (this.browserInfoService.isWebRTCBrowser()) {
      if(this.browserInfoService.isWebRTCBrowserExclusion() || this.browserInfoService.isDataOnlyBrowserExclusion()){
        this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
      } else {
        this.clientStatusService.selectedClient = CLIENT_TYPE.SWC;
      }
    } else {
      this.clientStatusService.selectedClient = CLIENT_TYPE.AC;
    }

    if (this.customDeviceDetectorService.isDesktop()) {
      if (this.data.shouldShowDownloadDialog()) {
        const options = {
          meetingId: this.data.meeting.id,
          joinMode: {
            name: this.data.meeting.name,
            audioOnly: !JSON.parse(window.localStorage.videoCallingPreferences)
          }
        };
        // TODO create this method
        // globalThis.MessageUtilsService.showDownloadDialog(options);
      } else {
        setTimeout(() => {
          this.joinService.joinToMeeting(this.data.meeting.id, {
            name: this.data.meeting.name,
            audioOnly: !!this.route.snapshot.queryParams.dataonly ? false :
              !JSON.parse(window.localStorage.videoCallingPreferences)
          });
        }, 500);
      }
    } else {
      this.data.requestToOpenMobileClient(this.data.meeting);

      setTimeout(() => {
        this.joinService.joinToMeeting(this.data.meeting.id, {
          name: this.data.meeting.name,
          audioOnly: !!this.route.snapshot.queryParams.dataonly ? false : !JSON.parse(window.localStorage.videoCallingPreferences)
        });
      }, 500);
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
