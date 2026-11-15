import { DesktopWindow, register } from '../desktop-window.mjs';

register();

const desktop = document.getElementById('desktop');
const opener = document.getElementById('opener');
const results = [];
const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const windowElement = win => win.shadowRoot.querySelector('.window');
const active = win => win.shadowRoot.activeElement || document.activeElement;

function create(attributes = {}) {
	const win = document.createElement('desktop-window');
	win.name = 'Test window';
	for (const [name, value] of Object.entries(attributes)) win[name] = value;
	win.innerHTML = '<button class="content">Content action</button>';
	desktop.append(win);
	return win;
}

async function test(name, run) {
	opener.focus();
	try {
		await run();
		results.push({ name, passed: true });
	} catch (error) {
		results.push({ name, passed: false, error: error.message });
	} finally {
		for (const win of desktop.querySelectorAll('desktop-window')) win.remove();
		await frame();
	}
	const result = results.at(-1);
	const item = document.createElement('li');
	item.className = result.passed ? 'pass' : 'fail';
	item.textContent = `${result.passed ? 'PASS' : 'FAIL'}: ${name}${result.error ? ' — ' + result.error : ''}`;
	document.getElementById('results').append(item);
}

await test('Native buttons have names; global labels update connected and detached instances', () => {
	const win = create({ closable: true, minimizable: true, maximizable: true });
	const detached = new DesktopWindow();
	const original = DesktopWindow.closeButtonLabel;
	try {
		DesktopWindow.closeButtonLabel = 'Bezárás';
		for (const instance of [win, detached]) {
			const button = instance.shadowRoot.querySelector('.btn-close');
			assert(button instanceof HTMLButtonElement, 'Close must be a native button');
			assert(button.getAttribute('aria-label') === 'Bezárás', 'Existing instances must update');
		}
	} finally {
		DesktopWindow.closeButtonLabel = original;
	}
});

await test('Custom titles and external labels/descriptions stay synchronized', async () => {
	const win = create();
	win.innerHTML = '<span slot="titlebar-center">Custom title</span>';
	await frame();
	assert(windowElement(win).getAttribute('aria-label') === 'Custom title', 'Use the visible custom title');
	const label = document.createElement('span');
	label.id = 'external-label';
	label.textContent = 'External title';
	opener.after(label);
	try {
		win.setAttribute('aria-labelledby', label.id);
		win.setAttribute('aria-describedby', label.id);
		label.textContent = 'Updated title';
		await frame();
		assert(windowElement(win).getAttribute('aria-label') === 'Updated title', 'External label changes must update');
		assert(win.shadowRoot.querySelector('#window-description').textContent === 'Updated title', 'Description must cross the shadow boundary');
	} finally {
		label.remove();
	}
});

await test('Programmatic minimizing removes content from interaction and moves focus', () => {
	const win = create({ minimizable: true });
	const content = win.querySelector('button');
	content.focus();
	win.minimized = true;
	assert(win.shadowRoot.querySelector('.client-area').inert, 'Minimized content must be inert');
	assert(active(win).classList.contains('btn-restore'), 'Focus must move to Restore');
	win.minimized = false;
	assert(!win.shadowRoot.querySelector('.client-area').inert, 'Restored content must become interactive');
	assert(document.activeElement === content, 'Restore the content focus when possible');
});

await test('Closing a background window preserves the active window focus', () => {
	const background = create({ closable: true });
	const foreground = create({ closable: true });
	const content = foreground.querySelector('button');
	content.focus();
	background.close();
	assert(document.activeElement === content, 'Closing a background window must not steal focus');
});

await test('Initial focus falls back to the window when the autofocus field is disabled', async () => {
	const win = create();
	win.innerHTML = '<input autofocus disabled>';
	win.autofocus = true;
	await frame();
	assert(active(win) === windowElement(win), 'A disabled autofocus field must not prevent window focus');
	win.innerHTML = '<input autofocus>';
	win.autofocus = false;
	win.autofocus = true;
	assert(document.activeElement === win.querySelector('input'), 'A usable autofocus field must receive focus');
});

await test('Hiding a previously focused window in the same task does not steal focus', () => {
	const previous = create();
	const current = create();
	previous.querySelector('button').focus();
	const content = current.querySelector('button');
	content.focus();
	previous.hidden = true;
	assert(document.activeElement === content, 'The old focus flag must be cleared synchronously');
});

await test('Closing a window without an available opener does not focus an unrelated desktop', () => {
	const otherDesktop = document.createElement('div');
	desktop.after(otherDesktop);
	try {
		const unrelated = create();
		otherDesktop.append(unrelated);
		const win = create({ closable: true });
		win.querySelector('button').focus();
		opener.hidden = true;
		win.close();
		assert(!unrelated.isFocused(), 'Do not search globally for a replacement window');
	} finally {
		opener.hidden = false;
		otherDesktop.remove();
	}
});

