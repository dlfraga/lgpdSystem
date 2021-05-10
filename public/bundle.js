!function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n,i=0;i<e.length;i++)(n=e[i]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}function i(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function a(t){for(var e,n=1;n<arguments.length;n++)e=null==arguments[n]?{}:arguments[n],n%2?s(Object(e),!0).forEach((function(n){o(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):s(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}));return t}var r={duration:2e3,position:"top-right",closeOnClick:!0,opacity:1,single:!1,offsetTop:0,offsetBottom:0,offsetLeft:0,offsetRight:0},c=a({},r),f={},l=document,m=function(t,e,n,i,o){return"top-left"===t?"left:".concat(i,";top:").concat(e,";text-align:left;align-items:flex-start;"):"top-right"===t?"right:".concat(o,";top:").concat(e,";text-align:right;align-items:flex-end;"):"top-center"===t?"top:".concat(e,";left:0;right:0;text-align:center;align-items:center;"):"bottom-left"===t?"left:".concat(i,";bottom:").concat(n,";text-align:left;align-items:flex-start;"):"bottom-right"===t?"right:".concat(o,";bottom:").concat(n,";text-align:right;align-items:flex-end;"):"bottom-center"===t?"bottom:".concat(n,";left:0;right:0;text-align:center;align-items:center;"):"center"===t?"top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;":void 0},u=function(){function t(n){var i=this;e(this,t),this.element=l.createElement("div"),this.opacity=n.opacity,this.type=n.type,this.animate=n.animate,this.dismissible=n.dismissible,this.closeOnClick=n.closeOnClick,this.message=n.message,this.duration=n.duration,this.pauseOnHover=n.pauseOnHover,this.offsetTop=n.offsetTop,this.offsetBottom=n.offsetBottom,this.offsetLeft=n.offsetLeft,this.offsetRight=n.offsetRight;var o="width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:".concat(this.opacity,";"),s=["notification"];if(this.type&&s.push(this.type),this.animate&&this.animate.in){var a="animate__".concat(this.animate.in),r=this.animate.speed?"animate__".concat(this.animate.speed):"animate__faster";s.push("animate__animated ".concat(a," ").concat(r)),this.onAnimationEnd((function(){return i.element.classList.remove(a)}))}if(this.element.className=s.join(" "),this.dismissible){var c=l.createElement("button");c.className="delete",c.addEventListener("click",(function(){i.destroy()})),this.element.insertAdjacentElement("afterbegin",c)}else o+="padding: 1.25rem 1.5rem";this.closeOnClick&&this.element.addEventListener("click",(function(){i.destroy()})),this.element.setAttribute("style",o),"string"==typeof this.message?this.element.insertAdjacentHTML("beforeend",this.message):this.element.appendChild(this.message);var f=new h((function(){i.destroy()}),this.duration);this.pauseOnHover&&(this.element.addEventListener("mouseover",(function(){f.pause()})),this.element.addEventListener("mouseout",(function(){f.resume()})))}return i(t,[{key:"destroy",value:function(){var t=this;this.animate&&this.animate.out?(this.element.classList.add("animate__".concat(this.animate.out)),this.onAnimationEnd((function(){t.removeParent(t.element.parentNode),t.element.remove(),delete f.position}))):(this.removeParent(this.element.parentNode),this.element.remove(),delete f.position)}},{key:"removeParent",value:function(t){t&&1>=t.children.length&&t.remove()}},{key:"onAnimationEnd",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){},e={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(var n in e)if(void 0!==this.element.style[n]){this.element.addEventListener(e[n],(function(){return t()}));break}}}]),t}(),h=function(){function t(n,i){e(this,t),this.timer,this.start,this.remaining=i,this.callback=n,this.resume()}return i(t,[{key:"pause",value:function(){"undefined"==typeof document||(window.clearTimeout(this.timer),this.remaining-=new Date-this.start)}},{key:"resume",value:function(){"undefined"==typeof document||(this.start=new Date,window.clearTimeout(this.timer),this.timer=window.setTimeout(this.callback,this.remaining))}}]),t}();t.resetDefaults=function(){c=a({},r)},t.setDefaults=function(t){c=a(a({},r),t)},t.setDoc=function(t){for(var e in f)f[e].remove();f={},l=t},t.toast=function(t){if(!t.message)throw new Error("message is required");var e=a(a({},c),t),n=new u(e),i=function(t,e,n,i,o,s){if(f.position)return f.position;var a=l.createElement("div");return a.setAttribute("style","width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"+m(e,n,i,o,s)),t.appendChild(a),f.position=a,a}(e.appendTo||l.body,e.position||c.position,e.offsetTop||c.offsetTop,e.offsetBottom||c.offsetBottom,e.offsetLeft||c.offsetLeft,e.offsetRight||c.offsetRight);if(e.single)for(var o=i.lastElementChild;o;)i.removeChild(o),o=i.lastElementChild;i.appendChild(n.element)},Object.defineProperty(t,"__esModule",{value:!0})}({});