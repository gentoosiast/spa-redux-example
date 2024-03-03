import { APP_ROUTE, type AppRoute } from './enums/app-routes';

export const isAppRoute = (value: unknown): value is AppRoute => {
  return Object.values(APP_ROUTE).findIndex((route) => route === value) !== -1;
};
