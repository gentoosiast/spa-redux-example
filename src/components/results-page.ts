type ResultsPageProps = {
  name: string;
  score: number;
}[];

export default function createResultsPage(props: ResultsPageProps): HTMLElement {
  const el = document.createElement('div');

  el.classList.add('results-page');
  el.innerHTML = '<h1>Results</h1>';

  props.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} - ${item.score}</p>`;

    el.appendChild(div);
  });

  return el;
}
