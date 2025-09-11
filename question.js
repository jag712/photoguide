let questionsCache = [];
let shuffledQuestions = [];
let currentIndex = parseInt(localStorage.getItem('currentQuestionIndex') || '0', 10);
let score = parseInt(localStorage.getItem('quizScore') || '0', 10);

async function loadQuestions() {
  if (questionsCache.length) return questionsCache;
  const res = await fetch('/data/questions.json');
  questionsCache = await res.json();
  shuffledQuestions = shuffle([...questionsCache]);
  return questionsCache;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showQuestion() {
  const question = shuffledQuestions[currentIndex];
  document.getElementById('questionText').textContent = question.question;
  document.getElementById('score').textContent = `Score: ${score}`;
  const choicesContainer = document.getElementById('choicesContainer');
  const answerInput = document.getElementById('answerInput');

  if (question.choices && question.choices.length) {
    choicesContainer.innerHTML = '';
    question.choices.forEach((choice, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<label class="flex items-center space-x-2"><input type="radio" name="choice" value="${choice}" class="mr-2"/>${choice}</label>`;
      choicesContainer.appendChild(li);
    });
    choicesContainer.classList.remove('hidden');
    answerInput.classList.add('hidden');
  } else {
    choicesContainer.classList.add('hidden');
    answerInput.classList.remove('hidden');
    answerInput.value = '';
  }
  document.getElementById('feedback').textContent = '';
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('nextBtn').classList.add('hidden');
}

function checkAnswer() {
  const question = shuffledQuestions[currentIndex];
  let userAnswer;
  if (question.choices && question.choices.length) {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
      document.getElementById('feedback').textContent = 'Please select an answer.';
      return;
    }
    userAnswer = selected.value;
  } else {
    userAnswer = document.getElementById('answerInput').value.trim();
    if (!userAnswer) {
      document.getElementById('feedback').textContent = 'Please enter an answer.';
      return;
    }
  }
  if (String(userAnswer).toLowerCase() === String(question.answer).toLowerCase()) {
    document.getElementById('feedback').textContent = 'Correct!';
    score++;
  } else {
    document.getElementById('feedback').textContent = `Incorrect. Correct answer: ${question.answer}`;
  }
  currentIndex++;
  localStorage.setItem('currentQuestionIndex', currentIndex);
  localStorage.setItem('quizScore', score);
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('nextBtn').classList.remove('hidden');
}

function nextQuestion() {
  if (currentIndex >= shuffledQuestions.length) {
    document.getElementById('questionText').textContent = 'Quiz complete!';
    document.getElementById('choicesContainer').innerHTML = '';
    document.getElementById('answerInput').classList.add('hidden');
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('feedback').textContent = `Final score: ${score}/${shuffledQuestions.length}`;
    return;
  }
  showQuestion();
}

document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);

window.addEventListener('load', async () => {
  await loadQuestions();
  if (!shuffledQuestions.length) {
    shuffledQuestions = shuffle([...questionsCache]);
  }
  if (currentIndex >= shuffledQuestions.length) {
    currentIndex = 0;
    score = 0;
    localStorage.setItem('currentQuestionIndex', '0');
    localStorage.setItem('quizScore', '0');
  }
  showQuestion();
});
