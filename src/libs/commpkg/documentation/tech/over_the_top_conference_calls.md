{{= BackToPackageOverview }}

# Making a MeetMe conference call

Using the Client SDK, you can easily integrate the ability to join an Equinox conference call without the use of any telephony infrastructure. This is referred to as an Over the Top Call. Over the Top calls can only be outgoing calls.

To make a MeetMe conference call through HTTPUA, you must complete the following activities:

* Retrieve iView conference token through Unified Portal Service.
* Create a {{=Services_Call_Call}} object and initialize the details for the call
* Implement the call listener to monitor for call progress events
* Start the call
* End the call

## Retrieve iView conference token through Unified Portal Service.

```javascript
function  getConferenceToken (myMeetingInfo, userName) {
    var dfd = $.Deferred();
 
    var data = {
        conferenceId:myMeetingInfo.conferenceID,
        presentationOnly:false,
        userName:userName
    };
 
    var xmlhttp = new XMLHttpRequest();
    var url = myMeetingInfo.unifiedPortalURL;
    var middlewareTokenHref = url + '/ups/resources/middleware/token';
    xmlhttp.open('POST', middlewareTokenHref);
    xmlhttp.setRequestHeader('Accept',
        ['application/json' , 'text/plain', '*/*'].join(', '));
    xmlhttp.setRequestHeader('Content-Type',
        'application/json');
    xmlhttp.onload = function() {
        if (this.status == 200) {
            var receivedData = JSON.parse(this.responseText);
 
            if (receivedData.error) {
                dfd.reject("Failed to retrieve iView token: " +
                    receivedData.error.errorMsg);
            } else {
                dfd.resolve(receivedData.token);
            }
        } else {
            dfd.reject("Failed to retrieve iView token: " + this.status);
        }
    };
    var body = JSON.stringify(data);
    xmlhttp.send(body);
    return dfd.promise();
};
```

## Create a call object

```javascript
var calls = user.getCalls();
var callCreationInfo = 
	new AvayaClientServices.Services.Call.CallCreationInfo(remoteAddress);
callCreationInfo.setPortalToken(token);
callCreationInfo.setCallType(
	AvayaClientServices.Services.Call.CallType.CallTypeHttpMeetMe);
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

 
## Start the call

Once a call listener has been added, you can call the start() method on the {{=Services_Call_Call}} object. Call progress events will be provided through the callback function.

```javascript
call.start();
```

## End the call

To terminate the call, you can call the end() method on the {{=Services_Call_Call}} object.

```javascript
call.end();
```

The *onCallEndedCallback* function will be invoked when the call has been ended, and you can update the UI of your application inside the callback function.
