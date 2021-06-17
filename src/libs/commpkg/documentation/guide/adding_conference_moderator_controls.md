{{= BackToPackageOverview }}

#Moderator controls

Using the Avaya Client SDK, you can implement moderator controls for conferences.
To use moderator controls, you must create and start a conference call.

##Become a moderator

First, you should check capability to become moderator. You might need to add callbacks to be invoked when capability changed.

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var startModerationCapability = call.getConference().getRequestToBecomeModeratorCapability();

startModerationCapability.addOnChangedCallback(function () {
	if (startModerationCapability.isAllowed) {
		console.log("Start moderation function is allowed");
	} else {
		console.log("Start moderation function is forbidden");
	}
});
```

Once the capability to start moderation is allowed, you can request to become a moderator of this conference by calling *requestToBecomeModerator()* function of the {{=Services_Conference_Conference}} object with moderator's PIN. 

```javascript
var moderatorPin = '';
if (call.getConference().isPasscodeRequiredToBecomeModerator()) {
	moderatorPin = prompt('Enter Moderator PIN:');
}
call.getConference().requestToBecomeModerator(moderatorPin).then(
	function() {
		console.log("User became moderator successfully");
	},
	/**
     * @function
     * param {Object} error
     */
	function(error) {
		console.log("An attempt to become moderator has failed", error);
});
```

The conference call may also provide an audio prompt to input the participant’s or moderator’s code to join the conference. The user can pass this information by sending DTMFs. To enter digits, call the *sendDTMF()* function on the {{=Services_Call_Call}} object.

```javascript
call.sendDTMF(AvayaClientServices.Services.Call.DTMFTone.ONE);
call.sendDTMF(AvayaClientServices.Services.Call.DTMFTone.TWO);
call.sendDTMF(AvayaClientServices.Services.Call.DTMFTone.THREE);
```

To recognize whether a local participant is a moderator, use the *getModerateConferenceCapability()* capability exposed by the {{=Services_Conference_Conference}} class.

```javascript
if (call.getConference().getModerateConferenceCapability().isAllowed) {
    console.log("Moderator controls are available");
}
```

The moderator has full control of the conference and can assign roles to participants. The full list of moderator capabilities is available from the {{=Services_Conference_Conference}} class.

##Enable/disable the lecture mode

To check if the user can enable or disable the lecture mode, use the *isLectureModeActive()* function from the {{=Services_Conference_Conference}} class.

```javascript
if (!call.getConference().isLectureModeActive()) {
    console.log("Lecture mode can't be changed");
}
```

You might need to set and unset the participant as the conference lecturer using function *setAsLecturer()* and *unsetAsLecturer()* from the {{=Services_Conference_ActiveParticipant}} class.

First, you need to obtain activeParticipant class instance by using *getActiveParticipants()* function of the {{=Services_Conference_Conference}} object.

```javascript
var participant = conference.getActiveParticipants().find(function (currrentParticipant) {
    return currrentParticipant._participantId === participantId;
});
```

As a next step you can manage the participant's role on the conference.

```javascript
participant.addOnParticipantSetAsLecturerCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("Participant is now the conference lecturer");
	}
);

participant.addOnParticipantUnsetAsLecturerCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("Participant is no longer the conference lecturer");
	}
);

// Set the participant as the conference lecturer
participant.setAsLecturer().then(
    function() {
        console.log("Setting the participant as the conference lecturer has been successfully");
    },
    function (error) {
        console.error("Failed to set the participant as the conference lecturer", error);
    }
);

// Unset the participant as the conference lecturer
participant.unsetAsLecturer().then(
    function() {
        console.log("Unsetting the participant as the conference lecturer has been successfully");
    },
    function (error) {
        console.error("Failed to unset the participant as the conference lecturer", error);
    }
);
```

The conference object provides the *addOnConferenceLectureModeStatusChangedCallback()* callback that can be used to determine if the lecture mode is enabled or disabled.

```javascript
call.getConference().addOnConferenceLectureModeStatusChangedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {boolean} lectureModeStatus New lecture mode status of the conference
	 */ 
	function(conference, newLectureMode) {
		console.log("The conference lecture mode status changed to " + newLectureMode);
	}
);
```

##Mute all participants

The moderator can mute audio for all participants of the conference. To check if the mute all feature is allowed, use the *getMuteAllParticipantsCapability()* capability exposed by the {{=Services_Conference_Conference}} class.

```javascript
if (!call.getConference().getMuteAllParticipantsCapability().isAllowed) {
   console.log("Mute all is not available");
}
```

To mute all participants, use the *muteAllParticipants()* function of the {{=Services_Conference_Conference}} object.

```javascript
call.getConference().muteAllParticipants().then(
    function() {
        console.log("All participants were muted successfully");
    },
    function (error) {
        console.error("Failed to mute all participants", error);
    }
);
```

The {{=Services_Conference_ActiveParticipant}} object provides the *addOnParticipantAudioStatusChangedCallback()* callback that called to report that the audio direction changed for this participant.

```javascript
participant.addOnParticipantAudioStatusChangedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 * @param {AvayaClientServices.Services.Conference.MediaFromParticipantStatus} newStatus New audio status for this participant
	 */ 
	function(participant, newStatus) {
		console.log("Participant audio status changed to " + newStatus);
	}
);
```
