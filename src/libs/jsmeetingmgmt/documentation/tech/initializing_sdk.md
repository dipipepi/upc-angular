{{= BackToPackageOverview }}

#Initializing SDK

This article discusses how to initialize the Avaya Client SDK Meeting Management Package for JavaScript within your application.

##Creating a Client

The central class of the Avaya Client SDK is {{=AvayaMeetingManagementClient}}. Each application using the Client SDK will have its own instance of {{=AvayaMeetingManagementClient}} and will maintain a reference to this object in order to access features within the SDK.

##Creation of the Client object

The first part of the process is a creation of ClientConfig instance object with Resources:

```javascript
var clientConfig = new AvayaMeetingManagementClient.Config.СlientConfig({
	resources: {
		resources: {
			conference: {
				GET: {
					getConferences: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/'
					},
					getBroadcastProfiles: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/broadcast_profiles'
					},
					getPropositionalNumber: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/propositional_number'
					}
				},
				POST: {
					createConference: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/'
					},
					getResourceAvailability: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/resource_availability'
					},
					getVirtualRoom: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/virtual_room'
					}
				},
				DELETE: {
					deleteConference: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/'
					}
				},
				PUT: {
					updateConference: {
						href: 'https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/conference/'
					}
				}
			},

		}
	}
});
```

And final part is a creation of client instance object:

```javascript
var client = AvayaMeetingManagementClient(clientConfig);
```