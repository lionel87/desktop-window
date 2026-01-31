"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/desktop-window.mts
var desktop_window_exports = {};
__export(desktop_window_exports, {
  DesktopWindow: () => DesktopWindow,
  default: () => desktop_window_default,
  register: () => register
});
module.exports = __toCommonJS(desktop_window_exports);

// src/desktop-window.generated.css.txt
var desktop_window_generated_css_default = `:host{--desktop-window-background-color: #fff;--desktop-window-border-width: 1px;--desktop-window-border-color: #aaa;--desktop-window-minimize-duration: .1s;--desktop-window-maximize-duration: .05s;--desktop-window-titlebar-height: 28px;--desktop-window-titlebar-text-color: #999;--desktop-window-titlebar-background-color: #fff;--desktop-window-titlebar-font-family: sans-serif;--desktop-window-titlebar-font-size: 14px;--desktop-window-minimize-button-mask-image: url('data:image/svg+xml,<svg width="14" height="1" viewBox="0 0 14 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 14,1 H 0 V 0 h 14 z" />%0D%0A</svg>%0D%0A');--desktop-window-maximize-button-mask-image: url('data:image/svg+xml,<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 16,14 H 0 V 0 H 16 Z M 15,13 V 2 H 1 V 13 Z" />%0D%0A</svg>%0D%0A');--desktop-window-restore-button-mask-image: url('data:image/svg+xml,<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 16,9 H 12 V 14 H 0 V 5 H 4 V 0 H 16 Z M 15,8 V 2 H 5 V 5 H 12 V 8 Z M 11,13 V 7 H 1 v 6 z" />%0D%0A</svg>%0D%0A');--desktop-window-close-button-mask-image: url('data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">%0D%0A%09<path d="M 14,13.377792 13.377793,14 6.9826729,7.6048821 0.6222123,14 0,13.377792 6.3951189,7.0173289 0,0.6222073 0.6222123,0 6.9826729,6.3951177 13.377793,0 14,0.6222073 7.6048859,7.0173289 Z" />%0D%0A</svg>%0D%0A');--desktop-window-buttons-width: 42px;--desktop-window-buttons-height: var(--desktop-window-titlebar-height);--desktop-window-buttons-margin: 0;--desktop-window-buttons-text-color: var(--desktop-window-titlebar-text-color);--desktop-window-buttons-background-color: rgba(110, 110, 110, 0);--desktop-window-buttons-hover-text-color: #444;--desktop-window-buttons-hover-background-color: rgba(110, 110, 110, .2);--desktop-window-minimize-text-color: var(--desktop-window-buttons-text-color);--desktop-window-minimize-background-color: var(--desktop-window-buttons-background-color);--desktop-window-minimize-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-minimize-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-maximize-text-color: var(--desktop-window-buttons-text-color);--desktop-window-maximize-background-color: var(--desktop-window-buttons-background-color);--desktop-window-maximize-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-maximize-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-restore-text-color: var(--desktop-window-buttons-text-color);--desktop-window-restore-background-color: var(--desktop-window-buttons-background-color);--desktop-window-restore-hover-text-color: var(--desktop-window-buttons-hover-text-color);--desktop-window-restore-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-close-text-color: var(--desktop-window-buttons-text-color);--desktop-window-close-background-color: var(--desktop-window-buttons-background-color);--desktop-window-close-hover-text-color: #fff;--desktop-window-close-hover-background-color: #e50000;--desktop-window-focused-background-color: var(--desktop-window-background-color);--desktop-window-focused-border-color: #fff;--desktop-window-focused-titlebar-text-color: #444;--desktop-window-focused-titlebar-background-color: var(--desktop-window-titlebar-background-color);--desktop-window-focused-buttons-text-color: var(--desktop-window-focused-titlebar-text-color);--desktop-window-focused-buttons-background-color: var(--desktop-window-buttons-background-color);--desktop-window-focused-buttons-hover-text-color: var(--desktop-window-focused-titlebar-text-color);--desktop-window-focused-buttons-hover-background-color: var(--desktop-window-buttons-hover-background-color);--desktop-window-focused-minimize-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-minimize-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-minimize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-minimize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-maximize-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-maximize-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-maximize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-maximize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-restore-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-restore-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-restore-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);--desktop-window-focused-restore-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);--desktop-window-focused-close-text-color: var(--desktop-window-focused-buttons-text-color);--desktop-window-focused-close-background-color: var(--desktop-window-focused-buttons-background-color);--desktop-window-focused-close-hover-text-color: var(--desktop-window-close-hover-text-color);--desktop-window-focused-close-hover-background-color: var(--desktop-window-close-hover-background-color)}*{box-sizing:border-box}.window{--z-index: 10;transform:translateZ(0);transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s;position:absolute;border:var(--desktop-window-border-width) solid var(--desktop-window-border-color);background-color:var(--desktop-window-background-color);box-shadow:0 2px 10px #0000001a;-webkit-user-select:none;user-select:none;outline:none;z-index:calc(2 * var(--z-index))}.resize-handle{display:none;position:absolute;z-index:10}.handle-nw,.handle-ne,.handle-sw,.handle-se{width:12px;height:12px}.handle-e,.handle-w{width:6px;top:0;bottom:0}.handle-n,.handle-s{height:6px;left:0;right:0}.handle-ne{top:-6px;right:-6px;cursor:nesw-resize}.handle-nw{top:-6px;left:-6px;cursor:nwse-resize}.handle-se{bottom:-6px;right:-6px;cursor:nwse-resize}.handle-sw{bottom:-6px;left:-6px;cursor:nesw-resize}.handle-n{top:-6px;cursor:ns-resize}.handle-s{bottom:-6px;cursor:ns-resize}.handle-e{right:-6px;cursor:ew-resize}.handle-w{left:-6px;cursor:ew-resize}.bounds{position:relative;z-index:20;width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:nowrap}.titlebar{transition:background-color linear .1s;flex-grow:0;flex-shrink:0;height:var(--desktop-window-titlebar-height);display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;background-color:var(--desktop-window-titlebar-background-color)}.titlebar-start,.titlebar-end{cursor:default;flex-grow:0;flex-shrink:0;height:100%;display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center}.titlebar-center{flex-grow:1;flex-shrink:1;min-width:0}.titlebar-text{transition:color linear .1s;font-family:var(--desktop-window-titlebar-font-family);font-size:var(--desktop-window-titlebar-font-size);color:var(--desktop-window-titlebar-text-color);line-height:var(--desktop-window-titlebar-height);padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.control-btn{cursor:default;position:relative;width:var(--desktop-window-buttons-width);height:var(--desktop-window-buttons-height);border:none;transition:color linear .1s,background-color linear .1s;margin:0 var(--desktop-window-buttons-margin) 0 0;padding:0;flex-grow:0;flex-shrink:0}.control-btn:before{content:"";position:absolute;inset:0;-webkit-mask-size:auto;mask-size:auto;-webkit-mask-position:center center;mask-position:center center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;background-color:currentColor}.btn-minimize{display:none;color:var(--desktop-window-minimize-text-color);background-color:var(--desktop-window-minimize-background-color)}.btn-minimize:hover{color:var(--desktop-window-minimize-hover-text-color);background-color:var(--desktop-window-minimize-hover-background-color)}.btn-minimize:before{-webkit-mask-image:var(--desktop-window-minimize-button-mask-image);mask-image:var(--desktop-window-minimize-button-mask-image)}.btn-maximize{display:none;color:var(--desktop-window-maximize-text-color);background-color:var(--desktop-window-maximize-background-color)}.btn-maximize:hover{color:var(--desktop-window-maximize-hover-text-color);background-color:var(--desktop-window-maximize-hover-background-color)}.btn-maximize:before{-webkit-mask-image:var(--desktop-window-maximize-button-mask-image);mask-image:var(--desktop-window-maximize-button-mask-image)}.btn-restore{display:none;color:var(--desktop-window-restore-text-color);background-color:var(--desktop-window-restore-background-color)}.btn-restore:hover{color:var(--desktop-window-restore-hover-text-color);background-color:var(--desktop-window-restore-hover-background-color)}.btn-restore:before{-webkit-mask-image:var(--desktop-window-restore-button-mask-image);mask-image:var(--desktop-window-restore-button-mask-image)}.btn-close{display:none;color:var(--desktop-window-close-text-color);background-color:var(--desktop-window-close-background-color)}.btn-close:hover{color:var(--desktop-window-close-hover-text-color);background-color:var(--desktop-window-close-hover-background-color)}.btn-close:before{-webkit-mask-image:var(--desktop-window-close-button-mask-image);mask-image:var(--desktop-window-close-button-mask-image)}.client-area{flex-grow:1;flex-shrink:1;height:calc(100% - var(--desktop-window-titlebar-height));-webkit-user-select:text;user-select:text}:host(:focus-within) .window{border-color:var(--desktop-window-focused-border-color);box-shadow:0 2px 15px #00000040}:host(:focus-within) .titlebar{background-color:var(--desktop-window-focused-titlebar-background-color)}:host(:focus-within) .titlebar-text{color:var(--desktop-window-focused-titlebar-text-color)}:host(:focus-within) .btn-minimize{color:var(--desktop-window-focused-minimize-text-color);background-color:var(--desktop-window-focused-minimize-background-color)}:host(:focus-within) .btn-minimize:hover{color:var(--desktop-window-focused-minimize-hover-text-color);background-color:var(--desktop-window-focused-minimize-hover-background-color)}:host(:focus-within) .btn-maximize{color:var(--desktop-window-focused-maximize-text-color);background-color:var(--desktop-window-focused-maximize-background-color)}:host(:focus-within) .btn-maximize:hover{color:var(--desktop-window-focused-maximize-hover-text-color);background-color:var(--desktop-window-focused-maximize-hover-background-color)}:host(:focus-within) .btn-restore{color:var(--desktop-window-focused-restore-text-color);background-color:var(--desktop-window-focused-restore-background-color)}:host(:focus-within) .btn-restore:hover{color:var(--desktop-window-focused-restore-hover-text-color);background-color:var(--desktop-window-focused-restore-hover-background-color)}:host(:focus-within) .btn-close{color:var(--desktop-window-focused-close-text-color);background-color:var(--desktop-window-focused-close-background-color)}:host(:focus-within) .btn-close:hover{color:var(--desktop-window-focused-close-hover-text-color);background-color:var(--desktop-window-focused-close-hover-background-color)}:host([movable]) .titlebar{cursor:move}:host([resizable]) .resize-handle{display:block}:host([resizable][minimized]) .resize-handle{display:none}:host([resizable][maximized]) .resize-handle{display:none}:host([minimizable]) .btn-minimize{display:block}:host([maximizable]) .btn-maximize{display:block}:host([minimizable][minimized]) .btn-minimize{display:none}:host([minimizable][minimized]) .btn-restore{display:block}:host([maximizable][maximized]) .btn-maximize{display:none}:host([maximizable][maximized]) .btn-restore{display:block}:host([closable]) .btn-close{display:block}:host([minimized]) .window{height:calc(2 * var(--desktop-window-border-width) + var(--desktop-window-titlebar-height))!important}:host([minimized]) .client-area{height:0}:host([maximized]) .window{border:none;top:0!important;left:0!important;width:100%!important;height:100%!important}@media (prefers-reduced-motion: no-preference){:host([maximized]) .window{transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s,top ease-out var(--desktop-window-maximize-duration),left ease-out var(--desktop-window-maximize-duration),width ease-out var(--desktop-window-maximize-duration),height ease-out var(--desktop-window-maximize-duration)!important}:host([minimized]:not([maximized])) .window{transition:box-shadow linear .1s,border-color linear .1s,background-color linear .1s,height ease-out var(--desktop-window-minimize-duration)!important}}:host([fullscreen]) .resize-handle{display:none!important}:host([fullscreen]) .titlebar{display:none}:host([fullscreen]) .window{border:none;top:0!important;left:0!important;width:100%!important;height:100%!important}:host([frameless]) .titlebar{display:none}:host([frameless]) .window{border:none;box-shadow:none;background-color:transparent}:host(:not([modal])) .backdrop{display:none}:host([modal]) .backdrop{position:absolute;inset:0;z-index:calc(2 * var(--z-index) - 1)}@keyframes border-flash{0%{box-shadow:0 0 #666}15%{box-shadow:0 0 10px #666}30%{box-shadow:0 0 #666}50%{box-shadow:0 0 10px #666}60%{box-shadow:0 0 #666}80%{box-shadow:0 0 10px #666}to{box-shadow:0 0 #666}}.window.flashed{animation:border-flash .75s ease-out}
`;

