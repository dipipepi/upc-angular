{{= BackToPackageOverview }}

#Adding support for multimedia messages

The messaging service API provides instant messaging functionality to the client application. It deals with retrieving data from the server, managing and performing business logic on this data and finally, presenting it to the UI layer.

* Network connectivity
* Query messaging capabilities (from the AMM server)
* Query/start conversations
* Send messages (with attachments)
* Mark messages as read
* Query/invite conversation participants
* Leave conversations
* IM address validation

Most of the API calls return promise, that can handle success or fail.

##MessagingService Capabilities

 {{=Services_Messaging_Messaging}} supports different features based on its type. To recognize whether the feature is available or not, you need to check the appropriate capability. UI elements should be enabled, disabled or hidden depending on these capabilities. Such capabilities exist at the {{=Services_Messaging_Messaging}} level:

| Capability                            | Conditions Required                                                                                                                     | API to check the capability                    |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| Start Messaging Service               | The Client is not already connected to the messaging server.                                                                            | getStartServiceCapability                      |
| Create Conversation                   | The Client is connected to the messaging server.                                                                                        | getCreateConversationCapability                |
| Retrieve Conversation                 | The Client is connected to the messaging server. The messaging server supports Retrieve.                                                | getRetrieveConversationsCapability             |
| Search Conversation                   | The Client is connected to the messaging server. The messaging server supports Search.                                                  | getSearchConversationsCapability               |
| Validate Participant Addresses        | The Client is connected to the messaging server. The messaging server supports validation of participant addresses.                     | getValidateParticipantAddressesCapability      |
| Mark Content As Read                  | The Client is connected to the messaging server. The messaging server supports Mark Content As Read.                                    | getMarkContentAsReadCapability                 |

##Initializing and Configuring the MessagingService

The {{=Services_Messaging_Messaging}} object is obtained from the Client SDK {{=User}} object. The {{=Config_UserConfiguration}} object is used to define the services that are available to the end users of your application. Each service is configured individually. Its configuration is stored in a dedicated object referenced from the {{=Config_UserConfiguration}} object.

Note: More information on service configuration can be found in the article <a href="configuring_the_sdk.gsp">Configuring the SDK</a>.

Start by obtaining any existing service configuration:

```javascript
var userConfiguration = new AvayaClientServices.Config.UserConfiguration();

var ammConfiguration = userConfiguration.ammConfiguration;
```

Enable the service and configure the AMM parameters supplied by your administrator:

```javascript
ammConfiguration.enabled = true;

var serverInfo = new AvayaClientServices.Config.ServerInfo("<AMM Server IP or FQDN>",
	"<AMM Server Port>",
	TLS);	// True if connection to the server is required to be secure;

ammConfiguration.networkProviderConfiguration = new AvayaClientServices.Config.NetworkProviderConfiguration(serverInfo);

//the poll refresh interval in minutes
ammConfiguration.pollingIntervalInMinutes = 0;
```

Valid username and password are required to successfully register to the AMM server. The password required for the AMM service is not defined as a part of the service configuration. Passwords are requested by and communicated to the Client SDK using the {{=Config_CredentialProvider}} interface:

```javascript
var messagingCredentialProvider = new AvayaClientServices.Config.CredentialProvider("<AMM User Login>", "<AMM User Password>");

ammConfiguration.credentialProvider = messagingCredentialProvider;
```

Note: More information on how to manage passwords using {{=Config_CredentialProvider}} can be found in the article <a href="working_credentials.gsp">Working with Credentials</a>.

After you instantiate and set up required configuration objects, now you are ready to create {{=User}} and then call the start() method of your {{=User}} to start all services. Then you can get {{=Services_Messaging_Messaging}} for its further usage:

```javascript
var messagingService = user.getMessaging();
```

##Conversation Capabilities

These capabilities exist on the Client SDK {{=Services_Messaging_Conversation}} object:

