import type { BaseElement } from './common/base-element';
import type { AppRoute } from './enums/app-routes';
import { isAppRoute } from './helpers';

export type Route = {
  name: AppRoute;
  component: () => Promise<BaseElement>;
};

export class Router {
  constructor(
    private readonly routes: Route[],
    private onHistoryChange: (route: Route) => void,
    private notFoundComponent: () => Promise<BaseElement>,
  ) {
    window.addEventListener('popstate', this.onHistoryChangeHandler);

    const pathName = window.location.pathname.slice(1) || 'start';

    this.navigateTo(pathName);
  }

  destroy() {
    window.removeEventListener('popstate', this.onHistoryChangeHandler);
  }

  navigateTo(pathName: string) {
    const { name: routeName } = this.changePage(pathName);

    if (routeName === '404') {
      history.replaceState(routeName, '', routeName);
    } else {
      history.pushState(routeName, '', routeName);
    }
  }

  private changePage(pathName: string) {
    const route =
      this.routes.find((route) => route.name === pathName) ??
      ({
        name: '404',
        component: this.notFoundComponent,
      } satisfies Route);

    this.onHistoryChange(route);

    return route;
  }

  private onHistoryChangeHandler = (event: PopStateEvent) => {
    const routeName: unknown = event.state;

    if (!isAppRoute(routeName)) {
      return;
    }

    this.changePage(routeName);
  };
}
