<div ref:container class="text-container">
  <div class="text">{ text }</div>
</div>

<style lang="less">
.text-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5vmin;
}

.text {
  font-size: 15vmin;
  font-family: 'Short Stack', cursive;
  line-height: 11vmin; // 11vmin looks better sometimes
  color: #fefefe;
  text-shadow: 2px 2px #333;
  z-index: 2;
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
    const box = chooseRenderBox(this.options.data.target);

    this.refs.container.style.top = box.top + 'px';
    this.refs.container.style.left = box.left + 'px';
    this.refs.container.style.width = box.width + 'px';
    this.refs.container.style.height = box.height + 'px';
  },
  methods: {
    getElement() {
      return this.refs.container;
    }
  }
}

function chooseRenderBox(elm) {
  const [box1, box2] = splitScreen();

  // See if the element is in box1 or box2;
  let elmMiddle = middleOfNode(elm);
  elmMiddle = { x: Math.floor(elmMiddle[0]), y: Math.floor(elmMiddle[1]) };

  if (rectContains(elmMiddle, box1)) return box2;
  else return box1;
}

function splitScreen() {
  const w = document.body.offsetWidth;
  const h = document.body.offsetHeight;

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
