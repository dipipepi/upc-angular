{{= BackToPackageOverview }}

# Developing conferencing applications

## Overview

The CSDK Communications Package API supports multiple Avaya conferencing platforms with a single API. Each conference platform has a different set of features, which are articulated dynamically to the Application via CSDK capabilities. Building on the Voice and Video call capabilities of the Communications Package, the conferencing service supports the following conference types:

* meetme conferencing - where the conference starts with users dialing into the conference bridge.
* adhoc conference escalation - where the conference starts as one or more calls, and participants and/or modalities are added to a single conference call.

Enhanced Conference - multiparty audio-video call, possibly with collaboration, conference participant information and rich conference control. It requires a conference server and can be created on Scopia Conferencing platform.

## Conference features

A conference supports different features based on its type. To recognize, whether the feature is available or not, you need to check the appropriate capability.
List of supported features:

Features                      | Enhanced conference (Conferencing 9) |	API to check the capability
------------------------------|:------------------------------------:|----------------------------------------
video                         | Supported                            |
add participant               | Supported only for moderator         | getAddParticipantViaDialoutCapability
add participant from the call | Supported only for moderator         | getAddParticipantFromCallCapability
drop participant              | Supported only for moderator         | getRemoveSelectParticipantCapability
roster list                   | Supported                            | getRetrieveParticipantListCapability
active talkers                | Supported                            | getActiveTalkerCapability
mute participant              | Supported                            | getMuteCapability
unmute participant            | Supported                            | getUnmuteCapability
mute all participants         | Supported only for moderator         | getMuteAllParticipantsCapability
unmute all participants       | Supported only for moderator         | getUnmuteAllParticipantsCapability
block participant video       | Supported                            | getBlockParticipantVideoCapability
unblock participant video     | Supported                            | getUnblockParticipantVideoCapability
video layout                  | Supported                            | getUpdateVideoLayoutCapability
lecture mode                  | Supported only for moderator         | 				-
lock conference               | Supported only for moderator         | getUpdateLockStatusCapability
recording                     | Supported only for moderator         | getStartRecordingCapability
terminate conference          | Supported only for moderator         | getTerminateConferenceCapability
conference chat               | Supported                            | getSupportInConferenceChatCapability
raise hand                    | Supported                            | getSupportRaiseHandCapability
extend meeting                | Supported only for moderator         | getExtendMeetingCapability
accept pending participant    | Supported only for moderator         | getAcceptPendingParticipantCapability
deny pending participant      | Supported only for moderator         | getDenyPendingParticipantCapability

## Start a Meetme conference

To join an enhanced conference, make a call to the conference bridge. The {{=Services_Call_CallCreationInfo}} class can be used to set the Conference ID and pass code if the conferencing platform supports prompt suppression.

```javascript
var calls = user.getCalls();

var callCreationInfo = new AvayaClientServices.Services.Call.CallCreationInfo(remoteAddress, presentationModeOnly, subject);
callCreationInfo.setConferenceID(conferenceID);
callCreationInfo.setPasscode(conferencePasscode);

var call = calls.createCall(callCreationInfo);
call.start();
```

![conference_1.png]({{=BpImages}}javascript/communication/tech/conference_1.png)

The conference may provide an audio prompt to input the participant’s or moderator’s code to join the conference. The user can pass this information by sending DTMFs. To enter digits, call the sendDTMF() method on the {{=Services_Call_Call}} object.

```javascript
call.sendDTMF(DTMF_digit);
```

### Conference tracking

To monitor call progress events, you need to use the addOnCallConferenceStatusChangedCallback callback provided by the {{=Services_Call_Call}} object. Interface for this callback function can be invoked when the status of conference associated with the call changes. 

```javascript
call.addOnCallConferenceStatusChangedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Call.Call} call
	 * @param {boolean} isConference true if the call has become a conference call and false, if the call is no longer a conference call.
	 * @param {string} uccpURL URL of the UCCP server that manages the conference.
	 * @param {string} webCollaborationURL URL of the Web Collaboration server that manages collaboration functionality of the conference.
	 */	
	function(call, isConference, uccpURL, webCollaborationURL) {
		if (isConference) {
			console.log("Conference status changed");
		}
	}
);
```

