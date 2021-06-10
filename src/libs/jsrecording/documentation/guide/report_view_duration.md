{{= BackToPackageOverview }}

# Reporting recording's view duration

When you start and stop playing program you should send a report about it. With the two calls, Avaya Equinox Streaming & Recording get a rough approximation of how long a user viewed a video.

All methods requre {{=Services_ProgramService_ProgramParams}} parameter. This object has many properties. Not all of them are needed for each method, but there are two mandatory properties:

* tenantId
* user

Parameter *user* used only for authorized user. Next, we consider that these parameters are already contained.

## Report program start view

```javascript
var reportId;
client.programService.reportProgramView(programId, programParameters).then(
    function(response){
        reportId = response;
    }
);
```

## Report program end view

```javascript
client.programService.reportEndProgramView(programId, reportId, programParameters)
```