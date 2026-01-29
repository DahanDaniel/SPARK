console.log("Spark Protocol Initiated...");

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const frameCount = 192; // Extracted from video
const currentFrame = { index: 0 };
const images = [];
const sequencePath = "images/sequence/frame_";

// Set canvas dimensions
canvas.width = 1920;
canvas.height = 1080;

// Preload Images
const preloadImages = () => {
    let loadedCount = 0;
    const loader = document.querySelector('.loader');

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(4, '0');
        img.src = `${sequencePath}${frameIndex}.webp`;
        
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                console.log("All frames loaded.");
                loader.classList.add('hidden');
                initScrollAnimation();
            }
        };
        img.onerror = () => {
            console.warn(`Frame ${frameIndex} missing. Ignoring.`);
        };
        images.push(img);
    }
};

const render = () => {
    if (images[currentFrame.index]) {
        // High-End: Draw Image 'Cover' Style
        // Logic to simulate object-fit: cover on canvas
        const hRatio = canvas.width / images[currentFrame.index].width;
        const vRatio = canvas.height / images[currentFrame.index].height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - images[currentFrame.index].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[currentFrame.index].height * ratio) / 2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            images[currentFrame.index], 
            0, 0, 
            images[currentFrame.index].width, 
            images[currentFrame.index].height,
            centerShift_x, centerShift_y, 
            images[currentFrame.index].width * ratio, 
            images[currentFrame.index].height * ratio
        );
    }
};

const initScrollAnimation = () => {
    // Helper to resize canvas on window resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 1. Pin the Canvas Container
    ScrollTrigger.create({
        trigger: "#canvas-container",
        start: "top top",
        end: "+=400%", // Scroll distance = 4x viewport height
        pin: true,
        scrub: 0.5, // 0.5s smoothing
    });

    // 2. Animate the Frame Index
    gsap.to(currentFrame, {
        index: frameCount - 1,
        snap: "index",
        scrollTrigger: {
            trigger: "#canvas-container",
            start: "top top",
            end: "+=400%",
            scrub: 0,
        },
        onUpdate: render,
    });

    // 3. Animate Text Overlays
    const texts = document.querySelectorAll(".overlay-text");
    texts.forEach((text, i) => {
        gsap.to(text, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: "#canvas-container",
                start: `top+=${i * 100}% top`, // Stagger based on scroll distance
                end: `top+=${(i * 100) + 50}% top`,
                toggleActions: "play reverse play reverse",
                scrub: true
            }
        });
        
        // Hide previous text logic if needed, or rely on distinct start/end
        if (i < texts.length - 1) {
             gsap.to(text, {
                opacity: 0,
                scrollTrigger: {
                    trigger: "#canvas-container",
                    start: `top+=${(i * 100) + 80}% top`, 
                    scrub: true
                }
            });
        }
    });

    // 4. Initial Render
    images[0].onload = render;
    render();
};

// Start
preloadImages();

// Initialize Smooth Scroll
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
