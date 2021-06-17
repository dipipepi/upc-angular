{{= BackToPackageOverview }}

#Working with Capabilities

##Capabilities Overview

Capabilities are a software pattern used by the Client SDK to indicate to the application what features and operations may be available at a given point in time.  Capabilities are dynamic due to the distributed and asynchronous nature of the system. Therefore, an allowed capability is not a guarantee that the associated action will succeed.  Capabilities indicate that the action is expected to be available, and the Client SDK provides notification when relevant capabilities change. Many services and service objects in the SDK expose capabilities that inform an application which features and operations are available based on the current state of the system. Capabilities may change based on:

Deployment:

	These capabilities may change depending on the type of network elements deployed and the configuration of such network elements,
	e.g. video capabilities could be disabled by based on network configuration.

Configuration:

	These capabilities may change based on the configuration that the application provides to the CSDK,
	e.g. the application may not support enhanced conferencing.

Runtime:

	Availability/unavailablility of capabilities depends on the runtime execution of the service or service object,
	e.g. the call retrieve operation is not permitted unless the call is in the held state.

Browser:

	Some capabilities will depend on the underlying capability of the browser that the Client SDK is running in,
	e.g. Internet Explorer 11 does not support audio and video calls.

The API uses the concept of capabilities to indicate the current capability of the SDK to perform an operation. For example, a {{=Services_Call_Call}} has a holdCapability. It will report if the call is in a state where it can be held. If the call hasn't been answered yet it will report false, if it has been answered it will report true. So far this just sounds like a boolean getter method. In addition to that it provides methods for users of the SDK to bind in callback functions when the state of the capability changes. Finally, the {{=Base_Capability}} object defines a denial reason to specify why the capability is not allowed.

JSCSDK has a list of possible denial reason strings. The UI can react accordingly based on those constant strings. The UI can register for a change in every {{=Base_Capability}} object using addOnChangeCapability function. To inform the UI that the capability value have been changed the onChangedCallbacks are triggerred. JSCSDK updates appropriate capabilities when there is a change in the object.

Capabilities are a completely optional feature provided to aid in user interface development. The system supports any action method being called at any time. Applications must support success and failure handling for all operations, even if the capability indicated that the operation was allowed.

