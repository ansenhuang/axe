(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[function(t,n,e){(function(n){var e="object",o=function(t){return t&&t.Math==Math&&t};t.exports=o(typeof globalThis==e&&globalThis)||o(typeof window==e&&window)||o(typeof self==e&&self)||o(typeof n==e&&n)||Function("return this")()}).call(this,e(40))},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var o=e(2);t.exports=function(t){if(!o(t))throw TypeError(String(t)+" is not an object");return t}},function(t,n,e){var o=e(1);t.exports=!o(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,e){var o=e(22),r=e(10);t.exports=function(t){return o(r(t))}},function(t,n,e){var o=e(5),r=e(11),i=e(20);t.exports=o?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports={button:"button--2c6vT",icon:"icon--23pYI","icon-loading":"icon-loading--F3AlX",loading:"loading--2RQzK","icon-success":"icon-success--2X5hZ","icon-error":"icon-error--RsPbN","icon-info":"icon-info--2o9iW","icon-question":"icon-question--1_jyG"}},function(t,n,e){var o=e(0),r=e(19).f,i=e(7),c=e(24),u=e(15),a=e(45),s=e(35);t.exports=function(t,n){var e,f,l,p,d,h=t.target,v=t.global,y=t.stat;if(e=v?o:y?o[h]||u(h,{}):(o[h]||{}).prototype)for(f in n){if(p=n[f],l=t.noTargetGet?(d=r(e,f))&&d.value:e[f],!s(v?f:h+(y?".":"#")+f,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;a(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),c(e,f,p,t)}}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,n,e){var o=e(5),r=e(23),i=e(4),c=e(14),u=Object.defineProperty;n.f=o?u:function(t,n,e){if(i(t),n=c(n,!0),i(e),r)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var o=e(0),r=e(15),i=e(42),c=o["__core-js_shared__"]||r("__core-js_shared__",{});(t.exports=function(t,n){return c[t]||(c[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:i?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var o=e(2);t.exports=function(t,n){if(!o(t))return t;var e,r;if(n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;if("function"==typeof(e=t.valueOf)&&!o(r=e.call(t)))return r;if(!n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){var o=e(0),r=e(7);t.exports=function(t,n){try{r(o,t,n)}catch(e){o[t]=n}return n}},function(t,n,e){var o=e(17),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,n){var e=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:e)(t)}},,function(t,n,e){var o=e(5),r=e(41),i=e(20),c=e(6),u=e(14),a=e(3),s=e(23),f=Object.getOwnPropertyDescriptor;n.f=o?f:function(t,n){if(t=c(t),n=u(n,!0),s)try{return f(t,n)}catch(t){}if(a(t,n))return i(!r.f.call(t,n),t[n])}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){t.exports={}},function(t,n,e){var o=e(1),r=e(13),i="".split;t.exports=o(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==r(t)?i.call(t,""):Object(t)}:Object},function(t,n,e){var o=e(5),r=e(1),i=e(27);t.exports=!o&&!r(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var o=e(0),r=e(12),i=e(7),c=e(3),u=e(15),a=e(25),s=e(43),f=s.get,l=s.enforce,p=String(a).split("toString");r("inspectSource",function(t){return a.call(t)}),(t.exports=function(t,n,e,r){var a=!!r&&!!r.unsafe,s=!!r&&!!r.enumerable,f=!!r&&!!r.noTargetGet;"function"==typeof e&&("string"!=typeof n||c(e,"name")||i(e,"name",n),l(e).source=p.join("string"==typeof n?n:"")),t!==o?(a?!f&&t[n]&&(s=!0):delete t[n],s?t[n]=e:i(t,n,e)):s?t[n]=e:u(n,e)})(Function.prototype,"toString",function(){return"function"==typeof this&&f(this).source||a.call(this)})},function(t,n,e){var o=e(12);t.exports=o("native-function-to-string",Function.toString)},function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,n,e){var o=e(0),r=e(2),i=o.document,c=r(i)&&r(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},function(t,n,e){var o=e(12),r=e(29),i=o("keys");t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,n){var e=0,o=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++e+o).toString(36)}},function(t,n,e){var o=e(47),r=e(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?i(o[t])||i(r[t]):o[t]&&o[t][n]||r[t]&&r[t][n]}},function(t,n,e){var o=e(32),r=e(26).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return o(t,r)}},function(t,n,e){var o=e(3),r=e(6),i=e(33).indexOf,c=e(21);t.exports=function(t,n){var e,u=r(t),a=0,s=[];for(e in u)!o(c,e)&&o(u,e)&&s.push(e);for(;n.length>a;)o(u,e=n[a++])&&(~i(s,e)||s.push(e));return s}},function(t,n,e){var o=e(6),r=e(16),i=e(34),c=function(t){return function(n,e,c){var u,a=o(n),s=r(a.length),f=i(c,s);if(t&&e!=e){for(;s>f;)if((u=a[f++])!=u)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===e)return t||f||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},function(t,n,e){var o=e(17),r=Math.max,i=Math.min;t.exports=function(t,n){var e=o(t);return e<0?r(e+n,0):i(e,n)}},function(t,n,e){var o=e(1),r=/#|\.prototype\./,i=function(t,n){var e=u[c(t)];return e==s||e!=a&&("function"==typeof n?o(n):!!n)},c=i.normalize=function(t){return String(t).replace(r,".").toLowerCase()},u=i.data={},a=i.NATIVE="N",s=i.POLYFILL="P";t.exports=i},function(t,n,e){"use strict";var o=e(1);t.exports=function(t,n){var e=[][t];return!e||!o(function(){e.call(null,n||function(){throw 1},1)})}},,function(t,n,e){t.exports={tips:"tips--3GZNi",layer:"layer--wzTGJ",body:"body--2AXgM",tipsBounceEnter:"tipsBounceEnter--380zZ"}},function(t,n,e){"use strict";var o=e(9),r=e(22),i=e(6),c=e(36),u=[].join,a=r!=Object,s=c("join",",");o({target:"Array",proto:!0,forced:a||s},{join:function(t){return u.call(i(this),void 0===t?",":t)}})},function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){"use strict";var o={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!o.call({1:2},1);n.f=i?function(t){var n=r(this,t);return!!n&&n.enumerable}:o},function(t,n){t.exports=!1},function(t,n,e){var o,r,i,c=e(44),u=e(0),a=e(2),s=e(7),f=e(3),l=e(28),p=e(21),d=u.WeakMap;if(c){var h=new d,v=h.get,y=h.has,m=h.set;o=function(t,n){return m.call(h,t,n),n},r=function(t){return v.call(h,t)||{}},i=function(t){return y.call(h,t)}}else{var b=l("state");p[b]=!0,o=function(t,n){return s(t,b,n),n},r=function(t){return f(t,b)?t[b]:{}},i=function(t){return f(t,b)}}t.exports={set:o,get:r,has:i,enforce:function(t){return i(t)?r(t):o(t,{})},getterFor:function(t){return function(n){var e;if(!a(n)||(e=r(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return e}}}},function(t,n,e){var o=e(0),r=e(25),i=o.WeakMap;t.exports="function"==typeof i&&/native code/.test(r.call(i))},function(t,n,e){var o=e(3),r=e(46),i=e(19),c=e(11);t.exports=function(t,n){for(var e=r(n),u=c.f,a=i.f,s=0;s<e.length;s++){var f=e[s];o(t,f)||u(t,f,a(n,f))}}},function(t,n,e){var o=e(30),r=e(31),i=e(48),c=e(4);t.exports=o("Reflect","ownKeys")||function(t){var n=r.f(c(t)),e=i.f;return e?n.concat(e(t)):n}},function(t,n,e){t.exports=e(0)},function(t,n){n.f=Object.getOwnPropertySymbols},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,n,e){"use strict";e.r(n);e(39);var o=e(38),r=e.n(o),i=new(function(){function t(t){var n=this;void 0===t&&(t=document.body),this.preventScroll=!0,this.tipsNode=document.createElement("div"),this.layerNode=document.createElement("div"),this.bodyNode=document.createElement("div"),this.tipsNode.style.display="none",this.tipsNode.className=r.a.tips,this.layerNode.className=r.a.layer,this.bodyNode.className=r.a.body,this.tipsNode.appendChild(this.layerNode),this.tipsNode.appendChild(this.bodyNode),this.setScale(document.documentElement.clientWidth/750),this.tipsNode.addEventListener("touchmove",function(t){if(n.preventScroll){for(var e=t.target;e!==n.tipsNode&&void 0===e.dataset.scroll;)e=e.parentElement;e===n.tipsNode&&t.preventDefault()}},{passive:!1,capture:!1}),t.appendChild(this.tipsNode)}var n=t.prototype;return n.setScale=function(t){t&&(this.tipsNode.style.fontSize=28*t+"px")},n.show=function(t,n){var e=this;"function"==typeof this.callback&&(window.clearTimeout(this.timerId),this.callback(),this.callback=void 0),"string"==typeof t&&(t={content:t}),this.tipsNode.style.zIndex="number"==typeof t.zIndex?""+t.zIndex:null,this.preventScroll=!1!==t.preventScroll,t.contentHtml?this.bodyNode.innerHTML=t.contentHtml:this.bodyNode.textContent=t.content||"",this.tipsNode.style.display=null,this.callback=n,this.timerId=window.setTimeout(function(){"function"==typeof e.callback&&(e.callback(),e.callback=void 0),e.hide()},t.duration||2e3)},n.hide=function(){this.tipsNode.style.display="none"},t}()),c=e(8),u=e.n(c),a=document.getElementById("root"),s=document.createElement("button");s.className=u.a.button,s.textContent="simple usage",a.appendChild(s),s.addEventListener("click",function(){i.show("simple tips")},!1);var f=document.createElement("button");f.className=u.a.button,f.textContent="tips with duration and callback",a.appendChild(f),f.addEventListener("click",function(){i.show({content:"hide after 3s",duration:3e3},function(){console.info("callback emited!")})},!1);var l=document.createElement("button");l.className=u.a.button,l.textContent="tips with html content",a.appendChild(l),l.addEventListener("click",function(){i.show({contentHtml:["<h3>title</h3>","<p>here is tips text</p>"].join(""),duration:3e3})},!1);var p=document.createElement("button");p.className=u.a.button,p.textContent="tips with loading",a.appendChild(p),p.addEventListener("click",function(){i.show({contentHtml:'<i class="'+u.a.icon+" "+u.a["icon-loading"]+'"></i><p>loading</p>',duration:3e3})},!1);var d=document.createElement("button");d.className=u.a.button,d.textContent="tips with other icon",a.appendChild(d),d.addEventListener("click",function(){i.show({contentHtml:'<i class="'+u.a.icon+" "+u.a["icon-success"]+'"></i><p>success</p>',duration:3e3})},!1)}],[[82,0]]]);
//# sourceMappingURL=tips.e562ab01.chunk.js.map