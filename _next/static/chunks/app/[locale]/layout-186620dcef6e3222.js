(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[203],{4813:function(e,t,n){"use strict";function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.r(t),n.d(t,{default:function(){return l}});var o=n(2265),a=n(923);function l(e){let{locale:t,...n}=e;if(!t)throw Error("Failed to determine locale in `NextIntlClientProvider`, please provide the `locale` prop explicitly.\n\nSee https://next-intl-docs.vercel.app/docs/configuration#locale");return o.createElement(a.P,r({locale:t},n))}},35:function(e,t,n){Promise.resolve().then(n.bind(n,4813)),Promise.resolve().then(n.t.bind(n,5250,23)),Promise.resolve().then(n.t.bind(n,9039,23))},9039:function(){},3098:function(e,t,n){"use strict";var r=n(2265).createContext(void 0);t.IntlContext=r},923:function(e,t,n){"use strict";var r=n(2265),o=n(1616),a=n(3098),l=r&&r.__esModule?r:{default:r};t.P=function(e){let{children:t,defaultTranslationValues:n,formats:i,getMessageFallback:s,locale:c,messages:u,now:f,onError:d,timeZone:g}=e,[m]=r.useState(()=>new Map),p=r.useMemo(()=>({...o.initializeConfig({locale:c,defaultTranslationValues:n,formats:i,getMessageFallback:s,messages:u,now:f,onError:d,timeZone:g}),messageFormatCache:m}),[n,i,s,c,m,u,f,d,g]);return l.default.createElement(a.IntlContext.Provider,{value:p},t)}},1616:function(e,t){"use strict";function n(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(".")}function r(e){return n(e.namespace,e.key)}function o(e){console.error(e)}t.defaultGetMessageFallback=r,t.defaultOnError=o,t.initializeConfig=function(e){let{getMessageFallback:t,messages:n,onError:a,...l}=e;return{...l,messages:n,onError:a||o,getMessageFallback:t||r}},t.joinPath=n}},function(e){e.O(0,[250,971,938,744],function(){return e(e.s=35)}),_N_E=e.O()}]);