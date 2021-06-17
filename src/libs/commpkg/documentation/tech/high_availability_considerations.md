{{= BackToPackageOverview }}

#High Availability Considerations

Avaya Client SDK provides support for all of the high availability features available from each of the network services you may choose to add to your application.  In any given deployment whether or not high-availability is available is not only dependent on whether the service itself supports high availability but also whether or not the administrator for that deployment has chosen to deploy and configure their particular deployment for high availability. High availability generally involves additional cost and complexity so it is an optional feature that cannot be assumed for every deployment.

The underlying high availability network design and deployment model can differ from service to service. As an application developer you will see that in some cases high availability support is completely transparent to you. In other cases you will need to add application logic, or adjust your user experience, to provide feedback to users when underlying services may be limited as a result of planned (e.g. maintenance) or unplanned (e.g. network interruptions, service interruptions).

| Service                          | Feature                      | Provider Network Protocol | Network Element            | High-Availability Supported | Application Development Requirements                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------------------------------|------------------------------|---------------------------|----------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{=Services_Call}}               | Signaling                    | AAWG (HTTP/WebSocket)     | AAWG                       | Yes                         | When Client SDK detects that signaling is unavailable it calls {{=Services_Call_Call}}~onCallServiceUnavailableCallback. The application may choose to update the UI to reflect limited call capabilities. Call's media path remains active. Once connection to AAWG is restored, signaling features will become available.                                                                                                            |
|                                  | Media                        | RTP                       | Media Server               | Yes                         | Client SDK does not detect media outage. User can detect media outage by lack of audio and frozen video in the call. If call is a conference call the conference participant may choose to leave the call. Conference moderator may also choose to terminate the conference.                                                                                                                                                           |
| {{=Services_Conference}}         | UCCP signaling               | UCCP (HTTP/WebSocket)     | UCCS                       | No                          | When Client SDK detects that UCCS is unavailable it calls {{=Services_Conference_Conference}}~onConferenceServiceUnavailableCallback. Conference operations are not available (mute participant, dialout participant), but full {{=Services_Call_Call}} control remains available (hold, unhold, terminate) if AAWG signaling is available. The application may choose to update the UI to reflect unavailable conference capabilities.|
| {{=Services_Collaboration}}      | Collaboration                | WCS (HTTP/WebSocket)      | WCS                        | Yes                         | When Client SDK detects that WCS is unavailable it calls {{=Services_Collaboration_Collaboration}}~onCollaborationServiceUnavailableCallback. The application may choose to update the UI to reflect collaboration unavailability. Once connection to WCS is restored, collaboration features will become available.                                                                                                                   |
| {{=Services_Contacts}}           | Contacts                     | AADS (HTTP/WebSocket)     | AADS                       | Yes                         | When Client SDK detects that AADS is unavailable it calls {{=Services_Contacts_Contacts}}~onContactsServiceUnavailableCallback. The application may choose to update the UI to reflect unavailable contacts capabilities. Once connection to AADS is restored, contacts features will become available.                                                                                                                                |
| {{=Services_Messaging}}          | Messaging                    | AMM (HTTP/WebSocket)      | AMM                        | Yes                         | When Client SDK detects that AMM is unavailable it calls {{=Services_Messaging_Messaging}}~onMessagingServiceUnavailableCallback. The application may choose to update the UI to reflect unavailable messaging capabilities. Once connection to AMM is restored, messaging features will become available.                                                                                                                             |
| {{=Services_Presence}}           | Presence                     | AAWG (HTTP/WebSocket)     | AAWG                       | Yes                         | When Client SDK detects that AAWG is unavailable it calls {{=Services_Presence_PresenceService}}~onPresenceServiceUnavailableCallback. The application may choose to update the UI to reflect unavailable presence capabilities. Once connection to AAWG is restored, presence features will become available.                                                                                                                         |
| {{=Services_VoiceMessaging}}     | Voice Messaging              | AAWG (HTTP/WebSocket)     | AAWG                       | Yes                         | When Client SDK detects that AAWG is unavailable it calls {{=Services_VoiceMessaging_VoiceMessaging}}~onVoiceMessagingServiceUnavailableCallback. The application may choose to update the UI to reflect unavailable voice messaging capabilities. Once connection to AAWG is restored, voice messaging features will become available.                                                                                                |  

