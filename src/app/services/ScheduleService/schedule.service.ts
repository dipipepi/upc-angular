import { Injectable } from '@angular/core';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {URL} from '../../constants';
import {MeetingUtilsService} from '../../shared/services/MeetingUtilsService/meeting-utils.service';
import {GlobalService} from '../GlobalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  logger = new Logger('ScheduleService');
  service;
  isMeetingJoinable: boolean;
  constructor(private userSettingsService: UserSettingsService,
              private translate: TranslateService,
              private meetingUtils: MeetingUtilsService,
              private globalService: GlobalService) { }

  startAvayaMeetingManagementService (): void {
    const resources = this.userSettingsService.portalResources;
    resources.resources.broadcastProfiles = {
      href: this.userSettingsService.portalResources.resources.conference.GET.getConferences.href + '/broadcast_profiles'
    };
    // @ts-ignore
    const client = new AvayaMeetingManagementClient(new AvayaMeetingManagementClient.Config.ClientConfig({
      resources
    }));
    this.service = client.meetingManagementService;

    this.service.start(localStorage.UPS_TOKEN);
    this.logger.log('AvayaMeetingManagementService started');
  }

  stopAvayaMeetingManagementService():void {
    if (this.service) {
      this.service.stop();
      this.logger.log('AvayaMeetingManagementService stopped');
    }
  }

  emailAttendees(meeting: any): void {
    let attendeeList = '';
    let endpontList = '';
    if (meeting.attendees) {
      // @ts-ignore
      for (const attendees of meeting.attendees) {
        const attendee = attendees;
        attendeeList += attendee.email + ';';
        if (attendee.terminalId) {
          endpontList += attendee.terminalName +
            ' (' + attendee.protocol + ', ' + attendee.maxBandwidth + this.translate.instant('SCHEDULE.EMAIL_INVITE.KBPS') + ')' +
            (attendee.autoDialIn ? ' ' + this.translate.instant('SCHEDULE.EMAIL_INVITE.AUTO_DIAL'): '') +
            (attendee.email ? ' - ' + attendee.firstName + ' ' + attendee.lastName : '') +
            '%0D%0A';
        }
      }
    }
    let pin = '';
    // @ts-ignore
    if (meeting.accessPIN) {
      // @ts-ignore
      pin = '***' + atob(meeting.accessPIN);
    }

    const url = window.location.origin +
      this.userSettingsService.portalResources.clientSettings.clientConnection.frontEndUPCBaseURL +
      // TODO get alias from url
      // this.URL.UPC.BASE.replace(':alias', this.$stateParams.alias) +
      URL.UPC.BASE.replace(':alias', 'dev-org208') +
      URL.UPC.JOIN + '?ID=' +
      meeting.number + pin;
    const startTime = new Date(meeting.startTime);
    const formattedStarTime = startTime.toLocaleDateString() + ' ' + startTime.toLocaleTimeString();
    const duration = this.meetingUtils.durationToMinutes(meeting.duration);

    window.location.href = 'mailto:' + attendeeList + '?subject=' + meeting.subject +
      '&body=' + this.translate.instant(endpontList ? 'SCHEDULE.EMAIL_INVITE.MEETING_BODY' : 'SCHEDULE.EMAIL_INVITE.MEETING_BODY_NO_ENDPOINTS', {
        description: encodeURIComponent(meeting.description),
        startTime: formattedStarTime,
        duration: duration + ' ' + this.translate.instant('SCHEDULE.DURATION.MINUTES'),
        url,
        name: this.globalService.user.name,
        endpoints: endpontList
      });
  }
}
