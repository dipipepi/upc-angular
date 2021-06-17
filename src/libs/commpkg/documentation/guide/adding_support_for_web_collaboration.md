{{= BackToPackageOverview }}

#Adding support for Web Collaboration

The collaboration service API provides collaboration functionality to the client application.  Further, it takes care of retrieving data from the server, managing and performing business logic on this data and finally presenting it to the UI layer.

It provides core collaboration functions for clients served by Collaboration server:

*	Receive new collaborations
*	Display the shared information from other participants
*	Allows getting the Capabilities
*	Allows to share (screen, whiteboard ...)

Most of the API calls return a promise, that can handle success or fail.

##Initialization and Configuration

The {{=Services_Collaboration}} object is obtained from the Client SDK's User object. The {{=Config_UserConfiguration}} object will be used to define the services that will be available to end users of your application. Each service is configured individually; its configuration is stored in a dedicated object, referenced from the {{=Config_UserConfiguration}} object.

Note: More information on service configuration can be found in the article configuring the SDK.

Start by obtaining any existing service configuration:

```javascript
var userConfiguration = new AvayaClientServices.Config.UserConfiguration();

var wcsConfiguration = userConfiguration.wcsConfiguration;
```

Enable the service and configure the collaboration parameters supplied by your administrator:

```javascript
wcsConfiguration.enabled = true;
```

Set web collaboration for call object. How to create call object is described in <a href="making_an_audio_call.gsp">Making an Audio Call</a> and <a href="making_a_video_call.gsp">Making a Video Call</a>

```javascript
call.setWebCollaboration(true);
```

After you instantiate and set up any required configuration objects, you are now ready to create the User and then call the start() method of your {{=User}} to start all services. Then you can get the {{=Services_Collaboration_Collaborations}} for its further usage:

```javascript
var collaborationsService = user.getCollaborations();
```

##Receive new collaborations

To receive new collaborations for call use the getCollaborationForCall() method of the {{=Services_Collaboration_Collaborations}} object.

```javascript
var collaboration = collaborationsService.getCollaborationForCall(call.getCallId());
```

In this point you will have instance of new collaboration. To be able to receive and display the sharing stream from the collaboration server you should start {{=Services_Collaboration}} service. 

```javascript
collaboration.start().then(function () {
    // Collaboration start successfully;
}, function () {
    // Collaboration start fail;
});
```

##Display the shared information from other participants.

To be able to handle whiteboard or content sharing streams from other participants, your application should do the following:

1) Get {{=Services_Collaboration_Whiteboard}} and {{=Services_Collaboration_ContentSharing}} objects.

```javascript
var whiteboard = collaboration.getWhiteboard();
var contentSharing = collaboration.getContentSharing();
```

2) Initiate {{=Renderer_Konva_KonvaWhiteboardRenderer}} and {{=Renderer_Konva_KonvaContentSharingRenderer}} renderer.

```javascript
var whiteboardRenderer = new AvayaClientServices.Renderer.Konva.KonvaWhiteboardRenderer();
whiteboardRenderer.init(whiteboard, "<HTML element ID>");

var contentSharingRenderer = new AvayaClientServices.Renderer.Konva.KonvaContentSharingRenderer();
contentSharingRenderer.init(contentSharing, "<HTML element ID>");
```

When any participants from the collaboration will start sharing whiteboard or screen, your application should get information about it through callback onWhiteboardStartedCallbacks() or onContentSharingStartedCallbacks().

```javascript
whiteboard.addOnWhiteboardStartedCallback(function ({<Whiteboard Service>}, {<Surface Object>}, {<Starting Participant Object>}) {
   // Whiteboard sharing started;
});
contentSharing.addOnContentSharingStartedCallback(function ({<Content Sharing>}, {<Starting Participant Object>}) {
   // Content Sharing started;
});
```

##Share information to other participants.

To begin sharing information to other participants use the API methods from {{=Services_Collaboration_ContentSharing}} or {{=Services_Collaboration_Whiteboard}} objects.

**Chrome**, **Firefox** and **Edge** allow the user to choose the sharing type.
The user will be prompted by the browser to select the sharing type. Possible
options are to share monitor, application window or browser tab. The latter is
only supported by **Chrome** as of now.

For example:

* Start sharing

```javascript
// Check that we have the capability to start sharing
if (contentSharing.getStartScreenSharingCapability().isAllowed) {
    contentSharing.startScreenSharing();
}
```

If the capability is allowed, you will see a native window to select the source.

* End sharing

```javascript
contentSharing.end();
```

* Start sharing whiteboard

```javascript
whiteboard.start();
```

* End sharing whiteboard

```javascript
whiteboard.end();
```