## Adhoc conference

### Merge two calls into a conference

To merge calls you need to check the getAddParticipantFromCallCapability() conference capability. If it is allowed, then you can use the addParticipantFromCall() method of the {{=Services_Conference_Conference}} object to process call merging:

```javascript
if (call.getConference().getAddParticipantFromCallCapability(existingCall).isAllowed) {
	ownerCall.getConference().addParticipantFromCall(existingCall).then(
		function() {
			console.log("Success adding call into the conference.");
		},
		function(error) {
			console.error("Error when adding call into the conference", error);
		}
	);
}
```

Remote parties will be also promoted to the conference call and receive the \_onCallConferenceStatusChangedCallbacks() notification.
If a conference URI is provided and clients call the conference bridge successfully, then an enhanced conference is created.

![conference_2.png]({{=BpImages}}javascript/communication/tech/conference_2.png)

The participants will receive the {{=Services_Call_Call}}._onCallConferenceStatusChangedCallbacks() notification for the call.

![conference_3.png]({{=BpImages}}javascript/communication/tech/conference_3.png)

### Add a 3rd participant to an existing call to convert it into a conference

To add a participant to the call, use the addParticipant() method on the {{=Services_Conference_Conference}} object.

```javascript
if (call.getConference().getAddParticipantViaDialoutCapability().isAllowed) {
	call.getConference().addParticipant(participantAddress).then(
		function () {
			console.log("Participant with address " + participantAddress + " was added to the conference successfully");
		},
		function (error) {
			console.error("Failed to add participant with address " + participantAddress + " to the conference", error);
		}
	);
}
```

![conference_4.png]({{=BpImages}}javascript/communication/tech/conference_4.png)

If the conference URI is provided and clients call the conference bridge successfully, then an enhanced conference is created.

### Create a conference by selecting parties

To create a conference for selected parties, you need to create a call, add participants and then start the conference. If the conference URI is provided and clients call the conference bridge successfully, then an enhanced conference will be created.

![conference_5.png]({{=BpImages}}javascript/communication/tech/conference_5.png)

## Leave a conference

To leave the conference, you can just end the call that is associated with the conference:

```javascript
call.end();
```

You might need to add callbacks that will be invoked when a call is ended either locally or remotely. If the call ended successfully, the \_onCallEndedCallbacks() method of the {{=Services_Call_Call}} object will be fired.

```javascript
call.addOnCallEndedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Call.Call} call
	 */
	function() {
		console.log("Call ended successfully");
	}
);
```
![conference_6.png]({{=BpImages}}javascript/communication/tech/conference_6.png)

An enhanced conference will not deescalate to a peer-to-peer call. The enhanced conference can be maintained with a single conference participant. The enhanced conference may terminate when the moderator leaves the conference.

## Terminate Conference

If you are the moderator of an enhanced conference, you can terminate the conference for all parties.

```javascript
if (call.getConference().getTerminateConferenceCapability().isAllowed) {
	call.getConference().terminateConference().then(
		function () {
			console.log("The conference was closed");
		},
		function (error) {
			console.error("Failed to close the conference", error);
		}
	);
}
```

![conference_7.png]({{=BpImages}}javascript/communication/tech/conference_7.png)

The call will be ended for the participants and they will receive the {{=Services_Call_Call}}._onCallEndedCallbacks() callback.

## Video in the conference

To get info about a video call, you must complete the following activities <a href="../guide/making_a_video_call.gsp">Making a Video Call</a>.
The enhanced conference supports video calling. If your client supports video, you can establish a video conference call or add video to the existing audio conference call.
Note: Some devices do not support default video parameters provided by a conference. The user should ask the solution administrator to configure the special conference settings to support video in a conference call.
To check if video is not denied for the conference use the {{=Services_Conference_Conference}}.isVideoAllowed() method. 

### Video layout

