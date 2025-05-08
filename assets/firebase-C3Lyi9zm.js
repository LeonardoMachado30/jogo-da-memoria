import{e as ud,g as dd,a as fd,r as pd,j as gd}from"./index-XAvQvGti.js";const _d=()=>{};var Fa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A=function(n,e){if(!n)throw en(e)},en=function(n){return new Error("Firebase Database ("+fc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},md=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},ls={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,v=o>>2,m=(o&3)<<4|c>>4;let I=(c&15)<<2|d>>6,R=d&63;u||(R=64,a||(I=64)),i.push(t[v],t[m],t[I],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(pc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):md(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||c==null||d==null||m==null)throw new vd;const I=o<<2|c>>4;if(i.push(I),d!==64){const R=c<<4&240|d>>2;if(i.push(R),m!==64){const b=d<<6&192|m;i.push(b)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class vd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gc=function(n){const e=pc(n);return ls.encodeByteArray(e,!0)},Li=function(n){return gc(n).replace(/\./g,"")},xi=function(n){try{return ls.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(n){return _c(void 0,n)}function _c(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Ed(t)||(n[t]=_c(n[t],e[t]));return n}function Ed(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id=()=>wd().__FIREBASE_DEFAULTS__,Td=()=>{if(typeof process>"u"||typeof Fa>"u")return;const n=Fa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Cd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&xi(n[1]);return e&&JSON.parse(e)},Br=()=>{try{return _d()||Id()||Td()||Cd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},mc=n=>{var e,t;return(t=(e=Br())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Sd=n=>{const e=mc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},vc=()=>{var n;return(n=Br())===null||n===void 0?void 0:n.config},yc=n=>{var e;return(e=Br())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Li(JSON.stringify(t)),Li(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function Ad(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Rd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ec(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function kd(){const n=ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Pd(){return fc.NODE_ADMIN===!0}function wc(){try{return typeof indexedDB=="object"}catch{return!1}}function Nd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="FirebaseError";class We extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Od,Object.setPrototypeOf(this,We.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tn.prototype.create)}}class tn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Dd(o,i):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new We(s,c,i)}}function Dd(n,e){return n.replace(Md,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Md=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(n){return JSON.parse(n)}function ee(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic=function(n){let e={},t={},i={},s="";try{const o=n.split(".");e=Un(xi(o[0])||""),t=Un(xi(o[1])||""),s=o[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Ld=function(n){const e=Ic(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},xd=function(n){const e=Ic(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Kt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function fr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Fi(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Pt(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const o=n[s],a=e[s];if(Ua(o)&&Ua(a)){if(!Pt(o,a))return!1}else if(o!==a)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ua(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let m=0;m<16;m++)i[m]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let m=0;m<16;m++)i[m]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let m=16;m<80;m++){const I=i[m-3]^i[m-8]^i[m-14]^i[m-16];i[m]=(I<<1|I>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],c=this.chain_[3],u=this.chain_[4],d,v;for(let m=0;m<80;m++){m<40?m<20?(d=c^o&(a^c),v=1518500249):(d=o^a^c,v=1859775393):m<60?(d=o&a|c&(o|a),v=2400959708):(d=o^a^c,v=3395469782);const I=(s<<5|s>>>27)+d+u+v+i[m]&4294967295;u=c,c=a,a=(o<<30|o>>>2)&4294967295,o=s,s=I}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const o=this.buf_;let a=this.inbuf_;for(;s<t;){if(a===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(o[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}else for(;s<t;)if(o[a]=e[s],++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[s]>>o&255,++i;return e}}function Ud(n,e){const t=new Bd(n,e);return t.subscribe.bind(t)}class Bd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Vd(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Js),s.error===void 0&&(s.error=Js),s.complete===void 0&&(s.complete=Js);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Vd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Js(){}function cs(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const o=s-55296;i++,A(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(o<<10)+a}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},hs=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}class Le{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new kt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($d(e))try{this.getOrInitializeService({instanceIdentifier:Tt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=Tt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tt){return this.instances.has(e)}getOptions(e=Tt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:jd(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Tt){return this.component?this.component.multipleInstances?e:Tt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jd(n){return n===Tt?void 0:n}function $d(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Hd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(V||(V={}));const zd={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},qd=V.INFO,Kd={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},Yd=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Kd[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yn{constructor(e){this.name=e,this._logLevel=qd,this._logHandler=Yd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}const Xd=(n,e)=>e.some(t=>n instanceof t);let Ba,Va;function Jd(){return Ba||(Ba=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qd(){return Va||(Va=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Tc=new WeakMap,pr=new WeakMap,Cc=new WeakMap,Qs=new WeakMap,Wr=new WeakMap;function Zd(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ut(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Tc.set(t,n)}).catch(()=>{}),Wr.set(e,n),e}function ef(n){if(pr.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});pr.set(n,e)}let gr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return pr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Cc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ut(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function tf(n){gr=n(gr)}function nf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Zs(this),e,...t);return Cc.set(i,e.sort?e.sort():[e]),ut(i)}:Qd().includes(n)?function(...e){return n.apply(Zs(this),e),ut(Tc.get(this))}:function(...e){return ut(n.apply(Zs(this),e))}}function sf(n){return typeof n=="function"?nf(n):(n instanceof IDBTransaction&&ef(n),Xd(n,Jd())?new Proxy(n,gr):n)}function ut(n){if(n instanceof IDBRequest)return Zd(n);if(Qs.has(n))return Qs.get(n);const e=sf(n);return e!==n&&(Qs.set(n,e),Wr.set(e,n)),e}const Zs=n=>Wr.get(n);function rf(n,e,{blocked:t,upgrade:i,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),c=ut(a);return i&&a.addEventListener("upgradeneeded",u=>{i(ut(a.result),u.oldVersion,u.newVersion,ut(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{o&&u.addEventListener("close",()=>o()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const of=["get","getKey","getAll","getAllKeys","count"],af=["put","add","delete","clear"],er=new Map;function Wa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(er.get(e))return er.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=af.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||of.includes(t)))return;const o=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return i&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return er.set(e,o),o}tf(n=>({...n,get:(e,t,i)=>Wa(e,t)||n.get(e,t,i),has:(e,t)=>!!Wa(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cf(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function cf(n){const e=n.getComponent();return e?.type==="VERSION"}const _r="@firebase/app",Ha="0.11.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Yn("@firebase/app"),hf="@firebase/app-compat",uf="@firebase/analytics-compat",df="@firebase/analytics",ff="@firebase/app-check-compat",pf="@firebase/app-check",gf="@firebase/auth",_f="@firebase/auth-compat",mf="@firebase/database",vf="@firebase/data-connect",yf="@firebase/database-compat",Ef="@firebase/functions",wf="@firebase/functions-compat",If="@firebase/installations",Tf="@firebase/installations-compat",Cf="@firebase/messaging",Sf="@firebase/messaging-compat",bf="@firebase/performance",Af="@firebase/performance-compat",Rf="@firebase/remote-config",kf="@firebase/remote-config-compat",Pf="@firebase/storage",Nf="@firebase/storage-compat",Of="@firebase/firestore",Df="@firebase/vertexai",Mf="@firebase/firestore-compat",Lf="firebase",xf="11.6.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr="[DEFAULT]",Ff={[_r]:"fire-core",[hf]:"fire-core-compat",[df]:"fire-analytics",[uf]:"fire-analytics-compat",[pf]:"fire-app-check",[ff]:"fire-app-check-compat",[gf]:"fire-auth",[_f]:"fire-auth-compat",[mf]:"fire-rtdb",[vf]:"fire-data-connect",[yf]:"fire-rtdb-compat",[Ef]:"fire-fn",[wf]:"fire-fn-compat",[If]:"fire-iid",[Tf]:"fire-iid-compat",[Cf]:"fire-fcm",[Sf]:"fire-fcm-compat",[bf]:"fire-perf",[Af]:"fire-perf-compat",[Rf]:"fire-rc",[kf]:"fire-rc-compat",[Pf]:"fire-gcs",[Nf]:"fire-gcs-compat",[Of]:"fire-fst",[Mf]:"fire-fst-compat",[Df]:"fire-vertex","fire-js":"fire-js",[Lf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=new Map,Uf=new Map,vr=new Map;function ja(n,e){try{n.container.addComponent(e)}catch(t){Je.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ue(n){const e=n.name;if(vr.has(e))return Je.debug(`There were multiple attempts to register component ${e}.`),!1;vr.set(e,n);for(const t of Ui.values())ja(t,n);for(const t of Uf.values())ja(t,n);return!0}function Hr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ye(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},dt=new tn("app","Firebase",Bf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Le("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=xf;function Sc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:mr,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw dt.create("bad-app-name",{appName:String(s)});if(t||(t=vc()),!t)throw dt.create("no-options");const o=Ui.get(s);if(o){if(Pt(t,o.options)&&Pt(i,o.config))return o;throw dt.create("duplicate-app",{appName:s})}const a=new Gd(s);for(const u of vr.values())a.addComponent(u);const c=new Vf(t,i,a);return Ui.set(s,c),c}function jr(n=mr){const e=Ui.get(n);if(!e&&n===mr&&vc())return Sc();if(!e)throw dt.create("no-app",{appName:n});return e}function Ee(n,e,t){var i;let s=(i=Ff[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${e}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Je.warn(c.join(" "));return}Ue(new Le(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf="firebase-heartbeat-database",Hf=1,Bn="firebase-heartbeat-store";let tr=null;function bc(){return tr||(tr=rf(Wf,Hf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bn)}catch(t){console.warn(t)}}}}).catch(n=>{throw dt.create("idb-open",{originalErrorMessage:n.message})})),tr}async function jf(n){try{const t=(await bc()).transaction(Bn),i=await t.objectStore(Bn).get(Ac(n));return await t.done,i}catch(e){if(e instanceof We)Je.warn(e.message);else{const t=dt.create("idb-get",{originalErrorMessage:e?.message});Je.warn(t.message)}}}async function $a(n,e){try{const i=(await bc()).transaction(Bn,"readwrite");await i.objectStore(Bn).put(e,Ac(n)),await i.done}catch(t){if(t instanceof We)Je.warn(t.message);else{const i=dt.create("idb-set",{originalErrorMessage:t?.message});Je.warn(i.message)}}}function Ac(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f=1024,Gf=30;class zf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Kf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ga();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Gf){const a=Yf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Je.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ga(),{heartbeatsToSend:i,unsentEntries:s}=qf(this._heartbeatsCache.heartbeats),o=Li(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Je.warn(t),""}}}function Ga(){return new Date().toISOString().substring(0,10)}function qf(n,e=$f){const t=[];let i=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),za(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),za(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Kf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wc()?Nd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await jf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return $a(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return $a(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function za(n){return Li(JSON.stringify({version:2,heartbeats:n})).length}function Yf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){Ue(new Le("platform-logger",e=>new lf(e),"PRIVATE")),Ue(new Le("heartbeat",e=>new zf(e),"PRIVATE")),Ee(_r,Ha,n),Ee(_r,Ha,"esm2017"),Ee("fire-js","")}Xf("");var qa={};const Ka="@firebase/database",Ya="1.0.14";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rc="";function Jf(n){Rc=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ee(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Un(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return He(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Qf(e)}}catch{}return new Zf},St=kc("localStorage"),ep=kc("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=new Yn("@firebase/database"),tp=function(){let n=1;return function(){return n++}}(),Pc=function(n){const e=Wd(n),t=new Fd;t.update(e);const i=t.digest();return ls.encodeByteArray(i)},Xn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Xn.apply(null,i):typeof i=="object"?e+=ee(i):e+=i,e+=" "}return e};let Pn=null,Xa=!0;const np=function(n,e){A(!0,"Can't turn on custom loggers persistently."),$t.logLevel=V.VERBOSE,Pn=$t.log.bind($t)},re=function(...n){if(Xa===!0&&(Xa=!1,Pn===null&&ep.get("logging_enabled")===!0&&np()),Pn){const e=Xn.apply(null,n);Pn(e)}},Jn=function(n){return function(...e){re(n,...e)}},yr=function(...n){const e="FIREBASE INTERNAL ERROR: "+Xn(...n);$t.error(e)},Qe=function(...n){const e=`FIREBASE FATAL ERROR: ${Xn(...n)}`;throw $t.error(e),new Error(e)},pe=function(...n){const e="FIREBASE WARNING: "+Xn(...n);$t.warn(e)},ip=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&pe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},$r=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},sp=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Nt="[MIN_NAME]",gt="[MAX_NAME]",Lt=function(n,e){if(n===e)return 0;if(n===Nt||e===gt)return-1;if(e===Nt||n===gt)return 1;{const t=Ja(n),i=Ja(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},rp=function(n,e){return n===e?0:n<e?-1:1},Sn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+ee(e))},Gr=function(n){if(typeof n!="object"||n===null)return ee(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=ee(e[i]),t+=":",t+=Gr(n[e[i]]);return t+="}",t},Nc=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function oe(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Oc=function(n){A(!$r(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,o,a,c,u;n===0?(o=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(c=Math.min(Math.floor(Math.log(n)/Math.LN2),i),o=c+i,a=Math.round(n*Math.pow(2,t-c)-Math.pow(2,t))):(o=0,a=Math.round(n/Math.pow(2,1-i-t))));const d=[];for(u=t;u;u-=1)d.push(a%2?1:0),a=Math.floor(a/2);for(u=e;u;u-=1)d.push(o%2?1:0),o=Math.floor(o/2);d.push(s?1:0),d.reverse();const v=d.join("");let m="";for(u=0;u<64;u+=8){let I=parseInt(v.substr(u,8),2).toString(16);I.length===1&&(I="0"+I),m=m+I}return m.toLowerCase()},op=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},ap=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function lp(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const cp=new RegExp("^-?(0*)\\d{1,10}$"),hp=-2147483648,up=2147483647,Ja=function(n){if(cp.test(n)){const e=Number(n);if(e>=hp&&e<=up)return e}return null},sn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw pe("Exception was thrown by user callback.",t),e},Math.floor(0))}},dp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Nn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ye(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){pe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',pe(e)}}class Pi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="5",Dc="v",Mc="s",Lc="r",xc="f",Fc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Uc="ls",Bc="p",Er="ac",Vc="websocket",Wc="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t,i,s,o=!1,a="",c=!1,u=!1,d=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=u,this.emulatorOptions=d,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=St.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&St.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function gp(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function jc(n,e,t){A(typeof e=="string","typeof type must == string"),A(typeof t=="object","typeof params must == object");let i;if(e===Vc)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Wc)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);gp(n)&&(t.ns=n.namespace);const s=[];return oe(t,(o,a)=>{s.push(o+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(){this.counters_={}}incrementCounter(e,t=1){He(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return yd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr={},ir={};function qr(n){const e=n.toString();return nr[e]||(nr[e]=new _p),nr[e]}function mp(n,e){const t=n.toString();return ir[t]||(ir[t]=e()),ir[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&sn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="start",yp="close",Ep="pLPCommand",wp="pRTLPCB",$c="id",Gc="pw",zc="ser",Ip="cb",Tp="seg",Cp="ts",Sp="d",bp="dframe",qc=1870,Kc=30,Ap=qc-Kc,Rp=25e3,kp=3e4;class jt{constructor(e,t,i,s,o,a,c){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.transportSessionId=a,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Jn(e),this.stats_=qr(t),this.urlFn=u=>(this.appCheckToken&&(u[Er]=this.appCheckToken),jc(t,Wc,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new vp(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(kp)),sp(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Kr((...o)=>{const[a,c,u,d,v]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===Qa)this.id=c,this.password=u;else if(a===yp)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...o)=>{const[a,c]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(a,c)},()=>{this.onClosed_()},this.urlFn);const i={};i[Qa]="t",i[zc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Ip]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Dc]=zr,this.transportSessionId&&(i[Mc]=this.transportSessionId),this.lastSessionId&&(i[Uc]=this.lastSessionId),this.applicationId&&(i[Bc]=this.applicationId),this.appCheckToken&&(i[Er]=this.appCheckToken),typeof location<"u"&&location.hostname&&Fc.test(location.hostname)&&(i[Lc]=xc);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){jt.forceAllow_=!0}static forceDisallow(){jt.forceDisallow_=!0}static isAvailable(){return jt.forceAllow_?!0:!jt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!op()&&!ap()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ee(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=gc(t),s=Nc(i,Ap);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[bp]="t",i[$c]=e,i[Gc]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ee(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Kr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=tp(),window[Ep+this.uniqueCallbackIdentifier]=e,window[wp+this.uniqueCallbackIdentifier]=t,this.myIFrame=Kr.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(c){re("frame writing exception"),c.stack&&re(c.stack),re(c)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||re("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[$c]=this.myID,e[Gc]=this.myPW,e[zc]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Kc+i.length<=qc;){const a=this.pendingSegs.shift();i=i+"&"+Tp+s+"="+a.seg+"&"+Cp+s+"="+a.ts+"&"+Sp+s+"="+a.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Rp)),o=()=>{clearTimeout(s),i()};this.addTag(e,o)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp=16384,Np=45e3;let Bi=null;typeof MozWebSocket<"u"?Bi=MozWebSocket:typeof WebSocket<"u"&&(Bi=WebSocket);class be{constructor(e,t,i,s,o,a,c){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Jn(this.connId),this.stats_=qr(t),this.connURL=be.connectionURL_(t,a,c,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,o){const a={};return a[Dc]=zr,typeof location<"u"&&location.hostname&&Fc.test(location.hostname)&&(a[Lc]=xc),t&&(a[Mc]=t),i&&(a[Uc]=i),s&&(a[Er]=s),o&&(a[Bc]=o),jc(e,Vc,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,St.set("previous_websocket_failure",!0);try{let i;Pd(),this.mySock=new Bi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){be.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Bi!==null&&!be.forceDisallow_}static previouslyFailed(){return St.isInMemoryStorage||St.get("previous_websocket_failure")===!0}markConnectionHealthy(){St.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Un(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(A(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=ee(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Nc(t,Pp);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Np))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}be.responsesRequiredToBeHealthy=2;be.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{static get ALL_TRANSPORTS(){return[jt,be]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=be&&be.isAvailable();let i=t&&!be.previouslyFailed();if(e.webSocketOnly&&(t||pe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[be];else{const s=this.transports_=[];for(const o of Vn.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);Vn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Vn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op=6e4,Dp=5e3,Mp=10*1024,Lp=100*1024,sr="t",Za="d",xp="s",el="r",Fp="e",tl="o",nl="a",il="n",sl="p",Up="h";class Bp{constructor(e,t,i,s,o,a,c,u,d,v){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=a,this.onReady_=c,this.onDisconnect_=u,this.onKill_=d,this.lastSessionId=v,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Jn("c:"+this.id+":"),this.transportManager_=new Vn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Nn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Lp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Mp?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(sr in e){const t=e[sr];t===nl?this.upgradeIfSecondaryHealthy_():t===el?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===tl&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Sn("t",e),i=Sn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:sl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:nl,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:il,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Sn("t",e),i=Sn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Sn(sr,e);if(Za in e){const i=e[Za];if(t===Up){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===il){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===xp?this.onConnectionShutdown_(i):t===el?this.onReset_(i):t===Fp?yr("Server Error: "+i):t===tl?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):yr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),zr!==i&&pe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Nn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Op))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Nn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Dp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:sl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(St.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e){this.allowedEvents_=e,this.listeners_={},A(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===t&&(!i||i===s[o].context)){s.splice(o,1);return}}validateEventType_(e){A(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi extends Xc{static getInstance(){return new Vi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Vr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return A(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=32,ol=768;class W{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function B(){return new W("")}function x(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function _t(n){return n.pieces_.length-n.pieceNum_}function G(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new W(n.pieces_,e)}function Yr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Vp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Wn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Jc(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new W(e,0)}function Y(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof W)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new W(t,0)}function M(n){return n.pieceNum_>=n.pieces_.length}function fe(n,e){const t=x(n),i=x(e);if(t===null)return e;if(t===i)return fe(G(n),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Wp(n,e){const t=Wn(n,0),i=Wn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const o=Lt(t[s],i[s]);if(o!==0)return o}return t.length===i.length?0:t.length<i.length?-1:1}function Qc(n,e){if(_t(n)!==_t(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Te(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(_t(n)>_t(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Hp{constructor(e,t){this.errorPrefix_=t,this.parts_=Wn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=hs(this.parts_[i]);Zc(this)}}function jp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=hs(e),Zc(n)}function $p(n){const e=n.parts_.pop();n.byteLength_-=hs(e),n.parts_.length>0&&(n.byteLength_-=1)}function Zc(n){if(n.byteLength_>ol)throw new Error(n.errorPrefix_+"has a key path longer than "+ol+" bytes ("+n.byteLength_+").");if(n.parts_.length>rl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+rl+") or object contains a cycle "+Ct(n))}function Ct(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Xc{static getInstance(){return new Xr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return A(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=1e3,Gp=60*5*1e3,al=30*1e3,zp=1.3,qp=3e4,Kp="server_kill",ll=3;class Xe extends Yc{constructor(e,t,i,s,o,a,c,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=a,this.appCheckTokenProvider_=c,this.authOverride_=u,this.id=Xe.nextPersistentConnectionId_++,this.log_=Jn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=bn,this.maxReconnectDelay_=Gp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Xr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Vi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,o={r:s,a:e,b:t};this.log_(ee(o)),A(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new kt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const c=a.d;a.s==="ok"?t.resolve(c):t.reject(c)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),t.promise}listen(e,t,i,s){this.initConnection_();const o=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+o),this.listens.has(a)||this.listens.set(a,new Map),A(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),A(!this.listens.get(a).has(o),"listen() called twice for same path/queryId.");const c={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(a).set(o,c),this.connected_&&this.sendListen_(c)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const o={p:i},a="q";e.tag&&(o.q=t._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(a,o,c=>{const u=c.d,d=c.s;Xe.warnOnListenWarnings_(u,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",c),d!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(d,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&He(e,"w")){const i=Kt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',o=t._path.toString();pe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||xd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=al)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Ld(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const o=s.s,a=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),A(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const o={p:e},a="n";s&&(o.q=i,o.t=s),this.sendRequest(a,o)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const o={p:t,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,o){this.initConnection_();const a={p:t,d:i};o!==void 0&&(a.h=o),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,o=>{this.log_(t+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ee(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):yr("Unrecognized action received from server: "+ee(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){A(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=bn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=bn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>qp&&(this.reconnectDelay_=bn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*zp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Xe.nextConnectionId_++,o=this.lastSessionId;let a=!1,c=null;const u=function(){c?c.close():(a=!0,i())},d=function(m){A(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(m)};this.realtime_={close:u,sendRequest:d};const v=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[m,I]=await Promise.all([this.authTokenProvider_.getToken(v),this.appCheckTokenProvider_.getToken(v)]);a?re("getToken() completed but was canceled"):(re("getToken() completed. Creating connection."),this.authToken_=m&&m.accessToken,this.appCheckToken_=I&&I.token,c=new Bp(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,R=>{pe(R+" ("+this.repoInfo_.toString()+")"),this.interrupt(Kp)},o))}catch(m){this.log_("Failed to get token: "+m),a||(this.repoInfo_.nodeAdmin&&pe(m),u())}}}interrupt(e){re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fr(this.interruptReasons_)&&(this.reconnectDelay_=bn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(o=>Gr(o)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new W(e).toString();let s;if(this.listens.has(i)){const o=this.listens.get(i);s=o.get(t),o.delete(t),o.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){re("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ll&&(this.reconnectDelay_=al,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){re("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ll&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Rc.replace(/\./g,"-")]=1,Vr()?e["framework.cordova"]=1:Ec()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Vi.getInstance().currentlyOnline();return fr(this.interruptReasons_)&&e}}Xe.nextPersistentConnectionId_=0;Xe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new L(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new L(Nt,e),s=new L(Nt,t);return this.compare(i,s)!==0}minPost(){return L.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii;class eh extends us{static get __EMPTY_NODE(){return Ii}static set __EMPTY_NODE(e){Ii=e}compare(e,t){return Lt(e.name,t.name)}isDefinedOn(e){throw en("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return L.MIN}maxPost(){return new L(gt,Ii)}makePost(e,t){return A(typeof e=="string","KeyIndex indexValue must always be a string."),new L(e,Ii)}toString(){return".key"}}const At=new eh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,i,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?i(e.key,t):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ie{constructor(e,t,i,s,o){this.key=e,this.value=t,this.color=i??ie.RED,this.left=s??_e.EMPTY_NODE,this.right=o??_e.EMPTY_NODE}copy(e,t,i,s,o){return new ie(e??this.key,t??this.value,i??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const o=i(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):o===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return _e.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return _e.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ie.RED=!0;ie.BLACK=!1;class Yp{copy(e,t,i,s,o){return this}insert(e,t,i){return new ie(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class _e{constructor(e,t=_e.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new _e(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ie.BLACK,null,null))}remove(e){return new _e(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ie.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ti(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ti(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ti(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ti(this.root_,null,this.comparator_,!0,e)}}_e.EMPTY_NODE=new Yp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xp(n,e){return Lt(n.name,e.name)}function Jr(n,e){return Lt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wr;function Jp(n){wr=n}const th=function(n){return typeof n=="number"?"number:"+Oc(n):"string:"+n},nh=function(n){if(n.isLeafNode()){const e=n.val();A(typeof e=="string"||typeof e=="number"||typeof e=="object"&&He(e,".sv"),"Priority must be a string or number.")}else A(n===wr||n.isEmpty(),"priority of unexpected type.");A(n===wr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cl;class ne{static set __childrenNodeConstructor(e){cl=e}static get __childrenNodeConstructor(){return cl}constructor(e,t=ne.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,A(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),nh(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ne(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ne.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return M(e)?this:x(e)===".priority"?this.priorityNode_:ne.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ne.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=x(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(A(i!==".priority"||_t(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ne.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+th(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Oc(this.value_):e+=this.value_,this.lazyHash_=Pc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ne.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ne.__childrenNodeConstructor?-1:(A(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=ne.VALUE_TYPE_ORDER.indexOf(t),o=ne.VALUE_TYPE_ORDER.indexOf(i);return A(s>=0,"Unknown leaf type: "+t),A(o>=0,"Unknown leaf type: "+i),s===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ne.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ih,sh;function Qp(n){ih=n}function Zp(n){sh=n}class eg extends us{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),o=i.compareTo(s);return o===0?Lt(e.name,t.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return L.MIN}maxPost(){return new L(gt,new ne("[PRIORITY-POST]",sh))}makePost(e,t){const i=ih(e);return new L(t,new ne("[PRIORITY-POST]",i))}toString(){return".priority"}}const K=new eg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg=Math.log(2);class ng{constructor(e){const t=o=>parseInt(Math.log(o)/tg,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Wi=function(n,e,t,i){n.sort(e);const s=function(u,d){const v=d-u;let m,I;if(v===0)return null;if(v===1)return m=n[u],I=t?t(m):m,new ie(I,m.node,ie.BLACK,null,null);{const R=parseInt(v/2,10)+u,b=s(u,R),N=s(R+1,d);return m=n[R],I=t?t(m):m,new ie(I,m.node,ie.BLACK,b,N)}},o=function(u){let d=null,v=null,m=n.length;const I=function(b,N){const P=m-b,X=m;m-=b;const Q=s(P+1,X),H=n[P],z=t?t(H):H;R(new ie(z,H.node,N,null,Q))},R=function(b){d?(d.left=b,d=b):(v=b,d=b)};for(let b=0;b<u.count;++b){const N=u.nextBitIsOne(),P=Math.pow(2,u.count-(b+1));N?I(P,ie.BLACK):(I(P,ie.BLACK),I(P,ie.RED))}return v},a=new ng(n.length),c=o(a);return new _e(i||e,c)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rr;const Ht={};class qe{static get Default(){return A(Ht&&K,"ChildrenNode.ts has not been loaded"),rr=rr||new qe({".priority":Ht},{".priority":K}),rr}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Kt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof _e?t:null}hasIndex(e){return He(this.indexSet_,e.toString())}addIndex(e,t){A(e!==At,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const o=t.getIterator(L.Wrap);let a=o.getNext();for(;a;)s=s||e.isDefinedOn(a.node),i.push(a),a=o.getNext();let c;s?c=Wi(i,e.getCompare()):c=Ht;const u=e.toString(),d=Object.assign({},this.indexSet_);d[u]=e;const v=Object.assign({},this.indexes_);return v[u]=c,new qe(v,d)}addToIndexes(e,t){const i=Fi(this.indexes_,(s,o)=>{const a=Kt(this.indexSet_,o);if(A(a,"Missing index implementation for "+o),s===Ht)if(a.isDefinedOn(e.node)){const c=[],u=t.getIterator(L.Wrap);let d=u.getNext();for(;d;)d.name!==e.name&&c.push(d),d=u.getNext();return c.push(e),Wi(c,a.getCompare())}else return Ht;else{const c=t.get(e.name);let u=s;return c&&(u=u.remove(new L(e.name,c))),u.insert(e,e.node)}});return new qe(i,this.indexSet_)}removeFromIndexes(e,t){const i=Fi(this.indexes_,s=>{if(s===Ht)return s;{const o=t.get(e.name);return o?s.remove(new L(e.name,o)):s}});return new qe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let An;class O{static get EMPTY_NODE(){return An||(An=new O(new _e(Jr),null,qe.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&nh(this.priorityNode_),this.children_.isEmpty()&&A(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||An}updatePriority(e){return this.children_.isEmpty()?this:new O(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?An:t}}getChild(e){const t=x(e);return t===null?this:this.getImmediateChild(t).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(A(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new L(e,t);let s,o;t.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),o=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?An:this.priorityNode_;return new O(s,a,o)}}updateChild(e,t){const i=x(e);if(i===null)return t;{A(x(e)!==".priority"||_t(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(G(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,o=!0;if(this.forEachChild(K,(a,c)=>{t[a]=c.val(e),i++,o&&O.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):o=!1}),!e&&o&&s<2*i){const a=[];for(const c in t)a[c]=t[c];return a}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+th(this.getPriority().val())+":"),this.forEachChild(K,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Pc(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const o=s.getPredecessorKey(new L(e,t));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new L(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new L(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,L.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,L.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qn?-1:0}withIndex(e){if(e===At||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new O(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===At||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(K),s=t.getIterator(K);let o=i.getNext(),a=s.getNext();for(;o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=i.getNext(),a=s.getNext()}return o===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===At?null:this.indexMap_.get(e.toString())}}O.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ig extends O{constructor(){super(new _e(Jr),O.EMPTY_NODE,qe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return O.EMPTY_NODE}isEmpty(){return!1}}const Qn=new ig;Object.defineProperties(L,{MIN:{value:new L(Nt,O.EMPTY_NODE)},MAX:{value:new L(gt,Qn)}});eh.__EMPTY_NODE=O.EMPTY_NODE;ne.__childrenNodeConstructor=O;Jp(Qn);Zp(Qn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=!0;function Z(n,e=null){if(n===null)return O.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),A(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ne(t,Z(e))}if(!(n instanceof Array)&&sg){const t=[];let i=!1;if(oe(n,(a,c)=>{if(a.substring(0,1)!=="."){const u=Z(c);u.isEmpty()||(i=i||!u.getPriority().isEmpty(),t.push(new L(a,u)))}}),t.length===0)return O.EMPTY_NODE;const o=Wi(t,Xp,a=>a.name,Jr);if(i){const a=Wi(t,K.getCompare());return new O(o,Z(e),new qe({".priority":a},{".priority":K}))}else return new O(o,Z(e),qe.Default)}else{let t=O.EMPTY_NODE;return oe(n,(i,s)=>{if(He(n,i)&&i.substring(0,1)!=="."){const o=Z(s);(o.isLeafNode()||!o.isEmpty())&&(t=t.updateImmediateChild(i,o))}}),t.updatePriority(Z(e))}}Qp(Z);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr extends us{constructor(e){super(),this.indexPath_=e,A(!M(e)&&x(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),o=i.compareTo(s);return o===0?Lt(e.name,t.name):o}makePost(e,t){const i=Z(e),s=O.EMPTY_NODE.updateChild(this.indexPath_,i);return new L(t,s)}maxPost(){const e=O.EMPTY_NODE.updateChild(this.indexPath_,Qn);return new L(gt,e)}toString(){return Wn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg extends us{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Lt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return L.MIN}maxPost(){return L.MAX}makePost(e,t){const i=Z(e);return new L(t,i)}toString(){return".value"}}const rh=new rg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(n){return{type:"value",snapshotNode:n}}function Yt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Hn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function jn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function og(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e){this.index_=e}updateChild(e,t,i,s,o,a){A(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const c=e.getImmediateChild(t);return c.getChild(s).equals(i.getChild(s))&&c.isEmpty()===i.isEmpty()||(a!=null&&(i.isEmpty()?e.hasChild(t)?a.trackChildChange(Hn(t,c)):A(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?a.trackChildChange(Yt(t,i)):a.trackChildChange(jn(t,i,c))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(K,(s,o)=>{t.hasChild(s)||i.trackChildChange(Hn(s,o))}),t.isLeafNode()||t.forEachChild(K,(s,o)=>{if(e.hasChild(s)){const a=e.getImmediateChild(s);a.equals(o)||i.trackChildChange(jn(s,o,a))}else i.trackChildChange(Yt(s,o))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?O.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.indexedFilter_=new Zr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=$n.getStartPost_(e),this.endPost_=$n.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,o,a){return this.matches(new L(t,i))||(i=O.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,o,a)}updateFullNode(e,t,i){t.isLeafNode()&&(t=O.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(O.EMPTY_NODE);const o=this;return t.forEachChild(K,(a,c)=>{o.matches(new L(a,c))||(s=s.updateImmediateChild(a,O.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new $n(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,o,a){return this.rangedFilter_.matches(new L(t,i))||(i=O.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,o,a):this.fullLimitUpdateChild_(e,t,i,o,a)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=O.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=O.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;o.hasNext()&&a<this.limit_;){const c=o.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))s=s.updateImmediateChild(c.name,c.node),a++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(O.EMPTY_NODE);let o;this.reverse_?o=s.getReverseIterator(this.index_):o=s.getIterator(this.index_);let a=0;for(;o.hasNext();){const c=o.getNext();a<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?a++:s=s.updateImmediateChild(c.name,O.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,o){let a;if(this.reverse_){const m=this.index_.getCompare();a=(I,R)=>m(R,I)}else a=this.index_.getCompare();const c=e;A(c.numChildren()===this.limit_,"");const u=new L(t,i),d=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),v=this.rangedFilter_.matches(u);if(c.hasChild(t)){const m=c.getImmediateChild(t);let I=s.getChildAfterChild(this.index_,d,this.reverse_);for(;I!=null&&(I.name===t||c.hasChild(I.name));)I=s.getChildAfterChild(this.index_,I,this.reverse_);const R=I==null?1:a(I,u);if(v&&!i.isEmpty()&&R>=0)return o?.trackChildChange(jn(t,i,m)),c.updateImmediateChild(t,i);{o?.trackChildChange(Hn(t,m));const N=c.updateImmediateChild(t,O.EMPTY_NODE);return I!=null&&this.rangedFilter_.matches(I)?(o?.trackChildChange(Yt(I.name,I.node)),N.updateImmediateChild(I.name,I.node)):N}}else return i.isEmpty()?e:v&&a(d,u)>=0?(o!=null&&(o.trackChildChange(Hn(d.name,d.node)),o.trackChildChange(Yt(t,i))),c.updateImmediateChild(t,i).updateImmediateChild(d.name,O.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return A(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return A(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Nt}hasEnd(){return this.endSet_}getIndexEndValue(){return A(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return A(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:gt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return A(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new eo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function lg(n){return n.loadsAllData()?new Zr(n.getIndex()):n.hasLimit()?new ag(n):new $n(n)}function cg(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function hg(n,e){const t=n.copy();return t.index_=e,t}function hl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===K?t="$priority":n.index_===rh?t="$value":n.index_===At?t="$key":(A(n.index_ instanceof Qr,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=ee(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=ee(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+ee(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=ee(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+ee(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function ul(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==K&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends Yc{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(A(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Jn("p:rest:"),this.listens_={}}listen(e,t,i,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const a=Hi.getListenId_(e,i),c={};this.listens_[a]=c;const u=hl(e._queryParams);this.restRequest_(o+".json",u,(d,v)=>{let m=v;if(d===404&&(m=null,d=null),d===null&&this.onDataUpdate_(o,m,!1,i),Kt(this.listens_,a)===c){let I;d?d===401?I="permission_denied":I="rest_error:"+d:I="ok",s(I,null)}})}unlisten(e,t){const i=Hi.getListenId_(e,t);delete this.listens_[i]}get(e){const t=hl(e._queryParams),i=e._path.toString(),s=new kt;return this.restRequest_(i+".json",t,(o,a)=>{let c=a;o===404&&(c=null,o=null),o===null?(this.onDataUpdate_(i,c,!1,null),s.resolve(c)):s.reject(new Error(c))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(t.auth=s.accessToken),o&&o.token&&(t.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+nn(t);this.log_("Sending REST request for "+a);const c=new XMLHttpRequest;c.onreadystatechange=()=>{if(i&&c.readyState===4){this.log_("REST Response for "+a+" received. status:",c.status,"response:",c.responseText);let u=null;if(c.status>=200&&c.status<300){try{u=Un(c.responseText)}catch{pe("Failed to parse JSON response for "+a+": "+c.responseText)}i(null,u)}else c.status!==401&&c.status!==404&&pe("Got unsuccessful REST response for "+a+" Status: "+c.status),i(c.status);i=null}},c.open("GET",a,!0),c.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(){this.rootNode_=O.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(){return{value:null,children:new Map}}function ah(n,e,t){if(M(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=x(e);n.children.has(i)||n.children.set(i,ji());const s=n.children.get(i);e=G(e),ah(s,e,t)}}function Ir(n,e,t){n.value!==null?t(e,n.value):dg(n,(i,s)=>{const o=new W(e.toString()+"/"+i);Ir(s,o,t)})}function dg(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&oe(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl=10*1e3,pg=30*1e3,gg=5*60*1e3;class _g{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new fg(e);const i=dl+(pg-dl)*Math.random();Nn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;oe(e,(s,o)=>{o>0&&He(this.statsToReport_,s)&&(t[s]=o,i=!0)}),i&&this.server_.reportStats(t),Nn(this.reportStats_.bind(this),Math.floor(Math.random()*2*gg))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ke||(ke={}));function to(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function no(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function io(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ke.ACK_USER_WRITE,this.source=to()}operationForChild(e){if(M(this.path)){if(this.affectedTree.value!=null)return A(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new W(e));return new $i(B(),t,this.revert)}}else return A(x(this.path)===e,"operationForChild called for unrelated child."),new $i(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,t){this.source=e,this.path=t,this.type=ke.LISTEN_COMPLETE}operationForChild(e){return M(this.path)?new Gn(this.source,B()):new Gn(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ke.OVERWRITE}operationForChild(e){return M(this.path)?new Ot(this.source,B(),this.snap.getImmediateChild(e)):new Ot(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ke.MERGE}operationForChild(e){if(M(this.path)){const t=this.children.subtree(new W(e));return t.isEmpty()?null:t.value?new Ot(this.source,B(),t.value):new Xt(this.source,B(),t)}else return A(x(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Xt(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(M(e))return this.isFullyInitialized()&&!this.filtered_;const t=x(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function vg(n,e,t,i){const s=[],o=[];return e.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(og(a.childName,a.snapshotNode))}),Rn(n,s,"child_removed",e,i,t),Rn(n,s,"child_added",e,i,t),Rn(n,s,"child_moved",o,i,t),Rn(n,s,"child_changed",e,i,t),Rn(n,s,"value",e,i,t),s}function Rn(n,e,t,i,s,o){const a=i.filter(c=>c.type===t);a.sort((c,u)=>Eg(n,c,u)),a.forEach(c=>{const u=yg(n,c,o);s.forEach(d=>{d.respondsTo(c.type)&&e.push(d.createEvent(u,n.query_))})})}function yg(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Eg(n,e,t){if(e.childName==null||t.childName==null)throw en("Should only compare child_ events.");const i=new L(e.childName,e.snapshotNode),s=new L(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(n,e){return{eventCache:n,serverCache:e}}function On(n,e,t,i){return ds(new mt(e,t,i),n.serverCache)}function lh(n,e,t,i){return ds(n.eventCache,new mt(e,t,i))}function Gi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Dt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let or;const wg=()=>(or||(or=new _e(rp)),or);class ${static fromObject(e){let t=new $(null);return oe(e,(i,s)=>{t=t.set(new W(i),s)}),t}constructor(e,t=wg()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:B(),value:this.value};if(M(e))return null;{const i=x(e),s=this.children.get(i);if(s!==null){const o=s.findRootMostMatchingPathAndValue(G(e),t);return o!=null?{path:Y(new W(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(M(e))return this;{const t=x(e),i=this.children.get(t);return i!==null?i.subtree(G(e)):new $(null)}}set(e,t){if(M(e))return new $(t,this.children);{const i=x(e),o=(this.children.get(i)||new $(null)).set(G(e),t),a=this.children.insert(i,o);return new $(this.value,a)}}remove(e){if(M(e))return this.children.isEmpty()?new $(null):new $(null,this.children);{const t=x(e),i=this.children.get(t);if(i){const s=i.remove(G(e));let o;return s.isEmpty()?o=this.children.remove(t):o=this.children.insert(t,s),this.value===null&&o.isEmpty()?new $(null):new $(this.value,o)}else return this}}get(e){if(M(e))return this.value;{const t=x(e),i=this.children.get(t);return i?i.get(G(e)):null}}setTree(e,t){if(M(e))return t;{const i=x(e),o=(this.children.get(i)||new $(null)).setTree(G(e),t);let a;return o.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,o),new $(this.value,a)}}fold(e){return this.fold_(B(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,o)=>{i[s]=o.fold_(Y(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,B(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(M(e))return null;{const o=x(e),a=this.children.get(o);return a?a.findOnPath_(G(e),Y(t,o),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,B(),t)}foreachOnPath_(e,t,i){if(M(e))return this;{this.value&&i(t,this.value);const s=x(e),o=this.children.get(s);return o?o.foreachOnPath_(G(e),Y(t,s),i):new $(null)}}foreach(e){this.foreach_(B(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(Y(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.writeTree_=e}static empty(){return new De(new $(null))}}function Dn(n,e,t){if(M(e))return new De(new $(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let o=i.value;const a=fe(s,e);return o=o.updateChild(a,t),new De(n.writeTree_.set(s,o))}else{const s=new $(t),o=n.writeTree_.setTree(e,s);return new De(o)}}}function Tr(n,e,t){let i=n;return oe(t,(s,o)=>{i=Dn(i,Y(e,s),o)}),i}function fl(n,e){if(M(e))return De.empty();{const t=n.writeTree_.setTree(e,new $(null));return new De(t)}}function Cr(n,e){return xt(n,e)!=null}function xt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(fe(t.path,e)):null}function pl(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(K,(i,s)=>{e.push(new L(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new L(i,s.value))}),e}function ft(n,e){if(M(e))return n;{const t=xt(n,e);return t!=null?new De(new $(t)):new De(n.writeTree_.subtree(e))}}function Sr(n){return n.writeTree_.isEmpty()}function Jt(n,e){return ch(B(),n.writeTree_,e)}function ch(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?(A(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):t=ch(Y(n,s),o,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(Y(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(n,e){return fh(e,n)}function Ig(n,e,t,i,s){A(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Dn(n.visibleWrites,e,t)),n.lastWriteId=i}function Tg(n,e,t,i){A(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Tr(n.visibleWrites,e,t),n.lastWriteId=i}function Cg(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Sg(n,e){const t=n.allWrites.findIndex(c=>c.writeId===e);A(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,o=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const c=n.allWrites[a];c.visible&&(a>=t&&bg(c,i.path)?s=!1:Te(i.path,c.path)&&(o=!0)),a--}if(s){if(o)return Ag(n),!0;if(i.snap)n.visibleWrites=fl(n.visibleWrites,i.path);else{const c=i.children;oe(c,u=>{n.visibleWrites=fl(n.visibleWrites,Y(i.path,u))})}return!0}else return!1}function bg(n,e){if(n.snap)return Te(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Te(Y(n.path,t),e))return!0;return!1}function Ag(n){n.visibleWrites=hh(n.allWrites,Rg,B()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Rg(n){return n.visible}function hh(n,e,t){let i=De.empty();for(let s=0;s<n.length;++s){const o=n[s];if(e(o)){const a=o.path;let c;if(o.snap)Te(t,a)?(c=fe(t,a),i=Dn(i,c,o.snap)):Te(a,t)&&(c=fe(a,t),i=Dn(i,B(),o.snap.getChild(c)));else if(o.children){if(Te(t,a))c=fe(t,a),i=Tr(i,c,o.children);else if(Te(a,t))if(c=fe(a,t),M(c))i=Tr(i,B(),o.children);else{const u=Kt(o.children,x(c));if(u){const d=u.getChild(G(c));i=Dn(i,B(),d)}}}else throw en("WriteRecord should have .snap or .children")}}return i}function uh(n,e,t,i,s){if(!i&&!s){const o=xt(n.visibleWrites,e);if(o!=null)return o;{const a=ft(n.visibleWrites,e);if(Sr(a))return t;if(t==null&&!Cr(a,B()))return null;{const c=t||O.EMPTY_NODE;return Jt(a,c)}}}else{const o=ft(n.visibleWrites,e);if(!s&&Sr(o))return t;if(!s&&t==null&&!Cr(o,B()))return null;{const a=function(d){return(d.visible||s)&&(!i||!~i.indexOf(d.writeId))&&(Te(d.path,e)||Te(e,d.path))},c=hh(n.allWrites,a,e),u=t||O.EMPTY_NODE;return Jt(c,u)}}}function kg(n,e,t){let i=O.EMPTY_NODE;const s=xt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(K,(o,a)=>{i=i.updateImmediateChild(o,a)}),i;if(t){const o=ft(n.visibleWrites,e);return t.forEachChild(K,(a,c)=>{const u=Jt(ft(o,new W(a)),c);i=i.updateImmediateChild(a,u)}),pl(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const o=ft(n.visibleWrites,e);return pl(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function Pg(n,e,t,i,s){A(i||s,"Either existingEventSnap or existingServerSnap must exist");const o=Y(e,t);if(Cr(n.visibleWrites,o))return null;{const a=ft(n.visibleWrites,o);return Sr(a)?s.getChild(t):Jt(a,s.getChild(t))}}function Ng(n,e,t,i){const s=Y(e,t),o=xt(n.visibleWrites,s);if(o!=null)return o;if(i.isCompleteForChild(t)){const a=ft(n.visibleWrites,s);return Jt(a,i.getNode().getImmediateChild(t))}else return null}function Og(n,e){return xt(n.visibleWrites,e)}function Dg(n,e,t,i,s,o,a){let c;const u=ft(n.visibleWrites,e),d=xt(u,B());if(d!=null)c=d;else if(t!=null)c=Jt(u,t);else return[];if(c=c.withIndex(a),!c.isEmpty()&&!c.isLeafNode()){const v=[],m=a.getCompare(),I=o?c.getReverseIteratorFrom(i,a):c.getIteratorFrom(i,a);let R=I.getNext();for(;R&&v.length<s;)m(R,i)!==0&&v.push(R),R=I.getNext();return v}else return[]}function Mg(){return{visibleWrites:De.empty(),allWrites:[],lastWriteId:-1}}function zi(n,e,t,i){return uh(n.writeTree,n.treePath,e,t,i)}function so(n,e){return kg(n.writeTree,n.treePath,e)}function gl(n,e,t,i){return Pg(n.writeTree,n.treePath,e,t,i)}function qi(n,e){return Og(n.writeTree,Y(n.treePath,e))}function Lg(n,e,t,i,s,o){return Dg(n.writeTree,n.treePath,e,t,i,s,o)}function ro(n,e,t){return Ng(n.writeTree,n.treePath,e,t)}function dh(n,e){return fh(Y(n.treePath,e),n.writeTree)}function fh(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;A(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),A(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const o=s.type;if(t==="child_added"&&o==="child_removed")this.changeMap.set(i,jn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&o==="child_changed")this.changeMap.set(i,Hn(i,s.oldSnap));else if(t==="child_changed"&&o==="child_added")this.changeMap.set(i,Yt(i,e.snapshotNode));else if(t==="child_changed"&&o==="child_changed")this.changeMap.set(i,jn(i,e.snapshotNode,s.oldSnap));else throw en("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const ph=new Fg;class oo{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new mt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ro(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Dt(this.viewCache_),o=Lg(this.writes_,s,t,1,i,e);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(n){return{filter:n}}function Bg(n,e){A(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),A(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Vg(n,e,t,i,s){const o=new xg;let a,c;if(t.type===ke.OVERWRITE){const d=t;d.source.fromUser?a=br(n,e,d.path,d.snap,i,s,o):(A(d.source.fromServer,"Unknown source."),c=d.source.tagged||e.serverCache.isFiltered()&&!M(d.path),a=Ki(n,e,d.path,d.snap,i,s,c,o))}else if(t.type===ke.MERGE){const d=t;d.source.fromUser?a=Hg(n,e,d.path,d.children,i,s,o):(A(d.source.fromServer,"Unknown source."),c=d.source.tagged||e.serverCache.isFiltered(),a=Ar(n,e,d.path,d.children,i,s,c,o))}else if(t.type===ke.ACK_USER_WRITE){const d=t;d.revert?a=Gg(n,e,d.path,i,s,o):a=jg(n,e,d.path,d.affectedTree,i,s,o)}else if(t.type===ke.LISTEN_COMPLETE)a=$g(n,e,t.path,i,o);else throw en("Unknown operation type: "+t.type);const u=o.getChanges();return Wg(e,a,u),{viewCache:a,changes:u}}function Wg(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=Gi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&t.push(oh(Gi(e)))}}function gh(n,e,t,i,s,o){const a=e.eventCache;if(qi(i,t)!=null)return e;{let c,u;if(M(t))if(A(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const d=Dt(e),v=d instanceof O?d:O.EMPTY_NODE,m=so(i,v);c=n.filter.updateFullNode(e.eventCache.getNode(),m,o)}else{const d=zi(i,Dt(e));c=n.filter.updateFullNode(e.eventCache.getNode(),d,o)}else{const d=x(t);if(d===".priority"){A(_t(t)===1,"Can't have a priority with additional path components");const v=a.getNode();u=e.serverCache.getNode();const m=gl(i,t,v,u);m!=null?c=n.filter.updatePriority(v,m):c=a.getNode()}else{const v=G(t);let m;if(a.isCompleteForChild(d)){u=e.serverCache.getNode();const I=gl(i,t,a.getNode(),u);I!=null?m=a.getNode().getImmediateChild(d).updateChild(v,I):m=a.getNode().getImmediateChild(d)}else m=ro(i,d,e.serverCache);m!=null?c=n.filter.updateChild(a.getNode(),d,m,v,s,o):c=a.getNode()}}return On(e,c,a.isFullyInitialized()||M(t),n.filter.filtersNodes())}}function Ki(n,e,t,i,s,o,a,c){const u=e.serverCache;let d;const v=a?n.filter:n.filter.getIndexedFilter();if(M(t))d=v.updateFullNode(u.getNode(),i,null);else if(v.filtersNodes()&&!u.isFiltered()){const R=u.getNode().updateChild(t,i);d=v.updateFullNode(u.getNode(),R,null)}else{const R=x(t);if(!u.isCompleteForPath(t)&&_t(t)>1)return e;const b=G(t),P=u.getNode().getImmediateChild(R).updateChild(b,i);R===".priority"?d=v.updatePriority(u.getNode(),P):d=v.updateChild(u.getNode(),R,P,b,ph,null)}const m=lh(e,d,u.isFullyInitialized()||M(t),v.filtersNodes()),I=new oo(s,m,o);return gh(n,m,t,s,I,c)}function br(n,e,t,i,s,o,a){const c=e.eventCache;let u,d;const v=new oo(s,e,o);if(M(t))d=n.filter.updateFullNode(e.eventCache.getNode(),i,a),u=On(e,d,!0,n.filter.filtersNodes());else{const m=x(t);if(m===".priority")d=n.filter.updatePriority(e.eventCache.getNode(),i),u=On(e,d,c.isFullyInitialized(),c.isFiltered());else{const I=G(t),R=c.getNode().getImmediateChild(m);let b;if(M(I))b=i;else{const N=v.getCompleteChild(m);N!=null?Yr(I)===".priority"&&N.getChild(Jc(I)).isEmpty()?b=N:b=N.updateChild(I,i):b=O.EMPTY_NODE}if(R.equals(b))u=e;else{const N=n.filter.updateChild(c.getNode(),m,b,I,v,a);u=On(e,N,c.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function _l(n,e){return n.eventCache.isCompleteForChild(e)}function Hg(n,e,t,i,s,o,a){let c=e;return i.foreach((u,d)=>{const v=Y(t,u);_l(e,x(v))&&(c=br(n,c,v,d,s,o,a))}),i.foreach((u,d)=>{const v=Y(t,u);_l(e,x(v))||(c=br(n,c,v,d,s,o,a))}),c}function ml(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ar(n,e,t,i,s,o,a,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,d;M(t)?d=i:d=new $(null).setTree(t,i);const v=e.serverCache.getNode();return d.children.inorderTraversal((m,I)=>{if(v.hasChild(m)){const R=e.serverCache.getNode().getImmediateChild(m),b=ml(n,R,I);u=Ki(n,u,new W(m),b,s,o,a,c)}}),d.children.inorderTraversal((m,I)=>{const R=!e.serverCache.isCompleteForChild(m)&&I.value===null;if(!v.hasChild(m)&&!R){const b=e.serverCache.getNode().getImmediateChild(m),N=ml(n,b,I);u=Ki(n,u,new W(m),N,s,o,a,c)}}),u}function jg(n,e,t,i,s,o,a){if(qi(s,t)!=null)return e;const c=e.serverCache.isFiltered(),u=e.serverCache;if(i.value!=null){if(M(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return Ki(n,e,t,u.getNode().getChild(t),s,o,c,a);if(M(t)){let d=new $(null);return u.getNode().forEachChild(At,(v,m)=>{d=d.set(new W(v),m)}),Ar(n,e,t,d,s,o,c,a)}else return e}else{let d=new $(null);return i.foreach((v,m)=>{const I=Y(t,v);u.isCompleteForPath(I)&&(d=d.set(v,u.getNode().getChild(I)))}),Ar(n,e,t,d,s,o,c,a)}}function $g(n,e,t,i,s){const o=e.serverCache,a=lh(e,o.getNode(),o.isFullyInitialized()||M(t),o.isFiltered());return gh(n,a,t,i,ph,s)}function Gg(n,e,t,i,s,o){let a;if(qi(i,t)!=null)return e;{const c=new oo(i,e,s),u=e.eventCache.getNode();let d;if(M(t)||x(t)===".priority"){let v;if(e.serverCache.isFullyInitialized())v=zi(i,Dt(e));else{const m=e.serverCache.getNode();A(m instanceof O,"serverChildren would be complete if leaf node"),v=so(i,m)}v=v,d=n.filter.updateFullNode(u,v,o)}else{const v=x(t);let m=ro(i,v,e.serverCache);m==null&&e.serverCache.isCompleteForChild(v)&&(m=u.getImmediateChild(v)),m!=null?d=n.filter.updateChild(u,v,m,G(t),c,o):e.eventCache.getNode().hasChild(v)?d=n.filter.updateChild(u,v,O.EMPTY_NODE,G(t),c,o):d=u,d.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=zi(i,Dt(e)),a.isLeafNode()&&(d=n.filter.updateFullNode(d,a,o)))}return a=e.serverCache.isFullyInitialized()||qi(i,B())!=null,On(e,d,a,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Zr(i.getIndex()),o=lg(i);this.processor_=Ug(o);const a=t.serverCache,c=t.eventCache,u=s.updateFullNode(O.EMPTY_NODE,a.getNode(),null),d=o.updateFullNode(O.EMPTY_NODE,c.getNode(),null),v=new mt(u,a.isFullyInitialized(),s.filtersNodes()),m=new mt(d,c.isFullyInitialized(),o.filtersNodes());this.viewCache_=ds(m,v),this.eventGenerator_=new mg(this.query_)}get query(){return this.query_}}function qg(n){return n.viewCache_.serverCache.getNode()}function Kg(n){return Gi(n.viewCache_)}function Yg(n,e){const t=Dt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!M(e)&&!t.getImmediateChild(x(e)).isEmpty())?t.getChild(e):null}function vl(n){return n.eventRegistrations_.length===0}function Xg(n,e){n.eventRegistrations_.push(e)}function yl(n,e,t){const i=[];if(t){A(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(o=>{const a=o.createCancelEvent(t,s);a&&i.push(a)})}if(e){let s=[];for(let o=0;o<n.eventRegistrations_.length;++o){const a=n.eventRegistrations_[o];if(!a.matches(e))s.push(a);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(o+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function El(n,e,t,i){e.type===ke.MERGE&&e.source.queryId!==null&&(A(Dt(n.viewCache_),"We should always have a full cache before handling merges"),A(Gi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,o=Vg(n.processor_,s,e,t,i);return Bg(n.processor_,o.viewCache),A(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=o.viewCache,_h(n,o.changes,o.viewCache.eventCache.getNode(),null)}function Jg(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(K,(o,a)=>{i.push(Yt(o,a))}),t.isFullyInitialized()&&i.push(oh(t.getNode())),_h(n,i,t.getNode(),e)}function _h(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return vg(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yi;class mh{constructor(){this.views=new Map}}function Qg(n){A(!Yi,"__referenceConstructor has already been defined"),Yi=n}function Zg(){return A(Yi,"Reference.ts has not been loaded"),Yi}function e_(n){return n.views.size===0}function ao(n,e,t,i){const s=e.source.queryId;if(s!==null){const o=n.views.get(s);return A(o!=null,"SyncTree gave us an op for an invalid query."),El(o,e,t,i)}else{let o=[];for(const a of n.views.values())o=o.concat(El(a,e,t,i));return o}}function vh(n,e,t,i,s){const o=e._queryIdentifier,a=n.views.get(o);if(!a){let c=zi(t,s?i:null),u=!1;c?u=!0:i instanceof O?(c=so(t,i),u=!1):(c=O.EMPTY_NODE,u=!1);const d=ds(new mt(c,u,!1),new mt(i,s,!1));return new zg(e,d)}return a}function t_(n,e,t,i,s,o){const a=vh(n,e,i,s,o);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,a),Xg(a,t),Jg(a,t)}function n_(n,e,t,i){const s=e._queryIdentifier,o=[];let a=[];const c=vt(n);if(s==="default")for(const[u,d]of n.views.entries())a=a.concat(yl(d,t,i)),vl(d)&&(n.views.delete(u),d.query._queryParams.loadsAllData()||o.push(d.query));else{const u=n.views.get(s);u&&(a=a.concat(yl(u,t,i)),vl(u)&&(n.views.delete(s),u.query._queryParams.loadsAllData()||o.push(u.query)))}return c&&!vt(n)&&o.push(new(Zg())(e._repo,e._path)),{removed:o,events:a}}function yh(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function pt(n,e){let t=null;for(const i of n.views.values())t=t||Yg(i,e);return t}function Eh(n,e){if(e._queryParams.loadsAllData())return ps(n);{const i=e._queryIdentifier;return n.views.get(i)}}function wh(n,e){return Eh(n,e)!=null}function vt(n){return ps(n)!=null}function ps(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xi;function i_(n){A(!Xi,"__referenceConstructor has already been defined"),Xi=n}function s_(){return A(Xi,"Reference.ts has not been loaded"),Xi}let r_=1;class wl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new $(null),this.pendingWriteTree_=Mg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ih(n,e,t,i,s){return Ig(n.pendingWriteTree_,e,t,i,s),s?rn(n,new Ot(to(),e,t)):[]}function o_(n,e,t,i){Tg(n.pendingWriteTree_,e,t,i);const s=$.fromObject(t);return rn(n,new Xt(to(),e,s))}function ht(n,e,t=!1){const i=Cg(n.pendingWriteTree_,e);if(Sg(n.pendingWriteTree_,e)){let o=new $(null);return i.snap!=null?o=o.set(B(),!0):oe(i.children,a=>{o=o.set(new W(a),!0)}),rn(n,new $i(i.path,o,t))}else return[]}function Zn(n,e,t){return rn(n,new Ot(no(),e,t))}function a_(n,e,t){const i=$.fromObject(t);return rn(n,new Xt(no(),e,i))}function l_(n,e){return rn(n,new Gn(no(),e))}function c_(n,e,t){const i=co(n,t);if(i){const s=ho(i),o=s.path,a=s.queryId,c=fe(o,e),u=new Gn(io(a),c);return uo(n,o,u)}else return[]}function Th(n,e,t,i,s=!1){const o=e._path,a=n.syncPointTree_.get(o);let c=[];if(a&&(e._queryIdentifier==="default"||wh(a,e))){const u=n_(a,e,t,i);e_(a)&&(n.syncPointTree_=n.syncPointTree_.remove(o));const d=u.removed;if(c=u.events,!s){const v=d.findIndex(I=>I._queryParams.loadsAllData())!==-1,m=n.syncPointTree_.findOnPath(o,(I,R)=>vt(R));if(v&&!m){const I=n.syncPointTree_.subtree(o);if(!I.isEmpty()){const R=f_(I);for(let b=0;b<R.length;++b){const N=R[b],P=N.query,X=Ah(n,N);n.listenProvider_.startListening(Mn(P),zn(n,P),X.hashFn,X.onComplete)}}}!m&&d.length>0&&!i&&(v?n.listenProvider_.stopListening(Mn(e),null):d.forEach(I=>{const R=n.queryToTagMap.get(gs(I));n.listenProvider_.stopListening(Mn(I),R)}))}p_(n,d)}return c}function Ch(n,e,t,i){const s=co(n,i);if(s!=null){const o=ho(s),a=o.path,c=o.queryId,u=fe(a,e),d=new Ot(io(c),u,t);return uo(n,a,d)}else return[]}function h_(n,e,t,i){const s=co(n,i);if(s){const o=ho(s),a=o.path,c=o.queryId,u=fe(a,e),d=$.fromObject(t),v=new Xt(io(c),u,d);return uo(n,a,v)}else return[]}function u_(n,e,t,i=!1){const s=e._path;let o=null,a=!1;n.syncPointTree_.foreachOnPath(s,(I,R)=>{const b=fe(I,s);o=o||pt(R,b),a=a||vt(R)});let c=n.syncPointTree_.get(s);c?(a=a||vt(c),o=o||pt(c,B())):(c=new mh,n.syncPointTree_=n.syncPointTree_.set(s,c));let u;o!=null?u=!0:(u=!1,o=O.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((R,b)=>{const N=pt(b,B());N&&(o=o.updateImmediateChild(R,N))}));const d=wh(c,e);if(!d&&!e._queryParams.loadsAllData()){const I=gs(e);A(!n.queryToTagMap.has(I),"View does not exist, but we have a tag");const R=g_();n.queryToTagMap.set(I,R),n.tagToQueryMap.set(R,I)}const v=fs(n.pendingWriteTree_,s);let m=t_(c,e,t,v,o,u);if(!d&&!a&&!i){const I=Eh(c,e);m=m.concat(__(n,e,I))}return m}function lo(n,e,t){const s=n.pendingWriteTree_,o=n.syncPointTree_.findOnPath(e,(a,c)=>{const u=fe(a,e),d=pt(c,u);if(d)return d});return uh(s,e,o,t,!0)}function d_(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(d,v)=>{const m=fe(d,t);i=i||pt(v,m)});let s=n.syncPointTree_.get(t);s?i=i||pt(s,B()):(s=new mh,n.syncPointTree_=n.syncPointTree_.set(t,s));const o=i!=null,a=o?new mt(i,!0,!1):null,c=fs(n.pendingWriteTree_,e._path),u=vh(s,e,c,o?a.getNode():O.EMPTY_NODE,o);return Kg(u)}function rn(n,e){return Sh(e,n.syncPointTree_,null,fs(n.pendingWriteTree_,B()))}function Sh(n,e,t,i){if(M(n.path))return bh(n,e,t,i);{const s=e.get(B());t==null&&s!=null&&(t=pt(s,B()));let o=[];const a=x(n.path),c=n.operationForChild(a),u=e.children.get(a);if(u&&c){const d=t?t.getImmediateChild(a):null,v=dh(i,a);o=o.concat(Sh(c,u,d,v))}return s&&(o=o.concat(ao(s,n,i,t))),o}}function bh(n,e,t,i){const s=e.get(B());t==null&&s!=null&&(t=pt(s,B()));let o=[];return e.children.inorderTraversal((a,c)=>{const u=t?t.getImmediateChild(a):null,d=dh(i,a),v=n.operationForChild(a);v&&(o=o.concat(bh(v,c,u,d)))}),s&&(o=o.concat(ao(s,n,i,t))),o}function Ah(n,e){const t=e.query,i=zn(n,t);return{hashFn:()=>(qg(e)||O.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?c_(n,t._path,i):l_(n,t._path);{const o=lp(s,t);return Th(n,t,null,o)}}}}function zn(n,e){const t=gs(e);return n.queryToTagMap.get(t)}function gs(n){return n._path.toString()+"$"+n._queryIdentifier}function co(n,e){return n.tagToQueryMap.get(e)}function ho(n){const e=n.indexOf("$");return A(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new W(n.substr(0,e))}}function uo(n,e,t){const i=n.syncPointTree_.get(e);A(i,"Missing sync point for query tag that we're tracking");const s=fs(n.pendingWriteTree_,e);return ao(i,t,s,null)}function f_(n){return n.fold((e,t,i)=>{if(t&&vt(t))return[ps(t)];{let s=[];return t&&(s=yh(t)),oe(i,(o,a)=>{s=s.concat(a)}),s}})}function Mn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(s_())(n._repo,n._path):n}function p_(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=gs(i),o=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(o)}}}function g_(){return r_++}function __(n,e,t){const i=e._path,s=zn(n,e),o=Ah(n,t),a=n.listenProvider_.startListening(Mn(e),s,o.hashFn,o.onComplete),c=n.syncPointTree_.subtree(i);if(s)A(!vt(c.value),"If we're adding a query, it shouldn't be shadowed");else{const u=c.fold((d,v,m)=>{if(!M(d)&&v&&vt(v))return[ps(v).query];{let I=[];return v&&(I=I.concat(yh(v).map(R=>R.query))),oe(m,(R,b)=>{I=I.concat(b)}),I}});for(let d=0;d<u.length;++d){const v=u[d];n.listenProvider_.stopListening(Mn(v),zn(n,v))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new fo(t)}node(){return this.node_}}class po{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Y(this.path_,e);return new po(this.syncTree_,t)}node(){return lo(this.syncTree_,this.path_)}}const m_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Il=function(n,e,t){if(!n||typeof n!="object")return n;if(A(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return v_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return y_(n[".sv"],e);A(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},v_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:A(!1,"Unexpected server value: "+n)}},y_=function(n,e,t){n.hasOwnProperty("increment")||A(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&A(!1,"Unexpected increment value: "+i);const s=e.node();if(A(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},Rh=function(n,e,t,i){return go(e,new po(t,n),i)},kh=function(n,e,t){return go(n,new fo(e),t)};function go(n,e,t){const i=n.getPriority().val(),s=Il(i,e.getImmediateChild(".priority"),t);let o;if(n.isLeafNode()){const a=n,c=Il(a.getValue(),e,t);return c!==a.getValue()||s!==a.getPriority().val()?new ne(c,Z(s)):n}else{const a=n;return o=a,s!==a.getPriority().val()&&(o=o.updatePriority(new ne(s))),a.forEachChild(K,(c,u)=>{const d=go(u,e.getImmediateChild(c),t);d!==u&&(o=o.updateImmediateChild(c,d))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function mo(n,e){let t=e instanceof W?e:new W(e),i=n,s=x(t);for(;s!==null;){const o=Kt(i.node.children,s)||{children:{},childCount:0};i=new _o(s,i,o),t=G(t),s=x(t)}return i}function on(n){return n.node.value}function Ph(n,e){n.node.value=e,Rr(n)}function Nh(n){return n.node.childCount>0}function E_(n){return on(n)===void 0&&!Nh(n)}function _s(n,e){oe(n.node.children,(t,i)=>{e(new _o(t,n,i))})}function Oh(n,e,t,i){t&&e(n),_s(n,s=>{Oh(s,e,!0)})}function w_(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ei(n){return new W(n.parent===null?n.name:ei(n.parent)+"/"+n.name)}function Rr(n){n.parent!==null&&I_(n.parent,n.name,n)}function I_(n,e,t){const i=E_(t),s=He(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Rr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Rr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_=/[\[\].#$\/\u0000-\u001F\u007F]/,C_=/[\[\].#$\u0000-\u001F\u007F]/,ar=10*1024*1024,vo=function(n){return typeof n=="string"&&n.length!==0&&!T_.test(n)},Dh=function(n){return typeof n=="string"&&n.length!==0&&!C_.test(n)},S_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Dh(n)},kr=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!$r(n)||n&&typeof n=="object"&&He(n,".sv")},b_=function(n,e,t,i){ms(cs(n,"value"),e,t)},ms=function(n,e,t){const i=t instanceof W?new Hp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ct(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ct(i)+" with contents = "+e.toString());if($r(e))throw new Error(n+"contains "+e.toString()+" "+Ct(i));if(typeof e=="string"&&e.length>ar/3&&hs(e)>ar)throw new Error(n+"contains a string greater than "+ar+" utf8 bytes "+Ct(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(oe(e,(a,c)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!vo(a)))throw new Error(n+" contains an invalid key ("+a+") "+Ct(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);jp(i,a),ms(n,c,i),$p(i)}),s&&o)throw new Error(n+' contains ".value" child '+Ct(i)+" in addition to actual children.")}},A_=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const o=Wn(i);for(let a=0;a<o.length;a++)if(!(o[a]===".priority"&&a===o.length-1)){if(!vo(o[a]))throw new Error(n+"contains an invalid key ("+o[a]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Wp);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Te(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},R_=function(n,e,t,i){const s=cs(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const o=[];oe(e,(a,c)=>{const u=new W(a);if(ms(s,c,Y(t,u)),Yr(u)===".priority"&&!kr(c))throw new Error(s+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(u)}),A_(s,o)},yo=function(n,e,t,i){if(!Dh(t))throw new Error(cs(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},k_=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),yo(n,e,t)},P_=function(n,e){if(x(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},N_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!vo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!S_(t))throw new Error(cs(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Eo(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],o=s.getPath();t!==null&&!Qc(o,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:o}),t.events.push(s)}t&&n.eventLists_.push(t)}function Ce(n,e,t){Eo(n,t),D_(n,i=>Te(i,e)||Te(e,i))}function D_(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const o=s.path;e(o)?(M_(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function M_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Pn&&re("event: "+t.toString()),sn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L_="repo_interrupt",x_=25;class F_{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new O_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ji(),this.transactionQueueTree_=new _o,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function U_(n,e,t){if(n.stats_=qr(n.repoInfo_),n.forceRestClient_||dp())n.server_=new Hi(n.repoInfo_,(i,s,o,a)=>{Tl(n,i,s,o,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Cl(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ee(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Xe(n.repoInfo_,e,(i,s,o,a)=>{Tl(n,i,s,o,a)},i=>{Cl(n,i)},i=>{V_(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=mp(n.repoInfo_,()=>new _g(n.stats_,n.server_)),n.infoData_=new ug,n.infoSyncTree_=new wl({startListening:(i,s,o,a)=>{let c=[];const u=n.infoData_.getNode(i._path);return u.isEmpty()||(c=Zn(n.infoSyncTree_,i._path,u),setTimeout(()=>{a("ok")},0)),c},stopListening:()=>{}}),wo(n,"connected",!1),n.serverSyncTree_=new wl({startListening:(i,s,o,a)=>(n.server_.listen(i,o,s,(c,u)=>{const d=a(c,u);Ce(n.eventQueue_,i._path,d)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function B_(n){const t=n.infoData_.getNode(new W(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function vs(n){return m_({timestamp:B_(n)})}function Tl(n,e,t,i,s){n.dataUpdateCount++;const o=new W(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let a=[];if(s)if(i){const u=Fi(t,d=>Z(d));a=h_(n.serverSyncTree_,o,u,s)}else{const u=Z(t);a=Ch(n.serverSyncTree_,o,u,s)}else if(i){const u=Fi(t,d=>Z(d));a=a_(n.serverSyncTree_,o,u)}else{const u=Z(t);a=Zn(n.serverSyncTree_,o,u)}let c=o;a.length>0&&(c=Qt(n,o)),Ce(n.eventQueue_,c,a)}function Cl(n,e){wo(n,"connected",e),e===!1&&$_(n)}function V_(n,e){oe(e,(t,i)=>{wo(n,t,i)})}function wo(n,e,t){const i=new W("/.info/"+e),s=Z(t);n.infoData_.updateSnapshot(i,s);const o=Zn(n.infoSyncTree_,i,s);Ce(n.eventQueue_,i,o)}function Io(n){return n.nextWriteId_++}function W_(n,e,t){const i=d_(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const o=Z(s).withIndex(e._queryParams.getIndex());u_(n.serverSyncTree_,e,t,!0);let a;if(e._queryParams.loadsAllData())a=Zn(n.serverSyncTree_,e._path,o);else{const c=zn(n.serverSyncTree_,e);a=Ch(n.serverSyncTree_,e._path,o,c)}return Ce(n.eventQueue_,e._path,a),Th(n.serverSyncTree_,e,t,null,!0),o},s=>(ti(n,"get for query "+ee(e)+" failed: "+s),Promise.reject(new Error(s))))}function H_(n,e,t,i,s){ti(n,"set",{path:e.toString(),value:t,priority:i});const o=vs(n),a=Z(t,i),c=lo(n.serverSyncTree_,e),u=kh(a,c,o),d=Io(n),v=Ih(n.serverSyncTree_,e,u,d,!0);Eo(n.eventQueue_,v),n.server_.put(e.toString(),a.val(!0),(I,R)=>{const b=I==="ok";b||pe("set at "+e+" failed: "+I);const N=ht(n.serverSyncTree_,d,!b);Ce(n.eventQueue_,e,N),Pr(n,s,I,R)});const m=Co(n,e);Qt(n,m),Ce(n.eventQueue_,m,[])}function j_(n,e,t,i){ti(n,"update",{path:e.toString(),value:t});let s=!0;const o=vs(n),a={};if(oe(t,(c,u)=>{s=!1,a[c]=Rh(Y(e,c),Z(u),n.serverSyncTree_,o)}),s)re("update() called with empty data.  Don't do anything."),Pr(n,i,"ok",void 0);else{const c=Io(n),u=o_(n.serverSyncTree_,e,a,c);Eo(n.eventQueue_,u),n.server_.merge(e.toString(),t,(d,v)=>{const m=d==="ok";m||pe("update at "+e+" failed: "+d);const I=ht(n.serverSyncTree_,c,!m),R=I.length>0?Qt(n,e):e;Ce(n.eventQueue_,R,I),Pr(n,i,d,v)}),oe(t,d=>{const v=Co(n,Y(e,d));Qt(n,v)}),Ce(n.eventQueue_,e,[])}}function $_(n){ti(n,"onDisconnectEvents");const e=vs(n),t=ji();Ir(n.onDisconnect_,B(),(s,o)=>{const a=Rh(s,o,n.serverSyncTree_,e);ah(t,s,a)});let i=[];Ir(t,B(),(s,o)=>{i=i.concat(Zn(n.serverSyncTree_,s,o));const a=Co(n,s);Qt(n,a)}),n.onDisconnect_=ji(),Ce(n.eventQueue_,B(),i)}function G_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(L_)}function ti(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),re(t,...e)}function Pr(n,e,t,i){e&&sn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let o=s;i&&(o+=": "+i);const a=new Error(o);a.code=s,e(a)}})}function Mh(n,e,t){return lo(n.serverSyncTree_,e,t)||O.EMPTY_NODE}function To(n,e=n.transactionQueueTree_){if(e||ys(n,e),on(e)){const t=xh(n,e);A(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&z_(n,ei(e),t)}else Nh(e)&&_s(e,t=>{To(n,t)})}function z_(n,e,t){const i=t.map(d=>d.currentWriteId),s=Mh(n,e,i);let o=s;const a=s.hash();for(let d=0;d<t.length;d++){const v=t[d];A(v.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),v.status=1,v.retryCount++;const m=fe(e,v.path);o=o.updateChild(m,v.currentOutputSnapshotRaw)}const c=o.val(!0),u=e;n.server_.put(u.toString(),c,d=>{ti(n,"transaction put response",{path:u.toString(),status:d});let v=[];if(d==="ok"){const m=[];for(let I=0;I<t.length;I++)t[I].status=2,v=v.concat(ht(n.serverSyncTree_,t[I].currentWriteId)),t[I].onComplete&&m.push(()=>t[I].onComplete(null,!0,t[I].currentOutputSnapshotResolved)),t[I].unwatcher();ys(n,mo(n.transactionQueueTree_,e)),To(n,n.transactionQueueTree_),Ce(n.eventQueue_,e,v);for(let I=0;I<m.length;I++)sn(m[I])}else{if(d==="datastale")for(let m=0;m<t.length;m++)t[m].status===3?t[m].status=4:t[m].status=0;else{pe("transaction at "+u.toString()+" failed: "+d);for(let m=0;m<t.length;m++)t[m].status=4,t[m].abortReason=d}Qt(n,e)}},a)}function Qt(n,e){const t=Lh(n,e),i=ei(t),s=xh(n,t);return q_(n,s,i),i}function q_(n,e,t){if(e.length===0)return;const i=[];let s=[];const a=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){const u=e[c],d=fe(t,u.path);let v=!1,m;if(A(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)v=!0,m=u.abortReason,s=s.concat(ht(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=x_)v=!0,m="maxretry",s=s.concat(ht(n.serverSyncTree_,u.currentWriteId,!0));else{const I=Mh(n,u.path,a);u.currentInputSnapshot=I;const R=e[c].update(I.val());if(R!==void 0){ms("transaction failed: Data returned ",R,u.path);let b=Z(R);typeof R=="object"&&R!=null&&He(R,".priority")||(b=b.updatePriority(I.getPriority()));const P=u.currentWriteId,X=vs(n),Q=kh(b,I,X);u.currentOutputSnapshotRaw=b,u.currentOutputSnapshotResolved=Q,u.currentWriteId=Io(n),a.splice(a.indexOf(P),1),s=s.concat(Ih(n.serverSyncTree_,u.path,Q,u.currentWriteId,u.applyLocally)),s=s.concat(ht(n.serverSyncTree_,P,!0))}else v=!0,m="nodata",s=s.concat(ht(n.serverSyncTree_,u.currentWriteId,!0))}Ce(n.eventQueue_,t,s),s=[],v&&(e[c].status=2,function(I){setTimeout(I,Math.floor(0))}(e[c].unwatcher),e[c].onComplete&&(m==="nodata"?i.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):i.push(()=>e[c].onComplete(new Error(m),!1,null))))}ys(n,n.transactionQueueTree_);for(let c=0;c<i.length;c++)sn(i[c]);To(n,n.transactionQueueTree_)}function Lh(n,e){let t,i=n.transactionQueueTree_;for(t=x(e);t!==null&&on(i)===void 0;)i=mo(i,t),e=G(e),t=x(e);return i}function xh(n,e){const t=[];return Fh(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Fh(n,e,t){const i=on(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);_s(e,s=>{Fh(n,s,t)})}function ys(n,e){const t=on(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ph(e,t.length>0?t:void 0)}_s(e,i=>{ys(n,i)})}function Co(n,e){const t=ei(Lh(n,e)),i=mo(n.transactionQueueTree_,e);return w_(i,s=>{lr(n,s)}),lr(n,i),Oh(i,s=>{lr(n,s)}),t}function lr(n,e){const t=on(e);if(t){const i=[];let s=[],o=-1;for(let a=0;a<t.length;a++)t[a].status===3||(t[a].status===1?(A(o===a-1,"All SENT items should be at beginning of queue."),o=a,t[a].status=3,t[a].abortReason="set"):(A(t[a].status===0,"Unexpected transaction status in abort"),t[a].unwatcher(),s=s.concat(ht(n.serverSyncTree_,t[a].currentWriteId,!0)),t[a].onComplete&&i.push(t[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?Ph(e,void 0):t.length=o+1,Ce(n.eventQueue_,ei(e),s);for(let a=0;a<i.length;a++)sn(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Y_(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):pe(`Invalid query segment '${t}' in query '${n}'`)}return e}const Sl=function(n,e){const t=X_(n),i=t.namespace;t.domain==="firebase.com"&&Qe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Qe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||ip();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Hc(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new W(t.pathString)}},X_=function(n){let e="",t="",i="",s="",o="",a=!0,c="https",u=443;if(typeof n=="string"){let d=n.indexOf("//");d>=0&&(c=n.substring(0,d-1),n=n.substring(d+2));let v=n.indexOf("/");v===-1&&(v=n.length);let m=n.indexOf("?");m===-1&&(m=n.length),e=n.substring(0,Math.min(v,m)),v<m&&(s=K_(n.substring(v,m)));const I=Y_(n.substring(Math.min(n.length,m)));d=e.indexOf(":"),d>=0?(a=c==="https"||c==="wss",u=parseInt(e.substring(d+1),10)):d=e.length;const R=e.slice(0,d);if(R.toLowerCase()==="localhost")t="localhost";else if(R.split(".").length<=2)t=R;else{const b=e.indexOf(".");i=e.substring(0,b).toLowerCase(),t=e.substring(b+1),o=i}"ns"in I&&(o=I.ns)}return{host:e,port:u,domain:t,subdomain:i,secure:a,scheme:c,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ee(this.snapshot.exportVal())}}class Q_{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return A(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return M(this._path)?null:Yr(this._path)}get ref(){return new et(this._repo,this._path)}get _queryIdentifier(){const e=ul(this._queryParams),t=Gr(e);return t==="{}"?"default":t}get _queryObject(){return ul(this._queryParams)}isEqual(e){if(e=me(e),!(e instanceof ni))return!1;const t=this._repo===e._repo,i=Qc(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Vp(this._path)}}function em(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function tm(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===At){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==Nt)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==gt)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===K){if(e!=null&&!kr(e)||t!=null&&!kr(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(A(n.getIndex()instanceof Qr||n.getIndex()===rh,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class et extends ni{constructor(e,t){super(e,t,new eo,!1)}get parent(){const e=Jc(this._path);return e===null?null:new et(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class qn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new W(e),i=Nr(this.ref,e);return new qn(this._node.getChild(t),i,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new qn(s,Nr(this.ref,i),K)))}hasChild(e){const t=new W(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function xE(n,e){return n=me(n),n._checkNotDeleted("ref"),e!==void 0?Nr(n._root,e):n._root}function Nr(n,e){return n=me(n),x(n._path)===null?k_("child","path",e):yo("child","path",e),new et(n._repo,Y(n._path,e))}function FE(n,e){n=me(n),P_("set",n._path),b_("set",e,n._path);const t=new kt;return H_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function UE(n,e){R_("update",e,n._path);const t=new kt;return j_(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function BE(n){n=me(n);const e=new Z_(()=>{}),t=new So(e);return W_(n._repo,n,t).then(i=>new qn(i,new et(n._repo,n._path),n._queryParams.getIndex()))}class So{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new J_("value",this,new qn(e.snapshotNode,new et(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Q_(this,e,t):null}matches(e){return e instanceof So?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Uh{}class nm extends Uh{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new ni(e._repo,e._path,cg(e._queryParams,this._limit),e._orderByCalled)}}function VE(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new nm(n)}class im extends Uh{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){em(e,"orderByChild");const t=new W(this._path);if(M(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new Qr(t),s=hg(e._queryParams,i);return tm(s),new ni(e._repo,e._path,s,!0)}}function WE(n){return yo("orderByChild","path",n),new im(n)}function HE(n,...e){let t=me(n);for(const i of e)t=i._apply(t);return t}Qg(et);i_(et);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm="FIREBASE_DATABASE_EMULATOR_HOST",Or={};let rm=!1;function om(n,e,t,i){n.repoInfo_=new Hc(e,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function am(n,e,t,i,s){let o=i||n.options.databaseURL;o===void 0&&(n.options.projectId||Qe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),re("Using default host for project ",n.options.projectId),o=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=Sl(o,s),c=a.repoInfo,u;typeof process<"u"&&qa&&(u=qa[sm]),u?(o=`http://${u}?ns=${c.namespace}`,a=Sl(o,s),c=a.repoInfo):a.repoInfo.secure;const d=new pp(n.name,n.options,e);N_("Invalid Firebase Database URL",a),M(a.path)||Qe("Database URL must point to the root of a Firebase Database (not including a child path).");const v=cm(c,n,d,new fp(n,t));return new hm(v,n)}function lm(n,e){const t=Or[e];(!t||t[n.key]!==n)&&Qe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),G_(n),delete t[n.key]}function cm(n,e,t,i){let s=Or[e.name];s||(s={},Or[e.name]=s);let o=s[n.toURLString()];return o&&Qe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new F_(n,rm,t,i),s[n.toURLString()]=o,o}class hm{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(U_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new et(this._repo,B())),this._rootInternal}_delete(){return this._rootInternal!==null&&(lm(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Qe("Cannot call "+e+" on a deleted database.")}}function um(n=jr(),e){const t=Hr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Sd("database");i&&dm(t,...i)}return t}function dm(n,e,t,i={}){n=me(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,o=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Pt(i,o.repoInfo_.emulatorOptions))return;Qe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let a;if(o.repoInfo_.nodeAdmin)i.mockUserToken&&Qe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),a=new Pi(Pi.OWNER);else if(i.mockUserToken){const c=typeof i.mockUserToken=="string"?i.mockUserToken:bd(i.mockUserToken,n.app.options.projectId);a=new Pi(c)}om(o,s,i,a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fm(n){Jf(yt),Ue(new Le("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return am(i,s,o,t)},"PUBLIC").setMultipleInstances(!0)),Ee(Ka,Ya,n),Ee(Ka,Ya,"esm2017")}Xe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Xe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};fm();function bo(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Bh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const pm=Bh,Vh=new tn("auth","Firebase",Bh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji=new Yn("@firebase/auth");function gm(n,...e){Ji.logLevel<=V.WARN&&Ji.warn(`Auth (${yt}): ${n}`,...e)}function Ni(n,...e){Ji.logLevel<=V.ERROR&&Ji.error(`Auth (${yt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(n,...e){throw Ro(n,...e)}function Me(n,...e){return Ro(n,...e)}function Ao(n,e,t){const i=Object.assign(Object.assign({},pm()),{[e]:t});return new tn("auth","Firebase",i).create(e,{appName:n.name})}function Rt(n){return Ao(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _m(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&Be(n,"argument-error"),Ao(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ro(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Vh.create(n,...e)}function D(n,e,...t){if(!n)throw Ro(e,...t)}function Ke(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ni(e),new Error(e)}function Ze(n,e){n||Ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function mm(){return bl()==="http:"||bl()==="https:"}function bl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mm()||Rd()||"connection"in navigator)?navigator.onLine:!0}function ym(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ze(t>e,"Short delay should be less than long delay!"),this.isMobile=Vr()||Ec()}get(){return vm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(n,e){Ze(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Em={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Im=new ii(3e4,6e4);function Po(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function an(n,e,t,i,s={}){return Hh(n,s,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=nn(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},o);return Ad()||(d.referrerPolicy="no-referrer"),Wh.fetch()(await jh(n,n.config.apiHost,t,c),d)})}async function Hh(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Em),e);try{const s=new Cm(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Ci(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ci(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ci(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ci(n,"user-disabled",a);const v=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ao(n,v,d);Be(n,v)}}catch(s){if(s instanceof We)throw s;Be(n,"network-request-failed",{message:String(s)})}}async function Tm(n,e,t,i,s={}){const o=await an(n,e,t,i,s);return"mfaPendingCredential"in o&&Be(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function jh(n,e,t,i){const s=`${e}${t}?${i}`,o=n,a=o.config.emulator?ko(n.config,s):`${n.config.apiScheme}://${s}`;return wm.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}class Cm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Me(this.auth,"network-request-failed")),Im.get())})}}function Ci(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Me(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sm(n,e){return an(n,"POST","/v1/accounts:delete",e)}async function Qi(n,e){return an(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bm(n,e=!1){const t=me(n),i=await t.getIdToken(e),s=No(i);D(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o?.sign_in_provider;return{claims:s,token:i,authTime:Ln(cr(s.auth_time)),issuedAtTime:Ln(cr(s.iat)),expirationTime:Ln(cr(s.exp)),signInProvider:a||null,signInSecondFactor:o?.sign_in_second_factor||null}}function cr(n){return Number(n)*1e3}function No(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Ni("JWT malformed, contained fewer than 3 sections"),null;try{const s=xi(t);return s?JSON.parse(s):(Ni("Failed to decode base64 JWT payload"),null)}catch(s){return Ni("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Al(n){const e=No(n);return D(e,"internal-error"),D(typeof e.exp<"u","internal-error"),D(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof We&&Am(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Am({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ln(this.lastLoginAt),this.creationTime=Ln(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zi(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Kn(n,Qi(t,{idToken:i}));D(s?.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?$h(o.providerUserInfo):[],c=Pm(n.providerData,a),u=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!c?.length,v=u?d:!1,m={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new Mr(o.createdAt,o.lastLoginAt),isAnonymous:v};Object.assign(n,m)}async function km(n){const e=me(n);await Zi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Pm(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function $h(n){return n.map(e=>{var{providerId:t}=e,i=bo(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nm(n,e){const t=await Hh(n,{},async()=>{const i=nn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=await jh(n,s,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Wh.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Om(n,e){return an(n,"POST","/v2/accounts:revokeToken",Po(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){D(e.idToken,"internal-error"),D(typeof e.idToken<"u","internal-error"),D(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Al(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){D(e.length!==0,"internal-error");const t=Al(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(D(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:o}=await Nm(e,t);this.updateTokensAndExpiration(i,s,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:o}=t,a=new Gt;return i&&(D(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(D(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(D(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gt,this.toJSON())}_performRefresh(){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,e){D(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Pe{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,o=bo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Rm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Mr(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Kn(this,this.stsTokenManager.getToken(this.auth,e));return D(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return bm(this,e)}reload(){return km(this)}_assign(e){this!==e&&(D(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Pe(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){D(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Zi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ye(this.auth.app))return Promise.reject(Rt(this.auth));const e=await this.getIdToken();return await Kn(this,Sm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,o,a,c,u,d,v;const m=(i=t.displayName)!==null&&i!==void 0?i:void 0,I=(s=t.email)!==null&&s!==void 0?s:void 0,R=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,b=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,X=(d=t.createdAt)!==null&&d!==void 0?d:void 0,Q=(v=t.lastLoginAt)!==null&&v!==void 0?v:void 0,{uid:H,emailVerified:z,isAnonymous:we,providerData:te,stsTokenManager:w}=t;D(H&&w,e,"internal-error");const p=Gt.fromJSON(this.name,w);D(typeof H=="string",e,"internal-error"),rt(m,e.name),rt(I,e.name),D(typeof z=="boolean",e,"internal-error"),D(typeof we=="boolean",e,"internal-error"),rt(R,e.name),rt(b,e.name),rt(N,e.name),rt(P,e.name),rt(X,e.name),rt(Q,e.name);const _=new Pe({uid:H,auth:e,email:I,emailVerified:z,displayName:m,isAnonymous:we,photoURL:b,phoneNumber:R,tenantId:N,stsTokenManager:p,createdAt:X,lastLoginAt:Q});return te&&Array.isArray(te)&&(_.providerData=te.map(y=>Object.assign({},y))),P&&(_._redirectEventId=P),_}static async _fromIdTokenResponse(e,t,i=!1){const s=new Gt;s.updateFromServerResponse(t);const o=new Pe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Zi(o),o}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];D(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?$h(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!o?.length,c=new Gt;c.updateFromIdToken(i);const u=new Pe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Mr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!o?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl=new Map;function Ye(n){Ze(n instanceof Function,"Expected a class definition");let e=Rl.get(n);return e?(Ze(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Rl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Gh.type="NONE";const kl=Gh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(n,e,t){return`firebase:${n}:${e}:${t}`}class zt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:o}=this.auth;this.fullUserKey=Oi(this.userKey,s.apiKey,o),this.fullPersistenceKey=Oi("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Qi(this.auth,{idToken:e}).catch(()=>{});return t?Pe._fromGetAccountInfoResponse(this.auth,t,e):null}return Pe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new zt(Ye(kl),e,i);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||Ye(kl);const a=Oi(i,e.config.apiKey,e.name);let c=null;for(const d of t)try{const v=await d._get(a);if(v){let m;if(typeof v=="string"){const I=await Qi(e,{idToken:v}).catch(()=>{});if(!I)break;m=await Pe._fromGetAccountInfoResponse(e,I,v)}else m=Pe._fromJSON(e,v);d!==o&&(c=m),o=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new zt(o,e,i):(o=u[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new zt(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Jh(e))return"Blackberry";if(Qh(e))return"Webos";if(qh(e))return"Safari";if((e.includes("chrome/")||Kh(e))&&!e.includes("edge/"))return"Chrome";if(Xh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function zh(n=ge()){return/firefox\//i.test(n)}function qh(n=ge()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kh(n=ge()){return/crios\//i.test(n)}function Yh(n=ge()){return/iemobile/i.test(n)}function Xh(n=ge()){return/android/i.test(n)}function Jh(n=ge()){return/blackberry/i.test(n)}function Qh(n=ge()){return/webos/i.test(n)}function Oo(n=ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Dm(n=ge()){var e;return Oo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Mm(){return kd()&&document.documentMode===10}function Zh(n=ge()){return Oo(n)||Xh(n)||Qh(n)||Jh(n)||/windows phone/i.test(n)||Yh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(n,e=[]){let t;switch(n){case"Browser":t=Pl(ge());break;case"Worker":t=`${Pl(ge())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${yt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const u=e(o);a(u)}catch(u){c(u)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xm(n,e={}){return an(n,"GET","/v2/passwordPolicy",Po(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm=6;class Um{constructor(e){var t,i,s,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Fm,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,o,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(i=u.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsUppercaseLetter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nl(this),this.idTokenSubscription=new Nl(this),this.beforeStateQueue=new Lm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ye(t)),this._initializationPromise=this.queue(async()=>{var i,s,o;if(!this._deleted&&(this.persistenceManager=await zt.create(this,e),(i=this._resolvePersistenceManagerAvailable)===null||i===void 0||i.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qi(this,{idToken:e}),i=await Pe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ye(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(s=u.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return D(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Zi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ym()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ye(this.app))return Promise.reject(Rt(this));const t=e?me(e):null;return t&&D(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&D(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ye(this.app)?Promise.reject(Rt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ye(this.app)?Promise.reject(Rt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ye(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xm(this),t=new Um(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new tn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Om(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ye(e)||this._popupRedirectResolver;D(t,this,"argument-error"),this.redirectPersistenceManager=await zt.create(this,[Ye(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(D(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,i,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return D(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&gm(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Es(n){return me(n)}class Nl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ud(t=>this.observer=t)}get next(){return D(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Vm(n){Do=n}function Wm(n){return Do.loadJS(n)}function Hm(){return Do.gapiScript}function jm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(n,e){const t=Hr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Pt(o,e??{}))return s;Be(s,"already-initialized")}return t.initialize({options:e})}function $m(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Ye);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Gm(n,e,t){const i=Es(n);D(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,o=nu(e),{host:a,port:c}=zm(e),u=c===null?"":`:${c}`,d={url:`${o}//${a}${u}/`},v=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){D(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),D(Pt(d,i.config.emulator)&&Pt(v,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=d,i.emulatorConfig=v,i.settings.appVerificationDisabledForTesting=!0,qm()}function nu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function zm(n){const e=nu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const o=s[1];return{host:o,port:Ol(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Ol(a)}}}function Ol(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function qm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ke("not implemented")}_getIdTokenResponse(e){return Ke("not implemented")}_linkToIdToken(e,t){return Ke("not implemented")}_getReauthenticationResolver(e){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(n,e){return Tm(n,"POST","/v1/accounts:signInWithIdp",Po(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Km="http://localhost";class Mt extends iu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Mt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Be("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,o=bo(t,["providerId","signInMethod"]);if(!i||!s)return null;const a=new Mt(i,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return qt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,qt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,qt(e,t)}buildRequest(){const e={requestUri:Km,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=nn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si extends Mo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends si{constructor(){super("facebook.com")}static credential(e){return Mt._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ot.credential(e.oauthAccessToken)}catch{return null}}}ot.FACEBOOK_SIGN_IN_METHOD="facebook.com";ot.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends si{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Mt._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return at.credential(t,i)}catch{return null}}}at.GOOGLE_SIGN_IN_METHOD="google.com";at.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends si{constructor(){super("github.com")}static credential(e){return Mt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lt.credential(e.oauthAccessToken)}catch{return null}}}lt.GITHUB_SIGN_IN_METHOD="github.com";lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends si{constructor(){super("twitter.com")}static credential(e,t){return Mt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ct.credential(t,i)}catch{return null}}}ct.TWITTER_SIGN_IN_METHOD="twitter.com";ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const o=await Pe._fromIdTokenResponse(e,i,s),a=Dl(i);return new Zt({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Dl(i);return new Zt({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Dl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es extends We{constructor(e,t,i,s){var o;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,es.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new es(e,t,i,s)}}function su(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?es._fromErrorAndOperation(n,o,e,i):o})}async function Ym(n,e,t=!1){const i=await Kn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Zt._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xm(n,e,t=!1){const{auth:i}=n;if(ye(i.app))return Promise.reject(Rt(i));const s="reauthenticate";try{const o=await Kn(n,su(i,s,e,n),t);D(o.idToken,i,"internal-error");const a=No(o.idToken);D(a,i,"internal-error");const{sub:c}=a;return D(n.uid===c,i,"user-mismatch"),Zt._forOperation(n,s,o)}catch(o){throw o?.code==="auth/user-not-found"&&Be(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jm(n,e,t=!1){if(ye(n.app))return Promise.reject(Rt(n));const i="signIn",s=await su(n,i,e),o=await Zt._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(o.user),o}function ru(n,e,t,i){return me(n).onIdTokenChanged(e,t,i)}function Qm(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function jE(n){return me(n).signOut()}const ts="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ts,"1"),this.storage.removeItem(ts),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=1e3,ev=10;class au extends ou{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);Mm()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ev):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Zm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}au.type="LOCAL";const lu=au;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu extends ou{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}cu.type="SESSION";const Lo=cu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ws(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,o)),u=await tv(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ws.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((c,u)=>{const d=xo("",20);s.port1.start();const v=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(m){const I=m;if(I.data.eventId===d)switch(I.data.status){case"ack":clearTimeout(v),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(I.data.response);break;default:clearTimeout(v),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return window}function iv(n){Fe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(){return typeof Fe().WorkerGlobalScope<"u"&&typeof Fe().importScripts=="function"}async function sv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rv(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function ov(){return hu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu="firebaseLocalStorageDb",av=1,ns="firebaseLocalStorage",du="fbase_key";class ri{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Is(n,e){return n.transaction([ns],e?"readwrite":"readonly").objectStore(ns)}function lv(){const n=indexedDB.deleteDatabase(uu);return new ri(n).toPromise()}function Lr(){const n=indexedDB.open(uu,av);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(ns,{keyPath:du})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(ns)?e(i):(i.close(),await lv(),e(await Lr()))})})}async function Ml(n,e,t){const i=Is(n,!0).put({[du]:e,value:t});return new ri(i).toPromise()}async function cv(n,e){const t=Is(n,!1).get(e),i=await new ri(t).toPromise();return i===void 0?null:i.value}function Ll(n,e){const t=Is(n,!0).delete(e);return new ri(t).toPromise()}const hv=800,uv=3;class fu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Lr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>uv)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return hu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ws._getInstance(ov()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await sv(),!this.activeServiceWorker)return;this.sender=new nv(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||rv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Lr();return await Ml(e,ts,"1"),await Ll(e,ts),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ml(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>cv(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ll(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Is(s,!1).getAll();return new ri(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}fu.type="LOCAL";const pu=fu;new ii(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n,e){return e?Ye(e):(D(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo extends iu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return qt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return qt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function dv(n){return Jm(n.auth,new Fo(n),n.bypassAuthState)}function fv(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Xm(t,new Fo(n),n.bypassAuthState)}async function pv(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Ym(t,new Fo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,t,i,s,o=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dv;case"linkViaPopup":case"linkViaRedirect":return pv;case"reauthViaPopup":case"reauthViaRedirect":return fv;default:Be(this.auth,"internal-error")}}resolve(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=new ii(2e3,1e4);async function $E(n,e,t){if(ye(n.app))return Promise.reject(Me(n,"operation-not-supported-in-this-environment"));const i=Es(n);_m(n,e,Mo);const s=gu(i,t);return new bt(i,"signInViaPopup",e,s).executeNotNull()}class bt extends _u{constructor(e,t,i,s,o){super(e,t,s,o),this.provider=i,this.authWindow=null,this.pollId=null,bt.currentPopupAction&&bt.currentPopupAction.cancel(),bt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return D(e,this.auth,"internal-error"),e}async onExecution(){Ze(this.filter.length===1,"Popup operations only handle one event");const e=xo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Me(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Me(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,bt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Me(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gv.get())};e()}}bt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v="pendingRedirect",Di=new Map;class mv extends _u{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Di.get(this.auth._key());if(!e){try{const i=await vv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Di.set(this.auth._key(),e)}return this.bypassAuthState||Di.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vv(n,e){const t=wv(e),i=Ev(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function yv(n,e){Di.set(n._key(),e)}function Ev(n){return Ye(n._redirectPersistence)}function wv(n){return Oi(_v,n.config.apiKey,n.name)}async function Iv(n,e,t=!1){if(ye(n.app))return Promise.reject(Rt(n));const i=Es(n),s=gu(i,e),a=await new mv(i,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=10*60*1e3;class Cv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!mu(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Me(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tv&&this.cachedEventUids.clear(),this.cachedEventUids.has(xl(e))}saveEventToCache(e){this.cachedEventUids.add(xl(e)),this.lastProcessedEventTime=Date.now()}}function xl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function mu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Sv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bv(n,e={}){return an(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rv=/^https?/;async function kv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bv(n);for(const t of e)try{if(Pv(t))return}catch{}Be(n,"unauthorized-domain")}function Pv(n){const e=Dr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!Rv.test(t))return!1;if(Av.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nv=new ii(3e4,6e4);function Fl(){const n=Fe().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ov(n){return new Promise((e,t)=>{var i,s,o;function a(){Fl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Fl(),t(Me(n,"network-request-failed"))},timeout:Nv.get()})}if(!((s=(i=Fe().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=Fe().gapi)===null||o===void 0)&&o.load)a();else{const c=jm("iframefcb");return Fe()[c]=()=>{gapi.load?a():t(Me(n,"network-request-failed"))},Wm(`${Hm()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Mi=null,e})}let Mi=null;function Dv(n){return Mi=Mi||Ov(n),Mi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv=new ii(5e3,15e3),Lv="__/auth/iframe",xv="emulator/auth/iframe",Fv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Uv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bv(n){const e=n.config;D(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ko(e,xv):`https://${n.config.authDomain}/${Lv}`,i={apiKey:e.apiKey,appName:n.name,v:yt},s=Uv.get(n.config.apiHost);s&&(i.eid=s);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${nn(i).slice(1)}`}async function Vv(n){const e=await Dv(n),t=Fe().gapi;return D(t,n,"internal-error"),e.open({where:document.body,url:Bv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fv,dontclear:!0},i=>new Promise(async(s,o)=>{await i.restyle({setHideOnLeave:!1});const a=Me(n,"network-request-failed"),c=Fe().setTimeout(()=>{o(a)},Mv.get());function u(){Fe().clearTimeout(c),s(i)}i.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hv=500,jv=600,$v="_blank",Gv="http://localhost";class Ul{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zv(n,e,t,i=Hv,s=jv){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Wv),{width:i.toString(),height:s.toString(),top:o,left:a}),d=ge().toLowerCase();t&&(c=Kh(d)?$v:t),zh(d)&&(e=e||Gv,u.scrollbars="yes");const v=Object.entries(u).reduce((I,[R,b])=>`${I}${R}=${b},`,"");if(Dm(d)&&c!=="_self")return qv(e||"",c),new Ul(null);const m=window.open(e||"",c,v);D(m,n,"popup-blocked");try{m.focus()}catch{}return new Ul(m)}function qv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kv="__/auth/handler",Yv="emulator/auth/handler",Xv=encodeURIComponent("fac");async function Bl(n,e,t,i,s,o){D(n.config.authDomain,n,"auth-domain-config-required"),D(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:yt,eventId:s};if(e instanceof Mo){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",fr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[v,m]of Object.entries({}))a[v]=m}if(e instanceof si){const v=e.getScopes().filter(m=>m!=="");v.length>0&&(a.scopes=v.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const v of Object.keys(c))c[v]===void 0&&delete c[v];const u=await n._getAppCheckToken(),d=u?`#${Xv}=${encodeURIComponent(u)}`:"";return`${Jv(n)}?${nn(c).slice(1)}${d}`}function Jv({config:n}){return n.emulator?ko(n,Yv):`https://${n.authDomain}/${Kv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr="webStorageSupport";class Qv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Lo,this._completeRedirectFn=Iv,this._overrideRedirectResult=yv}async _openPopup(e,t,i,s){var o;Ze((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Bl(e,t,i,Dr(),s);return zv(e,a,xo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const o=await Bl(e,t,i,Dr(),s);return iv(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(Ze(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Vv(e),i=new Cv(e);return t.register("authEvent",s=>(D(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(hr,{type:hr},s=>{var o;const a=(o=s?.[0])===null||o===void 0?void 0:o[hr];a!==void 0&&t(!!a),Be(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Zh()||qh()||Oo()}}const vu=Qv;var Vl="@firebase/auth",Wl="1.10.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){D(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ty(n){Ue(new Le("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;D(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eu(n)},d=new Bm(i,s,o,u);return $m(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Ue(new Le("auth-internal",e=>{const t=Es(e.getProvider("auth").getImmediate());return(i=>new Zv(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ee(Vl,Wl,ey(n)),Ee(Vl,Wl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny=5*60,iy=yc("authIdTokenMaxAge")||ny;let Hl=null;const sy=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>iy)return;const s=t?.token;Hl!==s&&(Hl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ry(n=jr()){const e=Hr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=tu(n,{popupRedirectResolver:vu,persistence:[pu,lu,Lo]}),i=yc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=sy(o.toString());Qm(t,a,()=>a(t.currentUser)),ru(t,c=>a(c))}}const s=mc("auth");return s&&Gm(t,`http://${s}`),t}function oy(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Vm({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const o=Me("internal-error");o.customData=s,t(o)},i.type="text/javascript",i.charset="UTF-8",oy().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ty("Browser");var ay="firebase",ly="11.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ee(ay,ly,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=new Map,hy={activated:!1,tokenObservers:[]};function xe(n){return cy.get(n)||Object.assign({},hy)}const jl={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(e,t,i,s,o){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=s,s>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new kt,this.pending.promise.catch(t=>{}),await dy(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new kt,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function dy(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},is=new tn("appCheck","AppCheck",fy);function yu(n){if(!xe(n).activated)throw is.create("use-before-activation",{appName:n.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="firebase-app-check-database",gy=1,xr="firebase-app-check-store";let Si=null;function _y(){return Si||(Si=new Promise((n,e)=>{try{const t=indexedDB.open(py,gy);t.onsuccess=i=>{n(i.target.result)},t.onerror=i=>{var s;e(is.create("storage-open",{originalErrorMessage:(s=i.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(xr,{keyPath:"compositeKey"})}}}catch(t){e(is.create("storage-open",{originalErrorMessage:t?.message}))}}),Si)}function my(n,e){return vy(yy(n),e)}async function vy(n,e){const i=(await _y()).transaction(xr,"readwrite"),o=i.objectStore(xr).put({compositeKey:n,value:e});return new Promise((a,c)=>{o.onsuccess=u=>{a()},i.onerror=u=>{var d;c(is.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}function yy(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=new Yn("@firebase/app-check");function $l(n,e){return wc()?my(n,e).catch(t=>{Fr.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey={error:"UNKNOWN_ERROR"};function wy(n){return ls.encodeString(JSON.stringify(n),!1)}async function Ur(n,e=!1,t=!1){const i=n.app;yu(i);const s=xe(i);let o=s.token,a;if(o&&!kn(o)&&(s.token=void 0,o=void 0),!o){const d=await s.cachedTokenPromise;d&&(kn(d)?o=d:await $l(i,void 0))}if(!e&&o&&kn(o))return{token:o.token};let c=!1;try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),c=!0),o=await xe(i).exchangeTokenPromise}catch(d){d.code==="appCheck/throttled"||d.code==="appCheck/initial-throttle"?Fr.warn(d.message):t&&Fr.error(d),a=d}let u;return o?a?kn(o)?u={token:o.token,internalError:a}:u=zl(a):(u={token:o.token},s.token=o,await $l(i,o)):u=zl(a),c&&Sy(i,u),u}async function Iy(n){const e=n.app;yu(e);const{provider:t}=xe(e);{const{token:i}=await t.getToken();return{token:i}}}function Ty(n,e,t,i){const{app:s}=n,o=xe(s),a={next:t,error:i,type:e};if(o.tokenObservers=[...o.tokenObservers,a],o.token&&kn(o.token)){const c=o.token;Promise.resolve().then(()=>{t({token:c.token}),Gl(n)}).catch(()=>{})}o.cachedTokenPromise.then(()=>Gl(n))}function Eu(n,e){const t=xe(n),i=t.tokenObservers.filter(s=>s.next!==e);i.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=i}function Gl(n){const{app:e}=n,t=xe(e);let i=t.tokenRefresher;i||(i=Cy(n),t.tokenRefresher=i),!i.isRunning()&&t.isTokenAutoRefreshEnabled&&i.start()}function Cy(n){const{app:e}=n;return new uy(async()=>{const t=xe(e);let i;if(t.token?i=await Ur(n,!0):i=await Ur(n),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const t=xe(e);if(t.token){let i=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},jl.RETRIAL_MIN_WAIT,jl.RETRIAL_MAX_WAIT)}function Sy(n,e){const t=xe(n).tokenObservers;for(const i of t)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function kn(n){return n.expireTimeMillis-Date.now()>0}function zl(n){return{token:wy(Ey),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=xe(this.app);for(const t of e)Eu(this.app,t.next);return Promise.resolve()}}function Ay(n,e){return new by(n,e)}function Ry(n){return{getToken:e=>Ur(n,e),getLimitedUseToken:()=>Iy(n),addTokenListener:e=>Ty(n,"INTERNAL",e),removeTokenListener:e=>Eu(n.app,e)}}const ky="@firebase/app-check",Py="0.8.13",Ny="app-check",ql="app-check-internal";function Oy(){Ue(new Le(Ny,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Ay(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(ql).initialize()})),Ue(new Le(ql,n=>{const e=n.getProvider("app-check").getImmediate();return Ry(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ee(ky,Py)}Oy();const wu=Symbol("firebaseApp");function Dy(n){return dd()&&fd(wu,null)||jr(n)}const bi=new WeakMap;function My(n,e){if(!bi.has(n)){const t=ud(!0);bi.set(n,t);const{unmount:i}=e;e.unmount=()=>{i.call(e),t.stop(),bi.delete(n)}}return bi.get(n)}const Ly=new WeakMap,Ai=new WeakMap;function xy(n){const e=Dy(n);if(!Ai.has(e)){let t;const s=[new Promise(o=>{t=o}),o=>{Ai.set(e,o),t(o.value)}];Ai.set(e,s)}return Ai.get(e)}function Fy(n,e){ru(e,t=>{const i=xy();n.value=t,Array.isArray(i)&&i[1](n)})}var Kl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Iu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,p){function _(){}_.prototype=p.prototype,w.D=p.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(y,E,C){for(var g=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)g[$e-2]=arguments[$e];return p.prototype[E].apply(y,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)y[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=w.g[0],_=w.g[1],E=w.g[2];var C=w.g[3],g=p+(C^_&(E^C))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=C+(E^p&(_^E))+y[1]+3905402710&4294967295,C=p+(g<<12&4294967295|g>>>20),g=E+(_^C&(p^_))+y[2]+606105819&4294967295,E=C+(g<<17&4294967295|g>>>15),g=_+(p^E&(C^p))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(C^_&(E^C))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(E^p&(_^E))+y[5]+1200080426&4294967295,C=p+(g<<12&4294967295|g>>>20),g=E+(_^C&(p^_))+y[6]+2821735955&4294967295,E=C+(g<<17&4294967295|g>>>15),g=_+(p^E&(C^p))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(C^_&(E^C))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(E^p&(_^E))+y[9]+2336552879&4294967295,C=p+(g<<12&4294967295|g>>>20),g=E+(_^C&(p^_))+y[10]+4294925233&4294967295,E=C+(g<<17&4294967295|g>>>15),g=_+(p^E&(C^p))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(C^_&(E^C))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(E^p&(_^E))+y[13]+4254626195&4294967295,C=p+(g<<12&4294967295|g>>>20),g=E+(_^C&(p^_))+y[14]+2792965006&4294967295,E=C+(g<<17&4294967295|g>>>15),g=_+(p^E&(C^p))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^C&(_^E))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^E&(p^_))+y[6]+3225465664&4294967295,C=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(C^p))+y[11]+643717713&4294967295,E=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(E^C))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^C&(_^E))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^E&(p^_))+y[10]+38016083&4294967295,C=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(C^p))+y[15]+3634488961&4294967295,E=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(E^C))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^C&(_^E))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^E&(p^_))+y[14]+3275163606&4294967295,C=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(C^p))+y[3]+4107603335&4294967295,E=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(E^C))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^C&(_^E))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^E&(p^_))+y[2]+4243563512&4294967295,C=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(C^p))+y[7]+1735328473&4294967295,E=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(E^C))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^C)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^E)+y[8]+2272392833&4294967295,C=p+(g<<11&4294967295|g>>>21),g=E+(C^p^_)+y[11]+1839030562&4294967295,E=C+(g<<16&4294967295|g>>>16),g=_+(E^C^p)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^C)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^E)+y[4]+1272893353&4294967295,C=p+(g<<11&4294967295|g>>>21),g=E+(C^p^_)+y[7]+4139469664&4294967295,E=C+(g<<16&4294967295|g>>>16),g=_+(E^C^p)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^C)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^E)+y[0]+3936430074&4294967295,C=p+(g<<11&4294967295|g>>>21),g=E+(C^p^_)+y[3]+3572445317&4294967295,E=C+(g<<16&4294967295|g>>>16),g=_+(E^C^p)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^C)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^E)+y[12]+3873151461&4294967295,C=p+(g<<11&4294967295|g>>>21),g=E+(C^p^_)+y[15]+530742520&4294967295,E=C+(g<<16&4294967295|g>>>16),g=_+(E^C^p)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~C))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~E))+y[7]+1126891415&4294967295,C=p+(g<<10&4294967295|g>>>22),g=E+(p^(C|~_))+y[14]+2878612391&4294967295,E=C+(g<<15&4294967295|g>>>17),g=_+(C^(E|~p))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~C))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~E))+y[3]+2399980690&4294967295,C=p+(g<<10&4294967295|g>>>22),g=E+(p^(C|~_))+y[10]+4293915773&4294967295,E=C+(g<<15&4294967295|g>>>17),g=_+(C^(E|~p))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~C))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~E))+y[15]+4264355552&4294967295,C=p+(g<<10&4294967295|g>>>22),g=E+(p^(C|~_))+y[6]+2734768916&4294967295,E=C+(g<<15&4294967295|g>>>17),g=_+(C^(E|~p))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~C))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~E))+y[11]+3174756917&4294967295,C=p+(g<<10&4294967295|g>>>22),g=E+(p^(C|~_))+y[2]+718787259&4294967295,E=C+(g<<15&4294967295|g>>>17),g=_+(C^(E|~p))+y[9]+3951481745&4294967295,w.g[0]=w.g[0]+p&4294967295,w.g[1]=w.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+C&4294967295}i.prototype.u=function(w,p){p===void 0&&(p=w.length);for(var _=p-this.blockSize,y=this.B,E=this.h,C=0;C<p;){if(E==0)for(;C<=_;)s(this,w,C),C+=this.blockSize;if(typeof w=="string"){for(;C<p;)if(y[E++]=w.charCodeAt(C++),E==this.blockSize){s(this,y),E=0;break}}else for(;C<p;)if(y[E++]=w[C++],E==this.blockSize){s(this,y),E=0;break}}this.h=E,this.o+=p},i.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var p=1;p<w.length-8;++p)w[p]=0;var _=8*this.o;for(p=w.length-8;p<w.length;++p)w[p]=_&255,_/=256;for(this.u(w),w=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)w[_++]=this.g[p]>>>y&255;return w};function o(w,p){var _=c;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=p(w)}function a(w,p){this.h=p;for(var _=[],y=!0,E=w.length-1;0<=E;E--){var C=w[E]|0;y&&C==p||(_[E]=C,y=!1)}this.g=_}var c={};function u(w){return-128<=w&&128>w?o(w,function(p){return new a([p|0],0>p?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return P(d(-w));for(var p=[],_=1,y=0;w>=_;y++)p[y]=w/_|0,_*=4294967296;return new a(p,0)}function v(w,p){if(w.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(w.charAt(0)=="-")return P(v(w.substring(1),p));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(p,8)),y=m,E=0;E<w.length;E+=8){var C=Math.min(8,w.length-E),g=parseInt(w.substring(E,E+C),p);8>C?(C=d(Math.pow(p,C)),y=y.j(C).add(d(g))):(y=y.j(_),y=y.add(d(g)))}return y}var m=u(0),I=u(1),R=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-P(this).m();for(var w=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);w+=(0<=y?y:4294967296+y)*p,p*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(b(this))return"0";if(N(this))return"-"+P(this).toString(w);for(var p=d(Math.pow(w,6)),_=this,y="";;){var E=z(_,p).g;_=X(_,E.j(p));var C=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=E,b(_))return C+y;for(;6>C.length;)C="0"+C;y=C+y}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function b(w){if(w.h!=0)return!1;for(var p=0;p<w.g.length;p++)if(w.g[p]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=X(this,w),N(w)?-1:b(w)?0:1};function P(w){for(var p=w.g.length,_=[],y=0;y<p;y++)_[y]=~w.g[y];return new a(_,~w.h).add(I)}n.abs=function(){return N(this)?P(this):this},n.add=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0,E=0;E<=p;E++){var C=y+(this.i(E)&65535)+(w.i(E)&65535),g=(C>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);y=g>>>16,C&=65535,g&=65535,_[E]=g<<16|C}return new a(_,_[_.length-1]&-2147483648?-1:0)};function X(w,p){return w.add(P(p))}n.j=function(w){if(b(this)||b(w))return m;if(N(this))return N(w)?P(this).j(P(w)):P(P(this).j(w));if(N(w))return P(this.j(P(w)));if(0>this.l(R)&&0>w.l(R))return d(this.m()*w.m());for(var p=this.g.length+w.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<w.g.length;E++){var C=this.i(y)>>>16,g=this.i(y)&65535,$e=w.i(E)>>>16,ln=w.i(E)&65535;_[2*y+2*E]+=g*ln,Q(_,2*y+2*E),_[2*y+2*E+1]+=C*ln,Q(_,2*y+2*E+1),_[2*y+2*E+1]+=g*$e,Q(_,2*y+2*E+1),_[2*y+2*E+2]+=C*$e,Q(_,2*y+2*E+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function Q(w,p){for(;(w[p]&65535)!=w[p];)w[p+1]+=w[p]>>>16,w[p]&=65535,p++}function H(w,p){this.g=w,this.h=p}function z(w,p){if(b(p))throw Error("division by zero");if(b(w))return new H(m,m);if(N(w))return p=z(P(w),p),new H(P(p.g),P(p.h));if(N(p))return p=z(w,P(p)),new H(P(p.g),p.h);if(30<w.g.length){if(N(w)||N(p))throw Error("slowDivide_ only works with positive integers.");for(var _=I,y=p;0>=y.l(w);)_=we(_),y=we(y);var E=te(_,1),C=te(y,1);for(y=te(y,2),_=te(_,2);!b(y);){var g=C.add(y);0>=g.l(w)&&(E=E.add(_),C=g),y=te(y,1),_=te(_,1)}return p=X(w,E.j(p)),new H(E,p)}for(E=m;0<=w.l(p);){for(_=Math.max(1,Math.floor(w.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),C=d(_),g=C.j(p);N(g)||0<g.l(w);)_-=y,C=d(_),g=C.j(p);b(C)&&(C=I),E=E.add(C),w=X(w,g)}return new H(E,w)}n.A=function(w){return z(this,w).h},n.and=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&w.i(y);return new a(_,this.h&w.h)},n.or=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|w.i(y);return new a(_,this.h|w.h)},n.xor=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^w.i(y);return new a(_,this.h^w.h)};function we(w){for(var p=w.g.length+1,_=[],y=0;y<p;y++)_[y]=w.i(y)<<1|w.i(y-1)>>>31;return new a(_,w.h)}function te(w,p){var _=p>>5;p%=32;for(var y=w.g.length-_,E=[],C=0;C<y;C++)E[C]=0<p?w.i(C+_)>>>p|w.i(C+_+1)<<32-p:w.i(C+_);return new a(E,w.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=v,Iu=a}).apply(typeof Kl<"u"?Kl:typeof self<"u"?self:typeof window<"u"?window:{});var Ri=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(r,l,h){return r==Array.prototype||r==Object.prototype||(r[l]=h.value),r};function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ri=="object"&&Ri];for(var l=0;l<r.length;++l){var h=r[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=t(this);function s(r,l){if(l)e:{var h=i;r=r.split(".");for(var f=0;f<r.length-1;f++){var T=r[f];if(!(T in h))break e;h=h[T]}r=r[r.length-1],f=h[r],l=l(f),l!=f&&l!=null&&e(h,r,{configurable:!0,writable:!0,value:l})}}function o(r,l){r instanceof String&&(r+="");var h=0,f=!1,T={next:function(){if(!f&&h<r.length){var S=h++;return{value:l(S,r[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(r){return r||function(){return o(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(r){var l=typeof r;return l=l!="object"?l:r?Array.isArray(r)?"array":l:"null",l=="array"||l=="object"&&typeof r.length=="number"}function d(r){var l=typeof r;return l=="object"&&r!=null||l=="function"}function v(r,l,h){return r.call.apply(r.bind,arguments)}function m(r,l,h){if(!r)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),r.apply(l,T)}}return function(){return r.apply(l,arguments)}}function I(r,l,h){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?v:m,I.apply(null,arguments)}function R(r,l){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),r.apply(this,f)}}function b(r,l){function h(){}h.prototype=l.prototype,r.aa=l.prototype,r.prototype=new h,r.prototype.constructor=r,r.Qb=function(f,T,S){for(var k=Array(arguments.length-2),j=2;j<arguments.length;j++)k[j-2]=arguments[j];return l.prototype[T].apply(f,k)}}function N(r){const l=r.length;if(0<l){const h=Array(l);for(let f=0;f<l;f++)h[f]=r[f];return h}return[]}function P(r,l){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const T=r.length||0,S=f.length||0;r.length=T+S;for(let k=0;k<S;k++)r[T+k]=f[k]}else r.push(f)}}class X{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function Q(r){return/^[\s\xa0]*$/.test(r)}function H(){var r=c.navigator;return r&&(r=r.userAgent)?r:""}function z(r){return z[" "](r),r}z[" "]=function(){};var we=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function te(r,l,h){for(const f in r)l.call(h,r[f],f,r)}function w(r,l){for(const h in r)l.call(void 0,r[h],h,r)}function p(r){const l={};for(const h in r)l[h]=r[h];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(r,l){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)r[h]=f[h];for(let S=0;S<_.length;S++)h=_[S],Object.prototype.hasOwnProperty.call(f,h)&&(r[h]=f[h])}}function E(r){var l=1;r=r.split(":");const h=[];for(;0<l&&r.length;)h.push(r.shift()),l--;return r.length&&h.push(r.join(":")),h}function C(r){c.setTimeout(()=>{throw r},0)}function g(){var r=Ss;let l=null;return r.g&&(l=r.g,r.g=r.g.next,r.g||(r.h=null),l.next=null),l}class $e{constructor(){this.h=this.g=null}add(l,h){const f=ln.get();f.set(l,h),this.h?this.h.next=f:this.g=f,this.h=f}}var ln=new X(()=>new Ru,r=>r.reset());class Ru{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let cn,hn=!1,Ss=new $e,Bo=()=>{const r=c.Promise.resolve(void 0);cn=()=>{r.then(ku)}};var ku=()=>{for(var r;r=g();){try{r.h.call(r.g)}catch(h){C(h)}var l=ln;l.j(r),100>l.h&&(l.h++,r.next=l.g,l.g=r)}hn=!1};function tt(){this.s=this.s,this.C=this.C}tt.prototype.s=!1,tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ae(r,l){this.type=r,this.g=this.target=l,this.defaultPrevented=!1}ae.prototype.h=function(){this.defaultPrevented=!0};var Pu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var r=!1,l=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return r}();function un(r,l){if(ae.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r){var h=this.type=r.type,f=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;if(this.target=r.target||r.srcElement,this.g=l,l=r.relatedTarget){if(we){e:{try{z(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else h=="mouseover"?l=r.fromElement:h=="mouseout"&&(l=r.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=typeof r.pointerType=="string"?r.pointerType:Nu[r.pointerType]||"",this.state=r.state,this.i=r,r.defaultPrevented&&un.aa.h.call(this)}}b(un,ae);var Nu={2:"touch",3:"pen",4:"mouse"};un.prototype.h=function(){un.aa.h.call(this);var r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var oi="closure_listenable_"+(1e6*Math.random()|0),Ou=0;function Du(r,l,h,f,T){this.listener=r,this.proxy=null,this.src=l,this.type=h,this.capture=!!f,this.ha=T,this.key=++Ou,this.da=this.fa=!1}function ai(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function li(r){this.src=r,this.g={},this.h=0}li.prototype.add=function(r,l,h,f,T){var S=r.toString();r=this.g[S],r||(r=this.g[S]=[],this.h++);var k=As(r,l,f,T);return-1<k?(l=r[k],h||(l.fa=!1)):(l=new Du(l,this.src,S,!!f,T),l.fa=h,r.push(l)),l};function bs(r,l){var h=l.type;if(h in r.g){var f=r.g[h],T=Array.prototype.indexOf.call(f,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(f,T,1),S&&(ai(l),r.g[h].length==0&&(delete r.g[h],r.h--))}}function As(r,l,h,f){for(var T=0;T<r.length;++T){var S=r[T];if(!S.da&&S.listener==l&&S.capture==!!h&&S.ha==f)return T}return-1}var Rs="closure_lm_"+(1e6*Math.random()|0),ks={};function Vo(r,l,h,f,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)Vo(r,l[S],h,f,T);return null}return h=jo(h),r&&r[oi]?r.K(l,h,d(f)?!!f.capture:!1,T):Mu(r,l,h,!1,f,T)}function Mu(r,l,h,f,T,S){if(!l)throw Error("Invalid event type");var k=d(T)?!!T.capture:!!T,j=Ns(r);if(j||(r[Rs]=j=new li(r)),h=j.add(l,h,f,k,S),h.proxy)return h;if(f=Lu(),h.proxy=f,f.src=r,f.listener=h,r.addEventListener)Pu||(T=k),T===void 0&&(T=!1),r.addEventListener(l.toString(),f,T);else if(r.attachEvent)r.attachEvent(Ho(l.toString()),f);else if(r.addListener&&r.removeListener)r.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Lu(){function r(h){return l.call(r.src,r.listener,h)}const l=xu;return r}function Wo(r,l,h,f,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)Wo(r,l[S],h,f,T);else f=d(f)?!!f.capture:!!f,h=jo(h),r&&r[oi]?(r=r.i,l=String(l).toString(),l in r.g&&(S=r.g[l],h=As(S,h,f,T),-1<h&&(ai(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete r.g[l],r.h--)))):r&&(r=Ns(r))&&(l=r.g[l.toString()],r=-1,l&&(r=As(l,h,f,T)),(h=-1<r?l[r]:null)&&Ps(h))}function Ps(r){if(typeof r!="number"&&r&&!r.da){var l=r.src;if(l&&l[oi])bs(l.i,r);else{var h=r.type,f=r.proxy;l.removeEventListener?l.removeEventListener(h,f,r.capture):l.detachEvent?l.detachEvent(Ho(h),f):l.addListener&&l.removeListener&&l.removeListener(f),(h=Ns(l))?(bs(h,r),h.h==0&&(h.src=null,l[Rs]=null)):ai(r)}}}function Ho(r){return r in ks?ks[r]:ks[r]="on"+r}function xu(r,l){if(r.da)r=!0;else{l=new un(l,this);var h=r.listener,f=r.ha||r.src;r.fa&&Ps(r),r=h.call(f,l)}return r}function Ns(r){return r=r[Rs],r instanceof li?r:null}var Os="__closure_events_fn_"+(1e9*Math.random()>>>0);function jo(r){return typeof r=="function"?r:(r[Os]||(r[Os]=function(l){return r.handleEvent(l)}),r[Os])}function le(){tt.call(this),this.i=new li(this),this.M=this,this.F=null}b(le,tt),le.prototype[oi]=!0,le.prototype.removeEventListener=function(r,l,h,f){Wo(this,r,l,h,f)};function ue(r,l){var h,f=r.F;if(f)for(h=[];f;f=f.F)h.push(f);if(r=r.M,f=l.type||l,typeof l=="string")l=new ae(l,r);else if(l instanceof ae)l.target=l.target||r;else{var T=l;l=new ae(f,r),y(l,T)}if(T=!0,h)for(var S=h.length-1;0<=S;S--){var k=l.g=h[S];T=ci(k,f,!0,l)&&T}if(k=l.g=r,T=ci(k,f,!0,l)&&T,T=ci(k,f,!1,l)&&T,h)for(S=0;S<h.length;S++)k=l.g=h[S],T=ci(k,f,!1,l)&&T}le.prototype.N=function(){if(le.aa.N.call(this),this.i){var r=this.i,l;for(l in r.g){for(var h=r.g[l],f=0;f<h.length;f++)ai(h[f]);delete r.g[l],r.h--}}this.F=null},le.prototype.K=function(r,l,h,f){return this.i.add(String(r),l,!1,h,f)},le.prototype.L=function(r,l,h,f){return this.i.add(String(r),l,!0,h,f)};function ci(r,l,h,f){if(l=r.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var k=l[S];if(k&&!k.da&&k.capture==h){var j=k.listener,se=k.ha||k.src;k.fa&&bs(r.i,k),T=j.call(se,f)!==!1&&T}}return T&&!f.defaultPrevented}function $o(r,l,h){if(typeof r=="function")h&&(r=I(r,h));else if(r&&typeof r.handleEvent=="function")r=I(r.handleEvent,r);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(r,l||0)}function Go(r){r.g=$o(()=>{r.g=null,r.i&&(r.i=!1,Go(r))},r.l);const l=r.h;r.h=null,r.m.apply(null,l)}class Fu extends tt{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Go(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function dn(r){tt.call(this),this.h=r,this.g={}}b(dn,tt);var zo=[];function qo(r){te(r.g,function(l,h){this.g.hasOwnProperty(h)&&Ps(l)},r),r.g={}}dn.prototype.N=function(){dn.aa.N.call(this),qo(this)},dn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ds=c.JSON.stringify,Uu=c.JSON.parse,Bu=class{stringify(r){return c.JSON.stringify(r,void 0)}parse(r){return c.JSON.parse(r,void 0)}};function Ms(){}Ms.prototype.h=null;function Ko(r){return r.h||(r.h=r.i())}function Vu(){}var fn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ls(){ae.call(this,"d")}b(Ls,ae);function xs(){ae.call(this,"c")}b(xs,ae);var Ft={},Yo=null;function Fs(){return Yo=Yo||new le}Ft.La="serverreachability";function Xo(r){ae.call(this,Ft.La,r)}b(Xo,ae);function pn(r){const l=Fs();ue(l,new Xo(l))}Ft.STAT_EVENT="statevent";function Jo(r,l){ae.call(this,Ft.STAT_EVENT,r),this.stat=l}b(Jo,ae);function de(r){const l=Fs();ue(l,new Jo(l,r))}Ft.Ma="timingevent";function Qo(r,l){ae.call(this,Ft.Ma,r),this.size=l}b(Qo,ae);function gn(r,l){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){r()},l)}function _n(){this.g=!0}_n.prototype.xa=function(){this.g=!1};function Wu(r,l,h,f,T,S){r.info(function(){if(r.g)if(S)for(var k="",j=S.split("&"),se=0;se<j.length;se++){var U=j[se].split("=");if(1<U.length){var ce=U[0];U=U[1];var he=ce.split("_");k=2<=he.length&&he[1]=="type"?k+(ce+"="+U+"&"):k+(ce+"=redacted&")}}else k=null;else k=S;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+h+`
`+k})}function Hu(r,l,h,f,T,S,k){r.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+h+`
`+S+" "+k})}function Ut(r,l,h,f){r.info(function(){return"XMLHTTP TEXT ("+l+"): "+$u(r,h)+(f?" "+f:"")})}function ju(r,l){r.info(function(){return"TIMEOUT: "+l})}_n.prototype.info=function(){};function $u(r,l){if(!r.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(r=0;r<h.length;r++)if(Array.isArray(h[r])){var f=h[r];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var k=1;k<T.length;k++)T[k]=""}}}}return Ds(h)}catch{return l}}var Us={NO_ERROR:0,TIMEOUT:8},Gu={},Bs;function hi(){}b(hi,Ms),hi.prototype.g=function(){return new XMLHttpRequest},hi.prototype.i=function(){return{}},Bs=new hi;function nt(r,l,h,f){this.j=r,this.i=l,this.l=h,this.R=f||1,this.U=new dn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Zo}function Zo(){this.i=null,this.g="",this.h=!1}var ea={},Vs={};function Ws(r,l,h){r.L=1,r.v=pi(Ge(l)),r.m=h,r.P=!0,ta(r,null)}function ta(r,l){r.F=Date.now(),ui(r),r.A=Ge(r.v);var h=r.A,f=r.R;Array.isArray(f)||(f=[String(f)]),ga(h.i,"t",f),r.C=0,h=r.j.J,r.h=new Zo,r.g=Da(r.j,h?l:null,!r.m),0<r.O&&(r.M=new Fu(I(r.Y,r,r.g),r.O)),l=r.U,h=r.g,f=r.ca;var T="readystatechange";Array.isArray(T)||(T&&(zo[0]=T.toString()),T=zo);for(var S=0;S<T.length;S++){var k=Vo(h,T[S],f||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=r.H?p(r.H):{},r.m?(r.u||(r.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.A,r.u,r.m,l)):(r.u="GET",r.g.ea(r.A,r.u,null,l)),pn(),Wu(r.i,r.u,r.A,r.l,r.R,r.m)}nt.prototype.ca=function(r){r=r.target;const l=this.M;l&&ze(r)==3?l.j():this.Y(r)},nt.prototype.Y=function(r){try{if(r==this.g)e:{const he=ze(this.g);var l=this.g.Ba();const Wt=this.g.Z();if(!(3>he)&&(he!=3||this.g&&(this.h.h||this.g.oa()||Ia(this.g)))){this.J||he!=4||l==7||(l==8||0>=Wt?pn(3):pn(2)),Hs(this);var h=this.g.Z();this.X=h;t:if(na(this)){var f=Ia(this.g);r="";var T=f.length,S=ze(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Et(this),mn(this);var k="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,r+=this.h.i.decode(f[l],{stream:!(S&&l==T-1)});f.length=0,this.h.g+=r,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=h==200,Hu(this.i,this.u,this.A,this.l,this.R,he,h),this.o){if(this.T&&!this.K){t:{if(this.g){var j,se=this.g;if((j=se.g?se.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(j)){var U=j;break t}}U=null}if(h=U)Ut(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,js(this,h);else{this.o=!1,this.s=3,de(12),Et(this),mn(this);break e}}if(this.P){h=!0;let Se;for(;!this.J&&this.C<k.length;)if(Se=zu(this,k),Se==Vs){he==4&&(this.s=4,de(14),h=!1),Ut(this.i,this.l,null,"[Incomplete Response]");break}else if(Se==ea){this.s=4,de(15),Ut(this.i,this.l,k,"[Invalid Chunk]"),h=!1;break}else Ut(this.i,this.l,Se,null),js(this,Se);if(na(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),he!=4||k.length!=0||this.h.h||(this.s=1,de(16),h=!1),this.o=this.o&&h,!h)Ut(this.i,this.l,k,"[Invalid Chunked Response]"),Et(this),mn(this);else if(0<k.length&&!this.W){this.W=!0;var ce=this.j;ce.g==this&&ce.ba&&!ce.M&&(ce.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),Ys(ce),ce.M=!0,de(11))}}else Ut(this.i,this.l,k,null),js(this,k);he==4&&Et(this),this.o&&!this.J&&(he==4?ka(this.j,this):(this.o=!1,ui(this)))}else cd(this.g),h==400&&0<k.indexOf("Unknown SID")?(this.s=3,de(12)):(this.s=0,de(13)),Et(this),mn(this)}}}catch{}finally{}};function na(r){return r.g?r.u=="GET"&&r.L!=2&&r.j.Ca:!1}function zu(r,l){var h=r.C,f=l.indexOf(`
`,h);return f==-1?Vs:(h=Number(l.substring(h,f)),isNaN(h)?ea:(f+=1,f+h>l.length?Vs:(l=l.slice(f,f+h),r.C=f+h,l)))}nt.prototype.cancel=function(){this.J=!0,Et(this)};function ui(r){r.S=Date.now()+r.I,ia(r,r.I)}function ia(r,l){if(r.B!=null)throw Error("WatchDog timer not null");r.B=gn(I(r.ba,r),l)}function Hs(r){r.B&&(c.clearTimeout(r.B),r.B=null)}nt.prototype.ba=function(){this.B=null;const r=Date.now();0<=r-this.S?(ju(this.i,this.A),this.L!=2&&(pn(),de(17)),Et(this),this.s=2,mn(this)):ia(this,this.S-r)};function mn(r){r.j.G==0||r.J||ka(r.j,r)}function Et(r){Hs(r);var l=r.M;l&&typeof l.ma=="function"&&l.ma(),r.M=null,qo(r.U),r.g&&(l=r.g,r.g=null,l.abort(),l.ma())}function js(r,l){try{var h=r.j;if(h.G!=0&&(h.g==r||$s(h.h,r))){if(!r.K&&$s(h.h,r)&&h.G==3){try{var f=h.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<r.F)Ei(h),vi(h);else break e;Ks(h),de(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=gn(I(h.Za,h),6e3));if(1>=oa(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else It(h,11)}else if((r.K||h.g==r)&&Ei(h),!Q(l))for(T=h.Da.g.parse(l),l=0;l<T.length;l++){let U=T[l];if(h.T=U[0],U=U[1],h.G==2)if(U[0]=="c"){h.K=U[1],h.ia=U[2];const ce=U[3];ce!=null&&(h.la=ce,h.j.info("VER="+h.la));const he=U[4];he!=null&&(h.Aa=he,h.j.info("SVER="+h.Aa));const Wt=U[5];Wt!=null&&typeof Wt=="number"&&0<Wt&&(f=1.5*Wt,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Se=r.g;if(Se){const wi=Se.g?Se.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(wi){var S=f.h;S.g||wi.indexOf("spdy")==-1&&wi.indexOf("quic")==-1&&wi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Gs(S,S.h),S.h=null))}if(f.D){const Xs=Se.g?Se.g.getResponseHeader("X-HTTP-Session-Id"):null;Xs&&(f.ya=Xs,q(f.I,f.D,Xs))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-r.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var k=r;if(f.qa=Oa(f,f.J?f.ia:null,f.W),k.K){aa(f.h,k);var j=k,se=f.L;se&&(j.I=se),j.B&&(Hs(j),ui(j)),f.g=k}else Aa(f);0<h.i.length&&yi(h)}else U[0]!="stop"&&U[0]!="close"||It(h,7);else h.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?It(h,7):qs(h):U[0]!="noop"&&h.l&&h.l.ta(U),h.v=0)}}pn(4)}catch{}}var qu=class{constructor(r,l){this.g=r,this.map=l}};function sa(r){this.l=r||10,c.PerformanceNavigationTiming?(r=c.performance.getEntriesByType("navigation"),r=0<r.length&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ra(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function oa(r){return r.h?1:r.g?r.g.size:0}function $s(r,l){return r.h?r.h==l:r.g?r.g.has(l):!1}function Gs(r,l){r.g?r.g.add(l):r.h=l}function aa(r,l){r.h&&r.h==l?r.h=null:r.g&&r.g.has(l)&&r.g.delete(l)}sa.prototype.cancel=function(){if(this.i=la(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function la(r){if(r.h!=null)return r.i.concat(r.h.D);if(r.g!=null&&r.g.size!==0){let l=r.i;for(const h of r.g.values())l=l.concat(h.D);return l}return N(r.i)}function Ku(r){if(r.V&&typeof r.V=="function")return r.V();if(typeof Map<"u"&&r instanceof Map||typeof Set<"u"&&r instanceof Set)return Array.from(r.values());if(typeof r=="string")return r.split("");if(u(r)){for(var l=[],h=r.length,f=0;f<h;f++)l.push(r[f]);return l}l=[],h=0;for(f in r)l[h++]=r[f];return l}function Yu(r){if(r.na&&typeof r.na=="function")return r.na();if(!r.V||typeof r.V!="function"){if(typeof Map<"u"&&r instanceof Map)return Array.from(r.keys());if(!(typeof Set<"u"&&r instanceof Set)){if(u(r)||typeof r=="string"){var l=[];r=r.length;for(var h=0;h<r;h++)l.push(h);return l}l=[],h=0;for(const f in r)l[h++]=f;return l}}}function ca(r,l){if(r.forEach&&typeof r.forEach=="function")r.forEach(l,void 0);else if(u(r)||typeof r=="string")Array.prototype.forEach.call(r,l,void 0);else for(var h=Yu(r),f=Ku(r),T=f.length,S=0;S<T;S++)l.call(void 0,f[S],h&&h[S],r)}var ha=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xu(r,l){if(r){r=r.split("&");for(var h=0;h<r.length;h++){var f=r[h].indexOf("="),T=null;if(0<=f){var S=r[h].substring(0,f);T=r[h].substring(f+1)}else S=r[h];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function wt(r){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,r instanceof wt){this.h=r.h,di(this,r.j),this.o=r.o,this.g=r.g,fi(this,r.s),this.l=r.l;var l=r.i,h=new En;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),ua(this,h),this.m=r.m}else r&&(l=String(r).match(ha))?(this.h=!1,di(this,l[1]||"",!0),this.o=vn(l[2]||""),this.g=vn(l[3]||"",!0),fi(this,l[4]),this.l=vn(l[5]||"",!0),ua(this,l[6]||"",!0),this.m=vn(l[7]||"")):(this.h=!1,this.i=new En(null,this.h))}wt.prototype.toString=function(){var r=[],l=this.j;l&&r.push(yn(l,da,!0),":");var h=this.g;return(h||l=="file")&&(r.push("//"),(l=this.o)&&r.push(yn(l,da,!0),"@"),r.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&r.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&r.push("/"),r.push(yn(h,h.charAt(0)=="/"?Zu:Qu,!0))),(h=this.i.toString())&&r.push("?",h),(h=this.m)&&r.push("#",yn(h,td)),r.join("")};function Ge(r){return new wt(r)}function di(r,l,h){r.j=h?vn(l,!0):l,r.j&&(r.j=r.j.replace(/:$/,""))}function fi(r,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);r.s=l}else r.s=null}function ua(r,l,h){l instanceof En?(r.i=l,nd(r.i,r.h)):(h||(l=yn(l,ed)),r.i=new En(l,r.h))}function q(r,l,h){r.i.set(l,h)}function pi(r){return q(r,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),r}function vn(r,l){return r?l?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function yn(r,l,h){return typeof r=="string"?(r=encodeURI(r).replace(l,Ju),h&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Ju(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var da=/[#\/\?@]/g,Qu=/[#\?:]/g,Zu=/[#\?]/g,ed=/[#\?@]/g,td=/#/g;function En(r,l){this.h=this.g=null,this.i=r||null,this.j=!!l}function it(r){r.g||(r.g=new Map,r.h=0,r.i&&Xu(r.i,function(l,h){r.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=En.prototype,n.add=function(r,l){it(this),this.i=null,r=Bt(this,r);var h=this.g.get(r);return h||this.g.set(r,h=[]),h.push(l),this.h+=1,this};function fa(r,l){it(r),l=Bt(r,l),r.g.has(l)&&(r.i=null,r.h-=r.g.get(l).length,r.g.delete(l))}function pa(r,l){return it(r),l=Bt(r,l),r.g.has(l)}n.forEach=function(r,l){it(this),this.g.forEach(function(h,f){h.forEach(function(T){r.call(l,T,f,this)},this)},this)},n.na=function(){it(this);const r=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let f=0;f<l.length;f++){const T=r[f];for(let S=0;S<T.length;S++)h.push(l[f])}return h},n.V=function(r){it(this);let l=[];if(typeof r=="string")pa(this,r)&&(l=l.concat(this.g.get(Bt(this,r))));else{r=Array.from(this.g.values());for(let h=0;h<r.length;h++)l=l.concat(r[h])}return l},n.set=function(r,l){return it(this),this.i=null,r=Bt(this,r),pa(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[l]),this.h+=1,this},n.get=function(r,l){return r?(r=this.V(r),0<r.length?String(r[0]):l):l};function ga(r,l,h){fa(r,l),0<h.length&&(r.i=null,r.g.set(Bt(r,l),N(h)),r.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var f=l[h];const S=encodeURIComponent(String(f)),k=this.V(f);for(f=0;f<k.length;f++){var T=S;k[f]!==""&&(T+="="+encodeURIComponent(String(k[f]))),r.push(T)}}return this.i=r.join("&")};function Bt(r,l){return l=String(l),r.j&&(l=l.toLowerCase()),l}function nd(r,l){l&&!r.j&&(it(r),r.i=null,r.g.forEach(function(h,f){var T=f.toLowerCase();f!=T&&(fa(this,f),ga(this,T,h))},r)),r.j=l}function id(r,l){const h=new _n;if(c.Image){const f=new Image;f.onload=R(st,h,"TestLoadImage: loaded",!0,l,f),f.onerror=R(st,h,"TestLoadImage: error",!1,l,f),f.onabort=R(st,h,"TestLoadImage: abort",!1,l,f),f.ontimeout=R(st,h,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=r}else l(!1)}function sd(r,l){const h=new _n,f=new AbortController,T=setTimeout(()=>{f.abort(),st(h,"TestPingServer: timeout",!1,l)},1e4);fetch(r,{signal:f.signal}).then(S=>{clearTimeout(T),S.ok?st(h,"TestPingServer: ok",!0,l):st(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),st(h,"TestPingServer: error",!1,l)})}function st(r,l,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch{}}function rd(){this.g=new Bu}function od(r,l,h){const f=h||"";try{ca(r,function(T,S){let k=T;d(T)&&(k=Ds(T)),l.push(f+S+"="+encodeURIComponent(k))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function gi(r){this.l=r.Ub||null,this.j=r.eb||!1}b(gi,Ms),gi.prototype.g=function(){return new _i(this.l,this.j)},gi.prototype.i=function(r){return function(){return r}}({});function _i(r,l){le.call(this),this.D=r,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(_i,le),n=_i.prototype,n.open=function(r,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=r,this.A=l,this.readyState=1,In(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};r&&(l.body=r),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,wn(this)),this.readyState=0},n.Sa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,In(this)),this.g&&(this.readyState=3,In(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_a(this)}else r.text().then(this.Ra.bind(this),this.ga.bind(this))};function _a(r){r.j.read().then(r.Pa.bind(r)).catch(r.ga.bind(r))}n.Pa=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var l=r.value?r.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!r.done}))&&(this.response=this.responseText+=l)}r.done?wn(this):In(this),this.readyState==3&&_a(this)}},n.Ra=function(r){this.g&&(this.response=this.responseText=r,wn(this))},n.Qa=function(r){this.g&&(this.response=r,wn(this))},n.ga=function(){this.g&&wn(this)};function wn(r){r.readyState=4,r.l=null,r.j=null,r.v=null,In(r)}n.setRequestHeader=function(r,l){this.u.append(r,l)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,r.push(h[0]+": "+h[1]),h=l.next();return r.join(`\r
`)};function In(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(_i.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function ma(r){let l="";return te(r,function(h,f){l+=f,l+=":",l+=h,l+=`\r
`}),l}function zs(r,l,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=ma(h),typeof r=="string"?h!=null&&encodeURIComponent(String(h)):q(r,l,h))}function J(r){le.call(this),this.headers=new Map,this.o=r||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(J,le);var ad=/^https?$/i,ld=["POST","PUT"];n=J.prototype,n.Ha=function(r){this.J=r},n.ea=function(r,l,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);l=l?l.toUpperCase():"GET",this.D=r,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Bs.g(),this.v=this.o?Ko(this.o):Ko(Bs),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(l,String(r),!0),this.B=!1}catch(S){va(this,S);return}if(r=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&r instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ld,l,void 0))||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,k]of h)this.g.setRequestHeader(S,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wa(this),this.u=!0,this.g.send(r),this.u=!1}catch(S){va(this,S)}};function va(r,l){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=l,r.m=5,ya(r),mi(r)}function ya(r){r.A||(r.A=!0,ue(r,"complete"),ue(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=r||7,ue(this,"complete"),ue(this,"abort"),mi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),mi(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ea(this):this.bb())},n.bb=function(){Ea(this)};function Ea(r){if(r.h&&typeof a<"u"&&(!r.v[1]||ze(r)!=4||r.Z()!=2)){if(r.u&&ze(r)==4)$o(r.Ea,0,r);else if(ue(r,"readystatechange"),ze(r)==4){r.h=!1;try{const k=r.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var f;if(f=k===0){var T=String(r.D).match(ha)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!ad.test(T?T.toLowerCase():"")}h=f}if(h)ue(r,"complete"),ue(r,"success");else{r.m=6;try{var S=2<ze(r)?r.g.statusText:""}catch{S=""}r.l=S+" ["+r.Z()+"]",ya(r)}}finally{mi(r)}}}}function mi(r,l){if(r.g){wa(r);const h=r.g,f=r.v[0]?()=>{}:null;r.g=null,r.v=null,l||ue(r,"ready");try{h.onreadystatechange=f}catch{}}}function wa(r){r.I&&(c.clearTimeout(r.I),r.I=null)}n.isActive=function(){return!!this.g};function ze(r){return r.g?r.g.readyState:0}n.Z=function(){try{return 2<ze(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(r){if(this.g){var l=this.g.responseText;return r&&l.indexOf(r)==0&&(l=l.substring(r.length)),Uu(l)}};function Ia(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.H){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function cd(r){const l={};r=(r.g&&2<=ze(r)&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<r.length;f++){if(Q(r[f]))continue;var h=E(r[f]);const T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=l[T]||[];l[T]=S,S.push(h)}w(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Tn(r,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[r]||l}function Ta(r){this.Aa=0,this.i=[],this.j=new _n,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Tn("failFast",!1,r),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Tn("baseRetryDelayMs",5e3,r),this.cb=Tn("retryDelaySeedMs",1e4,r),this.Wa=Tn("forwardChannelMaxRetries",2,r),this.wa=Tn("forwardChannelRequestTimeoutMs",2e4,r),this.pa=r&&r.xmlHttpFactory||void 0,this.Xa=r&&r.Tb||void 0,this.Ca=r&&r.useFetchStreams||!1,this.L=void 0,this.J=r&&r.supportsCrossDomainXhr||!1,this.K="",this.h=new sa(r&&r.concurrentRequestLimit),this.Da=new rd,this.P=r&&r.fastHandshake||!1,this.O=r&&r.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=r&&r.Rb||!1,r&&r.xa&&this.j.xa(),r&&r.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&r&&r.detectBufferingProxy||!1,this.ja=void 0,r&&r.longPollingTimeout&&0<r.longPollingTimeout&&(this.ja=r.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ta.prototype,n.la=8,n.G=1,n.connect=function(r,l,h,f){de(0),this.W=r,this.H=l||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Oa(this,null,this.W),yi(this)};function qs(r){if(Ca(r),r.G==3){var l=r.U++,h=Ge(r.I);if(q(h,"SID",r.K),q(h,"RID",l),q(h,"TYPE","terminate"),Cn(r,h),l=new nt(r,r.j,l),l.L=2,l.v=pi(Ge(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Da(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ui(l)}Na(r)}function vi(r){r.g&&(Ys(r),r.g.cancel(),r.g=null)}function Ca(r){vi(r),r.u&&(c.clearTimeout(r.u),r.u=null),Ei(r),r.h.cancel(),r.s&&(typeof r.s=="number"&&c.clearTimeout(r.s),r.s=null)}function yi(r){if(!ra(r.h)&&!r.s){r.s=!0;var l=r.Ga;cn||Bo(),hn||(cn(),hn=!0),Ss.add(l,r),r.B=0}}function hd(r,l){return oa(r.h)>=r.h.j-(r.s?1:0)?!1:r.s?(r.i=l.D.concat(r.i),!0):r.G==1||r.G==2||r.B>=(r.Va?0:r.Wa)?!1:(r.s=gn(I(r.Ga,r,l),Pa(r,r.B)),r.B++,!0)}n.Ga=function(r){if(this.s)if(this.s=null,this.G==1){if(!r){this.U=Math.floor(1e5*Math.random()),r=this.U++;const T=new nt(this,this.j,r);let S=this.o;if(this.S&&(S?(S=p(S),y(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=ba(this,T,l),h=Ge(this.I),q(h,"RID",r),q(h,"CVER",22),this.D&&q(h,"X-HTTP-Session-Id",this.D),Cn(this,h),S&&(this.O?l="headers="+encodeURIComponent(String(ma(S)))+"&"+l:this.m&&zs(h,this.m,S)),Gs(this.h,T),this.Ua&&q(h,"TYPE","init"),this.P?(q(h,"$req",l),q(h,"SID","null"),T.T=!0,Ws(T,h,null)):Ws(T,h,l),this.G=2}}else this.G==3&&(r?Sa(this,r):this.i.length==0||ra(this.h)||Sa(this))};function Sa(r,l){var h;l?h=l.l:h=r.U++;const f=Ge(r.I);q(f,"SID",r.K),q(f,"RID",h),q(f,"AID",r.T),Cn(r,f),r.m&&r.o&&zs(f,r.m,r.o),h=new nt(r,r.j,h,r.B+1),r.m===null&&(h.H=r.o),l&&(r.i=l.D.concat(r.i)),l=ba(r,h,1e3),h.I=Math.round(.5*r.wa)+Math.round(.5*r.wa*Math.random()),Gs(r.h,h),Ws(h,f,l)}function Cn(r,l){r.H&&te(r.H,function(h,f){q(l,f,h)}),r.l&&ca({},function(h,f){q(l,f,h)})}function ba(r,l,h){h=Math.min(r.i.length,h);var f=r.l?I(r.l.Na,r.l,r):null;e:{var T=r.i;let S=-1;for(;;){const k=["count="+h];S==-1?0<h?(S=T[0].g,k.push("ofs="+S)):S=0:k.push("ofs="+S);let j=!0;for(let se=0;se<h;se++){let U=T[se].g;const ce=T[se].map;if(U-=S,0>U)S=Math.max(0,T[se].g-100),j=!1;else try{od(ce,k,"req"+U+"_")}catch{f&&f(ce)}}if(j){f=k.join("&");break e}}}return r=r.i.splice(0,h),l.D=r,f}function Aa(r){if(!r.g&&!r.u){r.Y=1;var l=r.Fa;cn||Bo(),hn||(cn(),hn=!0),Ss.add(l,r),r.v=0}}function Ks(r){return r.g||r.u||3<=r.v?!1:(r.Y++,r.u=gn(I(r.Fa,r),Pa(r,r.v)),r.v++,!0)}n.Fa=function(){if(this.u=null,Ra(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var r=2*this.R;this.j.info("BP detection timer enabled: "+r),this.A=gn(I(this.ab,this),r)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,de(10),vi(this),Ra(this))};function Ys(r){r.A!=null&&(c.clearTimeout(r.A),r.A=null)}function Ra(r){r.g=new nt(r,r.j,"rpc",r.Y),r.m===null&&(r.g.H=r.o),r.g.O=0;var l=Ge(r.qa);q(l,"RID","rpc"),q(l,"SID",r.K),q(l,"AID",r.T),q(l,"CI",r.F?"0":"1"),!r.F&&r.ja&&q(l,"TO",r.ja),q(l,"TYPE","xmlhttp"),Cn(r,l),r.m&&r.o&&zs(l,r.m,r.o),r.L&&(r.g.I=r.L);var h=r.g;r=r.ia,h.L=1,h.v=pi(Ge(l)),h.m=null,h.P=!0,ta(h,r)}n.Za=function(){this.C!=null&&(this.C=null,vi(this),Ks(this),de(19))};function Ei(r){r.C!=null&&(c.clearTimeout(r.C),r.C=null)}function ka(r,l){var h=null;if(r.g==l){Ei(r),Ys(r),r.g=null;var f=2}else if($s(r.h,l))h=l.D,aa(r.h,l),f=1;else return;if(r.G!=0){if(l.o)if(f==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var T=r.B;f=Fs(),ue(f,new Qo(f,h)),yi(r)}else Aa(r);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&hd(r,l)||f==2&&Ks(r)))switch(h&&0<h.length&&(l=r.h,l.i=l.i.concat(h)),T){case 1:It(r,5);break;case 4:It(r,10);break;case 3:It(r,6);break;default:It(r,2)}}}function Pa(r,l){let h=r.Ta+Math.floor(Math.random()*r.cb);return r.isActive()||(h*=2),h*l}function It(r,l){if(r.j.info("Error code "+l),l==2){var h=I(r.fb,r),f=r.Xa;const T=!f;f=new wt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||di(f,"https"),pi(f),T?id(f.toString(),h):sd(f.toString(),h)}else de(2);r.G=0,r.l&&r.l.sa(l),Na(r),Ca(r)}n.fb=function(r){r?(this.j.info("Successfully pinged google.com"),de(2)):(this.j.info("Failed to ping google.com"),de(1))};function Na(r){if(r.G=0,r.ka=[],r.l){const l=la(r.h);(l.length!=0||r.i.length!=0)&&(P(r.ka,l),P(r.ka,r.i),r.h.i.length=0,N(r.i),r.i.length=0),r.l.ra()}}function Oa(r,l,h){var f=h instanceof wt?Ge(h):new wt(h);if(f.g!="")l&&(f.g=l+"."+f.g),fi(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new wt(null);f&&di(S,f),l&&(S.g=l),T&&fi(S,T),h&&(S.l=h),f=S}return h=r.D,l=r.ya,h&&l&&q(f,h,l),q(f,"VER",r.la),Cn(r,f),f}function Da(r,l,h){if(l&&!r.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=r.Ca&&!r.pa?new J(new gi({eb:h})):new J(r.pa),l.Ha(r.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ma(){}n=Ma.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ie(r,l){le.call(this),this.g=new Ta(l),this.l=r,this.h=l&&l.messageUrlParams||null,r=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(r?r["X-WebChannel-Content-Type"]=l.messageContentType:r={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(r?r["X-WebChannel-Client-Profile"]=l.va:r={"X-WebChannel-Client-Profile":l.va}),this.g.S=r,(r=l&&l.Sb)&&!Q(r)&&(this.g.m=r),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!Q(l)&&(this.g.D=l,r=this.h,r!==null&&l in r&&(r=this.h,l in r&&delete r[l])),this.j=new Vt(this)}b(Ie,le),Ie.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ie.prototype.close=function(){qs(this.g)},Ie.prototype.o=function(r){var l=this.g;if(typeof r=="string"){var h={};h.__data__=r,r=h}else this.u&&(h={},h.__data__=Ds(r),r=h);l.i.push(new qu(l.Ya++,r)),l.G==3&&yi(l)},Ie.prototype.N=function(){this.g.l=null,delete this.j,qs(this.g),delete this.g,Ie.aa.N.call(this)};function La(r){Ls.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var l=r.__sm__;if(l){e:{for(const h in l){r=h;break e}r=void 0}(this.i=r)&&(r=this.i,l=l!==null&&r in l?l[r]:void 0),this.data=l}else this.data=r}b(La,Ls);function xa(){xs.call(this),this.status=1}b(xa,xs);function Vt(r){this.g=r}b(Vt,Ma),Vt.prototype.ua=function(){ue(this.g,"a")},Vt.prototype.ta=function(r){ue(this.g,new La(r))},Vt.prototype.sa=function(r){ue(this.g,new xa)},Vt.prototype.ra=function(){ue(this.g,"b")},Ie.prototype.send=Ie.prototype.o,Ie.prototype.open=Ie.prototype.m,Ie.prototype.close=Ie.prototype.close,Us.NO_ERROR=0,Us.TIMEOUT=8,Us.HTTP_ERROR=6,Gu.COMPLETE="complete",Vu.EventType=fn,fn.OPEN="a",fn.CLOSE="b",fn.ERROR="c",fn.MESSAGE="d",le.prototype.listen=le.prototype.K,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha}).apply(typeof Ri<"u"?Ri:typeof self<"u"?self:typeof window<"u"?window:{});const Yl="@firebase/firestore",Xl="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ts="11.6.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=new Yn("@firebase/firestore");function Ne(n,...e){if(ss.logLevel<=V.DEBUG){const t=e.map(Cu);ss.debug(`Firestore (${Ts}): ${n}`,...t)}}function Tu(n,...e){if(ss.logLevel<=V.ERROR){const t=e.map(Cu);ss.error(`Firestore (${Ts}): ${n}`,...t)}}function Cu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,Su(n,i,t)}function Su(n,e,t){let i=`FIRESTORE (${Ts}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw Tu(i),new Error(i)}function xn(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||Su(e,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class Re extends We{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class By{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ve.UNAUTHENTICATED))}shutdown(){}}class Wy{constructor(e){this.t=e,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){xn(this.o===void 0,42304);let i=this.i;const s=u=>this.i!==i?(i=this.i,t(u)):Promise.resolve();let o=new Fn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Fn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=o;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{Ne("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(Ne("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Fn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(Ne("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(xn(typeof i.accessToken=="string",31837,{l:i}),new By(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xn(e===null||typeof e=="string",2055,{h:e}),new ve(e)}}class Hy{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class jy{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new Hy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Jl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $y{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ye(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){xn(this.o===void 0,3512);const i=o=>{o.error!=null&&Ne("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,Ne("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const s=o=>{Ne("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):Ne("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Jl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(xn(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Jl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Gy(n){return n.name==="IndexedDbTransactionError"}const Ql="(default)";class rs{constructor(e,t){this.projectId=e,this.database=t||Ql}static empty(){return new rs("","")}get isDefaultDatabase(){return this.database===Ql}isEqual(e){return e instanceof rs&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zl,F;(F=Zl||(Zl={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Iu([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=1048576;function ur(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(e,t,i=1e3,s=1.5,o=6e4){this.bi=e,this.timerId=t,this.u_=i,this.c_=s,this.l_=o,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();const t=Math.floor(this.h_+this.d_()),i=Math.max(0,Date.now()-this.T_),s=Math.max(0,t-i);s>0&&Ne("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.h_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,s,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t,i,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=o,this.deferred=new Fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,o){const a=Date.now()+i,c=new Uo(e,t,a,s,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Re(Ae.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var ec,tc;(tc=ec||(ec={})).ya="default",tc.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc=new Map;function Xy(n,e,t,i){if(e===!0&&i===!0)throw new Re(Ae.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="firestore.googleapis.com",ic=!0;class sc{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new Re(Ae.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jy,this.ssl=ic}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ic;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=zy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qy)throw new Re(Ae.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Xy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yy((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new Re(Ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new Re(Ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new Re(Ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qy{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Re(Ae.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Re(Ae.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sc(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new Vy;switch(i.type){case"firstParty":return new jy(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new Re(Ae.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=nc.get(t);i&&(Ne("ComponentProvider","Removing Datastore"),nc.delete(t),i.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="AsyncQueue";class oc{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new Ky(this,"async_queue_retry"),this.ju=()=>{const i=ur();i&&Ne(rc,"Visibility state changed to "+i.visibilityState),this.y_.A_()},this.Hu=e;const t=ur();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;const t=ur();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});const t=new Fn;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!Gy(e))throw e;Ne(rc,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){const t=this.Hu.then(()=>(this.Wu=!0,e().catch(i=>{throw this.Ku=i,this.Wu=!1,Tu("INTERNAL UNHANDLED ERROR: ",ac(i)),i}).then(i=>(this.Wu=!1,i))));return this.Hu=t,t}enqueueAfterDelay(e,t,i){this.Ju(),this.zu.indexOf(e)>-1&&(t=0);const s=Uo.createAndSchedule(this,e,t,i,o=>this.Xu(o));return this.Uu.push(s),s}Ju(){this.Ku&&Uy(47125,{ec:ac(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(const t of this.Uu)if(t.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{this.Uu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Uu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){const t=this.Uu.indexOf(e);this.Uu.splice(t,1)}}function ac(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Zy extends Qy{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new oc,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new oc(e),this._firestoreClient=void 0,await e}}}(function(e,t=!0){(function(s){Ts=s})(yt),Ue(new Le("firestore",(i,{instanceIdentifier:s,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new Zy(new Wy(i.getProvider("auth-internal")),new $y(a,i.getProvider("app-check-internal")),function(d,v){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new Re(Ae.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rs(d.options.projectId,v)}(a,s),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),Ee(Yl,Xl,e),Ee(Yl,Xl,"esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu="firebasestorage.googleapis.com",eE="storageBucket",tE=2*60*1e3,nE=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends We{constructor(e,t,i=0){super(dr(e),`Firebase Storage: ${t} (${dr(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,je.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return dr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ve;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ve||(Ve={}));function dr(n){return"storage/"+n}function iE(){const n="An unknown error occurred, please check the error payload for server response.";return new je(Ve.UNKNOWN,n)}function sE(){return new je(Ve.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function rE(){return new je(Ve.CANCELED,"User canceled the upload/download.")}function oE(n){return new je(Ve.INVALID_URL,"Invalid URL '"+n+"'.")}function aE(n){return new je(Ve.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function lc(n){return new je(Ve.INVALID_ARGUMENT,n)}function Au(){return new je(Ve.APP_DELETED,"The Firebase app was deleted.")}function lE(n){return new je(Ve.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=Oe.makeFromUrl(e,t)}catch{return new Oe(e,"")}if(i.path==="")return i;throw aE(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function o(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+s+a,"i"),u={bucket:1,path:3};function d(z){z.path_=decodeURIComponent(z.path)}const v="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),I="(/([^?#]*).*)?$",R=new RegExp(`^https?://${m}/${v}/b/${s}/o${I}`,"i"),b={bucket:1,path:3},N=t===bu?"(?:storage.googleapis.com|storage.cloud.google.com)":t,P="([^?#]*)",X=new RegExp(`^https?://${N}/${s}/${P}`,"i"),H=[{regex:c,indices:u,postModify:o},{regex:R,indices:b,postModify:d},{regex:X,indices:{bucket:1,path:2},postModify:d}];for(let z=0;z<H.length;z++){const we=H[z],te=we.regex.exec(e);if(te){const w=te[we.indices.bucket];let p=te[we.indices.path];p||(p=""),i=new Oe(w,p),we.postModify(i);break}}if(i==null)throw oE(e);return i}}class cE{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(n,e,t){let i=1,s=null,o=null,a=!1,c=0;function u(){return c===2}let d=!1;function v(...P){d||(d=!0,e.apply(null,P))}function m(P){s=setTimeout(()=>{s=null,n(R,u())},P)}function I(){o&&clearTimeout(o)}function R(P,...X){if(d){I();return}if(P){I(),v.call(null,P,...X);return}if(u()||a){I(),v.call(null,P,...X);return}i<64&&(i*=2);let H;c===1?(c=2,H=0):H=(i+Math.random())*1e3,m(H)}let b=!1;function N(P){b||(b=!0,I(),!d&&(s!==null?(P||(c=2),clearTimeout(s),m(0)):P||(c=1)))}return m(0),o=setTimeout(()=>{a=!0,N(!0)},t),N}function uE(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dE(n){return n!==void 0}function cc(n,e,t,i){if(i<e)throw lc(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw lc(`Invalid value for '${n}'. Expected ${t} or less.`)}function fE(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var os;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(os||(os={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pE(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,o=e.indexOf(n)!==-1;return t||s||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e,t,i,s,o,a,c,u,d,v,m,I=!0){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=o,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=v,this.connectionFactory_=m,this.retry=I,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,b)=>{this.resolve_=R,this.reject_=b,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new ki(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const a=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&o.addUploadProgressListener(a),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(a),this.pendingConnection_=null;const c=o.getErrorCode()===os.NO_ERROR,u=o.getStatus();if(!c||pE(u,this.additionalRetryCodes_)&&this.retry){const v=o.getErrorCode()===os.ABORT;i(!1,new ki(!1,null,v));return}const d=this.successCodes_.indexOf(u)!==-1;i(!0,new ki(d,o))})},t=(i,s)=>{const o=this.resolve_,a=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());dE(u)?o(u):o()}catch(u){a(u)}else if(c!==null){const u=iE();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(s.canceled){const u=this.appDelete_?Au():rE();a(u)}else{const u=sE();a(u)}};this.canceled_?t(!1,new ki(!1,null,!0)):this.backoffId_=hE(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&uE(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ki{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function _E(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function mE(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function vE(n,e){e&&(n["X-Firebase-GMPID"]=e)}function yE(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function EE(n,e,t,i,s,o,a=!0){const c=fE(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return vE(d,e),_E(d,t),mE(d,o),yE(d,i),new gE(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function IE(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t){this._service=e,t instanceof Oe?this._location=t:this._location=Oe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new as(e,t)}get root(){const e=new Oe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return IE(this._location.path)}get storage(){return this._service}get parent(){const e=wE(this._location.path);if(e===null)return null;const t=new Oe(this._location.bucket,e);return new as(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw lE(e)}}function hc(n,e){const t=e?.[eE];return t==null?null:Oe.makeFromBucketSpec(t,n)}class TE{constructor(e,t,i,s,o){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=o,this._bucket=null,this._host=bu,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=tE,this._maxUploadRetryTime=nE,this._requests=new Set,s!=null?this._bucket=Oe.makeFromBucketSpec(s,this._host):this._bucket=hc(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Oe.makeFromBucketSpec(this._url,e):this._bucket=hc(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){cc("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){cc("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new as(this,e)}_makeRequest(e,t,i,s,o=!0){if(this._deleted)return new cE(Au());{const a=EE(e,this._appId,i,s,t,this._firebaseVersion,o);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const uc="@firebase/storage",dc="0.13.7";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE="storage";function SE(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new TE(t,i,s,e,yt)}function bE(){Ue(new Le(CE,SE,"PUBLIC").setMultipleInstances(!0)),Ee(uc,dc,""),Ee(uc,dc,"esm2017")}bE();function AE(n){return kE({initialUser:n,dependencies:{popupRedirectResolver:vu,persistence:[pu,lu,Lo]}})}const RE=Symbol("VueFireAuth");function kE({dependencies:n,initialUser:e}){return(t,i)=>{const[s,o]=PE(t,i,e,n);Fy(s,o)}}function PE(n,e,t,i,s=tu(n,i)){const o=My(n,e).run(()=>pd(t));return Ly.set(n,o),e.provide(RE,s),[o,s]}function NE(n,{firebaseApp:e,modules:t=[]}){n.provide(wu,e);for(const i of t)i(e,n)}const Cs=Sc({apiKey:"AIzaSyDvaHnSU29r9zc29QkuMsG5A-s2dqPbsIg",authDomain:"jogo-da-memoria-278bd.firebaseapp.com",projectId:"jogo-da-memoria-278bd",storageBucket:"jogo-da-memoria-278bd.appspot.com",messagingSenderId:"1063068944629",appId:"1:1063068944629:web:005f10ea128e68d9245dbc"}),OE=um(Cs),DE=ry(Cs),ME=gd(({app:n})=>{n.use(NE,{firebaseApp:Cs,modules:[AE()]})}),GE=Object.freeze(Object.defineProperty({__proto__:null,auth:DE,db:OE,default:ME,firebaseApp:Cs},Symbol.toStringTag,{value:"Module"}));export{at as G,ry as a,jE as b,$E as c,OE as d,GE as f,BE as g,VE as l,WE as o,HE as q,xE as r,FE as s,UE as u};
