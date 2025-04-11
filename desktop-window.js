"use strict";var DESKTOP_WINDOW=(()=>{var y=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var X=(n,t)=>{for(var e in t)y(n,e,{get:t[e],enumerable:!0})},Y=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of C(t))!q.call(n,o)&&o!==e&&y(n,o,{get:()=>t[o],enumerable:!(r=S(t,o))||r.enumerable});return n};var D=n=>Y(y({},"__esModule",{value:!0}),n);var I={};X(I,{DesktopWindow:()=>p,default:()=>F,register:()=>T});var A=`:host{--desktop-window-background-color: #fff;--desktop-window-border-width: 1px;--desktop-window-border-color: #aaa;--desktop-window-minimize-duration: .1s;--desktop-window-maximize-duration: .05s;--desktop-window-titlebar-height: 28px;--desktop-window-titlebar-text-color: #999;--desktop-window-titlebar-background-color: #fff;--desktop-window-titlebar-font-family: sans-serif;--desktop-window-titlebar-font-size: 14px;--desktop-window-minimize-button-mask-image: url('data:image/svg+xml,<svg width="14" height="1" viewBox="0 0 14 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 14,1 H 0 V 0 h 14 z" />%0D%0A</svg>%0D%0A');--desktop-window-maximize-button-mask-image: url('data:image/svg+xml,<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 16,14 H 0 V 0 H 16 Z M 15,13 V 2 H 1 V 13 Z" />%0D%0A</svg>%0D%0A');--desktop-window-restore-button-mask-image: url('data:image/svg+xml,<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 16,9 H 12 V 14 H 0 V 5 H 4 V 0 H 16 Z M 15,8 V 2 H 5 V 5 H 12 V 8 Z M 11,13 V 7 H 1 v 6 z" />%0D%0A</svg>%0D%0A');--desktop-window-close-button-mask-image: url('data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 14,13.377792 13.377793,14 6.9826729,7.6048821 0.6222123,14 0,13.377792 6.3951189,7.0173289 0,0.6222073 0.6222123,0 6.9826729,6.3951177 13.377793,0 14,0.6222073 7.6048859,7.0173289 Z" />%0D%0A</svg>%0D%0A');--desktop-window-buttons-width: 42px;--desktop-window-buttons-height: var(--desktop-window-titlebar-height);--desktop-window-buttons-margin: 0;--desktop-window-buttons-text-color: var(--desktop-window-titlebar-text-color);--desktop-window-buttons-background-color: rgba(110, 110, 110, 0);--desktop-window-buttons-hover-text-color: #444;--desktop-window-buttons-hover-background-color: rgba(110, 110, 110, .2);--desktop-window-minimize-text-color: var(--desktop-window-buttons-text-color);--desktop-window-minimize-background-color: var(--desktop-window-buttons-background-color);--desktop-window-minimize-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-minimize-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-maximize-text-color: var(--desktop-window-buttons-text-color);--desktop-window-maximize-background-color: var(--desktop-window-buttons-background-color);--desktop-window-maximize-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-maximize-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-restore-text-color: var(--desktop-window-buttons-text-color);--desktop-window-restore-background-color: var(--desktop-window-buttons-background-color);--desktop-window-restore-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-restore-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-close-text-color: var(--desktop-window-buttons-text-color);--desktop-window-close-background-color: var(--desktop-window-buttons-background-color);--desktop-window-close-hover-text-color: #fff;--desktop-window-close-hover-background-color: #e50000;--desktop-window-focused-background-color: var(--desktop-window-background-color);--desktop-window-focused-border-color: #fff;--desktop-window-focused-titlebar-text-color: #444;--desktop-window-focused-titlebar-background-color: var(--desktop-window-titlebar-background-color);--desktop-window-focused-buttons-text-color: var(--desktop-window-focused-titlebar-text-color);--desktop-window-focused-buttons-background-color: var(--desktop-window-buttons-background-color);--desktop-window-focused-buttons-hover-text-color: var(--desktop-window-focused-titlebar-text-color);--desktop-window-focused-buttons-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-focused-minimize-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-minimize-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-minimize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-minimize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-maximize-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-maximize-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-maximize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-maximize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-restore-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-restore-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-restore-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-restore-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-close-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-close-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-close-hover-text-color: var(--desktop-window-close-hover-text-color);--desktop-window-focused-close-hover-background-color: var(--desktop-window-close-hover-background-color)}*{box-sizing:border-box}.window{--z-index: 10;transform:translateZ(0);transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s;position:absolute;border:var(--desktop-window-border-width) solid var(--desktop-window-border-color);background-color:var(--desktop-window-background-color);box-shadow:0 2px 10px #0000001a;-webkit-user-select:none;user-select:none;outline:none;z-index:calc(2 * var(--z-index))}.resize-handle{display:none;position:absolute;z-index:10}.handle-nw,.handle-ne,.handle-sw,.handle-se{width:12px;height:12px}.handle-e,.handle-w{width:6px;top:0;bottom:0}.handle-n,.handle-s{height:6px;left:0;right:0}.handle-ne{top:-6px;right:-6px;cursor:nesw-resize}.handle-nw{top:-6px;left:-6px;cursor:nwse-resize}.handle-se{bottom:-6px;right:-6px;cursor:nwse-resize}.handle-sw{bottom:-6px;left:-6px;cursor:nesw-resize}.handle-n{top:-6px;cursor:ns-resize}.handle-s{bottom:-6px;cursor:ns-resize}.handle-e{right:-6px;cursor:ew-resize}.handle-w{left:-6px;cursor:ew-resize}.bounds{position:relative;z-index:20;width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:nowrap}.titlebar{transition:background-color linear .1s;flex-grow:0;flex-shrink:0;height:var(--desktop-window-titlebar-height);display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;background-color:var(--desktop-window-titlebar-background-color)}.titlebar-start,.titlebar-end{cursor:default;flex-grow:0;flex-shrink:0;height:100%;display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center}.titlebar-center{flex-grow:1;flex-shrink:1;min-width:0}.titlebar-text{transition:color linear .1s;font-family:var(--desktop-window-titlebar-font-family);font-size:var(--desktop-window-titlebar-font-size);color:var(--desktop-window-titlebar-text-color);line-height:var(--desktop-window-titlebar-height);padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.control-btn{cursor:default;position:relative;width:var(--desktop-window-buttons-width);height:var(--desktop-window-buttons-height);border:none;transition:color linear .1s,background-color linear .1s;margin:0 var(--desktop-window-buttons-margin) 0 0;padding:0;flex-grow:0;flex-shrink:0}.control-btn:before{content:"";position:absolute;inset:0;-webkit-mask-size:auto;mask-size:auto;-webkit-mask-position:center center;mask-position:center center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;background-color:currentColor}.btn-minimize{display:none;color:var(--desktop-window-minimize-text-color);background-color:var(--desktop-window-minimize-background-color)}.btn-minimize:hover{color:var(--desktop-window-minimize-hover-text-color);background-color:var(--desktop-window-minimize-hover-background-color)}.btn-minimize:before{-webkit-mask-image:var(--desktop-window-minimize-button-mask-image);mask-image:var(--desktop-window-minimize-button-mask-image)}.btn-maximize{display:none;color:var(--desktop-window-maximize-text-color);background-color:var(--desktop-window-maximize-background-color)}.btn-maximize:hover{color:var(--desktop-window-maximize-hover-text-color);background-color:var(--desktop-window-maximize-hover-background-color)}.btn-maximize:before{-webkit-mask-image:var(--desktop-window-maximize-button-mask-image);mask-image:var(--desktop-window-maximize-button-mask-image)}.btn-restore{display:none;color:var(--desktop-window-restore-text-color);background-color:var(--desktop-window-restore-background-color)}.btn-restore:hover{color:var(--desktop-window-restore-hover-text-color);background-color:var(--desktop-window-restore-hover-background-color)}.btn-restore:before{-webkit-mask-image:var(--desktop-window-restore-button-mask-image);mask-image:var(--desktop-window-restore-button-mask-image)}.btn-close{display:none;color:var(--desktop-window-close-text-color);background-color:var(--desktop-window-close-background-color)}.btn-close:hover{color:var(--desktop-window-close-hover-text-color);background-color:var(--desktop-window-close-hover-background-color)}.btn-close:before{-webkit-mask-image:var(--desktop-window-close-button-mask-image);mask-image:var(--desktop-window-close-button-mask-image)}.client-area{flex-grow:1;flex-shrink:1;height:calc(100% - var(--desktop-window-titlebar-height));-webkit-user-select:text;user-select:text}:host(:focus-within) .window{border-color:var(--desktop-window-focused-border-color);box-shadow:0 2px 15px #00000040}:host(:focus-within) .titlebar{background-color:var(--desktop-window-focused-titlebar-background-color)}:host(:focus-within) .titlebar-text{color:var(--desktop-window-focused-titlebar-text-color)}:host(:focus-within) .btn-minimize{color:var(--desktop-window-focused-minimize-text-color);background-color:var(--desktop-window-focused-minimize-background-color)}:host(:focus-within) .btn-minimize:hover{color:var(--desktop-window-focused-minimize-hover-text-color);background-color:var(--desktop-window-focused-minimize-hover-background-color)}:host(:focus-within) .btn-maximize{color:var(--desktop-window-focused-maximize-text-color);background-color:var(--desktop-window-focused-maximize-background-color)}:host(:focus-within) .btn-maximize:hover{color:var(--desktop-window-focused-maximize-hover-text-color);background-color:var(--desktop-window-focused-maximize-hover-background-color)}:host(:focus-within) .btn-restore{color:var(--desktop-window-focused-restore-text-color);background-color:var(--desktop-window-focused-restore-background-color)}:host(:focus-within) .btn-restore:hover{color:var(--desktop-window-focused-restore-hover-text-color);background-color:var(--desktop-window-focused-restore-hover-background-color)}:host(:focus-within) .btn-close{color:var(--desktop-window-focused-close-text-color);background-color:var(--desktop-window-focused-close-background-color)}:host(:focus-within) .btn-close:hover{color:var(--desktop-window-focused-close-hover-text-color);background-color:var(--desktop-window-focused-close-hover-background-color)}:host([movable]) .titlebar{cursor:move}:host([resizable]) .resize-handle{display:block}:host([resizable][minimized]) .resize-handle{display:none}:host([resizable][maximized]) .resize-handle{display:none}:host([minimizable]) .btn-minimize{display:block}:host([maximizable]) .btn-maximize{display:block}:host([minimizable][minimized]) .btn-minimize{display:none}:host([minimizable][minimized]) .btn-restore{display:block}:host([maximizable][maximized]) .btn-maximize{display:none}:host([maximizable][maximized]) .btn-restore{display:block}:host([closable]) .btn-close{display:block}:host([minimized]) .window{height:calc(2 * var(--desktop-window-border-width) + var(--desktop-window-titlebar-height))!important}:host([minimized]) .client-area{height:0}:host([maximized]) .window{border:none;top:0!important;left:0!important;width:100%!important;height:100%!important}@media (prefers-reduced-motion: no-preference){:host([maximized]) .window{transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s,top ease-out var(--desktop-window-maximize-duration),left ease-out var(--desktop-window-maximize-duration),width ease-out var(--desktop-window-maximize-duration),height ease-out var(--desktop-window-maximize-duration)!important}:host([minimized]:not([maximized])) .window{transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s,height ease-out var(--desktop-window-minimize-duration)!important}}:host([fullscreen]) .resize-handle{display:none!important}:host([fullscreen]) .titlebar{display:none}:host([fullscreen]) .window{border:none;top:0!important;left:0!important;width:100%!important;height:100%!important}:host([frameless]) .titlebar{display:none}:host([frameless]) .window{border:none;box-shadow:none;background-color:transparent}:host(:not([modal])) .backdrop{display:none}:host([modal]) .backdrop{position:absolute;inset:0;z-index:calc(2 * var(--z-index) - 1)}@keyframes border-flash{0%{box-shadow:0 0 #666}15%{box-shadow:0 0 10px #666}30%{box-shadow:0 0 #666}50%{box-shadow:0 0 10px #666}60%{box-shadow:0 0 #666}80%{box-shadow:0 0 10px #666}to{box-shadow:0 0 #666}}.window.flashed{animation:border-flash .75s ease-out}
`;var B='<div role="dialog" tabindex="-1" class="window" part="window" aria-labelledby="titlebar-text"><div class="bounds"><div class="titlebar" part="titlebar"><div class="titlebar-start" part="titlebar-start"><slot name="titlebar-start"></slot></div><div class="titlebar-center" part="titlebar-center"><slot name="titlebar-center"><div id="titlebar-text" class="titlebar-text" part="titlebar-text"></div></slot></div><div class="titlebar-end" part="titlebar-end"><slot name="titlebar-end"></slot></div><div role="button" tabindex="0" class="control-btn btn-minimize" part="minimize-button"></div><div role="button" tabindex="0" class="control-btn btn-restore" part="restore-button"></div><div role="button" tabindex="0" class="control-btn btn-maximize" part="maximize-button"></div><div role="button" tabindex="0" class="control-btn btn-close" part="close-button"></div></div><div role="document" class="client-area" part="client-area"><slot></slot></div></div><div class="resize-handle handle-n" data-direction="n"></div><div class="resize-handle handle-s" data-direction="s"></div><div class="resize-handle handle-e" data-direction="e"></div><div class="resize-handle handle-w" data-direction="w"></div><div class="resize-handle handle-nw" data-direction="nw"></div><div class="resize-handle handle-ne" data-direction="ne"></div><div class="resize-handle handle-sw" data-direction="sw"></div><div class="resize-handle handle-se" data-direction="se"></div></div><div class="backdrop"></div>';var p=class n extends HTMLElement{static shadowMode="open";static defaultX=50;static defaultY=50;static defaultWidth=350;static defaultHeight=350;static defaultMinWidth=150;static defaultMinHeight=150;static defaultMaxWidth=null;static defaultMaxHeight=null;static get observedAttributes(){return["name","x","y","width","height","minWidth","minHeight","maxWidth","maxHeight","centered","autofocus"]}static#b=20;static#f=(()=>{let t=new CSSStyleSheet;return t.replaceSync(A),t})();#e;#t;#u;#r;#d;#a;#l;#h;constructor(){super(),this.#e=this.attachShadow({mode:n.shadowMode,delegatesFocus:!0}),this.#e.adoptedStyleSheets=[n.#f],this.#e.innerHTML=B,this.#t=this.#e.querySelector(".window"),this.#u=this.#t.querySelector(".client-area"),this.#e.addEventListener("minimize",s=>{s.stopPropagation();let i=new Event("minimizing",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||(this.minimized=!0)}),this.#e.addEventListener("maximize",s=>{s.stopPropagation();let i=new Event("maximizing",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||(this.maximized=!0)}),this.#e.addEventListener("restore",s=>{s.stopPropagation();let i=new Event("restoring",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||(this.maximized=!1,this.minimized=!1)}),this.#e.addEventListener("close",s=>{s.stopPropagation();let i=new Event("closing",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||this.destroy()}),this.#e.addEventListener("request-fullscreen",s=>{if(s.stopPropagation(),this.fullscreen)return;let i=new Event("requesting-fullscreen",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||(this.fullscreen=!0)}),this.#e.addEventListener("exit-fullscreen",s=>{if(s.stopPropagation(),!this.fullscreen)return;let i=new Event("exiting-fullscreen",{bubbles:!0,cancelable:!0});this.dispatchEvent(i),i.defaultPrevented||(this.fullscreen=!1)}),this.#t.addEventListener("pointerdown",()=>{this.#t.style.setProperty("--z-index",String(n.#b++))}),this.#e.querySelector(".backdrop").addEventListener("click",()=>{this.flash()});let t=this.#e.querySelectorAll(".titlebar-start, .titlebar-end, .control-btn");for(let s of t)s.addEventListener("pointerdown",i=>{i.stopPropagation(),this.#t.style.setProperty("--z-index",String(n.#b++))}),s.addEventListener("dblclick",i=>{i.stopPropagation()});let e=this.#e.querySelector(".btn-minimize"),r=this.#e.querySelector(".btn-maximize"),o=this.#e.querySelector(".btn-restore"),a=this.#e.querySelector(".btn-close");e.addEventListener("click",()=>{this.#e.dispatchEvent(new Event("minimize",{bubbles:!0})),o.focus()}),r.addEventListener("click",()=>{this.#e.dispatchEvent(new Event("maximize",{bubbles:!0})),o.focus()}),o.addEventListener("click",()=>{let s=this.minimized,i=this.maximized;this.#e.dispatchEvent(new Event("restore",{bubbles:!0})),i?r.focus():s&&e.focus()}),a.addEventListener("click",()=>{this.#e.dispatchEvent(new Event("close",{bubbles:!0}))}),this.#t.querySelector(".titlebar").addEventListener("dblclick",()=>{this.maximizable&&(this.maximized=!this.maximized)});for(let s of this.#e.querySelectorAll(".control-btn"))s.addEventListener("keydown",i=>{i.key==="Enter"&&s.click()});this.#e.addEventListener("move",s=>{if(s.stopPropagation(),"detail"in s&&s.detail&&typeof s.detail=="object"&&"clientX"in s.detail&&"clientY"in s.detail&&typeof s.detail.clientX=="number"&&typeof s.detail.clientY=="number"){let{clientX:i,clientY:h}=s.detail;this.#e.querySelector(".titlebar").dispatchEvent(new PointerEvent("pointerdown",{clientX:i,clientY:h}))}else throw new Error("Failed to handle 'move' event. Emit a CustomEvent with detail = { clientX, clientY }.")});let d=["n","s","e","w","nw","ne","sw","se"];for(let s of d)this.#e.addEventListener("resize-"+s,i=>{if(i.stopPropagation(),"detail"in i&&i.detail&&typeof i.detail=="object"&&"clientX"in i.detail&&"clientY"in i.detail&&typeof i.detail.clientX=="number"&&typeof i.detail.clientY=="number"){let{clientX:h,clientY:w}=i.detail;this.#e.querySelector(".resize-handle.handle-"+s).dispatchEvent(new PointerEvent("pointerdown",{clientX:h,clientY:w}))}else throw new Error(`Failed to handle 'resize-${s}' event. Emit a CustomEvent with detail = { clientX, clientY }.`)})}#c(t){return Number.parseInt(t.replace("px",""))}#w(t){if(t===null)return null;let e=Number.parseInt(t);return Number.isNaN(e)||e<0?null:e}#m(t){if(t===null)return null;let e=Number.parseInt(t);return Number.isNaN(e)?null:e}#s(t){return this.#w(this.getAttribute(t))}#n(t,e){e===null?this.removeAttribute(t):this.setAttribute(t,String(Math.round(Math.max(0,e))))}#p(t){return this.#m(this.getAttribute(t))}#g(t,e){e===null?this.removeAttribute(t):this.setAttribute(t,String(Math.round(e)))}#i(t){let e=this.getAttribute(t);return e===""||e==="true"}#o(t,e){e?this.setAttribute(t,""):this.removeAttribute(t)}get name(){return this.getAttribute("name")}set name(t){t?this.setAttribute("name",t):this.removeAttribute("name")}get movable(){return this.#i("movable")}set movable(t){this.#o("movable",t)}get x(){return this.#p("x")??n.defaultX}set x(t){this.#g("x",t)}get y(){return this.#p("y")??n.defaultY}set y(t){this.#g("y",t)}get centered(){return this.#i("centered")}set centered(t){this.#o("centered",t)}get width(){return this.#s("width")??n.defaultWidth}set width(t){this.#n("width",t)}get height(){return this.#s("height")??n.defaultHeight}set height(t){this.#n("height",t)}get minWidth(){return this.#s("minWidth")??n.defaultMinWidth}set minWidth(t){this.#n("minWidth",t)}get minHeight(){return this.#s("minHeight")??n.defaultMinHeight}set minHeight(t){this.#n("minHeight",t)}get maxWidth(){return this.#s("maxWidth")??n.defaultMaxWidth??this.parentElement.offsetWidth}set maxWidth(t){this.#n("maxWidth",t)}get maxHeight(){return this.#s("maxHeight")??n.defaultMaxHeight??this.parentElement.offsetHeight}set maxHeight(t){this.#n("maxHeight",t)}get resizable(){return this.#i("resizable")}set resizable(t){this.#o("resizable",t)}get fullscreen(){return this.#i("fullscreen")}set fullscreen(t){this.#o("fullscreen",t)}get minimizable(){return this.#i("minimizable")}set minimizable(t){this.#o("minimizable",t)}get minimized(){return this.#i("minimized")}set minimized(t){let e=this.minimized;this.#o("minimized",t),e&&!t?this.dispatchEvent(new Event("restored",{bubbles:!0})):!e&&t&&this.dispatchEvent(new Event("minimized",{bubbles:!0}))}get maximizable(){return this.#i("maximizable")}set maximizable(t){this.#o("maximizable",t)}get maximized(){return this.#i("maximized")}set maximized(t){let e=this.minimized;this.#o("maximized",t),e&&!t?this.dispatchEvent(new Event("restored",{bubbles:!0})):!e&&t&&this.dispatchEvent(new Event("maximized",{bubbles:!0}))}get closable(){return this.#i("closable")}set closable(t){this.#o("closable",t)}get autofocus(){return this.#i("autofocus")}set autofocus(t){this.#o("autofocus",t)}get frameless(){return this.#i("frameless")}set frameless(t){this.#o("frameless",t)}get modal(){return this.#i("modal")}set modal(t){this.#o("modal",t)}get aspectRatio(){let t=Number.parseFloat(this.getAttribute("aspectRatio")??"0");return Number.isNaN(t)?0:Math.abs(t)}set aspectRatio(t){t===0?this.removeAttribute("aspectRatio"):Number.isFinite(t)&&this.setAttribute("aspectRatio",String(t))}get aspectRatioExtraWidth(){return this.#s("aspectRatioExtraWidth")??0}set aspectRatioExtraWidth(t){this.#n("aspectRatioExtraWidth",t)}get aspectRatioExtraHeight(){return this.#s("aspectRatioExtraHeight")??0}set aspectRatioExtraHeight(t){this.#n("aspectRatioExtraHeight",t)}flash(){this.#t.classList.remove("flashed"),this.#t.offsetWidth,this.#t.classList.add("flashed")}isFocused(){return!!this.#e.querySelector(":focus-within")}focus(){this.#t.style.setProperty("--z-index",String(n.#b++)),this.#t.focus()}blur(){this.#t.blur()}close(){let t=new Event("closing",{bubbles:!0,cancelable:!0});this.dispatchEvent(t),t.defaultPrevented||this.remove(),this.dispatchEvent(new Event("closed",{bubbles:!0}))}destroy(){this.remove(),this.dispatchEvent(new Event("closed",{bubbles:!0}))}getPosition(){let t=this.parentElement.getBoundingClientRect(),e=this.#t.getBoundingClientRect();return[e.x-t.x,e.y-t.y]}setPosition(t,e){this.x=t,this.y=e}getSize(){let t=this.#t.getBoundingClientRect();return[Math.round(t.width),Math.round(t.height)]}setSize(t,e){this.width=t,this.height=e}getNormalBounds(){return{x:this.x,y:this.y,width:this.width,height:this.height}}getBounds(){let t=this.parentElement.getBoundingClientRect(),e=this.#t.getBoundingClientRect();return{x:Math.floor(e.x)-Math.floor(t.x),y:Math.floor(e.y)-Math.floor(t.y),width:Math.floor(e.width),height:Math.floor(e.height)}}setBounds({x:t,y:e,width:r,height:o}){t!==void 0&&(this.x=t),e!==void 0&&(this.y=e),r!==void 0&&(this.width=r),o!==void 0&&(this.height=o)}getContentSize(){let t=this.#u.getBoundingClientRect();return[Math.floor(t.width),Math.floor(t.height)]}setContentSize(t,e){let[r,o]=this.getSize(),[a,d]=this.getContentSize();this.width=t-(r-a),this.height=e-(o-d)}getContentBounds(){let t=this.parentElement.getBoundingClientRect(),e=this.#u.getBoundingClientRect();return{x:Math.floor(e.x)-Math.floor(t.x),y:Math.floor(e.y)-Math.floor(t.y),width:Math.floor(e.width),height:Math.floor(e.height)}}setContentBounds({x:t,y:e,width:r,height:o}){let a=this.#t.getBoundingClientRect(),d=this.#u.getBoundingClientRect();t!==void 0&&(this.x=t-(Math.floor(d.x)-Math.floor(a.x))),e!==void 0&&(this.y=e-(Math.floor(d.y)-Math.floor(a.y))),r!==void 0&&(this.width=r+(Math.floor(a.width)-Math.floor(d.width))),o!==void 0&&(this.height=o+(Math.floor(a.height)-Math.floor(d.height)))}setAspectRatio(t,e){this.aspectRatio=t,typeof e?.width<"u"&&(this.aspectRatioExtraWidth=e?.width),typeof e?.height<"u"&&(this.aspectRatioExtraHeight=e?.height)}connectedCallback(){this.centered&&(this.#t.style.left=Math.round((this.parentElement.offsetWidth-this.width)/2)+"px",this.#t.style.top=Math.round((this.parentElement.offsetHeight-this.height)/2)+"px"),this.#t.style.left||(this.#t.style.left=n.defaultX+"px"),this.#t.style.top||(this.#t.style.top=n.defaultY+"px"),this.#t.style.width||(this.#t.style.width=n.defaultWidth+"px"),this.#t.style.height||(this.#t.style.height=n.defaultHeight+"px"),this.#v(),this.#x(),this.autofocus&&requestAnimationFrame(()=>{this.focus()})}disconnectedCallback(){this.#e=null,this.#t=null,this.#r&&(window.removeEventListener("pointermove",this.#r),this.#r=null),this.#d&&(window.removeEventListener("pointerup",this.#d),this.#d=null),this.#a&&(window.removeEventListener("pointermove",this.#a),this.#a=null),this.#l&&(window.removeEventListener("pointermove",this.#l),this.#l=null),this.#h&&(window.removeEventListener("pointerup",this.#h),this.#h=null)}attributeChangedCallback(t,e,r){if(e!==r)switch(t){case"name":this.#e.querySelector(".titlebar-text").textContent=r;break;case"centered":r!==null?this.parentElement&&(this.#t.style.left=Math.round((this.parentElement.offsetWidth-this.width)/2)+"px",this.#t.style.top=Math.round((this.parentElement.offsetHeight-this.height)/2)+"px"):(this.#t.style.left=this.x+"px",this.#t.style.top=this.y+"px");break;case"x":if(!this.centered){let w=this.#m(r)??n.defaultX;this.#t.style.left=w+"px"}break;case"y":if(!this.centered){let w=this.#m(r)??n.defaultY;this.#t.style.top=w+"px"}break;case"width":let o=this.#m(r)??n.defaultWidth;this.#t.style.width=o+"px";break;case"height":let a=this.#m(r)??n.defaultHeight;this.#t.style.height=a+"px";break;case"minWidth":let d=this.#w(r)??n.defaultMinWidth;this.width<d&&(this.width=d);break;case"minHeight":let s=this.#w(r)??n.defaultMinHeight;this.height<s&&(this.height=s);break;case"maxWidth":let i=this.#w(r)??n.defaultMaxWidth??this.parentElement.offsetWidth;this.width>i&&(this.width=i);break;case"maxHeight":let h=this.#w(r)??n.defaultMaxHeight??this.parentElement.offsetHeight;this.height>h&&(this.height=h);break;case"autofocus":r!==null&&this.focus();break}}#v(){let t,e,r,o;this.#r=d=>{let s=Math.max(o.left,Math.min(d.clientX,o.right))-t,i=Math.max(o.top,Math.min(d.clientY,o.bottom))-e;this.#t.style.left=`${Math.round(r.x+s)}px`,this.#t.style.top=`${Math.round(r.y+i)}px`},this.#d=()=>{window.removeEventListener("pointermove",this.#r),window.removeEventListener("pointerup",this.#d),this.x=this.#c(this.#t.style.left),this.y=this.#c(this.#t.style.top)},this.#e.querySelector(".titlebar").addEventListener("pointerdown",d=>{this.movable&&(t=d.clientX,e=d.clientY,r=this.#t.getBoundingClientRect(),o=this.parentElement.getBoundingClientRect(),window.addEventListener("pointermove",this.#r),window.addEventListener("pointerup",this.#d),this.centered&&(this.x=r.x,this.y=r.y,this.centered=!1))})}#x(){let t,e,r,o,a,d,s,i,h,w,f,E,M,k;this.#l=m=>{let b=Math.max(a.left,Math.min(m.clientX,a.right))-e,g=Math.max(a.top,Math.min(m.clientY,a.bottom))-r,l=o.left,z=o.top,c=o.width,u=o.height,H=o.width-w.width+E,L=o.height-w.height+M,v=t.includes("n"),R=t.includes("s"),W=t.includes("e"),x=t.includes("w");k==="w"?(c+=W?b:x?-b:0,c=Math.max(d,Math.min(c,i)),u=(c-H)/f+L,u=Math.max(s,Math.min(u,h)),v&&(z=o.bottom-u),x&&(l=o.right-c)):(u+=R?g:v?-g:0,u=Math.max(s,Math.min(u,h)),c=(u-L)*f+H,c=Math.max(d,Math.min(c,i)),v&&(z=o.bottom-u),x&&(l=o.right-c)),this.#t.style.width=`${Math.round(c)}px`,this.#t.style.height=`${Math.round(u)}px`,(x||W)&&(this.#t.style.left=`${Math.round(l)}px`),(v||R)&&(this.#t.style.top=`${Math.round(z)}px`)},this.#a=m=>{let b=Math.max(a.left,Math.min(m.clientX,a.right))-e,g=Math.max(a.top,Math.min(m.clientY,a.bottom))-r;if(t.includes("n")){let l=Math.max(s,Math.min(o.height-g,h));this.#t.style.height=`${Math.round(l)}px`,this.#t.style.top=`${Math.round(o.bottom-l)}px`}else if(t.includes("s")){let l=Math.max(s,Math.min(o.height+g,h));this.#t.style.height=`${Math.round(l)}px`}if(t.includes("e")){let l=Math.max(d,Math.min(o.width+b,i));this.#t.style.width=`${Math.round(l)}px`}else if(t.includes("w")){let l=Math.max(d,Math.min(o.width-b,i));this.#t.style.width=`${Math.round(l)}px`,this.#t.style.left=`${Math.round(o.right-l)}px`}},this.#h=()=>{window.removeEventListener("pointermove",this.#a),window.removeEventListener("pointermove",this.#l),window.removeEventListener("pointerup",this.#h),this.x=this.#c(this.#t.style.left),this.y=this.#c(this.#t.style.top),this.width=this.#c(this.#t.style.width),this.height=this.#c(this.#t.style.height)};let P=this.#e.querySelectorAll(".resize-handle");for(let m of P)m.addEventListener("pointerdown",b=>{this.resizable&&(t=m.dataset.direction,e=b.clientX,r=b.clientY,o=this.#t.getBoundingClientRect(),w=this.#u.getBoundingClientRect(),a=this.parentElement.getBoundingClientRect(),d=this.minWidth,s=this.minHeight,i=this.maxWidth,h=this.maxHeight,f=this.aspectRatio,E=this.aspectRatioExtraWidth,M=this.aspectRatioExtraHeight,t.includes("w")||t.includes("e")?k="w":k="h",f>0?window.addEventListener("pointermove",this.#l):window.addEventListener("pointermove",this.#a),window.addEventListener("pointerup",this.#h),this.centered&&(this.x=o.x,this.y=o.y,this.centered=!1))})}};function T({tag:n="desktop-window",shadowMode:t="open"}={}){customElements.get(n)||(t&&(p.shadowMode=t),customElements.define(n,p))}var F=p;return D(I);})();
