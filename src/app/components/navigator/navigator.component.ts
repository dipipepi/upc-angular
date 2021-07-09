import { Component, OnInit } from '@angular/core';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {USER_TYPE} from '../../constants';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.less']
})
export class NavigatorComponent implements OnInit {
  USER_TYPE: USER_TYPE;
  browser: string;

  constructor(public userSettingsService: UserSettingsService,
              public authorizationService: AuthorizationService,
              public customDeviceDetectorService: CustomDeviceDetectorService,
              private router: Router) { }

  ngOnInit(): void {
    this.USER_TYPE = USER_TYPE;
    this.browser = this.customDeviceDetectorService.browser;
  }

}
