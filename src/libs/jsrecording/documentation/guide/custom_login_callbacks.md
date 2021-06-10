{{= BackToPackageOverview }}

# Custom Login/Logout Callbacks

There is ability to add custom callbacks for {{=Services_AuthenticationService}}

## Add log in callback


```javascript
callback({
    client = new AvayaRecordingClient(clientConfig);

    client.authenticationService.turnToUserModeCallbacks.add(function() {
        //add your custom callback
    });
});
```

## Add log out callback

```javascript
callback({
    client = new AvayaRecordingClient(clientConfig);

    client.authenticationService.turnToGuestModeCallbacks.add(function() {
        //add your custom callback
    });
});
```