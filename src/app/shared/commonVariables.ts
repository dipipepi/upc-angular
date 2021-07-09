import * as _ from 'lodash';
import {SimpleChanges} from '@angular/core';


export const path = window.location.href.split('/');
export let currentAlias;
export let checkingAlias;
export let baseUrl;

if (path[4] === 'tenants') {
  currentAlias = path[5].split('?')[0];
  window.localStorage.lastTenant = currentAlias;
  checkingAlias = currentAlias;
  baseUrl = `/portal/tenants/${currentAlias || window.localStorage.lastTenants}/`;
  // baseUrl = `/portal/`;
}


