<div ref:container class="text-container">
  <div ref:text class="text">{ text }</div>
</div>

<style lang="less">
.text-container {
  position: fixed;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 5vmin;
  z-index: 10002;
}

.text {
  font-size: 11vmin;
  font-family: 'Short Stack', cursive; // TODO: dynamic
  line-height: 11vmin; // 11vmin looks better sometimes
  color: #fefefe;
  text-shadow: 2px 2px #333;
  /* z-index: 2; */
}
</style>

<script>
export default {
  data() {
    return {
      text: '',
      target: null,
    }
  },
  oncreate() {
    this.position();
  },
  methods: {
    getElement() {
      return this.refs.container;
    },
    getTextElement() {
      return this.refs.text;
    },
    position() {
      const box = chooseRenderBox(this.options.data.target);

      this.refs.container.style.top = box.top + 'px';
      this.refs.container.style.left = box.left + 'px';
      this.refs.container.style.width = box.width + 'px';
      this.refs.container.style.height = box.height + 'px';
    }
  }
}

function chooseRenderBox(elm) {
  const [box1, box2] = splitScreen();

  // See if the element is in box1 or box2;
  let elmMiddle = middleOfNode(elm);
  elmMiddle = { x: Math.floor(elmMiddle[0]), y: Math.floor(elmMiddle[1]) };

  console.log('boxes', box1, box2);
  console.log('elmMiddle', elmMiddle);

  if (rectContains(elmMiddle, box1)) return box2;
  else return box1;
}

function splitScreen() {
  // const pixelRatio = window.devicePixelRatio || 1;
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  let box1;
  let box2;

  // Split vertically
  if (w > h) {
    const boxWidth = Math.floor(w / 2);
    box1 = {
      top: 0,
      left: 0,
      height: h,
      width: boxWidth,
    };
    box2 = {
      top: 0,
      left: boxWidth,
      height: h,
      width: w - boxWidth,
    };
  } else {
    const boxHeight = Math.floor(h / 2);
    box1 = {
      top: 0,
      left: 0,
      height: boxHeight,
      width: w,
    };
    box2 = {
      top: boxHeight,
      left: 0,
      height: h - boxHeight,
      width: w,
    };
  }

  return [box1, box2];
}

function elementRect(node, offsetParent) {
  if (offsetParent === true) offsetParent = node.offsetParent;

  const rect = node.getBoundingClientRect();
  const prect = offsetParent ?
    offsetParent.getBoundingClientRect() :
    { left: 0, top: 0 };

  return {
    left: rect.left - prect.left,
    top: rect.top - prect.top,
    width: rect.width,
    height: rect.height,
  };
}

function middleOfNode(node) {
  let rect = node;
  if (node instanceof Node) {
    rect = elementRect(node);
  }

  return [rect.left + (rect.width / 2), rect.top + (rect.height / 2)];
}

function rectContains({ x, y }, { left, top, width, height }) {
  return left <= x && x <= left + width &&
         top <= y && y <= top + height;
}
</script>
