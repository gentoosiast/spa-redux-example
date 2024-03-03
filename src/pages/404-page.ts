import { BaseElement } from '../common/base-element';

export default function create404Page() {
  const notFoundPage = new BaseElement('div', ['not-found-page'], {}, '<h1>404</h1>');

  return notFoundPage;
}
