import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AboutComponent} from '../about/about.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationComponent} from '../authorization/authorization.component';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {BrowserInfoService} from '../../services/BrowserInfoService/browser-info.service';
import {BROWSERS, USER_TYPE} from '../../constants';
import {GuestSettingsComponent} from '../Settings/guest-settings/guest-settings.component';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoginAvailable = true;
  logoutVisible = false;
  browserOutOfDateMessage: string;
  browserNotSupportedMessage: string;
  isDesktop = this.customDeviceDetector.isDesktop();
  isOldEdge = this.browserInfoService.isItOldEdge;
  private logger = new Logger('HeaderController');

  constructor(public translate: TranslateService, public dialog: MatDialog, public authorizationService: AuthorizationService,
              private userSettingsService: UserSettingsService,
              public browserInfoService: BrowserInfoService,
              private customDeviceDetector: CustomDeviceDetectorService) {
    console.log('hello info', browserInfoService);
  }

  ngOnInit(): void {
    this.initBrowserMessages();
  }


  showAbout(): void{
    const dialogRef = this.dialog.open(AboutComponent, {
      data: {
        test: 4,
        isTest: true
      },
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }

  onSignIn(): void {
    const dialogRef = this.dialog.open(AuthorizationComponent, {
      data: {
        test: 4,
        isTest: true
      },
      panelClass: 'custom-dialog-container',
      position: {
        top: '5px',
        right: '5px'
      },
      autoFocus: false
    });

    dialogRef.afterOpened().subscribe(result => {
      this.isLoginAvailable = false;
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoginAvailable = true;
    });
  }

  logout(): void {
    this.authorizationService.logout();
  }

  showSettings(): void {
    if(this.authorizationService.userType === USER_TYPE.GUEST){
      this.showGuestSettings();
    } else {
      this.showUserSettings();
    }
  }

  showLogout($event?: MouseEvent): void {
    this.logger.info('Open logout popup');
    this.logoutVisible = true;
    document.addEventListener('click', this.hideLogout);
    $event.stopPropagation();
    console.log('hello event', this.userSettingsService, this.authorizationService);
  }

  private hideLogout = (): void => {
    this.logger.info('Hide logout popup');
    this.logoutVisible = false;
    document.removeEventListener('click', this.hideLogout);
  }

  private showGuestSettings(): void{
    const dialogRef = this.dialog.open(GuestSettingsComponent, {
      data: {
        test: 4,
        isTest: true
      },
      panelClass: 'settings-wrapper',
      autoFocus: false
    });
  }

  private showUserSettings(): void{}

  private initBrowserMessages(): void {
    this.browserOutOfDateMessage = '';
    this.browserNotSupportedMessage = '';
    this.browserInfoService.browserOutOfDateMsg().then( (res) => {
      this.browserOutOfDateMessage = res;
    });
    this.browserInfoService.browserNotSupportedMsg().then( (res) => {
      this.browserNotSupportedMessage = res;
    });
  }
}
