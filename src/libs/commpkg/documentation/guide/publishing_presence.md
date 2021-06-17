{{= BackToPackageOverview }}

#Publishing Presence

Using the Avaya Client SDK, your application can easily publish automatic presence or manual presence. 
Automatic Presence is an automatic activity based updates for users who don’t spend time managing their status, and works best for users who use multiple clients.  Automatic presence states include Available, On the phone, Busy, Offline, etc.
Manual Presence is an end user specified activity update for users who prefer privacy instead of automatic presence.  Manual presence states do not include ephemeral states such as On the phone.  When the end user selects a Manual Presence state, the state will be published superseding all automatic presence states set by other clients.  
Your application should never publish a manual presence state unless explicitly directed to do so by the end user.
 
##Initializing Presence

Your application is expected to execute the following steps, after initializing the Client SDK:

 1. Add self-presence watcher by {{=Services_Contacts_Contacts}}.getSelfContact().startPresence() 
 2. Publish Automatic presence using {{=Services_Presence_PresenceService}}.publishAutomaticPresence()
 3. Add other presence watchers for your application

**Note:** 
Your application should never publish a manual presence state during initialization of your application.

##Retrieving Self Presence

Self presence of the user can be retrieved using API described in <a href="using_presence_with_shared_contacts.gsp">Using Presence With Shared Contacts</a>. You need to obtain {{=Services_Contacts_Contact}} instance that represents user - to do that, call {{=User}}.getSelfContact(). Please note that *getSelfContact()* function will return self contact only after Contacts service initialization. To know when Contacts service is initialized you can use {{=Services_Contacts_Contacts}}.onContactsServiceUnavailableCallback.
In case of self contact, {{=Services_Contacts_Contact}}.onPresenceChangedCallback will be called with argument of {{=Services_Presence_SelfPresence}} type and {{=Services_Contacts_Contact}}.getPresence() function will return {{=Services_Presence_SelfPresence}}.

```javascript
var onContactsAvailableCallback = function () {
    var selfContact = user.getSelfContact();
    selfContact.addOnPresenceChangedCallback(
        /**
         * @param {AvayaClientServices.Services.Contacts.Contact} contact
         * @param {AvayaClientServices.Services.Presence.SelfPresence} selfPresence
         */
        function (contact, selfPresence) {
            console.log('Overall self presence state is ' + selfPresence.getOverallState());
        }
    );
    selfContact.startPresence().then(
        function () {
            console.log('Successfully subscribed for self presence');
        },
        /**
         * @param {AvayaClientServices.Services.Presence.PresenceError} error
         */
        function (error) {
            console.error('Failed to subscribe for self presence updates', error);
        }
    );
    // Remove this callback once it's called for the first time as we already retrieved self contact
    contacts.removeOnContactsServiceUnavailableCallback(onContactsAvailableCallback);
};
contacts.addOnContactsServiceUnavailableCallback(onContactsAvailableCallback);
```

##Publishing Automatic Presence

To publish channel presence, you should retrieve self presence object, update states of desired channels and then call ***presenceService.publishAutomaticPresence()***.

```javascript
selfPresence.setPhoneState(AvayaClientServices.Services.Presence.PhonePresenceState.PRESENCE_STATE_ON_A_CALL);
// Offline state for video channel presence can be used, for example, if client's device doesn't have video camera
selfPresence.setVideoState(AvayaClientServices.Services.Presence.VideoPresenceState.PRESENCE_STATE_OFFLINE);
selfPresence.setEnterpriseIMState(AvayaClientServices.Services.Presence.IMPresenceState.PRESENCE_STATE_ON_A_CALL);
  
presenceService.publishAutomaticPresence().then(
    function () {
        console.log('Channel (automatic) presence has been published successfully');
    },
    /**
     * @param {AvayaClientServices.Services.Presence.PresenceError} error
     */
    function (error) {
        console.log('Failed to publish channel (automatic) presence', error);
    }
);
```
  
##Publishing Manual Presence

Manual Presence State should only be invoked by your application under direction of the end user.  It should never be set automatically by your application. To publish a  manual presence state , call respective function of {{=Services_Presence_PresenceService}}.

###Publish manual presence state

```javascript
presenceService.publishManualState(AvayaClientServices.Services.Presence.PresenceManualState.PRESENCE_STATE_AVAILABLE).then(
    function () {
        console.log('Manual presence state has been published successfully');
    },
    /**
     * @param {AvayaClientServices.Services.Presence.PresenceError} error
     */
    function (error) {
        console.log('Failed to publish manual presence state', error);
    }
);
```

###Publish presence location mode

```javascript
presenceService.publishLocationMode(AvayaClientServices.Services.Presence.PresenceLocationMode.PRESENCE_LOCATION_MODE_MOBILE).then(
    function () {
        console.log('Manual presence location mode has been published successfully');
    },
    /**
     * @param {AvayaClientServices.Services.Presence.PresenceError} error
     */
    function (error) {
        console.log('Failed to publish presence location mode', error);
    }
);
```

###Publish manual presence note

```javascript
presenceService.publishNote('I\'m out of the office today, for urgent issues please contact my manager').then(
    function () {
        console.log('Manual presence note has been published successfully');
    },
    /**
     * @param {AvayaClientServices.Services.Presence.PresenceError} error
     */
    function (error) {
        console.log('Failed to publish manual presence note', error);
    }
);
```

