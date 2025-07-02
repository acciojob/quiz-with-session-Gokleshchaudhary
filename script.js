const quizData = [
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Chaucer", "Austen", "Orwell"],
    answer: 0
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
    answer: 1
  }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

function loadProgress() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  questionsContainer.innerHTML = ""; // clear previous questions

  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class='question'>${q.question}</div>`;

    q.options.forEach((option, j) => {
      const isChecked = progress[i] === j ? "checked" : "";
      div.innerHTML += `
        <label>
          <input type="radio" name="question${i}" value="${j}" ${isChecked}>
          ${option}
        </label><br/>
      `;
    });

    questionsContainer.appendChild(div);
  });
}

function saveProgress() {
  const progress = {};
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name='question${i}']:checked`);
    if (selected) progress[i] = parseInt(selected.value);
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  let score = 0;

  quizData.forEach((q, i) => {
    if (progress[i] === q.answer) score++;
  });

  return score;
}

function showScore(score) {
  scoreDisplay.textContent = `Your score is ${score} out of ${quizData.length}.`;
}

submitButton.addEventListener("click", () => {
  saveProgress();
  const score = calculateScore();
  localStorage.setItem("score", score);
  showScore(score);
});

questionsContainer.addEventListener("change", saveProgress);

// Load everything on startup
loadProgress();

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  showScore(savedScore);
}
