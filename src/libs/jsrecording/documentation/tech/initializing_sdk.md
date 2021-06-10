{{= BackToPackageOverview }}

# Initializing SDK

This article discusses how to initialize the Avaya Client SDK Recording Management Package for JavaScript within your application.

##Creating a Client

The central class of the Avaya Client SDK is {{=AvayaRecordingClient}}.
Each application using the Client SDK will have its own instance of {{=AvayaRecordingClient}} and will maintain a reference to this object in order to access SDK features.

##Creation of the Client object

The first part of the process is a creation of authorization ServerInfo instance object:

```javascript
var authServer = new AvayaRecordingClient.Config.ServerInfo({
    host: window.location.hostname,
    port: window.location.port,
    isSecure: true,
    resources: new AvayaRecordingClient.Config.Resources.AuthorizationResources({
        authorizationUrl: "" // URL for get auth token for ACSR
    })
});
```

The second part of the process is a creation of program ServerInfo instance object:

```javascript
var serviceServer = new AvayaRecordingClient.Config.ServerInfo({
    resources: {
        get baseUrl() {
            return ""; //ACSR base url (fqdn or IP, 192.168.1.1 for example)
        },
        programResources: new AvayaRecordingClient.Config.Resources.ProgramResources({
            programsUrl: '/api/manager/programs',
            categoriesUrl: '/api/manager/categories',
            templatesUrl: '/api/manager/templates',
            reportsUrl: '/api/manager/reports'
        })
    }
});
```

And final part is a creation of client instance object:

```javascript
var clientConfig = {
    authServer: authServer,
    serviceServer: serviceServer
};
var client = AvayaRecordingClient(clientConfig);
```
