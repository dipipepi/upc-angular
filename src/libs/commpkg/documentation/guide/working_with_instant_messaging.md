{{= BackToPackageOverview }}

#Working with Instant Messaging

The messaging service API provides instant messaging functionality to the client application.  Further, it takes care of retrieving data from the server, managing and performing business logic on this data and finally presenting it to the UI layer. It provides core instant messaging functions for clients served by AMM server:

* Network connectivity
* Query messaging capabilities (from the AMM server)
* Query/start conversations
* Send messages (with attachments)
* Mark messages as read
* Query/invite conversation participants
* Leave conversations
* IM address validation

##Initializing and Configuring the MessagingService

The {{=Services_Messaging}} object is obtained from the Client SDK's {{=User}} object. Start by obtaining any existing service configuration, enable the service and configure the AMM parameters supplied by your administrator. Refer to <a href="../tech/configuring_the_sdk.gsp">Configuring the SDK</a> for more information. You can also follow attached examples below.

At the start it's necessary to prepare required data and objects. Create new {{=Config_CredentialProvider}} with 'username' and 'password' parameters:

```javascript
var credentialProvider = new AvayaClientServices.Config.CredentialProvider('username', 'password');
```

The valid username and password are required to successfully register to the AMM server. Passwords are requested by and communicated to the Client SDK using the {{=Config_CredentialProvider}} interface. For more informations about credentials handling in Client SDK please refer to <a href="../tech/working_credentials.gsp">Working with Credentials</a>.

Example configuration object with server data:

```javascript
var config = {
    ammConfiguration: {
        enabled: true,
        allowPrevalidation: true,
        pollIntervalInMinutes: 1,
        credentialProvider: credentialProvider,
        networkProviderConfiguration: {
            restConfig: {
                hostName: "<hostName>",
                port: "<port>",
                isSecure: true
            }
        }
    }
};
```

After you instantiate and set up any required configuration objects, you are now ready to create the {{=User}}. Then you can get the  {{=Services_Messaging}} for its further usage.

```javascript
var messaging = user.getMessaging();
```

messaging instance will start together with {{=User}}.start() method. It connects to the server from config object and listening is possible on addOnMessagingServiceAvailableCallback callback.

##Creating a conversation

First, create new instance of {{=Services_Messaging_Conversation}} object.

```javascript
var newConversation = messaging.createConversation();
```

Then you can add participants to the  {{=Services_Messaging_Conversation}} by specifying a valid extension and domain.

```javascript
var participants = ['participantAddress1', 'participantAddress2'];
newConversation.addParticipantAddresses(participants);
```

To get all conversations you can use {{=Services_Messaging_Messaging}}.getActiveConversations() method on messaging api.

```javascript
var conversations = messaging.getActiveConversations();
```

##Creating a message

Once a {{=Services_Messaging_Conversation}} has been created successfully, a new {{=Services_Messaging_Message}} can be created and sent in the scope of the {{=Services_Messaging_Conversation}}.

```javascript
message = conversation.createMessage();

message.setBodyAndReportTyping(messageBody);
```

##Receive messages

If a new {{=Services_Messaging_Message}} has been received in the scope of the existing {{=Services_Messaging_Conversation}} your application will be notified via addOnDataSetChangedCallback callback. The content of the received message should be added to active conversation.

```javascript
var messages = conversations.getMessages();
messages.addOnDataSetChangedCallback(function() {
//Here you can get added message
});
```

##Creating a message with an attachment

 {{=Services_Messaging_Message}} is a crucial part of the {{=Services_Messaging_Conversation}}.  An important part of the {{=Services_Messaging_Message}} is also attachments. You can attach Audio (".m4a"), Video (".mp4") and Pictures (".jpg") to your {{=Services_Messaging_Message}}.

In order to create a new {{=Services_Messaging_Attachment}} in a {{=Services_Messaging_Message}} object, use the {{=Services_Messaging_Message}}.createAttachment() method.

```javascript
message.createAttachment(file);
```

To remove an {{=Services_Messaging_Attachment}} from the {{=Services_Messaging_Message}} use {{=Services_Messaging_Message}}.removeDraftAttachment() method. You can also download the {{=Services_Messaging_Attachment}} from the {{=Services_Messaging_Message}} by using a getDownloadURL() method on attachment instance.

