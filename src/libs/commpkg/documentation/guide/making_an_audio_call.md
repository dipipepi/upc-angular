{{= BackToPackageOverview }}

#Making an audio call

Using the Avaya Client SDK, you can easily integrate the ability for users of your application to make and receive audio or video calls.

To make an audio call, you must complete the following activities:

* Create a call object and initialize the details for the call
* Implement the call listener to monitor for call progress events
* Start the call
* End the call

## Create a call object

Creating a Call object allows you to set various properties for the call before the call is actually placed.

The Call object is created from the Calls service object. You can specify the phone number to dial by setting the remote address in a CallCreationInfo object.

```javascript
var calls = user.getCalls();
var callCreationInfo = new AvayaClientServices.Services.Call.CallCreationInfo(remoteAddress);
var call = calls.createCall(callCreationInfo);
```

## Implement the call callback

To monitor call progress events, the {{=Services_Call_Call}} object callback can be used. This callback provide notifications as the call state changes.

Your application can implements the callback function and can add it to the {{=Services_Call_Call}} object to receive callback notifications.

```javascript
call.addOnCallStartedCallback(function(call) {
		// Called to report that call has started (ie, call is in progress).
		// Add code here to update the UI as appropriate.
});

call.addOnCallRemoteAlertingCallback(function(call, hasEarlyMedia) {
		// Called to report that an outgoing call is ringing at the far end.
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

##Start the call

Once a call listener has been added, you can call the start() method on the {{=Services_Call_Call}} object. Call progress events will be provided through the callback function.

```javascript
call.start();
```

##End the call

To terminate the call, you can call the end() method on the {{=Services_Call_Call}} object.

```javascript
call.end();
```

The onCallEndedCallback function will be invoked when the call has been ended, and you can update the UI of your application inside the callback function.
