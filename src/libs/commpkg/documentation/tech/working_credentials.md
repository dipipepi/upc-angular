{{= BackToPackageOverview }}

#Working with Credentials

All Client SDK services that depend on infrastructure services accessed over a network require login credentials. Applications are responsible for providing the login credentials to the Client SDK through the {{=Config_AbstractCredentialProvider}} interface.

##Registering for authentication

To register for authentication create a {{=Config_CredentialProvider}} instance per service when defining the configuration data for your {{=User}} object. Creating a {{=Config_CredentialProvider}}  instance per service will allow your application to respond to different infrastructure challenge requests simultaneously if you are supporting multiple services in your application.

For example, if you are using the {{=Services_Call_Calls}} Service with a ESG provider you would use the following code to define your instance of the {{=Config_CredentialProvider}} for the ESG service. You can then assign your instance of the {{=Config_CredentialProvider}} to the configuration object for the ESG service:

```javascript
//creation of user configuration
var config = new AvayaClientServices.Config.UserConfiguration();

function setCallConfig(config) {
	var callCredentialsProvider = new AvayaClientServices.Config.CredentialProvider();
	callCredentialsProvider.username = "<username>";
	callCredentialsProvider.password = "<password>";
	config.ESGConfiguration.credentialProvider = callCredentialsProvider;
}
```

According to this configuration, when you call 'start()' from your {{=User}} instance the following sequence of events will occur:

* Client SDK will attempt to register to the ESG server
* The ESG server will challenge the client for credentials
* Client SDK will invoke the callback onAuthenticationChallenge of the {{=Config_CredentialProvider}} object in response to the server challenge to notify the calling application that credentials are required.

##Responding to authentication challenge requests

When your application receives an {{=Config_CredentialProvider}}.onAuthenticationChallenge() callback invoked on one of your credential providers you must respond to the request. This is necessary to complete the registration process with the infrastructure service and start using the features associated with this service.

To respond to the challenge request, as a callback parameter pass the object populated with username, password, domain.

```javascript
callback({
	username: "<username>"
	password:  "<password>",
	domain: "<domain>"
});
```

##Getting authentication results

Once you have responded to the challenge request using the callback, Client SDK will respond to the infrastructure server with the credentials provided.

If the infrastructure server accepts the credentials, your application will be successfully authenticated.

If the infrastructure server rejects the credentials, the 401 unauthorized status will be returned and the browser will prompt a native popout for providing username and password again. Additionally the application will be notified with addOnInvalidCredentialsCallback, which is the interface for callback function to be invoked when provided credentials are invalid. In order to retry authentication you would use the following code.

```javascript
callCredentialsProvider.addOnInvalidCredentialsCallback(function(event){
	//Updating credentials
	callCredentialsProvider.password = 'valid';
	var retryCallback = event.getRetryCallback();
	retryCallback();
});
```