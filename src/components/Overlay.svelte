<div ref:top class="top { shown ? 'shown' : '' }"></div>
<div ref:right class="right { shown ? 'shown' : '' }"></div>
<div ref:bottom class="bottom { shown ? 'shown' : '' }"></div>
<div ref:left class="left { shown ? 'shown' : '' }"></div>
<div ref:glow class="glow { shown ? 'shown' : '' }"></div>

<style lang="less">
  .overlay {
    display: none;

    &.shown {
      display: block;
    }
  }

  .top,
  .left,
  .right,
  .bottom {
    position: fixed;
    background: #000;
    opacity: 0.66;
    margin: 0;
    padding: 0;
    z-index:10000;
  }

  .top {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .bottom {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .glow {
    position: absolute;
    z-index:10000;
  }
</style>

<script>
export default {
  data() {
    return {
      shown: false
    }
  },
  methods: {
    show(elm) {
      // TODO: refactor use to elementRect() function which is in Text.svelte
      const rect = elm.getBoundingClientRect();

      // Overlay
      const top = rect.top;
      const left = rect.left;
      const width = rect.width;
      const height = rect.height;
      const right = left + width;
      const bottom = top + height;

      this.refs.top.style.height = top + 'px';
      this.refs.left.style.top = top + 'px';
      this.refs.right.style.top = this.refs.left.style.top;
      this.refs.left.style.height = height + 'px';
      this.refs.right.style.height = this.refs.left.style.height;
      this.refs.left.style.width = left + 'px';
      this.refs.right.style.left = right + 'px';
      this.refs.bottom.style.top = bottom + 'px';

      // Glow
      const borderRadius = window.getComputedStyle(elm).getPropertyValue('border-radius');
      const glow = this.refs.glow;
      glow.style.top = (top) + 'px';
      glow.style.left = (left) + 'px';
      glow.style.width = (width) + 'px';
      glow.style.height = (height) + 'px';
      glow.style['border-radius'] = borderRadius;
      glow.style['box-shadow'] = '0 0 ' + 20 + 'px ' + 10 + 'px #fff'; //  TODO: this style should probably be dynamic

      this.set({ shown: true });
    },
    hide() {
      this.set({ shown: false });
    },
  }
}
</script>
