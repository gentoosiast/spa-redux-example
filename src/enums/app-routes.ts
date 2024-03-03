export const APP_ROUTE = {
  Start: 'start',
  SecondPage: 'second-page',
  CounterPage: 'counter-page',
} as const;

type AppRoute = (typeof APP_ROUTE)[keyof typeof APP_ROUTE] | '404';

export type { AppRoute };
