// SPARK Premium Long Landing Page Script

document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initCalculator();
    initCarousel();
    initFAQ();
});

// --- QUIZ LOGIC ---
// --- QUIZ LOGIC ---
const quizData = [
    { 
        q: "Czy wszystko i tak wraca do Ciebie?", 
        options: [
            { text: "Tak, nawet drobiazgi", score: 10 },
            { text: "Tylko kluczowe decyzje", score: 5 },
            { text: "Nie, zespół jest samodzielny", score: 0 }
        ]
    },
    { 
        q: "Czy terminy się rozjeżdżają?", 
        options: [
            { text: "Ciągle, gasimy pożary", score: 10 },
            { text: "Czasami, przy dużym obłożeniu", score: 5 },
            { text: "Rzadko, planujemy z zapasem", score: 0 }
        ]
    },
    { 
        q: "Czy nowi pracownicy wdrażają się długo?", 
        options: [
            { text: "Tak, miesiącami (>3 msc)", score: 10 },
            { text: "Standardowo (1-2 msc)", score: 5 },
            { text: "Mamy szybki onboarding (<2 tyg)", score: 0 }
        ]
    },
    { 
        q: "Czy masz jasne dane finansowe na bieżąco?", 
        options: [
            { text: "Nie, dowiaduję się 20-go", score: 10 },
            { text: "Mam ogólny zarys", score: 5 },
            { text: "Tak, widzę marżę live", score: 0 }
        ]
    },
    { 
        q: "Czy możesz wyjechać bez telefonu?", 
        options: [
            { text: "Nierealne, firma stanie", score: 10 },
            { text: "Mogę, ale sprawdzam maile", score: 5 },
            { text: "Tak, firma działa beze mnie", score: 0 }
        ]
    }
];

let totalChaosScore = 0;
const MAX_SCORE = 50;

function initQuiz() {
    const container = document.getElementById('quiz-view');
    if (!container) return;
    renderQuestion(0);
}

function renderQuestion(index) {
    const container = document.getElementById('quiz-view');
    
    // FINISHED STATE
    if (index >= quizData.length) {
        let percentage = (totalChaosScore / MAX_SCORE) * 100;
        let msg = "";
        let color = "";

        if (percentage >= 70) {
            msg = "Poziom Krytyczny. To błąd systemowy, który hamuje wzrost.";
            color = "#EF4444"; // Red
        } else if (percentage >= 30) {
            msg = "Poziom Ostrzegawczy. Masz luki, które generują straty.";
            color = "#F59E0B"; // Orange
        } else {
            msg = "Jest nieźle, ale warto uszczelnić procesy.";
            color = "#10B981"; // Green
        }

        container.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <p class="quiz-counter">TWÓJ WYNIK</p>
                <h3 style="margin-bottom:1rem; color:${color}; font-size:2.5rem;">${percentage}% Chaosu</h3>
                <p style="font-size:1.2rem; margin-bottom:2rem; color:#64748B; max-width:600px; margin-left:auto; margin-right:auto;">${msg}</p>
                <div style="display:flex; justify-content:center; gap:1rem;">
                     <a href="#calculator" class="btn-gold">Zobacz ile to kosztuje (Dalej)</a>
                     <button onclick="location.reload()" class="btn-outline-gold" style="border:none; padding:1rem;">Powtórz</button>
                </div>
            </div>
        `;
        return;
    }

    // QUESTION STATE
    const q = quizData[index];
    const progress = ((index) / quizData.length) * 100;

    let optionsHTML = q.options.map((opt, i) => `
        <button class="quiz-btn" onclick="handleAnswer(${opt.score}, ${index})">${opt.text}</button>
    `).join('');

    container.innerHTML = `
        <div style="animation: fadeIn 0.4s ease;">
             <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                <span class="quiz-counter">Pytanie ${index + 1} z ${quizData.length}</span>
                <span class="quiz-counter text-gold">${Math.round(progress)}%</span>
             </div>
             <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${progress}%"></div>
             </div>
             <h3 class="quiz-question-text" style="margin-bottom:2rem;">${q.q}</h3>
             <div class="quiz-options-col">
                ${optionsHTML}
             </div>
        </div>
    `;
}

window.handleAnswer = function(points, currentIndex) {
    totalChaosScore += points;
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