// src/desktop-window.generated.html.txt
var desktop_window_generated_html_default = '<div role="dialog" tabindex="-1" class="window" part="window" aria-labelledby="titlebar-text"><div class="bounds"><div class="titlebar" part="titlebar"><div class="titlebar-start" part="titlebar-start"><slot name="titlebar-start"></slot></div><div class="titlebar-center" part="titlebar-center"><slot name="titlebar-center"><div id="titlebar-text" class="titlebar-text" part="titlebar-text"></div></slot></div><div class="titlebar-end" part="titlebar-end"><slot name="titlebar-end"></slot></div><div role="button" tabindex="0" class="control-btn btn-minimize" part="minimize-button"></div><div role="button" tabindex="0" class="control-btn btn-restore" part="restore-button"></div><div role="button" tabindex="0" class="control-btn btn-maximize" part="maximize-button"></div><div role="button" tabindex="0" class="control-btn btn-close" part="close-button"></div></div><div role="document" class="client-area" part="client-area"><slot></slot></div></div><div class="resize-handle handle-n" data-direction="n"></div><div class="resize-handle handle-s" data-direction="s"></div><div class="resize-handle handle-e" data-direction="e"></div><div class="resize-handle handle-w" data-direction="w"></div><div class="resize-handle handle-nw" data-direction="nw"></div><div class="resize-handle handle-ne" data-direction="ne"></div><div class="resize-handle handle-sw" data-direction="sw"></div><div class="resize-handle handle-se" data-direction="se"></div></div><div class="backdrop"></div>';

