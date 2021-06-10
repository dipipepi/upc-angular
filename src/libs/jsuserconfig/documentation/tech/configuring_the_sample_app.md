{{= BackToPackageOverview }}

# Initializing Sample App

This article discusses how to initialize the Sample App.
The Sample App provides functionality for testing Meeting Management Services on your environment.

##Configuring the config file

The first part of the process is a change settings in config.txt:

```javascript
{
    "login": "2060006",
    "password": "2060006",
    "hostAndPort": "dev-esg106.uplab.com",
    "alias": "dev-org106"
}
```


* hostAndPort - IP address or FQDN with port of UPS server. By default we use 443 port, so you can skip it.
* alias - organization alias (tenant). Use 'default' for interprise systems.

##Starting the Sample App

The final part of the process is a starting sample app by config file:

* Open index.html in any browser
* Load config file by "Upload config" button
* Click on "Login" button

After these steps:
The Sample App sends a login request with credentials from config file to the UPS server.
The successfull response from the server contains the authorization token.
Then Sample App uses this token for initialize the Client SDK.