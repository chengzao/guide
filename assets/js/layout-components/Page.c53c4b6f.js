(window.webpackJsonp=window.webpackJsonp||[]).push([[3,20],{232:function(n,r,e){"use strict";function i(){return(i=Object.assign?Object.assign.bind():function(n){for(var r,e=1;e<arguments.length;e++)for(var i in r=arguments[e])Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i]);return n}).apply(this,arguments)}var t=["attrs","props","domProps"],o=["class","style","directives"],s=["on","nativeOn"],a=function(n,r){return function(){n&&n.apply(this,arguments),r&&r.apply(this,arguments)}};n.exports=function(n){return n.reduce((function(n,r){for(var e in r)if(n[e])if(-1!==t.indexOf(e))n[e]=i({},n[e],r[e]);else if(-1!==o.indexOf(e)){var c=n[e]instanceof Array?n[e]:[n[e]],f=r[e]instanceof Array?r[e]:[r[e]];n[e]=[].concat(c,f)}else if(-1!==s.indexOf(e))for(var p in r[e])if(n[e][p]){var u=n[e][p]instanceof Array?n[e][p]:[n[e][p]],l=r[e][p]instanceof Array?r[e][p]:[r[e][p]];n[e][p]=[].concat(u,l)}else n[e][p]=r[e][p];else if("hook"===e)for(var v in r[e])n[e][v]=n[e][v]?a(n[e][v],r[e][v]):r[e][v];else n[e]=r[e];else n[e]=r[e];return n}),{})}}}]);