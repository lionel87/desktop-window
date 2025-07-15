# desktop-window

A lightweight Web Components-based custom element that replicates the look and feel of native desktop application windows — resizable, movable, and styled like a traditional OS window. No frameworks required.

![demo](demo.png)

## NOT READY FOR PRODUCTION

This package is in active development, and not yet reached the point where I can recommend using in production environment:

- Its tested to some degree, but not well tested or battle proven.
- Documentation is still in the making (and will probably arrive in a month).
- The API may still change. It's getting more stable, but changes are still possible.

### Roadmap

- comprehensive documentation
- accessibility
- test cases / unit tests?

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

- `'closing'`
- `'closed'`
- `'minimizing'`
- `'minimized'`
- `'maximizing'`
- `'maximized'`
- `'restoring'`
- `'restored'`
- `'requesting-fullscreen'`
- `'exiting-fullscreen'`

### Events listening for

- `'close'`
- `'minimize'`
- `'maximize'`
- `'restore'`
- `'request-fullscreen'`
- `'exit-fullscreen'`
- `'move'`
- `'resize-n'`
- `'resize-e'`
- `'resize-s'`
- `'resize-w'`
- `'resize-ne'`
- `'resize-nw'`
- `'resize-se'`
- `'resize-sw'`

### Properties

- `name`
- `movable`
- `x`
- `y`
- `centered`
- `width`
- `height`
- `minWidth`
- `minHeight`
- `maxWidth`
- `maxHeight`
- `resizable`
- `minimizable`
- `minimized`
- `maximizable`
- `maximized`
- `closable`
- `fullscreen`
- `hidden`
- `autofocus`
- `frameless`
- `modal`
- `aspectRatio`
- `aspectRatioExtraWidth`
- `aspectRatioExtraHeight`

### Methods

- `flash()`
- `isFocused()`
- `focus()`
- `blur()`
- `close()`
- `destroy()`
- `getPosition()`
- `setPosition(x, y)`
- `getSize()`
- `setSize(width, height)`
- `getNormalBounds()`
- `getBounds()`
- `setBounds({ x, y, width, height })`
- `getContentSize()`
- `setContentSize(width, height)`
- `getContentBounds()`
- `setContentBounds({ x, y, width, height })`
- `setAspectRatio(ratio, { width, height })`

### Slots

- `titlebar-start`
- `titlebar-center`
- `titlebar-end`

### Parts

- `window`
- `titlebar`
- `titlebar-start`
- `titlebar-center`
- `titlebar-end`
- `titlebar-text`
- `minimize-button`
- `restore-button`
- `maximize-button`
- `close-button`
- `client-area`

### CSS Variables

- `--desktop-window-background-color`
- `--desktop-window-border-width`
- `--desktop-window-border-color`
- `--desktop-window-minimize-duration`
- `--desktop-window-maximize-duration`
- `--desktop-window-titlebar-height`
- `--desktop-window-titlebar-text-color`
- `--desktop-window-titlebar-background-color`
- `--desktop-window-titlebar-font-family`
- `--desktop-window-titlebar-font-size`
- `--desktop-window-minimize-button-mask-image`
- `--desktop-window-maximize-button-mask-image`
- `--desktop-window-restore-button-mask-image`
- `--desktop-window-close-button-mask-image`
- `--desktop-window-buttons-width`
- `--desktop-window-buttons-height`
- `--desktop-window-buttons-margin`
- `--desktop-window-buttons-text-color`
- `--desktop-window-buttons-background-color`
- `--desktop-window-buttons-hover-text-color`
- `--desktop-window-buttons-hover-background-color`
- `--desktop-window-minimize-text-color`
- `--desktop-window-minimize-background-color`
- `--desktop-window-minimize-hover-text-color`
- `--desktop-window-minimize-hover-background-color`
- `--desktop-window-maximize-text-color`
- `--desktop-window-maximize-background-color`
- `--desktop-window-maximize-hover-text-color`
- `--desktop-window-maximize-hover-background-color`
- `--desktop-window-restore-text-color`
- `--desktop-window-restore-background-color`
- `--desktop-window-restore-hover-text-color`
- `--desktop-window-restore-hover-background-color`
- `--desktop-window-close-text-color`
- `--desktop-window-close-background-color`
- `--desktop-window-close-hover-text-color`
- `--desktop-window-close-hover-background-color`
- `--desktop-window-focused-background-color`
- `--desktop-window-focused-border-color`
- `--desktop-window-focused-titlebar-text-color`
- `--desktop-window-focused-titlebar-background-color`
- `--desktop-window-focused-buttons-text-color`
- `--desktop-window-focused-buttons-background-color`
- `--desktop-window-focused-buttons-hover-text-color`
- `--desktop-window-focused-buttons-hover-background-color`
- `--desktop-window-focused-minimize-text-color`
- `--desktop-window-focused-minimize-background-color`
- `--desktop-window-focused-minimize-hover-text-color`
- `--desktop-window-focused-minimize-hover-background-color`
- `--desktop-window-focused-maximize-text-color`
- `--desktop-window-focused-maximize-background-color`
- `--desktop-window-focused-maximize-hover-text-color`
- `--desktop-window-focused-maximize-hover-background-color`
- `--desktop-window-focused-restore-text-color`
- `--desktop-window-focused-restore-background-color`
- `--desktop-window-focused-restore-hover-text-color`
- `--desktop-window-focused-restore-hover-background-color`
- `--desktop-window-focused-close-text-color`
- `--desktop-window-focused-close-background-color`
- `--desktop-window-focused-close-hover-text-color`
- `--desktop-window-focused-close-hover-background-color`

## Notes

- Always set `position: relative` or `position: absolute` on the **immediate parent container**, or the window may behave unexpectedly. Only exception is when the parent is `document.body`.

- Setting `overflow: hidden` on the container element is recommended to hide windows moved partially outside of the area and prevent an appearing scrollbar.

- The window works only when there is a valid `parentElement`, so appending eg. to a shadow root directly will not work.

- Appending to the `document.body` works, but don't forget to set the body height or have content that stretches the area!

- When the script is asynchronously loaded and the HTML has windows, I recommend you this CSS to prevent jumping content:
  ```css
  desktop-window:not(:defined) {
    display: none;
  }
  ```

## Missing a feature?
Create an issue describing your needs!
If it fits the scope of the project I will implement it.
