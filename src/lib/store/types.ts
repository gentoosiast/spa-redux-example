interface ReduxStore<S, A> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: VoidFunction): VoidFunction;
}

type Reducer<S, A> = (state: S, action: A) => S;

export type { ReduxStore, Reducer };
