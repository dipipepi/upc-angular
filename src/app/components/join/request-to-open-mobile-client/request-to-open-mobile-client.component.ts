import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JoinService} from '../../../services/JoinService/join.service';

@Component({
  selector: 'app-request-to-open-mobile-client',
  templateUrl: './request-to-open-mobile-client.component.html',
  styleUrls: ['../enter-name-to-join/enter-name-to-join.less']
})
export class RequestToOpenMobileClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<RequestToOpenMobileClientComponent>,
              private joinService: JoinService) { }

  ngOnInit(): void {
  }

  join() {
    setTimeout(() => {
      this.joinService.joinToMeeting(this.data.meeting.id, {
        name: this.data.meeting.name,
        audioOnly: !JSON.parse(window.localStorage.videoCallingPreferences)
      });
    }, 500);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

}