await test('Pointer cancellation only cancels the active pointer', () => {
	const win = create({ movable: true });
	const before = win.getBounds();
	const rect = windowElement(win).getBoundingClientRect();
	win.shadowRoot.querySelector('.titlebar').dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: rect.left + 10, clientY: rect.top + 10 }));
	window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: rect.left + 35, clientY: rect.top + 25 }));
	const moved = win.getBounds();
	assert(moved.x !== before.x, 'The active pointer must move the window');
	window.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 2 }));
	assert(win.getBounds().x === moved.x, 'Another pointer must not reset the drag');
	window.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1 }));
	assert(JSON.stringify(win.getBounds()) === JSON.stringify(before), 'The active pointer must restore the starting bounds');
});

await test('Dragging preserves the original pointer-based container limit', () => {
	const win = create({ movable: true });
	const before = win.getBounds();
	const rect = windowElement(win).getBoundingClientRect();
	const parent = desktop.getBoundingClientRect();
	const startX = rect.left + 10;
	const startY = rect.top + 10;
	win.shadowRoot.querySelector('.titlebar').dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: startX, clientY: startY }));
	window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: parent.right + 100, clientY: startY }));
	const expected = Math.round(before.x + parent.right - startX);
	assert(Math.abs(win.getBounds().x - expected) <= 1, 'Clamp the pointer, not the full window bounds');
	window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
});

await test('Disconnecting during a drag only cleans up listeners and allows reconnection', () => {
	const win = create({ movable: true, resizable: true, centered: true });
	const rect = windowElement(win).getBoundingClientRect();
	win.shadowRoot.querySelector('.titlebar').dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: rect.left + 10, clientY: rect.top + 10 }));
	window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: rect.left + 35, clientY: rect.top + 25 }));
	const attributes = win.outerHTML;
	win.remove();
	assert(win.outerHTML === attributes, 'Disconnecting must not roll back attributes');
	const style = windowElement(win).getAttribute('style');
	window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: rect.left + 80, clientY: rect.top + 80 }));
	assert(windowElement(win).getAttribute('style') === style, 'Detached windows must stop tracking the pointer');
	desktop.append(win);
	const reconnected = windowElement(win).getBoundingClientRect();
	win.shadowRoot.querySelector('.titlebar').dispatchEvent(new PointerEvent('pointerdown', { pointerId: 2, button: 0, clientX: reconnected.left + 10, clientY: reconnected.top + 10 }));
	window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 2, clientX: reconnected.left + 20, clientY: reconnected.top + 10 }));
	window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 2 }));
	assert(win.x === Math.round(reconnected.left - desktop.getBoundingClientRect().left + 10), 'Reconnected windows must still drag once');
});

await test('Canceled dragging/resizing restores bounds even when attributes have not changed', () => {
	const win = create({ movable: true, resizable: true });
	for (const selector of ['.titlebar', '.handle-se']) {
		const before = win.getBounds();
		const rect = windowElement(win).getBoundingClientRect();
		win.shadowRoot.querySelector(selector).dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: rect.left + 10, clientY: rect.top + 10 }));
		window.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: rect.left + 35, clientY: rect.top + 25 }));
		windowElement(win).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
		assert(JSON.stringify(win.getBounds()) === JSON.stringify(before), 'Escape must restore the original bounds');
	}
});

await test('Public controls and focus work with a closed shadow root', () => {
	DesktopWindow.shadowMode = 'closed';
	let win;
	try {
		win = create({ minimizable: true, closable: true });
	} finally {
		DesktopWindow.shadowMode = 'open';
	}
	assert(win.shadowRoot === null, 'The shadow root must be closed');
	win.focus();
	assert(win.isFocused(), 'Public focus must work');
	win.dispatchEvent(new Event('minimize'));
	assert(win.minimized, 'Host commands must reach the internal controls');
	win.dispatchEvent(new Event('restore'));
	assert(!win.minimized, 'Host restore must work');
	win.close();
	assert(document.activeElement === opener, 'Closed-root window must return focus');
});

await test('Maximizing emits the correct state events', () => {
	const win = create();
	const events = [];
	win.addEventListener('maximized', () => events.push('maximized'));
	win.addEventListener('restored', () => events.push('restored'));
	win.maximized = true;
	win.maximized = false;
	assert(events.join(',') === 'maximized,restored', 'Correctly detect the old maximized state');
});

window.accessibilityResults = results;
document.title = `${results.filter(result => !result.passed).length ? 'FAIL' : 'PASS'} — Accessibility checks`;
