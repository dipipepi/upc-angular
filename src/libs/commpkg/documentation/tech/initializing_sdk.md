{{= BackToPackageOverview }}

#Initializing the SDK

This article discusses how to initialize and shutdown the Avaya Client SDK Communications Package for JavaScript within your application.

##Creating a Client

The central class of the Avaya Client SDK is {{=AvayaClientServices}}. Each application using the Client SDK will have its own instance of {{=AvayaClientServices}} and will maintain a reference to this object in order to create a {{=User}} and access features within the SDK.
##Creation of the Client object

The first part of the process is a creation of the client instance object:

```javascript
var client = new AvayaClientServices();
```

<a id="creatingauser"></a>
##Creating a User

A {{=User}} object defines all of the capabilities available to the end user of your application. Creating a {{=User}} is very similar to creating a {{=AvayaClientServices}}.

##User Configuration

The second part of the process is a creation of the {{=Config_UserConfiguration}} object:

```javascript
var userConfig = new AvayaClientServices.Config.UserConfiguration();
```

The {{=Config_UserConfiguration}} object will be used to define the services that will be available to end users of your application. Each service is configured individually; its configuration is stored in a dedicated object, referenced from the {{=Config_UserConfiguration}} object.

Service configuration starts with obtaining a reference to the desired service configuration from {{=Config_UserConfiguration}}. Once you have completed the configuration for the service, or re-configuration of the service, save the configuration back to the {{=Config_UserConfiguration}} object.

Note: More information on service configuration can be found in the article <a href="configuring_the_sdk.gsp">Configuring the SDK</a>.

###Example: Configuring the Call Service for ESG

Start by obtaining any existing service configuration: 

```javascript
var esgConfig = userConfig.sgConfiguration;
```

Enable ESG server in user's configuration: 

```javascript
esgConfig.enabled = true;
```

Configure network connection details for ESG server:

```javascript
var restConfig = esgConfig.networkProviderConfiguration.restConfig;
restConfig.hostname = "<hostname>";
restConfig.port = "<port>";

// If connection to the server should be established over secure protocols, such as HTTPS or WSS then specify "true" here. Otherwise, specify "false".
restConfig.isSecure = true;
```

To successfully register to the ESG server a password corresponding to the username will be required. The password required for the ESG service is not defined as part of the service configuration. Passwords are requested by and communicated to the Client SDK using the {{=Config_AbstractCredentialProvider}} interface:

```javascript
var credentialProvider = esgConfig.credentialProvider;
esgConfig.credentialProvider.username = "<username>";
esgConfig.credentialProvider.password = "<password>";
```

Note: More information on how to manage passwords using the {{=Config_AbstractCredentialProvider}} can be found in the article <a href="working_credentials.gsp">Working with Credentials</a>.

##Creation of the User object

After you instantiate and set up any required configuration objects, you are now ready to create the {{=User}}.

```javascript
var user = client.createUser(userConfig);
```

In order to register callback when the user is successfully created, use  the {{=User}}.addOnUserRegistrationSuccessful() method. On the other hand, in order to register callback when the user registration failed, use the {{=User}}.addOnUserRegistrationFailed() method.

```javascript
user.addOnUserRegistrationSuccessful(function(tokenHref) {
	// add code that will be executed after successful registration
	
	// The following code snippet is applicable to making a conference 
	// call through HTTPUA only.
	// confTokenHRef must be declared in client app, and it only needed when 
	// calling to Equinox conference via OTT.

	confTokenHRef = tokenHref; 
});

user.addOnUserRegistrationFailed(function () {
	// add code that will be executed after failed registration
});
```

After that, you can use start() method, which triggers the network activity required to register with any services configured.  Once a successful connection has been established to the infrastructure services, access to API's dependent on a connection to infrastructure services will now be accessible through the {{=User}} service.

```javascript
user.start().then(function() {
	//here you can watch the availability of the services
});
```

<a id="shutdowntheclient"></a> 
##Stop the Client

To stop all the running services use the {{=User}}.stop() method on the user instance object.

```javascript
user.stop()
```

Client SDK attempts to unregister with each infrastructure service.

Client SDK waits until confirmation is provided by each infrastructure service.  Only once confirmation has been received from all infrastructure services does shutdown and cleanup of internal resources take place. Because the  stop operation is dependent on a network response from one or more infrastructure services, when errors occur this process may take as long as the network timeout on each infrastructure connection to complete.

The other way to stop all the running services is {{=User}}.stopImmediately() method.

```javascript
user.stopImmediately()
```

In this case, all network connections are immediately terminated, {{=User}} objects controlled by the {{=AvayaClientServices}} object are removed, and internal resources are immediately released. This method though should only be called before window closes, otherwise, it may cause UI freeze until server response.

##Reinitialize the User

 {{=AvayaClientServices}}.createUser method uses Singleton design pattern.
So, if you want to create a new {{=User}} object or update it's config you need to re-initialize the {{=AvayaClientServices}} object and only then call {{=AvayaClientServices}}.createUser method with new config. You can do it, for example, in login controller every time before building configuration.
If {{=AvayaClientServices}} was not re-initialized {{=AvayaClientServices}}.createUser method will return a {{=User}} object with old configuration even if new config was provided as argument.