| Capability                         | Conditions Required                                                                                                                                                                                 | API to check the capability       |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| Create Message                     | The Client is connected to the messaging server. The Conversation is in the draft state and has been started, or the Conversation is in the published state.                                        | getCreateMessageCapability        |
| MarkAllContentAsRead               | The Client is connected to the messaging server. The messaging server supports marking all content in the conversation as read. The Conversation is published.                                      | getMarkAllContentAsReadCapability |
| Update Subject                     | The Client is connected to the messaging server. The messaging server supports changing the subject of the Conversation. The Conversation is active. The Conversation is either draft or published. | getUpdateSubjectCapability        |
| Update Last Access Time Capability | The Client is connected to the messaging server. The messaging server supports changing the LastAccessTime of the Conversation. The Conversation is published.                                      | getUpdateLastAccessTimeCapability |
| Leave                              | The Client is connected to the messaging server. The Conversation is in the published state.                                                                                                        | getLeaveCapability                |
| Add Participants                   | The Client is connected to the messaging server. The Conversation is active. The Conversation is either draft or published.                                                                         | getAddParticipantsCapability      |
| Remove Participants                | The Conversation is in the draft state.                                                                                                                                                             | getRemoveParticipantsCapability   |
| Update Sensitivity                 | The Conversation is in the draft state.                                                                                                                                                             | getUpdateSensitivityCapability    |
| Older Content                      | The Client is connected to the messaging server. The Conversation is published.                                                                                                                     | getRetrieveMessagesCapability     |
| Start                              | The Conversation is in the draft state and has not yet been started.                                                                                                                                | getSendCapability                 |
| Remove                             | The Conversation is in the draft state.                                                                                                                                                             | getRemoveCapability               |
| Create Escalation                  | The Client is connected to the messaging server.	The Conversation is in the published state.                                                                                                        | getCreateEscalationCapability     |
| Is Typing                          | The Client is connected to the messaging server. The Client is subscribed for Typing Events.	                                                                                                       | getIsTypingCapability             |

##Retrieval of active conversations

The getActiveConversations() method retrieves the dynamically updated collection of conversations that are associated with the currently logged in user. Normally, the client application will only need to call this method once to install a watcher object to monitor the initial download of conversations and then continue to watch for updates to the collection.

```javascript
var conversationsRetrieval = messagingService.getActiveConversations();
var conversationsSet = conversationsRetrieval.getDataSet();

conversationsSet.addOnDataSetChangedCallback(function (conversations, type) {
	if (type === AvayaClientServices.Base.DataSetChangeTypes.ADDED) {
			// Conversations added;
	} else if (type === AvayaClientServices.Base.DataSetChangeTypes.UPDATED) {
			// Conversations update;
	} else if (type === AvayaClientServices.Base.DataSetChangeTypes.REMOVED) {
			// Conversations removed;
	}
});
```

##Creating a conversation

First, create new {{=Services_Messaging_Conversation}} and then call the start() method of your {{=Services_Messaging_Conversation}} object. Then you can add a participant to {{=Services_Messaging_Conversation}} by specifying a valid extension and domain.

```javascript
var newConversation = messagingService.createConversation();
newConversation.start().then(function () {
		newConversation.addParticipantAddresses(addresses).then(function ([<ConversationParticipants>]) {
			// Participants added successfully;
		}, function (error) {
			// Participants does not added successfully;
		})
	}, function (error) {
		// Update UI elements that new conversation was not started
	});
```

##Message Capabilities

These capabilities exist on the Client SDK {{=Services_Messaging_Message}} object:

| Capability          | Conditions Required                                                                                                                | API to check the capability     |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| Update Body         | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getUpdateBodyCapability         |
| Update InReplyTo    | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getUpdateInReplyToCapability    |
| Update DoNotForward | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getUpdateDoNotForwardCapability |
| Update Importance   | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getUpdateImportanceCapability   |
| Create Attachment   | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getCreateAttachmentCapability   |
| Send                | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getSendCapability               |
| MarkAsRead          | The Client is connected to the messaging server. The messaging server supports marking messages as read. The Message is published. | getMarkAsReadCapability         |
| Remove              | The Client is connected to the messaging server. The Message is in the draft or error state.                                       | getRemoveCapability             |
| Update Sensitivity  |	The Client is connected to the messaging server. The Message is in the draft state.                                                | getUpdateSensitivityCapability  |

##Creating a message

Once {{=Services_Messaging_Conversation}} has been created successfully, new {{=Services_Messaging_Message}} can be created and sent in the scope of {{=Services_Messaging_Conversation}}.

