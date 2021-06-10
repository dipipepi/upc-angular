/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.5.1",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(D).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var j,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||j,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,j=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^key/,we=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Te=/^([^.]*)(?:\.(.+)|)/;function Ce(){return!0}function Ee(){return!1}function Se(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)ke(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Ee;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Ae(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,Ce)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=Te.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=Te.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click",Ce),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ce:Ee,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ee,isPropagationStopped:Ee,isImmediatePropagationStopped:Ee,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ce,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ce,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ce,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&be.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&we.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Ae(this,e,Se),!1},trigger:function(){return Ae(this,e),!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return ke(this,e,t,n,r)},one:function(e,t,n,r){return ke(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ee),this.each(function(){S.event.remove(this,e,n,t)})}});var Ne=/<script|<style|<link/i,De=/checked\s*(?:[^=]|=\s*.checked.)/i,je=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function qe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function Le(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function He(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Oe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function Pe(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&De.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Pe(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),Le)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,He),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(je,""),u,l))}return n}function Re(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Oe(o[r],a[r]);else Oe(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Re(this,e,!0)},remove:function(e){return Re(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Pe(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||qe(this,e).appendChild(e)})},prepend:function(){return Pe(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=qe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ne.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Pe(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Me=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Ie=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},We=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Fe=new RegExp(ne.join("|"),"i");function Be(e,t,n){var r,i,o,a,s=e.style;return(n=n||Ie(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Me.test(a)&&Fe.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function $e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px",t.style.height="1px",n.style.height="9px",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=3<parseInt(r.height),re.removeChild(e)),a}}))}();var _e=["Webkit","Moz","ms"],ze=E.createElement("div").style,Ue={};function Xe(e){var t=S.cssProps[e]||Ue[e];return t||(e in ze?e:Ue[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=_e.length;while(n--)if((e=_e[n]+t)in ze)return e}(e)||e)}var Ve=/^(none|table(?!-c[ea]).+)/,Ge=/^--/,Ye={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"};function Je(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ke(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Ze(e,t,n){var r=Ie(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=Be(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Me.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Ke(e,t,n||(i?"border":"content"),o,r,a)+"px"}function et(e,t,n,r,i){return new et.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Be(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Ge.test(t),l=e.style;if(u||(t=Xe(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Ge.test(t)||(t=Xe(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Be(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ve.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Ze(e,u,n):We(e,Ye,function(){return Ze(e,u,n)})},set:function(e,t,n){var r,i=Ie(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Ke(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Ke(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Je(0,t,s)}}}),S.cssHooks.marginLeft=$e(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Be(e,"marginLeft"))||e.getBoundingClientRect().left-We(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Je)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Ie(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=et).prototype={constructor:et,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=et.propHooks[this.prop];return e&&e.get?e.get(this):et.propHooks._default.get(this)},run:function(e){var t,n=et.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):et.propHooks._default.set(this),this}}).init.prototype=et.prototype,(et.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[Xe(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=et.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=et.prototype.init,S.fx.step={};var tt,nt,rt,it,ot=/^(?:toggle|show|hide)$/,at=/queueHooks$/;function st(){nt&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(st):C.setTimeout(st,S.fx.interval),S.fx.tick())}function ut(){return C.setTimeout(function(){tt=void 0}),tt=Date.now()}function lt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ct(e,t,n){for(var r,i=(ft.tweeners[t]||[]).concat(ft.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ft(o,e,t){var n,a,r=0,i=ft.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=tt||ut(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:tt||ut(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=ft.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ct,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(ft,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],ft.tweeners[n]=ft.tweeners[n]||[],ft.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ot.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ct(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?ft.prefilters.unshift(e):ft.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=ft(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&at.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(lt(r,!0),e,t,n)}}),S.each({slideDown:lt("show"),slideUp:lt("hide"),slideToggle:lt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(tt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),tt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){nt||(nt=!0,st())},S.fx.stop=function(){nt=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},rt=E.createElement("input"),it=E.createElement("select").appendChild(E.createElement("option")),rt.type="checkbox",y.checkOn=""!==rt.value,y.optSelected=it.selected,(rt=E.createElement("input")).value="t",rt.type="radio",y.radioValue="t"===rt.value;var pt,dt=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?pt:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),pt={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=dt[t]||S.find.attr;dt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=dt[o],dt[o]=r,r=null!=a(e,t,n)?o:null,dt[o]=i),r}});var ht=/^(?:input|select|textarea|button)$/i,gt=/^(?:a|area)$/i;function vt(e){return(e.match(P)||[]).join(" ")}function yt(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):ht.test(e.nodeName)||gt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,yt(this)))});if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,yt(this)))});if(!arguments.length)return this.attr("class","");if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,yt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=mt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=yt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+vt(yt(n))+" ").indexOf(t))return!0;return!1}});var xt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(xt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:vt(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var bt=/^(?:focusinfocus|focusoutblur)$/,wt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!bt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,bt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,wt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,wt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var Tt=C.location,Ct={guid:Date.now()},Et=/\?/;S.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||S.error("Invalid XML: "+e),t};var St=/\[\]$/,kt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,Nt=/^(?:input|select|textarea|keygen)/i;function Dt(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||St.test(n)?i(n,t):Dt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)Dt(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)Dt(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&Nt.test(this.nodeName)&&!At.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(kt,"\r\n")}}):{name:t.name,value:n.replace(kt,"\r\n")}}).get()}});var jt=/%20/g,qt=/#.*$/,Lt=/([?&])_=[^&]*/,Ht=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ot=/^(?:GET|HEAD)$/,Pt=/^\/\//,Rt={},Mt={},It="*/".concat("*"),Wt=E.createElement("a");function Ft(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Bt(t,i,o,a){var s={},u=t===Mt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function $t(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Wt.href=Tt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?$t($t(e,S.ajaxSettings),t):$t(S.ajaxSettings,e)},ajaxPrefilter:Ft(Rt),ajaxTransport:Ft(Mt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Ht.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Tt.href)+"").replace(Pt,Tt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Wt.protocol+"//"+Wt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Bt(Rt,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ot.test(v.type),f=v.url.replace(qt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(jt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Et.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Lt,"$1"),o=(Et.test(f)?"&":"?")+"_="+Ct.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+It+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Bt(Mt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var _t={0:200,1223:204},zt=S.ajaxSettings.xhr();y.cors=!!zt&&"withCredentials"in zt,y.ajax=zt=!!zt,S.ajaxTransport(function(i){var o,a;if(y.cors||zt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(_t[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Ut,Xt=[],Vt=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||S.expando+"_"+Ct.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Vt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Vt,"$1"+r):!1!==e.jsonp&&(e.url+=(Et.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Xt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Ut=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Ut.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=vt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):("number"==typeof f.top&&(f.top+="px"),"number"==typeof f.left&&(f.left+="px"),c.css(f))}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=$e(y.pixelPosition,function(e,t){if(t)return t=Be(e,n),Me.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Gt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Gt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Yt=C.jQuery,Qt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Qt),e&&C.jQuery===S&&(C.jQuery=Yt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});

