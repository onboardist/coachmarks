
# coachmarks

> A library for adding coachmark onboarding to your web/mobile/hybrid/progressive app.

# Install

    npm install --save coachmarks

# Usage

    const coachmarks = require('coachmarks');

or

    import coachmarks from 'coachmarks';



# Notes

* I think quadratic curve looks better than cubic, probably due to how I'm calculating stuff but still

# Todo

- [ ] Make script a node module
- [ ]
- [x] SVG path getting clipped when it's mostly horizontal (chalk filter causing it). (Fixed in a very hacky way (5000px...))
- [x] BUG: when text is on right side of button, arrowhead is on left side of button instead of right side.
      And the start of the line is from the right side of the text, not left side.
- [ ] Turn SVG stuff into content that gets appended to page on script load
- [ ] If text is just a little bit above or below the button vertically, it will anchor to the top position when it should still be the side
- [x] Reorient arrowhead so its angle matches a straight line from start point to end point. (Done w/ quadratic curve)
- [ ] Maybe allow anchoring arrow to corners of element as well as sides
- [ ] Add basic (flexbox) positioning styles for text blocks (top, middle, bottom), (left, middle, center). Padding/margin can control the rest
- [ ] Relative-size the arrow marker based on viewport size
- [ ] Content needs to not scroll, which means scrolling elements into view.
- [ ] Handle rezizing, orientation changes, and media query changes
