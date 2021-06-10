{{= BackToPackageOverview }}

# Retrieving settings

There are two possible system configuration:

* Enterprise mode
* MultiTenants mode

In case of Enterprise mode you have to use {{=Services_SystemSettingsService}}, for Multitenant mode {{=Services_TenantService}}.

## Get System setting in Enterprise mode

```javascript
client.systemSettingsService.getSystemSettings(params);
```
This method returns {{=Services_SystemSettingsService_SystemSettings}}

## Get settings for current tenant in MultiTenant mode

For MultiTenant mode there are not common system settings. Each tenant can be configured individually. So {{=Services_TenantService_Tenant}} object contain attributes and settings.

```javascript
client.tenantService.getIndividualTenant(tenantId, params);
```

This method returns {{=Services_TenantService_Tenant}} settings
