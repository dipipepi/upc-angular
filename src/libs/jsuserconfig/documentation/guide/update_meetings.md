{{= BackToPackageOverview }}

# Update meetings

The {{=MeetingManagementService}} provides functions for update single meeting, occurrence in recurring series or all meetings in recurring series.

## Update single meeting:

```javascript
var meeting = client.meetingManagementService.getMeetingById('123');

meeting.startTime = new Data();
meeting.duration = 'P0Y0M0DT0H30M0.000S';
...
meeting.waitingRoom = false;

client.meetingManagementService.updateMeeting(meeting);
```

## Update occurrence in meeting series:

```javascript
var meeting = client.meetingManagementService.getMeetingById('123');

meeting.startTime = new Data();
meeting.duration = 'P0Y0M0DT0H30M0.000S';
...
meeting.waitingRoom = false;

client.meetingManagementService.updateOccurrence(meeting);
```

## Update meeting series:

```javascript
var meeting = client.meetingManagementService.getMeetingById('123');

meeting.startTime = new Data();
meeting.duration = 'P0Y0M0DT0H30M0.000S';
...
meeting.waitingRoom = false;

client.meetingManagementService.updateSeries(meeting);
```
