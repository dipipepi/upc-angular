{{= BackToPackageOverview }}

#Using Presence with Shared Contacts

Using the Avaya Client SDK, you can easily get presence of shared contacts.
To display presence of contact from your device, you must complete the following activities.

* [Subscribe for contact's presence](#subscribeforpresence)
* [Start presence service for contact](#startpresence)
* [Get contact's presence](#getpresence)
* [Stop presence service for contact and unsubscribe from updates](#stoppresence)

<a id="subscribeforpresence"></a>
##Subscribe for contact's presence

To subscribe for contact's presence, use functions exposed by {{=Services_Contacts_Contact}} class.
First, add {{=Services_Contacts_Contact}}.onPresenceChangedCallback() to {{=Services_Contacts_Contact}}.

```javascript
var onPresenceChanged = function (contact, presence) {
    console.log('Overall presence state of ' + contact.getDisplayName() + ' is ' + presence.getOverallState());
};
contact.addOnPresenceChangedCallback(onPresenceChanged);
```

<a id="startpresence"></a>
##Start presence service for contact

After that, call {{=Services_Contacts_Contact}}.startPresence(). You will receive instant notification with current presence information of the contact and will be receiving further updates. 

```javascript
contact.startPresence().then(
        function () {
            console.log('Successfully subscribed for presence updates of ', contact.getDisplayName());
        },
        /**
         * @param {AvayaClientServices.Services.Presence.PresenceError} error
         */
        function (error) {
            console.error('Failed to subscribe for presence updates', error);
        }
);
```

<a id="getpresence"></a>
##Get contact's presence

Once we subscribed for contact's presence the updates will be reflected automatically. See [Subscribe for contact's presence](#subscribeforpresence) for more details.
If you need to get contact's presence immediately, call {{=Services_Contacts_Contact}}.getPresence() after presence service is started.

```javascript
/**
*
* @param {AvayaClientServices.Services.Presence.Presence} presence
*/
var presence = contact.getPresence();
```

<a id="stoppresence"></a>
##Stop presence service for contact and unsubscribe from updates

Do not forget to unsubscribe from contact's presence when you no longer want to receive the presence updates. 
First, remove {{=Services_Contacts_Contact}}.onPresenceChangedCallback() from {{=Services_Contacts_Contact}}.
After that, call {{=Services_Contacts_Contact}}.stopPresence() to stop presence service for contact.

```javascript
contact.removeOnPresenceChangedCallback(onPresenceChanged);
contact.stopPresence()
```