// src/desktop-window.mts
var DesktopWindow = class _DesktopWindow extends HTMLElement {
  static shadowMode = "open";
  static defaultX = 50;
  static defaultY = 50;
  static defaultWidth = 350;
  static defaultHeight = 350;
  static defaultMinWidth = 150;
  static defaultMinHeight = 150;
  static defaultMaxWidth = null;
  static defaultMaxHeight = null;
  static get observedAttributes() {
    return [
      "name",
      "x",
      "y",
      "width",
      "height",
      "minwidth",
      "minheight",
      "maxwidth",
      "maxheight",
      "centered",
      "autofocus"
    ];
  }
  static #nextZIndex = 20;
  static #stylesheet = (() => {
    const style = new CSSStyleSheet();
    style.replaceSync(desktop_window_generated_css_default);
    return style;
  })();
  #shadowRoot;
  #window;
  #clientArea;
  #dragPointerMove;
  #dragPointerUp;
  #resizePointerMove;
  #resizePointerMoveAspect;
  #resizePointerUp;
  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({
      mode: _DesktopWindow.shadowMode,
      delegatesFocus: true
    });
    this.#shadowRoot.adoptedStyleSheets = [_DesktopWindow.#stylesheet];
    this.#shadowRoot.innerHTML = desktop_window_generated_html_default;
    this.#window = this.#shadowRoot.querySelector(".window");
    this.#clientArea = this.#window.querySelector(".client-area");
    this.#shadowRoot.addEventListener("minimize", (event) => {
      event.stopPropagation();
      const minimizing = new Event("minimizing", { bubbles: true, cancelable: true });
      this.dispatchEvent(minimizing);
      if (!minimizing.defaultPrevented) {
        this.minimized = true;
      }
    });
    this.#shadowRoot.addEventListener("maximize", (event) => {
      event.stopPropagation();
      const maximizing = new Event("maximizing", { bubbles: true, cancelable: true });
      this.dispatchEvent(maximizing);
      if (!maximizing.defaultPrevented) {
        this.maximized = true;
      }
    });
    this.#shadowRoot.addEventListener("restore", (event) => {
      event.stopPropagation();
      const restoring = new Event("restoring", { bubbles: true, cancelable: true });
      this.dispatchEvent(restoring);
      if (!restoring.defaultPrevented) {
        this.maximized = false;
        this.minimized = false;
      }
    });
    this.#shadowRoot.addEventListener("close", (event) => {
      event.stopPropagation();
      const closing = new Event("closing", { bubbles: true, cancelable: true });
      this.dispatchEvent(closing);
      if (!closing.defaultPrevented) {
        this.destroy();
      }
    });
    this.#shadowRoot.addEventListener("request-fullscreen", (event) => {
      event.stopPropagation();
      if (this.fullscreen) return;
      const requestingFullscreen = new Event("requesting-fullscreen", { bubbles: true, cancelable: true });
      this.dispatchEvent(requestingFullscreen);
      if (!requestingFullscreen.defaultPrevented) {
        this.fullscreen = true;
      }
    });
    this.#shadowRoot.addEventListener("exit-fullscreen", (event) => {
      event.stopPropagation();
      if (!this.fullscreen) return;
      const exitingFullscreen = new Event("exiting-fullscreen", { bubbles: true, cancelable: true });
      this.dispatchEvent(exitingFullscreen);
      if (!exitingFullscreen.defaultPrevented) {
        this.fullscreen = false;
      }
    });
    this.#window.addEventListener("pointerdown", () => {
      this.#window.style.setProperty("--z-index", String(_DesktopWindow.#nextZIndex++));
    });
    this.#shadowRoot.querySelector(".backdrop").addEventListener("click", () => {
      this.flash();
    });
    const controls = this.#shadowRoot.querySelectorAll(".titlebar-start, .titlebar-end, .control-btn");
    for (const control of controls) {
      control.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        this.#window.style.setProperty("--z-index", String(_DesktopWindow.#nextZIndex++));
      });
      control.addEventListener("dblclick", (event) => {
        event.stopPropagation();
      });
    }
    const minimize = this.#shadowRoot.querySelector(".btn-minimize");
    const maximize = this.#shadowRoot.querySelector(".btn-maximize");
    const restore = this.#shadowRoot.querySelector(".btn-restore");
    const close = this.#shadowRoot.querySelector(".btn-close");
    minimize.addEventListener("click", () => {
      this.#shadowRoot.dispatchEvent(new Event("minimize", { bubbles: true }));
      restore.focus();
    });
    maximize.addEventListener("click", () => {
      this.#shadowRoot.dispatchEvent(new Event("maximize", { bubbles: true }));
      restore.focus();
    });
    restore.addEventListener("click", () => {
      const oldMinimized = this.minimized;
      const oldMaximized = this.maximized;
      this.#shadowRoot.dispatchEvent(new Event("restore", { bubbles: true }));
      if (oldMaximized) {
        maximize.focus();
      } else if (oldMinimized) {
        minimize.focus();
      }
    });
    close.addEventListener("click", () => {
      this.#shadowRoot.dispatchEvent(new Event("close", { bubbles: true }));
    });
    this.#window.querySelector(".titlebar").addEventListener("dblclick", () => {
      if (this.maximizable) {
        this.maximized = !this.maximized;
      }
    });
    for (const btn of this.#shadowRoot.querySelectorAll(".control-btn")) {
      btn.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          btn.click();
        }
      });
    }
    this.#shadowRoot.addEventListener("move", (event) => {
      event.stopPropagation();
      if ("detail" in event && event.detail && typeof event.detail === "object" && "clientX" in event.detail && "clientY" in event.detail && typeof event.detail.clientX === "number" && typeof event.detail.clientY === "number") {
        const { clientX, clientY } = event.detail;
        this.#shadowRoot.querySelector(".titlebar").dispatchEvent(new PointerEvent("pointerdown", { clientX, clientY }));
      } else {
        throw new Error(`Failed to handle 'move' event. Emit a CustomEvent with detail = { clientX, clientY }.`);
      }
    });
    const directions = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    for (const direction of directions) {
      this.#shadowRoot.addEventListener("resize-" + direction, (event) => {
        event.stopPropagation();
        if ("detail" in event && event.detail && typeof event.detail === "object" && "clientX" in event.detail && "clientY" in event.detail && typeof event.detail.clientX === "number" && typeof event.detail.clientY === "number") {
          const { clientX, clientY } = event.detail;
          this.#shadowRoot.querySelector(".resize-handle.handle-" + direction).dispatchEvent(new PointerEvent("pointerdown", { clientX, clientY }));
        } else {
          throw new Error(`Failed to handle 'resize-${direction}' event. Emit a CustomEvent with detail = { clientX, clientY }.`);
        }
      });
    }
  }
  #cssPixelToInteger(propertyValue) {
    return Number.parseInt(propertyValue.replace("px", ""));
  }
  #parseUnsigned(value) {
    if (value === null) return null;
    const intVal = Number.parseInt(value);
    return Number.isNaN(intVal) || intVal < 0 ? null : intVal;
  }
  #parseInteger(value) {
    if (value === null) return null;
    const intVal = Number.parseInt(value);
    return Number.isNaN(intVal) ? null : intVal;
  }
  #getUnsignedAttribute(name) {
    return this.#parseUnsigned(this.getAttribute(name));
  }
  #setUnsignedAttribute(name, value) {
    if (value === null) {
      this.removeAttribute(name);
    } else {
      this.setAttribute(name, String(Math.round(Math.max(0, value))));
    }
  }
  #getIntegerAttribute(name) {
    return this.#parseInteger(this.getAttribute(name));
  }
  #setIntegerAttribute(name, value) {
    if (value === null) {
      this.removeAttribute(name);
    } else {
      this.setAttribute(name, String(Math.round(value)));
    }
  }
  #getBooleanAttribute(name) {
    const value = this.getAttribute(name);
    return value === "" || value === "true";
  }
  #setBooleanAttribute(name, value) {
    if (value) {
      this.setAttribute(name, "");
    } else {
      this.removeAttribute(name);
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }
  get movable() {
    return this.#getBooleanAttribute("movable");
  }
  set movable(value) {
    this.#setBooleanAttribute("movable", value);
  }
  get x() {
    return this.#getIntegerAttribute("x") ?? _DesktopWindow.defaultX;
  }
  set x(value) {
    this.#setIntegerAttribute("x", value);
  }
  get y() {
    return this.#getIntegerAttribute("y") ?? _DesktopWindow.defaultY;
  }
  set y(value) {
    this.#setIntegerAttribute("y", value);
  }
  get centered() {
    return this.#getBooleanAttribute("centered");
  }
  set centered(value) {
    this.#setBooleanAttribute("centered", value);
  }
  get width() {
    return this.#getUnsignedAttribute("width") ?? _DesktopWindow.defaultWidth;
  }
  set width(value) {
    this.#setUnsignedAttribute("width", value);
  }
  get height() {
    return this.#getUnsignedAttribute("height") ?? _DesktopWindow.defaultHeight;
  }
  set height(value) {
    this.#setUnsignedAttribute("height", value);
  }
  get minWidth() {
    return this.#getUnsignedAttribute("minwidth") ?? _DesktopWindow.defaultMinWidth;
  }
  set minWidth(value) {
    this.#setUnsignedAttribute("minwidth", value);
  }
  get minHeight() {
    return this.#getUnsignedAttribute("minheight") ?? _DesktopWindow.defaultMinHeight;
  }
  set minHeight(value) {
    this.#setUnsignedAttribute("minheight", value);
  }
  get maxWidth() {
    return this.#getUnsignedAttribute("maxwidth") ?? _DesktopWindow.defaultMaxWidth ?? this.parentElement.offsetWidth;
  }
  set maxWidth(value) {
    this.#setUnsignedAttribute("maxwidth", value);
  }
  get maxHeight() {
    return this.#getUnsignedAttribute("maxheight") ?? _DesktopWindow.defaultMaxHeight ?? this.parentElement.offsetHeight;
  }
  set maxHeight(value) {
    this.#setUnsignedAttribute("maxheight", value);
  }
  get resizable() {
    return this.#getBooleanAttribute("resizable");
  }
  set resizable(value) {
    this.#setBooleanAttribute("resizable", value);
  }
  get fullscreen() {
    return this.#getBooleanAttribute("fullscreen");
  }
  set fullscreen(value) {
    this.#setBooleanAttribute("fullscreen", value);
  }
  get minimizable() {
    return this.#getBooleanAttribute("minimizable");
  }
  set minimizable(value) {
    this.#setBooleanAttribute("minimizable", value);
  }
  get minimized() {
    return this.#getBooleanAttribute("minimized");
  }
  set minimized(value) {
    const oldValue = this.minimized;
    this.#setBooleanAttribute("minimized", value);
    if (oldValue && !value) {
      this.dispatchEvent(new Event("restored", { bubbles: true }));
    } else if (!oldValue && value) {
      this.dispatchEvent(new Event("minimized", { bubbles: true }));
    }
  }
  get maximizable() {
    return this.#getBooleanAttribute("maximizable");
  }
  set maximizable(value) {
    this.#setBooleanAttribute("maximizable", value);
  }
  get maximized() {
    return this.#getBooleanAttribute("maximized");
  }
  set maximized(value) {
    const oldValue = this.minimized;
    this.#setBooleanAttribute("maximized", value);
    if (oldValue && !value) {
      this.dispatchEvent(new Event("restored", { bubbles: true }));
    } else if (!oldValue && value) {
      this.dispatchEvent(new Event("maximized", { bubbles: true }));
    }
  }
  get closable() {
    return this.#getBooleanAttribute("closable");
  }
  set closable(value) {
    this.#setBooleanAttribute("closable", value);
  }
  get autofocus() {
    return this.#getBooleanAttribute("autofocus");
  }
  set autofocus(value) {
    this.#setBooleanAttribute("autofocus", value);
  }
  get frameless() {
    return this.#getBooleanAttribute("frameless");
  }
  set frameless(value) {
    this.#setBooleanAttribute("frameless", value);
  }
  get modal() {
    return this.#getBooleanAttribute("modal");
  }
  set modal(value) {
    this.#setBooleanAttribute("modal", value);
  }
  get aspectRatio() {
    const value = Number.parseFloat(this.getAttribute("aspectratio") ?? "0");
    if (Number.isNaN(value)) return 0;
    return Math.abs(value);
  }
  set aspectRatio(value) {
    if (value === 0) {
      this.removeAttribute("aspectratio");
    } else if (Number.isFinite(value)) {
      this.setAttribute("aspectratio", String(value));
    }
  }
  get aspectRatioExtraWidth() {
    return this.#getUnsignedAttribute("aspectratioextrawidth") ?? 0;
  }
  set aspectRatioExtraWidth(value) {
    this.#setUnsignedAttribute("aspectratioextrawidth", value);
  }
  get aspectRatioExtraHeight() {
    return this.#getUnsignedAttribute("aspectratioextraheight") ?? 0;
  }
  set aspectRatioExtraHeight(value) {
    this.#setUnsignedAttribute("aspectratioextraheight", value);
  }
  flash() {
    this.#window.classList.remove("flashed");
    void this.#window.offsetWidth;
    this.#window.classList.add("flashed");
  }
  isFocused() {
    return !!this.#shadowRoot.querySelector(":focus-within");
  }
  focus() {
    this.#window.style.setProperty("--z-index", String(_DesktopWindow.#nextZIndex++));
    this.#window.focus();
  }
  blur() {
    this.#window.blur();
  }
  close() {
    const closing = new Event("closing", { bubbles: true, cancelable: true });
    this.dispatchEvent(closing);
    if (!closing.defaultPrevented) {
      this.remove();
      this.dispatchEvent(new Event("closed", { bubbles: true }));
    }
  }
  destroy() {
    this.remove();
    this.dispatchEvent(new Event("closed", { bubbles: true }));
  }
  getPosition() {
    const parentBounds = this.parentElement.getBoundingClientRect();
    const windowBounds = this.#window.getBoundingClientRect();
    return [windowBounds.x - parentBounds.x, windowBounds.y - parentBounds.y];
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  getSize() {
    const windowBounds = this.#window.getBoundingClientRect();
    return [Math.round(windowBounds.width), Math.round(windowBounds.height)];
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  getNormalBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
  getBounds() {
    const parentBounds = this.parentElement.getBoundingClientRect();
    const windowBounds = this.#window.getBoundingClientRect();
    return {
      x: Math.floor(windowBounds.x) - Math.floor(parentBounds.x),
      y: Math.floor(windowBounds.y) - Math.floor(parentBounds.y),
      width: Math.floor(windowBounds.width),
      height: Math.floor(windowBounds.height)
    };
  }
  setBounds({ x, y, width, height }) {
    if (void 0 !== x) this.x = x;
    if (void 0 !== y) this.y = y;
    if (void 0 !== width) this.width = width;
    if (void 0 !== height) this.height = height;
  }
  getContentSize() {
    const clientBounds = this.#clientArea.getBoundingClientRect();
    return [Math.floor(clientBounds.width), Math.floor(clientBounds.height)];
  }
  setContentSize(width, height) {
    const [windowWidth, windowHeight] = this.getSize();
    const [contentWidth, contentHeight] = this.getContentSize();
    this.width = width - (windowWidth - contentWidth);
    this.height = height - (windowHeight - contentHeight);
  }
  getContentBounds() {
    const parentBounds = this.parentElement.getBoundingClientRect();
    const clientBounds = this.#clientArea.getBoundingClientRect();
    return {
      x: Math.floor(clientBounds.x) - Math.floor(parentBounds.x),
      y: Math.floor(clientBounds.y) - Math.floor(parentBounds.y),
      width: Math.floor(clientBounds.width),
      height: Math.floor(clientBounds.height)
    };
  }
  setContentBounds({ x, y, width, height }) {
    const windowBounds = this.#window.getBoundingClientRect();
    const clientBounds = this.#clientArea.getBoundingClientRect();
    if (void 0 !== x) this.x = x - (Math.floor(clientBounds.x) - Math.floor(windowBounds.x));
    if (void 0 !== y) this.y = y - (Math.floor(clientBounds.y) - Math.floor(windowBounds.y));
    if (void 0 !== width) this.width = width + (Math.floor(windowBounds.width) - Math.floor(clientBounds.width));
    if (void 0 !== height) this.height = height + (Math.floor(windowBounds.height) - Math.floor(clientBounds.height));
  }
  setAspectRatio(ratio, extraSize) {
    this.aspectRatio = ratio;
    if (typeof extraSize?.width !== "undefined") {
      this.aspectRatioExtraWidth = extraSize?.width;
    }
    if (typeof extraSize?.height !== "undefined") {
      this.aspectRatioExtraHeight = extraSize?.height;
    }
  }
  connectedCallback() {
    if (this.centered) {
      this.#window.style.left = Math.round((this.parentElement.offsetWidth - this.width) / 2) + "px";
      this.#window.style.top = Math.round((this.parentElement.offsetHeight - this.height) / 2) + "px";
    }
    if (!this.#window.style.left) {
      this.#window.style.left = _DesktopWindow.defaultX + "px";
    }
    if (!this.#window.style.top) {
      this.#window.style.top = _DesktopWindow.defaultY + "px";
    }
    if (!this.#window.style.width) {
      this.#window.style.width = _DesktopWindow.defaultWidth + "px";
    }
    if (!this.#window.style.height) {
      this.#window.style.height = _DesktopWindow.defaultHeight + "px";
    }
    this.#setupDragging();
    this.#setupResizing();
    if (this.autofocus) {
      requestAnimationFrame(() => {
        this.focus();
      });
    }
  }
  disconnectedCallback() {
    this.#shadowRoot = null;
    this.#window = null;
    if (this.#dragPointerMove) {
      window.removeEventListener("pointermove", this.#dragPointerMove);
      this.#dragPointerMove = null;
    }
    if (this.#dragPointerUp) {
      window.removeEventListener("pointerup", this.#dragPointerUp);
      this.#dragPointerUp = null;
    }
    if (this.#resizePointerMove) {
      window.removeEventListener("pointermove", this.#resizePointerMove);
      this.#resizePointerMove = null;
    }
    if (this.#resizePointerMoveAspect) {
      window.removeEventListener("pointermove", this.#resizePointerMoveAspect);
      this.#resizePointerMoveAspect = null;
    }
    if (this.#resizePointerUp) {
      window.removeEventListener("pointerup", this.#resizePointerUp);
      this.#resizePointerUp = null;
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "name":
        this.#shadowRoot.querySelector(".titlebar-text").textContent = newValue;
        break;
      case "centered":
        if (newValue !== null) {
          if (this.parentElement) {
            this.#window.style.left = Math.round((this.parentElement.offsetWidth - this.width) / 2) + "px";
            this.#window.style.top = Math.round((this.parentElement.offsetHeight - this.height) / 2) + "px";
          }
        } else {
          this.#window.style.left = this.x + "px";
          this.#window.style.top = this.y + "px";
        }
        break;
      case "x":
        if (!this.centered) {
          const x = this.#parseInteger(newValue) ?? _DesktopWindow.defaultX;
          this.#window.style.left = x + "px";
        }
        break;
      case "y":
        if (!this.centered) {
          const y = this.#parseInteger(newValue) ?? _DesktopWindow.defaultY;
          this.#window.style.top = y + "px";
        }
        break;
      case "width":
        const width = this.#parseInteger(newValue) ?? _DesktopWindow.defaultWidth;
        this.#window.style.width = width + "px";
        break;
      case "height":
        const height = this.#parseInteger(newValue) ?? _DesktopWindow.defaultHeight;
        this.#window.style.height = height + "px";
        break;
      case "minwidth":
        const minWidth = this.#parseUnsigned(newValue) ?? _DesktopWindow.defaultMinWidth;
        if (this.width < minWidth) {
          this.width = minWidth;
        }
        break;
      case "minheight":
        const minHeight = this.#parseUnsigned(newValue) ?? _DesktopWindow.defaultMinHeight;
        if (this.height < minHeight) {
          this.height = minHeight;
        }
        break;
      case "maxwidth":
        const maxWidth = this.#parseUnsigned(newValue) ?? _DesktopWindow.defaultMaxWidth ?? this.parentElement.offsetWidth;
        if (this.width > maxWidth) {
          this.width = maxWidth;
        }
        break;
      case "maxheight":
        const maxHeight = this.#parseUnsigned(newValue) ?? _DesktopWindow.defaultMaxHeight ?? this.parentElement.offsetHeight;
        if (this.height > maxHeight) {
          this.height = maxHeight;
        }
        break;
      case "autofocus":
        if (newValue !== null) {
          this.focus();
        }
        break;
    }
  }
  #setupDragging() {
    let startClientX, startClientY;
    let start;
    let parentRect;
    this.#dragPointerMove = (event) => {
      const dx = Math.max(parentRect.left, Math.min(event.clientX, parentRect.right)) - startClientX;
      const dy = Math.max(parentRect.top, Math.min(event.clientY, parentRect.bottom)) - startClientY;
      this.#window.style.left = `${Math.round(start.x + dx)}px`;
      this.#window.style.top = `${Math.round(start.y + dy)}px`;
    };
    this.#dragPointerUp = () => {
      window.removeEventListener("pointermove", this.#dragPointerMove);
      window.removeEventListener("pointerup", this.#dragPointerUp);
      this.x = this.#cssPixelToInteger(this.#window.style.left);
      this.y = this.#cssPixelToInteger(this.#window.style.top);
    };
    const titlebar = this.#shadowRoot.querySelector(".titlebar");
    titlebar.addEventListener("pointerdown", (event) => {
      if (!this.movable) return;
      startClientX = event.clientX;
      startClientY = event.clientY;
      start = this.#window.getBoundingClientRect();
      parentRect = this.parentElement.getBoundingClientRect();
      window.addEventListener("pointermove", this.#dragPointerMove);
      window.addEventListener("pointerup", this.#dragPointerUp);
      if (this.centered) {
        this.x = start.x;
        this.y = start.y;
        this.centered = false;
      }
    });
  }
  #setupResizing() {
    let direction;
    let startClientX, startClientY;
    let start;
    let parentRect;
    let minWidth, minHeight, maxWidth, maxHeight;
    let startClient;
    let aspectRatio;
    let aspectExtraW;
    let aspectExtraH;
    let aspectDominantAxis;
    this.#resizePointerMoveAspect = (event) => {
      const dx = Math.max(parentRect.left, Math.min(event.clientX, parentRect.right)) - startClientX;
      const dy = Math.max(parentRect.top, Math.min(event.clientY, parentRect.bottom)) - startClientY;
      let newX = start.left;
      let newY = start.top;
      let newW = start.width;
      let newH = start.height;
      const extraW = start.width - startClient.width + aspectExtraW;
      const extraH = start.height - startClient.height + aspectExtraH;
      const dirN = direction.includes("n");
      const dirS = direction.includes("s");
      const dirE = direction.includes("e");
      const dirW = direction.includes("w");
      if (aspectDominantAxis === "w") {
        newW += dirE ? dx : dirW ? -dx : 0;
        newW = Math.max(minWidth, Math.min(newW, maxWidth));
        newH = (newW - extraW) / aspectRatio + extraH;
        newH = Math.max(minHeight, Math.min(newH, maxHeight));
        if (dirN) newY = start.bottom - newH;
        if (dirW) newX = start.right - newW;
      } else {
        newH += dirS ? dy : dirN ? -dy : 0;
        newH = Math.max(minHeight, Math.min(newH, maxHeight));
        newW = (newH - extraH) * aspectRatio + extraW;
        newW = Math.max(minWidth, Math.min(newW, maxWidth));
        if (dirN) newY = start.bottom - newH;
        if (dirW) newX = start.right - newW;
      }
      this.#window.style.width = `${Math.round(newW)}px`;
      this.#window.style.height = `${Math.round(newH)}px`;
      if (dirW || dirE) this.#window.style.left = `${Math.round(newX)}px`;
      if (dirN || dirS) this.#window.style.top = `${Math.round(newY)}px`;
    };
    this.#resizePointerMove = (event) => {
      const dx = Math.max(parentRect.left, Math.min(event.clientX, parentRect.right)) - startClientX;
      const dy = Math.max(parentRect.top, Math.min(event.clientY, parentRect.bottom)) - startClientY;
      if (direction.includes("n")) {
        const h = Math.max(minHeight, Math.min(start.height - dy, maxHeight));
        this.#window.style.height = `${Math.round(h)}px`;
        this.#window.style.top = `${Math.round(start.bottom - h)}px`;
      } else if (direction.includes("s")) {
        const h = Math.max(minHeight, Math.min(start.height + dy, maxHeight));
        this.#window.style.height = `${Math.round(h)}px`;
      }
      if (direction.includes("e")) {
        const w = Math.max(minWidth, Math.min(start.width + dx, maxWidth));
        this.#window.style.width = `${Math.round(w)}px`;
      } else if (direction.includes("w")) {
        const w = Math.max(minWidth, Math.min(start.width - dx, maxWidth));
        this.#window.style.width = `${Math.round(w)}px`;
        this.#window.style.left = `${Math.round(start.right - w)}px`;
      }
    };
    this.#resizePointerUp = () => {
      window.removeEventListener("pointermove", this.#resizePointerMove);
      window.removeEventListener("pointermove", this.#resizePointerMoveAspect);
      window.removeEventListener("pointerup", this.#resizePointerUp);
      this.x = this.#cssPixelToInteger(this.#window.style.left);
      this.y = this.#cssPixelToInteger(this.#window.style.top);
      this.width = this.#cssPixelToInteger(this.#window.style.width);
      this.height = this.#cssPixelToInteger(this.#window.style.height);
    };
    const handles = this.#shadowRoot.querySelectorAll(".resize-handle");
    for (const handle of handles) {
      handle.addEventListener("pointerdown", (event) => {
        if (!this.resizable) return;
        direction = handle.dataset.direction;
        startClientX = event.clientX;
        startClientY = event.clientY;
        start = this.#window.getBoundingClientRect();
        startClient = this.#clientArea.getBoundingClientRect();
        parentRect = this.parentElement.getBoundingClientRect();
        minWidth = this.minWidth;
        minHeight = this.minHeight;
        maxWidth = this.maxWidth;
        maxHeight = this.maxHeight;
        aspectRatio = this.aspectRatio;
        aspectExtraW = this.aspectRatioExtraWidth;
        aspectExtraH = this.aspectRatioExtraHeight;
        if (direction.includes("w") || direction.includes("e")) aspectDominantAxis = "w";
        else aspectDominantAxis = "h";
        if (aspectRatio > 0) {
          window.addEventListener("pointermove", this.#resizePointerMoveAspect);
        } else {
          window.addEventListener("pointermove", this.#resizePointerMove);
        }
        window.addEventListener("pointerup", this.#resizePointerUp);
        if (this.centered) {
          this.x = start.x;
          this.y = start.y;
          this.centered = false;
        }
      });
    }
  }
};
function register({ tag = "desktop-window", shadowMode = "open" } = {}) {
  if (customElements.get(tag)) return;
  if (shadowMode) {
    DesktopWindow.shadowMode = shadowMode;
  }
  customElements.define(tag, DesktopWindow);
}
var desktop_window_default = DesktopWindow;
