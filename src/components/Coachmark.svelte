<div>
</div>

<script>
export default {
  data() {
    return {
      name: '',
      target: null,
    }
  },
  oncreate() {
    const elm = document.querySelector(this.target);
    if (!elm) {
      console.error(`Couldn't find element '${this.target}' for mark ${this.name}`);
      return;
    }

    const borderRadius = window.getComputedStyle(elm).getPropertyValue('border-radius');

    const rect = elm.getBoundingClientRect();

    const top = rect.top;
    const left = rect.left;
    const width = rect.width;
    const height = rect.height;
    const right = left + width;
    const bottom = top + height;

    const coachTop = cache.default('coachTop', () => document.createElement('div'));
    coachTop.className = 'coachmark-top';
    const coachLeft = cache.default('coachLeft', () => document.createElement('div'));
    coachLeft.className = 'coachmark-left';
    const coachRight = cache.default('coachRight', () => document.createElement('div'));
    coachRight.className = 'coachmark-right';
    const coachBottom = cache.default('coachBottom', () => document.createElement('div'));
    coachBottom.className = 'coachmark-bottom';

    coachTop.style.height = top + 'px';
    coachLeft.style.top = top + 'px';
    coachRight.style.top = coachLeft.style.top;
    coachLeft.style.height = height + 'px';
    coachRight.style.height = coachLeft.style.height;
    coachLeft.style.width = left + 'px';
    coachRight.style.left = right + 'px';
    coachBottom.style.top = bottom + 'px';

    const glow = cache.default('glow', () => document.createElement('div'));

    glow.className = 'coachmark-glow';
    glow.style.top = (top) + 'px';
    glow.style.left = (left) + 'px';
    glow.style.width = (width) + 'px';
    glow.style.height = (height) + 'px';
    glow.style['border-radius'] = borderRadius;
    glow.style['box-shadow'] = '0 0 ' + 20 + 'px ' + 10 + 'px #fff'; //  TODO: this style should probably be dynamic

    const actionBtn = createActionButton(mark);

    [coachTop, coachLeft, coachRight, coachBottom, glow, actionBtn].forEach(c => {
      if (!c.parentNode) {
        document.body.appendChild(c);
      }
    });

    // TODO: Make this a setting, to close on click anywhere
    // setTimeout(() => {
    //   document.addEventListener('click', clear, { once: true });
    // });

    return elm;
  }
}
</script>

<style lang="less">
</style>
