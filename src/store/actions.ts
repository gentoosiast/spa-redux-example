const ACTION_TYPE = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  SET: 'set',
} as const;

export const increment = () => ({
  type: ACTION_TYPE.INCREMENT,
});

export const decrement = () => ({
  type: ACTION_TYPE.DECREMENT,
});

export const set = (value: number) => ({
  type: ACTION_TYPE.SET,
  payload: value,
});
