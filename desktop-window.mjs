
const svgToDataUrl = (svgSrc) => `data:image/svg+xml;utf8,${encodeURIComponent(svgSrc)}`;

const closeIcon = svgToDataUrl(`<svg width="14" height="14" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 14,13.377792 13.377793,14 6.9826729,7.6048821 0.6222123,14 0,13.377792 6.3951189,7.0173289 0,0.6222073 0.6222123,0 6.9826729,6.3951177 13.377793,0 14,0.6222073 7.6048859,7.0173289 Z" /></svg>`);
const maximizeIcon = svgToDataUrl(`<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 16,14 H 0 V 0 H 16 Z M 15,13 V 2 H 1 V 13 Z" /></svg>`);
const minimizeIcon = svgToDataUrl(`<svg width="14" height="1" viewBox="0 0 14 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 14,1 H 0 V 0 h 14 z" /></svg>`);
const restoreIcon = svgToDataUrl(`<svg width="16" height="14" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 16,9 H 12 V 14 H 0 V 5 H 4 V 0 H 16 Z M 15,8 V 2 H 5 V 5 H 12 V 8 Z M 11,13 V 7 H 1 v 6 z" /></svg>`);

export class DesktopWindow extends HTMLElement {

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
			'movable', 'x', 'y', 'centered',
			'resizable', 'width', 'height', //'contentWidth', 'contentHeight',
			'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
			'minimizable', 'minimized',
			'maximizable', 'maximized',
			'closable',
			'fullscreenable', 'fullscreen',
		];
	}

	static #nextZIndex = 20;

	static #stylesheet = (() => {
		const style = new CSSStyleSheet();
		style.replaceSync(`
			:host {
				--desktop-window-border-width: 1px;
				--desktop-window-border-color: #fff;

				--desktop-window-background-color: #fff;

				--desktop-window-titlebar-height: 28px;
				--desktop-window-titlebar-background-color: #fff;
				--desktop-window-titlebar-font-family: sans-serif;
				--desktop-window-titlebar-font-size: 14px;
				--desktop-window-titlebar-text-color: #444;

				--desktop-window-buttons-width: 43px;
				--desktop-window-buttons-text-color: var(--desktop-window-titlebar-text-color);
				--desktop-window-buttons-background-color: var(--desktop-window-titlebar-background-color);
				--desktop-window-buttons-hover-text-color: var(--desktop-window-titlebar-text-color);
				--desktop-window-buttons-hover-background-color: #e5e5e5;

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
			}
			.window {
				position: absolute;
				border: var(--desktop-window-border-width) solid var(--desktop-window-border-color);
				background-color: var(--desktop-window-background-color);
				box-shadow: 0 2px 10px rgba(0,0,0,0.25);
				box-sizing: border-box;
				user-select: none;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				transform: translate3d(0, 0, 0); /* forces GPU layer to stabilize subpixel text/image rendering */
			}
			.titlebar {
				position: relative;
				z-index: 20;
				background-color: var(--desktop-window-titlebar-background-color);
				display: flex;
				min-height: var(--desktop-window-titlebar-height);
				max-height: var(--desktop-window-titlebar-height);
				flex-wrap: nowrap;
				align-items: center;
				overflow: hidden;
			}
			.title-text {
				font-family: var(--desktop-window-titlebar-font-family);
				font-size: var(--desktop-window-titlebar-font-size);
				color: var(--desktop-window-titlebar-text-color);
				line-height: var(--desktop-window-titlebar-height);
				flex-grow: 1;
				flex-shrink: 1;
				padding: 0 8px;
				display: inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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

			.control-btn {
				min-height: var(--desktop-window-titlebar-height);
				max-height: var(--desktop-window-titlebar-height);
				min-width: var(--desktop-window-buttons-width);
				max-width: var(--desktop-window-buttons-width);
				transition: color linear .1s, background-color linear .1s;
				border: none !important;
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 0; /* fixes icon alignment */
			}
			.control-btn::before {
				pointer-events: none;
				content: "";
				display: inline-block;
				width: 20px;
				height: 20px;
				-webkit-mask-image: var(--mask-image);
				mask-image: var(--mask-image);
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
			.btn-minimize::before { --mask-image: url(${minimizeIcon}); }
			.btn-minimize:hover {
				color: var(--desktop-window-minimize-hover-text-color);
				background-color: var(--desktop-window-minimize-hover-background-color);
			}

			.btn-maximize {
				display: none;
				color: var(--desktop-window-maximize-text-color);
				background-color: var(--desktop-window-maximize-background-color);
			}
			.btn-maximize::before { --mask-image: url(${maximizeIcon}); }
			.btn-maximize:hover {
				color: var(--desktop-window-maximize-hover-text-color);
				background-color: var(--desktop-window-maximize-hover-background-color);
			}

			.btn-restore {
				display: none;
				color: var(--desktop-window-restore-text-color);
				background-color: var(--desktop-window-restore-background-color);
			}
			.btn-restore::before { --mask-image: url(${restoreIcon}); }
			.btn-restore:hover {
				color: var(--desktop-window-restore-hover-text-color);
				background-color: var(--desktop-window-restore-hover-background-color);
			}

			.btn-close {
				display: none;
				color: var(--desktop-window-close-text-color);
				background-color: var(--desktop-window-close-background-color);
			}
			.btn-close::before { --mask-image: url(${closeIcon}); }
			.btn-close:hover {
				color: var(--desktop-window-close-hover-text-color);
				background-color: var(--desktop-window-close-hover-background-color);
			}

			.client-area {
				position: relative;
				z-index: 30;
				overflow: visible;
				flex-grow: 1;
				flex-shrink: 1;
			}

			/* movable */
			.movable .titlebar { cursor: move; }

			/* resizable */
			.resizable .resize-handle { display: block; }

			/* minimizable */
			.minimizable .btn-minimize { display: inline-block; }
			.minimizable.minimized .btn-restore { display: inline-block; }
			.minimizable.minimized .btn-minimize { display: none; }
			.minimizable.minimized .resize-handle { display: none !important; }
			.minimizable.minimized {
				height: calc(2 * var(--desktop-window-border-width) + var(--desktop-window-titlebar-height)) !important;
			}
			.minimizable.minimized .client-area { display: none; }

			/* maximizable */
			.maximizable .btn-maximize { display: inline-block; }
			.maximizable.maximized .btn-restore { display: inline-block; }
			.maximizable.maximized .btn-maximize { display: none; }
			.maximizable.maximized .resize-handle { display: none !important; }
			.maximizable.maximized {
				border: none;
				inset: 0 !important;
				width: auto !important;
				height: auto !important;
			}

			/* closable */
			.closable .btn-close { display: inline-block; }

			/* fullscreenable */
			.fullscreenable.fullscreen .resize-handle { display: none !important; }
			.fullscreenable.fullscreen .titlebar { display: none; }
			.fullscreenable.fullscreen {
				border: none;
				inset: 0 !important;
				width: auto !important;
				height: auto !important;
			}
		`);
		return style;
	})();

	#window;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [DesktopWindow.#stylesheet];
		this.shadowRoot.innerHTML = `
			<div class="window">
				<div class="titlebar">
					<span class="title-text"></span>
					<button class="control-btn btn-minimize"></button>
					<button class="control-btn btn-restore"></button>
					<button class="control-btn btn-maximize"></button>
					<button class="control-btn btn-close"></button>
				</div>
				<div class="resize-handle handle-n" data-direction="n"></div>
				<div class="resize-handle handle-s" data-direction="s"></div>
				<div class="resize-handle handle-e" data-direction="e"></div>
				<div class="resize-handle handle-w" data-direction="w"></div>
				<div class="resize-handle handle-nw" data-direction="nw"></div>
				<div class="resize-handle handle-ne" data-direction="ne"></div>
				<div class="resize-handle handle-sw" data-direction="sw"></div>
				<div class="resize-handle handle-se" data-direction="se"></div>
				<div class="client-area">
					<slot></slot>
				</div>
			</div>
		`;

		this.shadowRoot.addEventListener('minimize', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const minimizing = new Event('minimizing', { bubbles: true, cancelable: true });
			this.dispatchEvent(minimizing);
			if (!minimizing.defaultPrevented) {
				this.minimized = true;
			}
		});
		this.shadowRoot.addEventListener('maximize', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const maximizing = new Event('maximizing', { bubbles: true, cancelable: true });
			this.dispatchEvent(maximizing);
			if (!maximizing.defaultPrevented) {
				this.maximized = true;
			}
		});
		this.shadowRoot.addEventListener('restore', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const restoring = new Event('restoring', { bubbles: true, cancelable: true });
			this.dispatchEvent(restoring);
			if (!restoring.defaultPrevented) {
				this.maximized = false;
				this.minimized = false;
			}
		});
		this.shadowRoot.addEventListener('close', (event) => {
			event.stopPropagation(); // stops composed events to escape
			const closing = new Event('closing', { bubbles: true, cancelable: true });
			this.dispatchEvent(closing);
			if (!closing.defaultPrevented) {
				this.destroy();
			}
		});
		this.shadowRoot.addEventListener('request-fullscreen', (event) => {
			event.stopPropagation(); // stops composed events to escape
			if (this.fullscreen) return;
			const requestingFullscreen = new Event('requesting-fullscreen', { bubbles: true, cancelable: true });
			this.dispatchEvent(requestingFullscreen);
			if (!requestingFullscreen.defaultPrevented) {
				this.fullscreen = true;
			}
		});
		this.shadowRoot.addEventListener('exit-fullscreen', (event) => {
			event.stopPropagation(); // stops composed events to escape
			if (!this.fullscreen) return;
			const exitingFullscreen = new Event('exiting-fullscreen', { bubbles: true, cancelable: true });
			this.dispatchEvent(exitingFullscreen);
			if (!exitingFullscreen.defaultPrevented) {
				this.fullscreen = false;
			}
		});

		//--

		this.#window = this.shadowRoot.querySelector('.window');
		this.#window.addEventListener('mousedown', (e) => {
			this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
		});
		this.#window.style.zIndex = DesktopWindow.#nextZIndex++;

		const controlButtons = this.shadowRoot.querySelectorAll('.control-btn');
		for (const controlButton of controlButtons) {
			controlButton.addEventListener('mousedown', (e) => {
				e.stopPropagation();
				this.#window.style.zIndex = DesktopWindow.#nextZIndex++;
			});
		}

		//--

		const closeButton = this.shadowRoot.querySelector('.btn-close');
		closeButton.addEventListener('click', (e) => {
			closeButton.dispatchEvent(new Event('close', { bubbles: true, cancelable: true }));
		});

		const minimizeButton = this.shadowRoot.querySelector('.btn-minimize');
		minimizeButton.addEventListener('click', (e) => {
			minimizeButton.dispatchEvent(new Event('minimize', { bubbles: true, cancelable: true }));
		});

		const restoreButton = this.shadowRoot.querySelector('.btn-restore');
		restoreButton.addEventListener('click', (e) => {
			restoreButton.dispatchEvent(new Event('restore', { bubbles: true, cancelable: true }));
		});

		const maximizeButton = this.shadowRoot.querySelector('.btn-maximize');
		maximizeButton.addEventListener('click', (e) => {
			maximizeButton.dispatchEvent(new Event('maximize', { bubbles: true, cancelable: true }));
		});
	}

	#parseInteger(value) {
		const intVal = Number.parseInt(value);
		return Number.isNaN(intVal) || intVal < 0 ? null : intVal;
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

	#getIntegerAttribute(name) { return this.#parseInteger(this.getAttribute(name)); }

	#setIntegerAttribute(name, value) {
		this.setAttribute(name, String(Math.round(Math.max(0, value))));
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

	get x() { return this.#getIntegerAttribute('x') ?? 50; }
	set x(value) { this.#setIntegerAttribute('x', value); }

	get y() { return this.#getIntegerAttribute('y') ?? 50; }
	set y(value) { this.#setIntegerAttribute('y', value); }

	get centered() { return this.#getBooleanAttribute('centered'); }
	set centered(value) { return this.#setBooleanAttribute('centered', value); }

	get width() { return this.#getIntegerAttribute('width') ?? DesktopWindow.defaultWidth; }
	set width(value) { this.#setIntegerAttribute('width', value); }

	get height() { return this.#getIntegerAttribute('height') ?? DesktopWindow.defaultHeight; }
	set height(value) { this.#setIntegerAttribute('height', value); }

	get minWidth() { return this.#getIntegerAttribute('minWidth') ?? DesktopWindow.defaultMinWidth; }
	set minWidth(value) { this.#setIntegerAttribute('minWidth', value); }

	get minHeight() { return this.#getIntegerAttribute('minHeight') ?? DesktopWindow.defaultMinHeight; }
	set minHeight(value) { this.#setIntegerAttribute('minHeight', value); }

	get maxWidth() { return this.#getIntegerAttribute('maxWidth') ?? DesktopWindow.defaultMaxWidth ?? this.parentElement.offsetWidth; }
	set maxWidth(value) { this.#setIntegerAttribute('maxWidth', value); }

	get maxHeight() { return this.#getIntegerAttribute('maxHeight') ?? DesktopWindow.defaultMaxHeight ?? this.parentElement.offsetHeight; }
	set maxHeight(value) { this.#setIntegerAttribute('maxHeight', value); }

	get resizable() { return this.#getBooleanAttribute('resizable'); }
	set resizable(value) { this.#setBooleanAttribute('resizable', value); }

	get fullscreenable() { return this.#getBooleanAttribute('fullscreenable'); }
	set fullscreenable(value) { this.#setBooleanAttribute('fullscreenable', value); }

	get fullscreen() { return this.#getBooleanAttribute('fullscreen'); }
	set fullscreen(value) { this.#setBooleanAttribute('fullscreen', value); }

	get minimizable() { return this.#getBooleanAttribute('minimizable'); }
	set minimizable(value) { this.#setBooleanAttribute('minimizable', value); }

	get minimized() { return this.#getBooleanAttribute('minimized'); }
	set minimized(value) {
		this.#setBooleanAttribute('minimized', value);
		if (!value && this.minimized) {
			this.dispatchEvent(new Event('minimized', { bubbles: true }));
		}
	}

	get maximizable() { return this.#getBooleanAttribute('maximizable'); }
	set maximizable(value) { this.#setBooleanAttribute('maximizable', value); }

	get maximized() { return this.#getBooleanAttribute('maximized'); }
	set maximized(value) {
		this.#setBooleanAttribute('maximized', value);
		if (!value && this.maximized) {
			this.dispatchEvent(new Event('maximized', { bubbles: true }));
		}
	}

	get closable() { return this.#getBooleanAttribute('closable'); }
	set closable(value) { this.#setBooleanAttribute('closable', value); }

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
		const parentBounds = this.parentNode.getBoundingClientRect();
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
		const parentBounds = this.parentNode.getBoundingClientRect();
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
		throw new Error('Not implemented yet.');
	}

	setContentSize(width, height) {
		throw new Error('Not implemented yet.');
	}

	getContentBounds() {
		throw new Error('Not implemented yet.');
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
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		const boolValue = newValue === '' || newValue === 'true' || newValue === name;
		switch (name) {
			case 'name':
				this.shadowRoot.querySelector('.title-text').textContent = newValue;
				break;
			case 'movable':
				this.#window.classList.toggle('movable', boolValue);
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
			case 'centered':
				if (boolValue) {
					this.#window.style.left = Math.round((this.parentElement.offsetWidth - this.width) / 2) + 'px';
					this.#window.style.top = Math.round((this.parentElement.offsetHeight - this.height) / 2) + 'px';
				} else {
					this.#window.style.left = this.x + 'px';
					this.#window.style.top = this.y + 'px';
				}
				break;
			case 'resizable':
				this.#window.classList.toggle('resizable', boolValue);
				break;
			case 'width':
				this.#window.style.width = this.#parseInteger(newValue) + 'px';
				break;
			case 'height':
				this.#window.style.height = this.#parseInteger(newValue) + 'px';
				break;
			case 'minWidth':
				this.width = Math.max(this.#parseInteger(newValue), this.width);
				break;
			case 'minHeight':
				this.height = Math.max(this.#parseInteger(newValue), this.height);
				break;
			case 'maxWidth':
				this.width = Math.min(this.width, this.#parseInteger(newValue));
				break;
			case 'maxHeight':
				this.height = Math.min(this.height, this.#parseInteger(newValue));
				break;
			case 'minimizable':
				this.#window.classList.toggle('minimizable', boolValue);
				break;
			case 'minimized':
				if (boolValue && this.maximized) this.maximized = false;
				this.#window.classList.toggle('minimized', boolValue);
				break;
			case 'maximizable':
				this.#window.classList.toggle('maximizable', boolValue);
				break;
			case 'maximized':
				if (boolValue && this.minimized) this.minimized = false;
				this.#window.classList.toggle('maximized', boolValue);
				break;
			case 'closable':
				this.#window.classList.toggle('closable', boolValue);
				break;
			case 'fullscreenable':
				this.#window.classList.toggle('fullscreenable', boolValue);
				break;
			case 'fullscreen':
				this.#window.classList.toggle('fullscreen', boolValue);
				break;
			default:
				throw new Error(`Handling of observed attribute '${name}' is not implemented.`);
				break;
		}
	}

	#setupDragging() {
		let parentRect = { left: 0, right: 0, bottom: 0, top: 0 };
		let startX = 0;
		let startY = 0;
		let windowX = 0;
		let windowY = 0;

		const onMouseMove = (e) => {
			const dx = Math.max(parentRect.left, Math.min(e.clientX, parentRect.right)) - startX;
			const dy = Math.max(parentRect.top, Math.min(e.clientY, parentRect.bottom)) - startY;
			this.#window.style.left = `${Math.round(windowX + dx)}px`;
			this.#window.style.top = `${Math.round(windowY + dy)}px`;
		};

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
			this.x = Number.parseInt(this.#window.style.left.replace('px', ''));
			this.y = Number.parseInt(this.#window.style.top.replace('px', ''));
			this.centered = false;
		};

		this.shadowRoot.querySelector('.titlebar')?.addEventListener('mousedown', (e) => {
			if (!this.movable) return;
			windowX = this.#window.offsetLeft;
			windowY = this.#window.offsetTop;
			startX = e.clientX;
			startY = e.clientY;
			parentRect = this.parentElement.getBoundingClientRect();
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
		});
	}

	#setupResizing() {
		let parentRect = { left: 0, right: 0, bottom: 0, top: 0, width: 0, height: 0 };
		let startMouseX, startMouseY;
		let startWindowX, startWindowY
		let startWindowWidth, startWindowHeight;
		let direction;
		let minWidth, minHeight, maxWidth, maxHeight;

		const onMouseMove = (e) => {
			const dx = Math.max(parentRect.left, Math.min(e.clientX, parentRect.right)) - startMouseX;
			const dy = Math.max(parentRect.top, Math.min(e.clientY, parentRect.bottom)) - startMouseY;

			if (direction.includes('e')) {
				const w = Math.max(minWidth, Math.min(startWindowWidth + dx, maxWidth));
				this.#window.style.width = `${Math.round(w)}px`;
			} else if (direction.includes('w')) {
				const w = Math.max(minWidth, Math.min(startWindowWidth - dx, maxWidth));
				this.#window.style.width = `${Math.round(w)}px`;
				this.#window.style.left = `${Math.round(startWindowX + startWindowWidth - w)}px`;
			}
			if (direction.includes('n')) {
				const h = Math.max(minHeight, Math.min(startWindowHeight - dy, maxHeight));
				this.#window.style.height = `${Math.round(h)}px`;
				this.#window.style.top = `${Math.round(startWindowY + startWindowHeight - h)}px`;
			} else if (direction.includes('s')) {
				const h = Math.max(minHeight, Math.min(startWindowHeight + dy, maxHeight));
				this.#window.style.height = `${Math.round(h)}px`;
			}
		};

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
			this.x = Number.parseInt(this.#window.style.left.replace('px', ''));
			this.y = Number.parseInt(this.#window.style.top.replace('px', ''));
			this.width = Number.parseInt(this.#window.style.width.replace('px', ''));
			this.height = Number.parseInt(this.#window.style.height.replace('px', ''));
			this.centered = false;
		};

		/** @type {HTMLElement[]} */
		const handles = this.shadowRoot.querySelectorAll('.resize-handle');
		for (const handle of handles) {
			handle.addEventListener('mousedown', (e) => {
				if (!this.resizable) return;
				parentRect = this.parentElement.getBoundingClientRect();
				startMouseX = e.clientX;
				startMouseY = e.clientY;
				const rect = this.#window.getBoundingClientRect();
				startWindowX = rect.left - parentRect.left;
				startWindowY = rect.top - parentRect.top;
				startWindowWidth = rect.width;
				startWindowHeight = rect.height;
				direction = handle.dataset.direction;
				minWidth = this.minWidth;
				minHeight = this.minHeight;
				maxWidth = this.maxWidth;
				maxHeight = this.maxHeight;
				window.addEventListener('mousemove', onMouseMove);
				window.addEventListener('mouseup', onMouseUp);
			});
		}
	}
}

let registerCalled = false;
export function register({ tag = 'desktop-window', shadowMode = 'open' } = {}) {
	if (registerCalled) return;
	registerCalled = true;
	customElements.define(tag, DesktopWindow);
}

export default DesktopWindow;
