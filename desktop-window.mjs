
const svgToDataUrl = (svgSrc) => `data:image/svg+xml;utf8,${encodeURIComponent(svgSrc)}`;

const closeIcon = svgToDataUrl(`<svg width="14" height="14" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 14,13.377792 13.377793,14 6.9826729,7.6048821 0.6222123,14 0,13.377792 6.3951189,7.0173289 0,0.6222073 0.6222123,0 6.9826729,6.3951177 13.377793,0 14,0.6222073 7.6048859,7.0173289 Z" /></svg>`);
const maximizeIcon = svgToDataUrl(`<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 16,14 H 0 V 0 H 16 Z M 15,13 V 2 H 1 V 13 Z" /></svg>`);
const minimizeIcon = svgToDataUrl(`<svg width="14" height="1" viewBox="0 0 14 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 14,1 H 0 V 0 h 14 z" /></svg>`);
const restoreIcon = svgToDataUrl(`<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 16,9 H 12 V 14 H 0 V 5 H 4 V 0 H 16 Z M 15,8 V 2 H 5 V 5 H 12 V 8 Z M 11,13 V 7 H 1 v 6 z" /></svg>`);

export class DesktopWindow extends HTMLElement {

	static shadowMode = 'open';
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
			'name',
			'centered',
			'x', 'y',
			'width', 'height',
			// 'contentWidth', 'contentHeight',
			'minWidth', 'minHeight',
			'maxWidth', 'maxHeight',
			'autofocus',
		];
	}

	static #nextZIndex = 20;

	static #stylesheet = (() => {
		const style = new CSSStyleSheet();
		style.replaceSync(`
			:host {
				--desktop-window-background-color: #fff;

				--desktop-window-border-width: 1px;
				--desktop-window-border-color: #aaa;

				--desktop-window-titlebar-height: 28px;
				--desktop-window-titlebar-text-color: #999;
				--desktop-window-titlebar-background-color: #fff;
				--desktop-window-titlebar-font-family: sans-serif;
				--desktop-window-titlebar-font-size: 14px;

				--desktop-window-minimize-button-mask-image: url(${minimizeIcon});
				--desktop-window-maximize-button-mask-image: url(${maximizeIcon});
				--desktop-window-restore-button-mask-image: url(${restoreIcon});
				--desktop-window-close-button-mask-image: url(${closeIcon});

				--desktop-window-buttons-width: 42px;
				--desktop-window-buttons-height: var(--desktop-window-titlebar-height);
				--desktop-window-buttons-margin: 0;
				--desktop-window-buttons-text-color: var(--desktop-window-titlebar-text-color);
				--desktop-window-buttons-background-color: rgba(110, 110, 110, 0);
				--desktop-window-buttons-hover-text-color: #444;
				--desktop-window-buttons-hover-background-color: rgba(110, 110, 110, .2);

				--desktop-window-minimize-text-color: var(--desktop-window-buttons-text-color);
				--desktop-window-minimize-background-color: var(--desktop-window-buttons-background-color);
				--desktop-window-minimize-hover-text-color: var(--desktop-window-buttons-hover-text-color);
				--desktop-window-minimize-hover-background-color: var(--desktop-window-buttons-hover-background-color);

				--desktop-window-maximize-text-color: var(--desktop-window-buttons-text-color);
				--desktop-window-maximize-background-color: var(--desktop-window-buttons-background-color);
				--desktop-window-maximize-hover-text-color: var(--desktop-window-buttons-hover-text-color);
				--desktop-window-maximize-hover-background-color: var(--desktop-window-buttons-hover-background-color);

				--desktop-window-restore-text-color: var(--desktop-window-buttons-text-color);
				--desktop-window-restore-background-color: var(--desktop-window-buttons-background-color);
				--desktop-window-restore-hover-text-color: var(--desktop-window-buttons-hover-text-color);
				--desktop-window-restore-hover-background-color: var(--desktop-window-buttons-hover-background-color);

				--desktop-window-close-text-color: var(--desktop-window-buttons-text-color);
				--desktop-window-close-background-color: var(--desktop-window-buttons-background-color);
				--desktop-window-close-hover-text-color: #fff;
				--desktop-window-close-hover-background-color: #e50000;

				--desktop-window-focused-background-color: var(--desktop-window-background-color);
				--desktop-window-focused-border-color: #fff;

				--desktop-window-focused-titlebar-text-color: #444;
				--desktop-window-focused-titlebar-background-color: var(--desktop-window-titlebar-background-color);

				--desktop-window-focused-buttons-text-color: var(--desktop-window-focused-titlebar-text-color);
				--desktop-window-focused-buttons-background-color: var(--desktop-window-buttons-background-color);
				--desktop-window-focused-buttons-hover-text-color: var(--desktop-window-focused-titlebar-text-color);
				--desktop-window-focused-buttons-hover-background-color: var(--desktop-window-buttons-hover-background-color);

				--desktop-window-focused-minimize-text-color: var(--desktop-window-focused-buttons-text-color);
				--desktop-window-focused-minimize-background-color: var(--desktop-window-focused-buttons-background-color);
				--desktop-window-focused-minimize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);
				--desktop-window-focused-minimize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);

				--desktop-window-focused-maximize-text-color: var(--desktop-window-focused-buttons-text-color);
				--desktop-window-focused-maximize-background-color: var(--desktop-window-focused-buttons-background-color);
				--desktop-window-focused-maximize-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);
				--desktop-window-focused-maximize-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);

				--desktop-window-focused-restore-text-color: var(--desktop-window-focused-buttons-text-color);
				--desktop-window-focused-restore-background-color: var(--desktop-window-focused-buttons-background-color);
				--desktop-window-focused-restore-hover-text-color: var(--desktop-window-focused-buttons-hover-text-color);
				--desktop-window-focused-restore-hover-background-color: var(--desktop-window-focused-buttons-hover-background-color);

				--desktop-window-focused-close-text-color: var(--desktop-window-focused-buttons-text-color);
				--desktop-window-focused-close-background-color: var(--desktop-window-focused-buttons-background-color);
				--desktop-window-focused-close-hover-text-color: var(--desktop-window-close-hover-text-color);
				--desktop-window-focused-close-hover-background-color: var(--desktop-window-close-hover-background-color);
			}

			.window {
				transform: translate3d(0, 0, 0); /* forces GPU layer to stabilize subpixel text/image rendering */
				transition: box-shadow linear .1s, border-color linear .1s, background-color linear .1s;
				position: absolute;
				border: var(--desktop-window-border-width) solid var(--desktop-window-border-color);
				background-color: var(--desktop-window-background-color);
				box-shadow: 0 2px 10px rgba(0,0,0,0.1);
				box-sizing: border-box;
				-webkit-user-select: none;
				user-select: none;
				outline: none;
			}

			.resize-handle { display: none; position: absolute; z-index: 10; }
			.handle-nw, .handle-ne, .handle-sw, .handle-se { width: 12px; height: 12px; }
			.handle-e, .handle-w { width: 6px; top: 0; bottom: 0; }
			.handle-n, .handle-s { height: 6px; left: 0; right: 0; }
			.handle-ne { top: -6px; right: -6px; cursor: nesw-resize; }
			.handle-nw { top: -6px; left: -6px; cursor: nwse-resize; }
			.handle-se { bottom: -6px; right: -6px; cursor: nwse-resize; }
			.handle-sw { bottom: -6px; left: -6px; cursor: nesw-resize; }
			.handle-n { top: -6px; cursor: ns-resize; }
			.handle-s { bottom: -6px; cursor: ns-resize; }
			.handle-e { right: -6px; cursor: ew-resize; }
			.handle-w { left: -6px; cursor: ew-resize; }

			.bounds {
				position: relative;
				z-index: 20;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
			}

			.titlebar {
				transition: background-color linear .1s;
				flex-grow: 0;
				flex-shrink: 0;
				height: var(--desktop-window-titlebar-height);
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				background-color: var(--desktop-window-titlebar-background-color);
			}

			.title-text {
				transition: color linear .1s;
				font-family: var(--desktop-window-titlebar-font-family);
				font-size: var(--desktop-window-titlebar-font-size);
				color: var(--desktop-window-titlebar-text-color);
				line-height: var(--desktop-window-titlebar-height);
				flex-grow: 1;
				flex-shrink: 1;
				padding: 0 6px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.titlebar-start,
			.titlebar-end {
				cursor: default;
				flex-grow: 0;
				flex-shrink: 0;
				height: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
			}

			.control-btn {
				cursor: default;
				position: relative;
				width: var(--desktop-window-buttons-width);
				height: var(--desktop-window-buttons-height);
				border: none;
				transition: color linear .1s, background-color linear .1s;
				margin: 0 var(--desktop-window-buttons-margin) 0 0;
				padding: 0;
				flex-grow: 0;
				flex-shrink: 0;
			}

			.control-btn::before {
				content: "";
				position: absolute;
				inset: 0;
				-webkit-mask-size: auto;
				mask-size: auto;
				-webkit-mask-position: center center;
				mask-position: center center;
				-webkit-mask-repeat: no-repeat;
				mask-repeat: no-repeat;
				background-color: currentColor;
			}

			.btn-minimize {
				display: none;
				color: var(--desktop-window-minimize-text-color);
				background-color: var(--desktop-window-minimize-background-color);
			}
			.btn-minimize:hover {
				color: var(--desktop-window-minimize-hover-text-color);
				background-color: var(--desktop-window-minimize-hover-background-color);
			}
			.btn-minimize::before {
				-webkit-mask-image: var(--desktop-window-minimize-button-mask-image);
				mask-image: var(--desktop-window-minimize-button-mask-image);
			}

			.btn-maximize {
				display: none;
				color: var(--desktop-window-maximize-text-color);
				background-color: var(--desktop-window-maximize-background-color);
			}
			.btn-maximize:hover {
				color: var(--desktop-window-maximize-hover-text-color);
				background-color: var(--desktop-window-maximize-hover-background-color);
			}
			.btn-maximize::before {
				-webkit-mask-image: var(--desktop-window-maximize-button-mask-image);
				mask-image: var(--desktop-window-maximize-button-mask-image);
			}

			.btn-restore {
				display: none;
				color: var(--desktop-window-restore-text-color);
				background-color: var(--desktop-window-restore-background-color);
			}
			.btn-restore:hover {
				color: var(--desktop-window-restore-hover-text-color);
				background-color: var(--desktop-window-restore-hover-background-color);
			}
			.btn-restore::before {
				-webkit-mask-image: var(--desktop-window-restore-button-mask-image);
				mask-image: var(--desktop-window-restore-button-mask-image);
			}

			.btn-close {
				display: none;
				color: var(--desktop-window-close-text-color);
				background-color: var(--desktop-window-close-background-color);
			}
			.btn-close:hover {
				color: var(--desktop-window-close-hover-text-color);
				background-color: var(--desktop-window-close-hover-background-color);
			}
			.btn-close::before {
				-webkit-mask-image: var(--desktop-window-close-button-mask-image);
				mask-image: var(--desktop-window-close-button-mask-image);
			}

			.client-area {
				flex-grow: 1;
				flex-shrink: 1;
				height: calc(100% - var(--desktop-window-titlebar-height));
				-webkit-user-select: text;
				user-select: text;
			}

			:host(:focus-within) .window {
				border-color: var(--desktop-window-focused-border-color);
				box-shadow: 0 2px 15px rgba(0,0,0,0.25);
			}

			:host(:focus-within) .titlebar {
				background-color: var(--desktop-window-focused-titlebar-background-color);
			}

			:host(:focus-within) .title-text {
				color: var(--desktop-window-focused-titlebar-text-color);
			}

			:host(:focus-within) .btn-minimize {
				color: var(--desktop-window-focused-minimize-text-color);
				background-color: var(--desktop-window-focused-minimize-background-color);
			}
			:host(:focus-within) .btn-minimize:hover {
				color: var(--desktop-window-focused-minimize-hover-text-color);
				background-color: var(--desktop-window-focused-minimize-hover-background-color);
			}

			:host(:focus-within) .btn-maximize {
				color: var(--desktop-window-focused-maximize-text-color);
				background-color: var(--desktop-window-focused-maximize-background-color);
			}
			:host(:focus-within) .btn-maximize:hover {
				color: var(--desktop-window-focused-maximize-hover-text-color);
				background-color: var(--desktop-window-focused-maximize-hover-background-color);
			}

			:host(:focus-within) .btn-restore {
				color: var(--desktop-window-focused-restore-text-color);
				background-color: var(--desktop-window-focused-restore-background-color);
			}
			:host(:focus-within) .btn-restore:hover {
				color: var(--desktop-window-focused-restore-hover-text-color);
				background-color: var(--desktop-window-focused-restore-hover-background-color);
			}

			:host(:focus-within) .btn-close {
				color: var(--desktop-window-focused-close-text-color);
				background-color: var(--desktop-window-focused-close-background-color);
			}
			:host(:focus-within) .btn-close:hover {
				color: var(--desktop-window-focused-close-hover-text-color);
				background-color: var(--desktop-window-focused-close-hover-background-color);
			}

			:host([movable]) .titlebar { cursor: move; }

			:host([resizable]) .resize-handle { display: block; }
			:host([resizable][minimized]) .resize-handle { display: none; }
			:host([resizable][maximized]) .resize-handle { display: none; }

			:host([minimizable]) .btn-minimize { display: block; }
			:host([maximizable]) .btn-maximize { display: block; }
			:host([minimizable][minimized]) .btn-minimize { display: none; }
			:host([minimizable][minimized]) .btn-restore { display: block; }
			:host([maximizable][maximized]) .btn-maximize { display: none; }
			:host([maximizable][maximized]) .btn-restore { display: block; }
			:host([closable]) .btn-close { display: block; }

			:host([minimized]) .window {
				height: calc(round((2 * var(--desktop-window-border-width)) + var(--desktop-window-titlebar-height))) !important;
			}
			:host([minimized]) .client-area { display: none; }

			:host([maximized]) .window {
				border: none;
				inset: 0 !important;
				width: auto !important;
				height: auto !important;
			}

			:host([fullscreen]) .resize-handle { display: none !important; }
			:host([fullscreen]) .titlebar { display: none; }
			:host([fullscreen]) .window {
				border: none;
				inset: 0 !important;
				width: auto !important;
				height: auto !important;
			}
		`);
		return style;
	})();

	/** @type {HTMLElement | null} */
	#shadowRoot = null;
	#window = null;
	#clientArea = null;
	#dragPointerMove = null;
	#dragPointerUp = null;
	#resizePointerMove = null;
	#resizePointerUp = null;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({
			mode: DesktopWindow.shadowMode,
			delegatesFocus: true,
		});
		this.#shadowRoot.adoptedStyleSheets = [DesktopWindow.#stylesheet];
		this.#shadowRoot.innerHTML = `
			<div role="dialog" tabindex="-1" class="window" part="window" aria-labelledby="title-text">
				<div class="bounds">
					<div class="titlebar" part="titlebar">
						<div class="titlebar-start" part="titlebar-start">
							<slot name="titlebar-start"></slot>
						</div>
						<div id="title-text" class="title-text" part="title-text"></div>
						<div class="titlebar-end" part="titlebar-end">
							<slot name="titlebar-end"></slot>
						</div>
						<div role="button" tabindex="0" class="control-btn btn-minimize" part="minimize-button"></div>
						<div role="button" tabindex="0" class="control-btn btn-restore" part="restore-button"></div>
						<div role="button" tabindex="0" class="control-btn btn-maximize" part="maximize-button"></div>
						<div role="button" tabindex="0" class="control-btn btn-close" part="close-button"></div>
					</div>
					<div role="document" class="client-area" part="client-area">
						<slot></slot>
					</div>
				</div>
				<div class="resize-handle handle-n" data-direction="n"></div>
				<div class="resize-handle handle-s" data-direction="s"></div>
				<div class="resize-handle handle-e" data-direction="e"></div>
				<div class="resize-handle handle-w" data-direction="w"></div>
				<div class="resize-handle handle-nw" data-direction="nw"></div>
				<div class="resize-handle handle-ne" data-direction="ne"></div>
				<div class="resize-handle handle-sw" data-direction="sw"></div>
				<div class="resize-handle handle-se" data-direction="se"></div>
			</div>
		`;

		this.#window = this.#shadowRoot.querySelector('.window');
		this.#clientArea = this.#window.querySelector('.client-area');

		//--

		this.#shadowRoot.addEventListener('minimize', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const minimizing = new Event('minimizing', { bubbles: true, cancelable: true });
			this.dispatchEvent(minimizing);
			if (!minimizing.defaultPrevented) {
				this.minimized = true;
			}
		});
		this.#shadowRoot.addEventListener('maximize', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const maximizing = new Event('maximizing', { bubbles: true, cancelable: true });
			this.dispatchEvent(maximizing);
			if (!maximizing.defaultPrevented) {
				this.maximized = true;
			}
		});
		this.#shadowRoot.addEventListener('restore', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const restoring = new Event('restoring', { bubbles: true, cancelable: true });
			this.dispatchEvent(restoring);
			if (!restoring.defaultPrevented) {
				this.maximized = false;
				this.minimized = false;
			}
		});
		this.#shadowRoot.addEventListener('close', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const closing = new Event('closing', { bubbles: true, cancelable: true });
			this.dispatchEvent(closing);
			if (!closing.defaultPrevented) {
				this.destroy();
			}
		});
		this.#shadowRoot.addEventListener('request-fullscreen', (event) => {
			event.stopPropagation(); // stops composed events to escape
			if (this.fullscreen) return;
			const requestingFullscreen = new Event('requesting-fullscreen', { bubbles: true, cancelable: true });
			this.dispatchEvent(requestingFullscreen);
			if (!requestingFullscreen.defaultPrevented) {
				this.fullscreen = true;
			}
		});
		this.#shadowRoot.addEventListener('exit-fullscreen', (event) => {
			event.stopPropagation(); // stops composed events to escape
			if (!this.fullscreen) return;
			const exitingFullscreen = new Event('exiting-fullscreen', { bubbles: true, cancelable: true });
			this.dispatchEvent(exitingFullscreen);
			if (!exitingFullscreen.defaultPrevented) {
				this.fullscreen = false;
			}
		});

		//-- zindex

		this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
		this.#window.addEventListener('pointerdown', () => {
			this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
		});

		//-- titlebar controls should not bubble titlebar only events

		const controls = this.#shadowRoot.querySelectorAll('.titlebar-start, .titlebar-end, .control-btn');
		for (const control of controls) {
			control.addEventListener('pointerdown', (e) => {
				e.stopPropagation();
				this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
			});
			control.addEventListener('dblclick', (e) => {
				e.stopPropagation();
			});
		}

		//-- control buttons

		const minimize = this.#shadowRoot.querySelector('.btn-minimize');
		const maximize = this.#shadowRoot.querySelector('.btn-maximize');
		const restore = this.#shadowRoot.querySelector('.btn-restore');
		const close = this.#shadowRoot.querySelector('.btn-close');

		minimize.addEventListener('click', () => {
			this.#shadowRoot.dispatchEvent(new Event('minimize', { bubbles: true }));
			restore.focus();
		});

		maximize.addEventListener('click', () => {
			this.#shadowRoot.dispatchEvent(new Event('maximize', { bubbles: true }));
			restore.focus();
		});

		restore.addEventListener('click', () => {
			const oldMinimized = this.minimized;
			const oldMaximized = this.maximized;
			this.#shadowRoot.dispatchEvent(new Event('restore', { bubbles: true }));
			if (oldMaximized) {
				maximize.focus();
			} else if (oldMinimized) {
				minimize.focus();
			}
		});

		close.addEventListener('click', () => {
			this.#shadowRoot.dispatchEvent(new Event('close', { bubbles: true }));
		});

		this.#window.querySelector('.titlebar').addEventListener('dblclick', () => {
			if (this.maximizable) {
				this.maximized = !this.maximized;
			}
		});

		for (const btn of this.#shadowRoot.querySelectorAll('.control-btn')) {
			btn.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					btn.click();
				}
			})
		}
	}

	#parseUnsigned(value) {
		const intVal = Number.parseInt(value);
		return Number.isNaN(intVal) || intVal < 0 ? null : intVal;
	}

	#parseInteger(value) {
		const intVal = Number.parseInt(value);
		return Number.isNaN(intVal) ? null : intVal;
	}

	#getUnsignedAttribute(name) {
		return this.#parseUnsigned(this.getAttribute(name));
	}

	#setUnsignedAttribute(name, value) {
		this.setAttribute(name, String(Math.round(Math.max(0, value))));
	}

	#getIntegerAttribute(name) {
		return this.#parseInteger(this.getAttribute(name));
	}

	#setIntegerAttribute(name, value) {
		this.setAttribute(name, String(Math.round(value)));
	}

	#getBooleanAttribute(name) {
		const value = this.getAttribute(name);
		return value === '' || value === 'true';
	}

	#setBooleanAttribute(name, value) {
		if (value) {
			this.setAttribute(name, '');
		} else {
			this.removeAttribute(name);
		}
	}

	get name() { return this.getAttribute('name'); }
	set name(value) {
		if (value) {
			this.setAttribute('name', value);
		} else {
			this.removeAttribute('name');
		}
	}

	get movable() { return this.#getBooleanAttribute('movable'); }
	set movable(value) { this.#setBooleanAttribute('movable', value); }

	get x() { return this.#getIntegerAttribute('x') ?? DesktopWindow.defaultX; }
	set x(value) { this.#setIntegerAttribute('x', value); }

	get y() { return this.#getIntegerAttribute('y') ?? DesktopWindow.defaultY; }
	set y(value) { this.#setIntegerAttribute('y', value); }

	get centered() { return this.#getBooleanAttribute('centered'); }
	set centered(value) { return this.#setBooleanAttribute('centered', value); }

	get width() { return this.#getUnsignedAttribute('width') ?? DesktopWindow.defaultWidth; }
	set width(value) { this.#setUnsignedAttribute('width', value); }

	get height() { return this.#getUnsignedAttribute('height') ?? DesktopWindow.defaultHeight; }
	set height(value) { this.#setUnsignedAttribute('height', value); }

	get contentWidth() { return this.#getUnsignedAttribute('contentWidth'); }
	set contentWidth(value) { this.#setUnsignedAttribute('contentWidth', value); }

	get contentHeight() { return this.#getUnsignedAttribute('contentHeight'); }
	set contentHeight(value) { this.#setUnsignedAttribute('contentHeight', value); }

	get minWidth() { return this.#getUnsignedAttribute('minWidth') ?? DesktopWindow.defaultMinWidth; }
	set minWidth(value) { this.#setUnsignedAttribute('minWidth', value); }

	get minHeight() { return this.#getUnsignedAttribute('minHeight') ?? DesktopWindow.defaultMinHeight; }
	set minHeight(value) { this.#setUnsignedAttribute('minHeight', value); }

	get maxWidth() { return this.#getUnsignedAttribute('maxWidth') ?? DesktopWindow.defaultMaxWidth ?? this.parentElement.offsetWidth; }
	set maxWidth(value) { this.#setUnsignedAttribute('maxWidth', value); }

	get maxHeight() { return this.#getUnsignedAttribute('maxHeight') ?? DesktopWindow.defaultMaxHeight ?? this.parentElement.offsetHeight; }
	set maxHeight(value) { this.#setUnsignedAttribute('maxHeight', value); }

	get resizable() { return this.#getBooleanAttribute('resizable'); }
	set resizable(value) { this.#setBooleanAttribute('resizable', value); }

	get fullscreen() { return this.#getBooleanAttribute('fullscreen'); }
	set fullscreen(value) { this.#setBooleanAttribute('fullscreen', value); }

	get minimizable() { return this.#getBooleanAttribute('minimizable'); }
	set minimizable(value) { this.#setBooleanAttribute('minimizable', value); }

	get minimized() { return this.#getBooleanAttribute('minimized'); }
	set minimized(value) {
		const oldValue = this.minimized;
		this.#setBooleanAttribute('minimized', value);
		if (oldValue && !value) {
			this.dispatchEvent(new Event('restored', { bubbles: true }));
		} else if (!oldValue && value) {
			this.dispatchEvent(new Event('minimized', { bubbles: true }));
		}
	}

	get maximizable() { return this.#getBooleanAttribute('maximizable'); }
	set maximizable(value) { this.#setBooleanAttribute('maximizable', value); }

	get maximized() { return this.#getBooleanAttribute('maximized'); }
	set maximized(value) {
		const oldValue = this.minimized;
		this.#setBooleanAttribute('maximized', value);
		if (oldValue && !value) {
			this.dispatchEvent(new Event('restored', { bubbles: true }));
		} else if (!oldValue && value) {
			this.dispatchEvent(new Event('maximized', { bubbles: true }));
		}
	}

	get closable() { return this.#getBooleanAttribute('closable'); }
	set closable(value) { this.#setBooleanAttribute('closable', value); }

	get autofocus() { return this.#getBooleanAttribute('autofocus'); }
	set autofocus(value) { this.#setBooleanAttribute('autofocus', value); }

	focus() {
		this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
		this.#window.focus();
	}

	blur() {
		this.#window.blur();
	}

	close() {
		const closing = new Event('closing', { bubbles: true, cancelable: true });
		this.dispatchEvent(closing);
		if (!closing.defaultPrevented) {
			this.remove();
		}
		this.dispatchEvent(new Event('closed', { bubbles: true }));
	}

	destroy() {
		this.remove();
		this.dispatchEvent(new Event('closed', { bubbles: true }));
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
		return [windowBounds.width, windowBounds.height];
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
			height: this.height,
		};
	}

	getBounds() {
		// centered, fullscreen, maximized, minimized can change actual bounds
		// so returning x, y, width, height attributes does not work here
		const parentBounds = this.parentElement.getBoundingClientRect();
		const windowBounds = this.#window.getBoundingClientRect();
		return {
			x: windowBounds.x - parentBounds.x,
			y: windowBounds.y - parentBounds.y,
			width: windowBounds.width,
			height: windowBounds.height,
		};
	}

	setBounds({ x, y, width, height }) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	getContentSize() {
		const clientBounds = this.#clientArea.getBoundingClientRect();
		return [clientBounds.width, clientBounds.height];
	}

	setContentSize(width, height) {
		throw new Error('Not implemented yet.');
	}

	getContentBounds() {
		const parentBounds = this.parentElement.getBoundingClientRect();
		const clientBounds = this.#clientArea.getBoundingClientRect();
		return {
			x: clientBounds.x - parentBounds.x,
			y: clientBounds.y - parentBounds.y,
			width: clientBounds.width,
			height: clientBounds.height,
		};
	}

	setContentBounds(bounds) {
		throw new Error('Not implemented yet.');
	}

	connectedCallback() {
		if (!this.#window.style.left) {
			this.#window.style.left = DesktopWindow.defaultX + 'px';
		}
		if (!this.#window.style.top) {
			this.#window.style.top = DesktopWindow.defaultY + 'px';
		}
		if (!this.#window.style.width) {
			this.#window.style.width = DesktopWindow.defaultWidth + 'px';
		}
		if (!this.#window.style.height) {
			this.#window.style.height = DesktopWindow.defaultHeight + 'px';
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
			window.removeEventListener('pointermove', this.#dragPointerMove);
			this.#dragPointerMove = null;
		}
		if (this.#dragPointerUp) {
			window.removeEventListener('pointerup', this.#dragPointerUp);
			this.#dragPointerUp = null;
		}
		if (this.#resizePointerMove) {
			window.removeEventListener('pointermove', this.#resizePointerMove);
			this.#resizePointerMove = null;
		}
		if (this.#resizePointerUp) {
			window.removeEventListener('pointerup', this.#resizePointerUp);
			this.#resizePointerUp = null;
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		switch (name) {
			case 'name':
				this.#shadowRoot.querySelector('.title-text').textContent = newValue;
				break;
			case 'centered':
				if (newValue !== null) {
					this.#window.style.left = Math.round((this.parentElement.offsetWidth - this.width) / 2) + 'px';
					this.#window.style.top = Math.round((this.parentElement.offsetHeight - this.height) / 2) + 'px';
				} else {
					this.#window.style.left = this.x + 'px';
					this.#window.style.top = this.y + 'px';
				}
				break;
			case 'x':
				if (!this.centered) {
					this.#window.style.left = this.#parseInteger(newValue) + 'px';
				}
				break;
			case 'y':
				if (!this.centered) {
					this.#window.style.top = this.#parseInteger(newValue) + 'px';
				}
				break;
			case 'width':
				this.#window.style.width = this.#parseUnsigned(newValue) + 'px';
				break;
			case 'height':
				this.#window.style.height = this.#parseUnsigned(newValue) + 'px';
				break;
			case 'minWidth':
				const minWidth = this.#parseUnsigned(newValue);
				if (this.width < minWidth) {
					this.width = minWidth;
				}
				break;
			case 'minHeight':
				const minHeight = this.#parseUnsigned(newValue);
				if (this.height < minHeight) {
					this.height = minHeight;
				}
				break;
			case 'maxWidth':
				const maxWidth = this.#parseUnsigned(newValue);
				if (this.width > maxWidth) {
					this.width = maxWidth;
				}
				break;
			case 'maxHeight':
				const maxHeight = this.#parseUnsigned(newValue);
				if (this.height > maxHeight) {
					this.height = maxHeight;
				}
				break;
			case 'autofocus':
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

		this.#dragPointerMove = (e) => {
			const dx = Math.max(parentRect.left, Math.min(e.clientX, parentRect.right)) - startClientX;
			const dy = Math.max(parentRect.top, Math.min(e.clientY, parentRect.bottom)) - startClientY;
			this.#window.style.left = `${Math.round(start.x + dx)}px`;
			this.#window.style.top = `${Math.round(start.y + dy)}px`;
		};

		this.#dragPointerUp = () => {
			window.removeEventListener('pointermove', this.#dragPointerMove);
			window.removeEventListener('pointerup', this.#dragPointerUp);
			this.x = Number.parseInt(this.#window.style.left.replace('px', ''));
			this.y = Number.parseInt(this.#window.style.top.replace('px', ''));
		};


		const titlebar = this.#shadowRoot.querySelector('.titlebar');
		titlebar.addEventListener('pointerdown', (e) => {
			if (!this.movable) return;
			startClientX = e.clientX;
			startClientY = e.clientY;
			start = this.#window.getBoundingClientRect();
			parentRect = this.parentElement.getBoundingClientRect();
			window.addEventListener('pointermove', this.#dragPointerMove);
			window.addEventListener('pointerup', this.#dragPointerUp);
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

		this.#resizePointerMove = (e) => {
			const dx = Math.max(parentRect.left, Math.min(e.clientX, parentRect.right)) - startClientX;
			const dy = Math.max(parentRect.top, Math.min(e.clientY, parentRect.bottom)) - startClientY;

			if (direction.includes('e')) {
				const w = Math.max(minWidth, Math.min(start.width + dx, maxWidth));
				this.#window.style.width = `${Math.round(w)}px`;
			} else if (direction.includes('w')) {
				const w = Math.max(minWidth, Math.min(start.width - dx, maxWidth));
				this.#window.style.width = `${Math.round(w)}px`;
				this.#window.style.left = `${Math.round(start.right - w)}px`;
			}
			if (direction.includes('n')) {
				const h = Math.max(minHeight, Math.min(start.height - dy, maxHeight));
				this.#window.style.height = `${Math.round(h)}px`;
				this.#window.style.top = `${Math.round(start.bottom - h)}px`;
			} else if (direction.includes('s')) {
				const h = Math.max(minHeight, Math.min(start.height + dy, maxHeight));
				this.#window.style.height = `${Math.round(h)}px`;
			}
		};

		this.#resizePointerUp = () => {
			window.removeEventListener('pointermove', this.#resizePointerMove);
			window.removeEventListener('pointerup', this.#resizePointerUp);
			this.x = Number.parseInt(this.#window.style.left.replace('px', ''));
			this.y = Number.parseInt(this.#window.style.top.replace('px', ''));
			this.width = Number.parseInt(this.#window.style.width.replace('px', ''));
			this.height = Number.parseInt(this.#window.style.height.replace('px', ''));
		};

		/** @type {HTMLElement[]} */
		const handles = this.#shadowRoot.querySelectorAll('.resize-handle');
		for (const handle of handles) {
			handle.addEventListener('pointerdown', (e) => {
				if (!this.resizable) return;
				direction = handle.dataset.direction;
				startClientX = e.clientX;
				startClientY = e.clientY;
				start = this.#window.getBoundingClientRect();
				parentRect = this.parentElement.getBoundingClientRect();
				minWidth = this.minWidth;
				minHeight = this.minHeight;
				maxWidth = this.maxWidth;
				maxHeight = this.maxHeight;
				window.addEventListener('pointermove', this.#resizePointerMove);
				window.addEventListener('pointerup', this.#resizePointerUp);
				if (this.centered) {
					this.x = start.x;
					this.y = start.y;
					this.centered = false;
				}
			});
		}
	}
}

export function register({ tag = 'desktop-window', shadowMode } = {}) {
	if (customElements.get(tag)) return;
	if (shadowMode) {
		DesktopWindow.shadowMode = shadowMode;
	}
	customElements.define(tag, DesktopWindow);
}

export default DesktopWindow;
