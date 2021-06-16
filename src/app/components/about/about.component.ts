import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';

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

  constructor(public userSettingsService: UserSettingsService) {
  }

  ngOnInit(): void {
  }

}
