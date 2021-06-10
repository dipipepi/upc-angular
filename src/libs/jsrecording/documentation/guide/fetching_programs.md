{{= BackToPackageOverview }}

# Retrieving programs

All methods requre {{=Services_ProgramService_ProgramParams}} parameter. This object has many properties. Not all of them are needed for each method, but there are two mandatory properties:

* tenantId
* user

Parameter *user* used only for authorized user. Next, we consider that these parameters are already contained.

## Retrieve recordings by common method:

This method's parameter can comprise the following properties:

|   Property    |
|:--------------|
|  query        |
|  offset       |
|  count        |
|  orderBy      |
|  orderBy2     |
|  category     |
|  ownerId      |
|  onlyDeleted  |

```javascript
client.programService.getRecordedPrograms(programParameters)
	.done(function(response){
		// response contains programs
	});
```

## Retrieve recordings by category:

This method's parameter can comprise the following properties:

|   Property    |
|:--------------|
|  offset       |
|  count        |

```javascript
client.programService.getRecordedProgramsByCategory(programParameters)
	.done(function(response){
		// response contains programs
	});
```

## Retrieve recordings by publisher:

This method's parameter can comprise the following properties:

|   Property    |
|:--------------|
|  offset       |
|  count        |
|  onlyDeleted  |

```javascript
client.programService.getRecordedProgramsByPublisher(programParameters)
	.done(function(response){
		// response contains programs
	});
```

## Get an Individual Program

```javascript
client.programService.getPrograms(programId, programParameters)
	.done(function(response){
		// response contains program
	});
```

## Get a Password Protected Program

```javascript
client.programService
	.getPasswordProtectedProgram(programId, password, programParameters)
		.done(function(response){
		// response contains program
	});
```

## Get an Individual Program's playback address details

```javascript
client.programService
	.getProgramPlaybackAddressDetails(programId, password, programParameters)
		.done(function(response){
		// response contains address details
	});
```

## Get Status of Program

```javascript
client.programService.getProgramStatus(programId, programParameters)
		.done(function(response){
		// response contains status
	});
```