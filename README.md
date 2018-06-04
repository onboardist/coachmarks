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
```

then

```javascript
coachmarks.add('start-button', {
  target: '#start-button',
  content: 'Click this button to get started!'.
});

coachmarks.add('create-user-button', {
  target: '#create-user-button',
  content: 'Click here to create a new user'
});

// Create flows that chain of an initial coachmark and show ones after that
coachmarks.flow('start-button')
.next('create-user-button');

// Example: show a coachmark on page load
document.addEventListener('DOMContentLoaded', () => {
  coachmarks.show('start-button');
});
```

# Notes

* I think quadratic curve looks better than cubic, probably due to how I'm calculating stuff but still

# Todo

- [ ] Clean up readme
- [x] Remove extraneous packages that are no longer needed now that we're doing leader-line for arrows
- [x] Change to hand-drawn font
- [x] Set up "flow" of coachmarks, so one gets displayed after the other
  - [x] Make close button a "next" arrow if there's a flow
- [x] Make sure JS is transpiling with Rollup. Can probably remove a lot of babel dependencies.
  - Looks like it isn't, because tests fail on cypress headless with what appears to be a JS-related error (lambda function?). Lambdas aren't being
    transpiled
- [x] Make close button more readable. Probably an SVG where the text/icon is transparent and the background is a white circle?
- [x] Fix positioning of arrow line
  Principles:
    * Line should start and end at the points closest from the center of one rectangle to the nearest edge of the other rectangle, BUT favoring edge
      centers and possibly corners.
    * Lines should curve a bit, curve should be adjustable in aggressiveness, BUT curve should never go THROUGH the element
    * Curving an arrow to the EDGE of an element makes more sense than the corner of an element, visually. For an oblong element, pointing at the long
      edge makes sense

- [ ] Use y-axis side anchors if y difference is greater than x in start/end point difference, use x axis side anchors if x difference is greater
      than y in start/end point difference.
- [ ] Figure out how to curve line so arrowhead makes sense positionally
- [x] Get tests to run in CI mode
- [x] BUG: Redraw on DOM event is redrawing when coachmark is not even being shown. Need a flag to toggle in the config/cache.
- [x] BUG: click to show mark not drawing right
- [x] Dynamically position text relative to target. Should be on opposite side of screen. Maybe break screen into sections (halves / quadrants) and put
      text in opposite section.
  - Principles:
    * Favor vertical positioning, centered horizontally (NOTE: not done)
- [ ] Need to test positioning with multiple monitors and on Windows too
- [ ] Try favoring anchoring line to middle edge and then reposition to closer corner if it's closer. This may still not work the best.
- [ ] Add transition(s) for showing/hiding overlay
- [ ] Text might be a bit too big?
- [x] Append CSS to page from inside module
- [x] Turn SVG definitions into content that gets appended to page on script load
- [x] Add close button
- [x] Minification is breaking global variable name
- [x] Allow anchoring arrow to corners of element as well as sides
- [x] Make script a node module
- [x] Allow configuring targets and text via JSON. (Multiple targets)
- [ ] Allow configuring multiple coachmarks.
- [ ] Allow configuring trigger events, or API
- [x] SVG path getting clipped when it's mostly horizontal (chalk filter causing it). (Fixed in a very hacky way (5000px...))
- [x] BUG: when text is on right side of button, arrowhead is on left side of button instead of right side. And the start of the line is from the right side of the text, not left side.
- [ ] If text is just a little bit above or below the button vertically, it will anchor to the top position when it should still be the side
- [x] Reorient arrowhead so its angle matches a straight line from start point to end point. (Done w/ quadratic curve)
- [x] Relative-size the arrow marker & stroke width based on viewport size. [Partially done. need to test on mobile device]
- [ ] Need to dynamically size arrowhead and line stroke width based on length of line maybe. It looks weird when the line is short
- [ ] Content needs to not scroll, which means scrolling elements into view.
- [x] Handle resizing, orientation changes, and media query changes

# Ideas

* Enable https://greenkeeper.io on project
* Embeddable SVG icons. Use Noun Project api to embed icons in coachmarks.
  * ^ or use font awesome. FA 5 uses SVGs
  * Or maybe flaticon.com
  * Or allow user to add SVG icons manually
* The connection of a curved line between two points on elements creates an arc that's part of a circle. Perhaps the arc makes sense if the circle makes sense, i.e. if the element would be offset weird in the line of the circle it will also look wrong in the arc.
