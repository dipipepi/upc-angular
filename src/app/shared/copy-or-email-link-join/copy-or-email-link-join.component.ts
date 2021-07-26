import {Component, Input, OnInit} from '@angular/core';
import { Logger } from '../../../Logger';
import {TranslateService} from '@ngx-translate/core';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';
import {GlobalService} from '../../services/GlobalService/global.service';

@Component({
  selector: 'app-copy-or-email-link-join',
  templateUrl: './copy-or-email-link-join.component.html',
  styleUrls: ['./copy-or-email-link-join.component.less']
})
export class CopyOrEmailLinkJoinComponent implements OnInit {
  @Input() externalClass: string;
  @Input() url: string;

  logger = new Logger('CopyOrEmailLinkDirective');
  shareLinkName = this.translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.EMAIL_INVITE');
  shareOptions = [];
  private controller: this;

  constructor(public translate: TranslateService,
              private customDeviceDetector: CustomDeviceDetectorService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    const controller = this;
    this.shareOptions.push({
      name: this.shareLinkName,
      func: this.emailInvite
    });

    this.shareOptions.push({
      name: this.translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.COPY'),
      func () {},
      isCopyLink: true,
      generateLink: () => {
        return this.url;
      }
    });

    this.shareOptions.push({
      name: this.translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.CANCEL'),
      func() {},
      class: 'cancel',
      redefineByCondition(attr) {
        if (controller.customDeviceDetector.isDesktop()) {
          this.class += ' dropdown-item-hide';
        }
      }
    });
  }

  emailInvite = () => {
    // this.logger.log('Email invite. \'Recording\' option is %s', !!$scope.recording);
    const userName = encodeURIComponent(this.globalService.user.name);
    const userLastName = encodeURIComponent(this.globalService.user.lastName);
    window.location.href = 'mailto:?subject=' + this.translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.EMAIL_INVITE_MEETING_SUBJECT',
      { fullName: userName + ' ' + userLastName }) + '&body=' +
      this.translate.instant('UTILITIES.COPY_OR_EMAIL_LINK.EMAIL_INVITE_MEETING_BODY',
        { url: encodeURIComponent(this.url), name: userName });
  }

}
