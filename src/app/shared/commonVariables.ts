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

export function test(): Promise<any> {
  return new Promise<unknown>((resolve) => {
    resolve(test2().then(onTestSuccess, onTestFail));
  });
}

function test2(): Promise<any> {
  return test3().then(onTest3Success, onTest3Fail);
}

function onTestSuccess(): Promise<unknown> {
  return new Promise(resolve => {
    resolve(1);
  });
}

function onTestFail(): Promise<unknown> {
  return new Promise(resolve => {
    resolve(2);
  });
}

function test3(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {resolve(3);}, 1000);
  });
}

function onTest3Success(): Promise<unknown> {
  return new Promise(resolve => {
    resolve(4);
  });
}

function onTest3Fail(): Promise<unknown> {
  return new Promise(resolve => {
    resolve(5);
  });
}
