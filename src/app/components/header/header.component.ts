import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AboutComponent} from '../about/about.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationComponent} from '../authorization/authorization.component';
import {AuthorizationService} from '../../services/Authorization/authorization.service';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoginAvailable = true;
  logoutVisible = false;
  private logger = new Logger('HeaderController');

  constructor(public translate: TranslateService, public dialog: MatDialog, public authorizationService: AuthorizationService,
              private userSettingsService: UserSettingsService) {
  }

  ngOnInit(): void {
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

  showGuestSettings(): void {

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
}
