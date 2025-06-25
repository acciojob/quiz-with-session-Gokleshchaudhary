const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0,
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: 0,
    },
    {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: 0,
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: 1,
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: 3,
    },
];

// Function to render questions
function renderQuestions() {
    const questionsContainer = document.getElementById("questions");
    questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p>${q.question}</p>`;
        
        q.choices.forEach((choice, i) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = i;
            input.id = `q${index}o${i}`;
            
            const label = document.createElement("label");
            label.htmlFor = `q${index}o${i}`;
            label.innerText = choice;

            questionElement.appendChild(input);
            questionElement.appendChild(label);
            questionElement.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(questionElement);
    });
}

// Function to save progress to session storage
function saveProgress() {
    const progress = {};
    questions.forEach((_, index) => {
        const selectedValue = document.querySelector(`input[name='question-${index}']:checked`);
        if (selectedValue) {
            progress[`question-${index}`] = selectedValue.value;
        }
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Function to load progress from session storage
function loadProgress() {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    
    for (const question in progress) {
        const radio = document.querySelector(`input[name='${question}'][value='${progress[question]}']`);
        if (radio) {
            radio.checked = true;
        }
    }
}

// Function to calculate and display score
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedValue = document.querySelector(`input[name='question-${index}']:checked`);
        if (selectedValue && parseInt(selectedValue.value) === q.answer) {
            score++;
        }
    });

    document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem("score", score);
}

// Event listeners
document.getElementById("submit").addEventListener('click', () => {
    calculateScore();
    saveProgress();
});

window.onload = () => {
    renderQuestions();
    loadProgress();

    const finalScore = localStorage.getItem("score");
    if (finalScore !== null) {
        document.getElementById("score").innerText = `Your score is ${finalScore} out of ${questions.length}.`;
    }
};