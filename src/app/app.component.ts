import {Component, OnInit} from '@angular/core';
import {PortalResourcesServiceService} from './services/portal-resources-service.service';
import {FormGroup} from '@angular/forms';
import {AuthorizationService} from './services/Authorization/authorization.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LocalizationService} from './services/LocalizationService/localization.service';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsService} from './services/UserSettingsService/user-settings.service';
import {test} from './shared/commonVariables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit{
  title = 'upc';
  name= '';
  isResourcesLoading = true;
  authForm: FormGroup;
  private userClient;
  private defaultTimeFormat = JSON.stringify({
    useDefault : true,
    use24HourFormat : true,
    // dateFormat : this.DATE_FORMAT.MM_DD_YY
  });

  constructor(public portalResourcesServiceService: PortalResourcesServiceService,
              private authorizationServiceService: AuthorizationService,
              private localization: LocalizationService,
              public translate: TranslateService,
              private userSettingsService: UserSettingsService) {
    translate.setDefaultLang(localization.initLocalization());
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // TODO 1) GET FIRST RESOURCES
    // TODO 2) CHECK TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) GET USER RESOURCES

    this.userSettingsService.fetchResources(true).then(res => {
      this.isResourcesLoading = false;

      // tslint:disable-next-line:no-shadowed-variable
      this.authorizationServiceService.validateToken();
    }, () => {
      alert('Error. Can not get resources');
    });

    window.localStorage.timeFormat = !!window.localStorage.timeFormat ? window.localStorage.timeFormat :  this.defaultTimeFormat;

    window.localStorage.enabledLogs = window.localStorage.enabledLogs ? JSON.parse(window.localStorage.enabledLogs) : true;
  }
}

