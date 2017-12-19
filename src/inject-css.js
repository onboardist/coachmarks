import css from './css/main.scss';

export default function injectCSS() {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.body.prepend(style);
  return style;
}
