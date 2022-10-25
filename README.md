# Accessible Modal

A web-component modal with default behaviors and easy slots for customization

## Overview

## Install

```bash
npm install @jamestomasino/accessible-modal
```

## Initialize

Initialize the javascript library by loading it and calling the `init` method. It takes two parameters:

* a querySelector target value that points to your main page content
* a querySelector target value that points to the buttons which will show your modals

```javascript
const { accessibleModal } = require('@jamestomasino/accessible-modal');
accessibleModal.init('.main', '.modal-button');
```

The library will use the main target to disable tab & focus navigation while the modal is open, locking the focus in on your modal. The button targets will have listeners added to enable them to show the appropriate modals.

It is recommended to add the `aria-haspopup` attribute to your body tag to indicate the presence of dialogs.

```html
<body aria-haspopup="dialog">
```

## Web Component

The `accessible-modal` web component contains two slots (`content`, `close`), as well as an optional `label` property.

```html
<accessible-modal id="my-modal" label="A sample modal">
  <div slot="content">
    Some modal content
  </div>
  <div slot="close">
    X
  </div>
</accessible-modal>
```

### Content

The content slot is the main content area for the modal. It can contain any HTML tags and can be styled directly in your CSS.

### Close

The close button symbol is a simple SVG "X" by default. You can override it by putting your own entry into the close slot.

### Label

The label attribute provides the `aria-label` information for the modal. If you omit this attribute the component will use the first text node it can find within the `content` slot for the label.


## Invoke via button

The library supports automatically binding interactions to any element you choose. The value you supplied to the `init` method indicates which elements will have listeners added.

The `data-target` attribute references the `id` of the modal you wish to enable upon click.

```html
<button class="modal-button" data-target="my-modal">
  This button shows the "my-modal" modal.
</button>
```

## Other information

* When a modal activates the focus position is updated to the first interactive element inside the modal `content` slot. If none is found focus is placed upon the `close` element.

* When a modal closes focus is restored to the previous position as long as that element still exists.

* While the modal is open the main content area will be set as `inert`. A [polyfill](https://github.com/WICG/inert) is included in this library for browsers that don't have native support yet.


## License

[AGPL-3.0 or later](LICENSE)
