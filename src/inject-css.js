import css from './css/main.scss';

export default function injectCSS() {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.body.insertBefore(style, document.body.firstChild);
  return style;
}

export function injectFonts() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Indie+Flower');
  document.head.appendChild(link);
  return link;
}
