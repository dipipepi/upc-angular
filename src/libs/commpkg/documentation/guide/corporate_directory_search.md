{{= BackToPackageOverview }}

# Corporate Directory Search

Contacts service can be used to find contacts in enterprise directory.
To do that you should build search reqest by creating an instance of {{=Services_Contacts_ContactSearchRequest}}.
It should be specified with following attributes:

| Attribute       | Description                                  | Possible values             | 
|-----------------|----------------------------------------------|-----------------------------|
| searchString    | String to search for                         | string                      |
| searchString    | Scope of search                              | NAME, HANDLE, TERMINAL, ALL |
| searchSource    | Specifies where to search                    | LOCAL, NETWORK, ALL         |
| maxResults      | Max number of results to return in total     | number                      |
| maxChunkSize    | Number of results to return in each callback | number                      |

See example in the following code snippet:

```javascript
var searchRequest = new AvayaClientServices.Services.Contacts.ContactSearchRequest(
        // String to search for
        'Bob',
        // Scope of search. If NAME is selected, search will be looking for 'Bob' in all name-related properties.
        AvayaClientServices.Services.Contacts.SearchScopeType.NAME,
        // Source of search. Select NETWORK to search in enterprise directory,
        // LOCAL to search in your contact list or ALL to search both
        AvayaClientServices.Services.Contacts.SearchSourceType.NETWORK,
        // Total number of returned results
        5,
        // Number of results to return along with each onDataRetrievalProgress callback
        1
);
```

Next, check Network Search Contacts Capability. Operation might be unavailable, for example, if the contacts server is temporarily down. Because of that, it's recommended to check the capability prior to attempting to search the contact with ***Source = NETWORK*** or ***ALL***. 

```javascript
/**
 * @type {AvayaClientServices.Base.Capability}
 */
var networkSearchCapability = contactsService.getNetworkSearchContactCapability();
 
if (!networkSearchCapability .isAllowed) {
    console.log('Search contacts in network is currently unavailable');
}
```

Finally, pass the search request to Contacts service. Search results are being returned asynchronously, using {{=Base_DataRetrieval}} class - just like retrieving contacts list.

```javascript
/**
 * @type {AvayaClientServices.Base.DataRetrieval}
 */
var contactsRetrieval;
try {
    contactsRetrieval = contactsService.searchContacts(searchRequest);
} catch (contactsError) {
    console.error('Search request has failed validation', contactsError);
}

if (contactsRetrieval) {
    contactsRetrieval.addOnDataRetrievalFailedCallback(function (contactsError) {
        console.error('Search contacts has failed', contactsError);
    });
 
    contactsRetrieval.addOnDataRetrievalDoneCallback(function () {
        // All search results have been downloaded and available in underlying DataSet
        var searchResultsDataSet = contactsRetrieval.getDataSet();
        console.log('Contact search has finished successfully', searchResultsDataSet);
    });
}
```

If the contact, returned by search, is already in your contact list, you can edit it or delete. Otherwise, you can add it to your contact list. Please see <a href="using_shared_contacts.gsp">Using Shared Contacts</a>.
