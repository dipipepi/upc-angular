{{= BackToPackageOverview }}

# Viewing reports

## Retrieve program access reports

Method require {{=Services_ReportsService_AccessReportParams}} parameter. There are two mandatory properties:

* tenantId
* user

Parameter *user* used only for authorized user.

```javascript
client.reportService.getProgramAccessReport(parameters)
    .done(function(response){
        // response contains reports
    });
```

Method returns a list of {{=Services_ReportsService_AccessReport}}

## Retrieve program access reports for a single program

Method require {{=Services_ReportsService_AccessReportOneProgramParams}} parameter. For authorized user there is one mandatory property *user*.

```javascript
client.reportService.getProgramAccessReportForProgram(programId, parameters)
    .done(function(response){
        // response contains reports
    });
```

Method returns a list of {{=Services_ReportsService_AccessReport}}

## Retrieve program viewer information for a single program

Method require {{=Services_ReportsService_AccessReportParams}} parameter. There are two mandatory properties:

*tenantId
*user

Parameter *user* used only for authorized user.

```javascript
client.reportService.getProgramViewers(programId)
    .done(function(response){
        // response contains reports
    });
```

Method returns a list of {{=Services_ReportsService_ViewerReport}}