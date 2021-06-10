{{= BackToPackageOverview }}

# Retrieving live/future broadcasts

All methods requre {{=Services_ProgramService_ProgramParams}} parameter. This object has many properties. Not all of them are needed for each method, but for this case there are three mandatory properties:

* tenantId
* user
* timezoneOffset

Parameter *user* used only for authorized user.

## Example

Methods' parameter can comprise the following properties:

|   Property       |
|:-----------------|
|  tenantId        |
|  user            |
|  timezoneOffset  |
|  query           |
|  offset          |
|  count           |
|  orderBy         |
|  orderBy2        |
|  category        |
|  ownerId         |

```javascript
// Get All Current and Schedule Live Broadcasts
client.programService.getAllBroadcasts(programParameters)
    .done(function(response){
            // response contains broadcasts
        });

// Get Future Live Broadcasts
client.programService.getFutureLiveBroadcasts(programParameters)
    .done(function(response){
            // response contains broadcasts
        });

// Get Today's Current Live Broadcasts
client.programService.getTodayBroadcasts(programParameters)
    .done(function(response){
            // response contains broadcasts
        });

// Get Current Live Broadcasts
client.programService.getOngoingBroadcasts(programParameters)
    .done(function(response){
            // response contains broadcasts
        });
```
