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

// tslint:disable-next-line:typedef
function test1() {
  return new Promise(resolve => {
    resolve(test2().then(test3));
  });
}

// tslint:disable-next-line:typedef
function test2() {
  return new Promise((resolve) => {
    resolve(true);
  });
}

function test3(res): Promise<boolean> {
  return new Promise((resolve, reject) => {
    reject(false);
  });
  // return res*3;
}

export function valueChanged(valueName: string, valueObject: SimpleChanges): boolean  {
  return valueObject[valueName].previousValue !== undefined;
}

const obj1 = {
  a: 3,
  b: 2,
  c: 1
};

const obj2 = _.cloneDeep(obj1);


obj2.a = 1;
obj2.c = 3;