You can change the video layout if the conferencing platform supports it. To get the current video layout option, use the getCurrentVideoLayout() method of the {{=Services_Conference_Conference}} object. If it returns *undefined*, then the conference server does not support video layout selection. 
To check if you are allowed to change the video layout, use the getUpdateVideoLayoutCapability() capability.  Use the getSupportedVideoLayoutList() method to show supported layouts. To set another layout, use the setVideoLayout() method. 
To show participant names use the setDisplayVideoParticipantName() method. You can check if the names are shown with the use of the isVideoParticipantNameDisplayActive() method. 
To check if you are allowed to hide or show the self video in the layout use the getUpdateVideoSelfSeeCapability() capability. Use the setVideoSelfSee() method for hiding or showing. You can check if you see the self video using isVideoSelfSeeActive(). 
To check if you are allowed to pin a specific participant's video in a specific position of the current video layout use the getVideoPinCapability() capability. Use the pinVideoByCoordinates() method with required coordinates to change the position. 

## Roster list

The roster list is used to show information about the conference participants and their current status: 

- participant name - {{=Services_Conference_Participant}}.getDisplayName()
- audio status - shows participant's audio mute status - {{=Services_Conference_ActiveParticipant}}.isAudioMuted()
- video status - shows participant's video transmission status - {{=Services_Conference_ActiveParticipant}}.isVideoBlocked()
- participant role - {{=Services_Conference_ActiveParticipant}}.isModerator(), {{=Services_Conference_ActiveParticipant}}.isLecturer(), {{=Services_Conference_ActiveParticipant}}.isPresenter()
- participant supports collaboration - {{=Services_Conference_Conference}}.isApplicationSharingActive()
- participant talks - last active talkers list {{=Services_Conference_Conference}}.getRecentTalkers()
- last spoken time - {{=Services_Conference_ActiveParticipant}}.getLastSpokenTime()

### Initiate a roster list
To get roster list you should check the {{=Services_Conference_Conference}}.getRetrieveParticipantListCapability() capability. If it is allowed, you can start initializing the roster view with the current participants.

```javascript
if (conference.getRetrieveParticipantListCapability().isAllowed) {
	var participants = call.getConference().getActiveParticipants();
}
```

### Handle roster updates

Two types of participants can be shown on the roster list: 

- active participants - the participants who are in the conference call. 
- pending participants - the participants who are waiting to be accepted to join the locked conference. 
-- pending participant can be denied if the {{=Services_Conference_Conference}}.getDenyPendingParticipantCapability() capability is allowed to use the deny() method of the {{=Services_Conference_PendingParticipant}} object. 
-- pending participant can be accepted if the {{=Services_Conference_Conference}}.getAcceptPendingParticipantCapability() is allowed to use the accept() method of the {{=Services_Conference_PendingParticipant}} object. 
 

You need to use the following callbacks of {{=Services_Conference_Conference}} to update the participants: 

```javascript
// Called to report that multiple participants have been added from the conference.
call.getConference().addOnConferenceParticipantsAddedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {Array<AvayaClientServices.Services.Conference.Participant>} addedParticipants List of participants who have been added to conference call.
	 */
	function(conference, addedParticipants) {
		console.log("Multiple participants have been added locally or remotely, or are already on the conference call");
	}
);

// Called to report that multiple participants have been removed from the conference.
call.getConference().addOnConferenceParticipantsRemovedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {Array<AvayaClientServices.Services.Conference.Participant>} removedParticipants List of participants who has been removed from the conference call.
	 */
	function(conference, removedParticipants) {
		console.log("Multiple participants have been removed from the conference");
	}
);

// Called to report that a participant is waiting to join the call.
call.getConference().addOnConferencePendingParticipantCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {Array<AvayaClientServices.Services.Conference.Participant>} participant Participant who is waiting to join the call.
	 */
	function(conference, participant) {
		console.log("The participant is waiting to join the call");
	}
);

// Called to report that a participant who has been waiting to join the call is no longer waiting.
conference.addOnConferencePendingParticipantRemovedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {AvayaClientServices.Services.Conference.Participant} participant Participant who is waiting to join the call.
	 */
	function (conference, participant) {
		console.log("The participant who has been waiting to join the call is no longer waiting");
	}
);
```

