{{= BackToPackageOverview }}

#Monitoring Participant Events

Using the Client SDK, you can easily monitor participant related events in a conference call.

For monitoring events related to the conference {{=Services_Conference_Participant}} (e.g., new participants joining the conference or participants dropping from the conference), you can add the appropiate callbacks.

##Implement DataSet change callbacks

To monitor active participants joining or leaving a conference, implement the callbacks for the {{=Base_DataSet}}<ActiveParticipant>. These callbacks are triggered whenever there is a change in the {{=Base_DataSet}} for the active participants.

```javascript
var activeParticipants = conference.getActiveParticipants();

activeParticipants.addOnDataSetChangedCallback (function(elementsChanged, changeType) {
       // Called to report that there is a change in the underlying
       // DataSet. DataSetChangeType indicates the type of changes in 
       // the DataSet (i.e., ITEM_ADDED, ITEM_DELETED or ITEM_UPDATED).
       // Add code to update application UI for added/deleted/updated
       // participants.
});

activeParticipants.addOnDataSetInvalidatedCallback(function () {
       // Called to report the underlying DataSet is no longer valid.
       // Add code to remove all the previous participant information
       // from the UI application.
});
```
