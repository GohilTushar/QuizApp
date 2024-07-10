const quizQuestions = [
  {
    question: "Which term describes the phenomenon where individuals are less likely to help a victim when other people are present?",
    options: ["Bystander Effect", "Placebo Effect", "Hawthorne Effect", "Halo Effect"],
    answer: "Bystander Effect"
  },
  {
    question: "Who is considered the father of psychoanalysis?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "B.F. Skinner"],
    answer: "Sigmund Freud"
  },
  {
    question: "What is the term for a disorder characterized by excessive anxiety and worry about everyday events?",
    options: ["Obsessive-Compulsive Disorder", "Generalized Anxiety Disorder", "Panic Disorder", "Post-Traumatic Stress Disorder"],
    answer: "Generalized Anxiety Disorder"
  },
  {
    question: "Which psychologist is known for the Hierarchy of Needs theory?",
    options: ["Abraham Maslow", "Carl Rogers", "Jean Piaget", "Erik Erikson"],
    answer: "Abraham Maslow"
  },
  {
    question: "What is the term for the tendency to attribute one's own actions to external causes while attributing others' behaviors to internal causes?",
    options: ["Self-serving Bias", "Fundamental Attribution Error", "Confirmation Bias", "Cognitive Dissonance"],
    answer: "Fundamental Attribution Error"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById('start-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  document.getElementById('next-button').style.display = 'none';
  document.getElementById('restart-button').style.display = 'none';
  
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  
  questionContainer.innerHTML = '';
  optionsContainer.innerHTML = '';
  
  if (currentQuestionIndex >= quizQuestions.length) {
    showScore();
    return;
  }
  
  const question = quizQuestions[currentQuestionIndex].question;
  questionContainer.innerText = question;
  
  let answerSelected = false; // Flag to track if an answer has been selected

  quizQuestions[currentQuestionIndex].options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option', 'bg-blue-500', 'hover:bg-blue-600', 'h-fit', 'text-center','text-white', 'text-base', 'min-[300px]:text-xl', 'border', 'rounded', 'w-full', 'p-2');
    
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'option';
    radioInput.value = option;
    radioInput.id = `option${index}`;
    radioInput.classList.add('hidden');

    const label = document.createElement('label');
    label.htmlFor = radioInput.id;
    label.innerText = option;
    label.classList.add('w-full', 'p-2', 'cursor-pointer');

    optionElement.appendChild(radioInput);
    optionElement.appendChild(label);
    optionsContainer.appendChild(optionElement);

    optionElement.addEventListener('click', (e) => {
      if (answerSelected) return;
      answerSelected = true;

      document.getElementById('next-button').style.display = 'block';

      const selectedOption = optionElement.innerText;
      const correctAnswer = quizQuestions[currentQuestionIndex].answer;

      const correctedOption = document.querySelector(`input[value="${quizQuestions[currentQuestionIndex].answer}"]`);

      const parentSelected = optionElement;
      const parentActual = correctedOption.parentElement;

    
      if (selectedOption === correctAnswer) {
        parentSelected.classList.add('bg-green-500');
        score++;
      } else {
        parentActual.classList.add('bg-green-500');
        parentSelected.classList.add('bg-red-500');
      }
     
    });
  });
}

document.getElementById('next-button').addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion();
});

function showScore() {
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  questionContainer.innerHTML = `<p class="text-center">Your score: ${score} out of ${quizQuestions.length}!</p>`;
  optionsContainer.innerHTML = '';
  document.getElementById('next-button').style.display = 'none';
  document.getElementById('restart-button').style.display = 'block';
}

document.getElementById('restart-button').addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});


