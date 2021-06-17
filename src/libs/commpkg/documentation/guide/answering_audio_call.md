{{= BackToPackageOverview }}

#Answering an Audio Call

Using the Avaya Client SDK, you can easily integrate the ability for users of your application to make and receive audio or video calls.

To receive and answer an incoming audio call, you must complete the following activities:

* Implement the call service callbacks to monitor for call service events
* Accept the incoming call

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

##Answer the incoming call

To answer the incoming call, you can call the accept() function on the incoming call object.

```javascript
call.accept();
```
