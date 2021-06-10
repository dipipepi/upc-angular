{{= BackToPackageOverview }}

# Retrieving meetings

The {{=MeetingManagementService}} provides functions for retrieving meetings.

In some functions you can use one or both boolean parameters:
*fetchPastMeetings - If it is true, response meeting array will be include only past meetings.
*detailed - In default, its value is true. In other words, Unified Portal Server server sends all of the conferences detailed informations. If it is false, Unified Portal Server only sends the generic informations (such as ConferenceId, Subject, StartTime and Duration) for the searched conferences.

## Retrieve meeting by ID:

```javascript
var meeting = client.meetingManagementService.getMeetingById(meetingId);
```

## Retrieve meetings by date:

```javascript
var meeting = client.meetingManagementService.getMeetingListByDate(date, fetchPastMeetings, detailed);
```

## Retrieve meetings by period:

```javascript
var meeting = client.meetingManagementService.getMeetingListByPeriod(startDate, endDate, fetchPastMeetings, detailed);
```

## Retrieve ongoing meetings:

```javascript
var meeting = client.meetingManagementService.getMeetingListIsOngoing(detailed);
```

## Retrieve meetings by status:

```javascript
var meeting = client.meetingManagementService.getMeetingListByStatus(status, detailed);
```

## Retrieve meetings which start by provided minutes:

```javascript
var meeting = client.meetingManagementService.getMeetingListStartsIn(minutes, detailed);
```
