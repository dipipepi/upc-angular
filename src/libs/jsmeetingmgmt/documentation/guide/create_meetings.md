{{= BackToPackageOverview }}

# Create meetings

The {{=MeetingManagementService}} provides function for create meetings.

See {{=MeetingManagementService_Meeting}} for getting info about meeting object fields.

## Create meeting:

```javascript
var meetingData = {
	startTime: new Data(),
	duration: 'P0Y0M0DT0H30M0.000S',
	...
	waitingRoom: false
};

var meeting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting(meetingData);

client.meetingManagementService.createMeeting(meeting);
```

OR:

```javascript
var meeting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting();

meeting.startTime = new Data();
meeting.duration = 'P0Y0M0DT0H30M0.000S';
...
meeting.waitingRoom = false;

client.meetingManagementService.createMeeting(meeting);
```
