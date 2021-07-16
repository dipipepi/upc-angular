import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GuestSettingsComponent} from '../../settings/guest-settings/guest-settings.component';
import {Logger} from '../../../../Logger';

@Component({
  selector: 'app-success-get-token',
  templateUrl: './success-get-token.component.html',
  styleUrls: ['./success-get-toket.component.less']
})
export class SuccessGetTokenComponent implements OnInit {
  oneTimePin: string;
  private logger = new Logger('JoinService');

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<SuccessGetTokenComponent>) {
    this.data = data;
  }

  ngOnInit(): void {
  }
  join(): void {
    this.logger.log('showAssignOneTimePin: assigned oneTimePin %o and call startConference again' + this.oneTimePin);
    this.data.confirm( this.data.options, this.oneTimePin);
    this.dialogRef.close();
  }
  cancelJoin(): void {
    this.logger.log('showAssignOneTimePin: join canceled');
    this.dialogRef.close();
  }

}
