import { BaseElement } from '../common/base-element';
import type { ReduxStore } from '../lib/store/types';
import type { State, Action } from '../store/reducer';
import { increment, decrement, set } from '../store/actions';
import styles from './counter-page.module.css';

export default function createCounterPage(store: ReduxStore<State, Action>) {
  const counterPage = new BaseElement('div', ['counter-page']);

  const heading = new BaseElement('h1', ['heading'], {}, 'Counter Page');

  const controlsContainer = new BaseElement('div', [styles.container]);
  const incrementButton = new BaseElement('button', ['button'], { type: 'button' }, '+');
  const decrementButton = new BaseElement('button', ['button'], { type: 'button' }, '-');
  const resetButton = new BaseElement('button', ['button'], { type: 'button' }, 'Reset');

  const { counter } = store.getState();

  const counterText = new BaseElement('p', ['counter-text'], {}, `${counter}`);

  incrementButton.addListener('click', () => {
    store.dispatch(increment());
  });

  decrementButton.addListener('click', () => {
    store.dispatch(decrement());
  });

  resetButton.addListener('click', () => {
    store.dispatch(set(0));
  });

  store.subscribe(() => {
    const { counter } = store.getState();
    counterText.setTextContent(`${counter}`);
  });

  controlsContainer.append(decrementButton, counterText, incrementButton, resetButton);

  counterPage.append(heading, controlsContainer);

  return counterPage;
}
