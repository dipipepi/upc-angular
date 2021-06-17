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
    resolve(3);
  });
}

function test3(res) {
  return res*3;
}

test1().then(res=>{console.log('hello', res);});

const arr = {
  s: 3,
  sdf: 2,
  arr: [323, 23 ,23]
};

for(const el of arr.arr) {
  console.log('hello el', el);
}