The following diagram describes the interaction between application and Client SDK in most of the network disruption and network change scenarios:
![High Availability Considerations 1]({{=BpImages}}javascript/tech/high_availability_considerations_1.png)

##Scenarios

###Call signaling server is unreachable

Client SDK's call signaling functionality is provided by AAWG server. If {{=Services_Call}} cannot reach AAWG server:

* Incoming calls are not delivered to the application.
* Outgoing Calls cannot be initiated.

Application is notified about call signaling unavailability via {{=Services_Call_Calls}}~onCallsServiceUnavailableCallback. Once connection to AAWG server is restored, Client SDK notifies application via {{=Services_Call_Calls}}~onCallsServiceAvailableCallback. 
When AAWG is unreachable {{=Services_Call_Calls}}.createCall() and {{=Services_Call_Call}}.start() operations will fail.

If {{=Services_Call}}'s connection to AAWG server is disrupted while there are active or held calls:

* Active call switches to Media Preservation mode. Call's audio and video remain active, but signaling functions (such as hold) are unavailable.
* Held calls can not be unheld until the signaling path is restored.

Client SDK notifies application about each call's signaling unavailability via {{=Services_Call_Call}}~onCallServiceUnavailableCallback. {{=Services_Call_Call}}'s capabilities are also updated to reflect unavailable call operations.
Once connection to AAWG server is restored, Client SDK requests a list of user's calls from the server. Signaling path of each call will be restored if that call was not ended by remote party or terminated by inactivity timeout. Client SDK notifies application that signaling path for a call is restored via {{=Services_Call_Call}}~onCallServiceAvailableCallback. {{=Services_Call_Call}}'s capabilities are updated to reflect that call operations are available.

Application can also check current status of call's signaling path using {{=Services_Call_Call}}.isServiceAvailable() function.
Before creating and starting a new call it is recommended to check whether {{=Services_Call_Calls}}.getVoipCallingCapability() capability is available.

###Conference server is unreachable

Client SDK's conferencing functionality is provided by UCCS server. If {{=Services_Conference}} cannot reach UCCS server:

* Conference actions are not available (such as mute participant, dialout participant).
* {{=Services_Call_Call}} control operations remain available (such as hold, unhold, terminate) for a conference call.

Application is notified about conference service unavailability via {{=Services_Conference_Conference}}~onConferenceServiceUnavailableCallback. {{=Services_Conference_Conference}}'s capabilities are also updated to reflect unavailable conference operations.
Once connection to UCCS server is restored, Client SDK notifies application via {{=Services_Conference_Conference}}~onConferenceServiceAvailableCallback. {{=Services_Conference_Conference}}'s capabilities are updated to reflect that conference operations are available.
When UCCS is unreachable {{=Services_Conference_Conference}}.start() operation will fail.

###Collaboration server is unreachable

Client SDK's collaboration functionality is provided by WCS server. If {{=Services_Collaboration}} cannot reach WCS server:

* Collaboration actions are not available (such as start whiteboard, start screen sharing).
* Application will not receive collaboration updates made by remote users of the active collaboration session.
* {{=Services_Call_Call}} control operations remain available (such as hold, unhold, terminate) for a call associated with collaboration session.

Application is notified about collaboration service unavailability via {{=Services_Collaboration_Collaboration}}~onCollaborationServiceUnavailableCallback. {{=Services_Collaboration_Collaboration}}'s capabilities are also updated to reflect unavailable collaboration operations.
Once connection to WCS server is restored, Client SDK notifies application via {{=Services_Collaboration_Collaboration}}~onCollaborationServiceAvailableCallback. {{=Services_Collaboration_Collaboration}}'s capabilities are updated to reflect that collaboration operations are available.

