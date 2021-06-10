{{= BackToPackageOverview }}

#Working with Token Authorization

All Client SDK services that depend on infrastructure services accessed over a network require authentication token. Applications are responsible for providing the token to the Client SDK through the "start" function of {{=MeetingManagementService}}.

##Getting Authorization Token from Unified Portal Server

Before starting the Client SDK you need to get token from Unified Portal Server by user credentials and organization alias:

Request URL:
```
https://dev-cores205.uplab.com/ups/resources/tenants/dev-org205/authentication/login
```

Request Method:
```
POST
```

Request payload:
```
login: 2050001
organizationAlias: dev-org205
password: 2050001
```

Example of response payload:
```
{
    "token": "3FF0EBF4DBF611E699343367B015B4E1",
    "encryptedPassword":"E0nNHR9o3trYzHLag7wALW0xw4IBgwHpzxuhqcitT5U="
}
```

##Starting Meeting Management Service with Token Authentication

To register for authentication a {{=AvayaMeetingManagementClient}} instance must be created. Authorization occurs by the following sequence:
After creating of {{=AvayaMeetingManagementClient}} instance object:

```javascript
var service = client.meetingManagementService;
service.start(TOKEN);
```

* Then Meeting Management Service uses this token

##Stopping Meeting Management Service

To stop service, simply call

```javascript
service.stop();
```

* For change user (token) you need to stop service and start with new authentication token.
