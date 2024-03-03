import * as actions from './actions';
import type { Reducer } from '../lib/store/types';

export type State = {
  counter: number;
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Action = ReturnType<InferValueTypes<typeof actions>>;

export const rootReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'decrement':
      return {
        ...state,
        counter: state.counter - 1,
      };
    case 'set':
      return {
        ...state,
        counter: action.payload,
      };
    default:
      return state;
  }
};
