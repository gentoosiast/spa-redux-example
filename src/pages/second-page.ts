import { BaseElement } from '../common/base-element';

export default function createSecondPage() {
  const secondPage = new BaseElement('div', ['second-page'], {}, '<h1>Second Page</h1>');

  return secondPage;
}