```javascript
var message = newConversation.createMessage();

message.setBodyAndReportTyping("<Message Body>");

message.send().then(function () {
		// Message sent successfully;
	}, function (error) {
		// Message does not sent successfully;
	});
```

##Receive messages

If new {{=Services_Messaging_Message}} has been received in the scope of existing {{=Services_Messaging_Conversation}} your application will be notified via messages.addOnDataSetChangedCallback(). The content of received {{=Services_Messaging_Message}} should be added to active {{=Services_Messaging_Conversation}}.

```javascript
var messages = newConversation.getMessages();
messages.addOnDataSetChangedCallback(function ([<New Messages>]) {
	// Display received messages on UI
});
```

When your application receives the onNumberOfConversationsWithUnreadContentSinceLastAccessChanged() callback, you need to retrieve all active conversations via the getActiveConversations() method to update the list of current conversations. This callback is called to report that the number of conversations with unread content has changed since the last accessed time. Only new content since the last time when {{=Services_Messaging_Conversation}} was accessed, will be flagged.

```javascript
messagingService.addOnNumberOfConversationsWithUnreadContentSinceLastAccessChanged(function ({<Messaging Service>}, <Number>) {
	messagingService.getActiveConversations();
});
```

##Marking as read

To mark selected {{=Services_Messaging_Message}} as read use the markAsRead() method of the {{=Services_Messaging_Message}} object.

```javascript
if (message.getMarkAsReadCapability().isAllowed) {
	message.markAsRead();
}
```

You can also mark all content in {{=Services_Messaging_Conversation}} as read using the markAllContentAsRead() method.

```javascript
if (conversation.getMarkAllContentAsReadCapability().isAllowed) {
	conversation.markAllContentAsRead(function ({<Conversation>}) {
		//Successfully marked all content as read;
	}, function (error) {
		//Failure marking all content as read;
	});
}	
```

##Attachment Capabilities

These capabilities exist on the Client SDK {{=Services_Messaging_Attachment}} object:

| Capability                | Conditions Required                                                                                   | API to check the capability         |
|---------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------|
| Update Name               | The Attachment is in the draft state.                                                                 | getUpdateNameCapability             |
| Create Thumbnail          | The Attachment have possibility to create thumbnail.                                                  | getCreateThumbnailCapability        |
| Remove Thumbnail          | The Attachment is in the draft state.                                                                 | getRemoveThumbnailCapability        |
| Update Duration           | The Attachment is in the draft state.                                                                 | getUpdateDurationCapability         |
| Update MIME Type          | The Attachment is in the draft state.                                                                 | getUpdateMimeTypeCapability         |
| Remove                    | The Attachment is in the draft state.                                                                 | getRemoveCapability                 |

##Creating a message with an attachment

 {{=Services_Messaging_Message}} is a crucial part of {{=Services_Messaging_Conversation}}.  An important part of {{=Services_Messaging_Message}} is also represented as attachments. In order to create new {{=Services_Messaging_Attachment}} in the {{=Services_Messaging_Message}} object, use the createAttachment() method. You can attach Audio (".m4a"), Video (".mp4") and Pictures (".jpg") to your {{=Services_Messaging_Message}}. First, create new {{=Services_Messaging_Attachment}} in the {{=Services_Messaging_Message}} object via the createAttachment() method and then set desired values (name, MIME types, etc.) for this attachment object.

```javascript
var attachment = message.createAttachment(<file>);

attachment.setName("<Name>");
```

To remove {{=Services_Messaging_Attachment}} from {{=Services_Messaging_Message}}, use the removeDraftAttachment() method.

```javascript
var attachments = message.getAttachments();
if (attachments[0]) {
	message.removeDraftAttachment(attachments[0]);
}
```

Now you are ready to send your draft {{=Services_Messaging_Message}} using the methods described above in the article.

##Downloading an attachment

You can download {{=Services_Messaging_Attachment}} from {{=Services_Messaging_Message}} by getting the URL to file. To get {{=Services_Messaging_Attachment}} downloading URL you can use the getDownloadURL() method.

```javascript
if (message.hasAttachment()) {
	var attachments = message.getAttachments();
	if (attachments[0]) {
    	attachments[0].getDownloadURL();
    }
}
```