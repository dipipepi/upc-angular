{{= BackToPackageOverview }}

#Configuring the SDK

Configuration of the JavaScript Recording Management Services is defined by using Configuration objects.

##Client Configuration

The {{=Config_ClientConfig}} class is the fundamental configuration object for the package. This class defines the desired services for the user. It encapsulates configuration data for each individual service (e.g., {{=Services_AuthenticationService}} for Authentication Service, {{=Services_ProgramService}} for ProgramService Service...).  Configuration includes specifying operating parameters (e.g., host name, port, specific URLs) and other supporting components.

##Related Configuration Classes

There are two configuration classes that are encapsulated in the {{=Config_ClientConfig}} class. Notice that both of them have the same types {{=Config_ServerInfo}}. The difference is resources member. It can be one of the following types:

* {{=Config_Resources_AuthorizationResources}} - Authentication service configuration,
* {{=Config_ServerInfo_Resources}} - common service configuration

##Making Configuration Changes at Runtime

Configuration data is critical for initializing the Client SDK. Services will be created and initialized according to their corresponding configuration data during initialization.

Once the Client SDK has been initialized, if there is a need to change any configuration options for any services or to enable/disable certain services, the Client SDK needs to be re-initialized with the updated configuration data. Dynamic changes of configuration options are not supported.
