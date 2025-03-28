# desktop-window

A Pure Web Components based `<desktop-window>` tag that creates a window that looks and feels like a regular window in a desktop environment.

## NOT READY FOR PRODUCTION

This package is in active development, and not yet reached the point where I can recommend using in production environment.

- Its tested to some degree, but not well tested or battle proven.
- Expect some API and behaviour changes.

### Roadmap

- focus / blur / focusable support
- content pos/size/bounds support
- frameless flag
- aspect ratio locking
- full typescript + build tooling
- window animations?
- ability to change icons
- comprehensive documentation
- a lot of examples incl. integration with a desktop environment
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

Copy the `desktop-window.mjs` to your site scripts, then:

```html
<script>import('./desktop-window.mjs').then(mod => mod.register());</script>
```

When the custom element is defined, use the `<desktop-window>` tag (or what you registered) in HTML code.

```html
<desktop-window name="Hello world!" movable resizable closable fullscreenable minimizable maximizable centered>
  The contents of the window are placed here.
  <button id="fullscreen">⛶ Toggle fullscreen</button>
</desktop-window>

<script>
const fullscreen = document.getElementById('fullscreen');
let fs = false;
fullscreenButton.addEventListener('click', (event) => {
    this.dispatchEvent(new Event(fs ? 'exit-fullscreen' : 'request-fullscreen', { bubbles: true }));
    fs = !fs;
});
</script>
```

## Documentation

### Attributes

- `name`
- `movable`
- `x`
- `y`
- `centered`
- `resizable`
- `width`
- `height`
- `minWidth`
- `maxWidth`
- `minHeight`
- `maxHeigh`
- `minimizable`
- `minimized`
- `maximizable`
- `maximized`
- `closable`
- `fullscreenable`
- `fullscreen`
- `hidden`

### Events

- `'close'`
- `'closing'`
- `'closed'`
- `'minimize'`
- `'minimizing'`
- `'minimized'`
- `'maximize'`
- `'maximizing'`
- `'maximized'`
- `'restore'`
- `'restoring'`
- `'resotred'`
- `'request-fullscreen'`
- `'requesting-fullscreen'`
- `'exit-fullscreen'`
- `'exiting-fullscreen'`

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
- `fullscreenable`
- `fullscreen`
- `minimizable`
- `minimized`
- `maximizable`
- `maximized`
- `closable`

### Methods

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
- `setContentBounds(bounds)`

### CSS Variables

- `--desktop-window-border-width`
- `--desktop-window-border-color`
- `--desktop-window-background-color`
- `--desktop-window-titlebar-height`
- `--desktop-window-titlebar-background-color`
- `--desktop-window-titlebar-font-family`
- `--desktop-window-titlebar-font-size`
- `--desktop-window-titlebar-text-color`
- `--desktop-window-buttons-width`
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

## Missing a feature?
Create an issue describing your needs!
If it fits the scope of the project I will implement it.
