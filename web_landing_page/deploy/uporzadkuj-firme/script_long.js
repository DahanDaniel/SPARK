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

    // Use grid layout for 3 options
    let optionsHTML = q.options.map((opt, i) => `
        <button class="quiz-btn" onclick="handleAnswer(${opt.score}, ${index})">
            <span style="display:block; font-size:1.1rem; margin-bottom:0.2rem;">${opt.text}</span>
            <span style="font-size:0.8rem; color:#94A3B8; font-weight:400;">(+${opt.score} pkt)</span>
        </button>
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
    const inputs = ['calc-team', 'calc-hours', 'calc-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateCalculator);
    });
    updateCalculator();
}

function updateCalculator() {
    const team = parseInt(document.getElementById('calc-team').value) || 0;
    const hours = parseInt(document.getElementById('calc-hours').value) || 0;
    const rate = parseInt(document.getElementById('calc-rate').value) || 0;

    document.getElementById('val-team').innerText = team;
    document.getElementById('val-hours').innerText = hours;
    document.getElementById('val-rate').innerText = rate;

    // Weekly loss = people * hours * rate
    // Monthly = weekly * 4
    const monthlyLoss = team * hours * rate * 4;
    const yearlyLoss = monthlyLoss * 12;

    const monthlyEl = document.getElementById('result-monthly');
    const yearlyEl = document.getElementById('val-yearly-display');

    if (monthlyEl) {
        monthlyEl.innerText = formatCurrency(monthlyLoss) + " PLN";
        
        // Add pulse animation on change
        monthlyEl.style.transform = "scale(1.05)";
        setTimeout(() => monthlyEl.style.transform = "scale(1)", 200);
    }

    if (yearlyEl) {
        yearlyEl.innerText = formatCurrency(yearlyLoss);
    }
}

function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* --- CAROUSEL LOGIC --- */
/* --- CAROUSEL LOGIC (Infinite Loop) --- */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    let slides = Array.from(track.children);
    const nextButton = document.querySelector('.btn-right');
    const prevButton = document.querySelector('.btn-left');

    if (!track || slides.length === 0) return;

    // Clone logic for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Add clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    // Update slides array
    const allSlides = Array.from(track.children);
    let currentIndex = 1; // Start at real first slide
    let isTransitioning = false;
    let autoPlayInterval;

    function getSlideWidth() {
        return allSlides[0].getBoundingClientRect().width;
    }

    function updateSlidePosition(transition = true) {
        const slideWidth = getSlideWidth();
        track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Initial positioning
    updateSlidePosition(false);

    function nextSlide() {
        if (isTransitioning) return;
        if (currentIndex >= allSlides.length - 1) return; // Safety
        
        isTransitioning = true;
        currentIndex++;
        updateSlidePosition(true);
    }

    function prevSlide() {
        if (isTransitioning) return;
        if (currentIndex <= 0) return; // Safety

        isTransitioning = true;
        currentIndex--;
        updateSlidePosition(true);
    }

    // Handle seamless loop on transition end
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        const lastIndex = allSlides.length - 1;
        
        // If we are at the appended first clone -> Jump to real first
        if (currentIndex === lastIndex) {
            currentIndex = 1;
            updateSlidePosition(false); // No transition = teleport
        }

        // If we are at the prepended last clone -> Jump to real last
        if (currentIndex === 0) {
            currentIndex = allSlides.length - 2;
            updateSlidePosition(false);
        }
    });

    // Resize handler to fix width calcs if window changes (though using % helps)
    window.addEventListener('resize', () => {
        updateSlidePosition(false);
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Swipe Support for Touch Devices
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // min distance to trigger swipe

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        resetAutoPlay(); // Stop autoplay on touch interaction
    }, {passive: true});

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped Left -> Next Slide
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped Right -> Prev Slide
            prevSlide();
        }
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();
}


/* --- FAQ LOGIC --- */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-icon');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '▲' : '▼';
            }
        });
    });
}
