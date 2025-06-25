const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0, // Index of the correct answer
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
            input.name = `question-${index}`; // Name for grouping radio buttons
            input.value = i; // Value as index of the choice
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

    // Add event listener to save progress on change
    document.querySelectorAll("input[type='radio']").forEach(input => {
        input.addEventListener('change', saveProgress);
    });
}

// Function to save progress to session storage
function saveProgress() {
    const progress = {};
    questions.forEach((_, index) => {
        const selectedValue = document.querySelector(`input[name='question-${index}']:checked`);
        if (selectedValue) {
            progress[`question-${index}`] = selectedValue.value; // Save selected value
        }
    });
    sessionStorage.setItem("progress", JSON.stringify(progress)); // Save to session storage
}

// Function to load progress from session storage
function loadProgress() {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    
    for (const question in progress) {
        const radio = document.querySelector(`input[name='${question}'][value='${progress[question]}']`);
        if (radio) {
            radio.checked = true; // Check the radio button if it was previously selected
        }
    }
}

// Function to calculate and display score
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedValue = document.querySelector(`input[name='question-${index}']:checked`);
        if (selectedValue && parseInt(selectedValue.value) === q.answer) {
            score++; // Increment score for correct answers
        }
    });

    document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem("score", score); // Store final score in local storage
}

// Event listeners
document.getElementById("submit").addEventListener('click', () => {
    calculateScore(); // Calculate score on submit
    saveProgress(); // Save progress on submit
});

// Load questions and progress on page load
window.onload = () => {
    renderQuestions(); // Render questions
    loadProgress(); // Load previous selections

    const finalScore = localStorage.getItem("score");
    if (finalScore !== null) {
        document.getElementById("score").innerText = `Your score is ${finalScore} out of ${questions.length}.`;
    }
};
describe('Quiz Application', () => {
    beforeEach(() => {
        cy.visit('index.html'); // Adjust the path as necessary
    });

    it('Checking questions and UI elements', () => {
        cy.get('div#questions > div').should('have.length', 5); // Check for 5 questions
        cy.get('div#questions > div').each(($el, index) => {
            cy.wrap($el).find('p').should('contain.text', questions[index].question);
            cy.wrap($el).find('input[type="radio"]').should('have.length', 4); // Check for 4 options
        });
    });

    it('Checking if stored in session', () => {
        cy.get('input[type="radio"]').first().check(); // Check the first radio button
        cy.window().then((win) => {
            const progress = JSON.parse(win.sessionStorage.getItem("progress"));
            expect(progress).to.have.property('question-0', '0'); // Adjust according to your stored values
        });
    });
});