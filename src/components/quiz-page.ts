type QuizPageProps = {
  name: string;
  description: string;
  image: string;
}[];

export default function createQuizPage(props: QuizPageProps): HTMLElement {
  const el = document.createElement('div');

  el.classList.add('quiz-page');
  el.innerHTML = '<h1>Quiz</h1>';

  props.forEach((item) => {
    const div = document.createElement('div');

    div.innerHTML = `<p>${item.name} - ${item.description}</p>`;

    const img = document.createElement('img');

    img.src = item.image;
    div.appendChild(img);
    el.appendChild(div);
  });

  return el;
}
