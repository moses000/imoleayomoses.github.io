// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.textContent = '☀️';
// themeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark');
//     themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
//     updateParticles();
//     // updateParticles2();
// });
// Update the theme toggle to refresh both particle systems
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    updateParticles();       // Hero section particles
    updateSoftwareParticles(); // New software particles
});

// Initialize both on load
// window.addEventListener('load', () => {
//     // calculateCardWidth();
//     // createIndicators();
//     // goToSlide(0);
//     // requestAnimationFrame(() => startAutoScroll());
//     updateParticles();         // Hero section particles
//     updateSoftwareParticles(); // New software particles
// });


// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.to('#typed-name', { duration: 2, text: 'Imoleayo Moses', ease: 'none', onComplete: () => gsap.to('.subtitle', { opacity: 1, y: 0, duration: 1 }) });
const logoImg = document.getElementById('logo-img');
logoImg.addEventListener('mouseenter', () => gsap.to(logoImg, { rotationY: 180, duration: 0.5 }));
logoImg.addEventListener('mouseleave', () => gsap.to(logoImg, { rotationY: 0, duration: 0.5 }));
gsap.from('.project-card', { opacity: 0, y: 50, stagger: 0.2, duration: 1, scrollTrigger: { trigger: '#projects' } });

// Timeline Animation
gsap.from('.timeline-item', {
    opacity: 0,
    x: (index) => index % 2 === 0 ? 50 : -50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: { trigger: '#experience', start: 'top 80%' }
});

// Skill Progress Bars
document.querySelectorAll('.progress').forEach(bar => {
    const level = bar.getAttribute('data-level');
    gsap.to(bar, { width: `${level}%`, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '#skills' } });
});

// Tech Stack Cloud Animation
gsap.from('.tech-cloud span', {
    opacity: 0,
    scale: .9,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    transformOrigin: 'center center',
    scrollTrigger: { trigger: '.tech-cloud', start: 'top 60%', toggleActions: 'play none none reverse' }
});

// Performance Metrics Animation
document.querySelectorAll('.metric-value').forEach(metric => {
    const target = parseInt(metric.getAttribute('data-target'));
    gsap.to(metric, {
        duration: 2,
        innerHTML: target,
        roundProps: 'innerHTML',
        ease: 'power1.out',
        scrollTrigger: { trigger: '#skills' },
        onUpdate: () => metric.innerHTML = Math.round(metric.innerHTML) + '%'
    });
});

// Live Demo Widget: Visitor Performance Monitor
// ... (other code above remains unchanged)

// Live Demo Widget: Visitor Performance Monitor
// Performance Metrics Animation
document.querySelectorAll('.metric-value').forEach(metric => {
    const target = parseInt(metric.getAttribute('data-target'));
    gsap.to(metric, {
        duration: 2,
        innerHTML: target,
        roundProps: 'innerHTML',
        ease: 'power1.out',
        scrollTrigger: { trigger: '#skills' },
        onUpdate: () => metric.innerHTML = Math.round(metric.innerHTML) + '%'
    });
});

// Live Demo Widget: Visitor Performance Monitor
const canvas = document.getElementById('performance-chart');
const ctx = canvas.getContext('2d');
let frameTimes = [];
const maxDataPoints = 20;
let lastTime = performance.now();

function measurePerformance() {
    const currentTime = performance.now();
    const delta = currentTime - lastTime; // Time since last frame (ms)
    lastTime = currentTime;

    // Estimate "CPU load" as inverse of frame time (higher delta = more load)
    const fps = 1000 / delta; // Frames per second
    const load = Math.min(100, (60 - fps) * 2); // Rough load estimate (0-100%)

    if (frameTimes.length >= maxDataPoints) frameTimes.shift();
    frameTimes.push(load >= 0 ? load : 0); // Ensure non-negative

    updateChart();
    requestAnimationFrame(measurePerformance); // Continuous monitoring
}