When WCS is unreachable {{=Services_Collaboration_Collaboration}}.start() operation will fail.

###Presence server is unreachable

Client SDK's presence functionality is provided by AAWG server. If {{=Services_Presence}} cannot reach AAWG server:

* The application cannot update the presence status of the local user.
* The presence subscription list cannot be modified.
* The application will not receive presence updates of users in the presence subscription list.
* Remote users will not receive presence updates of the current user.

Application is notified about presence service unavailability via {{=Services_Presence_PresenceService}}~onPresenceServiceUnavailableCallback. Once connection to AAWG server is restored, Client SDK re-subscribes for the known presence subscription list and  notifies application via {{=Services_Presence_PresenceService}}~onPresenceServiceAvailableCallback.

###Contacts server is unreachable

Client SDK's contacts functionality is provided by AADS server. If {{=Services_Contacts}} cannot reach AADS server:

* The application cannot edit user's contact list.
* The application will not receive user's contact list updates made on the other client.
* The application cannot search contacts in the enterprise directory.
* The application can search contacts in local cache.

Application is notified about contacts service unavailability via {{=Services_Contacts_Contacts}}~onContactsServiceUnavailableCallback. {{=Services_Contacts_Contacts}}'s capabilities are also updated to reflect unavailable contacts operations.
Once connection to AADS server is restored, Client SDK notifies application via {{=Services_Contacts_Contacts}}~onContactsServiceAvailableCallback. {{=Services_Contacts_Contacts}}'s capabilities are updated to reflect that contacts operations are available.

###Messaging server is unreachable

Client SDK's messaging functionality is provided by AMM server. If {{=Services_Messaging}} cannot reach AMM server:

* The application cannot create conversations and send messages.
* The application cannot edit properties of the existing conversations and messages.
* The application will not receive notifications about new conversations and messages.

Application is notified about messaging service unavailability via {{=Services_Messaging_Messaging}}~onMessagingServiceUnavailableCallback. Capabilities of {{=Services_Messaging}} namespace classes are also updated to reflect unavailable messaging operations.
Once connection to AMM server is restored, Client SDK notifies application via {{=Services_Messaging_Messaging}}~onMessagingServiceAvailableCallback. Capabilities of {{=Services_Messaging}} namespace classes are updated to reflect that messaging operations are available.

###Voice Messaging server is unreachable

Client SDK's voice messaging functionality is provided by AAWG server. If {{=Services_VoiceMessaging}} cannot reach AAWG server:

* The application will not receive notifications about new messages in user's voicemail box.
* The application will not receive notifications about user's voicemail number changes.

Application is notified about voice messaging service unavailability via {{=Services_VoiceMessaging_VoiceMessaging}}~onMessagingServiceUnavailableCallback. {{=Services_VoiceMessaging_VoiceMessaging}}'s capabilities are also updated to reflect unavailable voice messaging operations.
Once connection to AAWG server is restored, Client SDK notifies application via {{=Services_VoiceMessaging_VoiceMessaging}}~onMessagingServiceAvailableCallback. {{=Services_VoiceMessaging_VoiceMessaging}}'s capabilities are also updated to reflect unavailable voice messaging operations.

##Media Preservation

Media Preservation is a technique used by Client SDK to minimize the occurrence of dropped calls as a result of network disruptions. 
Call signaling feature is provided by AAWG server and call media is provided by Avaya Media Server. When the call signaling server becomes unreachable for Client SDK the call media can still remain available. In this case the call enters media preservation mode and most of the call's features become unavailable until signaling session is recovered. 

Client SDK attempts to automatically restore the signaling session but this process is best-effort and applications must be prepared to deal with calls that once are media preserved stay in this state until they are terminated by your application or the user of your application.

Additional information is available in **Call signaling server is unreachable** section.
