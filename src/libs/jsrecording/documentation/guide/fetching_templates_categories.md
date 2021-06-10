{{= BackToPackageOverview }}

# Retrieving templates, categories

All methods requre {{=Services_ProgramService_ProgramParams}} parameter. This object has many properties. Not all of them are needed for each method, but there are two mandatory properties:

* tenantId
* user

Parameter *user* used only for authorized user. Next, we consider that these parameters are already contained.

## Example

```javascript
// Retrieve All Categories
client.programService.getAllCategories(parameters)
    .done(function(response){
        // response contains categories
    });

// Retrieve an Individual Category
client.programService.getCategory(categoryId, parameters)
    .done(function(response){
        // response contains category
    });

// Retrieve All Templates
client.programService.getAllTemplates(parameters)
    .done(function(response){
        // response contains templates
    });

// Retrieve an Individual Template
client.programService.getTemplate(templateId, parameters)
    .done(function(response){
        // response contains template
    });
```
