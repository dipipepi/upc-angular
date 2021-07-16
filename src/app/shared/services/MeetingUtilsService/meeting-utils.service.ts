import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingUtilsService {

  constructor() { }

  plannedEndTime(meeting: object): string{
    // @ts-ignore
    const parseDate = Date.parse(meeting.startTime);
    // @ts-ignore
    const plannedEndTime = new Date(parseDate + (this.durationToSeconds(meeting.duration)*1000));
    return plannedEndTime.toISOString();
  }

  durationToSeconds(duration: string | any): number{
    let seconds = 0;
    const days = duration.match(/(\d+)\s*D/);
    duration = duration.split('T');
    duration = duration.length > 1 ? duration[1] : duration[0];
    const hours = duration.match(/(\d+)\s*H/);
    const minutes = duration.match(/(\d+)\s*M/);
    if (days) {
      seconds += parseInt(days[1]) * 86400;
    }
    if (hours) {
      seconds += parseInt(hours[1]) * 3600;
    }
    if (minutes) {
      seconds += parseInt(minutes[1]) * 60;
    }
    return seconds;
  }

  durationToMinutes(duration: string | any): number{
    let minutes = 0;
    const days = duration.match(/(\d+)\s*D/);
    duration = duration.split('T');
    duration = duration.length > 1 ? duration[1] : duration[0];
    const hours = duration.match(/(\d+)\s*H/);
    const mins = duration.match(/(\d+)\s*M/);
    if (days) {
      minutes += parseInt(days[1]) * 24 * 60;
    }
    if (hours) {
      minutes += parseInt(hours[1]) * 60;
    }
    if (mins) {
      minutes += parseInt(mins[1]);
    }
    return minutes;
  }

  minutesToDuration(minutes: number): string{
    // @ts-ignore
    const duration = moment.duration(minutes, 'minutes');
    return 'P' + duration.years() + 'Y' + duration.months() + 'M' + duration.days() + 'DT' + duration.hours() + 'H' + duration.minutes() + 'M0.000S';
  }

  getAttendiesSeparator(index: number, length: number): string{
    return index !== length - 1 && index !== 2 ? ', ' : '';
  }
}
