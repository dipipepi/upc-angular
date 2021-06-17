{{= BackToPackageOverview }}

#Answering a Video Call

Using the Avaya Client SDK, you can easily integrate the ability for users of your application to make and receive audio or video calls.

To receive and answer an incoming video call, you must complete the following activities.

* Implement the call service callbacks to monitor for call service events
* Detect the presence of offered video
* Accept the incoming video call
* Activate video resources
* End the call

##Implement the call service callbacks

In order to get notifications for any incoming calls, your application can implements and adds callbacks to the {{=Services_Call_Calls}} object to receive call service notifications.

```javascript
calls.addOnIncomingCallCallback(function(call) {
		// Called to report that there is an incoming call. 
		// Add code here to handle this incoming call, eg, 
		// update UI to alert user, provide options for handling 
		// the call, ... etc.
});

calls.addOnCallRemovedCallback(function(call) {
		// Called to report that the call has been removed before 
		// answer.
		// Add code here to handle the removed call, eg, 
		// update UI to remove the call... etc.
});
```


When there is an incoming call, the {{=Services_Call_Calls}}.addOnIncomingCallCallback() callback function is called with a {{=Services_Call_Call}} object in the arguments. 

##Detect the presence of offered video

Any incoming call may include video, and the App needs to use the getIncomingVideoOffered API on the Call to determine the call's offer status. The API returns one of three values which the application must handle

* SUPPORTED. The calling party included video when making the call. If desired, the application can answer with bi-directional or reception-only video.
* INDEFINITE. The calling party may or may not have included video when making the call. Due to requirements of some calling endpoints, it's highly recommended that the application answer with reception-only video. If this is not done, some endpoints will never be able to establish a video session with the application.
* OFF. The calling party did not include video when making the call. The application should not answer the call with video.

```javascript
var incomingVideoOffered = call.getIncomingVideoOffered();
```


##Accept the incoming video call

The application accepts a video call by setting video mode prior to invoking call.accept().

```javascript
// Set the desired direction on the video channel
if (video-transmission-desired) {
call.setVideoMode(AvayaClientServices.Services.Call.VideoMode.SEND_RECEIVE);

// Answer the call. Note that there's no guarantee that it will 
// start with the expected video direction (or any video).
call.accept();
```

##Activate video resources

One video-related callback must be implemented on the {{=Services_Call_Call}}'s to allow your application to transmit or receive video with directions matching the one negotiated by the remote endpoint. Although bi-directional or receive-only video is requested by the local application, the remote's video direction may not be compatible.

```javascript
call.addOnCallVideoChannelsUpdatedCallback(function(call) {
var mediaEngine = client.getMediaServices();
var videoChannels = call.getVideoChannels();

// Retrieve the local and remote HTML video elements. 
// Both the local and remote video elements should have both autoplay and muted properties set.
var localVideoControl = document.getElementById('localVideo');
var remoteVideoControl = document.getElementById('remoteVideo');

if (videoChannels[0]) {
	var localStream;
	var remoteStream;
	switch (videoChannels[0].getNegotiatedDirection()) {
		case AvayaClientServices.Services.Call.MediaDirection.RECV_ONLY:
			localVideoControl.src = '';
			remoteStream = mediaEngine.getVideoInterface().getRemoteMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(remoteStream)) {
				remoteVideoControl.src = URL.createObjectURL(remoteStream);
			}
			break;
		case AvayaClientServices.Services.Call.MediaDirection.SEND_ONLY:
			localStream = mediaEngine.getVideoInterface().getLocalMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(localStream)) {
				localVideoControl.src = URL.createObjectURL(localStream);
			}
			remoteVideoControl.src = '';
			break;
		case AvayaClientServices.Services.Call.MediaDirection.SEND_RECV:
			localStream = mediaEngine.getVideoInterface().getLocalMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(localStream)) {
				localVideoControl.src = URL.createObjectURL(localStream);
			}
			remoteStream = mediaEngine.getVideoInterface().getRemoteMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(remoteStream)) {
				remoteVideoControl.src = URL.createObjectURL(remoteStream);
			}
			break;
		case AvayaClientServices.Services.Call.MediaDirection.INACTIVE:
		case AvayaClientServices.Services.Call.MediaDirection.DISABLE:
		default:
			localVideoControl.src = '';
			remoteVideoControl.src = '';
			break;
	}
} else {
	localVideoControl.src = '';
	remoteVideoControl.src = '';
}
				
});
```

##End the call

To terminate the call from the application, you can use the end() function on the call object.

```javascript
call.end();
```

The addOnCallEndedCallback is triggered when the call has been ended. Use this event to update the UI of your application.
Ending the call will release the video camera automatically. Again, see SdkSampleApp for the steps.

