export default function createStartPage(): HTMLElement {
  const el = document.createElement('div');

  el.classList.add('start-page');
  el.innerHTML = '<h1>Start</h1>';

  return el;
}
