{{= BackToPackageOverview }}

#Working with Credentials

All Client SDK services that depend on infrastructure services accessed over a network require login credentials. Applications are responsible for providing the login credentials to the Client SDK through the {{=Services_AuthenticationService}} interface.

##Registering for authentication on Avaya Equinox Streaming & Recording

To register for authentication a {{=AvayaRecordingClient}} instance must be created. Authorization occurs by the following sequence:

* The application sends a login request with credentials to the server side of the application
* The successfull response from the server contains the authorization token
* Then Authentication Service uses this token

```javascript
client.authenticationService.login(token);
```

When you call 'login(token)' from authenticationService the following sequence of events will occur:

* Authentication Service sends GET request to authorizationUrl defined by SDK configuration with Authorization header "Bearer [token]"
* Expected that the response will contain timestamp and token from Avaya Equinox Streaming & Recording(ACSR).
* Additionally Authentication Service starts innner daemon wich send the request every 15 minutes

ACSR token and timestamp keep in browser local storage.

##Log out Avaya Equinox Streaming & Recording

To log out, simply call

```javascript
client.authenticationService.logout();
```

After calling 'logout()' ACSR timestamp and token will be removed from the local storage.

##Authorized request

The most of Recording Management services for authorized requests require a 'user' parameter apart from token and timestamp on its URL. For example Program service creates request wich URL will contain *user=<user login>&timestamp=<ACSR timestamp>&token=<ACSR token>*:

```javascript
// Log in on ACSR
client.authenticationService.login(token);

// configure parameters for Program Service
var params = new AvayaRecordingClient.Services.ProgramService.ProgramParams({
        //...
        user: "<user login>"
    });

client.programService.getRecordedPrograms(params);
```


