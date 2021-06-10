{{= BackToPackageOverview }}

#Configuring the SDK

Configuration of the JavaScript Meeting Management Services is defined by using Configuration objects.

##Client Configuration

The {{=Config_ClientConfig}} class is the fundamental configuration object for the package. This class defines the desired services for the user. It encapsulates configuration data for Meeting Management service. Configuration includes resources paths.

##Related Configuration Classes

There is configuration class that are encapsulated in the {{=Config_ClientConfig}} class:

* {{=Config_Resources}} - paths for all posible requests that provided by meeting management package (e.g., getConferences, getVirtualRooms ...).

##Making Configuration Changes at Runtime

Configuration data is critical for initializing the Client SDK. Services will be created and initialized according to their corresponding configuration data during initialization.

Once the Client SDK has been initialized, if there is a need to change any configuration options for any services or to enable/disable certain services, the Client SDK needs to be re-initialized with the updated configuration data. Dynamic changes of configuration options are not supported.
