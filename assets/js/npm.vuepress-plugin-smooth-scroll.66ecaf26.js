(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{143:function(o,e,t){"use strict";function n(o){const e=document.documentElement.getBoundingClientRect(),t=o.getBoundingClientRect();return{x:t.left-e.left,y:t.top-e.top}}e.a=({Vue:o,router:e})=>{e.options.scrollBehavior=(e,t,i)=>{if(i)return window.scrollTo({top:i.y,behavior:"smooth"});if(!e.hash)return window.scrollTo({top:0,behavior:"smooth"});{if(o.$vuepress.$get("disableScrollBehavior"))return;const t=e.hash.slice(1),i=document.getElementById(t)||document.querySelector(`[name='${t}']`);if(i)return window.scrollTo({top:n(i).y,behavior:"smooth"})}}}},191:function(o,e,t){"use strict";var n=t(192),i=t.n(n);t(338);e.a={mounted(){i.a.polyfill()}}},338:function(o,e,t){}}]);