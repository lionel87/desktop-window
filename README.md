# desktop-window

A lightweight Web Components-based custom element that replicates the look and feel of native desktop application windows — resizable, movable, and styled like a traditional OS window. No frameworks required.

![demo](demo.png)

## NOT READY FOR PRODUCTION

This package is in active development, and not yet reached the point where I can recommend using in production environment:

- Its tested to some degree, but not well tested or battle proven. I'm working on this now.
- Minor behaviour and API changes are still possible.

### Roadmap to v1.0

- test cases / unit tests?
- accessibility

## Usage

```
import { register, DesktopWindow } from 'desktop-window';

register(); // this guards against multiple accidental registration

// OR you could just do this instead:
customElements.define('desktop-window', DesktopWindow);
```

Or without a build tool:

Manually copy the `desktop-window.autoload.js` to your site, then:

```html
<script src="desktop-window.autoload.js"></script>
```

Use the `<desktop-window>` tag in HTML code.

```html
<style>
  desktop-window[fullscreen] #enter-fullscreen { display: none; }
  desktop-window:not([fullscreen]) #exit-fullscreen { display: none; }
</style>
<div style="position: relative; width: 100vw; height: 100vh;">
  <desktop-window name="Hello world!" movable resizable minimizable maximizable closable centered>
    The contents of the window are placed here.
    <button id="enter-fullscreen">⛶ Enter fullscreen</button>
    <button id="exit-fullscreen">⛶ Exit fullscreen</button>
  </desktop-window>
</div>
<script>
document.getElementById('enter-fullscreen').addEventListener('click', function (event) {
    this.dispatchEvent(new Event('request-fullscreen', { bubbles: true }));
});
document.getElementById('exit-fullscreen').addEventListener('click', function (event) {
    this.dispatchEvent(new Event('exit-fullscreen', { bubbles: true }));
});
</script>
```

## Examples

