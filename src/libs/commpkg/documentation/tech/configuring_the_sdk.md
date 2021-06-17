{{= BackToPackageOverview }}

#Configuring the SDK

Configuration of the JavaScript Communications Services is defined by using a number of Configuration objects. This approach provides flexibility to configure each component independently as required.

##User Configuration

The {{=Config_UserConfiguration}} class is the most fundamental configuration object for the communications. It is used to describe properties of your application such as Build Number, Product Name and Product Version. Additionally this class defines the desired services for the user. It encapsulates configuration data for each individual service  (e.g., {{=Config_CallUserConfiguration}} for Call Service, {{=Config_CollaborationConfiguration}} for Collaboration Service, {{=Config_PresenceConfiguration}} for Presence Service...). Configuration of a service includes specifying whether the service should be enabled/disabled, specifying operating parameters (e.g., host name, port, video resolution) and other supporting components (e.g., credential provider).

##Related Configuration Classes

Following is the list of configuration classes that are encapsulated in the {{=Config_UserConfiguration}} class:

* {{=Config_AMMConfiguration}} - AMM server configuration,
* {{=Config_ACSConfiguration}} - ACS server configuration,
* {{=Config_UCCPConfiguration}} - UCCP server configuration,
* {{=Config_SGConfiguration}} - Service gateway configuration,
* {{=Config_CallUserConfiguration}} - Call service configuration,
* {{=Config_PresenceConfiguration}} - Presence service configuration,
* {{=Config_WCSConfiguration}} - WCS server configuration,
* {{=Config_MediaConfiguration}} - Media with VoIP Audio/Video configuration,
* {{=Config_CollaborationConfiguration}} - Collaboration service configuration,
* {{=Config_AnalyticsConfiguration}} - Analytics service configuration using Google Analytics.


##Making Configuration Changes at Runtime

Configuration data are critical for initializing the Client SDK. Services will be created and initialized according to their corresponding configuration data during initialization.

Once the Client SDK has been initialized, if there is a need to change any configuration options for any services or to enable/disable certain services, the Client SDK needs to be re-initialized with the updated configuration data. Dynamic changes of configuration options are not supported.
