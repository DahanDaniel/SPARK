// Script for /uporzadkuj-firme Landing Page

// --- CHAOS AUDIT QUIZ ---
const quizData = [
    "Czy wszystko i tak wraca do Ciebie, nawet drobiazgi?",
    "Czy nowi pracownicy wdrażają się 'wiecznie'?",
    "Czy terminy się rozjeżdżają, mimo że 'wszyscy pracują'?",
    "Czy nie możesz spokojnie wyjechać bez telefonu?",
    "Czy czujesz, że firma potrzebuje Ciebie bardziej, niż Ty jej?"
];

let currentQuestion = 0;
let chaosScore = 0;

function initQuiz() {
    const quizContainer = document.getElementById('quiz-dynamic');
    if (!quizContainer) return;

    // Render first question
    renderQuestion(0);
}

function renderQuestion(index) {
    const container = document.getElementById('quiz-dynamic');
    if (index >= quizData.length) {
        showQuizResult();
        return;
    }

    const question = quizData[index];
    const progress = ((index) / quizData.length) * 100;

    container.innerHTML = `
        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <h3 style="font-size: 1.4rem; margin-bottom: 2rem;">${index + 1}. ${question}</h3>
        <button class="quiz-option scary" onclick="answerQuiz(true)">TAK, to o mnie</button>
        <button class="quiz-option" onclick="answerQuiz(false)">NIE, u nas to działa</button>
    `;
}

function answerQuiz(isYes) {
    if (isYes) chaosScore++;
    renderQuestion(currentQuestion + 1);
    currentQuestion++;
}

function showQuizResult() {
    const container = document.getElementById('quiz-dynamic');
    let message = "";
    let color = "";

    if (chaosScore >= 3) {
        message = "To nie kwestia motywacji. To błąd systemowy.";
        color = "#EF4444"; // Red
    } else {
        message = "Masz solidne podstawy, ale kilka ryzykownych luk.";
        color = "#F59E0B"; // Orange
    }

    container.innerHTML = `
        <div class="quiz-result-card" style="display:block;">
            <p style="text-transform:uppercase; color:#64748B; font-size:0.9rem;">Twój Wynik Chaosu</p>
            <div class="score-display" style="color:${color}">${chaosScore} / ${quizData.length}</div>
            <h3 style="margin-bottom:1.5rem;">${message}</h3>
            <p style="margin-bottom:2rem;">Jeśli masz 3+ odpowiedzi "TAK", chaos kosztuje Cię więcej niż myślisz.</p>
            <a href="#calculator" class="btn btn-primary btn-glow">Policz ile tracisz (Dalej)</a>
        </div>
    `;
}

// --- COST CALCULATOR ---
function initCalculator() {
    const teamSize = document.getElementById('calc-team');
    const hoursWasted = document.getElementById('calc-hours');
    const hourlyRate = document.getElementById('calc-rate');
    
    if(!teamSize) return;

    const inputs = [teamSize, hoursWasted, hourlyRate];
    inputs.forEach(input => {
        input.addEventListener('input', updateCost);
    });

    // Initialize displays
    updateCost();
}

function updateCost() {
    const team = parseInt(document.getElementById('calc-team').value);
    const hours = parseInt(document.getElementById('calc-hours').value);
    const rate = parseInt(document.getElementById('calc-rate').value);

    // Update value displays needed? Assuming labels handle it or we add spans
    document.getElementById('val-team').textContent = team + " os.";
    document.getElementById('val-hours').textContent = hours + " h/tydz.";
    document.getElementById('val-rate').textContent = rate + " PLN/h";

    // Formula: People * Hours/week * Rate * 4 weeks
    const monthlyLoss = team * hours * rate * 4;
    
    // Animate numbers simple
    document.getElementById('result-monthly').textContent = monthlyLoss.toLocaleString('pl-PL') + " PLN";
}


// --- FAQ ACCORDION ---
function initFAQ() {
    const btns = document.querySelectorAll('.faq-question');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.classList.toggle('active');
        });
    });
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initCalculator();
    initFAQ();
});
