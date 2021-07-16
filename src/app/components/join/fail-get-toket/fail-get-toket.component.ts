import {Component, Inject, OnInit} from '@angular/core';
import {Logger} from '../../../../Logger';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-fail-get-toket',
  templateUrl: './fail-get-toket.component.html',
  styleUrls: ['./fail-get-toket.component.less']
})
export class FailGetTokenComponent implements OnInit {
  private startTime: number;
  private countDown: number;
  seconds: any;
  private counter: any;
  private logger = new Logger('JoinService');
  oneTimePin: string;

  constructor(public dialogRef: MatDialogRef<FailGetTokenComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.data = data;
  }

  ngOnInit(): void {
    this.startTime = new Date().getTime();
    this.countDown = 30;
    this.seconds = this.countDown;
    this.counter = setInterval(this.updateTime, 500);
  }

  join(): void {
    clearInterval(this.counter);
    this.logger.log('showWaitingForModerator: try to join again');
    this.data.confirm(this.data.options, this.oneTimePin );
    this.dialogRef.close('join canceled');
  }

  cancelJoin(): void {
    clearInterval(this.counter);
    this.logger.log('showWaitingForModerator: join canceled');
    this.dialogRef.close('join canceled');
  }

  private updateTime(): void {
    const currentTime = new Date().getTime();
    const diff = currentTime - this.startTime;
    this.seconds = this.countDown - Math.floor(diff / 1000);
    if (this.seconds < 1) {
      clearInterval(this.counter);
      this.join();
    }
  }
}
