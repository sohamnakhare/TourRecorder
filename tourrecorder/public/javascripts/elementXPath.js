/*! element-xpath - v0.0.1 - https://github.com/bermi/element-xpath/ - © 2013 Bermi Ferrer <bermi@bermilabs.com> - MIT Licensed */
(function(e){"use strict";function s(e,t,n){var r=0,i=0;while(i<t.length){t[i].hasAttribute("id")&&t[i].id===e.id&&(r+=1);if(r>1)break;i+=1}return r===1?(n.unshift('id("'+e.getAttribute("id")+'")'),n.join("/")):(n.unshift(e.localName.toLowerCase()+'[@id="'+e.getAttribute("id")+'"]'),n)}function o(e,t,n){var r=1,i=e.previousSibling;while(i)i.localName===e.localName&&(r+=1),i=i.previousSibling;return n.unshift(e.localName.toLowerCase()+"["+r+"]"),n}function u(e,t,n){return n.unshift(e.localName.toLowerCase()+'[contains(concat(" ", @class, " ")," '+e.getAttribute("class")+' ")]'),n}var t=typeof module!="undefined"&&module.exports,n=e.getElementXpath,r=function(){},i=function(e,t){var n,r,a,f,l,c,h,p;try{if(t&&typeof t!="function")throw new Error("Invalid callback supplied");a=i.getNodes(e),c=[];while(e&&e.nodeType===1){if(e.hasAttribute("id")){c=s(e,a,c);if(typeof c=="string"){r=c;break}}else e.hasAttribute("class")?c=u(e,a,c):c=o(e,a,c);e=e.parentNode}!r&&c.length&&(r="/"+c.join("/"))}catch(n){if(!t)throw n}if(!t)return r;t(n,r)};i.noConflict=function(){return e.getElementXpath=n,i},i.getNodes=function(e){return document.getElementsByTagName("*")},t?module.exports=i:e.getElementXpath=i})(this);