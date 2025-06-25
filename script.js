// Quiz questions and answers
const quiz = [
  {
    q: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    q: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    q: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: 1
  },
  {
    q: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    q: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: 1
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
function loadProgress() {
  const progress = sessionStorage.getItem("progress");
  return progress ? JSON.parse(progress) : {};
}

// Save progress to sessionStorage
function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Render questions and restore progress
function renderQuiz() {
  questionsDiv.innerHTML = "";
  const progress = loadProgress();
  quiz.forEach((qObj, idx) => {
    const qDiv = document.createElement("div");
    const qTitle = document.createElement("div");
    qTitle.textContent = `${idx + 1}. ${qObj.q}`;
    qDiv.appendChild(qTitle);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    qObj.options.forEach((opt, optIdx) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${idx}`;
      radio.value = optIdx;
      // Restore checked state from sessionStorage
      if (progress[idx] !== undefined && Number(progress[idx]) === optIdx) {
        radio.checked = true;
      }
      // Save progress on change
      radio.addEventListener("change", () => {
        const newProgress = loadProgress();
        newProgress[idx] = optIdx;
        saveProgress(newProgress);
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      optionsDiv.appendChild(label);
    });
    qDiv.appendChild(optionsDiv);
    questionsDiv.appendChild(qDiv);
  });
}

// Show score if present in localStorage
function showScore() {
  const score = localStorage.getItem("score");
  if (score !== null) {
    scoreDiv.textContent = `Your score is ${score} out of ${quiz.length}.`;
  } else {
    scoreDiv.textContent = "";
  }
}

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;
  quiz.forEach((qObj, idx) => {
    if (progress[idx] !== undefined && Number(progress[idx]) === qObj.answer) {
      score++;
    }
  });
  localStorage.setItem("score", score);
  showScore();
});

// Initial render
renderQuiz();
showScore();