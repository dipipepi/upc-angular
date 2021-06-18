import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortalResourcesServiceService} from '../../services/portal-resources-service.service';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {TranslateService} from '@ngx-translate/core';
import {AUTH_TYPE, LOCAL_STORAGE, STATUS_CODE, ERROR_CODE} from '../../constants';
import {MatDialogRef} from '@angular/material/dialog';
import { Logger } from '../../../Logger';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {Observable, Subscription} from 'rxjs';

class MyDialogComponent {
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  oauth2ButtonEnabled = this.userSettingsService.portalResources.supportedAuthType === AUTH_TYPE.OAUTH_AND_PASSWORD ||
    this.userSettingsService.portalResources.supportedAuthType === AUTH_TYPE.OAUTH_ONLY;
  authFormEnabled = this.userSettingsService.portalResources.supportedAuthType !== AUTH_TYPE.OAUTH_ONLY;

  loading = false;
  isKeepMeSigned = false;
  isKeepMeDisabled = !window.localStorage;
  credentials = {
    login: '',
    password: '',
    valid: true
  };
  isForgotPasswordEnabled = false;
  useSSO = false;
  loadingMessage = 'LOGIN.SIGNING';
  message = '';

  authForm: FormGroup;
  private logger = new Logger('LoginController');
  private formSubscriber: Subscription;


  // redirectToOauth2 = () => AuthorizationService.redirectToOauth2();

  constructor(public portalResourcesServiceService: PortalResourcesServiceService,
              public authorizationService: AuthorizationService,
              public dialogRef: MatDialogRef<AuthorizationComponent>,
              public translate: TranslateService,
              private userSettingsService: UserSettingsService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      isKeepMeSigned: new FormControl(false)
    });
    this.onChanges();
  }

  showData(): void {}

  login(): Promise<any> {
    return this.authorizationService.login(false, this.authForm.value.login, this.authForm.value.password,
      this.authForm.value.isKeepMeSigned).then(this.onLoginSuccess, this.onLoginFailure);
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authorizationService.logout();
  }

  redirectToOauth2(): void {

  }

  signIn(): void {
    this.loading = true;
    this.credentials.valid = true;
    this.message = '';

    if (!window.localStorage) {
      this.logger.warn('Browser does not support localStorage.');
    }

    window.localStorage.removeItem(LOCAL_STORAGE.UPS_TOKEN);
    this.authorizationService.login(false, this.authForm.value.login, this.authForm.value.password,
      this.authForm.value.isKeepMeSigned)
      .then(this.onLoginSuccess.bind(this), this.onLoginFailure.bind(this));
  }

  onBlurLogin(): void {
    this.logger.log('onBlurLogin');

    if (this.authForm.value.login === '' || this.authForm.value.login === undefined || this.authForm.value.login === null) {
      this.logger.log('onBlurLogin: Login field is empty. Skip isLocalUser request');
      return;
    }

    // this.AuthorizationService.isLocalUser(this.credentials.login).then(
    //   (response) => {
    //     this.logger.log('onBlurLogin: isLocalUser=%s', response.data.local);
    //     this.isForgotPasswordEnabled = response.data.local;
    //   },
    //   () => {
    //     this.isForgotPasswordEnabled = false;
    //   }
    // );
  }

  onFocusLogin(): void {
    this.logger.log('onFocusLogin');
    this.isForgotPasswordEnabled = false;
  }

  remindPassword(): void {
    this.logger.log('Remind password. User login is \'%s\'', this.credentials.login);
    this.loadingMessage = 'LOGIN.LOADING';
    this.loading = true;
    // this.AuthorizationService.remindPassword(this.credentials.login).finally(() => {
    //   this.loading = false;
    //   this.loadingMessage = 'LOGIN.SIGNING';
    // }).then(
    //   () => {
    //     this.dialogRef.close();
    //     // this.MessageUtilsService.showPlainNotification(this.$translate.instant('LOGIN.POPUP.REMIND_PASSWORD_IN_EMAIL'), true);
    //   },
    //   () => {
    //     this.translate.get('LOGIN.ERROR.ERROR').subscribe((res: string) => {
    //       console.log(res);
    //       this.message = res;
    //     });
    //   }
    // );
  }

  resetField(field: string): void {
    const newValue = {};
    newValue[field] = '';
    this.authForm.patchValue(newValue);
  }

  private onLoginSuccess (response): void {
    this.logger.log('Close login dialog');
    this.dialogRef.close();
    return response;
  }

  private onLoginFailure (response): void {
    this.logger.log('Show error on login form');
    switch (response.status) {
      case STATUS_CODE.BAD_REQUEST:
        this.translate.get('LOGIN.ERROR.VALIDATION_FAILED').subscribe((res: string) => {
          console.log(res);
          this.message = res;
        });
        break;
      case STATUS_CODE.UNAUTHORIZED:
        if (response.error.error[0].errorCode === ERROR_CODE.AUTH.USER_AUTH_DISABLED) {
          this.translate.get('LOGIN.ERROR.USER_AUTH_DISABLED', { name: this.authForm.value.login }).subscribe((res: string) => {
            console.log(res);
            this.message = res;
          });
        } else {
          this.translate.get('LOGIN.ERROR.INVALID_CREDENTIALS').subscribe((res: string) => {
            console.log(res);
            this.message = res;
          });
        }
        this.credentials.valid = false;
        break;
      default:
        this.translate.get('LOGIN.ERROR.ERROR').subscribe((res: string) => {
          console.log(res);
          this.message = res;
        });
    }

    if(response.error.error[0].errorCode === ERROR_CODE.AUTH.ERC_AUTH_EMPTY_EMAIL){
      this.translate.get('LOGIN.ERROR.ERC_AUTH_EMPTY_EMAIL').subscribe((res: string) => {
        console.log(res);
        this.message = res;
        this.credentials.valid = false;
      });
    }
    this.logger.log('Error message is %s', this.message);
    this.loading = false;
  }

  makeCredentialsValid(): void {
    this.credentials.valid = true;
  }
  onChanges(): void {
    this.formSubscriber = this.authForm.valueChanges.subscribe(val => {
      this.credentials.valid = true;
    });
  }

  ngOnDestroy(): void {
    this.formSubscriber.unsubscribe();
  }
}
