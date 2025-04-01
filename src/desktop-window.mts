import stylesheet from './desktop-window.generated.css.txt';
import html from './desktop-window.generated.html.txt';

interface Bounds {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class DesktopWindow extends HTMLElement {

	static shadowMode: 'open' | 'closed' = 'open';
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
			'x',
			'y',
			'width',
			'height',
			'minWidth',
			'minHeight',
			'maxWidth',
			'maxHeight',
			'centered',
			'autofocus',
		];
	}

	static #nextZIndex = 20;

	static #stylesheet = (() => {
		const style = new CSSStyleSheet();
		style.replaceSync(stylesheet);
		return style;
	})();

	#shadowRoot: ShadowRoot;
	#window: HTMLElement;
	#clientArea: HTMLElement;
	#dragPointerMove?: (event: PointerEvent) => void;
	#dragPointerUp?: (event: PointerEvent) => void;
	#resizePointerMove?: (event: PointerEvent) => void;
	#resizePointerUp?: (event: PointerEvent) => void;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({
			mode: DesktopWindow.shadowMode,
			delegatesFocus: true,
		});
		this.#shadowRoot.adoptedStyleSheets = [DesktopWindow.#stylesheet];
		this.#shadowRoot.innerHTML = html;

		this.#window = this.#shadowRoot.querySelector('.window')!;
		this.#clientArea = this.#window.querySelector('.client-area')!;

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

		this.#window.addEventListener('pointerdown', () => {
			this.#window.style.setProperty('--z-index', String(DesktopWindow.#nextZIndex++));
		});

		this.#shadowRoot.querySelector('.backdrop')!.addEventListener('click', () => {
			this.flash();
		});

		//-- titlebar controls should not bubble titlebar only events

		const controls = this.#shadowRoot.querySelectorAll('.titlebar-start, .titlebar-end, .control-btn');
		for (const control of controls) {
			control.addEventListener('pointerdown', (event) => {
				event.stopPropagation();
				this.#window.style.setProperty('--z-index', String(DesktopWindow.#nextZIndex++));
			});
			control.addEventListener('dblclick', (event) => {
				event.stopPropagation();
			});
		}

		//-- control buttons

		const minimize = this.#shadowRoot.querySelector<HTMLElement>('.btn-minimize')!;
		const maximize = this.#shadowRoot.querySelector<HTMLElement>('.btn-maximize')!;
		const restore = this.#shadowRoot.querySelector<HTMLElement>('.btn-restore')!;
		const close = this.#shadowRoot.querySelector<HTMLElement>('.btn-close')!;

		minimize.addEventListener('click', () => {
			this.#shadowRoot!.dispatchEvent(new Event('minimize', { bubbles: true }));
			restore.focus();
		});

		maximize.addEventListener('click', () => {
			this.#shadowRoot!.dispatchEvent(new Event('maximize', { bubbles: true }));
			restore.focus();
		});

		restore.addEventListener('click', () => {
			const oldMinimized = this.minimized;
			const oldMaximized = this.maximized;
			this.#shadowRoot!.dispatchEvent(new Event('restore', { bubbles: true }));
			if (oldMaximized) {
				maximize.focus();
			} else if (oldMinimized) {
				minimize.focus();
			}
		});

		close.addEventListener('click', () => {
			this.#shadowRoot!.dispatchEvent(new Event('close', { bubbles: true }));
		});

		this.#window.querySelector('.titlebar')!.addEventListener('dblclick', () => {
			if (this.maximizable) {
				this.maximized = !this.maximized;
			}
		});

		for (const btn of this.#shadowRoot.querySelectorAll<HTMLElement>('.control-btn')) {
			btn.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					btn.click();
				}
			})
		}

		// custom resize/move handler

		this.#shadowRoot.addEventListener('move', (event: Event) => {
			event.stopPropagation(); // stops composed events to escape
			if ('detail' in event
				&& event.detail
				&& typeof event.detail === 'object'
				&& 'clientX' in event.detail
				&& 'clientY' in event.detail
				&& typeof event.detail.clientX === 'number'
				&& typeof event.detail.clientY === 'number'
			) {
				const { clientX, clientY } = event.detail;
				this.#shadowRoot!.querySelector('.titlebar')!
					.dispatchEvent(new PointerEvent('pointerdown', { clientX, clientY }));
			} else {
				throw new Error(`Failed to handle 'move' event. Emit a CustomEvent with detail = { clientX, clientY }.`);
			}
		});

		const directions = ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'];
		for (const direction of directions) {
			this.#shadowRoot.addEventListener('resize-' + direction, (event) => {
				event.stopPropagation(); // stops composed events to escape
				if ('detail' in event
					&& event.detail
					&& typeof event.detail === 'object'
					&& 'clientX' in event.detail
					&& 'clientY' in event.detail
					&& typeof event.detail.clientX === 'number'
					&& typeof event.detail.clientY === 'number'
				) {
					const { clientX, clientY } = event.detail;
					this.#shadowRoot!.querySelector('.resize-handle.handle-' + direction)!
						.dispatchEvent(new PointerEvent('pointerdown', { clientX, clientY }));
				} else {
					throw new Error(`Failed to handle 'resize-${direction}' event. Emit a CustomEvent with detail = { clientX, clientY }.`);
				}
			});
		}
	}

	#cssPixelToInteger(propertyValue: string) {
		return Number.parseInt(propertyValue.replace('px', ''));
	}

	#parseUnsigned(value: string | null) {
		if (value === null) return null;
		const intVal = Number.parseInt(value);
		return Number.isNaN(intVal) || intVal < 0 ? null : intVal;
	}

	#parseInteger(value: string | null) {
		if (value === null) return null;
		const intVal = Number.parseInt(value);
		return Number.isNaN(intVal) ? null : intVal;
	}

	#getUnsignedAttribute(name: string) {
		return this.#parseUnsigned(this.getAttribute(name)!);
	}

	#setUnsignedAttribute(name: string, value: number) {
		this.setAttribute(name, String(Math.round(Math.max(0, value))));
	}

	#getIntegerAttribute(name: string) {
		return this.#parseInteger(this.getAttribute(name)!);
	}

	#setIntegerAttribute(name: string, value: number) {
		this.setAttribute(name, String(Math.round(value)));
	}

	#getBooleanAttribute(name: string) {
		const value = this.getAttribute(name);
		return value === '' || value === 'true';
	}

	#setBooleanAttribute(name: string, value: boolean) {
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
	set centered(value) { this.#setBooleanAttribute('centered', value); }

	get width() { return this.#getUnsignedAttribute('width') ?? DesktopWindow.defaultWidth; }
	set width(value) { this.#setUnsignedAttribute('width', value); }

	get height() { return this.#getUnsignedAttribute('height') ?? DesktopWindow.defaultHeight; }
	set height(value) { this.#setUnsignedAttribute('height', value); }

	get minWidth() { return this.#getUnsignedAttribute('minWidth') ?? DesktopWindow.defaultMinWidth; }
	set minWidth(value) { this.#setUnsignedAttribute('minWidth', value); }

	get minHeight() { return this.#getUnsignedAttribute('minHeight') ?? DesktopWindow.defaultMinHeight; }
	set minHeight(value) { this.#setUnsignedAttribute('minHeight', value); }

	get maxWidth() { return this.#getUnsignedAttribute('maxWidth') ?? DesktopWindow.defaultMaxWidth ?? this.parentElement!.offsetWidth; }
	set maxWidth(value) { this.#setUnsignedAttribute('maxWidth', value); }

	get maxHeight() { return this.#getUnsignedAttribute('maxHeight') ?? DesktopWindow.defaultMaxHeight ?? this.parentElement!.offsetHeight; }
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

	get frameless() { return this.#getBooleanAttribute('frameless'); }
	set frameless(value) { this.#setBooleanAttribute('frameless', value); }

	get modal() { return this.#getBooleanAttribute('modal'); }
	set modal(value) { this.#setBooleanAttribute('modal', value); }

	flash() {
		this.#window.classList.remove('flashed');
		void this.#window.offsetWidth;
		this.#window.classList.add('flashed');
	}

	focus() {
		this.#window.style.setProperty('--z-index', String(DesktopWindow.#nextZIndex++));
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
		const parentBounds = this.parentElement!.getBoundingClientRect();
		const windowBounds = this.#window.getBoundingClientRect();
		return [windowBounds.x - parentBounds.x, windowBounds.y - parentBounds.y];
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getSize() {
		const windowBounds = this.#window.getBoundingClientRect();
		return [Math.round(windowBounds.width), Math.round(windowBounds.height)];
	}

	setSize(width: number, height: number) {
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
		const parentBounds = this.parentElement!.getBoundingClientRect();
		const windowBounds = this.#window.getBoundingClientRect();
		return {
			x: Math.floor(windowBounds.x) - Math.floor(parentBounds.x),
			y: Math.floor(windowBounds.y) - Math.floor(parentBounds.y),
			width: Math.floor(windowBounds.width),
			height: Math.floor(windowBounds.height),
		};
	}

	setBounds({ x, y, width, height }: Bounds) {
		if (undefined !== x) this.x = x;
		if (undefined !== y) this.y = y;
		if (undefined !== width) this.width = width;
		if (undefined !== height) this.height = height;
	}

	getContentSize() {
		const clientBounds = this.#clientArea.getBoundingClientRect();
		return [Math.floor(clientBounds.width), Math.floor(clientBounds.height)];
	}

	setContentSize(width: number, height: number) {
		const [windowWidth, windowHeight] = this.getSize();
		const [contentWidth, contentHeight] = this.getContentSize();
		this.width = width - (windowWidth - contentWidth);
		this.height = height - (windowHeight - contentHeight);
	}

	getContentBounds() {
		const parentBounds = this.parentElement!.getBoundingClientRect();
		const clientBounds = this.#clientArea.getBoundingClientRect();
		return {
			x: Math.floor(clientBounds.x) - Math.floor(parentBounds.x),
			y: Math.floor(clientBounds.y) - Math.floor(parentBounds.y),
			width: Math.floor(clientBounds.width),
			height: Math.floor(clientBounds.height),
		};
	}

	setContentBounds({ x, y, width, height }: Bounds) {
		const windowBounds = this.#window.getBoundingClientRect();
		const clientBounds = this.#clientArea.getBoundingClientRect();
		if (undefined !== x) this.x = x - (Math.floor(clientBounds.x) - Math.floor(windowBounds.x));
		if (undefined !== y) this.y = y - (Math.floor(clientBounds.y) - Math.floor(windowBounds.y));
		if (undefined !== width) this.width = width + (Math.floor(windowBounds.width) - Math.floor(clientBounds.width));
		if (undefined !== height) this.height = height + (Math.floor(windowBounds.height) - Math.floor(clientBounds.height));
	}

	connectedCallback() {
		if (this.centered) {
			this.#window.style.left = Math.round((this.parentElement!.offsetWidth - this.width) / 2) + 'px';
			this.#window.style.top = Math.round((this.parentElement!.offsetHeight - this.height) / 2) + 'px';
		}
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
		this.#shadowRoot = null as any;
		this.#window = null as any;

		if (this.#dragPointerMove) {
			window.removeEventListener('pointermove', this.#dragPointerMove);
			this.#dragPointerMove = null as any;
		}
		if (this.#dragPointerUp) {
			window.removeEventListener('pointerup', this.#dragPointerUp);
			this.#dragPointerUp = null as any;
		}
		if (this.#resizePointerMove) {
			window.removeEventListener('pointermove', this.#resizePointerMove);
			this.#resizePointerMove = null as any;
		}
		if (this.#resizePointerUp) {
			window.removeEventListener('pointerup', this.#resizePointerUp);
			this.#resizePointerUp = null as any;
		}
	}

	attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string) {
		if (oldValue === newValue) return;
		switch (name) {
			case 'name':
				this.#shadowRoot.querySelector('.title-text')!.textContent = newValue;
				break;
			case 'centered':
				if (newValue !== null) {
					if (this.parentElement) {
						this.#window.style.left = Math.round((this.parentElement!.offsetWidth - this.width) / 2) + 'px';
						this.#window.style.top = Math.round((this.parentElement!.offsetHeight - this.height) / 2) + 'px';
					}
				} else {
					this.#window.style.left = this.x + 'px';
					this.#window.style.top = this.y + 'px';
				}
				break;
			case 'x':
				if (!this.centered) {
					const x = this.#parseInteger(newValue) ?? DesktopWindow.defaultX;
					this.#window.style.left = x + 'px';
				}
				break;
			case 'y':
				if (!this.centered) {
					const y = this.#parseInteger(newValue) ?? DesktopWindow.defaultY;
					this.#window.style.top = y + 'px';
				}
				break;
			case 'width':
				const width = this.#parseInteger(newValue) ?? DesktopWindow.defaultWidth;
				this.#window.style.width = width + 'px';
				break;
			case 'height':
				const height = this.#parseInteger(newValue) ?? DesktopWindow.defaultHeight;
				this.#window.style.height = height + 'px';
				break;
			case 'minWidth':
				const minWidth = this.#parseUnsigned(newValue) ?? DesktopWindow.defaultMinWidth;
				if (this.width < minWidth) {
					this.width = minWidth;
				}
				break;
			case 'minHeight':
				const minHeight = this.#parseUnsigned(newValue) ?? DesktopWindow.defaultMinHeight;
				if (this.height < minHeight) {
					this.height = minHeight;
				}
				break;
			case 'maxWidth':
				const maxWidth = this.#parseUnsigned(newValue) ?? DesktopWindow.defaultMaxWidth ?? this.parentElement!.offsetWidth;
				if (this.width > maxWidth) {
					this.width = maxWidth;
				}
				break;
			case 'maxHeight':
				const maxHeight = this.#parseUnsigned(newValue) ?? DesktopWindow.defaultMaxHeight ?? this.parentElement!.offsetHeight;
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
		let startClientX: number, startClientY: number;
		let start: DOMRect;
		let parentRect: DOMRect;

		this.#dragPointerMove = (event: PointerEvent) => {
			const dx = Math.max(parentRect.left, Math.min(event.clientX, parentRect.right)) - startClientX;
			const dy = Math.max(parentRect.top, Math.min(event.clientY, parentRect.bottom)) - startClientY;
			this.#window.style.left = `${Math.round(start.x + dx)}px`;
			this.#window.style.top = `${Math.round(start.y + dy)}px`;
		};

		this.#dragPointerUp = () => {
			window.removeEventListener('pointermove', this.#dragPointerMove!);
			window.removeEventListener('pointerup', this.#dragPointerUp!);
			this.x = this.#cssPixelToInteger(this.#window.style.left);
			this.y = this.#cssPixelToInteger(this.#window.style.top);
		};

		const titlebar = this.#shadowRoot.querySelector<HTMLElement>('.titlebar')!;
		titlebar.addEventListener('pointerdown', (event: PointerEvent) => {
			if (!this.movable) return;
			startClientX = event.clientX;
			startClientY = event.clientY;
			start = this.#window.getBoundingClientRect();
			parentRect = this.parentElement!.getBoundingClientRect();
			window.addEventListener('pointermove', this.#dragPointerMove!);
			window.addEventListener('pointerup', this.#dragPointerUp!);
			if (this.centered) {
				this.x = start.x;
				this.y = start.y;
				this.centered = false;
			}
		});
	}

	#setupResizing() {
		let direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
		let startClientX: number, startClientY: number;
		let start: DOMRect;
		let parentRect: DOMRect;
		let minWidth: number, minHeight: number, maxWidth: number, maxHeight: number;

		this.#resizePointerMove = (event) => {
			const dx = Math.max(parentRect.left, Math.min(event.clientX, parentRect.right)) - startClientX;
			const dy = Math.max(parentRect.top, Math.min(event.clientY, parentRect.bottom)) - startClientY;

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
			window.removeEventListener('pointermove', this.#resizePointerMove!);
			window.removeEventListener('pointerup', this.#resizePointerUp!);
			this.x = this.#cssPixelToInteger(this.#window.style.left);
			this.y = this.#cssPixelToInteger(this.#window.style.top);
			this.width = this.#cssPixelToInteger(this.#window.style.width);
			this.height = this.#cssPixelToInteger(this.#window.style.height);
		};

		/** @type {HTMLElement[]} */
		const handles = this.#shadowRoot.querySelectorAll<HTMLElement>('.resize-handle');
		for (const handle of handles) {
			handle.addEventListener('pointerdown', (event) => {
				if (!this.resizable) return;
				direction = handle.dataset.direction as typeof direction;
				startClientX = event.clientX;
				startClientY = event.clientY;
				start = this.#window.getBoundingClientRect();
				parentRect = this.parentElement!.getBoundingClientRect();
				minWidth = this.minWidth;
				minHeight = this.minHeight;
				maxWidth = this.maxWidth;
				maxHeight = this.maxHeight;
				window.addEventListener('pointermove', this.#resizePointerMove!);
				window.addEventListener('pointerup', this.#resizePointerUp!);
				if (this.centered) {
					this.x = start.x;
					this.y = start.y;
					this.centered = false;
				}
			});
		}
	}
}

interface RegisterOptions {
	tag?: string;
	shadowMode?: 'open' | 'closed';
}

export function register({ tag = 'desktop-window', shadowMode = 'open' }: RegisterOptions = {}) {
	if (customElements.get(tag)) return;
	if (shadowMode) {
		DesktopWindow.shadowMode = shadowMode;
	}
	customElements.define(tag, DesktopWindow);
}

export default DesktopWindow;
