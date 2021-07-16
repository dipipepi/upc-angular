import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DateFormatService} from '../../shared/services/DateFormatService/date-format.service';
import {MeetingUtilsService} from '../../shared/services/MeetingUtilsService/meeting-utils.service';
import {ScheduleService} from '../../services/ScheduleService/schedule.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalService} from '../../services/GlobalService/global.service';
import {CustomDeviceDetectorService} from '../../services/CustomDeviceDetectorService/custom-device-detector.service';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.less']
})
export class ViewMeetingComponent implements OnInit, AfterViewInit {
  dateFormat = this.dateFormatService.getDateFormat();
  plannedEndMeetingTime = this.meetingUtils.plannedEndTime.bind(this.meetingUtils);
  isMeetingJoinable = this.scheduleService.isMeetingJoinable;
  mobileButton = !this.customDeviceDetector.isDesktop();
  // @ts-ignore
  currentTime = moment().valueOf();
  private element: HTMLElement;
  getAttendiesSeparator: (index: number, length: number) => string;

  constructor(private dateFormatService: DateFormatService,
              private meetingUtils: MeetingUtilsService,
              private scheduleService: ScheduleService,
              private customDeviceDetector: CustomDeviceDetectorService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ViewMeetingComponent>,
              public globalService: GlobalService) { }

  ngOnInit(): void {
    setTimeout(this.tick, (60 - new Date().getSeconds()) * 1000);
  }

  loaded() {
    this.loaded = undefined;
    this.element = document.getElementById(this.dialogRef.id);
    this.element.style.top = this.data.preferredTop + 'px';
    // @ts-ignore
    if (this.element.getBoundingClientRect().bottom > this.element.parentNode.getBoundingClientRect().bottom) {
      // @ts-ignore
      this.element.style.top = this.element.parentNode.getBoundingClientRect().height +
        // @ts-ignore
        this.element.parentNode.scrollTop - this.element.getBoundingClientRect().height - 40 + 'px';
    }
    this.element.style.left = this.data.preferredLeft + 'px';
    // @ts-ignore
    if (this.element.getBoundingClientRect().right > this.element.parentNode.getBoundingClientRect().right) {
      // @ts-ignore
      this.element.style.left = this.element.parentNode.getBoundingClientRect().width +
        // @ts-ignore
        this.element.parentNode.scrollLeft - this.element.getBoundingClientRect().width - 40 + 'px';
    }
    this.getAttendiesSeparator = this.meetingUtils.getAttendiesSeparator;
  }

  private tick(): void {
    // @ts-ignore
    this.currentTime = moment().valueOf();
    setTimeout(this.tick, 60000);
  }

  ngAfterViewInit(): void {
    this.loaded();
  }

}
