// SPARK Premium Long Landing Page Script

document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initCalculator();
    initCarousel();
    initFAQ();
});

// --- QUIZ LOGIC ---
const quizData = [
    { q: "Czy wszystko i tak wraca do Ciebie?", a: ["Tak, ciągle", "Nie, zespół działa"] },
    { q: "Czy terminy się rozjeżdżają?", a: ["Często", "Rzadko"] },
    { q: "Czy nowi pracownicy wdrażają się > 2 mies?", a: ["Tak", "Nie, szybciej"] },
    { q: "Czy masz monitoring marży w czasie rzecz?", a: ["Nie mam", "Mam"] },
    { q: "Czy możesz wyjechać bez telefonu?", a: ["Niemożliwe", "Tak"] }
];

let chaosScore = 0;

function initQuiz() {
    const container = document.getElementById('quiz-view');
    if (!container) return;
    renderQuestion(0);
}

function renderQuestion(index) {
    const container = document.getElementById('quiz-view');
    
    // FINISHED STATE
    if (index >= quizData.length) {
        let msg = chaosScore >= 3 
            ? "Wynik: Wysokie Ryzyko. To błąd systemowy, nie ludzki." 
            : "Masz solidne podstawy, ale kilka luk procesowych.";
        let color = chaosScore >= 3 ? "#EF4444" : "#F59E0B";

        container.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h3 style="margin-bottom:1rem; color:${color}; font-size:2rem;">${chaosScore} / ${quizData.length} objawów chaosu</h3>
                <p style="font-size:1.2rem; margin-bottom:2rem; color:#64748B;">${msg}</p>
                <a href="#calculator" class="btn-gold">Sprawdź ile to kosztuje (Dalej)</a>
            </div>
        `;
        return;
    }

    // QUESTION STATE
    const q = quizData[index];
    const progress = ((index + 1) / quizData.length) * 100;

    container.innerHTML = `
        <div style="animation: fadeIn 0.4s ease;">
             <div class="quiz-counter">Pytanie ${index + 1} z ${quizData.length}</div>
             <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${progress}%"></div>
             </div>
             <h3 class="quiz-question-text">${q.q}</h3>
             <div class="quiz-options-row">
                <button class="quiz-btn" onclick="handleAnswer(true, ${index})">${q.a[0]}</button>
                <button class="quiz-btn" onclick="handleAnswer(false, ${index})">${q.a[1]}</button>
             </div>
        </div>
    `;
}

window.handleAnswer = function(isYes, currentIndex) {
    if (isYes) chaosScore++;
    renderQuestion(currentIndex + 1);
}


// --- CALCULATOR LOGIC ---
function initCalculator() {
    const els = ['calc-team', 'calc-hours', 'calc-rate'].map(id => document.getElementById(id));
    if (!els[0]) return;

    els.forEach(el => el.addEventListener('input', calculateLoss));
    calculateLoss();
}

function calculateLoss() {
    const team = parseInt(document.getElementById('calc-team').value) || 0;
    const hours = parseInt(document.getElementById('calc-hours').value) || 0;
    const rate = parseInt(document.getElementById('calc-rate').value) || 0;

    // Update labels
    document.getElementById('val-team').innerText = team;
    document.getElementById('val-hours').innerText = hours;
    document.getElementById('val-rate').innerText = rate;

    // Calc
    const monthly = team * hours * rate * 4;
    
    // Formatting
    const formatted = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(monthly);
    document.getElementById('result-monthly').innerText = formatted;
}


// --- CAROUSEL LOGIC ---
let crslIdx = 0;
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    updateCarousel();

    document.querySelector('.btn-left').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.btn-right').addEventListener('click', () => moveCarousel(1));
}

function moveCarousel(dir) {
    const slides = document.querySelectorAll('.carousel-slide');
    const total = slides.length;
    crslIdx = (crslIdx + dir + total) % total; // wrap around
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    
    track.style.transform = `translateX(-${crslIdx * 100}%)`;
    
    slides.forEach((s, i) => {
        if (i === crslIdx) s.classList.add('active');
        else s.classList.remove('active');
    });
}


// --- FAQ ---
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.classList.toggle('active');
        });
    });
}