;/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (window) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Root object for Meeting Management service
     * @public
     * @memberOf window
     * @define AvayaMeetingManagementClient
     * @param {AvayaMeetingManagementClient.Config.ClientConfig} clientConfig - data object with resources for service
     *
     * @example <caption>Create JSC SDK Client instance</caption>
     *     var client = new AvayaMeetingManagementClient(clientConfig);
     */
    function AvayaMeetingManagementClient(clientConfig) {
        if (!clientConfig) {
            return false;
        }

        if (clientConfig.logger) {
            window.ammcLogger = clientConfig.logger;
        } else if (window.console) {
            window.ammcLogger = window.console;
        } else {
            alert('Console object is not exist for that browser, no default logging available then. Please provide specific Logger object.');
        }

        /**
         * @public
         * @type {AvayaMeetingManagementClient.Config.Logger}
         * @desc Optional custom logger implementation class
         * @default window.console
         */
        this.logger = clientConfig.logger || window.console;

        /**
         * @public
         * @type {AvayaMeetingManagementClient.MeetingManagementService}
         * @desc Meeting Management service instance
         */
        this.meetingManagementService = new AvayaMeetingManagementClient.MeetingManagementService(clientConfig.resources);
    }

    window.AvayaMeetingManagementClient = AvayaMeetingManagementClient;
})(window);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *  @desc A bunch of base classes, constants, fixed objects that not depends on exact implementation or server type
     * @namespace AvayaMeetingManagementClient.Base
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Base
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base = AvayaMeetingManagementClient.Base || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Shared base classes that can be extended for various use
     * @namespace AvayaMeetingManagementClient.Base.Providers
     * @memberOf AvayaMeetingManagementClient.Base
     * @define AvayaMeetingManagementClient.Base.Providers
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base.Providers = AvayaMeetingManagementClient.Base.Providers || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Constants, resources, regexp patterns e t c
     * @namespace AvayaMeetingManagementClient.Constants
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Constants
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Constants = AvayaMeetingManagementClient.Constants || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Custom implementations for different server types, API versions and classes
     * @namespace AvayaMeetingManagementClient.Providers
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Providers
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Providers = AvayaMeetingManagementClient.Providers || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Validator classes for all existing objects
     * @namespace AvayaMeetingManagementClient.Providers.Validators
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.Validators
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Providers.Validators = AvayaMeetingManagementClient.Providers.Validators || {};
    })(AvayaMeetingManagementClient);

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @desc Contains prototypes of objects which are necessary to provide connection with various servers used by AvayaMeetingManagementClient SDK.
     * @namespace AvayaMeetingManagementClient.Config
     * @memberOf AvayaMeetingManagementClient
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Config = AvayaMeetingManagementClient.Config || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Specifies response objects for various request types
     * @namespace AvayaMeetingManagementClient.Base.Responses
     * @memberOf AvayaMeetingManagementClient.Base
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base.Responses = AvayaMeetingManagementClient.Base.Responses || {};
    })(AvayaMeetingManagementClient);

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function ($, AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base REST provider
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     */
    function RequestBuilder() {
        /**
         * @private
         * @type {string}
         * @desc Class name to provide into logger
         */
        this._name = '';
    }

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.RequestBuilder#send
     * @memberOf AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @desc Send HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.send = function (opts) {
        return $.ajax(this.buildHeaders(opts));
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.RequestBuilder#buildHeaders
     * @memberOf AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @desc Build specified headers for HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.buildHeaders = function (opts) {
        if (this.token !== undefined){
            opts.headers.Authorization = 'UPToken ' + this.token;
        }
        return opts;
    };

    AvayaMeetingManagementClient.Base.Providers.RequestBuilder = RequestBuilder;
})(jQuery, AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function ($, AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base validator class. Provide checks for basic types and some common functions. Not a final implementation.
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.Validator
     */
    function Validator() {}

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isNumberType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for number value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isNumberType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isIdType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for ID type value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isIdType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.ID.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isStringType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for string value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isStringType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.STRING.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isBooleanValue
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for boolean value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isBooleanValue = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isEmptyValue
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for empty value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyValue = function (value) {
        return (value === '' || value === null || value === undefined);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isEmptyString
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for empty string
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyString = function (value) {
        return typeof value === 'string' && value.trim() === '';
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#validate
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Validate value for custom criteria using RegExp expression
     * @private
     * @param value - value to check
     * @param {RegEx} criteria - {@link AvayaMeetingManagementClient.Constants.CONDITIONS}
     * @param {boolean} isMandatory - if yes empty field will return false
     * @returns {boolean}
     */
    Validator.prototype.validate = function (value, criteria, isMandatory) {
        return criteria.test(value) || (!isMandatory && this.isEmptyValue(value));
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#errorInvalidObject
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Invalid object response as a {@link AvayaMeetingManagementClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {string[]} - Array of field names with error
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    Validator.prototype.errorInvalidObject = function (agent, response) {
        ammcLogger.warn(agent + ': errorInvalidObject: %o', response);
        return $.Deferred().reject(response).promise();
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#errorCustomEvent
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Return custom response as a rejected {@link AvayaMeetingManagementClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {Object} - custom response object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    Validator.prototype.errorCustomEvent = function (agent, error) {
        ammcLogger.warn(agent + ': errorCustomEvent: %s', error);
        return $.Deferred().reject(error).promise();
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#buildValidationResponse
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Form response object based on number errors faced during validation
     * @private
     * @param {string[]} - Array of fields with error
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    Validator.prototype.buildValidationResponse = function (errors) {
        return new AvayaMeetingManagementClient.Base.Responses.ObjectValidation(errors);
    };

    AvayaMeetingManagementClient.Base.Providers.Validator = Validator;

})(jQuery, AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base dto class for data objects.
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.Dto
     */
    function Dto() {
        /**
         * @private
         * @type {AvayaMeetingManagementClient.Providers.Validators}
         * @desc Attaching Validator object to a class
         */
        this._validator = '';
    }

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Dto#validate
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Dto
     * @public
     * @returns {AvayaMeetingManagementClient.Providers.Validators}
     */
    Dto.prototype.validate = function () {
        return this._validator.validateObject(this);
    };

    AvayaMeetingManagementClient.Base.Providers.Dto = Dto;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Meeting Management Service class that contains definitions of JSC SDK API. Only public methods defined here should be used by client-side layer.
     * @public
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.MeetingManagementService
     * @param {AvayaMeetingManagementClient.Config.Resources} resources - resources for service
     * @example <caption>Create Service instance, start it and API method call</caption>
     * //Provide Client's config usually obtained from Resource Discovery
     * var clientConfig = new AvayaMeetingManagementClient.Config.ClientConfig();
     *
     * //Custom logger if needed
     * var logger = new AvayaMeetingManagementClient.Providers.CustomLogger();
     *
     * var client = new AvayaMeetingManagementClient(clientConfig);
     * var service = client.meetingManagementService;
     * service.start();
     */
    function MeetingManagementService(resources) {

        /**
         * @public
         * @type {AvayaMeetingManagementClient.Config.Resources}
         */
        this.resources = resources;

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaMeetingManagementClient.Providers.MeetingProvider}
         */
        this._provider = undefined;

        /**
         * @private
         * @type {Boolean}
         */
        this._isStarted = false;
    }

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#isStarted
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Is Meeting Management Service instance started or not
     * @public
     * @returns {boolean}
     */
    MeetingManagementService.prototype.isStarted = function () {
        return this._isStarted;
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#start
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Start service for provided server\user data (should be performed after log in)
     * @public
     * @param {string} token - authentication token
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingManagementService.prototype.start = function (token) {
        var dfd = $.Deferred();

        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.resources = this.resources;
        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.token = token;

        this._provider = new AvayaMeetingManagementClient.Providers.MeetingProvider();

        this._isStarted = true;
        ammcLogger.log('Meeting Management Service has started!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#stop
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Stop service for provided server\user data (should be performed after logout)
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingManagementService.prototype.stop = function () {
        var dfd = $.Deferred();

        delete AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.resources;
        delete AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.token;

        this._provider = undefined;

        this._isStarted = false;
        ammcLogger.log('Meeting Management Service has stopped!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#createMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Schedule a new meeting
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.createMeeting(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.createMeeting = function (meeting) {
        return this._provider.createMeeting(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing meeting
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateMeeting(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateMeeting = function (meeting) {
        return this._provider.updateMeeting(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateOccurrence
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing occurrence in meeting series
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateOccurrence(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateOccurrence = function (meeting) {
        return this._provider.updateOccurrence(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateSeries
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing meeting series
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateSeries(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateSeries = function (meeting) {
        return this._provider.updateSeries(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel a meeting
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelMeeting(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelMeeting = function (meetingId) {
        return this._provider.cancelMeeting(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#terminateMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Terminate a meeting
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.terminateMeeting(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.terminateMeeting = function (meetingId) {
        return this._provider.terminateMeeting(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelOccurrence
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel occurrence in meeting series
     * @public
     * @param {number} recurrenceId
     * @param {Date|number} occurrenceStartTime
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelOccurrence(recurrenceId, occurrenceStartTime).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelOccurrence = function (recurrenceId, occurrenceStartTime) {
        return this._provider.cancelOccurrence(recurrenceId, occurrenceStartTime);
    };

        /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelSeries
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel a meeting series
     * @public
     * @param {number} recurrenceId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelSeries(recurrenceId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelSeries = function (recurrenceId) {
        return this._provider.cancelSeries(recurrenceId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchMeetings
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search meetings by subject and description (contains logic) and by conference number and conference id (exact match)
     * @public
     * @param {string} searchQuery
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchMeetings('Meeting room', 0, 20).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchMeetings = function (searchQuery, offset, count) {
        return this._provider.searchMeetings(searchQuery, offset, count);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingById
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by Id: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingById(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingById = function (meetingId) {
        return this._provider.getMeetingById(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByDate
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by provided date: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Date|number} date
     * @param {Boolean} fetchPastMeetings
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByDate(1471001940172, true, false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByDate = function (date, fetchPastMeetings, detailed) {
        return this._provider.getMeetingListByDate(date, fetchPastMeetings, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByPeriod
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by provided period: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Date|number} startDate
     * @param {Date|number} endDate
     * @param {Boolean} fetchPastMeetings
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByDate(1471001940172, 1471001980172, true, false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByPeriod = function (startDate, endDate, fetchPastMeetings, detailed) {
        return this._provider.getMeetingListByPeriod(startDate, endDate, fetchPastMeetings, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListIsOngoing
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get list of ongoing meetings: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListIsOngoing(false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListIsOngoing = function (detailed) {
        return this._provider.getMeetingListIsOngoing(detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByStatus
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get all meetings by status: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {string} status
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByStatus('FINISHED').fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByStatus = function (status, detailed) {
        return this._provider.getMeetingListByStatus(status, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListStartsIn
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meetings which start by provided minutes: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {number} minutes
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListStartsIn(5, true).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListStartsIn = function (minutes, detailed) {
        return this._provider.getMeetingListStartsIn(minutes, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getBroadcastProfiles
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getBroadcastProfiles().fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getBroadcastProfiles = function () {
        return this._provider.getBroadcastProfiles();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getEndpointResourceAvailability
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get resource availability for endpoints for a day
     * @public
     * @param {number} startTime
     * @param {string[]} terminalIds
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getEndpointResourceAvailability(1471001940172, 'TERMINAL-1', 1059).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getEndpointResourceAvailability = function (startTime, terminalIds, meetingId) {
        return this._provider.getEndpointResourceAvailability(startTime, terminalIds, meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByName
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by part of VR name in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} partOfVRName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByName(2004, 'VR1', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByName = function (tenantId, partOfVRName, offset, pageSize) {
        return this._provider.searchVirtualRoomsByName(tenantId, partOfVRName, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByNumber
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by VR number in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} number
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByNumber(2004, '652050001', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByNumber = function (tenantId, number, offset, pageSize) {
        return this._provider.searchVirtualRoomsByNumber(tenantId, number, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByUserName
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by part of user name in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} partOfUserName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByUserName(2004, 'Alex', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByUserName = function (tenantId, partOfUserName, offset, pageSize) {
        return this._provider.searchVirtualRoomsByUserName(tenantId, partOfUserName, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getPropositionalData
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get propositional data (default new meeting values such as: number, duration and virtualMeetingIDPrefix) generated for meetings out of VRs
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getPropositionalData().fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getPropositionalData = function () {
        return this._provider.getPropositionalData();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getVideoLayoutsArray
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get array of available video layouts
     * @public
     * @returns {Object[]}
     */
    MeetingManagementService.prototype.getVideoLayoutsArray = function () {
        return this._provider.getVideoLayoutsArray();
    };

    AvayaMeetingManagementClient.MeetingManagementService = MeetingManagementService;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Monthly recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @param {Object|undefined} meeting
     */
    function Meeting(meeting) {
        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof meeting !== 'undefined' && meeting !== null) {
            this._memberId = meeting.memberId || '';
            this._userId = meeting.userId || '';
            this._number = meeting.number || '';
            this._parentMeetingNumber = meeting.parentMeetingNumber || '';
            this._accessPIN = meeting.accessPIN || '';
            this._moderatorPIN = meeting.moderatorPIN || '';
            this._serviceTemplateId = meeting.serviceTemplateId || '';
            this._servicePrefix = meeting.servicePrefix || '';
            this._priority = meeting.priority || '';
            this._allowStreaming = meeting.allowStreaming || 'OFF';
            this._streamingStatus = meeting.streamingStatus || '';
            this.client = meeting.client || '';

            this._attendees = [];
            if (meeting.attendees) {
                if (Array.isArray(meeting.attendees)) {
                    for (var i = 0; i < meeting.attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(meeting.attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(meeting.attendees));
                }
            }

            this._blockDialIn = (typeof meeting.blockDialIn === 'boolean') ? meeting.blockDialIn : false;
            this._autoExtend = (typeof meeting.autoExtend === 'boolean') ? meeting.autoExtend : false;
            this._waitingRoom = (typeof meeting.waitingRoom === 'boolean') ? meeting.waitingRoom : false;
            this._oneTimePINRequired = (typeof meeting.oneTimePINRequired === 'boolean') ? meeting.oneTimePINRequired : false;
            this._conferenceId = meeting.conferenceId || '';
            this._status = meeting.status || '';
            this._subject = meeting.subject || '';
            this._description = meeting.description || '';

            this._earlyTime = '';
            if (meeting.earlyTime) {
                try {
                    this._earlyTime = new Date(meeting.earlyTime).toISOString();
                } catch (e) {}
            }

            this._startTime = '';
            if (meeting.startTime) {
                try {
                    this._startTime = new Date(meeting.startTime).toISOString();
                } catch (e) {}
            }

            this._plannedEndTime = '';
            if (meeting.plannedEndTime) {
                try {
                    this._plannedEndTime = new Date(meeting.plannedEndTime).toISOString();
                } catch (e) {}
            }

            this._timeZoneId = meeting.timeZoneId || '';
            this._duration = meeting.duration || '';
            this._locationId = meeting.locationId || '';
            this._testOnly = (typeof meeting.testOnly === 'boolean') ? meeting.testOnly : false;
            this._sendingNotification = (typeof meeting.sendingNotification === 'boolean') ? meeting.sendingNotification : true;
            this._recordingMeetingWhenStart = (typeof meeting.recordingMeetingWhenStart === 'boolean') ? meeting.recordingMeetingWhenStart : false;
            this._recurrenceId = meeting.recurrenceId || '';
            this._eventConference = meeting.eventConference || false;
            this._panelistNumber = meeting.panelistNumber || undefined;
            this._participantLaunchURL = meeting.participantLaunchURL || '';
            this._swcLaunchURLforModerator = meeting.swcLaunchURLforModerator || '';

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(meeting.reservedPorts);
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(meeting.advancedProperties);
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily(meeting.daily);
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly(meeting.weekly);
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly(meeting.monthly);
            this._yearly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly(meeting.yearly);
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd(meeting.recurrenceEnd);
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting(meeting.broadcastSetting);
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(meeting.mainVideoLayout);
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(meeting.customerVideoLayout);
        } else {
            this._memberId = '';
            this._userId = '';
            this._number = '';
            this._parentMeetingNumber = '';
            this._accessPIN = '';
            this._moderatorPIN = '';
            this._serviceTemplateId = '';
            this._servicePrefix = '';
            this._priority = '';
            this._allowStreaming = '';
            this._streamingStatus = '';
            this._attendees = [];
            this._blockDialIn = false;
            this._autoExtend = false;
            this._waitingRoom = false;
            this._oneTimePINRequired = false;
            this._conferenceId = '';
            this._status = '';
            this._subject = '';
            this._description = '';
            this._earlyTime = '';
            this._startTime = '';
            this._plannedEndTime = '';
            this._timeZoneId = '';
            this._duration = '';
            this._locationId = '';
            this._testOnly = false;
            this._sendingNotification = true;
            this._recordingMeetingWhenStart = false;
            this._recurrenceId = '';
            this._eventConference = false;
            this._panelistNumber = undefined;
            this._participantLaunchURL = '';
            this._swcLaunchURLforModerator = '';
            this._client = '';

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts();
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties();
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily();
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly();
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly();
            this._yearly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly();
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd();
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting();
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout({layoutName:"MAIN"});
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout({layoutName:"CUSTOMER"});
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.MeetingValidator();
    }

    Meeting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name memberId
     * @desc The organization ID, required in service provider (multi-tenant) deployments only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'memberId', {
        get : function () {
            return this._memberId;
        },
        set : function (val) {
            this._memberId = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc The internal ID of the participant's username for users registered in Scopia® Management. If the user is defined locally within Scopia® Management, this value is the internal ID of that user. If the user is defined in an LDAP directory, this field is the GUID. This field is for users defined in Scopia Management only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    /**
     * @instance
     * @name number
     * @desc The number you dial to connect to the videoconference, composed of the service prefix and the unique number created by the conference creator.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name parentMeetingNumber
     * @desc The parentMeetingNumber you dial to connect to the videoconference, composed of the service prefix and the unique number created by the conference creator.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'parentMeetingNumber', {
        get : function () {
            return this._parentMeetingNumber;
        },
        set : function (val) {
            this._parentMeetingNumber = val;
        }
    });

    /**
     * @instance
     * @name accessPIN
     * @desc The PIN to access this virtual room if defined ({@link AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom}). Encoded in BASE64.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'accessPIN', {
        get : function () {
            return this._accessPIN;
        },
        set : function (val) {
            this._accessPIN = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc The optional PIN to take on moderator rights in videoconferences held in this virtual room. Encoded in BASE64.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name serviceTemplateId
     * @desc The ID of the meeting type (service) stored in Scopia® Management, often activated by dialing the prefix for this meeting type. Specify ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'serviceTemplateId', {
        get : function () {
            return this._serviceTemplateId;
        },
        set : function (val) {
            this._serviceTemplateId = val;
        }
    });

    /**
     * @instance
     * @name servicePrefix
     * @desc The prefix on the dial string associated with the ServiceTemplateId. Specify either ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'servicePrefix', {
        get : function () {
            return this._servicePrefix;
        },
        set : function (val) {
            this._servicePrefix = val;
        }
    });

    /**
     * @instance
     * @name priority
     * @desc Determines whether and how to cascade the videoconference. When more than one MCU is available in a distributed network, you can choose to place all participants on a central MCU, or you can cascade the meeting over several MCUs. Possible values are:
     * • DELAY - indicates Scopia® Management invites all participants directly to a main MCU, whatever their location. Scopia® Management allocates resources to ensure the best video quality. Since DELAY can be costly in terms of bandwidth, we recommend to take topology into account before selecting.
     * • LOCAL - indicates Scopia® Management invites all participants to meetings hosted on their local MCUs (according to IP topology settings). It then cascades these meetings together to form a single conference. This preserves bandwidth.
     * • UNSPECIFIED - indicates the system behaves according to the default meeting settings of Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'priority', {
        get : function () {
            return this._priority;
        },
        set : function (val) {
            this._priority = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Determines whether this user's virtual room is able to stream a videoconference to viewers using a streaming client like VLC. Possible values are:
     * • ON indicates streaming is allowed.
     * • OFF indicates this user does not have the rights to stream a videoconference.
     * • DISABLED indicates there is no Scopia® Desktop Streaming Server to support this functionality.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'allowStreaming', {
        get : function () {
            return this._allowStreaming;
        },
        set : function (val) {
            this._allowStreaming = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Defines whether streaming is enabled for viewing clients in an ongoing meeting. Possible values are:
     * • ON indicates streaming is enabled for this videoconference.
     * • OFF indicates streaming is disabled for this videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'streamingStatus', {
        get : function () {
            return this._streamingStatus;
        },
        set : function (val) {
            this._streamingStatus = val;
        }
    });

    /**
     * @instance
     * @name attendees
     * @desc Container tag holding details of a user or an endpoint. Endpoints are represented by the TerminalID, TerminalName, TerminalNumber, while users are represented by their UserId, FirstName, LastName and Email. You must specify at least an endpoint or a user, or you can define both.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'attendees', {
        get : function () {
            return this._attendees;
        },
        set : function (attendees) {
            this._attendees = [];
            if (attendees) {
                if (Array.isArray(attendees)) {
                    for (var i = 0; i < attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees));
                }
            }
        }
    });

    /**
     * @instance
     * @name reservedPorts
     * @desc Container tag defining the number of ports (participant connections) with different resolutions reserved for this videoconference.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'reservedPorts', {
        get : function () {
            return this._reservedPorts;
        },
        set : function (reservedPorts) {
            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(reservedPorts);
        }
    });

    /**
     * @instance
     * @name blockDialIn
     * @desc BOOL indicating if others can join this videoconference by dialing in.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'blockDialIn', {
        get : function () {
            return this._blockDialIn;
        },
        set : function (val) {
            this._blockDialIn = val;
        }
    });

    /**
     * @instance
     * @name autoExtend
     * @desc BOOL indicating if the videoconference can be automatically extended.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'autoExtend', {
        get : function () {
            return this._autoExtend;
        },
        set : function (val) {
            this._autoExtend = val;
        }
    });

    /**
     * @instance
     * @name waitingRoom
     * @desc BOOL indicating whether this videoconference has waiting room functionality enabled. To receive a True response, you need to have configured a moderator PIN in the virtual room settings. You also need to have selected the Place participant in a ‘waiting room’ until the moderator joins the meeting checkbox.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'waitingRoom', {
        get : function () {
            return this._waitingRoom;
        },
        set : function (val) {
            this._waitingRoom = val;
        }
    });

    /**
     * @instance
     * @name advancedProperties
     * @desc Container tag for additional properties of this videoconference.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'advancedProperties', {
        get : function () {
            return this._advancedProperties;
        },
        set : function (advancedProperties) {
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(advancedProperties);
        }
    });

    /**
     * @instance
     * @name oneTimePINRequired
     * @desc BOOL indicating whether this videoconference (as opposed to the virtual room's default) has a PIN which must be entered for a participant to successfully join.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'oneTimePINRequired', {
        get : function () {
            return this._oneTimePINRequired;
        },
        set : function (val) {
            this._oneTimePINRequired = val;
        }
    });

    /**
     * @instance
     * @name conferenceId
     * @desc The ID of the videoconference. For recurring videoconferences, it is the ID of the generic meeting for all instances of this meeting.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'conferenceId', {
        get : function () {
            return this._conferenceId;
        },
        set : function (val) {
            this._conferenceId = val;
        }
    });

    /**
     * @instance
     * @name status
     * @desc The current status of the videoconference. We suggest leaving this field blank in this request. The response can hold one of the following values:
     * • ABNORMAL_STOPPED indicates the videoconference terminated with a significant error.
     * • CANCELLED indicates the videoconference was scheduled and then cancelled. To cancel a videoconference, see Cancel Conference on page 107.
     * • FINISHED indicates the videoconference has already ended.
     * • IN_SESSION indicates the videoconference is ongoing.
     * • NOT_START indicates the videoconference has not yet started.
     * • SCHEDULE_FAILED indicates an error while attempting to schedule this videoconference.
     * • START_FAILED indicates an error while trying to start the videoconference.
     * • STOP_FAILED indicates an error while trying to end the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'status', {
        get : function () {
            return this._status;
        },
        set : function (val) {
            this._status = val;
        }
    });

    /**
     * @instance
     * @name subject
     * @desc The title of the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'subject', {
        get : function () {
            return this._subject;
        },
        set : function (val) {
            this._subject = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc A longer description of the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name earlyTime
     * @desc The format is in UTC time: YYYY-MM-DDThh:mm:ss+hh:mm, for example 2012-07-26T17:30:00+08:30. The time zone is specified as an offset of UTC, by adding a positive or negative number of hours and minutes.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'earlyTime', {
        get : function () {
            return this._earlyTime;
        },
        set : function (val) {
            this._earlyTime = val;
        }
    });

    /**
     * @instance
     * @name startTime
     * @desc specifies the start date and time of the videoconference in UTC format: YYYY-MM-DDThh:mm:ss+hh:mm
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'startTime', {
        get : function () {
            return this._startTime;
        },
        set : function (val) {
            this._startTime = val;
        }
    });

    /**
     * @instance
     * @name plannedEndTime
     * @desc specifies the planned end date and time of the videoconference in UTC format: YYYY-MM-DDThh:mm:ss+hh:mm
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'plannedEndTime', {
        get : function () {
            return this._plannedEndTime;
        },
        set : function (val) {
            this._plannedEndTime = val;
        }
    });

    /**
     * @instance
     * @name timeZoneId
     * @desc ID representing the time zone for scheduling videoconferences internationally. For example, enter the value Asia/Singapore to represent GMT+08:00.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'timeZoneId', {
        get : function () {
            return this._timeZoneId;
        },
        set : function (val) {
            this._timeZoneId = val;
        }
    });

    /**
     * @instance
     * @name duration
     * @desc The planned duration of the videoconference. Expressed as a standard duration type in XML. For example, P1H30M denotes 1 hour 15 minutes. The string is composed as follows:
     * • P is at the start of the string (mandatory) indicating the period of time.
     * • nY indicates the number of years.
     * • nM indicates the number of months.
     * • nD indicates the number of days.
     * • T indicates the start of the time section (mandatory if specifying a time).
     * • nH indicates the number of hours.
     * • nM indicates the number of minutes.
     * • nS indicates the number of seconds.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'duration', {
        get : function () {
            return this._duration;
        },
        set : function (val) {
            this._duration = val;
        }
    });

    /**
     * @instance
     * @name locationId
     * @desc The ID of the location as defined in Scopia® Management. This field is often used for branches in an organization. The videoconference is held on an MCU, where one of its properties is its location.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'locationId', {
        get : function () {
            return this._locationId;
        },
        set : function (val) {
            this._locationId = val;
        }
    });

    /**
     * @instance
     * @name testOnly
     * @desc This is used when testing the scheduling functionality, to verify resource usage. Send this request once with this value set to TRUE, to verify the resources are available, then send it again set to FALSE to actually make the booking.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'testOnly', {
        get : function () {
            return this._testOnly;
        },
        set : function (val) {
            this._testOnly = val;
        }
    });

    /**
     * @instance
     * @name sendingNotification
     * @desc BOOL indicating whether to send out an email to all participants when the videoconference is created, changed or removed from the schedule.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'sendingNotification', {
        get : function () {
            return this._sendingNotification;
        },
        set : function (val) {
            this._sendingNotification = val;
        }
    });

    /**
     * @instance
     * @name recordingMeetingWhenStart
     * @desc BOOL indicating whether recording automatically starts when the videoconference begins
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recordingMeetingWhenStart', {
        get : function () {
            return this._recordingMeetingWhenStart;
        },
        set : function (val) {
            this._recordingMeetingWhenStart = val;
        }
    });

    /**
     * @instance
     * @name eventConference
     * @desc BOOL Indicate conference as a special “event conference”, involving up to 2,000 terminals. (Meeting Management API v.2)
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'eventConference', {
        get : function () {
            return this._eventConference;
        },
        set : function (val) {
            this._eventConference = val;
        }
    });

    /**
     * @instance
     * @name panelistNumber
     * @desc Bridge number for Event Conferencing meetings (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'panelistNumber', {
        get : function () {
            return this._panelistNumber;
        },
        set : function (val) {
            this._panelistNumber = val;
        }
    });

    /**
     * @instance
     * @name participantLaunchURL
     * @desc launch URL for common participant (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'participantLaunchURL', {
        get : function () {
            return this._participantLaunchURL;
        },
        set : function (val) {
            this._participantLaunchURL = val;
        }
    });

    /**
     * @instance
     * @name swcLaunchURLforModerator
     * @desc Web Client launch URL for moderator (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'swcLaunchURLforModerator', {
        get : function () {
            return this._swcLaunchURLforModerator;
        },
        set : function (val) {
            this._swcLaunchURLforModerator = val;
        }
    });

    /**
     * @instance
     * @name recurrenceId
     * @desc Recurrent meeting ID
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recurrenceId', {
        get : function () {
            return this._recurrenceId;
        },
        set : function (val) {
            this._recurrenceId = val;
        }
    });

    /**
     * @instance
     * @name daily
     * @desc Container tag for videoconferences recurring every few days. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'daily', {
        get : function () {
            return this._daily;
        },
        set : function (daily) {
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily(daily);
        }
    });

    /**
     * @instance
     * @name weekly
     * @desc Container tag for videoconferences which recur on a weekly basis. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'weekly', {
        get : function () {
            return this._weekly;
        },
        set : function (weekly) {
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly(weekly);
        }
    });

    /**
     * @instance
     * @name monthly
     * @desc Container tag for videoconferences which recur on a monthly basis. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'monthly', {
        get : function () {
            return this._monthly;
        },
        set : function (monthly) {
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly(monthly);
        }
    });

    /**
     * @instance
     * @name yearly
     * @desc Container tag for videoconferences which recur on a yearly basis. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.yearly}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'yearly', {
        get : function () {
            return this._yearly;
        },
        set : function (yearly) {
            this._yearly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly(yearly);
        }
    });

    /**
     * @instance
     * @name recurrenceEnd
     * @desc Container tag to define the end condition of recurring videoconferences. They can end by a certain date, or after a certain number of meetings.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recurrenceEnd', {
        get : function () {
            return this._recurrenceEnd;
        },
        set : function (recurrenceEnd) {
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd(recurrenceEnd);
        }
    });

    /**
     * @instance
     * @name broadcastSetting
     * @desc Broadcast settings object
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'broadcastSetting', {
        get : function () {
            return this._broadcastSetting;
        },
        set : function (broadcastSetting) {
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting(broadcastSetting);
        }
    });

    /**
     * @instance
     * @name mainVideoLayout
     * @desc mainVideoLayout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'mainVideoLayout', {
        get : function () {
            return this._mainVideoLayout;
        },
        set : function (mainVideoLayout) {
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(mainVideoLayout);
        }
    });

    /**
     * @instance
     * @name customerVideoLayout
     * @desc customerVideoLayout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'customerVideoLayout', {
        get : function () {
            return this._customerVideoLayout;
        },
        set : function (customerVideoLayout) {
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(customerVideoLayout);
        }
    });

    /**
     * @instance
     * @name client
     * @desc client which was used to schedule this meeting
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'client', {
        get : function () {
            return this._client;
        },
        set : function (client) {
            this._client = client;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting = Meeting;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Class that represents virtual room instance
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     * @param {Object|undefined} virtualRoom
     */
    function VirtualRoom(virtualRoom) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof virtualRoom !== 'undefined' && virtualRoom !== null) {
            this._memberId = virtualRoom.memberId || '';
            this._virtualRoomId = virtualRoom.virtualRoomId || '';
            this._number = virtualRoom.number || '';
            this._accessPIN = virtualRoom.accessPIN || '';
            this._moderatorPIN = virtualRoom.moderatorPIN || '';
            this._serviceTemplateId = virtualRoom.serviceTemplateId || '';
            this._servicePrefix = virtualRoom.servicePrefix || '';
            this._priority = virtualRoom.priority || '';
            this._allowStreaming = virtualRoom.allowStreaming || false;
            this._streamingStatus = virtualRoom.streamingStatus || '';

            this._attendees = [];
            if (virtualRoom.attendee) {
                if (Array.isArray(virtualRoom.attendee)) {
                    for (var i = 0; i < virtualRoom.attendee.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(virtualRoom.attendee[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(virtualRoom.attendee));
                }
            }

            this._blockDialIn = virtualRoom.blockDialIn || false;
            this._autoExtend = virtualRoom.autoExtend || false;
            this._waitingRoom = virtualRoom.waitingRoom || false;
            this._oneTimePINRequired = virtualRoom.oneTimePINRequired || false;
            this._name = virtualRoom.name || '';
            this._description = virtualRoom.description || '';
            this._allowRecording = virtualRoom.allowRecording || false;
            this._defaultRoom = virtualRoom.defaultRoom || false;
            this._publicRoom = virtualRoom.publicRoom || false;
            this._maxParticipants = virtualRoom.maxParticipants || '';
            this._allowKnocking = virtualRoom.allowKnocking || false;
            this._allowInstantMeeting = virtualRoom.allowInstantMeeting || false;

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(virtualRoom.reservedPorts);
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(virtualRoom.advancedProperties);

        } else {
            this._memberId = '';
            this._virtualRoomId = '';
            this._number = '';
            this._accessPIN = '';
            this._moderatorPIN = '';
            this._serviceTemplateId = '';
            this._servicePrefix = '';
            this._priority = '';
            this._allowStreaming = false;
            this._streamingStatus = '';
            this._attendees = [];
            this._blockDialIn = false;
            this._autoExtend = false;
            this._waitingRoom = false;
            this._oneTimePINRequired = false;
            this._name = '';
            this._description = '';
            this._allowRecording = false;
            this._defaultRoom = false;
            this._publicRoom = false;
            this._maxParticipants = '';
            this._allowKnocking = false;
            this._allowInstantMeeting = false;

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts();
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator();
    }

    VirtualRoom.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name memberId
     * @desc The organization ID, required in service provider (multi-tenant) deployments only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'memberId', {
        get : function () {
            return this._memberId;
        },
        set : function (val) {
            this._memberId = val;
        }
    });

    /**
     * @instance
     * @name virtualRoomId
     * @desc The ID of the virtual room.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'virtualRoomId', {
        get : function () {
            return this._virtualRoomId;
        },
        set : function (val) {
            this._virtualRoomId = val;
        }
    });

    /**
     * @instance
     * @name number
     * @desc Number to dial to access this virtual room, without any prefixes which determine the meeting type. This number does not include any dial prefixes to activate a meeting type.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name accessPIN
     * @desc The PIN to access this virtual room if defined. Encoded in BASE64.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'accessPIN', {
        get : function () {
            return this._accessPIN;
        },
        set : function (val) {
            this._accessPIN = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc The optional PIN to take on moderator rights in videoconferences held in this virtual room. Encoded in BASE64.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name serviceTemplateId
     * @desc The ID of the meeting type (service) stored in Scopia® Management, often activated by dialing the prefix for this meeting type. Specify ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'serviceTemplateId', {
        get : function () {
            return this._serviceTemplateId;
        },
        set : function (val) {
            this._serviceTemplateId = val;
        }
    });

    /**
     * @instance
     * @name servicePrefix
     * @desc The prefix on the dial string associated with the ServiceTemplateId. Specify either ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'servicePrefix', {
        get : function () {
            return this._servicePrefix;
        },
        set : function (val) {
            this._servicePrefix = val;
        }
    });

    /**
     * @instance
     * @name priority
     * @desc Determines whether and how to cascade the videoconference. When more than one MCU is available in a distributed network, you can choose to place all participants on a central MCU, or you can cascade the meeting over several MCUs. Possible values are:
     * • DELAY indicates Scopia® Management invites all participants directly to a main MCU, whatever their location. Scopia® Management allocates resources to ensure the best video quality. Since DELAY can be costly in terms of bandwidth, we recommend to take topology into account before selecting.
     * • LOCAL indicates Scopia® Management invites all participants to meetings hosted on their local MCUs (according to IP topology settings). It then cascades these meetings together to form a single conference. This preserves bandwidth.
     * • UNSPECIFIED indicates the system behaves according to the default meeting settings of Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'priority', {
        get : function () {
            return this._priority;
        },
        set : function (val) {
            this._priority = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Determines whether this user's virtual room is able to stream a videoconference to viewers using a streaming client like VLC. Possible values are:
     * • ON indicates streaming is allowed.
     * • OFF indicates this user does not have the rights to stream a videoconference.
     * • DISABLED indicates there is no Scopia® Desktop Streaming Server to support this functionality.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowStreaming', {
        get : function () {
            return this._allowStreaming;
        },
        set : function (val) {
            this._allowStreaming = val;
        }
    });

    /**
     * @instance
     * @name streamingStatus
     * @desc Defines whether streaming is enabled for viewing clients in an ongoing meeting. Possible values are:
     * • ON indicates streaming is enabled for this videoconference.
     * • OFF indicates streaming is disabled for this videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'streamingStatus', {
        get : function () {
            return this._streamingStatus;
        },
        set : function (val) {
            this._streamingStatus = val;
        }
    });

    /**
     * @instance
     * @name attendees
     * @desc Container tag holding details of a user or an endpoint. Endpoints are represented by the TerminalID, TerminalName, TerminalNumber, while users are represented by their UserId, FirstName, LastName and Email. You must specify at least an endpoint or a user, or you can define both.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'attendees', {
        get : function () {
            return this._attendees;
        },
        set : function (attendees) {
            this._attendees = [];
            if (attendees) {
                if (Array.isArray(attendees)) {
                    for (var i = 0; i < attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees));
                }
            }
        }
    });

    /**
     * @instance
     * @name reservedPorts
     * @desc This Container tag defines the default number of ports (participant connections) with different resolutions reserved by this virtual room.
     * @type {AvayaVirtualRoomManagementClient.VirtualRoomManagementService.VirtualRoom.ReservedPorts}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'reservedPorts', {
        get : function () {
            return this._reservedPorts;
        },
        set : function (reservedPorts) {
            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(reservedPorts);
        }
    });

    /**
     * @instance
     * @name blockDialIn
     * @desc BOOL indicating if others can join this videoconference by dialing in.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'blockDialIn', {
        get : function () {
            return this._blockDialIn;
        },
        set : function (val) {
            this._blockDialIn = val;
        }
    });

    /**
     * @instance
     * @name autoExtend
     * @desc BOOL indicating if the videoconference can be automatically extended.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'autoExtend', {
        get : function () {
            return this._autoExtend;
        },
        set : function (val) {
            this._autoExtend = val;
        }
    });

    /**
     * @instance
     * @name waitingRoom
     * @desc BOOL indicating whether this videoconference has waiting room functionality enabled. To receive a True response, you need to have configured a moderator PIN in the virtual room settings. You also need to have selected the Place participant in a ‘waiting room’ until the moderator joins the meeting checkbox.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'waitingRoom', {
        get : function () {
            return this._waitingRoom;
        },
        set : function (val) {
            this._waitingRoom = val;
        }
    });

    /**
     * @instance
     * @name advancedProperties
     * @desc Container tag for additional properties of the default videoconference settings for this virtual room.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'advancedProperties', {
        get : function () {
            return this._advancedProperties;
        },
        set : function (advancedProperties) {
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(advancedProperties);
        }
    });

    /**
     * @instance
     * @name oneTimePINRequired
     * @desc BOOL indicating whether this videoconference (as opposed to the virtual room's default) has a PIN which must be entered for a participant to successfully join.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'oneTimePINRequired', {
        get : function () {
            return this._oneTimePINRequired;
        },
        set : function (val) {
            this._oneTimePINRequired = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc The name of this virtual room.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc The description of this virtual room.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name allowRecording
     * @desc BOOL indicating whether this user's virtual room can record a videoconference. Possible values are:
     * • ON indicates recording is allowed.
     * • OFF indicates this user does not have the rights to record a videoconference.
     * • DISABLED indicates the recording server cannot be found in this network.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowRecording', {
        get : function () {
            return this._allowRecording;
        },
        set : function (val) {
            this._allowRecording = val;
        }
    });

    /**
     * @instance
     * @name defaultRoom
     * @desc BOOL indicating if this virtual room is the user's default room.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'defaultRoom', {
        get : function () {
            return this._defaultRoom;
        },
        set : function (val) {
            this._defaultRoom = val;
        }
    });

    /**
     * @instance
     * @name publicRoom
     * @desc BOOL indicating if this virtual room is publicly accessible.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'publicRoom', {
        get : function () {
            return this._publicRoom;
        },
        set : function (val) {
            this._publicRoom = val;
        }
    });

    /**
     * @instance
     * @name maxParticipants
     * @desc The maximum number of participants allowed in this virtual room.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    /**
     * @instance
     * @name allowKnocking
     * @desc BOOL indicating is knocking allowed.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowKnocking', {
        get : function () {
            return this._allowKnocking;
        },
        set : function (val) {
            this._allowKnocking = val;
        }
    });

    /**
     * @instance
     * @name allowInstantMeeting
     * @desc BOOL indicating is instant meeting allowed.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowInstantMeeting', {
        get : function () {
            return this._allowInstantMeeting;
        },
        set : function (val) {
            this._allowInstantMeeting = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom = VirtualRoom;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Attendee object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     * @param {Object|undefined} attendee
     */
    function Attendee(attendee) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof attendee !== 'undefined' && attendee !== null) {
            this._terminalId = attendee.terminalId || '';
            this._protocol = attendee.protocol || '';
            this._terminalName = attendee.terminalName || '';
            this._terminalNumber = attendee.terminalNumber || '';
            this._maxBandwidth = attendee.maxBandwidth || '';
            this._maxISDNBandwidth = attendee.maxISDNBandwidth || '';
            this._areaCode = attendee.areaCode || '';
            this._countryCode = attendee.countryCode || '';
            this._telephoneNumber = attendee.telephoneNumber || '';
            this._restrictedMode = attendee.restrictedMode || false;
            this._threeG = attendee.threeG || false;
            this._voiceOnly = attendee.voiceOnly || false;
            this._userId = attendee.userId || '';
            this._firstName = attendee.firstName || '';
            this._lastName = attendee.lastName || '';
            this._email = attendee.email || '';
            this._organizer = attendee.organizer || false;
            this._host = attendee.host || false;
            this._needOnMaster = attendee.needOnMaster || false;
            this._autoDialIn = attendee.autoDialIn || false;
            this._mainPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.mainPartyInLayout);
            this._customerPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.customerPartyInLayout || {layoutName:"CUSTOMER"});
            this._partyOutLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.partyOutLayout);
            this._panelist = attendee.panelist || false;
        } else {
            this._terminalId = '';
            this._protocol = '';
            this._terminalName = '';
            this._terminalNumber = '';
            this._maxBandwidth = '';
            this._maxISDNBandwidth = '';
            this._areaCode = '';
            this._countryCode = '';
            this._telephoneNumber = '';
            this._restrictedMode = false;
            this._threeG = false;
            this._voiceOnly = false;
            this._userId = '';
            this._firstName = '';
            this._lastName = '';
            this._email = '';
            this._organizer = false;
            this._host = false;
            this._needOnMaster = false;
            this._autoDialIn = false;
            this._mainPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"MAIN"});
            this._customerPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"CUSTOMER"});
            this._partyOutLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"MAIN"});
            this._panelist = false;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator();
    }

    Attendee.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name terminalId
     * @desc The ID of an endpoint defined in Scopia® Management.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalId', {
        get : function () {
            return this._terminalId;
        },
        set : function (val) {
            this._terminalId = val;
        }
    });

    /**
     * @instance
     * @name protocol
     * @desc The protocol used for conferencing with the invited endpoint. Possible values are:
     * • H323 for endpoints supporting H.323 (e.g. XT Series or Scopia® Desktop Client).
     * • ISDN for ISDN-compatible endpoints.
     * • SIP for endpoints supporting the SIP protocol (e.g. XT Series).
     * • DUAL for endpoints supporting both H.323 and ISDN endpoints.
     * • MOBILE for mobile phones (e.g. 3G, 2G).
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'protocol', {
        get : function () {
            return this._protocol;
        },
        set : function (val) {
            this._protocol = val;
        }
    });

    /**
     * @instance
     * @name terminalName
     * @desc The name of the endpoint as defined within Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalName', {
        get : function () {
            return this._terminalName;
        },
        set : function (val) {
            this._terminalName = val;
        }
    });

    /**
     * @instance
     * @name terminalNumber
     * @desc The SIP or H.323 dial string used to reach this endpoint. This can be used for both internal endpoints registered within Scopia® Management, or external endpoints. For external endpoints, the number is its primary identifier.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalNumber', {
        get : function () {
            return this._terminalNumber;
        },
        set : function (val) {
            this._terminalNumber = val;
        }
    });

    /**
     * @instance
     * @name maxBandwidth
     * @desc The maximum bandwidth available for this endpoint. Optional, since the service (meeting type) also defines bandwidth limitations.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'maxBandwidth', {
        get : function () {
            return this._maxBandwidth;
        },
        set : function (val) {
            this._maxBandwidth = val;
        }
    });

    /**
     * @instance
     * @name maxISDNBandwidth
     * @desc The maximum bandwidth available over an ISDN or mobile connection.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'maxISDNBandwidth', {
        get : function () {
            return this._maxISDNBandwidth;
        },
        set : function (val) {
            this._maxISDNBandwidth = val;
        }
    });

    /**
     * @instance
     * @name areaCode
     * @desc Area code for dialing this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'areaCode', {
        get : function () {
            return this._areaCode;
        },
        set : function (val) {
            this._areaCode = val;
        }
    });

    /**
     * @instance
     * @name countryCode
     * @desc Country code for dialing this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'countryCode', {
        get : function () {
            return this._countryCode;
        },
        set : function (val) {
            this._countryCode = val;
        }
    });

    /**
     * @instance
     * @name telephoneNumber
     * @desc Telephone number to dial this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'telephoneNumber', {
        get : function () {
            return this._telephoneNumber;
        },
        set : function (val) {
            this._telephoneNumber = val;
        }
    });

    /**
     * @instance
     * @name restrictedMode
     * @desc Determines whether this endpoint operates in restricted mode, where the top 8K of each packet is reserved by the ISDN PBX for control data. For ISDN endpoints only.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'restrictedMode', {
        get : function () {
            return this._restrictedMode;
        },
        set : function (val) {
            this._restrictedMode = val;
        }
    });

    /**
     * @instance
     * @name threeG
     * @desc BOOL indicating whether this is a 3G endpoint.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'threeG', {
        get : function () {
            return this._threeG;
        },
        set : function (val) {
            this._threeG = val;
        }
    });

    /**
     * @instance
     * @name voiceOnly
     * @desc BOOL indicating whether this is a voice-only endpoint.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'voiceOnly', {
        get : function () {
            return this._voiceOnly;
        },
        set : function (val) {
            this._voiceOnly = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc The internal ID of the participant's username for users registered in Scopia® Management. If the user is defined locally within Scopia® Management, this value is the internal ID of that user. If the user is defined in an LDAP directory, this field is the GUID. This field is for users defined in Scopia Management only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    /**
     * @instance
     * @name firstName
     * @desc Optional. The first name of the participant.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'firstName', {
        get : function () {
            return this._firstName;
        },
        set : function (val) {
            this._firstName = val;
        }
    });

    /**
     * @instance
     * @name lastName
     * @desc The family name of the participant. This field or the Email is required for external participants.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'lastName', {
        get : function () {
            return this._lastName;
        },
        set : function (val) {
            this._lastName = val;
        }
    });

    /**
     * @instance
     * @name email
     * @desc The email address of the participant. This is required for external participants when the LastName is absent.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'email', {
        get : function () {
            return this._email;
        },
        set : function (val) {
            this._email = val;
        }
    });

    /**
     * @instance
     * @name organizer
     * @desc BOOL indicating whether this participant is the designated organizer of the videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'organizer', {
        get : function () {
            return this._organizer;
        },
        set : function (val) {
            this._organizer = val;
        }
    });

    /**
     * @instance
     * @name host
     * @desc BOOL indicating whether this participant is hosting the videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'host', {
        get : function () {
            return this._host;
        },
        set : function (val) {
            this._host = val;
        }
    });

    /**
     * @instance
     * @name needOnMaster
     * @desc Allocate resources for this attendee on master MCU
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'needOnMaster', {
        get : function () {
            return this._needOnMaster;
        },
        set : function (val) {
            this._needOnMaster = val;
        }
    });

    /**
     * @instance
     * @name autoDialIn
     * @desc It can call to the endpoint on meeting start automatically
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'autoDialIn', {
        get : function () {
            return this._autoDialIn;
        },
        set : function (val) {
            this._autoDialIn = val;
        }
    });

    /**
     * @instance
     * @name mainPartyInLayout
     * @desc It describes attendee's position in main video layout (Meeting Management API v.2)
     * @type AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'mainPartyInLayout', {
        get : function () {
            return this._mainPartyInLayout;
        },
        set : function (val) {
            this._mainPartyInLayout = val;
        }
    });

    /**
     * @instance
     * @name customerPartyInLayout
     * @desc It describes attendee's position in custom video layout (Meeting Management API v.2)
     * @type AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'customerPartyInLayout', {
        get : function () {
            return this._customerPartyInLayout;
        },
        set : function (val) {
            this._customerPartyInLayout = val;
        }
    });

    /**
     * @instance
     * @name partyOutLayout
     * @desc Describe which layout is applicable for the user - "MAIN" or "CUSTOMER" (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'partyOutLayout', {
        get : function () {
            return this._partyOutLayout;
        },
        set : function (val) {
            this._partyOutLayout = val;
        }
    });

    /**
     * @instance
     * @name panelist
     * @desc Show whether the user is in a panelist (VIP) (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'panelist', {
        get : function () {
            return this._panelist;
        },
        set : function (val) {
            this._panelist = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee = Attendee;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Reserved Ports object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     * @param {Object|undefined} reservedPorts
     */
    function ReservedPorts(reservedPorts) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof reservedPorts !== 'undefined' && reservedPorts !== null) {
            this._regular = reservedPorts.regular || '';
            this._sd = reservedPorts.sd || '';
            this._hd = reservedPorts.hd || '';
            this._fullHD = reservedPorts.fullHD || '';
            this._audioOnlyWC = reservedPorts.audioOnlyWC || '';
        } else {
            this._regular = '';
            this._sd = '';
            this._hd = '';
            this._fullHD = '';
            this._audioOnlyWC = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator();
    }

    ReservedPorts.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name regular
     * @desc Number of ports reserved at the default resolution for this meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'regular', {
        get : function () {
            return this._regular;
        },
        set : function (val) {
            this._regular = val;
        }
    });

    /**
     * @instance
     * @name sd
     * @desc Number of ports reserved at standard resolution, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'sd', {
        get : function () {
            return this._sd;
        },
        set : function (val) {
            this._sd = val;
        }
    });

    /**
     * @instance
     * @name hd
     * @desc Number of ports reserved at high definition, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'hd', {
        get : function () {
            return this._hd;
        },
        set : function (val) {
            this._hd = val;
        }
    });

    /**
     * @instance
     * @name fullHD
     * @desc Number of ports reserved at full HD, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'fullHD', {
        get : function () {
            return this._fullHD;
        },
        set : function (val) {
            this._fullHD = val;
        }
    });

    /**
     * @instance
     * @name audioOnlyWC
     * @desc reserve audio + web collab ports (Meeting Management API v.2)
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'audioOnlyWC', {
        get : function () {
            return this._audioOnlyWC;
        },
        set : function (val) {
            this._audioOnlyWC = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts = ReservedPorts;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Advanced Properties object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     * @param {Object|undefined} advancedProperties
     */
    function AdvancedProperties(advancedProperties) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof advancedProperties !== 'undefined' && advancedProperties !== null) {
            this._durationAfterLeft = advancedProperties.durationAfterLeft || '';
            this._terminationCondition = advancedProperties.terminationCondition || '';
            this._maxParticipants = advancedProperties.maxParticipants || '';
            this._minutesBeforeTermination = advancedProperties.minutesBeforeTermination || '';
        } else {
            this._durationAfterLeft = '';
            this._terminationCondition = '';
            this._maxParticipants = '';
            this._minutesBeforeTermination = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator();
    }

    AdvancedProperties.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name durationAfterLeft
     * @desc The amount of time a videoconference can continue after the host has departed. Expressed as a standard duration type in XML. For example, P1H30M denotes 1 hour 15 minutes. The string is composed as follows:
     * • P is at the start of the string (mandatory) indicating the period of time.
     * • nY indicates the number of years.
     * • nM indicates the number of months.
     * • nD indicates the number of days.
     * • T indicates the start of the time section (mandatory if specifying a time).
     * • nH indicates the number of hours.
     * • nM indicates the number of minutes.
     * • nS indicates the number of seconds.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'durationAfterLeft', {
        get : function () {
            return this._durationAfterLeft;
        },
        set : function (val) {
            this._durationAfterLeft = val;
        }
    });

    /**
     * @instance
     * @name terminationCondition
     * @desc The conditions under which a videoconference automatically ends. Possible values are:
     * • NORMAL indicates the videoconference automatically ends according to the system's default meeting settings
     * • AFTER_ALL_PARTIES_LEFT indicates the videoconference automatically ends when all participants have exited
     * • AFTER_HOST_LEFT indicates the videoconference automatically ends when the host exits from the meeting
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'terminationCondition', {
        get : function () {
            return this._terminationCondition;
        },
        set : function (val) {
            this._terminationCondition = val;
        }
    });

    /**
     * @instance
     * @name maxParticipants
     * @desc The maximum number of participants allowed in this videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    /**
     * @instance
     * @name minutesBeforeTermination
     * @desc Delay for warning before meeting ends.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'minutesBeforeTermination', {
        get : function () {
            return this._minutesBeforeTermination;
        },
        set : function (val) {
            this._minutesBeforeTermination = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties = AdvancedProperties;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Daily recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     * @param {Object|undefined} daily
     */
    function Daily(daily) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof daily !== 'undefined' && daily !== null) {
            this._numberOfEveryDay = daily.numberOfEveryDay || '';
            this._everyWeekDay = daily.everyWeekDay || false;
        } else {
            this._numberOfEveryDay = '';
            this._everyWeekDay = false;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.DailyValidator();
    }

    Daily.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name everyWeekDay
     * @desc BOOL indicating if it recurs every weekday.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     */
    Object.defineProperty(Daily.prototype, 'everyWeekDay', {
        get : function () {
            return this._everyWeekDay;
        },
        set : function (val) {
            this._everyWeekDay = val;
        }
    });

    /**
     * @instance
     * @name numberOfEveryDay
     * @desc Number indicating the videoconference recurs every x days.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     */
    Object.defineProperty(Daily.prototype, 'numberOfEveryDay', {
        get : function () {
            return this._numberOfEveryDay;
        },
        set : function (val) {
            this._numberOfEveryDay = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily = Daily;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Weekly recurrence object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     * @param {Object|undefined} weekly
     */
    function Weekly(weekly) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof weekly !== 'undefined' && weekly !== null) {
            this._numberOfEveryWeek = weekly.numberOfEveryWeek || '';
            this._daysOfWeek = weekly.daysOfWeek || [];
        } else {
            this._numberOfEveryWeek = '';
            this._daysOfWeek = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator();
    }

    Weekly.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name numberOfEveryWeek
     * @desc Number indicating the videoconference recurs every x weeks.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     */
    Object.defineProperty(Weekly.prototype, 'numberOfEveryWeek', {
        get : function () {
            return this._numberOfEveryWeek;
        },
        set : function (val) {
            this._numberOfEveryWeek = val;
        }
    });

    /**
     * @instance
     * @name daysOfWeek
     * @desc Videoconference recurs on specific days of the week. This can be one or more days, where each day has its own tag. For example:
     * <DayOfWeek>MON</DayOfWeek>
     * <DayOfWeek>THU</DayOfWeek>
     * @type {Array}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     */
    Object.defineProperty(Weekly.prototype, 'daysOfWeek', {
        get : function () {
            return this._daysOfWeek;
        },
        set : function (val) {
            this._daysOfWeek = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly = Weekly;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Yearly recurrence object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly
     * @param {Object|undefined} Yearly
     */
    function Yearly(yearly) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof yearly !== 'undefined' && yearly !== null) {
            this._numberOfEveryYear = yearly.numberOfEveryYear;
            if(typeof yearly.dayOfMonthOfYear !== 'undefined' && yearly.dayOfMonthOfYear !== null){
                this._dayOfMonthOfYear = {
                    dayOfMonth: yearly.dayOfMonthOfYear.dayOfMonth,
                    monthOfYear: yearly.dayOfMonthOfYear.monthOfYear
                };
            }

            if(typeof yearly.dayOfNumberOfEveryYear !== 'undefined' && yearly.dayOfNumberOfEveryYear !== null){
                this._dayOfNumberOfEveryYear = {
                    weekOfMonth: yearly.dayOfNumberOfEveryYear.weekOfMonth,
                    dayOfWeek: yearly.dayOfNumberOfEveryYear.dayOfWeek,
                    monthOfYear: yearly.dayOfNumberOfEveryYear.monthOfYear
                };
            }
        } else {

        }
    }

    Yearly.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name numberOfEveryWeek
     * @desc Number indicating the videoconference recurs every x weeks.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly
     */
    Object.defineProperty(Yearly.prototype, 'numberOfEveryYear', {
        get : function () {
            return this._numberOfEveryYear;
        },
        set : function (val) {
            this._numberOfEveryYear = val;
        }
    });

    /**
     * @instance
     * @name dayOfMonthOfYear
     * @desc Videoconference recurs on specific days of the week. This can be one or more days, where each day has its own tag. For example:
     * <DayOfWeek>MON</DayOfWeek>
     * <DayOfWeek>THU</DayOfWeek>
     * @type {Array}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly
     */
    Object.defineProperty(Yearly.prototype, 'dayOfMonthOfYear', {
        get : function () {
            return this._dayOfMonthOfYear;
        },
        set : function (val) {
            this._dayOfMonthOfYear = val;
        }
    });

    /**
     * @instance
     * @name dayOfNumberOfEveryYear
     * @desc Videoconference recurs on specific days of the week. This can be one or more days, where each day has its own tag. For example:
     * <DayOfWeek>MON</DayOfWeek>
     * <DayOfWeek>THU</DayOfWeek>
     * @type {Array}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly
     */
    Object.defineProperty(Yearly.prototype, 'dayOfNumberOfEveryYear', {
        get : function () {
            return this._dayOfNumberOfEveryYear;
        },
        set : function (val) {
            this._dayOfNumberOfEveryYear = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Yearly = Yearly;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Monthly recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     * @param {Object|undefined} monthly
     */
    function Monthly(monthly) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof monthly !== 'undefined' && monthly !== null) {
            this._numberOfEveryMonth = monthly.numberOfEveryMonth || '';
            this._dayOfMonth = monthly.dayOfMonth || '';
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth(monthly.dayOfNumberOfEveryMonth);
        } else {
            this._numberOfEveryMonth = '';
            this._dayOfMonth = '';
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator();
    }

    Monthly.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name numberOfEveryMonth
     * @desc Number indicating the videoconference recurs every x months.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'numberOfEveryMonth', {
        get : function () {
            return this._numberOfEveryMonth;
        },
        set : function (val) {
            this._numberOfEveryMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfMonth
     * @desc Number indicating the videoconference recurs on the xth of every month.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'dayOfMonth', {
        get : function () {
            return this._dayOfMonth;
        },
        set : function (val) {
            this._dayOfMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfNumberOfEveryMonth
     * @desc Container tag for videoconferences recuring on the xth week in the month on a given day. For example, the third Sunday of every month.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'dayOfNumberOfEveryMonth', {
        get : function () {
            return this._dayOfNumberOfEveryMonth;
        },
        set : function (val) {
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth(dayOfNumberOfEveryMonth);
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly = Monthly;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Recurrence end options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     * @param {Object|undefined} recurrenceEnd
     */
    function RecurrenceEnd(recurrenceEnd) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof recurrenceEnd !== 'undefined' && recurrenceEnd !== null) {
            this._endOfOccurrences = recurrenceEnd.endOfOccurrences || '';

            this._by = '';
            if (recurrenceEnd.by) {
                try {
                    this._by = new Date(recurrenceEnd.by).toISOString();
                } catch (e) {}
            }
        } else {
            this._endOfOccurrences = '';
            this._by = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator();
    }

    RecurrenceEnd.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name endOfOccurrences
     * @desc Number indicating the videoconference stops recurring after x meetings.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     */
    Object.defineProperty(RecurrenceEnd.prototype, 'endOfOccurrences', {
        get : function () {
            return this._endOfOccurrences;
        },
        set : function (val) {
            this._endOfOccurrences = val;
        }
    });

    /**
     * @instance
     * @name by
     * @desc The end date of the recurring videoconference. The format is in UTC time: YYYY-MM-DDThh:mm:ss+hh:mm, for example 2012-07-26T17:30:00+08:30. The time zone is specified as an offset of UTC, by adding a positive or negative number of hours and minutes.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     */
    Object.defineProperty(RecurrenceEnd.prototype, 'by', {
        get : function () {
            return this._by;
        },
        set : function (val) {
            this._by = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd = RecurrenceEnd;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Day Of Number Of Every Month settings for monthly recurring object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     * @param {Object|undefined} dayOfNumberOfEveryMonth
     */
    function DayOfNumberOfEveryMonth(dayOfNumberOfEveryMonth) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof dayOfNumberOfEveryMonth !== 'undefined' && dayOfNumberOfEveryMonth !== null) {
            this._weekOfMonth = dayOfNumberOfEveryMonth.weekOfMonth || '';
            this._dayOfWeek = dayOfNumberOfEveryMonth.dayOfWeek || [];
        } else {
            this._weekOfMonth = '';
            this._dayOfWeek = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator();
    }

    DayOfNumberOfEveryMonth.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name weekOfMonth
     * @desc A string to determine which week of the month it recurs: FIRST, SECOND, THIRD, FOURTH or LAST. For example, if it recurs on the third Sunday of every month, the value is THIRD.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     */
    Object.defineProperty(DayOfNumberOfEveryMonth.prototype, 'weekOfMonth', {
        get : function () {
            return this._weekOfMonth;
        },
        set : function (val) {
            this._weekOfMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfWeek
     * @desc Videoconference recurs on specific days of the week. For example: "MON"
     * @type {string[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     */
    Object.defineProperty(DayOfNumberOfEveryMonth.prototype, 'dayOfWeek', {
        get : function () {
            return this._dayOfWeek;
        },
        set : function (val) {
            this._dayOfWeek = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth = DayOfNumberOfEveryMonth;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Broadcast Settings object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     * @param {Object|undefined} broadcastSetting
     */
    function BroadcastSetting(broadcastSetting) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof broadcastSetting !== 'undefined' && broadcastSetting !== null) {
            this._subject = broadcastSetting.subject || '';
            this._pin = broadcastSetting.pin || '';
            this._thumbnail = broadcastSetting.thumbnail || '';
            this._thumbnailMimeType = broadcastSetting.thumbnailMimeType || '';
            this._profile = broadcastSetting.profile || '';
            this._description = broadcastSetting.description || '';
            this._public = broadcastSetting.public || false;
            this._questionsAndAnswersEnabled = broadcastSetting.questionsAndAnswersEnabled || false;
            this._moderatorPIN = broadcastSetting.moderatorPIN || '';
            this._programId = broadcastSetting.programId || '';
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting(broadcastSetting.accessModeSetting);
        } else {
            this._subject = '';
            this._pin = '';
            this._thumbnail = '';
            this._thumbnailMimeType = '';
            this._profile = '';
            this._description = '';
            this._public = false;
            this._questionsAndAnswersEnabled = false;
            this._moderatorPIN = '';
            this._programId = '';
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator();
    }

    BroadcastSetting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name subject
     * @desc Subject of broadcast
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'subject', {
        get : function () {
            return this._subject;
        },
        set : function (val) {
            this._subject = val;
        }
    });

    /**
     * @instance
     * @name pin
     * @desc PIN to join to this broadcast
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'pin', {
        get : function () {
            return this._pin;
        },
        set : function (val) {
            this._pin = val;
        }
    });

    /**
     * @instance
     * @name thumbnail
     * @desc The thumbnail file. It is base 64 encoded octet stream with the file content.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'thumbnail', {
        get : function () {
            return this._thumbnail;
        },
        set : function (val) {
            this._thumbnail = val;
        }
    });

    /**
     * @instance
     * @name thumbnailMimeType
     * @desc MimeType of thumbnail
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'thumbnailMimeType', {
        get : function () {
            return this._thumbnailMimeType;
        },
        set : function (val) {
            this._thumbnailMimeType = val;
        }
    });

    /**
     * @instance
     * @name profile
     * @desc Profile description
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'profile', {
        get : function () {
            return this._profile;
        },
        set : function (val) {
            this._profile = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc Description of broadcast
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name public
     * @desc Means whether or not to show it in the portal. Applicable, only if user has access to this video.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'public', {
        get : function () {
            return this._public;
        },
        set : function (val) {
            this._public = val;
        }
    });

    /**
     * @instance
     * @name questionsAndAnswersEnabled
     * @desc Is Q&A feature enabled
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'questionsAndAnswersEnabled', {
        get : function () {
            return this._questionsAndAnswersEnabled;
        },
        set : function (val) {
            this._questionsAndAnswersEnabled = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc PIN for moderator
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name programId
     * @desc This is the UUID. Portal should guarantee the unique at any time.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'programId', {
        get : function () {
            return this._programId;
        },
        set : function (val) {
            this._programId = val;
        }
    });

    /**
     * @instance
     * @name accessModeSetting
     * @desc Container to store access related settings
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'accessModeSetting', {
        get : function () {
            return this._accessModeSetting;
        },
        set : function (accessModeSetting) {
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting(accessModeSetting);
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting = BroadcastSetting;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc BroadcastProfile object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     * @param {Object|undefined} broadcastProfile
     */
    function BroadcastProfile(broadcastProfile) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof broadcastProfile !== 'undefined' && broadcastProfile !== null) {
            this._profilesId = broadcastProfile.profilesId || '';
            this._profilesName = broadcastProfile.profilesName || '';
        } else {
            this._profilesId = '';
            this._profilesName = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator();
    }

    BroadcastProfile.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name profilesId
     * @desc The ID of the profile as defined in Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     */
    Object.defineProperty(BroadcastProfile.prototype, 'profilesId', {
        get : function () {
            return this._profilesId;
        },
        set : function (val) {
            this._profilesId = val;
        }
    });

    /**
     * @instance
     * @name profileName
     * @desc The name of the profileas defined in Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     */
    Object.defineProperty(BroadcastProfile.prototype, 'profilesName', {
        get : function () {
            return this._profilesName;
        },
        set : function (val) {
            this._profilesName = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile = BroadcastProfile;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Access Mode Settings object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     * @param {Object|undefined} accessModeSetting
     */
    function AccessModeSetting(accessModeSetting) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof accessModeSetting !== 'undefined' && accessModeSetting !== null) {
            this._accessMode = accessModeSetting.accessMode || '';
            this._userIds = accessModeSetting.userIds || '';
        } else {
            this._accessMode = '';
            this._userIds = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator();
    }

    AccessModeSetting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name accessMode
     * @desc Should be one of the following 
     * • PRIVATE
     * • LIMITED_USERS
     * • ALL_AUTHED_USERS
     * • ALL_USERS
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     */
    Object.defineProperty(AccessModeSetting.prototype, 'accessMode', {
        get : function () {
            return this._accessMode;
        },
        set : function (val) {
            this._accessMode = val;
        }
    });

    /**
     * @instance
     * @name userIds
     * @desc IDs of users, applicable only if accessMode is LIMITED_USERS
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     */
    Object.defineProperty(AccessModeSetting.prototype, 'userIds', {
        get : function () {
            return this._userIds;
        },
        set : function (val) {
            this._userIds = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting = AccessModeSetting;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Terminal object with resource availability data
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     * @param {Object|undefined} resourceAvailability
     */
    function ResourceAvailability(resourceAvailability) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof resourceAvailability !== 'undefined' && resourceAvailability !== null) {
            this._id = resourceAvailability.id || '';
            this._type = resourceAvailability.type || 'TERMINAL';
            this._availability = resourceAvailability.availability || [];
        } else {
            this._id = '';
            this._type = 'TERMINAL';
            this._availability = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator();
    }

    ResourceAvailability.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc The internal terminal id
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name type
     * @desc Terminal or User. Possible values are:
     * • TERMINAL
     * • CONTACT
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'type', {
        get : function () {
            return this._type;
        },
        set : function (val) {
            this._type = val;
        }
    });

    /**
     * @instance
     * @name availability
     * @desc Container tag indicates all of the busy/free periods of the terminal or virtual MCU
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'availability', {
        get : function () {
            return this._availability;
        },
        set : function (availability) {
            this._availability = [];
            if (availability) {
                if (Array.isArray(availability)) {
                    for (var i = 0; i < availability.length; i++) {
                        this._availability.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability(availability[i]));
                    }
                } else {
                    this._availability.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability(availability));
                }
            }
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability = ResourceAvailability;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Availability object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     * @param {Object|undefined} availability
     */
    function Availability(availability) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof availability !== 'undefined' && availability !== null) {
            this._fromTime = availability.fromTime || '';
            this._toTime = availability.toTime || '';
            this._status = availability.status || '';
        } else {
            this._fromTime = '';
            this._toTime = '';
            this._status = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator();
    }

    Availability.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name fromTime
     * @desc The start time of the busy/free time
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'fromTime', {
        get : function () {
            return this._fromTime;
        },
        set : function (val) {
            this._fromTime = val;
        }
    });

    /**
     * @instance
     * @name toTime
     * @desc The end time of the busy/free time
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'toTime', {
        get : function () {
            return this._toTime;
        },
        set : function (val) {
            this._toTime = val;
        }
    });

    /**
     * @instance
     * @name status
     * @desc BUSY or FREE
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'status', {
        get : function () {
            return this._status;
        },
        set : function (val) {
            this._status = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability = Availability;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Class that represents propositional fields
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.Propositional
     * @param {Object|undefined} propositional
     */
    function Propositional(propositional) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof propositional !== 'undefined' && propositional !== null) {
            this._number = propositional.number || '';
            this._virtualMeetingIDPrefix = propositional.virtualMeetingIDPrefix || '';
            this._minimumMeetingIDLength = propositional.minimumMeetingIDLength || '';
            this._defaultDuration = propositional.defaultDuration || '';
            this._defaultDialMode = propositional.defaultDialMode || '';
            this._termination = propositional.termination || '';
        } else {
            this._number = '';
            this._virtualMeetingIDPrefix = '';
            this._minimumMeetingIDLength = '';
            this._defaultDuration = '';
            this._defaultDialMode = '';
            this._termination = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator();
    }

    Propositional.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name number
     * @desc The proposed number to be used during instant meeting schedulling
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name virtualMeetingIDPrefix
     * @desc Proposed prefix for meeting
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'virtualMeetingIDPrefix', {
        get : function () {
            return this._virtualMeetingIDPrefix;
        },
        set : function (val) {
            this._virtualMeetingIDPrefix = val;
        }
    });

    /**
     * @instance
     * @name minimumMeetingIDLength
     * @desc Minimum length of meeting number
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'minimumMeetingIDLength', {
        get : function () {
            return this._minimumMeetingIDLength;
        },
        set : function (val) {
            this._minimumMeetingIDLength = val;
        }
    });

    /**
     * @instance
     * @name defaultDuration
     * @desc Default duration of meeting in minutes
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'defaultDuration', {
        get : function () {
            return this._defaultDuration;
        },
        set : function (val) {
            this._defaultDuration = val;
        }
    });

    /**
     * @instance
     * @name defaultDialMode
     * @desc Dialing mode. Possible values are:
     * • DIAL_OUT
     * • DIAL_IN
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'defaultDialMode', {
        get : function () {
            return this._defaultDialMode;
        },
        set : function (val) {
            this._defaultDialMode = val;
        }
    });

    /**
     * @instance
     * @name termination
     * @desc Termination type:
     * • SCHEDULE_END_TIME
     * • ALL_ENDPOINT_LEFT
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'termination', {
        get : function () {
            return this._termination;
        },
        set : function (val) {
            this._termination = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Propositional = Propositional;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Customizable Video Layout for participant (Meeting Management API v.2)
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     * @param {Object|undefined} videoLayout
     */
    function VideoLayout(videoLayout) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof videoLayout !== 'undefined' && videoLayout !== null) {
            this._layoutName = videoLayout.layoutName || 'MAIN';
            this._layoutType = (videoLayout.layoutType && videoLayout.layoutType !== '0') ? videoLayout.layoutType : '0000';
            this._dynamic = (typeof videoLayout.dynamic === 'boolean') ? videoLayout.dynamic : false;
            this._noSelfSee = (typeof videoLayout.noSelfSee === 'boolean') ? videoLayout.noSelfSee : false;
            this._layoutMax = videoLayout.layoutMax || 0;
        } else {
            this._layoutName = 'MAIN';
            this._layoutType = '0000';
            this._dynamic = false;
            this._noSelfSee = false;
            this._layoutMax = 0;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator();
    }

    VideoLayout.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name layoutName
     * @desc Video Layout name (Main|Customer) (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutName', {
        get : function () {
            return this._layoutName;
        },
        set : function (val) {
            this._layoutName = val;
        }
    });

    /**
     * @instance
     * @name layoutType
     * @desc Video Layout type (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutType', {
        get : function () {
            return this._layoutType;
        },
        set : function (val) {
            this._layoutType = val;
        }
    });

    /**
     * @instance
     * @name dynamic
     * @desc This property is true if video layout is dynamic and you should not care about maximum participants count (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'dynamic', {
        get : function () {
            return this._dynamic;
        },
        set : function (val) {
            this._dynamic = val;
        }
    });

    /**
     * @instance
     * @name noSelfSee
     * @desc Is is true if you don't want to see yourself in meeting layout (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'noSelfSee', {
        get : function () {
            return this._noSelfSee;
        },
        set : function (val) {
            this._noSelfSee = val;
        }
    });

    /**
     * @instance
     * @name layoutMax
     * @desc Maximum participants count for the layout (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutMax', {
        get : function () {
            return this._layoutMax;
        },
        set : function (val) {
            this._layoutMax = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout = VideoLayout;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Party Layout(IN\OUT) for participant (Meeting Management API v.2)
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @param {Object|undefined} partyLayout
     */
    function PartyLayout(partyLayout) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof partyLayout !== 'undefined' && partyLayout !== null) {
            this._layoutName = partyLayout.layoutName || 'MAIN';
            this._positionId = typeof(partyLayout.positionId) === 'number' && partyLayout.positionId >= 0 ? partyLayout.positionId : -1;
        } else {
            this._layoutName = 'MAIN';
            this._positionId = -1;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator();
    }

    PartyLayout.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name layoutName
     * @desc Video Layout name (Main|Customer) (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     */
    Object.defineProperty(PartyLayout.prototype, 'layoutName', {
        get : function () {
            return this._layoutName;
        },
        set : function (val) {
            this._layoutName = val;
        }
    });

    /**
     * @instance
     * @name positionId
     * @desc Position Id for Layout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     */
    Object.defineProperty(PartyLayout.prototype, 'positionId', {
        get : function () {
            return this._positionId;
        },
        set : function (val) {
            this._positionId = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout = PartyLayout;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned by object validators
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.ObjectValidation
     * @param {string[]} errors - array of fields with error
     */
    function ObjectValidation(errors) {

        /**
         *
         * Returns true if validation succeeded
         * 
         * @public
         * @type {boolean}
         */
        this.success = errors.length === 0;

        /**
         *
         * Returns an object contained errors
         * 
         * @public
         * @type {string[]}
         */
        this.errors = errors;

        return this;
    }

    AvayaMeetingManagementClient.Base.Responses.ObjectValidation = ObjectValidation;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned to query meeting request
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse
     * @param {string} returnValue - success or error condition
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]} meetings - list of meeting
     */
    function QueryMeetingResponse(returnValue, meetings) {

        /**
         *
         * Returns response code
         * 
         * @public
         * @type {OK|ConferenceNotFound|Error|FATAL}
         */
        this.returnValue = returnValue;

        /**
         *
         * Returns an array of Meetings in case of success
         *
         * @public
         * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]}
         */
        this.meetings = meetings;

        return this;
    }

    AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse = QueryMeetingResponse;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned to query program request
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse
     * @param {string} returnValue - success or error condition
     * @param {Object} response
     */
    function SimpleObjectResponse(returnValue, response) {

        /**
         *
         * Returns response code
         * 
         * @public
         * @type {OK|Error}
         */
        this.returnValue = returnValue;

        /**
         *
         * Returns response object in case of success
         *
         * @public
         * @type {Object}
         */
        this.response = response;

        return this;
    }

    AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse = SimpleObjectResponse;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

/**
 * NOTE: This class does nothing!
 * It is only use to document jQuery Promise object in order to provide syntax completion.
 */
(function (AvayaMeetingManagementClient) {
    'use strict';
    /**
     * jQuery promise, created from jQuery.Deferred object. See jQuery docs for more detailed information.
     * Promised are used to resolve server responses to requests performed by AvayaClientServices.
     *
     * Note that since all Promise methods return themselves, the methods can be easily chained.
     *
     * @example <caption>Get Meetings list</caption>
     * var successCallback = function(){
     *      console.log("Meeting list was fetched successfully");
     * };
     * var failCallback = function(){
     *      console.log("Error");
     * };
     * service.getMeetingListByStatus(status).then(successCallback, failCallback);
     * // do something else...
     * // when the Promise is resolved, console will print "Meeting list was fetched successfully"
     *
     * @example <caption>Chaining methods</caption>
     * service.getMeetingListByStatus(status).done(doOneThing).done(doOther).done(doAnother).fail(onError);
     *
     *
     * @class
     * @public
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.Promise
     */
    function Promise() {
        /**
         * NOTE: This class does nothing!
         * It is only use to document jQuery Promise object in order to provide syntax completion.
         */
    }

    Promise.prototype = {
        /**
         * Determine the current state of a Deferred object.
         *
         * @public
         * @returns {String}
         */
        state : function () {},

        /**
         * Add handlers to be called when the Deferred object is either resolved or rejected.
         *
         * @param {function} alwaysCallback A function, or array of functions, that is called when the Deferred is resolved or rejected.
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        always : function (alwaysCallback) {},

        /**
         * Add handlers to be called when the Deferred object is resolved.
         *
         * @example
         * service.getMeetingListByStatus(status).done(function(data){
         *      //invoked on success
         *      //e.g. refresh the UI
         * });
         *
         * @param {function} doneCallback A function, or array of functions, that are called when the Deferred is resolved.
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        done : function (doneCallback) {},

        /**
         * Add handlers to be called when the Deferred object is rejected.
         *
         * @example
         * service.getMeetingListByStatus(status).fail(function(error){
         *      //invoked on failure
         *      //e.g. show error in UI
         * });
         *
         * @public
         * @param {function} failCallback A function, or array of functions, that are called when the Deferred is rejected.
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        fail : function (failCallback) {},

        /**
         * Add handlers to be called when the Deferred object generates progress notifications. Please note that not every Promise
         * creates progress notifications.
         *
         * @example
         * service.getMeetingListByStatus(status).progress(function(progressObject){
         *      //invoked on progress
         *      //e.g. refresh progress bar
         * });
         *
         * @public
         * @param {function} progressCallback A function, or array of functions, to be called when the Deferred generates progress notifications.
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        progress : function (progressCallback) {},

        /**
         * Add handlers to be called for the Deferred object. Combines functionality of .done(), .fail() and .progress().
         *
         * @example
         * service.getMeetingListByStatus(status).then(function(data){
         *      //invoked on success
         *      //e.g. refresh the UI
         * }, function(error){
         *      //invoked on failure
         *      //e.g. show error in UI
         * }, function(progressObject){
         *      //invoked on progress
         *      //e.g. refresh progress bar
         * });
         *
         * @public
         * @param {function} doneCallback A function that is called when the Deferred is resolved.
         * @param {function} [failCallback] A function that is called when the Deferred is rejected.
         * @param {function} [progressCallback] A function that is called when the Deferred generates progress notifications.
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        then : function (doneCallback, failCallback, progressCallback) {}
    };

    AvayaMeetingManagementClient.Base.Responses.Promise = Promise;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Server data object to communicate with service
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.ClientConfig
     * @param {Object} config - data object with resources for service
     */
    function ClientConfig(config) {

        if (config) {
            /**
             * @public
             * @type {AvayaMeetingManagementClient.Config.Resources}
             * @desc resources for service
             */
            this.resources = new AvayaMeetingManagementClient.Config.Resources(config.resources);
        }
    }

    AvayaMeetingManagementClient.Config.ClientConfig = ClientConfig;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Meeting management resources paths
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.Resources
     * @param {Object} config - meeting management resources config
     */
    function Resources(config) {

        
    this.fetchMeetingServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING];
    this.getBroadcastProfilesServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE];
    this.getPropositionalNumberServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER];
    this.createMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING];
    this.getResourceAvailabilityServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY];
    this.virtualRoomSearchServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM];
    this.deleteMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING];
    this.updateMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING];
    
    if (config && config.resources && config.resources.conference) {

            if (config.resources.conference.GET && config.resources.conference.GET.getConferences) {
                /**
                 * @public
                 * @type {string}
                 * @desc getConferences URL
                 */
                this.fetchMeetingUrl = config.resources.conference.GET.getConferences.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getConferences request 
                 */
                this.fetchMeetingServerApiVersions = config.resources.conference.GET.getConferences.responseTypes || this.fetchMeetingServerApiVersions;				
            }

            if (config.resources.conference.GET && config.resources.conference.GET.getBroadcastProfiles) {
                /**
                 * @public
                 * @type {string}
                 * @desc getBroadcastProfiles URL
                 */
                this.getBroadcastProfiles = config.resources.conference.GET.getBroadcastProfiles.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getBroadcastProfiles request 
                 */
                this.getBroadcastProfilesServerApiVersions = config.resources.conference.GET.getBroadcastProfiles.responseTypes || this.getBroadcastProfilesServerApiVersions;	
            }

            if (config.resources.conference.GET && config.resources.conference.GET.getPropositionalNumber) {
                /**
                 * @public
                 * @type {string}
                 * @desc getPropositionalNumber URL
                 */
                this.getPropositionalNumber = config.resources.conference.GET.getPropositionalNumber.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getPropositionalNumber request 
                 */
                this.getPropositionalNumberServerApiVersions = config.resources.conference.GET.getPropositionalNumber.responseTypes || this.getPropositionalNumberServerApiVersions;	
            }

            if (config.resources.conference.POST && config.resources.conference.POST.createConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc createConference URL
                 */
                this.createMeetingUrl = config.resources.conference.POST.createConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for createConference request 
                 */
                this.createMeetingUrlServerApiVersions = config.resources.conference.POST.createConference.responseTypes || this.createMeetingUrlServerApiVersions;
            }

            if (config.resources.conference.POST && config.resources.conference.POST.getResourceAvailability) {
                /**
                 * @public
                 * @type {string}
                 * @desc get resource availability URL
                 */
                this.getResourceAvailability = config.resources.conference.POST.getResourceAvailability.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getResourceAvailability request 
                 */
                this.getResourceAvailabilityServerApiVersions = config.resources.conference.POST.getResourceAvailability.responseTypes || this.getResourceAvailabilityServerApiVersions;
            }

            if (config.resources.conference.POST && config.resources.conference.POST.getVirtualRoom) {
                /**
                 * @public
                 * @type {string}
                 * @desc get virtual room URL
                 */
                this.virtualRoomSearch = config.resources.conference.POST.getVirtualRoom.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getVirtualRoom request 
                 */
                this.virtualRoomSearchServerApiVersions = config.resources.conference.POST.getVirtualRoom.responseTypes || this.virtualRoomSearchServerApiVersions;
            }

            if (config.resources.conference.DELETE && config.resources.conference.DELETE.deleteConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc deleteConference URL
                 */
                this.deleteMeetingUrl = config.resources.conference.DELETE.deleteConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for deleteConference request 
                 */
                this.deleteMeetingUrlServerApiVersions = config.resources.conference.DELETE.deleteConference.responseTypes || this.deleteMeetingUrlServerApiVersions;
            }

            if (config.resources.conference.PUT && config.resources.conference.PUT.updateConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc updateConference URL
                 */
                this.updateMeetingUrl = config.resources.conference.PUT.updateConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for updateConference request 
                 */
                this.updateMeetingUrlServerApiVersions = config.resources.conference.PUT.updateConference.responseTypes || this.updateMeetingUrlServerApiVersions;
            }
        }

        this.fetchMeetingUrl = this.fetchMeetingUrl || '';
        this.createMeetingUrl = this.createMeetingUrl || '';
        this.deleteMeetingUrl = this.deleteMeetingUrl || '';
        this.updateMeetingUrl = this.updateMeetingUrl || '';
        this.getBroadcastProfiles = this.getBroadcastProfiles || '';
        this.getPropositionalNumber = this.getPropositionalNumber || '';
        this.getResourceAvailability = this.getResourceAvailability || '';
        this.virtualRoomSearch = this.virtualRoomSearch || '';
    }

    AvayaMeetingManagementClient.Config.Resources = Resources;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * AvayaMeetingManagementClient.Base.Logger
     * This class do nothing and represented only for documentation purposes
     * By default Service use window.console logger
     * If specific Logger object is needed it should be implemented in scope of
     * {@link AvayaMeetingManagementClient.Config} and should be passed to
     * {Avaya Meeting Management Client} constructor directly
     * @class
     * @constructor
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.Logger
     */
    function Logger() {}

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#log
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console
     * @public
     * @abstract
     */
    Logger.prototype.log = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#info
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'info' label
     * @public
     * @abstract
     */
    Logger.prototype.info = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#warn
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'warn' label
     * @public
     * @abstract
     */
    Logger.prototype.warn = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#error
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'error' label
     * @public
     * @abstract
     */
    Logger.prototype.error = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#debug
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'debug' label
     * @public
     * @abstract
     */
    Logger.prototype.debug = function () {};

    AvayaMeetingManagementClient.Config.Logger = Logger;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for UPS Portal server
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.PortalProvider
     */
    function PortalProvider() {
        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaMeetingManagementClient.Providers.PortalProvider';
    }

    PortalProvider.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#scheduleMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Schedule a new meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.scheduleMeeting = function (opts) {
        ammcLogger.debug(this._name + '#scheduleMeeting: %o', opts);

        opts.data = this.convertMeetingToServerObject(opts.data.meeting);
        var usedApiVersion = (this.checkVersion(this.resources.createMeetingUrlServerApiVersions) === 2) ? AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2 : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : usedApiVersion
        };
        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#scheduleMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#changeMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Update an existing meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.changeMeeting = function (opts) {
        ammcLogger.debug(this._name + '#changeMeeting: %o', opts);

        opts.data = this.convertMeetingToServerObject(opts.data.meeting);
        var usedApiVersion = (this.checkVersion(this.resources.updateMeetingUrlServerApiVersions) === 2) ? AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2 : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2,  AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : usedApiVersion
        };
        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#changeMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#deleteMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Delete an existing meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.deleteMeeting = function (opts) {
        ammcLogger.debug(this._name + '#deleteMeeting: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse(response.ReturnValue, response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#deleteMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse(response.ReturnValue, response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getMeetingListByCriteria
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get list of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} by provided criterias. Response {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} params - params for url string
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getMeetingListByCriteria = function (params) {
        ammcLogger.debug(this._name + '#getMeetingListByCriteria: %o', params);

        var opts = {},
        self = this,
        res;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETINGv2, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR]
        };
        opts.url = this.resources.fetchMeetingUrl + '?' + params;
        opts.method = 'GET';

        var serverRequest = this.send(opts);

        var convertResponseToObject = serverRequest.then(function (response) {
                var meetings = self.convertMeetingArrayResponseToSdkArrayObject(response.conferences);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', meetings);

                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getMeetingListByCriteria::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getBroadcastProfilesFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getBroadcastProfilesFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getBroadcastProfilesFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var profiles = response.broadcastProfiles.map(function (profile) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile(profile);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', profiles);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getBroadcastProfilesFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getPropositionalDataFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get propositional data generated for meetings out of VRs
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getPropositionalDataFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getPropositionalDataFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var propositional = new AvayaMeetingManagementClient.MeetingManagementService.Propositional(response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', propositional);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getPropositionalDataFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getEndpointResourceAvailabilityFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get resource availability for endpoints for a day
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getEndpointResourceAvailabilityFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getEndpointResourceAvailabilityFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var availabilities = response.resourceAvailability.map(function (resourceAvailability) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability(resourceAvailability);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', availabilities);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getEndpointResourceAvailabilityFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#virtualRoomSearchRequest
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Search virtual rooms by part of user name and tenant id
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.virtualRoomSearchRequest = function (opts) {
        ammcLogger.debug(this._name + '#virtualRoomSearchRequest: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var rooms = response.virtualRoom.map(function (room) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom(room);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', {
                        records : response.records,
                        virtualRoom : rooms,
                        totalCount : response.totalCount
                    });
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#virtualRoomSearchRequest::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingToServerObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Convert object to server format
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting - SDK object
     * @returns {Object}
     */
    PortalProvider.prototype.convertMeetingToServerObject = function (meeting) {
        // Delete objects if there fields are empty. Server requirement.
        if (meeting.daily && meeting.daily.numberOfEveryDay === '' && !meeting.daily.everyWeekDay) {
            delete meeting._daily;
        }
        if (meeting.weekly && meeting.weekly.numberOfEveryWeek === '' && meeting.weekly.daysOfWeek.length === 0) {
            delete meeting._weekly;
        }
        if (meeting.monthly && meeting.monthly.dayOfNumberOfEveryMonth.weekOfMonth === '' && meeting.monthly.dayOfNumberOfEveryMonth.dayOfWeek.length === 0) {
            delete meeting.monthly._dayOfNumberOfEveryMonth;
        }
        if (meeting.monthly && meeting.monthly.numberOfEveryMonth === '' && meeting.monthly.dayOfMonth === '' && !meeting.monthly.dayOfNumberOfEveryMonth) {
            delete meeting._monthly;
        }
        if (meeting.yearly && !meeting.yearly.dayOfMonthOfYear && !meeting.yearly.dayOfNumberOfEveryYear) {
            delete meeting._yearly;
        }
        if (meeting.recurrenceEnd && meeting.recurrenceEnd.endOfOccurrences === '' && meeting.recurrenceEnd.by === '') {
            delete meeting._recurrenceEnd;
        }
        if (meeting.broadcastSetting && meeting.broadcastSetting.programId === '' && meeting.broadcastSetting.profile === '' && meeting.broadcastSetting.subject === '') {
            delete meeting._broadcastSetting;
        }

        // Strange legacy iView behavior: if dialIn is TRUE then call to the endpoint is not performed
        // since that's incorrect logic from end-user's perspective adding a value reverting to Portal provider only
        // See details in UPS-691
        for (var k = 0; k < meeting._attendees.length; k++) {
            meeting._attendees[k]._autoDialIn = !meeting._attendees[k]._autoDialIn;
        }

            // API versioning conversion
        // Meeting object is used for Schedule and Update operations, check only one type as they are always have same version
        var highestSupportedVersion = 1;
        if (this.resources.createMeetingUrlServerApiVersions) {
            highestSupportedVersion = this.checkVersion(this.resources.createMeetingUrlServerApiVersions);
        }

        switch (highestSupportedVersion) {
        case 1:
            this.fallbackToV1(meeting);
            break;
        case 2:
            for (var i = 0; i < meeting._attendees.length; i++) {
                delete meeting._attendees[i]._partyOutLayout._positionId;
            }
            break;
        default:
            this.fallbackToV1(meeting);
        }
        var serverObject = {
            conference : [meeting]
        };

        function removeEmptyStrings(obj) {
            for (var prop in obj){
                if (obj[prop] === "" && prop !== 'pin' && prop !== 'accessPIN' && prop !== 'moderatorPIN'){
                    delete obj[prop];
                } else if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    removeEmptyStrings(obj[prop]);
                } else if (Array.isArray(obj[prop])) {
                    obj[prop].forEach(function (el) { removeEmptyStrings(el); });
                }
            }
            return obj;
        }

        //Remove empty fields and object validators from request string
        serverObject = JSON.stringify(serverObject).replace(/"_([0-9a-zA-Z-_]+)"/g, '"$1"').replace(/"validator":\{\},/g, '');

        // Remove empty fields instead broadcast pin, access pin (UPC-3188)
        serverObject = JSON.stringify(removeEmptyStrings(JSON.parse(serverObject)));

        return serverObject;
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#checkVersion
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Returns highest supported version
     * @private
     * @param [] supportedVersionsArray
     * @returns {number}
     */
    PortalProvider.prototype.checkVersion = function (supportedVersionsArray) {
        if(!supportedVersionsArray || !Array.isArray(supportedVersionsArray)){
            return 1;
        }

        var str = supportedVersionsArray.join('');
        var res = str.match(/^.*(v2\+json).*$/);
        if (res) {
            return 2;
        } else {
            return 1;
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#fallbackToV1
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Removes added in V2 API fields
     * @private
     * @param {Object} meeting
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting}
     */
    PortalProvider.prototype.fallbackToV1 = function (meeting) {
        delete meeting._eventConference;
        delete meeting._panelistNumber;
        delete meeting._mainVideoLayout;
        delete meeting._customerVideoLayout;
        delete meeting._participantLaunchURL;
        delete meeting._swcLaunchURLforModerator;
        for (var i = 0; i < meeting._attendees.length; i++) {
            delete meeting._attendees[i]._mainPartyInLayout;
            delete meeting._attendees[i]._customerPartyInLayout;
            delete meeting._attendees[i]._partyOutLayout;
            delete meeting._attendees[i]._panelist;
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingToSdkObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} meeting - JSON object from server
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting}
     */
    PortalProvider.prototype.convertMeetingToSdkObject = function (meeting) {
        // XML lib returns object with all keys started with uppercase, switch to lower.
        /*meeting = JSON.stringify(meeting).replace(/"(\w+)"/g, function (x, y) {
        return '"' + y.charAt(0).toLowerCase() + y.slice(1) + '"';
        });*/

        // Strange legacy iView behavior: if dialIn is TRUE then call to the endpoint is not performed
        // since that's incorrect logic from end-user's perspective adding a value reverting to Portal provider only
        // See details in UPS-691
        if (meeting.attendees && Array.isArray(meeting.attendees)) {
            for (var k = 0; k < meeting.attendees.length; k++) {
                meeting.attendees[k].autoDialIn = !meeting.attendees[k].autoDialIn;
            }
        }
        var sdkObj = new AvayaMeetingManagementClient.MeetingManagementService.Meeting(meeting);

        return sdkObj;
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingArrayResponseToSdkArrayObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Re-form array object to SDK format
     * @private
     * @param {Object[]} meetings
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]}
     */

    PortalProvider.prototype.convertMeetingArrayResponseToSdkArrayObject = function (meetings) {
        ammcLogger.log(this._name + '#convertMeetingArrayResponseToSdkArrayObject: %o', meetings);

        var self = this;

        return meetings.map(function (meeting) {
            return self.convertMeetingToSdkObject(meeting);
        });
    };

    AvayaMeetingManagementClient.Providers.PortalProvider = PortalProvider;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Providers.PortalProvider
     * @classdesc SDK API layer. Main implementation class for Meeting Management Service
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.MeetingProvider
     */
    function MeetingProvider() {

        AvayaMeetingManagementClient.Providers.PortalProvider.call(this);

        this._name = 'AvayaMeetingManagementClient.Providers.MeetingProvider';

        /**
         * @private
         * @type {AvayaMeetingManagementClient.Providers.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PlainValidator();
    }

    MeetingProvider.prototype = Object.create(AvayaMeetingManagementClient.Providers.PortalProvider.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#createMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Schedule a new Meeting
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.createMeeting = function (meeting) {
        ammcLogger.debug(this._name + '#createMeeting: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.createMeetingUrl;
            opts.method = 'POST';
            return this.scheduleMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#createMeeting', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing Meeting created by User
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateMeeting = function (meeting) {
        ammcLogger.debug(this._name + '#updateMeeting: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.conferenceId;
            opts.method = 'PUT';
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateMeeting', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateOccurrence
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing occurrence in meeting series
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateOccurrence = function (meeting) {
        ammcLogger.debug(this._name + '#updateOccurrence: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            if (meeting.daily) { delete meeting._daily; }
            if (meeting.weekly) { delete meeting._weekly; }
            if (meeting.monthly) { delete meeting._monthly; }
            if (meeting.yearly) { delete meeting._yearly; }

            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.conferenceId;
            opts.method = 'PUT';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
            };
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateOccurrence', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateSeries
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing meeting series
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateSeries = function (meeting) {
        ammcLogger.debug(this._name + '#updateSeries: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            meeting.conferenceId = meeting.recurrenceId;

            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.recurrenceId;
            opts.method = 'PUT';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
            };
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateSeries', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing Meeting
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelMeeting = function (meetingId) {
        ammcLogger.debug(this._name + '#cancelMeeting: %s', meetingId);
        var opts = {};

        opts.data = {
            ConferenceId : meetingId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + meetingId;
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
        };
        return this.deleteMeeting(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#terminateMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Terminate existing Meeting
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.terminateMeeting = function (meetingId) {
        ammcLogger.debug(this._name + '#terminateMeeting: %s', meetingId);
        var opts = {};

        opts.data = {
            ConferenceId : meetingId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + meetingId + '/terminate';
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING
        };
        return this.deleteMeeting(opts);
    };

        /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelOccurrence
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing occurrence in meeting series
     * @private
     * @param {string} recurrenceId
     * @param {Date|number} occurrenceStartTime
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelOccurrence = function (recurrenceId, occurrenceStartTime) {
        ammcLogger.debug(this._name + '#cancelOccurrence: %s, %s', recurrenceId, occurrenceStartTime);
        var opts = {},
            startTime;

        try {
            startTime = occurrenceStartTime.toISOString();
        } catch (e) {
            startTime = new Date(occurrenceStartTime).toISOString();
        }

        if (!startTime) {
            return this._validator.errorInvalidObject(this._name + '#cancelOccurrence', "Invalid date format");
        } else {
            opts.url = this.resources.deleteMeetingUrl + '/' + recurrenceId + '?' + $.param({"startTime" : startTime});
            opts.method = 'DELETE';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
            };
            return this.deleteMeeting(opts);
        }
    };

        /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelSeries
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing meeting series
     * @private
     * @param {string} recurrenceId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelSeries = function (recurrenceId) {
        ammcLogger.debug(this._name + '#cancelSeries: %s', recurrenceId);
        var opts = {};

        opts.data = {
            ConferenceId : recurrenceId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + recurrenceId;
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
        };
        return this.deleteMeeting(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchMeetings
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search meetings by subject and description (contains logic) and by conference number and conference id (exact match)
     * @private
     * @param {string} searchQuery
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchMeetings = function (searchQuery, offset, count) {
        ammcLogger.debug(this._name + '#searchMeetings: %s', searchQuery);

        return this.getMeetingListByCriteria('textToSearch=' + searchQuery  + '&offset=' + offset + '&count=' + count);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingById
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get Meeting details by Id: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingById = function (meetingId) {
        ammcLogger.debug(this._name + '#getMeetingById: %s', meetingId);

        return this.getMeetingListByCriteria('conferenceId=' + meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByDate
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by provided Date: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {Date} date
     * @param {boolean} fetchPastMeetings
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByDate = function (date, fetchPastMeetings, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByDate: %s, %s, detailed: %s', date, fetchPastMeetings, detailed);
        var startTime,
        detailedParam = (detailed === false) ? '&detailed=false' : '',
        fetchPastMeetingsParam = (fetchPastMeetings === true ? '&status=FINISHED' : '');

        try {
            startTime = date.toISOString();
        } catch (e) {
            startTime = new Date(date).toISOString();
        }

        if (!startTime) {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByDate', "Invalid date format");
        } else {
            var endTime = new Date(new Date(startTime).getTime() + 86399000).toISOString();
            return this.getMeetingListByCriteria('startTime=' + startTime + '&endTime=' + endTime + fetchPastMeetingsParam + detailedParam);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByPeriod
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by provided Period: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {boolean} fetchPastMeetings
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByPeriod = function (startDate, endDate, fetchPastMeetings, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByPeriod: %s, %s, %s, detailed: %s', startDate, endDate, fetchPastMeetings, detailed);

        var start,
        detailedParam = (detailed === false) ? '&detailed=false' : '',
        fetchPastMeetingsParam = (fetchPastMeetings === true ? '&status=FINISHED' : ''),
        end;

        try {
            start = startDate.toISOString();
        } catch (e) {
            start = new Date(startDate).toISOString();
        }

        try {
            end = endDate.toISOString();
        } catch (e) {
            end = new Date(endDate).toISOString();
        }

        if (!start || !end) {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByPeriod', "Invalid date format");
        } else {
            return this.getMeetingListByCriteria('startTime=' + start + '&endTime=' + end + fetchPastMeetingsParam + detailedParam);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListIsOngoing
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of ongoing Meeting objects: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListIsOngoing = function (detailed) {
        ammcLogger.debug(this._name + '#getMeetingListIsOngoing: detailed: %s', detailed);
        var detailedParam = (detailed === false) ? '&detailed=false' : '';

        return this.getMeetingListByCriteria('status=IN_SESSION' + detailedParam);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByStatus
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by status: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} status
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByStatus = function (status, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByStatus: %s, detailed: %s', status, detailed);

        var validateResponse = this._validator.validateMeetingStatus(status),
        detailedParam = (detailed === false) ? '&detailed=false' : '';

        if (validateResponse.success) {
            return this.getMeetingListByCriteria('status=' + status + detailedParam);
        } else {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByStatus', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListStartsIn
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects which start by provided minutes: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {number} minutes
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListStartsIn = function (minutes, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListStartsIn: %s, detailed: %s', minutes, detailed);

        var detailedParam = (detailed === false) ? '&detailed=false' : '';

        if (this._validator.isNumberType(minutes)) {
            var startTime = new Date().toISOString();
            var endTime = new Date(Date.now() + minutes * 60000).toISOString();
            return this.getMeetingListByCriteria('startTime=' + startTime + '&endTime=' + endTime + detailedParam);
        } else {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListStartsIn', "Invalid minutes format, it isn't a number");
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getBroadcastProfiles
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @private
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getBroadcastProfiles = function () {
        ammcLogger.debug(this._name + '#getBroadcastProfiles:');
        var opts = {};

        opts.url = this.resources.getBroadcastProfiles;
        opts.method = 'GET';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE
        };
        return this.getBroadcastProfilesFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getEndpointResourceAvailability
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get resource availability for endpoints for a day
     * @private
     * @param {number} startTime
     * @param {string[]} terminalIds
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getEndpointResourceAvailability = function (startTime, terminalIds, meetingId) {
        ammcLogger.debug(this._name + '#getEndpointResourceAvailability: %d, %o', startTime, terminalIds, meetingId);
        var opts = {},
        terminals = terminalIds.map(function (id) {
                return {
                    terminalId : id
                };
            });

        opts.data = JSON.stringify({
                conferenceId: meetingId,
                startTime : startTime,
                endTime : startTime + 86399000,
                attendees : terminals
            });

        opts.url = this.resources.getResourceAvailability;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY
        };
        return this.getEndpointResourceAvailabilityFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByName
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by part of VR name in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} partOfVRName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByName = function (tenantId, partOfVRName, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByName: %s, %s, %d, %d', tenantId, partOfVRName, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                virtualRoomName: partOfVRName,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByNumber
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by VR number in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} number
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByNumber = function (tenantId, number, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByNumber: %s, %s, %d, %d', tenantId, number, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                dialableNumber: number,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByUserName
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by part of user name in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} partOfUserName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByUserName = function (tenantId, partOfUserName, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByUserName: %s, %s, %d, %d', tenantId, partOfUserName, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                partOfUserName : partOfUserName,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getPropositionalData
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get propositional data generated for meetings out of VRs
     * @private
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getPropositionalData = function () {
        ammcLogger.debug(this._name + '#getPropositionalData:');
        var opts = {};

        opts.url = this.resources.getPropositionalNumber;
        opts.method = 'GET';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER,
            AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR]
        };
        return this.getPropositionalDataFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getVideoLayoutsArray
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of available video layouts
     * @private
     * @returns {Object[]}
     */
    MeetingProvider.prototype.getVideoLayoutsArray = function () {
        ammcLogger.debug(this._name + '#getVideoLayoutsArray:');
        return AvayaMeetingManagementClient.Constants.LAYOUTS;
    };

    AvayaMeetingManagementClient.Providers.MeetingProvider = MeetingProvider;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     */
    function MeetingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    MeetingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    MeetingValidator.prototype.validateObject = function (meeting) {
        var errors = [];

        if (!this.validate(meeting.memberId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('memberId');
        }
        if (!this.validate(meeting.userId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        if (!this.validate(meeting.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('number');
        }
        if (!this.validate(meeting.accessPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('accessPIN');
        }
        if (!this.validate(meeting.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('moderatorPIN');
        }
        if (!this.validate(meeting.serviceTemplateId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('serviceTemplateId');
        }
        if (!this.validate(meeting.servicePrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('servicePrefix');
        }
        if (!this.validate(meeting.priority, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY)) {
            errors.push('priority');
        }
        if (!this.validate(meeting.allowStreaming, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }
        if (!this.validate(meeting.streamingStatus, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('streamingStatus');
        }

        var attendees = meeting.attendees;
        if (!Array.isArray(attendees)) {
            errors.push('attendees: is not an array');
        } else {
            for (var i = 0; i < attendees.length; i++) {
                var res = attendees[i].validate();
                if (!res.success) {
                    errors.push('attendees[' + i + ']:' + res.errors);
                }
            }
        }

        var reservedPortsRes = meeting.reservedPorts.validate();
        if (!reservedPortsRes.success) {
            errors.push(reservedPortsRes.errors);
        }

        if (!this.validate(meeting.blockDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('blockDialIn');
        }
        if (!this.validate(meeting.autoExtend, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoExtend');
        }
        if (!this.validate(meeting.waitingRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('waitingRoom');
        }

        var advancedPropertiesRes = meeting.advancedProperties.validate();
        if (!advancedPropertiesRes.success) {
            errors.push(advancedPropertiesRes.errors);
        }

        if (!this.validate(meeting.oneTimePINRequired, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('oneTimePINRequired');
        }
        if (!this.validate(meeting.conferenceId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('conferenceId');
        }
        if (!this.validate(meeting.status, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS)) {
            errors.push('status');
        }
        if (!this.validate(meeting.subject, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING, true)) {
            errors.push('subject');
        }
        if (!this.validate(meeting.description, AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT)) {
            errors.push('description');
        }

        try {
            new Date(meeting.earlyTime);
        } catch (e) {
            errors.push('earlyTime');
        }
        try {
            new Date(meeting.startTime);
        } catch (e) {
            errors.push('startTime');
        }
        try {
            new Date(meeting.plannedEndTime);
        } catch (e) {
            errors.push('plannedEndTime');
        }

        if (!this.validate(meeting.timeZoneId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('timeZoneId');
        }
        if (!this.validate(meeting.duration, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION, true)) {
            errors.push('duration');
        }
        if (!this.validate(meeting.locationId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('locationId');
        }
        if (!this.validate(meeting.testOnly, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('testOnly');
        }
        if (!this.validate(meeting.sendingNotification, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('sendingNotification');
        }
        if (!this.validate(meeting.recordingMeetingWhenStart, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('recordingMeetingWhenStart');
        }
        if (!this.validate(meeting.recurrenceId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('recurrenceId');
        }
        if (!this.validate(meeting.eventConference, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('eventConference');
        }
        if (!this.validate(meeting.panelistNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            if (meeting.panelistNumber !== undefined){
                errors.push('panelistNumber');
            }
        }
        if (!this.validate(meeting.participantLaunchURL, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('participantLaunchURL');
        }
        if (!this.validate(meeting.swcLaunchURLforModerator, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('swcLaunchURLforModerator');
        }

        var dailyRes = meeting.daily.validate();
        if (!dailyRes.success) {
            errors.push(dailyRes.errors);
        }

        var weeklyRes = meeting.weekly.validate();
        if (!weeklyRes.success) {
            errors.push(weeklyRes.errors);
        }

        var monthlyRes = meeting.monthly.validate();
        if (!monthlyRes.success) {
            errors.push(monthlyRes.errors);
        }

        var recurrenceRes = meeting.recurrenceEnd.validate();
        if (!recurrenceRes.success) {
            errors.push(recurrenceRes.errors);
        }

        var broadcastSettingRes = meeting.broadcastSetting.validate();
        if (!broadcastSettingRes.success) {
            errors.push(broadcastSettingRes.errors);
        }

        var mainVideoLayoutRes = meeting.mainVideoLayout.validate();
        if (!mainVideoLayoutRes.success) {
            errors.push(mainVideoLayoutRes.errors);
        }

        var customerVideoLayoutRes = meeting.customerVideoLayout.validate();
        if (!customerVideoLayoutRes.success) {
            errors.push(customerVideoLayoutRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.MeetingValidator = MeetingValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator
     */
    function VirtualRoomValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    VirtualRoomValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator
     * @desc Validate VirtualRoom object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom} virtualRoom
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    VirtualRoomValidator.prototype.validateObject = function (virtualRoom) {
        var errors = [];

        if (!this.validate(virtualRoom.memberId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('memberId');
        }
        if (!this.validate(virtualRoom.virtualRoomId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('virtualRoomId');
        }
        if (!this.validate(virtualRoom.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER, true)) {
            errors.push('number');
        }
        if (!this.validate(virtualRoom.accessPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('accessPIN');
        }
        if (!this.validate(virtualRoom.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('moderatorPIN');
        }
        if (!this.validate(virtualRoom.serviceTemplateId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('serviceTemplateId');
        }
        if (!this.validate(virtualRoom.servicePrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('servicePrefix');
        }
        if (!this.validate(virtualRoom.priority, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY)) {
            errors.push('priority');
        }
        if (!this.validate(virtualRoom.allowStreaming, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }
        if (!this.validate(virtualRoom.allowRecording, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowRecording');
        }

        if (!this.validate(virtualRoom.streamingStatus, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('streamingStatus');
        }

        var attendees = virtualRoom.attendees;
        if (!Array.isArray(attendees)) {
            errors.push('attendees: is not an array');
        } else {
            for (var i = 0; i < attendees.length; i++) {
                var res = attendees[i].validate();
                if (!res.success) {
                    errors.push('attendees[' + i + ']:' + res.errors);
                }
            }
        }

        var reservedPortsRes = virtualRoom.reservedPorts.validate();
        if (!reservedPortsRes.success) {
            errors.push(reservedPortsRes.errors);
        }

        if (!this.validate(virtualRoom.blockDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('blockDialIn');
        }
        if (!this.validate(virtualRoom.autoExtend, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoExtend');
        }
        if (!this.validate(virtualRoom.waitingRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('waitingRoom');
        }

        var advancedPropertiesRes = virtualRoom.advancedProperties.validate();
        if (!advancedPropertiesRes.success) {
            errors.push(advancedPropertiesRes.errors);
        }

        if (!this.validate(virtualRoom.oneTimePINRequired, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('oneTimePINRequired');
        }
        if (!this.validate(virtualRoom.name, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(virtualRoom.defaultRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('defaultRoom');
        }
        if (!this.validate(virtualRoom.publicRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('publicRoom');
        }
        if (!this.validate(virtualRoom.maxParticipants, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }
        if (!this.validate(virtualRoom.allowKnocking, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowKnocking');
        }
        if (!this.validate(virtualRoom.allowInstantMeeting, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowInstantMeeting');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator = VirtualRoomValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Attendee} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator
     */
    function AttendeeValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AttendeeValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Attendee object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Attendee} attendee
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AttendeeValidator.prototype.validateObject = function (attendee) {
        var errors = [];

        if (!this.validate(attendee.terminalId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING, false)) {
            errors.push('terminalId');
        }
        //Should be AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL
        if (!this.validate(attendee.protocol, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('protocol');
        }
        if (!this.validate(attendee.terminalName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalName');
        }
        if (!this.validate(attendee.terminalNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalNumber');
        }
        if (!this.validate(attendee.maxBandwidth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxBandwidth');
        }
        if (!this.validate(attendee.maxISDNBandwidth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxISDNBandwidth');
        }
        if (!this.validate(attendee.areaCode, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('areaCode');
        }
        if (!this.validate(attendee.countryCode, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('countryCode');
        }
        if (!this.validate(attendee.telephoneNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('telephoneNumber');
        }
        if (!this.validate(attendee.restrictedMode, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('restrictedMode');
        }
        if (!this.validate(attendee.threeG, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('threeG');
        }
        if (!this.validate(attendee.voiceOnly, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('voiceOnly');
        }
        if (!this.validate(attendee.userId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        if (!this.validate(attendee.firstName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('firstName');
        }
        if (!this.validate(attendee.lastName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('lastName');
        }
        if (!this.validate(attendee.email, AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL)) {
            errors.push('email');
        }
        if (!this.validate(attendee.organizer, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('organizer');
        }
        if (!this.validate(attendee.host, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('host');
        }
        if (!this.validate(attendee.needOnMaster, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('needOnMaster');
        }
        if (!this.validate(attendee.autoDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoDialIn');
        }
        var mainPartyInLayoutRes = attendee.mainPartyInLayout.validate();
        if (!mainPartyInLayoutRes.success) {
            errors.push(mainPartyInLayoutRes.errors);
        }
        var customerPartyInLayoutRes = attendee.customerPartyInLayout.validate();
        if (!customerPartyInLayoutRes.success) {
            errors.push(customerPartyInLayoutRes.errors);
        }
        var partyOutLayoutRes = attendee.partyOutLayout.validate();
        if (!partyOutLayoutRes.success) {
            errors.push(partyOutLayoutRes.errors);
        }
        if (!this.validate(attendee.panelist, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('panelist');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator = AttendeeValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator
     */
    function ReservedPortsValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    ReservedPortsValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate ReservedPorts object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts} reservedPorts
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    ReservedPortsValidator.prototype.validateObject = function (reservedPorts) {
        var errors = [];

        if (!this.validate(reservedPorts.regular, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('regular');
        }
        if (!this.validate(reservedPorts.sd, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('sd');
        }
        if (!this.validate(reservedPorts.hd, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('hd');
        }
        if (!this.validate(reservedPorts.fullHD, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('fullHD');
        }
        if (!this.validate(reservedPorts.audioOnlyWC, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('audioOnlyWC');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator = ReservedPortsValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator
     */
    function AdvancedPropertiesValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AdvancedPropertiesValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate AdvancedProperties object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties} advancedProperties
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AdvancedPropertiesValidator.prototype.validateObject = function (advancedProperties) {
        var errors = [];

        if (!this.validate(advancedProperties.durationAfterLeft, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION)) {
            errors.push('durationAfterLeft');
        }
        if (!this.validate(advancedProperties.terminationCondition, AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION)) {
            errors.push('terminationCondition');
        }
        if (!this.validate(advancedProperties.maxParticipants, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }
        if (!this.validate(advancedProperties.minutesBeforeTermination, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION)) {
            errors.push('minutesBeforeTermination');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator = AdvancedPropertiesValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.DailyValidator
     */
    function DailyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    DailyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Daily object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily} daily
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    DailyValidator.prototype.validateObject = function (daily) {
        var errors = [];

        if (!this.validate(daily.numberOfEveryDay, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryDay');
        }
        if (!this.validate(daily.everyWeekDay, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('everyWeekDay');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.DailyValidator = DailyValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator
     */
    function WeeklyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    WeeklyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Weekly object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly} weekly
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    WeeklyValidator.prototype.validateObject = function (weekly) {
        var errors = [];

        if (!this.validate(weekly.numberOfEveryWeek, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryWeek');
        }

        var daysOfWeek = weekly.daysOfWeek;
        if (!Array.isArray(daysOfWeek)) {
            errors.push('daysOfWeek: is not an array');
        } else {
            for (var i = 0; i < daysOfWeek.length; i++) {
                var res = this.validate(daysOfWeek[i], AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK);
                if (!res) {
                    errors.push('daysOfWeek[' + i + ']:' + daysOfWeek[i]);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator = WeeklyValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator
     */
    function MonthlyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    MonthlyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Monthly object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} monthly
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    MonthlyValidator.prototype.validateObject = function (monthly) {
        var errors = [];

        if (!this.validate(monthly.numberOfEveryMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryMonth');
        }
        if (!this.validate(monthly.dayOfMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('dayOfMonth');
        }

        var dayOfNumberOfEveryMonthRes = monthly.dayOfNumberOfEveryMonth.validate();
        if (!dayOfNumberOfEveryMonthRes.success) {
            errors.push(dayOfNumberOfEveryMonthRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator = MonthlyValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator
     */
    function RecurrenceEndValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    RecurrenceEndValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate RecurrenceEnd object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd} recurrenceEnd
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    RecurrenceEndValidator.prototype.validateObject = function (recurrenceEnd) {
        var errors = [];

        if (!this.validate(recurrenceEnd.endOfOccurrences, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('endOfOccurrences');
        }

        try {
            new Date(recurrenceEnd.by);
        } catch (e) {
            errors.push('by');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator = RecurrenceEndValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator
     */
    function DayOfNumberOfEveryMonthValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    DayOfNumberOfEveryMonthValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator
     * @desc Validate DayOfNumberOfEveryMonth object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth} dayOfNumberOfEveryMonth
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    DayOfNumberOfEveryMonthValidator.prototype.validateObject = function (dayOfNumberOfEveryMonth) {
        var errors = [];

        if (!this.validate(dayOfNumberOfEveryMonth.weekOfMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH)) {
            errors.push('weekOfMonth');
        }

        var dayOfWeek = dayOfNumberOfEveryMonth.dayOfWeek;
        if (!Array.isArray(dayOfWeek)) {
            errors.push('dayOfWeek: is not an array');
        } else {
            for (var i = 0; i < dayOfWeek.length; i++) {
                var res = this.validate(dayOfWeek[i], AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK);
                if (!res) {
                    errors.push('dayOfWeek[' + i + ']:' + dayOfWeek[i]);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator = DayOfNumberOfEveryMonthValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

/**
 *   AvayaMeetingManagementClient.Providers.Validators
 */
(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Providers.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PlainValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateMeetingStatus
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate Meeting status for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS}
     * @private
     * @param {string} status
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateMeetingStatus = function (status) {
        var errors = [];

        if (!this.validate(status, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS)) {
            errors.push('status');
        }

        return this.buildValidationResponse(errors);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateDate
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate date for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.DATE}
     * @private
     * @param {string} date
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateDate = function (date) {
        var errors = [];

        if (!this.validate(date, AvayaMeetingManagementClient.Constants.CONDITIONS.DATE)) {
            errors.push('date');
        }

        return this.buildValidationResponse(errors);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateTimeZone
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate Time zone for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE}
     * @private
     * @param {string} zone
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateTimeZone = function (zone) {
        var errors = [];

        if (!this.validate(zone, AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE)) {
            errors.push('timezone');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PlainValidator = PlainValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator
     */
    function BroadcastSettingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    BroadcastSettingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} broadcastSetting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    BroadcastSettingValidator.prototype.validateObject = function (broadcastSetting) {
        var errors = [];

        if (!this.validate(broadcastSetting.subject, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('subject');
        }

        if (!this.validate(broadcastSetting.pin, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('pin');
        }

        if (!this.validate(broadcastSetting.thumbnail, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('thumbnail');
        }

        if (!this.validate(broadcastSetting.thumbnailMimeType, AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES)) {
            errors.push('thumbnailMimeType');
        }

        if (!this.validate(broadcastSetting.profile, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profile');
        }

        if (!this.validate(broadcastSetting.description, AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT)) {
            errors.push('description');
        }

        if (!this.validate(broadcastSetting.public, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('public');
        }

        if (!this.validate(broadcastSetting.questionsAndAnswersEnabled, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('questionsAndAnswersEnabled');
        }

        if (!this.validate(broadcastSetting.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('moderatorPIN');
        }

        if (!this.validate(broadcastSetting.programeId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('programId');
        }

        var accessModeSettingRes = broadcastSetting.accessModeSetting.validate();
        if (!accessModeSettingRes.success) {
            errors.push(accessModeSettingRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator = BroadcastSettingValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator
     */
    function BroadcastProfileValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    BroadcastProfileValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator
     * @desc Validate Broadcast Profile object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile} broadcastProfile
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    BroadcastProfileValidator.prototype.validateObject = function (broadcastProfile) {
        var errors = [];

        if (!this.validate(broadcastProfile.profilesId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profilesId');
        }

        if (!this.validate(broadcastProfile.profilesName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profilesName');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator = BroadcastProfileValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator
     */
    function AccessModeSettingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AccessModeSettingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} broadcastSetting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AccessModeSettingValidator.prototype.validateObject = function (accessModeSetting) {
        var errors = [];

        if (!this.validate(accessModeSetting.accessMode, AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE)) {
            errors.push('accessMode');
        }

        if (!this.validate(accessModeSetting.userIds, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userIds');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator = AccessModeSettingValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator
     */
    function ResourceAvailabilityValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    ResourceAvailabilityValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator
     * @desc Validate ResourceAvailability object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability} resourceAvailability
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    ResourceAvailabilityValidator.prototype.validateObject = function (resourceAvailability) {
        var errors = [];

        if (!this.validate(resourceAvailability.id, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(resourceAvailability.type, AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE)) {
            errors.push('type');
        }

        var availability = resourceAvailability.availability;
        if (!Array.isArray(availability)) {
            errors.push('availability: is not an array');
        } else {
            for (var i = 0; i < availability.length; i++) {
                var res = availability[i].validate();
                if (!res.success) {
                    errors.push('availability[' + i + ']:' + res.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator = ResourceAvailabilityValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator
     */
    function AvailabilityValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AvailabilityValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator
     * @desc Validate Availability object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability} availability
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AvailabilityValidator.prototype.validateObject = function (availability) {
        var errors = [];

        try {
            new Date(availability.fromTime);
        } catch (e) {
            errors.push('fromTime');
        }
        try {
            new Date(availability.toTime);
        } catch (e) {
            errors.push('toTime');
        }
        if (!this.validate(availability.status, AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS)) {
            errors.push('status');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator = AvailabilityValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Propositional} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator
     */
    function PropositionalValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PropositionalValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator
     * @desc Validate Propositional object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Propositional} propositional
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PropositionalValidator.prototype.validateObject = function (propositional) {
        var errors = [];

        if (!this.validate(propositional.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('number');
        }

        if (!this.validate(propositional.virtualMeetingIDPrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('virtualMeetingIDPrefix');
        }

        if (!this.validate(propositional.minimumMeetingIDLength, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('minimumMeetingIDLength');
        }

        if (!this.validate(propositional.defaultDuration, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('defaultDuration');
        }

        if (!this.validate(propositional.defaultDialMode, AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE)) {
            errors.push('defaultDialMode');
        }

        if (!this.validate(propositional.termination, AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION)) {
            errors.push('termination');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator = PropositionalValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator
     */
    function VideoLayoutValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    VideoLayoutValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate VideoLayout object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout} videoLayout
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    VideoLayoutValidator.prototype.validateObject = function (videoLayout) {
        var errors = [];

        if (!this.validate(videoLayout.layoutName, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME)) {
            errors.push('layoutName');
        }
        if (!this.validate(videoLayout.layoutType, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE)) {
            errors.push('layoutType');
        }
        if (!this.validate(videoLayout.dynamic, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('dynamic');
        }
        if (!this.validate(videoLayout.noSelfSee, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('noSelfSee');
        }
        if (!this.validate(videoLayout.layoutMax, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('layoutMax');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator = VideoLayoutValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator
     */
    function PartyLayoutValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PartyLayoutValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate PartyLayout object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout} partyLayout
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PartyLayoutValidator.prototype.validateObject = function (partyLayout) {
        var errors = [];

        if (!this.validate(partyLayout.layoutName, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME)) {
            errors.push('layoutName');
        }
        if (!this.validate(partyLayout.positionId, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('positionId');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator = PartyLayoutValidator;

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @namespace
     * @desc RegExp patterns definitions
     * @private
     * @memberOf AvayaMeetingManagementClient.Constants
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS = AvayaMeetingManagementClient.Constants.CONDITIONS || {};

    /**
     * @namespace
     * @desc HTTP REST Content-types list
     * @private
     * @memberOf AvayaMeetingManagementClient.Constants
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES = AvayaMeetingManagementClient.Constants.CONTENT_TYPES || {};

})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING = 'application/vnd.avaya.portal.meeting.schedule.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2 = 'application/vnd.avaya.portal.meeting.schedule.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING = 'application/vnd.avaya.portal.meeting.update.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2 = 'application/vnd.avaya.portal.meeting.update.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING = 'application/vnd.avaya.portal.meeting.cancel.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING = 'application/vnd.avaya.portal.meeting.terminate.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING = 'application/vnd.avaya.portal.meeting.search.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETINGv2 = 'application/vnd.avaya.portal.meeting.search.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR = 'application/vnd.avaya.csa.error.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE = 'application/vnd.avaya.portal.broadcast_profiles.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY = 'application/vnd.avaya.portal.conference.resource_availability.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM = 'application/vnd.avaya.portal.conference.virtual_room.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER = 'application/vnd.avaya.portal.conference.propositional_number.v1+json';
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER = /^[-]{0,1}[0-9]{1,128}$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.STRING
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.STRING = /^.*$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT = /^[\s\S]*$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ID
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ID = /^[0-9]{1,16}$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN = /^TRUE$|^FALSE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL = /.+@.+\..+/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_UTC
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_UTC = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DATE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DATE = /^\d\d\d\d-\d\d-\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE = /^[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS = /^ABNORMAL_STOPPED$|^CANCELLED$|^FINISHED$|^IN_SESSION$|^NOT_START$|^SCHEDULE_FAILED$|^START_FAILED$|^STOP_FAILED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION = /^P(\d+Y){0,1}(\d+M){0,1}(\d+D){0,1}T(\d+H){0,1}(\d+M){0,1}([0-9.]+S){0,1}$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY = /^DELAY$|^LOCAL$|^UNSPECIFIED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED = /^ON$|^OFF$|^DISABLED$|^UNDEFINED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL = /^H323$|^ISDN$|^SIP$|^DUAL$|^MOBILE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION = /^NORMAL$|^AFTER_ALL_PARTIES_LEFT$|^AFTER_HOST_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK = /^MON$|^TUE$|^WED$|^THU$|^FRI$|^SAT$|^SUN$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH = /^FIRST$|^SECOND$|^THIRD$|^FOURTH$|^LATEST$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE = /^PRIVATE$|^LIMITED_USERS$|^ALL_AUTHED_USERS$|^ALL_USERS$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS = /^BUSY$|^FREE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE = /^TERMINAL$|^CONTACT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES = /^image\/jpeg$|^image\/jpg$|^image\/gif$|^image\/png$/i;
    
    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE = /^DIAL_OUT$|^DIAL_IN$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION = /^SCHEDULE_END_TIME$|^ALL_ENDPOINT_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME = /^MAIN$|^CUSTOMER$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE =  /^0000$|^0100$|^0201$|^0202$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0705$|^0801$|^0900$|^0901$|^1001$|^1200$|^1301$|^1305$|^1600$|^2100$|^2101$|^2800$/i;
   //Full list //^0000$|^0100$|^0201$|^0202$|^0203$|^0204$|^0205$|^0206$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0602$|^0603$|^0705$|^0706$|^0801$|^0802$|^0900$|^0901$|^0902$|^1001$|^1002$|^1003$|^1004$|^1200$|^1301$|^1302$|^1303$|^1304$|^1305$|^1600$|^2100$|^2101$|^2800$/i;
})(AvayaMeetingManagementClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants
     * @desc An array of available video layouts that provides id, maxParticipants data and 
     * coordination set for SVG drawing
     * @define AvayaMeetingManagementClient.Constants.LAYOUTS
     */
    AvayaMeetingManagementClient.Constants.LAYOUTS = [{
            id : '0000',
            bars : [],
            maxParticipants : 0
        }, {
            id : '0100',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 1
        }, {
            id : '0100',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 1
        }, {
            id : '0201',
            bars : [{
                    x1 : 1,
                    y1 : 8,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 49,
                    y2 : 22
                }
            ],
            maxParticipants : 2
        }, {
            id : '0202',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 37,
                    y2 : 29
                }
            ],
            maxParticipants : 2
        }, {
            id : '0207',
            bars : [{
                    x1 : 1,
                    y1 : 6,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 49,
                    y2 : 24
                }
            ],
            maxParticipants : 2
        }, {
            id : '0302',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 3
        }, {
            id : '0303',
            bars : [{
                    x1 : 1,
                    y1 : 6,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 49,
                    y2 : 24
                }
            ],
            maxParticipants : 3
        }, {
            id : '0400',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 4
        }, {
            id : '0401',
            bars : [{
                    x1 : 8,
                    y1 : 1,
                    x2 : 42,
                    y2 : 20
                }, {
                    x1 : 1,
                    y1 : 20,
                    x2 : 17,
                    y2 : 29
                }, {
                    x1 : 17,
                    y1 : 20,
                    x2 : 33,
                    y2 : 29
                }, {
                    x1 : 33,
                    y1 : 20,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 4
        }, {
            id : '0402',
            bars : [{
                    x1 : 1,
                    y1 : 4.5,
                    x2 : 37,
                    y2 : 25.5
                }, {
                    x1 : 37,
                    y1 : 4.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 37,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 18.5
                }, {
                    x1 : 37,
                    y1 : 18.5,
                    x2 : 49,
                    y2 : 25.5
                }
            ],
            maxParticipants : 4
        }, {
            id : '0501',
            bars : [{
                    x1 : 7,
                    y1 : 1,
                    x2 : 43,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 5
        }, {
            id : '0600',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 6
        }, {
            id : '0601',
            bars : [{
                    x1 : 1,
                    y1 : 5,
                    x2 : 17,
                    y2 : 14
                }, {
                    x1 : 17,
                    y1 : 5,
                    x2 : 33,
                    y2 : 14
                }, {
                    x1 : 33,
                    y1 : 5,
                    x2 : 49,
                    y2 : 14
                }, {
                    x1 : 1,
                    y1 : 14,
                    x2 : 17,
                    y2 : 23
                }, {
                    x1 : 17,
                    y1 : 14,
                    x2 : 33,
                    y2 : 23
                }, {
                    x1 : 33,
                    y1 : 14,
                    x2 : 49,
                    y2 : 23
                }
            ],
            maxParticipants : 6
        }, {
            id : '0705',
            bars : [{
                    x1 : 1,
                    y1 : 2.5,
                    x2 : 33,
                    y2 : 20.5
                }, {
                    x1 : 33,
                    y1 : 2.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 33,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 20.5
                }, {
                    x1 : 1,
                    y1 : 20.5,
                    x2 : 13,
                    y2 : 27.5
                }, {
                    x1 : 13,
                    y1 : 20.5,
                    x2 : 25,
                    y2 : 27.5
                }, {
                    x1 : 25,
                    y1 : 20.5,
                    x2 : 37,
                    y2 : 27.5
                }, {
                    x1 : 37,
                    y1 : 20.5,
                    x2 : 49,
                    y2 : 27.5
                }
            ],
            maxParticipants : 7
        }, {
            id : '0801',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 8
        }, {
            id : '0900',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 17,
                    y2 : 10.5
                }, {
                    x1 : 17,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 1,
                    y1 : 10.5,
                    x2 : 17,
                    y2 : 19.5
                }, {
                    x1 : 17,
                    y1 : 10.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 9
        }, {
            id : '0901',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 9
        }, {
            id : '1001',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 10
        }, {
            id : '1200',
            bars : [{
                    x1 : 1,
                    y1 : 4.5,
                    x2 : 13,
                    y2 : 11.5
                }, {
                    x1 : 13,
                    y1 : 4.5,
                    x2 : 25,
                    y2 : 11.5
                }, {
                    x1 : 25,
                    y1 : 4.5,
                    x2 : 37,
                    y2 : 11.5
                }, {
                    x1 : 37,
                    y1 : 4.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 1,
                    y1 : 11.5,
                    x2 : 13,
                    y2 : 18.5
                }, {
                    x1 : 13,
                    y1 : 11.5,
                    x2 : 25,
                    y2 : 18.5
                }, {
                    x1 : 25,
                    y1 : 11.5,
                    x2 : 37,
                    y2 : 18.5
                }, {
                    x1 : 37,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 18.5
                }, {
                    x1 : 1,
                    y1 : 18.5,
                    x2 : 13,
                    y2 : 25.5
                }, {
                    x1 : 13,
                    y1 : 18.5,
                    x2 : 25,
                    y2 : 25.5
                }, {
                    x1 : 25,
                    y1 : 18.5,
                    x2 : 37,
                    y2 : 25.5
                }, {
                    x1 : 37,
                    y1 : 18.5,
                    x2 : 49,
                    y2 : 25.5
                }
            ],
            maxParticipants : 12
        }, {
            id : '1301',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 13
        }, {
            id : '1305',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 13,
                    y2 : 8
                }, {
                    x1 : 13,
                    y1 : 1,
                    x2 : 25,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 1,
                    y1 : 8,
                    x2 : 13,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 8,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 13
        }, {
            id : '1600',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 13,
                    y2 : 8
                }, {
                    x1 : 13,
                    y1 : 1,
                    x2 : 25,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 1,
                    y1 : 8,
                    x2 : 13,
                    y2 : 15
                }, {
                    x1 : 13,
                    y1 : 8,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 16
        }, {
            id : '2100',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 9,
                    y2 : 6
                }, {
                    x1 : 9,
                    y1 : 1.5,
                    x2 : 17,
                    y2 : 6
                }, {
                    x1 : 17,
                    y1 : 1.5,
                    x2 : 25,
                    y2 : 6
                }, {
                    x1 : 25,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 1,
                    y1 : 6,
                    x2 : 9,
                    y2 : 10.5
                }, {
                    x1 : 1,
                    y1 : 10.5,
                    x2 : 9,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 9,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 6,
                    x2 : 41,
                    y2 : 24
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 21
        }, {
            id : '2101',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 41,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 41,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 41,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 24
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 25,
                    y2 : 24
                }, {
                    x1 : 25,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 21
        }, {
            id : '2800',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 25,
                    y1 : 6,
                    x2 : 33,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 41,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 25,
                    y1 : 10.5,
                    x2 : 33,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 41,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 9,
                    y2 : 19.5
                }, {
                    x1 : 9,
                    y1 : 15,
                    x2 : 17,
                    y2 : 19.5
                }, {
                    x1 : 17,
                    y1 : 15,
                    x2 : 25,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 24
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 25,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 41,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 25,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 41,
                    y2 : 24
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 28
        }
    ];

})(AvayaMeetingManagementClient);
;
//# sourceMappingURL=scripts.js.map