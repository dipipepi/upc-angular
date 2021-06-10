{{= BackToPackageOverview }}

# Cancel meetings

The {{=MeetingManagementService}} provides functions for delete single meeting, occurrence in recurring series or all meetings in recurring series.

## Cancel single meeting:

```javascript
client.meetingManagementService.cancelMeeting(meetingId);
```

## Cancel occurrence in meeting series:

```javascript
client.meetingManagementService.cancelOccurrence(recurrenceId, occurrenceStartTime);
```

## Cancel meeting series:

```javascript
client.meetingManagementService.cancelSeries(recurrenceId);
```
