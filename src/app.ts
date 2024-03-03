import { BaseElement } from './common/base-element';
import { APP_ROUTE } from './enums/app-routes';
import { Router } from './router';
import { createStore } from './lib/store/store';
import { rootReducer, type State, type Action } from './store/reducer';

const initialState: State = {
  counter: 0,
};

const store = createStore<State, Action>(rootReducer, initialState);

function createRouter(routerOutlet: BaseElement) {
  return new Router(
    [
      {
        name: APP_ROUTE.Start,
        component: async () => {
          const { default: createPage } = await import('./pages/start-page');

          return createPage();
        },
      },
      {
        name: APP_ROUTE.SecondPage,
        component: async () => {
          const { default: createPage } = await import('./pages/second-page');

          return createPage();
        },
      },
      {
        name: APP_ROUTE.CounterPage,
        component: async () => {
          const { default: createPage } = await import('./pages/counter-page');

          return createPage(store);
        },
      },
    ],
    async (route) => {
      const component = await route.component();

      routerOutlet.replaceChildren(component);
    },
    async () => {
      const { default: createPage } = await import('./pages/404-page');

      return createPage();
    },
  );
}

export class App {
  private readonly rootContainer: BaseElement;
  private readonly router: Router;

  constructor() {
    this.rootContainer = new BaseElement('div', ['root']);

    const wrapper = new BaseElement('div', ['wrapper']);

    this.rootContainer.append(...this.createLinks(), wrapper);

    this.router = createRouter(wrapper);
  }

  init() {
    this.rootContainer.appendTo(document.body);
  }

  destroy() {
    this.rootContainer.remove();

    this.router.destroy();
  }

  private createLinks() {
    return Object.entries(APP_ROUTE).map(([name, route]) => {
      const link = document.createElement('a');
      link.href = route;
      link.textContent = name;

      link.onclick = (event) => {
        event.preventDefault();
        this.router.navigateTo(route);
      };

      return link;
    });
  }
}
