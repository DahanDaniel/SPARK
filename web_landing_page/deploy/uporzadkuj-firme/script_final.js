// SPARK Premium Long Landing Page Script (Refactored & Robust)
// Phase 24: Modular Architecture with Error Boundaries

const SPARK = {
    // --- Utilities ---
    Utils: {
        log(module, message) {
            console.log(`[SPARK:${module}] ${message}`);
        },
        error(module, error) {
            console.error(`[SPARK:${module}] ERROR:`, error);
        },
        formatCurrency(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    },

    // --- Module: Quiz ---
    Quiz: {
        data: [
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
        ],
        totalScore: 0,
        maxScore: 50,
        containerId: 'quiz-view',

        init() {
            const container = document.getElementById(this.containerId);
            if (!container) throw new Error("Quiz container not found");
            
            // Expose handler globally for inline onclick (legacy support) or bind dynamically
            window.handleAnswer = (points, index) => this.handleAnswer(points, index);
            
            this.renderQuestion(0);
            SPARK.Utils.log('Quiz', 'Initialized');
        },

        renderQuestion(index) {
            const container = document.getElementById(this.containerId);
            if (!container) return;

            // Finished State
            if (index >= this.data.length) {
                this.renderResult();
                return;
            }

            // Render Question
            const q = this.data[index];
            const progress = (index / this.data.length) * 100;
            
            const optionsHTML = q.options.map((opt) => `
                <button class="quiz-btn" onclick="handleAnswer(${opt.score}, ${index})">
                    <span style="display:block; font-size:1.1rem; margin-bottom:0.2rem;">${opt.text}</span>
                    <span style="font-size:0.8rem; color:#94A3B8; font-weight:400;">(+${opt.score} pkt)</span>
                </button>
            `).join('');

            container.innerHTML = `
                <div style="animation: fadeIn 0.4s ease;">
                     <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                        <span class="quiz-counter">Pytanie ${index + 1} z ${this.data.length}</span>
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
        },

        handleAnswer(points, currentIndex) {
            this.totalScore += points;
            this.renderQuestion(currentIndex + 1);
        },

        renderResult() {
            const percentage = (this.totalScore / this.maxScore) * 100;
            let msg = "", color = "";

            if (percentage >= 70) {
                msg = "Poziom Krytyczny. To błąd systemowy, który hamuje wzrost.";
                color = "#EF4444";
            } else if (percentage >= 30) {
                msg = "Poziom Ostrzegawczy. Masz luki, które generują straty.";
                color = "#F59E0B";
            } else {
                msg = "Jest nieźle, ale warto uszczelnić procesy.";
                color = "#10B981";
            }

            const container = document.getElementById(this.containerId);
            container.innerHTML = `
                <div style="animation: fadeIn 0.5s ease;">
                    <p class="quiz-counter">TWÓJ WYNIK</p>
                    <h3 style="margin-bottom:1rem; color:${color}; font-size:2.5rem;">${percentage}% Chaosu</h3>
                    <p style="font-size:1.2rem; margin-bottom:2rem; color:#64748B; max-width:600px; margin-left:auto; margin-right:auto;">${msg}</p>
                    <div style="display:flex; justify-content:center; gap:1rem;">
                         <button onclick="document.getElementById('pricing').style.display='block'; document.getElementById('pricing').scrollIntoView({behavior: 'smooth'}); this.style.display='none';" class="btn-gold">Przejdź do Rozwiązania &raquo;</button>
                    </div>
                </div>
            `;
            
            // Auto-reveal if preferred, but button gives user control to read result first
            // document.getElementById('pricing').style.display = 'block';
        }
    },

    // --- Module: Calculator ---
    Calculator: {
        inputs: ['calc-team', 'calc-hours', 'calc-rate'],
        
        init() {
            let found = false;
            this.inputs.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.addEventListener('input', () => this.update());
                    found = true;
                }
            });
            if (!found) throw new Error("Calculator inputs not found");
            
            this.update(); // Initial run
            SPARK.Utils.log('Calculator', 'Initialized');
        },

        update() {
            const team = parseInt(document.getElementById('calc-team').value) || 0;
            const hours = parseInt(document.getElementById('calc-hours').value) || 0;
            const rate = parseInt(document.getElementById('calc-rate').value) || 0;

            document.getElementById('val-team').innerText = team;
            document.getElementById('val-hours').innerText = hours;
            document.getElementById('val-rate').innerText = rate;

            const monthlyLoss = team * hours * rate * 4;
            const yearlyLoss = monthlyLoss * 12;

            const monthlyEl = document.getElementById('result-monthly');
            const yearlyEl = document.getElementById('val-yearly-display');

            if (monthlyEl) {
                monthlyEl.innerText = SPARK.Utils.formatCurrency(monthlyLoss) + " PLN";
                monthlyEl.style.transform = "scale(1.05)";
                setTimeout(() => monthlyEl.style.transform = "scale(1)", 200);
            }

            if (yearlyEl) {
                yearlyEl.innerText = SPARK.Utils.formatCurrency(yearlyLoss);
            }
        }
    },

    // --- Module: Carousel ---
    Carousel: {
        currentIndex: 1, // Start at 1 because of clones
        isTransitioning: false,
        autoPlayInterval: null,
        
        init() {
            const track = document.querySelector('.carousel-track');
            if (!track) throw new Error("Carousel track not found");

            this.track = track;
            this.slides = Array.from(track.children);
            
            if (this.slides.length === 0) return;

            // Clone Logic
            const firstClone = this.slides[0].cloneNode(true);
            const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
            track.appendChild(firstClone);
            track.insertBefore(lastClone, this.slides[0]);

            // Update local state regarding all slides (including clones)
            this.allSlides = Array.from(track.children);
            
            // Initial Position
            this.updateSlidePosition(false);

            // Event Listeners
            document.querySelector('.btn-right')?.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });

            document.querySelector('.btn-left')?.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });

            // Transition End - Infinite Loop Logic
            track.addEventListener('transitionend', (e) => {
                if (e.target !== track) return; // Ignore bubbles

                const lastIndex = this.allSlides.length - 1;
                
                if (this.currentIndex === lastIndex) {
                    this.currentIndex = 1;
                    this.updateSlidePosition(false);
                }
                if (this.currentIndex === 0) {
                    this.currentIndex = this.allSlides.length - 2;
                    this.updateSlidePosition(false);
                }
                this.isTransitioning = false;
            });

            // Resize
            window.addEventListener('resize', () => this.updateSlidePosition(false));

            // Touch / Swipe
            let touchStartX = 0;
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.resetAutoPlay();
            }, {passive: true});

            track.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX - 50) this.nextSlide();
                if (touchEndX > touchStartX + 50) this.prevSlide();
            }, {passive: true});

            // Pause on Hover
            const container = document.querySelector('.carousel-container');
            if (container) {
                container.addEventListener('mouseenter', () => clearInterval(this.autoPlayInterval));
                container.addEventListener('mouseleave', () => this.startAutoPlay());
            }

            this.startAutoPlay();
            SPARK.Utils.log('Carousel', 'Initialized');
        },

        getSlideWidth() {
            // Use 100 as percentage basis since css is usually 100% width
            return 100; 
        },

        updateSlidePosition(transition = true) {
            this.track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            
            if (!transition) {
                void this.track.offsetHeight; // Force reflow
            }
        },

        nextSlide() {
            if (this.isTransitioning || this.currentIndex >= this.allSlides.length - 1) return;
            this.isTransitioning = true;
            this.currentIndex++;
            this.updateSlidePosition(true);
        },

        prevSlide() {
            if (this.isTransitioning || this.currentIndex <= 0) return;
            this.isTransitioning = true;
            this.currentIndex--;
            this.updateSlidePosition(true);
        },

        startAutoPlay() {
            if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
        },

        resetAutoPlay() {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }
    },

    // --- Module: FAQ ---
    FAQ: {
        init() {
            const container = document.querySelector('.faq-container');
            if (!container) throw new Error("FAQ container not found");

            // Event Delegation: One listener for the whole container
            container.addEventListener('click', (e) => {
                // Find the clicked question button
                const btn = e.target.closest('.faq-question');
                if (!btn) return; // Not a question click

                const item = btn.closest('.faq-item');
                if (item) {
                    this.toggleItem(item);
                }
            });

            SPARK.Utils.log('FAQ', `Initialized with Event Delegation on container.`);
        },

        toggleItem(item) {
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-icon');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '▲' : '▼';
            }
        }
    },

    // --- Module: Mobile Menu ---
    MobileMenu: {
        init() {
            const btn = document.querySelector('.mobile-menu-btn');
            const menu = document.querySelector('.mobile-menu');
            
            if (!btn || !menu) throw new Error("Mobile menu elements not found");

            // Toggle
            btn.addEventListener('click', () => {
                const isActive = btn.classList.toggle('active');
                menu.classList.toggle('active');
                document.body.style.overflow = isActive ? 'hidden' : '';
            });

            // Close on Link Click
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    btn.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            SPARK.Utils.log('MobileMenu', 'Initialized');
        }
    },

    // --- Main Initializer ---
    initAll() {
        console.log("SPARK: Starting initialization sequence...");

        const modules = ['Quiz', 'Calculator', 'Carousel', 'FAQ', 'MobileMenu'];
        
        modules.forEach(moduleName => {
            try {
                if (this[moduleName] && typeof this[moduleName].init === 'function') {
                    this[moduleName].init();
                }
            } catch (err) {
                // Catch error so other modules continue to load
                SPARK.Utils.error(moduleName, err);
            }
        });

        console.log("SPARK: Initialization sequence complete.");
    }
};

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SPARK.initAll());
} else {
    SPARK.initAll();
}