### Participant updates

To monitor active participant's updates, you need to use the {{=Services_Conference_ActiveParticipant}} class. {{=Services_Conference_ActiveParticipant}} provides callbacks report about the audio status, video status, participant roles, connection status and collaboration status.  

```javascript
paricipant.addOnParticipantAudioStatusChangedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 * @param {AvayaClientServices.Services.Conference.MediaFromParticipantStatus} newStatus New audio status for this participant
	 */
	function(participant, newStatus) {
		console.log("Audio status has been changed, new status: " + newStatus);
	}
);
```

### Talkers

You can get the list of participants who recently talk using the getRecentTalkers() method of the {{=Services_Conference_Conference}} object.    

```javascript
var recentTalkers = call.getConference().getRecentTalkers();
```

The Talker list may return up to 4 talkers (Conferencing 9). 
The Talker list is ordered, a descending list by energy (loudest first).
The Talker list may be empty (nobody is speaking). 

### Conference roles

Active participants can have the following roles:

* moderator
* lecturer
* presenter

The moderator has full control of the conference and can assign roles to participants. To become the moderator, a participant needs to join the meeting using the moderator code. To recognize, whether a local participant is the moderator, use the {{=Services_Conference_Conference}}.getModerateConferenceCapability() capability. 
You might need to add callbacks to report that a participant has been set or unset as moderator.

```javascript
participant.addOnParticipantSetAsModeratorCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("The participant has been set as moderator");
	}
);

participant.addOnParticipantUnsetAsModeratorCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("The participant has been unset as moderator");
	}
);
```

To check if the participant is moderator use isModerator() method of the {{=Services_Conference_ActiveParticipant}} object.

The lecturer is a participant who can talk and show video when the lecture mode is enabled. It is a moderator by default. The moderator can assign this role to a participant if the {{=Services_Conference_Participant}}.getAssignParticipantAsLecturerCapability() capability is allowed. 
To assign the lecturer role, use the setAsLecturer() method of the {{=Services_Conference_ActiveParticipant}} object. If the operation is successful, the \_onParticipantSetAsLecturerCallbacks() method of the {{=Services_Conference_ActiveParticipant}} object will call to report that this participant is now the conference lecturer. 

```javascript
if (activeParticipant.getAssignParticipantAsLecturerCapability().isAllowed) {
	activeParticipant.setAsLecturer();
}
```

The role can be unassigned by the moderator using unsetAsLecturer() method of the {{=Services_Conference_ActiveParticipant}} object.
To check if the participant is lecturer use isLecturer() method of {{=Services_Conference_ActiveParticipant}} object.

The presenter is a participant who can start screen sharing if the conference and the participant support collaboration capability is allowed.
You might need to add callbacks to report that a participant has been set or unset as presenter.

```javascript
participant.addOnParticipantSetAsPresenterCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("The participant has been set as presenter");
	}
);

participant.addOnParticipantUnsetAsPresenterCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.ActiveParticipant} participant
	 */
	function(participant) {
		console.log("The participant has been unset as presenter");
	}
);
```

To check if the participant is presenter use isPresenter() method of {{=Services_Conference_ActiveParticipant}} object.

### Raise Hand

To get the moderator's attention who can unmute and hence allow the participant to speak the local participant, being the presenter, may use the raise hand feature. To check if the raise hand feature is allowed, use the {{=Services_Conference_Conference}}.getSupportRaiseHandCapability() capability. To raise the hand use the raiseHand() method of the {{=Services_Conference_Conference}} object. If the operation is successful, the \_onParticipantHandRaisedCallbacks() method of the {{=Services_Conference_ActiveParticipant}} object will be fired.
When you don't need the moderator's attention anymore, you can lower the hand. To check if lowing the hand is allowed, use the {{=Services_Conference_Conference}}.getSupportLowerHandCapability() capability. To lower the hand, use the lowerHand() method of the {{=Services_Conference_Conference}} object. If the operation is successful, the \_onParticipantHandLoweredCallbacks() method of the {{=Services_Conference_ActiveParticipant}} object will be fired.
To check if the participant's hand is raised, use the isHandRaised() method of {{=Services_Conference_ActiveParticipant}} object.