For examples see the [Github project `examples` folder](https://github.com/lionel87/desktop-window/tree/master/examples).

1. Clone repository or [download zip](https://github.com/lionel87/desktop-window/archive/refs/heads/master.zip).
2. Open `examples/index.html` in your browser.


## Notes on layout

- The component positions itself **absolutely inside its immediate parent**. The parent should be `position: relative` (or `absolute`) and have a well-defined size.

- Recommended: `overflow: hidden` on the parent to avoid scrollbars when moving windows out of bounds.

- The window works only when there is a valid `parentElement`, so appending eg. to a shadow root directly will not work.

- Appending to the `document.body` works, but don't forget to set the body height or have content that stretches the area!

- When the script is asynchronously loaded and the HTML initially has windows I recommend you this CSS to prevent jumping content:
  ```css
  desktop-window:not(:defined) {
    display: none;
  }
  ```


## Documentation

**Contents**
- [Attributes](#attributes)
- [Events emitted](#events-emitted)
- [Events listening for](#events-listening-for)
- [Properties](#properties)
- [Methods](#methods)
- [Slots](#slots)
- [Parts](#parts)
- [CSS Variables](#css-variables)


### Attributes

All boolean attributes on `<desktop-window>` follow this rule:

- If the attribute is **present**, its value is considered `true`, regardless of whether the value is empty, `"true"`, or equals the attribute name.
- If the attribute is **not present**, the value is `false`.

**Truthy examples (evaluated as `true`):**
```html
<desktop-window centered>
<desktop-window centered="true">
<desktop-window centered="centered">
<desktop-window centered="1">
<desktop-window centered="">
````

**Falsy example (evaluated as `false`):**

```html
<desktop-window>
```

There is **no way to explicitly pass `false`** via the attribute. Omitting the attribute entirely is the only way to make it false.

If dynamic control of booleans is needed, use JavaScript to set/remove attributes:

```js
element.removeAttribute('centered'); // false
element.setAttribute('centered', ''); // true
```


#### `name`
Type: `string`  
Specifies the title displayed in the window's title bar.  
Example:
```html
<desktop-window name="My Window">
```


#### `movable`
Type: `boolean`  
If present, the window can be dragged. If omitted, the window is fixed in place.  
Example:
```html
<desktop-window movable>
```


#### `x`
Type: `number`  
Initial horizontal coordinate of the window (in pixels, omit the `px` unit). Ignored if `centered` is set.  
Example:
```html
<desktop-window x="100">
```


#### `y`
Type: `number`  
Initial vertical coordinate of the window (in pixels, omit `px` unit). Ignored if `centered` is set.  
Example:
```html
<desktop-window y="100">
```


#### `centered`
Type: `boolean`  
If present, the window is centered. Overrides `x` and `y`.  
Example:
```html
<desktop-window centered>
```


#### `resizable`
Type: `boolean`  
If present, the window can be resized.
Omitting it disables resizing.  
Example:
```html
<desktop-window resizable>
```


#### `width`
Type: `number`  
Default: `350`.  
Initial width in pixels.  
Example:
```html
<desktop-window width="800">
```


#### `height`
Type: `number`  
Default: `350`.  
Initial height in pixels.  
Example:
```html
<desktop-window height="600">
```


#### `minwidth`
Type: `number`  
Default: `150`.  
Minimum width allowed during resizing.  
Example:
```html
<desktop-window minwidth="200">
```


#### `maxwidth`
Type: `number`
Maximum width allowed during resizing.  
Example:
```html
<desktop-window maxwidth="1000">
```


#### `minheight`
Type: `number`  
Default: `150`.  
Minimum height allowed during resizing.  
Example:
```html
<desktop-window minheight="200">
```


#### `maxheigh`
Type: `number`  
Maximum height allowed during resizing.  
Example:
```html
<desktop-window maxheigh="700">
```


#### `minimizable`
Type: `boolean`  
If present, the window shows a minimize button and allows minimizing.  
Example:
```html
<desktop-window minimizable>
```


#### `minimized`
Type: `boolean`  
If present, the window is minimized.  
Example:
```html
<desktop-window minimized>
```


#### `maximizable`
Type: `boolean`  
If present, the window shows a maximize button and allows maximizing.  
Example:
```html
<desktop-window maximizable>
```


#### `maximized`
Type: `boolean`  
If present, the window is maximized.  
Example:
```html
<desktop-window maximized>
```


#### `closable`
Type: `boolean`  
If present, the window can be closed via an UI button. Omit to disable closing from the UI.  
Closing via JS API is still possible when this is disabled.  
Example:
```html
<desktop-window closable>
```


#### `fullscreen`
Type: `boolean`  
If present, the window is displayed in fullscreen mode.  
In fullscreen mode there is no borders around the window, but the titlebar is still visible with the minimize, restore, close controls.  
Example:
```html
<desktop-window fullscreen>
```


#### `hidden`
Type: `boolean`  
If present, the window is not visible. Remove this attribute to show the window.  
Example:
```html
<desktop-window hidden>
```


#### `autofocus`
Type: `boolean`  
If present, the window receives focus on creation.  
Example:
```html
<desktop-window autofocus>
```


#### `frameless`
Type: `boolean`
If present, the window is rendered without borders or title bar.  
Example:
```html
<desktop-window frameless>
```


#### `modal`
Type: `boolean`  
If present, the window becomes modal (blocks interaction with other sibling windows or the background).  
Example:
```html
<desktop-window modal>
```


#### `aspectratio`
Type: `number`  
Enforces a fixed aspect ratio (`width / height`) when resizing.  
Example:
```html
<desktop-window aspectratio="1.777">
```


#### `aspectratioextrawidth`
Type: `number`  
Extra width in pixels added to the actual content width when maintaining the aspect ratio.  
Example:
```html
<desktop-window aspectratioextrawidth="50">
```


#### `aspectratioextraheight`
Type: `number`  
Extra height in pixels added to the content height for aspect ratio calculation.  
Example:
```html
<desktop-window aspectratioextraheight="50">
```


### Events emitted

These events are dispatched (they bubble) on the `<desktop-window>` element when the user interact with the UI or when triggering states with events. If you toggle attributes/properties directly, no events are emitted.

“*ing” events are cancelable pre-flight hooks; call `event.preventDefault()` to stop the default action/state change.

These events carry no `detail`.


#### `closing` (cancelable)

Fired when a close is requested (via the close button or `close()`), before the element is removed. Preventing it stops the default removal.

#### `closed`

Fired after a close/destroy attempt. Treat it as “close flow finished”; if you need to know whether the element is still connected, check `win.isConnected` in your handler.

#### `minimizing` (cancelable)

Fired before the component sets `minimized = true` (typically via the minimize control). Preventing it keeps the window unminimized.

#### `minimized`

Fired when the window enters the minimized state (i.e. `minimized` changes from `false` to `true`).

#### `maximizing` (cancelable)

Fired before the component sets `maximized = true` (typically via the maximize control or titlebar double-click). Preventing it keeps the window unmaximized.

#### `maximized`

Fired when the window enters the maximized state (i.e. `maximized` changes from `false` to `true`).

#### `restoring` (cancelable)

Fired before the component restores (clears `minimized` and/or `maximized`, depending on the trigger). Preventing it keeps the current minimized/maximized state.

#### `restored`

Fired when the window leaves a minimized or maximized state (i.e. `minimized` or `maximized` changes from `true` to `false`).

#### `requesting-fullscreen` (cancelable)

Fired before the component sets `fullscreen = true` in response to a fullscreen request. Preventing it keeps fullscreen off.
There are no post-state events for fullscreen.

#### `exiting-fullscreen` (cancelable)

Fired before the component sets `fullscreen = false` in response to an exit-fullscreen request. Preventing it keeps fullscreen on.
There are no post-state events for fullscreen.


### Events listening for

`<desktop-window>` listens to a small set of internal/control events. You can dispatch these on the element to trigger the same behavior as the built-in UI, or to drive the component from your own controls.

Most of these are expected to be regular `Event`s. The `move` / `resize-*` events must be `CustomEvent`s with pointer coordinates in `detail`.

#### `close`

Requests closing the window. Internally triggers the cancelable `closing` flow and then `closed`.

```js
win.dispatchEvent(new Event('close', { bubbles: true }));
```

#### `minimize`

Requests minimizing the window. Internally emits cancelable `minimizing`, then sets `minimized = true`.

```js
win.dispatchEvent(new Event('minimize', { bubbles: true }));
```

#### `maximize`

Requests maximizing the window. Internally emits cancelable `maximizing`, then sets `maximized = true`.

```js
win.dispatchEvent(new Event('maximize', { bubbles: true }));
```

#### `restore`

Requests restoring from minimized and/or maximized. Internally emits cancelable `restoring`, then clears `minimized` and `maximized`.

```js
win.dispatchEvent(new Event('restore', { bubbles: true }));
```

#### `request-fullscreen`

Requests fullscreen mode. Internally emits cancelable `requesting-fullscreen`, then sets `fullscreen = true`.

```js
win.dispatchEvent(new Event('request-fullscreen', { bubbles: true }));
```

#### `exit-fullscreen`

Requests leaving fullscreen mode. Internally emits cancelable `exiting-fullscreen`, then sets `fullscreen = false`.

```js
win.dispatchEvent(new Event('exit-fullscreen', { bubbles: true }));
```

#### `move`

Starts a drag operation as if the user pressed the titlebar at a given pointer position.

Must be dispatched as:

```js
CustomEvent('move', { detail: { clientX, clientY }, bubbles: true })
```

```js
win.dispatchEvent(new CustomEvent('move', {
  bubbles: true,
  detail: { clientX: 200, clientY: 120 },
}));
```

#### `resize-n | resize-e | resize-s | resize-w | resize-ne | resize-nw | resize-se | resize-sw`

Starts a resize operation in the given direction as if the user pressed the corresponding resize handle at a given pointer position.

Must be dispatched as:

```js
CustomEvent('resize-<dir>', { detail: { clientX, clientY }, bubbles: true })
```

```js
win.dispatchEvent(new CustomEvent('resize-se', {
  bubbles: true,
  detail: { clientX: 640, clientY: 480 },
}));
```

Notes:
- If `movable` / `resizable` are not enabled, `move` / `resize-*` won’t start the interaction.
- If the event payload is missing `detail.clientX` / `detail.clientY` (numbers), the component throws an error.


### Properties

All attributes are reflected as properties (and vice versa). Boolean properties map to boolean attributes: setting `true` adds the attribute, setting `false` removes it.

#### `name: string | null`

Title shown in the default title UI (unless you override the `titlebar-center` slot).

#### `movable: boolean`

Enables dragging by the titlebar.

#### `x: number`

Left position in pixels (relative to the parent). Ignored while `centered` is `true`. Defaults to `DesktopWindow.defaultX`.

#### `y: number`

Top position in pixels (relative to the parent). Ignored while `centered` is `true`. Defaults to `DesktopWindow.defaultY`.

#### `centered: boolean`

Centers the window within its parent. While enabled, the effective position is computed from parent size and `width`/`height`.

#### `width: number`

Window width in pixels. Defaults to `DesktopWindow.defaultWidth`.

#### `height: number`

Window height in pixels. Defaults to `DesktopWindow.defaultHeight`.

#### `minWidth: number`

Minimum allowed width during resize. Defaults to `DesktopWindow.defaultMinWidth`.

#### `minHeight: number`

Minimum allowed height during resize. Defaults to `DesktopWindow.defaultMinHeight`.

#### `maxWidth: number`

Maximum allowed width during resize. Defaults to `DesktopWindow.defaultMaxWidth`, and if that is `null` it falls back to the parent element’s width.

#### `maxHeight: number`

Maximum allowed height during resize. Defaults to `DesktopWindow.defaultMaxHeight`, and if that is `null` it falls back to the parent element’s height.

#### `resizable: boolean`

Enables resizing via the resize handles.

#### `minimizable: boolean`

Shows the minimize control and enables minimizing from the UI.

#### `minimized: boolean`

Minimized state. When set to `true`, the client area is collapsed to zero height.

#### `maximizable: boolean`

Shows the maximize control and enables maximizing from the UI (including titlebar double-click).

#### `maximized: boolean`

Maximized state. When set to `true`, the window snaps to `top/left = 0` and `width/height = 100%` within the parent.

#### `closable: boolean`

Shows the close control in the UI. Programmatic close (`close()` / `destroy()`) is still possible even if this is `false`.

#### `fullscreen: boolean`

Fullscreen state. When set, the window fills the parent and hides borders, titlebar, and resize handles.

#### `hidden: boolean`

Standard HTML hidden behavior (not specific to this component). When present, the element is not rendered.

#### `autofocus: boolean`

If set, the window focuses itself when connected. If toggled on later, it also focuses immediately.

#### `frameless: boolean`

Hides the titlebar and removes border/shadow (transparent background). Intended for custom chrome.

#### `modal: boolean`

Shows an internal backdrop element that sits behind the window (within the parent) and intercepts clicks; clicking the backdrop calls `flash()`.

#### `aspectRatio: number`

Enables fixed aspect ratio resize (`width / height`). `0` disables the constraint.

#### `aspectRatioExtraWidth: number`

Extra width in pixels used by the aspect-ratio resize constraint. Conceptually, it reserves a fixed horizontal region on top of the ratio-locked client area: the ratio is maintained for the client area with this extra width subtracted, while the total client width still includes it.

#### `aspectRatioExtraHeight: number`

Extra height in pixels used by the aspect-ratio resize constraint. Conceptually, it reserves a fixed vertical region on top of the ratio-locked client area: the ratio is maintained for the client area with this extra height subtracted, while the total client height still includes it.


### Methods

All methods are instance methods on the custom element (e.g. `const win = document.querySelector('desktop-window') as DesktopWindow;`).

#### `flash()`

Visually draws attention to the window by briefly playing a “border flash” animation. Useful when the window is behind others or the user clicked outside while it’s modal.

- Does not change focus.
- Safe to call repeatedly; it restarts the animation.

```ts
win.flash();
```

#### `isFocused()`

Returns `true` if the window currently contains focus (internally checks `:focus-within` in the shadow root).

```ts
if (!win.isFocused()) {
  win.flash();
}
```

#### `focus()`

Brings the window to front (bumps its internal z-index) and focuses it.

- Focus is set on the internal window element.
- Triggers normal browser focus/blur behavior.

```ts
win.focus();
```

#### `blur()`

Removes focus from the window (blurs the internal window element).

```ts
win.blur();
```

#### `close()`

Requests closing the window with a cancelable lifecycle event.

Flow:

1. Dispatches `closing` (bubbles, cancelable) on the custom element.
2. If not prevented: removes the element from DOM.
3. Dispatches `closed` (bubbles) after removal.

Use when you want “user-like” close semantics and want listeners to be able to veto.

```ts
win.addEventListener('closing', (e) => {
  e.preventDefault(); // veto close
});

win.close(); // window does not closing
```

#### `destroy()`

Immediate teardown: removes the element from DOM and dispatches `closed` (bubbles). No cancelation, no `closing`.

Use when you want a hard close (e.g. app shutdown).

```ts
win.destroy();
```

#### `getPosition()`

Returns `[x, y]` in pixels relative to the immediate parent element’s top-left corner, based on actual layout (bounding rects), not on attributes.

```ts
const [x, y] = win.getPosition();
```

#### `setPosition(x, y)`

Sets `x` and `y` attributes (integer pixels). Equivalent to:

```ts
win.x = x;
win.y = y;
```

```ts
win.setPosition(120, 80);
```

#### `getSize()`

Returns `[width, height]` in pixels based on actual rendered window size (`getBoundingClientRect()`), rounded to integers.

```ts
const [w, h] = win.getSize();
```

#### `setSize(width, height)`

Sets `width` and `height` attributes (unsigned integer pixels).

```ts
win.setSize(640, 480);
```

#### `getNormalBounds()`

Returns the “normal” bounds from the element attributes (not accounting for visual overrides from `centered`, `fullscreen`, `maximized`, `minimized`):

```ts
const normal = win.getNormalBounds();
// { x, y, width, height } from attributes (with defaults applied)
```

Useful as a persisted/restorable geometry snapshot.

#### `getBounds()`

Returns the actual current bounds `{ x, y, width, height }` in pixels relative to the parent element, based on layout.

- Unlike `getNormalBounds()`, it reflects real geometry when `centered`, `fullscreen`, `maximized`, `minimized` are active.
- Values are floored to integers.

```ts
const bounds = win.getBounds();
```

#### `setBounds({ x, y, width, height })`

Sets any provided members of the bounds object by updating the corresponding attributes.

```ts
win.setBounds({ x: 40, y: 40, width: 800, height: 600 });
win.setBounds({ width: 500 }); // partial update
```

#### `getContentSize()`

Returns `[width, height]` in pixels of the content area (`client-area`) based on actual layout.

This is the size of the default slot host region, not the outer window.

```ts
const [cw, ch] = win.getContentSize();
```

#### `setContentSize(width, height)`

Sets the outer window size so the content area becomes the requested size.

It computes current chrome (titlebar + borders) and adjusts `win.width` / `win.height` accordingly.

```ts
win.setContentSize(640, 480);
```

#### `getContentBounds()`

Returns the actual bounds `{ x, y, width, height }` of the content area relative to the parent element.

```ts
const content = win.getContentBounds();
```

#### `setContentBounds({ x, y, width, height })`

Sets the outer window geometry so the content area ends up at the requested bounds.

- `x`/`y` are interpreted as the desired content area position relative to parent.
- `width`/`height` are interpreted as desired content area size.

```ts
win.setContentBounds({ x: 100, y: 80, width: 600, height: 400 });
```

#### `setAspectRatio(ratio, { width, height }?)`

Convenience method to enforce a resize aspect ratio and optionally configure extra size offsets.

- `ratio` is `width / height`.
- Passing `0` removes the aspect ratio constraint.
- `extraSize.width` maps to `aspectratioextrawidth` and `extraSize.height` maps to `aspectratioextraheight`.

The “extra” values let you keep the client area ratio while reserving fixed pixels: the aspect-ratio lock is applied to the *adjusted* client size, i.e. `(clientWidth - aspectratioextrawidth)` relative to `(clientHeight - aspectratioextraheight)`. Use them to carve out a constant region (toolbar/HUD/etc.) while keeping the remaining area ratio-locked.

```ts
win.setAspectRatio(16 / 9);

// make room for a 30px height toolbar or menubar
win.setAspectRatio(16 / 9, { width: 0, height: 30 });

// remove constraint
win.setAspectRatio(0);
```

### Slots

`<desktop-window>` provides three named slots in the titlebar. They let you inject custom content (icons, buttons, menus, custom title UI) into the left/center/right areas.

General usage:

```html
<desktop-window name="My Window" movable>
  <span slot="titlebar-start">App</span>
  <span slot="titlebar-end">v1.0</span>
  Window content
</desktop-window>
```

Notes:

- The titlebar is hidden in `[frameless]` and `[fullscreen]`, so these slots won’t be visible in those modes.
- The center area has a default fallback: if you don’t provide `titlebar-center`, the component renders the `name` attribute into the built-in `titlebar-text` (part) element.
- If you provide your own `titlebar-center` content, you are fully replacing that default title rendering. In that case the `name` attribute still exists, but it won’t be shown unless you render it yourself.

#### `titlebar-start`

Left side of the titlebar. Good for an app icon, window menu button etc.

```html
<desktop-window name="Editor" movable>
  <img slot="titlebar-start" src="icon.png" alt="" />
  ...
</desktop-window>
```

#### `titlebar-center`

Center area of the titlebar.

Default behavior (no slot): shows the `name` attribute in the built-in title element.

Custom behavior (slot provided): replaces the default title UI.

```html
<desktop-window name="Ignored visually" movable>
  <div slot="titlebar-center" style="padding: 0 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
    Custom title
  </div>
  ...
</desktop-window>
```

#### `titlebar-end`

Right side of the titlebar, before the control buttons (minimize/restore/maximize/close). Useful for status text, extra actions, or a toolbar.

```html
<desktop-window name="Downloads" movable minimizable>
  <div slot="titlebar-end">
    <button type="button">Refresh</button>
  </div>
  ...
</desktop-window>
```


### Parts

`<desktop-window>` exposes a set of Shadow Parts so you can style key internal elements from outside the component using `::part(...)`. This is meant for layout and visual tweaks that go beyond the provided CSS variables.

Basic pattern:

```css
desktop-window::part(window) {
  border-radius: 10px;
}

desktop-window::part(client-area) {
  padding: 12px;
  overflow: auto;
}
```

Notes:

- Parts work regardless of `shadowRoot` mode (`open` or `closed`).
- `::part()` targets the element that carries `part="..."`. You cannot directly style arbitrary descendants inside that part unless they are also exposed as parts.
- Some parts are conditionally visible:

  - Control buttons are `display: none` unless the corresponding boolean attributes are present (`minimizable`, `maximizable`, `closable`, etc.).
  - Titlebar is hidden in `[frameless]` and `[fullscreen]`.

#### Available parts

- `window`
  Main window container (the dialog box). Good for border, shadow, background, radius.

- `titlebar`
  Title bar container. Hidden when `[frameless]` or `[fullscreen]`.

- `titlebar-start`
  Wrapper for `slot[name="titlebar-start"]`.

- `titlebar-center`
  Wrapper for `slot[name="titlebar-center"]`. Contains the default title element when you don’t provide this slot.

- `titlebar-end`
  Wrapper for `slot[name="titlebar-end"]`.

- `titlebar-text`
  Default title element. Only relevant if you do not override the `titlebar-center` slot content.

- `minimize-button`
  Minimize control button. Visible only with `[minimizable]` and not `[minimized]`.

- `restore-button`
  Restore control button. Visible when minimized or maximized (depending on enabled features).

- `maximize-button`
  Maximize control button. Visible only with `[maximizable]` and not `[maximized]`.

- `close-button`
  Close control button. Visible only with `[closable]`.

- `client-area`
  Content container (hosts the default slot). Good place for padding/scroll rules.

If you want to theme the control icons/colors, prefer CSS variables first (mask images and colors are driven by custom properties). Parts are primarily for structural styling (spacing, borders, shadows, typography, etc.).


### CSS Variables

All variables are defined on `:host` and can be overridden from outside (e.g. `desktop-window { --desktop-window-titlebar-height: 32px; }`). “Focused” variables are used when the window is in `:focus-within`.

Example:

```css
desktop-window {
  --desktop-window-titlebar-height: 32px;
  --desktop-window-border-color: #555;
}
```

#### Window surface

- `--desktop-window-background-color`
  Background color of the window surface.

- `--desktop-window-focused-background-color`
  Background color while focused.

#### Window border

- `--desktop-window-border-width`
  Border width.

- `--desktop-window-border-color`
  Border color (unfocused).

- `--desktop-window-focused-border-color`
  Border color while focused.

#### Animations

- `--desktop-window-minimize-duration`
  Duration used for the minimize height animation (when motion is allowed).

- `--desktop-window-maximize-duration`
  Duration used for the maximize geometry animation (when motion is allowed).

#### Titlebar layout

- `--desktop-window-titlebar-height`
  Titlebar height.

#### Titlebar typography and colors

- `--desktop-window-titlebar-font-family`
  Font family used for the default title.

- `--desktop-window-titlebar-font-size`
  Font size used for the default title.

- `--desktop-window-titlebar-text-color`
  Default title text color (unfocused).

- `--desktop-window-titlebar-background-color`
  Titlebar background (unfocused).

- `--desktop-window-focused-titlebar-text-color`
  Default title text color while focused.

- `--desktop-window-focused-titlebar-background-color`
  Titlebar background while focused.

#### Control button icons

These are used as CSS mask images for the built-in control buttons.

- `--desktop-window-minimize-button-mask-image`
  Mask image for the minimize button icon.

- `--desktop-window-maximize-button-mask-image`
  Mask image for the maximize button icon.

- `--desktop-window-restore-button-mask-image`
  Mask image for the restore button icon.

- `--desktop-window-close-button-mask-image`
  Mask image for the close button icon.

#### Control button geometry

Applies to the built-in titlebar buttons.

- `--desktop-window-buttons-width`
  Button width.

- `--desktop-window-buttons-height`
  Button height.

- `--desktop-window-buttons-margin`
  Right margin applied to each button.

#### Control buttons: base (unfocused)

These are the default colors for all control buttons unless overridden per-button below.

- `--desktop-window-buttons-text-color`
  Button “icon” color (via `currentColor`).

- `--desktop-window-buttons-background-color`
  Button background.

- `--desktop-window-buttons-hover-text-color`
  Button icon color on hover.

- `--desktop-window-buttons-hover-background-color`
  Button background on hover.

#### Control buttons: base (focused)

Focused-state equivalents of the base button variables.

- `--desktop-window-focused-buttons-text-color`
  Button icon color while focused.

- `--desktop-window-focused-buttons-background-color`
  Button background while focused.

- `--desktop-window-focused-buttons-hover-text-color`
  Button icon color on hover while focused.

- `--desktop-window-focused-buttons-hover-background-color`
  Button background on hover while focused.

#### Minimize button colors

Overrides for the minimize button (unfocused). Falls back to the base button variables if you don’t override these.

- `--desktop-window-minimize-text-color`
  Minimize icon color.

- `--desktop-window-minimize-background-color`
  Minimize background.

- `--desktop-window-minimize-hover-text-color`
  Minimize icon color on hover.

- `--desktop-window-minimize-hover-background-color`
  Minimize background on hover.

#### Minimize button colors (focused)

Focused-state equivalents for minimize.

- `--desktop-window-focused-minimize-text-color`
  Minimize icon color while focused.

- `--desktop-window-focused-minimize-background-color`
  Minimize background while focused.

- `--desktop-window-focused-minimize-hover-text-color`
  Minimize icon color on hover while focused.

- `--desktop-window-focused-minimize-hover-background-color`
  Minimize background on hover while focused.

#### Maximize button colors

Overrides for the maximize button (unfocused).

- `--desktop-window-maximize-text-color`
  Maximize icon color.

- `--desktop-window-maximize-background-color`
  Maximize background.

- `--desktop-window-maximize-hover-text-color`
  Maximize icon color on hover.

- `--desktop-window-maximize-hover-background-color`
  Maximize background on hover.

#### Maximize button colors (focused)

Focused-state equivalents for maximize.

- `--desktop-window-focused-maximize-text-color`
  Maximize icon color while focused.

- `--desktop-window-focused-maximize-background-color`
  Maximize background while focused.

- `--desktop-window-focused-maximize-hover-text-color`
  Maximize icon color on hover while focused.

- `--desktop-window-focused-maximize-hover-background-color`
  Maximize background on hover while focused.

#### Restore button colors

Overrides for the restore button (unfocused).

- `--desktop-window-restore-text-color`
  Restore icon color.

- `--desktop-window-restore-background-color`
  Restore background.

- `--desktop-window-restore-hover-text-color`
  Restore icon color on hover.

- `--desktop-window-restore-hover-background-color`
  Restore background on hover.

#### Restore button colors (focused)

Focused-state equivalents for restore.

- `--desktop-window-focused-restore-text-color`
  Restore icon color while focused.

- `--desktop-window-focused-restore-background-color`
  Restore background while focused.

- `--desktop-window-focused-restore-hover-text-color`
  Restore icon color on hover while focused.

- `--desktop-window-focused-restore-hover-background-color`
  Restore background on hover while focused.

#### Close button colors

Overrides for the close button (unfocused). By default the close hover state typically uses a destructive accent.

- `--desktop-window-close-text-color`
  Close icon color.

- `--desktop-window-close-background-color`
  Close background.

- `--desktop-window-close-hover-text-color`
  Close icon color on hover.

- `--desktop-window-close-hover-background-color`
  Close background on hover.

#### Close button colors (focused)

Focused-state equivalents for close.

- `--desktop-window-focused-close-text-color`
  Close icon color while focused.

- `--desktop-window-focused-close-background-color`
  Close background while focused.

- `--desktop-window-focused-close-hover-text-color`
  Close icon color on hover while focused.

- `--desktop-window-focused-close-hover-background-color`
  Close background on hover while focused.



#### Default options on the custom element class

These are static defaults used when the corresponding attributes are missing (and can be overridden globally by setting the static variables).

- `DesktopWindow.defaultX: number`
  Default `x` when the `x` attribute is not present. Initial: `50`.

- `DesktopWindow.defaultY: number`
  Default `y` when the `y` attribute is not present. Initial: `50`.

- `DesktopWindow.defaultWidth: number`
  Default `width` when the `width` attribute is not present. Initial: `350`.

- `DesktopWindow.defaultHeight: number`
  Default `height` when the `height` attribute is not present. Initial: `350`.

- `DesktopWindow.defaultMinWidth: number`
  Default `minWidth` when the `minwidth` attribute is not present. Initial: `150`.

- `DesktopWindow.defaultMinHeight: number`
  Default `minHeight` when the `minheight` attribute is not present. Initial: `150`.

- `DesktopWindow.defaultMaxWidth: number | null`
  Default `maxWidth` when the `maxwidth` attribute is not present. If `null`, `maxWidth` falls back to the parent element’s width. Initial: `null`.

- `DesktopWindow.defaultMaxHeight: number | null`
  Default `maxHeight` when the `maxheight` attribute is not present. If `null`, `maxHeight` falls back to the parent element’s height. Initial: `null`.


## Missing a feature?
Create an issue describing your needs!
If it fits the scope of the project I will implement it.
