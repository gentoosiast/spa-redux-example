import { BaseElement } from '../common/base-element';

export default function createStartPage() {
  const startPage = new BaseElement('div', ['start-page'], {}, '<h1>Start</h1>');

  return startPage;
}
