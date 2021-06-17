import { Injectable } from '@angular/core';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../UserSettingsService/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  logger = new Logger('ScheduleService');
  private service;
  constructor(private userSettingsService: UserSettingsService) { }

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
}
