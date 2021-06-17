{{= BackToPackageOverview }}

# Troubleshooting and Debugging

## Diagnostic Logging

Client SDK provides access to diagnostic events using 6 logging levels:

* ERROR
* WARN
* INFO
* DEBUG
* FATAL
* TRACE

Client SDK may take advantage of the browser default logger. We recommend to register that logger right after creating {{=AvayaClientServices}} instance object using {{=AvayaClientServices}}.registerLogger() method.

```javascript
var client = new AvayaClientServices();
client.registerLogger(window.console);
```

## Implementing custom diagnostic logging behavior

To implement your own logging behavior first create your own logger which implements methods like info, log, error etc.

```javascript
var MyLogger = {
	info : function () {
		// Implement your own custom logging behavior here
	}
}
```

Then use {{=AvayaClientServices}}.registerLogger() method to implement your logger.

```javascript
client.registerLogger(MyLogger);
```

## Google Analytics

Client SDK may optionally be configured to use Google Analytics to collect, process, and store activities of application users, to track feature usage and improve the quality of Client SDK.  Google Analytics data collection is disabled by default, and the end user must specifically opt-in for the collection of analytics. Analytics data collected about Client SDK is available to Avaya Employees only, and cannot be shared with third party developers or end users.  

To enable Google Analytics within Client SDK requires the Google Analytics Terms and Conditions to be met.

> You will give end users proper notice about the use of Google Analytics for the collection of quality improvement metrics for the Avaya Communications Package when it is enabled in your application.  You must either get consent from the end user to enable Google Analytics, or provide them with the opportunity to opt-out of analytics collection.

<a href="https://developers.google.com/analytics/devguides/collection/protocol/policy" target="_blank">Source</a> 

Complying with the Google Analytics Terms of Service

Client SDK complies with the Google Terms of Service where possible.  As Client SDK is a component within your application and does not interact with end users directly, Client SDK cannot fully meet the Google Analytics Terms and Conditions. To enable Google Analytics within Client SDK,  your application meet the following condition:

> You will give end users proper notice about the use of Google Analytics for the collection of quality improvement metrics for the Avaya Communications Package when it is enabled in your application.  You must either get consent from the end user to enable Google Analytics, or provide them with the opportunity to opt-out of analytics collection.

<a href="https://www.google.com/analytics/terms/us.html" target="_blank">Source</a>  