![conference_8.png]({{=BpImages}}javascript/communication/tech/conference_8.png)

## Conference Control

Conference control provides an interface for interaction with the conference features allowed for the moderator.

### Mute participants

The moderator can mute audio for all participants of the conference. To check if the mute all feature is allowed, use the {{=Services_Conference_Conference}}.getMuteAllParticipantsCapability() capability. To mute all the participants, use the muteAllParticipants() method of the {{=Services_Conference_Conference}} object. All the participants will be muted except for other moderators, lecturers and presenters.
If the operation is successful, the \_onConferenceAllParticipantsMutedCallbacks method of the {{=Services_Conference_Conference}} object will be fired.
The moderator can mute audio for a certain participant. To check if muting is allowed for the participant use the getMuteParticipantAudioCapability() capability of the {{=Services_Conference_Participant}} object. To mute a participant, use the mute() method of the {{=Services_Conference_ActiveParticipant}} object.

![conference_9.png]({{=BpImages}}javascript/communication/tech/conference_9.png)

### Block participant video

The moderator can block video for a certain participant. 
To check if blocking is allowed, use the getBlockParticipantVideoCapability() capability of the {{=Services_Conference_Participant}} object. To block video for a participant use the blockVideo() method method of the {{=Services_Conference_ActiveParticipant}}.
If the operation is successful, the \_onParticipantVideoStatusChangedCallbacks method of the {{=Services_Conference_ActiveParticipant}} object wioll be fired.

![conference_10.png]({{=BpImages}}javascript/communication/tech/conference_10.png)

### Lecture mode

In this mode one of the conference participants is chosen as a lecturer. Other participants are automatically muted. The lecturer sees a continuous presence layout. The participants see the video of the lecturer.

To check if the user can enable or disable the lecture mode, use the isLectureModeActive() function from the {{=Services_Conference_Conference}} class.

```javascript
if (!call.getConference().isLectureModeActive()) 
{
   console.log("Lecture mode can't be changed");
}
```

The {{=Services_Conference_Conference}} object provides the addOnConferenceLectureModeStatusChangedCallback callback that can be used to determine if the lecture mode is enabled or disabled.

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

![conference_11.png]({{=BpImages}}javascript/communication/tech/conference_11.png)

### Lock conference

The moderator can lock the meeting to prevent additional participants from joining the conference.

```javascript
var isLocked = true;

if (call.getConference().getUpdateLockStatusCapability().isAllowed) {
	call.getConference().setLocked(isLocked).then(
		function () {
			console.log("The conference was " + (isLocked ? "locked" : "unlocked"));
		},
		function (error) {
			console.error("Failed to " + (isLocked ? "locked" : "unlocked") + "the conference", error);
		}
	);
}
```

The {{=Services_Conference_Conference}} object provides the addOnConferenceLockStatusChangedCallback callback that can be used to determine if the lecture mode is enabled or disabled.

```javascript
call.getConference().addOnConferenceLockStatusChangedCallback(
	/**
	 * @function
	 * @param {AvayaClientServices.Services.Conference.Conference} conference
	 * @param {boolean} lockStatus New lock status of the conference
	 */ 
	function(conference, newLectureMode) {
		console.log("The conference lock status changed.");
	}
);
```
If the conference lock status changed successfully, the \_onConferenceLockStatusChangedCallbacks method of the {{=Services_Conference_Conference}} object will be filed.

![conference_12.png]({{=BpImages}}javascript/communication/tech/conference_12.png)

## Recording

The moderator can initiate and stop recording using the UC client or the DTMF command. Once the recording is enabled, a voice announcement is played to participants. Additionally, the link to the recording is generated and is available to the moderator for sharing.
The following methods of the {{=Services_Conference_Conference}} object can be used to control the recording:

Method                                                                                                     | API to check the capability
-----------------------------------------------------------------------------------------------------------|-------------------------------
startRecording(name, description)                                                                          | getStartRecordingCapability()
pauseRecording()                                                                                           | getPauseRecordingCapability()
resumeRecording()                                                                                          | getResumeRecordingCapability()
stopRecording()                                                                                            | getStopRecordingCapability()

The {{=Services_Conference_Conference}} object provides the addOnConferenceRecordingStatusChangedCallback callback that can be used to determine when the recording is enabled or disabled.
A visual recording indication on the UI can be shown to inform the participants that the session is being recorded.

![conference_13.png]({{=BpImages}}javascript/communication/tech/conference_13.png)

## Extend Meeting

The Extend Meeting setting allows the moderator to extend the current meeting end time by the specified number of minutes.

```javascript
if (call.getConference().getExtendMeetingCapability().isAllowed) {
	call.getConference().extendMeeting(additionalTimeInMinutes).then(
		function() {
			console.log("Extend started.");
		},
		function(error) {
			console.error("Extend meeting cannot be done.", error);
		}
	);
}
```

The conference listener provides the \_onCallEndedCallbacks callback that can be used to determine the end time of the meeting.

![conference_14.png]({{=BpImages}}javascript/communication/tech/conference_14.png)

## Conference Chat

In-conference chat allows conference participants to exchange messages amongst each other without interrupting the speaker. These messages can either be private between selected participants or shared with all conference participants.

### Discover if conference chat is supported and initiate chat

To initiate chat you need to check the getSupportInConferenceChatCapability() conference capability. If it is allowed, you can use the getInConferenceChat() method of the {{=Services_Conference_Conference}} object to get the Chat object. Then you should add callbacks, which report about the chat session status and chat messages.

```javascript
if (call.getConference().getSupportInConferenceChatCapability().isAllowed) {
	var chat = call.getConference().getInConferenceChat();
}
```

In order to identify who sent incoming message and to send private message to specific participant, you need to get list of active participants.

### Receiving Chat Messages

The messages parameter is an array of the ChatMessage objects that have changed. Each ChatMessage object contains following methods.

Property                                                                  | Value
--------------------------------------------------------------------------|-------------------------------
getId()                                                                   | string to identify message
getTime()                                                                 | the time when the message was sent
getMessageContent()                                                       | text of message
getSender()                                                               | Participant who sent message
getRecipient()                                                            | Participant who received message
isPrivate()                                                               | true, if it’s private message

### Manage Public Chat

You can send a public chat message which can be seen by all conference participant.

```javascript
chat.sendPublicMessage(message).then(
	function() {
		console.log("Public message has sent successfully.");
	},
	function(error) {
		console.error("An attempt to send public message has failed.", error);
	}
);
```

### Manage Private Chat

To send private chat message to given {{=Services_Conference_Participant}} call the sendPrivateMessage() method of the {{=Services_Conference_Chat}}. object.

```javascript
chat.sendPrivateMessage(participant, message).then(
	function() {
		console.log("Private message has sent successfully.");
	},
	function(error) {
		console.error("An attempt to send private message has failed.", error);
	}
);
```

## Supported Conference Platforms

- Conferencing 9

## Solution restrictions / Limitations
1. If you have many logged in users for one extension (for example MDA or EC500), you will have a remote call if another user makes the call to the conference bridge. You will be able to join this conference, but the roster list and moderator controls will be unavailable.
2. No video is available in a conference call due to CPU overloads
3. Information about the number of participants in a CM conference is not available.
4. If the network is unstable, a conference call can be lost. CLIENTSDK-11206 Collab stops; video freezes; no audio; active talker freezes; hold disabled
5. The video call can be established in a CM conference between two participants if only they support video.
6. If a participant drops from the conference due to a connection issue, then other participants will see the roster list updated not immediately (it usually takes several minutes: 5-10).
