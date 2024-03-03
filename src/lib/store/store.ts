import type { ReduxStore, Reducer } from './types';

class Store<S, A> implements ReduxStore<S, A> {
  private state: S;
  private rootReducer: Reducer<S, A>;
  private listeners: VoidFunction[] = [];

  constructor(initialData: S, rootReducer: Reducer<S, A>) {
    this.state = structuredClone(initialData);
    this.rootReducer = rootReducer;
  }

  getState() {
    return structuredClone(this.state);
  }

  dispatch(action: A) {
    this.state = this.rootReducer(this.state, action);

    this.listeners.forEach((listener) => listener());

    return action;
  }

  subscribe(listener: VoidFunction) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const createStore = <S, A>(reducer: Reducer<S, A>, initialState: S) => {
  return new Store<S, A>(initialState, reducer);
};
