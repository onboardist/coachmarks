
# coachmarks

> A library for adding coachmark onboarding to your web/mobile/hybrid/progressive app.

# Install

    npm install --save coachmarks

# Usage

```javascript
const coachmarks = require('coachmarks');
```

or

```javascript
import coachmarks from 'coachmarks';

coachmarks.add('start-button', {
  target: '#start-button',
  content: 'Click this button to get started!'.
});

document.addEventListener('DOMContentLoaded', () => {
  coachmarks.show('start-button');
});
```

# Notes

* I think quadratic curve looks better than cubic, probably due to how I'm calculating stuff but still

# Todo

- [ ] Append CSS to page from inside module
- [ ] Turn SVG definitions into content that gets appended to page on script load
- [ ] Add close button
- [ ] Minification is breaking global variable name
- [x] Make script a node module
- [x] Allow configuring targets and text via JSON. (Multiple targets)
- [ ] Allow configuring multiple coachmarks.
- [ ] Allow configuring trigger events, or API
- [x] SVG path getting clipped when it's mostly horizontal (chalk filter causing it). (Fixed in a very hacky way (5000px...))
- [x] BUG: when text is on right side of button, arrowhead is on left side of button instead of right side. And the start of the line is from the right side of the text, not left side.
- [ ] If text is just a little bit above or below the button vertically, it will anchor to the top position when it should still be the side
- [x] Reorient arrowhead so its angle matches a straight line from start point to end point. (Done w/ quadratic curve)
- [ ] Maybe allow anchoring arrow to corners of element as well as sides
- [ ] Add basic (flexbox) positioning styles for text blocks (top, middle, bottom), (left, middle, center). Padding/margin can control the rest
- [ ] Relative-size the arrow marker based on viewport size
- [ ] Content needs to not scroll, which means scrolling elements into view.
- [ ] Handle rezizing, orientation changes, and media query changes

# Ideas
