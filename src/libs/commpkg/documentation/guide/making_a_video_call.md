{{= BackToPackageOverview }}

#Making a video call

Using the Avaya Client SDK, you can easily integrate the ability for users of your application to make and receive audio or video calls.

To make a video call, you must complete the following activities:

* Create a call object and initialize the details for the call
* Implement the callbacks to monitor for call progress events
* Assign video and start the call
* Activate the video resources
* End the call

##Create a call object

Creating a {{=Services_Call_Call}} object allows you to set various properties for the call before the call is actually placed.
The call object is created from the Call Service.

```javascript
var calls = user.getCalls();

// Specify the phone number to dial by setting the remote address.
var callCreationInfo = new AvayaClientServices.Services.Call.CallCreationInfo(remoteAddress);

var call = calls.createCall(callCreationInfo);
```

##Implement the call callbacks

To monitor call progress events, the {{=Services_Call_Call}} object callback can be used. This callback provide notifications as the call state changes.

Your application can implements the callback function and can add it to the {{=Services_Call_Call}} object to receive callback notifications.

Video calls use the same core notifications as audio calls, but additional ones exist for video.

```javascript
call.addOnCallStartedCallback(function(call) {
		// Called to report that call has started (ie, call is in progress).
		// Add code here to update the UI as appropriate.
});

call.addOnCallVideoChannelsUpdatedCallback(function(call) {
		// Called to report that video stream has been updated
		// Add code here to update the UI as appropriate.
});

call.addOnCallEstablishedCallback(function(call) {
		// Called to report that an outgoing call has been established 
		// (ie, far end has answered and speechpath has been established).
		// Add code here to update the UI as appropriate.
});

call.addOnCallEndedCallback(function(call) {
		// Called to report that call has ended.
		// Add code here to update the UI as appropriate.
});

call.addOnCallFailedCallback(function(call, callException) {
		// Called to report that call has failed and the failure reason
		// is described in the CallException code.
		// Add code here to update the UI as appropriate.
});
```

##Assign video and start the call

The application specifies a video call by setting video mode prior to invoking call.start().

```javascript
// Set the desired direction on the video channel
if (video-transmission-desired) {
	call.setVideoMode(VideoMode.SEND_RECEIVE);
}


// send the call to the remote address. There's no guarantee that it will 
// answer with bi-directional (or even any) video

call.start();
```

##Activate video resources

One video-related callback must be implemented on the {{=Services_Call_Call}}'s to allow your application to transmit or receive video with directions matching the one negotiated by the remote endpoint. Although bi-directional video is requested by the local application, the remote may support only uni-directional video, or it may not support video at all.

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
			localVideoControl.srcObject = null;
			remoteStream = mediaEngine.getVideoInterface().getRemoteMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(remoteStream)) {
				remoteVideoControl.srcObject = remoteStream;
			}
			break;
		case AvayaClientServices.Services.Call.MediaDirection.SEND_ONLY:
			localStream = mediaEngine.getVideoInterface().getLocalMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(localStream)) {
				localVideoControl.srcObject = localStream;
			}
			remoteVideoControl.srcObject = null;
			break;
		case AvayaClientServices.Services.Call.MediaDirection.SEND_RECV:
			localStream = mediaEngine.getVideoInterface().getLocalMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(localStream)) {
				localVideoControl.srcObject = localStream;
			}
			remoteStream = mediaEngine.getVideoInterface().getRemoteMediaStream(videoChannels[0].getChannelId());
			if (AvayaClientServices.Base.Utils.isDefined(remoteStream)) {
				remoteVideoControl.srcObject = remoteStream;
			}
			break;
		case AvayaClientServices.Services.Call.MediaDirection.INACTIVE:
		case AvayaClientServices.Services.Call.MediaDirection.DISABLE:
		default:
			localVideoControl.srcObject = null;
			remoteVideoControl.srcObject = null;
			break;
	}
} else {
	localVideoControl.srcObject = null;
	remoteVideoControl.srcObject = null;
}
				
});
```

##End the call

To terminate the call from the application, you can use the end() function on the call object.

```javascript
call.end();
```

The onCallEnded callback event is sent to the call listener when the call has been ended. Use this event to update the UI of your application.
Ending the call will release the video camera automatically. Again, see SdkSampleApp for the steps.

