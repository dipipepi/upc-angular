{{= BackToPackageOverview }}

#Call Participant Information

Using the Avaya Client SDK, you can easily integrate the ability for users of your application to retrieve information about call participants.

The methods to retrieve participant information are different between a peer-to-peer call (P2P) and a conference call. For a P2P call, participant information is obtained from the {{=Services_Call_Call}} object whereas, for a conference call, information for the participant(s) are obtained from the {{=Services_Conference_Conference}} object.

##Retrieving participant info for a P2P call

To get the participant's name only, use the getRemoteDisplayName() function.

```javascript
var remotePartyName = call.getRemoteDisplayName();
```

To get full participant's data, use the getRemoteParticipant() function which returns the {{=Services_Conference_Participant}} object.

```javascript
var remoteParticipant = call.getRemoteParticipant();
```

##Retrieving participant info for a conference call

For a conference call, get a {{=Services_Conference_Conference}} object first using the {{=Services_Call_Call}}.getConference() function.

```javasscript
if (call.isConference()) {
    var conference = call.getConference();
}
```

From the {{=Services_Conference_Conference}} object, use the getActiveParticipants() function to retrieve a {{=Base_DataSet}} which contains all the active participants in the {{=Services_Conference_Conference}}. From the DataSet, information of an {{=Services_Conference_ActiveParticipant}} can be obtained by calling the appropriate method (e.g., for display name, use the getDisplayName() function).

```javascript
var participants = [];
conference.getActiveParticipants().forEach(function(participant) {
    participants.push(participant.getDisplayName());
});
```

