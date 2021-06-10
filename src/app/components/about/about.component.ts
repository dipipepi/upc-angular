import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PortalResourcesServiceService} from '../../services/portal-resources-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {
  currentYear = new Date().getFullYear().toString();

  translateParams = {
    year: new Date().getFullYear().toString(),
    link: 'https://support.avaya.com/helpcenter/getGenericDetails?detailId=C200922314304731046'
  };

  constructor(public translate: TranslateService,
              public portalResourcesServiceService: PortalResourcesServiceService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
  }

}
