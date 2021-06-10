import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AboutComponent} from '../about/about.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationComponent} from '../authorization/authorization.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoginAvailable = true;

  constructor(public translate: TranslateService, public dialog: MatDialog) {
    translate.setDefaultLang('en');
    translate.use('en');
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


}
