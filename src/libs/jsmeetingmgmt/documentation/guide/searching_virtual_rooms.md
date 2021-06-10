{{= BackToPackageOverview }}

# Searching virtual rooms

The {{=MeetingManagementService}} provides functions for search virtual rooms.

## Search virtual rooms by part of name:

```javascript
var virtual_rooms = client.meetingManagementService.searchVirtualRoomsByName(tenantId, partOfVRName, offset, pageSize);
```

## Search virtual rooms by number:

```javascript
var virtual_rooms = client.meetingManagementService.searchVirtualRoomsByNumber(tenantId, number, offset, pageSize);
```

## Search virtual rooms by part of user name:

```javascript
var virtual_rooms = client.meetingManagementService.searchVirtualRoomsByUserName(tenantId, partOfUserName, offset, pageSize);
```
