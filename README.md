<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [coachmarks](#coachmarks)
- [Install](#install)
- [Usage](#usage)
- [Notes](#notes)
- [Todo](#todo)
- [Ideas](#ideas)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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
* style-loader+css-loader works, but size is ~5kb bigger than just using my inject-css.js

# Todo

- [ ] Bug: click to show mark not drawing right
- [ ] Dynamically position text relative to target. Should be on opposite side of screen. Maybe break screen into sections (halves / quadrants) and put
      text in opposite section.
- [x] Append CSS to page from inside module
- [x] Turn SVG definitions into content that gets appended to page on script load
- [x] Add close button
- [x] Minification is breaking global variable name
- [ ] Allow anchoring arrow to corners of element as well as sides
- [x] Make script a node module
- [x] Allow configuring targets and text via JSON. (Multiple targets)
- [ ] Allow configuring multiple coachmarks.
- [ ] Allow configuring trigger events, or API
- [x] SVG path getting clipped when it's mostly horizontal (chalk filter causing it). (Fixed in a very hacky way (5000px...))
- [x] BUG: when text is on right side of button, arrowhead is on left side of button instead of right side. And the start of the line is from the right side of the text, not left side.
- [ ] If text is just a little bit above or below the button vertically, it will anchor to the top position when it should still be the side
- [x] Reorient arrowhead so its angle matches a straight line from start point to end point. (Done w/ quadratic curve)
- [ ] Relative-size the arrow marker based on viewport size
- [ ] Content needs to not scroll, which means scrolling elements into view.
- [ ] Handle rezizing, orientation changes, and media query changes

# Ideas

* Embeddable SVG icons. Use Noun Project api to embed icons in coachmarks.
  * ^ or use font awesome. FA 5 uses SVGs
  * Or maybe flaticon.com
  * Or allow user to add SVG icons manually
