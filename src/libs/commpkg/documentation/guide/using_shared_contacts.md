{{= BackToPackageOverview }}

#Using Shared Contacts

Using the Avaya Client SDK, you can easily access and use shared contacts via Contacts service. Its features include creating new contacts, updating and deleting existing contacts:

* [Add contacts](#addcontacts)
* [Edit contacts](#editcontacts)
* [Delete contacts](#deletecontacts)

Shared contacts can be added from enterprise directory providers like Microsoft Active Directory. For more details see <a href="corporate_directory_search.gsp">Corporate Directory Search</a>.
Contacts found in enterprise directory also can be added to the user’s list. For more details see [Add contacts](#addcontacts).
The list of contacts for the user should be retrieved on Contacts service start up. For more details see [Retrieve user's contact list and listen for it's updates](#getcontacts).

Also Avaya Client SDKs Contacts service, allows you to retrieve contact’s presence. For more details see  <a href="using_presence_with_shared_contacts.gsp">Using Presence With Shared Contacts</a>.

<a id="getcontacts"></a>
##Retrieve user's contact list and listen for it's updates

Once Contacts Service becomes available, you can start working with contacts. Let's retrieve user's contact list first.
To do that, call {{=Services_Contacts_Contacts}}.getContacts(). The object it returns is instance of {{=Base_DataRetrieval}} class, which is used for asynchronous data retrieval operations. 
Once retrieval operation is done, callback function provided to {{=Base_DataRetrieval}}.addOnDataRetrievalDoneCallback() will be called. At this point, all contacts are downloaded and ready for use.
Contacts are provided to the application using callback function you should provide to {{=Base_DataSet}} instance, underlying in {{=Base_DataRetrieval}}.
Don't remove {{=Base_DataSet}}.OnDataSetChangedCallback() after all contacts are downloaded because further changes of the contact list will be reported to this function.

```javascript
user.getContacts().addOnContactsServiceAvailableCallback(function () {
    // Get Contacts service instance
    var contactsService = user.getContacts();
 
    var contactsRetrieval = contactsService.getContacts();
    var contactsSet = contactsRetrieval.getDataSet();
 
    contactsSet.addOnDataSetChangedCallback(function (contacts, type) {
        if (type === AvayaClientServices.Base.DataSetChangeTypes.ADDED) {
            contacts.forEach(function (contact) {
                console.log('Contact has been added to user\' contact list', contact);
            });
        }
        else if (type === AvayaClientServices.Base.DataSetChangeTypes.UPDATED) {
            contacts.forEach(function (contact) {
                console.log('Contact has been updated', contact);
            });
        }
        else if (type === AvayaClientServices.Base.DataSetChangeTypes.REMOVED) {
            contacts.forEach(function (contact) {
                console.log('Contact has been removed from user\' contact list', contact);
            });
        }
    });
 
    contactsRetrieval.addOnDataRetrievalFailedCallback(function (error) {
        console.log('Failed to retrieve contacts', error);
    });
 
    contactsRetrieval.addOnDataRetrievalDoneCallback(function () {
        // All contacts have been downloaded and available in underlying DataSet.
        // Any further updates in the contact list will be reported to callback function provided to
        // contactsSet.addOnDataSetChangedCallback().
        console.log('All contacts have been downloaded');
    });
});
```

<a id="addcontacts"></a>
##Add contacts

Start adding a contact from obtaining an instance of {{=Services_Contacts_EditableContact}} by calling {{=Services_Contacts_Contacts}}.createEditableContact(). Once contact is created, all its properties will have empty values.

```javascript
/**
 * @type {AvayaClientServices.Services.Contacts.EditableContact}
 */
var newContact = contactsModule.createEditableContact();
```

Next step is filling contact object with information. See [Edit contacts](#editcontacts) for details.
Once you've finished filling the contact object with information, verify that you haven't missed any of the necessary information by checking contact's {{=Services_Contacts_EditableContact}}.getContactSavableCapability().

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var savableCapability = newContact.getContactSavableCapability();
console.log('New contact ' + (savableCapability.isAllowed ? 'has' : 'does not have') + ' all necessary information filled');
```

If ***savableCapability.isAllowed*** has false value then you've missed some of the necessary contact's information. Please see {{=Services_Contacts_EditableContact}}.getContactSavableCapability() documentation for details.
Otherwise, if the contact is savable, next step will be checking if Add Contact operation is available at the moment. Operation might be unavailable, for example, if the contacts server is temporarily down. Because of that, it's recommended to check the capability prior to attempting to add the contact.

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var addCapability = contactsModule.getAddContactCapability();
if (!addCapability) {
   console.log('Add contact operation is currently unavailable');
}
```

If this capability is allowed, you can add the contact.

```javascript
contactsModule.addContact(newContact).then(
    function () {
        console.log('New contact has been added successfully');
    },
    /**
     * @function
     * param {AvayaClientServices.Services.Contacts.ContactsError} error
     */
    function (error) {
        console.log('Failed to add new contact', error);
    }
);
```

<a id="editcontacts"></a>
##Edit contacts

Start editing a contact by obtaining an instance of {{=Services_Contacts_EditableContact}} by calling {{=Services_Contacts_Contacts}}.createEditableContactFromContact(). This function makes existing contact editable and sets writability of particular contact's properties.

```javascript
/**
 * @type {AvayaClientServices.Services.Contacts.EditableContact}
 */
var editableContact = contactsModule.createEditableContactFromContact(contact);
``` 

Next step is updating the contact's information. 

```javascript
/**
 * Types of properties of EditableContact have 'Editable' prefix in class names and setValue() function.
 * @type {AvayaClientServices.Services.Contacts.EditableContactStringField}
 */
var editableFirstName = editableContact.getFirstName();
  
// Edit property of EditableContactStringField type
editableFirstName.setValue('Bob');
 
// Edit property of EditableContactBooleanField type
editableContact.isFavorite().setValue(true);
 
// Edit property of EditableContactNumberField type
editableContact.getRank().setValue(0.5);
 
// Edit property of ContactFieldList<AvayaClientServices.Services.Contacts.EditableContactPhoneField>
var phoneNumbersArray = contact.getPhoneNumbers().getValues();
 
// Update the existing phone number
if (phoneNumbersArray[0]) {
    phoneNumbersArray[0].setPhoneNumberType(AvayaClientServices.Services.Contacts.ContactPhoneNumberType.PHONE_NUMBER_MOBILE);
}
 
// Delete the existing phone number
if (phoneNumbersArray[1]) {
    var index = phoneNumbersArray.indexOf(phoneNumbersArray[1]);
    phoneNumbersArray.splice(index, 1);
}
 
// Add new phone number
var newPhoneNumber = new AvayaClientServices.Services.Contacts.EditableContactPhoneField();
newPhoneNumber.setPhoneNumber('1(234)567-89-00');
phoneNumbersArray.push(newPhoneNumber);
```

Also, some of contact's properties might be read-only. Before attempting to edit the property, check its Write Capability. 

```javascript
/**
 * @type {AvayaClientServices.Services.Contacts.EditableContactStringField}
 */
firstNameProperty = editableContact.getFirstName();
if (!firstNameProperty.getWriteCapability().isAllowed) {
    console.warn('First name of this contact is read-only');
} else {
    firstNameProperty.setValue('Bob');
}
```

This capability should be used in 'edit contact' UI of your application to disable input fields for read-only properties.

Once you've finished updating the contact's information, verify that you haven't missed any of the necessary information by checking contact's {{=Services_Contacts_EditableContact}}.getContactSavableCapability().

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var savableCapability = editableContact.getContactSavableCapability();
console.log('Contact ' + (savableCapability.isAllowed ? 'has' : 'does not have') + ' all necessary information filled');
``` 

If ***savableCapability.isAllowed*** has false value then you've missed some of the necessary contact's information. Please see {{=Services_Contacts_EditableContact}}.getContactSavableCapability() documentation for details.
Otherwise, if the contact is savable, next step will be checking if Update Contact operation is available at the moment. Operation might be unavailable, for example, if the contacts server is temporarily down. Because of that, it's recommended to check the capability prior to attempting to update the contact.

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var editCapability = editableContact.getUpdateContactCapability();
if (!editCapability) {
   console.log('Update contact operation is currently unavailable');
}
```

If this capability is allowed, you can update this contact.

```javascript
contactsModule.updateContact(editableContact).then(
    function () {
        console.log('Contact has been updated successfully');
    },
    /**
     * @function
     * @param {AvayaClientServices.Services.Contacts.ContactsError} error
     */
    function (error) {
        console.log('Failed to update contact', error);
    }
);
```

<a id="deletecontacts"></a>
##Delete contacts

Start deleting contact by checking if Delete Contact operation is available at the moment. Operation might be unavailable, for example, if the contacts server is temporarily down. Because of that, it's recommended to check the capability prior to attempting to delete the contact.

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var deleteContactCapability = contactsModule.getDeleteContactCapability(contact);
if (!deleteContactCapability.isAllowed) {
    console.log('Delete contact operation is currently unavailable');
}
``` 

If this capability is allowed, you can update this contact.

```javascript
contactsModule.deleteContact(contact).then(
    function () {
        console.log('Contact has been deleted successfully');
    },
    /**
     * @function
     * @param {AvayaClientServices.Services.Contacts.ContactsError} error
     */
    function (error) {
        console.log('Failed to delete contact', error);
    }
);
```
