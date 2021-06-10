import {Component, OnInit} from '@angular/core';
import {PortalResourcesServiceService} from './services/portal-resources-service.service';
import {FormGroup} from '@angular/forms';
import {AuthorizationServiceService} from './services/Authorization/authorization-service.service';
import {DeviceDetectorService} from 'ngx-device-detector';

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
              private authorizationServiceService: AuthorizationServiceService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // TODO 1) GET FIRST RESOURCES
    // TODO 2) CHECK TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) AUTH WITH TOKEN
    // TODO 2.1) GET USER RESOURCES

    console.log('hello user client 2', DeviceDetectorService);
    this.portalResourcesServiceService.fetchResources().subscribe(res => {
      this.portalResourcesServiceService.portalResources = res;
      this.isResourcesLoading = false;
      this.authorizationServiceService.validateToken();
      // @ts-ignore
      this.userClient = new AvayaUserClient(new AvayaUserClient.Config.ClientConfig({
        resources: res
      }));
      console.log('hello user client', this.userClient);
      const service = this.userClient.userService;
      console.log('hello user client 2');
    }, () => {
      alert('Error. Can not get resources');
    });


    window.localStorage.timeFormat = !!window.localStorage.timeFormat ? window.localStorage.timeFormat :  this.defaultTimeFormat;

    window.localStorage.enabledLogs = window.localStorage.enabledLogs ? JSON.parse(window.localStorage.enabledLogs) : true;
  }
}

