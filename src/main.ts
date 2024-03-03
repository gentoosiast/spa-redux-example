import AppRoute from './enums/app-routes';
import { Router } from './router';

class App {
  private readonly appId = 'app';
  private router: Router | null = null;

  start(): void {
    const root = document.querySelector<HTMLElement>(`#${this.appId}`);
    const wrapper = document.createElement('div');

    wrapper.classList.add('wrapper');

    this.createLinks().forEach((link) => root?.appendChild(link));

    root?.appendChild(wrapper);

    if (root) {
      this.router = createRouter(wrapper);
    }
  }

  destroy() {
    const root = document.querySelector<HTMLElement>(`#${this.appId}`);

    if (!root) {
      return;
    }

    root.innerHTML = '';

    this.router?.destroy();
  }

  createLinks() {
    const links = [
      document.createElement('a'),
      document.createElement('a'),
      document.createElement('a'),
    ];

    links[0].href = `#${AppRoute.Start}`;
    links[0].textContent = 'Start';
    links[1].href = `#${AppRoute.Quiz}`;
    links[1].textContent = 'Quiz';
    links[2].href = `#${AppRoute.Results}`;
    links[2].textContent = 'Results';

    return links;
  }

  createRouter() {}
}

export function createRouter(routerOutlet: HTMLElement) {
  return new Router(
    [
      {
        name: AppRoute.Start,
        component: async () => {
          const { default: createPage } = await import('./components/start-page');

          return createPage();
        },
      },
      {
        name: AppRoute.Quiz,
        component: async () => {
          const { default: createPage } = await import('./components/quiz-page');

          return createPage([
            {
              name: 'bird1',
              description: 'bird1',
              image:
                'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              name: 'bird2',
              description: 'bird2',
              image:
                'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              name: 'bird3',
              description: 'bird3',
              image:
                'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              name: 'bird4',
              description: 'bird4',
              image:
                'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
          ]);
        },
      },
      {
        name: AppRoute.Results,
        component: async () => {
          const { default: createPage } = await import('./components/results-page');

          return createPage([
            { name: 'Test', score: 100 },
            { name: 'Test2', score: 200 },
            { name: 'Test3', score: 300 },
            { name: 'Test4', score: 400 },
          ]);
        },
      },
    ],
    (route) => {
      if (route) {
        route.component().then((component) => {
          routerOutlet.innerHTML = '';
          routerOutlet.appendChild(component);
        });
      }
    },
    async () => {
      const { default: createPage } = await import('./components/start-page');

      return createPage();
    },
  );
}

const app: App = new App();

app.start();
