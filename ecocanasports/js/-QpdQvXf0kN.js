if (self.CavalryLogger) { CavalryLogger.start_js(["8R750"]); }

__d("PageHooks",["Arbiter","ErrorUtils","InitialJSLoader","PageEvents"],(function(a,b,c,d,e,f){var g;f={DOMREADY_HOOK:"domreadyhooks",ONLOAD_HOOK:"onloadhooks"};function h(){var c=a.CavalryLogger;!window.domready&&c&&c.getInstance().setTimeStamp("t_prehooks");k(l.DOMREADY_HOOK);!window.domready&&c&&c.getInstance().setTimeStamp("t_hooks");window.domready=!0;b("Arbiter").inform("uipage_onload",!0,"state")}function i(){k(l.ONLOAD_HOOK),window.loaded=!0}function j(a,c){return(g||(g=b("ErrorUtils"))).applyWithGuard(a,null,null,function(a){a.event_type=c,a.category="runhook"},"PageHooks:"+c)}function k(a){var b=a=="onbeforeleavehooks"||a=="onbeforeunloadhooks";do{var c=window[a];if(!c)break;b||(window[a]=null);for(var d=0;d<c.length;d++){var e=j(c[d],a);if(b&&e)return e}}while(!b&&window[a])}function c(){window.domready||(window.domready=!0,k("onloadhooks")),window.loaded||(window.loaded=!0,k("onafterloadhooks"))}function d(){var a,c;(a=b("Arbiter")).registerCallback(h,[(c=b("PageEvents")).BIGPIPE_DOMREADY,b("InitialJSLoader").INITIAL_JS_READY]);a.registerCallback(i,[c.BIGPIPE_DOMREADY,c.BIGPIPE_ONLOAD,b("InitialJSLoader").INITIAL_JS_READY]);a.subscribe(c.NATIVE_ONBEFOREUNLOAD,function(a,b){b.warn=k("onbeforeleavehooks")||k("onbeforeunloadhooks"),b.warn||(window.domready=!1,window.loaded=!1)},"new");a.subscribe(c.NATIVE_ONUNLOAD,function(a,b){k("onunloadhooks"),k("onafterunloadhooks")},"new")}var l=babelHelpers["extends"]({_domreadyHook:h,_onloadHook:i,runHook:j,runHooks:k,keepWindowSetAsLoaded:c},f);d();a.PageHooks=e.exports=l}),null);
__d("DOMScroll",["requireDeferred","Arbiter","DOM","DOMQuery","Vector","ViewportBounds","emptyFunction","ge","gkx","isAsyncScrollQuery","nullthrows"],(function(a,b,c,d,e,f){var g=b("requireDeferred")("Animation"),h=b("gkx")("1243461"),i={SCROLL:"dom-scroll",_scrolling:!1,_scrollingFinishedTimeout:null,getScrollState:function(){var a=b("Vector").getViewportDimensions(),c=b("Vector").getDocumentDimensions(),d=c.x>a.x;c=c.y>a.y;d+=0;c+=0;return new(b("Vector"))(d,c)},_scrollbarSize:null,_initScrollbarSize:function(){var a=b("DOM").create("p");a.style.width="100%";a.style.height="200px";var c=b("DOM").create("div");c.style.position="absolute";c.style.top="0px";c.style.left="0px";c.style.visibility="hidden";c.style.width="200px";c.style.height="150px";c.style.overflow="hidden";c.appendChild(a);b("nullthrows")(document.body).appendChild(c);var d=a.offsetWidth;c.style.overflow="scroll";a=a.offsetWidth;d==a&&(a=c.clientWidth);b("nullthrows")(document.body).removeChild(c);i._scrollbarSize=d-a},getScrollbarSize:function(){i._scrollbarSize===null&&i._initScrollbarSize();return b("nullthrows")(i._scrollbarSize)},scrollTo:function(a,c,d,e,f,j){var k,l=0;c==null||c===!0?l=750:typeof c==="number"?l=c:parseInt(c,10)&&(l=parseInt(c,10));b("isAsyncScrollQuery")()&&(l=0);if(a instanceof b("Vector"))c=a;else{var m=b("Vector").getScrollPosition().x;a=b("Vector").getElementPosition(b("ge")(a)).y;c=new(b("Vector"))(m,a,"document");e||(c.y-=b("ViewportBounds").getTop()/(d?2:1))}d?c.y-=b("Vector").getViewportDimensions().y/2:e&&(c.y-=b("Vector").getViewportDimensions().y,c.y+=e);f&&(c.y-=f);c=c.convertTo("document");if(l)if("scrollBehavior"in b("nullthrows")(document.documentElement).style&&l===750&&!j)try{window.scrollTo({left:c.x,top:c.y,behavior:h?"auto":"smooth"})}catch(a){window.scrollTo(c.x,c.y)}else{m=g.getModuleIfRequired();if(m!=null){i._setScrollingForDuration(l);var n=new m(b("nullthrows")(document.body)).to("scrollTop",c.y).to("scrollLeft",c.x).ease(m.ease.end).duration(l).ondone(j).go();k=function(){n.stop()}}else window.scrollTo(c.x,c.y),j&&j()}else window.scrollTo(c.x,c.y),j&&j();b("Arbiter").inform(i.SCROLL);return k||b("emptyFunction")},scrollToID:function(a){i.scrollTo(a)},ensureVisible:function(a,c,d,e,f){var g=b("Vector").getScrollPosition().x;a=this._getBounds(a,c,d);c=a[0];d=a[1];var h=a[2];a=a[3];h<c?i.scrollTo(new(b("Vector"))(g,h,"document"),e,!1,0,0,f):a>d?h-(a-d)<c?i.scrollTo(new(b("Vector"))(g,h,"document"),e,!1,0,0,f):i.scrollTo(new(b("Vector"))(g,a,"document"),e,!1,1,0,f):f&&f()},isCurrentlyVisible:function(a,b,c){a=this._getBounds(a,b,c);b=a[0];c=a[1];var d=a[2];a=a[3];return d>=b&&a<=c},_getBounds:function(a,c,d){d==null&&(d=10);a=b("ge")(a);c&&(a=b("DOMQuery").find(a,c));c=b("Vector").getScrollPosition().y;var e=c+b("Vector").getViewportDimensions().y,f=b("Vector").getElementPosition(a).y;a=f+b("Vector").getElementDimensions(a).y;f-=b("ViewportBounds").getTop();f-=d;a+=d;return[c,e,f,a]},scrollToTop:function(a){var c=b("Vector").getScrollPosition();i.scrollTo(new(b("Vector"))(c.x,0,"document"),a!==!1)},currentlyScrolling:function(){return i._scrolling},_setScrollingForDuration:function(a){i._scrolling=!0,i._scrollingFinishedTimeout&&(clearTimeout(i._scrollingFinishedTimeout),i._scrollingFinishedTimeout=null),i._scrollingFinishedTimeout=setTimeout(function(){i._scrolling=!1,i._scrollingFinishedTimeout=null},a)}};e.exports=i}),null);
__d("Form",["DataStore","DOM","DOMQuery","DTSG","DTSGUtils","Input","LSD","PHPQuerySerializer","Random","SprinkleConfig","URI","getElementPosition","isFacebookURI","isNode"],(function(a,b,c,d,e,f){var g,h,i="FileList"in window,j="FormData"in window;function k(a){var c={};(g||(g=b("PHPQuerySerializer"))).serialize(a).split("&").forEach(function(a){if(a){a=/^([^=]*)(?:=(.*))?$/.exec(a);var d=(h||(h=b("URI"))).decodeComponent(a[1]),e=a[2]!==void 0;e=e?(h||(h=b("URI"))).decodeComponent(a[2]):null;c[d]=e}});return c}var l={getInputs:function(a){a===void 0&&(a=document);return[].concat(b("DOMQuery").scry(a,"input"),b("DOMQuery").scry(a,"select"),b("DOMQuery").scry(a,"textarea"),b("DOMQuery").scry(a,"button"))},getInputsByName:function(a){var b={};l.getInputs(a).forEach(function(a){var c=b[a.name];b[a.name]=typeof c==="undefined"?a:[a].concat(c)});return b},getSelectValue:function(a){return a.options[a.selectedIndex].value},setSelectValue:function(a,b){for(var c=0;c<a.options.length;++c)if(a.options[c].value==b){a.selectedIndex=c;break}},getRadioValue:function(a){for(var b=0;b<a.length;b++)if(a[b].checked)return a[b].value;return null},getElements:function(a){return a.tagName=="FORM"&&a.elements!=a?Array.from(a.elements):l.getInputs(a)},getAttribute:function(a,b){return(a.getAttributeNode(b)||{}).value||null},setDisabled:function(a,c){l.getElements(a).forEach(function(a){if(a.disabled!==void 0){var d=b("DataStore").get(a,"origDisabledState");c?(d===void 0&&b("DataStore").set(a,"origDisabledState",a.disabled),a.disabled=c):d===!1&&(a.disabled=!1)}})},forEachValue:function(a,c,d){l.getElements(a).forEach(function(a){if(!a.name||a.disabled)return;if(a.type==="submit")return;if(a.type==="reset"||a.type==="button"||a.type==="image")return;if((a.type==="radio"||a.type==="checkbox")&&!a.checked)return;if(a.nodeName==="SELECT"){for(var c=0,e=a.options.length;c<e;c++){var f=a.options[c];f.selected&&d("select",a.name,f.value)}return}if(a.type==="file"){if(i){f=a.files;for(var c=0;c<f.length;c++)d("file",a.name,f.item(c))}return}d(a.type,a.name,b("Input").getValue(a))}),c&&c.name&&c.type==="submit"&&b("DOMQuery").contains(a,c)&&b("DOMQuery").isNodeOfType(c,["input","button"])&&d("submit",c.name,c.value)},createFormData:function(a,c){if(!j)return null;var d=new FormData();if(a)if(b("isNode")(a))l.forEachValue(a,c,function(b,a,c){d.append(a,c)});else{c=k(a);for(var e in c)c[e]==null?d.append(e,""):d.append(e,c[e])}return d},serialize:function(a,b){var c={};l.forEachValue(a,b,function(a,b,d){if(a==="file")return;l._serializeHelper(c,b,d)});return l._serializeFix(c)},_serializeHelper:function(a,b,c){var d=Object.prototype.hasOwnProperty,e=/([^\]]+)\[([^\]]*)\](.*)/.exec(b);if(e){if(!a[e[1]]||!d.call(a,e[1])){a[e[1]]=d={};if(a[e[1]]!==d)return}d=0;if(e[2]==="")while(a[e[1]][d]!==void 0)d++;else d=e[2];e[3]===""?a[e[1]][d]=c:l._serializeHelper(a[e[1]],d.concat(e[3]),c)}else a[b]=c},_serializeFix:function(a){for(var b in a)a[b]instanceof Object&&(a[b]=l._serializeFix(a[b]));var c=Object.keys(a);if(c.length===0||c.some(isNaN))return a;c.sort(function(a,b){return a-b});var d=0,e=c.every(function(a){return+a===d++});return e?c.map(function(b){return a[b]}):a},post:function(a,c,d,e){e===void 0&&(e=!0);a=new(h||(h=b("URI")))(a);var f=document.createElement("form");f.action=a.toString();f.method="POST";f.style.display="none";var g=!b("isFacebookURI")(a);if(d){if(g){f.rel="noopener";if(d==="_blank"){d=btoa(b("Random").uint32());var i=window.open("about:blank",d);i===void 0||(i.opener=null)}}f.target=d}if(e&&(!g&&a.getSubdomain()!=="apps")){i=b("DTSG").getToken();i&&(c.fb_dtsg=i,b("SprinkleConfig").param_name&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(i)));b("LSD").token&&(c.lsd=b("LSD").token,b("SprinkleConfig").param_name&&!i&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(b("LSD").token)))}l.createHiddenInputs(c,f);b("DOMQuery").getRootElement().appendChild(f);f.submit();return!1},createHiddenInputs:function(a,c,d,e){e===void 0&&(e=!1);d=d||{};a=k(a);for(var f in a){if(a[f]===null)continue;if(d[f]&&e)d[f].value=a[f];else{var g=b("DOM").create("input",{type:"hidden",name:f,value:a[f]});d[f]=g;c.appendChild(g)}}return d},getFirstElement:function(a,c){c===void 0&&(c=['input[type="text"]',"textarea",'input[type="password"]','input[type="button"]','input[type="submit"]']);var d=[];for(var e=0;e<c.length;e++){d=b("DOMQuery").scry(a,c[e]);for(var f=0;f<d.length;f++){var g=d[f];try{var h=b("getElementPosition")(g);if(h.y>0&&h.x>0)return g}catch(a){}}}return null},focusFirst:function(a){a=l.getFirstElement(a);if(a){a.focus();return!0}return!1}};e.exports=l}),null);
__d("LinkController",["DataStore","Event","Parent","removeFromArray","trackReferrer"],(function(a,b,c,d,e,f){f.registerHandler=a;f.registerFallbackHandler=c;var g="@@LinkController",h=[],i=[];function a(a){h.push(a);return{remove:function(){return b("removeFromArray")(h,a)}}}function c(a){i.push(a);return{remove:function(){return b("removeFromArray")(i,a)}}}function d(a){a=a.getTarget();var c=b("Parent").byTag(a,"a");if(!(c instanceof HTMLAnchorElement))return;var d=k(c);if(!d||m(a)||b("DataStore").get(c,g)||d.endsWith("#"))return;a=b("Event").listen(c,"click",function(a){b("trackReferrer")(c,d),!c.rel&&(!c.target||c.target==="_self")&&!l(a)&&j(c,a)});b("DataStore").set(c,g,a)}function j(a,b){h.concat(i).every(function(c){if(c(a,b)===!1){b.prevent();return!1}return!0})}function k(a){if(a&&!a.rel){a=a.getAttribute("href");if(a){var b=a.match(/^(\w+):/);if(!b||b[1].match(/^http/i))return a}}return null}function l(a){return a.getModifiers().any||a.which&&a.which!==1}function m(a){return a.nodeName==="INPUT"&&a.type==="file"}(e=b("Event")).listen(document.documentElement,"mousedown",d,e.Priority.URGENT);e.listen(document.documentElement,"keydown",d,e.Priority.URGENT)}),null);
__d("PageTransitionPriorities",[],(function(a,b,c,d,e,f){a=5;f.DEFAULT=a;b=a+1;f.LEFT_NAV=b;c=b+1;f.SOCIAL_SEARCH_DIALOG=c}),null);
__d("computeRelativeURI",["URI","isEmpty","isFacebookURI"],(function(a,b,c,d,e,f){e.exports=a;var g,h;function i(a,b){if(!b)return a;if(b.charAt(0)=="/")return b;var c=a.split("/").slice(0,-1);c[0]!=="";b.split("/").forEach(function(a){a==="."||(a===".."?c.length>1&&(c=c.slice(0,-1)):c.push(a))});return c.join("/")}function a(a,c){var d=new(g||(g=b("URI")))(),e=new g(a),f=new g(c);if(f.getDomain()&&!b("isFacebookURI")(f))return c;var j=e;a=["Protocol","Domain","Port","Path","QueryData","Fragment"];a.forEach(function(a){var c=a==="Path"&&j===e;c&&d.setPath(i(e.getPath(),f.getPath()));(h||(h=b("isEmpty")))(f["get"+a]())||(j=f);c||d["set"+a](j["get"+a]())});return d}}),null);
__d("getReferrerURI",["ErrorUtils","URI","isFacebookURI"],(function(a,b,c,d,e,f){"use strict";e.exports=c;var g,h;function c(){if(a.PageTransitions&&a.PageTransitions.isInitialized())return a.PageTransitions.getReferrerURI();else{var c=(g||(g=b("ErrorUtils"))).applyWithGuard(function(a){return new(h||(h=b("URI")))(a)},null,[document.referrer]);return c&&b("isFacebookURI")(c)?c:null}}}),null);
__d("PageTransitionsRegistrar",["invariant","DOMQuery","Form","LinkController","PageTransitionPriorities","Parent","URI","computeRelativeURI","getReferrerURI","goURI","requireDeferred","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g){var h,i=b("requireDeferred")("PageTransitions");i.onReady(function(a){a&&a._init&&a._init()});var j=[],k=[];i={DELAY_HISTORY:"delay_history_PTR",registerHandler:function(a,c){a!=null||g(0,5202),c=c||b("PageTransitionPriorities").DEFAULT,j[c]||(j[c]=[]),j[c].push(a)},removeHandler:function(a,c){c=c||b("PageTransitionPriorities").DEFAULT;var d=-1;j[c]&&(d=j[c].indexOf(a));d>-1&&j[c].splice(d,1)},registerCompletionCallback:function(a){k.push(a)},getMostRecentURI:n,getReferrerURI:b("getReferrerURI"),_getTransitionHandlers:function(){return j},_getCompletionCallbacks:function(){return k},_resetCompletionCallbacks:function(){k=[]},__onClick:d,__onSubmit:f};var l=null;function c(a){l=a,b("setTimeoutAcrossTransitions")(function(){l=null},0)}function d(a){if(l){if(!a.isDefaultPrevented()){m(l);var c=l.getAttribute("href");c&&b("goURI")(c)}a.kill()}}function m(a){var c=a.getAttribute("href")||"",d=b("computeRelativeURI")(n().getQualifiedURI().toString(),c).toString();c!=d&&a.setAttribute("href",d)}function f(a,c){c=c;var d=a.getTarget();if(b("Form").getAttribute(d,"rel")||b("Form").getAttribute(d,"target"))return;var e=new(h||(h=b("URI")))(b("Form").getAttribute(d,"action"));e=b("computeRelativeURI")(n().toString(),e.toString());d.setAttribute("action",e.toString());if((b("Form").getAttribute(d,"method")||"GET").toUpperCase()=="GET"){d=b("Form").serialize(d);c&&(b("DOMQuery").isNodeOfType(c,"input")&&c.type==="submit"||(c=b("Parent").byTag(c,"button")))&&c.name&&(d[c.name]=c.value);typeof e==="string"&&(e=new(h||(h=b("URI")))(e));b("goURI")(e.addQueryData(d));a.kill()}}b("LinkController").registerFallbackHandler(c);function n(){if(a.PageTransitions&&a.PageTransitions.isInitialized())return a.PageTransitions.getMostRecentURI();else{var c=(h||(h=b("URI"))).getRequestURI(!1);c=c.getUnqualifiedURI();var d=new h(c).setFragment(""),e=c.getFragment();e.charAt(0)==="!"&&d.toString()===e.substr(1)&&(c=d);return c}}d=i;e.exports=d}),null);
__d("goOrReplace",["Env","URI","isFacebookURI"],(function(a,b,c,d,e,f){e.exports=a;var g,h;function a(a,c,d){c=new(g||(g=b("URI")))(c);(h||(h=b("Env"))).isCQuick&&b("isFacebookURI")(c)&&c.addQueryData({cquick:(h||(h=b("Env"))).iframeKey,cquick_token:h.iframeToken,ctarget:h.iframeTarget});c=c.toString();d?a.replace(c):a.href==c?a.reload():a.href=c}}),null);
__d("LayerHideSources",[],(function(a,b,c,d,e,f){a=Object.freeze({BLUR:"blur",ESCAPE:"escape",LAYER_CANCEL_BUTTON:"layerCancelButton",LAYER_HIDE_BUTTON:"layerHideButton",TRANSITION:"transition"});b=a;e.exports=b}),null);
__d("LayerHideOnEscape",["Event","Keys","LayerHideSources"],(function(a,b,c,d,e,f){a=function(){function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscription=this._layer.subscribe("key",this.handle.bind(this))};c.disable=function(){this._subscription!=null&&this._subscription.unsubscribe(),this._subscription=null};c.handle=function(a,c){if(b("Event").getKeyCode(c)===b("Keys").ESC){this._layer.hide(b("LayerHideSources").ESCAPE);return!1}return void 0};return a}();e.exports=a;Object.assign(a.prototype,{_subscription:null})}),null);
__d("LayerHideOnTransition",["LayerHideSources","PageTransitionsRegistrar"],(function(a,b,c,d,e,f){a=function(){function a(a){var c=this;this._handler=function(a){c._enabled&&c.isTransitionRelevant(a)&&c._layer.hide(b("LayerHideSources").TRANSITION),c._subscribe()};this._layer=a}var c=a.prototype;c.enable=function(){this._enabled=!0,this._subscribed||setTimeout(this._subscribe.bind(this),0)};c.disable=function(){this._enabled=!1,b("PageTransitionsRegistrar").removeHandler(this._handler)};c.isTransitionRelevant=function(a){return!0};c._subscribe=function(){b("PageTransitionsRegistrar").registerHandler(this._handler),this._subscribed=!0};return a}();e.exports=a;Object.assign(a.prototype,{_enabled:!1,_subscribed:!1})}),null);