function updateChart() {
    if (!ctx) return; // Guard against canvas not being available
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = document.body.classList.contains('dark') ? '#00D4FF' : '#007BFF';
    ctx.lineWidth = 2;

    frameTimes.forEach((value, index) => {
        const x = (index / (maxDataPoints - 1)) * canvas.width;
        const y = canvas.height - (value / 100) * canvas.height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

// Start monitoring
if (canvas) requestAnimationFrame(measurePerformance); // Only start if canvas exists


// const coreCount = navigator.hardwareConcurrency || 'Unknown';
// document.getElementById('performance-text').textContent = `Cores: ${coreCount} | Real-time CPU impact of this site on your device.`;

// ... (other code below remains unchanged)

const coreCount = navigator.hardwareConcurrency || 'Unknown';
document.getElementById('performance-text').textContent = `Cores: ${coreCount} | Real-time CPU impact of this site on your device.`;
if (canvas) requestAnimationFrame(measurePerformance);

// Projects Carousel
document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector(".carousel-inner");
    const projectCards = document.querySelectorAll(".project-card");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    if (!carouselInner || projectCards.length === 0) {
        console.error("❌ Carousel elements not found.");
        return;
    }

    let currentIndex = 0;
    const totalItems = projectCards.length;
    const itemWidth = projectCards[0].offsetWidth + 20; // Include margins
    let isPaused = false;
    let isManualControl = false;

    function updateCarousel() {
        const newPosition = -currentIndex * itemWidth;
        carouselInner.style.transform = `translateX(${newPosition}px)`;
    }

    function moveNext() {
        if (!isManualControl) {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
    }

    function movePrev() {
        if (!isManualControl) {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
    }

    let autoMove = setInterval(moveNext, 3000); // Auto-scroll every 3 seconds

    // Pause on hover
    carouselInner.addEventListener("mouseenter", () => {
        isPaused = true;
        clearInterval(autoMove);
    });

    carouselInner.addEventListener("mouseleave", () => {
        isPaused = false;
        autoMove = setInterval(moveNext, 3000);
    });

    // Manual control with buttons
    prevButton.addEventListener("click", () => {
        isManualControl = true;
        movePrev();
    });

    nextButton.addEventListener("click", () => {
        isManualControl = true;
        moveNext();
    });

    updateCarousel(); // Initialize position
});



// const indicatorsContainer = document.querySelector(".carousel-indicators");

// // Generate indicators dynamically based on the number of project cards
// for (let i = 0; i < totalItems; i++) {
//     const indicator = document.createElement("span");
//     if (i === 0) indicator.classList.add("active");
//     indicatorsContainer.appendChild(indicator);
// }

// const indicators = document.querySelectorAll(".carousel-indicators span");

// Particles.js Background
function updateParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: document.body.classList.contains('dark') ? '#00D4FF' : '#007BFF' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: 'none', random: true }
        },
        interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } }
    });
}
updateParticles();
// Add this new function below updateParticles()
function updateSoftwareParticles() {
    particlesJS('software-particles', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 1000 } },
            color: { value: document.body.classList.contains('dark') ? '#00FF99' : '#0066CC' },
            shape: { type: 'polygon', polygon: { nb_sides: 6 } },
            opacity: { value: 0.7, random: false },
            size: { value: 4, random: true, anim: { enable: true, speed: 1, size_min: 2 } },
            line_linked: { enable: true, distance: 150, color: document.body.classList.contains('dark') ? '#00CC66' : '#004080', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'top', random: false, straight: true, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'connect' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { connect: { distance: 200, line_linked: { opacity: 0.6 } }, push: { particles_nb: 2 } }
        },
        retina_detect: true
    });
}
// updateParticles();         // Hero section particles
    updateSoftwareParticles();

// YouTube Modal
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('youtube-iframe');
const demoButtons = document.querySelectorAll('.demo-btn');
const closeModal = document.querySelector('.close-modal');

demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = btn.getAttribute('href');
        iframe.src = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1';
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        iframe.src = '';
    }
});

// Form Submission (placeholder)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (This is a placeholder)');
});