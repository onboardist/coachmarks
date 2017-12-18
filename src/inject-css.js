
const css = `
.coachmark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  /*background: #000;*/
  /*opacity: 0.60;*/
  z-index: 100;
}

.coachmark-top,
.coachmark-left,
.coachmark-right,
.coachmark-bottom {
  position: fixed;
  background: #000;
  opacity: 0.66;
  margin: 0;
  padding: 0;
}

.coachmark-top {
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.coachmark-left {
  left: 0;
}

.coachmark-right {
  right: 0;
}

.coachmark-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.coachmark-glow {
  position: absolute;
  /*z-index: 101;*/
  /*box-shadow: 0 0 120px 50px #fff;*/
}

.coachmark-text {
  font-size: 15vmin;
  color: #fefefe;
  /* text-decoration: underline; */
  position: fixed;
  top: 134;
  left: 596px;
  text-shadow: 2px 2px #333;
  /*margin: 20px;*/
  z-index: 2;
}

.coachmark-svg {
  position: fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  z-index: 1;
 }
`;

export default function injectCSS() {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.body.prepend(style);
  return style;
}
