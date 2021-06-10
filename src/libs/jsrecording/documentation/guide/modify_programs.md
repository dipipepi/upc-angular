{{= BackToPackageOverview }}

# Update/remove/recovery programs

All methods requre {{=Services_ProgramService_ProgramParams}} parameter. This object has many properties. Not all of them are needed for each method, but there are two mandatory properties:

* tenantId
* user

Parameter *user* used only for authorized user. Next, we consider that these parameters are already contained.

## Update program

```javascript
// creating Program object which contain difference
var diff = new AvayaRecordingClient.Services.ProgramService.Program();

//properties which can be edited
diff.categoryId = 'someId';
diff.accessMode = 'newAccessMode';
diff.public = true;
diff.allowMediaDownload = true;
diff.name = 'newName';
diff.description = 'newdescription';
diff.password = 'password';
diff.participantUsers = [];
diff.thumbnailMimeType = 'thumbnailMimeType';
diff.thumbnailData = '';
diff.accessUsers = [];

client.programService.updateProgram(programId, diff, programParameters)
	.done(function(response) {
		// the response is updated program
	});
```

## Remove program

*programParameters* object can comprise:

|   Property        |
|:------------------|
|  deleteResources  |
|  permanent        |

```javascript
client.programService.deleteProgram(programId, programParameters);
```


## Recovery program

Programs can be recoverd only if system settings recordingRetentionPolicy flag is set to 'N_DAYS' or 'FOREVER';

```javascript
var diff = new AvayaRecordingClient.Services.ProgramService.Program();
diff.deleted = false;
client.programService.updateProgram(programId, diff, programParameters);
```

