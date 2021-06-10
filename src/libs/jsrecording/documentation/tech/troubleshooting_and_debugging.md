{{= BackToPackageOverview }}

# Troubleshooting and Debugging

## Diagnostic Logging

Client SDK provides access to diagnostic events using 6 logging levels:

* ERROR
* WARN
* INFO
* DEBUG
* LOG

Client SDK may take advantage of the browser default logger. We recommend to register that AvayaRecordingClient.Config.Logger using {{=Config_ClientConfig}} object during Recording Management Package configuration

```javascript
var clientConfig = {
	authServer: authServer,
	serviceServer: serviceServer
	logger: logger
};
var client = AvayaRecordingClient(clientConfig);
```

## Implementing custom logger

To implement your own {{=Config_Logger}} create your own logger which implements methods like info, log, error etc.

```javascript
var MyLogger = {
	info : function () {
		// Implement your own custom logging behavior here
	}
}
```


