export default function createNotFoundPage(): HTMLElement {
  const el = document.createElement('div');

  el.classList.add('not-found-page');
  el.innerHTML = '<h1>404 - Not Found</h1>';

  return el;
}
