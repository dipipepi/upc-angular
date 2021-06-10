{{= BackToPackageOverview }}

# Troubleshooting and Debugging

## Diagnostic Logging

Client SDK provides access to diagnostic events using 5 logging levels:

* ERROR
* WARN
* INFO
* DEBUG
* LOG

Client SDK may take advantage of the browser default logger. We recommend to register that AvayaMeetingManagementClient.Config.Logger using {{=Config_ClientConfig}} object during Meeting Management Package configuration

```javascript
var clientConfig = {
	resources: resources,
	logger: logger
};
var client = AvayaMeetingManagementClient(clientConfig);
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
