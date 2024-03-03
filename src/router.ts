import AppRoute from './enums/app-routes';

export interface Route {
  name: AppRoute;
  component: () => Promise<HTMLElement>;
}

export class Router {
  hashChangeHandler = this.onHashChangeHandler.bind(this);

  constructor(
    private readonly routes: Route[],
    private onHashChange: (route: Route) => void,
    private defaultComponent: () => Promise<HTMLElement>,
  ) {
    window.addEventListener('hashchange', this.hashChangeHandler);

    this.onHashChangeHandler();
  }

  onHashChangeHandler() {
    const path = window.location.hash.slice(1);
    const route = this.routes.find((route) => route.name === path) ?? {
      name: AppRoute.Default,
      component: this.defaultComponent,
    };

    this.onHashChange(route);
  }

  destroy() {
    window.removeEventListener('hashchange', this.hashChangeHandler);
  }
}
