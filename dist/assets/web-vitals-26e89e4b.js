var m,l,C,T,f=function(n,e){return{name:n,value:e===void 0?-1:e,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},h=function(n,e){try{if(PerformanceObserver.supportedEntryTypes.includes(n)){if(n==="first-input"&&!("PerformanceEventTiming"in self))return;var i=new PerformanceObserver(function(a){return a.getEntries().map(e)});return i.observe({type:n,buffered:!0}),i}}catch{}},y=function(n,e){var i=function a(t){t.type!=="pagehide"&&document.visibilityState!=="hidden"||(n(t),e&&(removeEventListener("visibilitychange",a,!0),removeEventListener("pagehide",a,!0)))};addEventListener("visibilitychange",i,!0),addEventListener("pagehide",i,!0)},g=function(n){addEventListener("pageshow",function(e){e.persisted&&n(e)},!0)},v=function(n,e,i){var a;return function(t){e.value>=0&&(t||i)&&(e.delta=e.value-(a||0),(e.delta||a===void 0)&&(a=e.value,n(e)))}},p=-1,w=function(){return document.visibilityState==="hidden"?0:1/0},F=function(){y(function(n){var e=n.timeStamp;p=e},!0)},S=function(){return p<0&&(p=w(),F(),g(function(){setTimeout(function(){p=w(),F()},0)})),{get firstHiddenTime(){return p}}},A=function(n,e){var i,a=S(),t=f("FCP"),u=function(c){c.name==="first-contentful-paint"&&(o&&o.disconnect(),c.startTime<a.firstHiddenTime&&(t.value=c.startTime,t.entries.push(c),i(!0)))},r=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],o=r?null:h("paint",u);(r||o)&&(i=v(n,t,e),r&&u(r),g(function(c){t=f("FCP"),i=v(n,t,e),requestAnimationFrame(function(){requestAnimationFrame(function(){t.value=performance.now()-c.timeStamp,i(!0)})})}))},b=!1,E=-1,R=function(n,e){b||(A(function(s){E=s.value}),b=!0);var i,a=function(s){E>-1&&n(s)},t=f("CLS",0),u=0,r=[],o=function(s){if(!s.hadRecentInput){var B=r[0],q=r[r.length-1];u&&s.startTime-q.startTime<1e3&&s.startTime-B.startTime<5e3?(u+=s.value,r.push(s)):(u=s.value,r=[s]),u>t.value&&(t.value=u,t.entries=r,i())}},c=h("layout-shift",o);c&&(i=v(a,t,e),y(function(){c.takeRecords().map(o),i(!0)}),g(function(){u=0,E=-1,t=f("CLS",0),i=v(a,t,e)}))},d={passive:!0,capture:!0},H=new Date,P=function(n,e){m||(m=e,l=n,C=new Date,k(removeEventListener),D())},D=function(){if(l>=0&&l<C-H){var n={entryType:"first-input",name:m.type,target:m.target,cancelable:m.cancelable,startTime:m.timeStamp,processingStart:m.timeStamp+l};T.forEach(function(e){e(n)}),T=[]}},I=function(n){if(n.cancelable){var e=(n.timeStamp>1e12?new Date:performance.now())-n.timeStamp;n.type=="pointerdown"?function(i,a){var t=function(){P(i,a),r()},u=function(){r()},r=function(){removeEventListener("pointerup",t,d),removeEventListener("pointercancel",u,d)};addEventListener("pointerup",t,d),addEventListener("pointercancel",u,d)}(e,n):P(e,n)}},k=function(n){["mousedown","keydown","touchstart","pointerdown"].forEach(function(e){return n(e,I,d)})},M=function(n,e){var i,a=S(),t=f("FID"),u=function(o){o.startTime<a.firstHiddenTime&&(t.value=o.processingStart-o.startTime,t.entries.push(o),i(!0))},r=h("first-input",u);i=v(n,t,e),r&&y(function(){r.takeRecords().map(u),r.disconnect()},!0),r&&g(function(){var o;t=f("FID"),i=v(n,t,e),T=[],l=-1,m=null,k(addEventListener),o=u,T.push(o),D()})},L={},N=function(n,e){var i,a=S(),t=f("LCP"),u=function(c){var s=c.startTime;s<a.firstHiddenTime&&(t.value=s,t.entries.push(c),i())},r=h("largest-contentful-paint",u);if(r){i=v(n,t,e);var o=function(){L[t.id]||(r.takeRecords().map(u),r.disconnect(),L[t.id]=!0,i(!0))};["keydown","click"].forEach(function(c){addEventListener(c,o,{once:!0,capture:!0})}),y(o,!0),g(function(c){t=f("LCP"),i=v(n,t,e),requestAnimationFrame(function(){requestAnimationFrame(function(){t.value=performance.now()-c.timeStamp,L[t.id]=!0,i(!0)})})})}},O=function(n){var e,i=f("TTFB");e=function(){try{var a=performance.getEntriesByType("navigation")[0]||function(){var t=performance.timing,u={entryType:"navigation",startTime:0};for(var r in t)r!=="navigationStart"&&r!=="toJSON"&&(u[r]=Math.max(t[r]-t.navigationStart,0));return u}();if(i.value=i.delta=a.responseStart,i.value<0||i.value>performance.now())return;i.entries=[a],n(i)}catch{}},document.readyState==="complete"?setTimeout(e,0):addEventListener("load",function(){return setTimeout(e,0)})};export{R as getCLS,A as getFCP,M as getFID,N as getLCP,O as getTTFB};