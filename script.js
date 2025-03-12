// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.textContent = '☀️'; // Start with sun icon (light mode available)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    updateParticles();
});

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
// gsap.from('.tech-cloud span', { opacity: 0, scale: 0, stagger: 0.1, duration: 0.5, scrollTrigger: { trigger: '#skills' } });

// gsap.registerPlugin(ScrollTrigger);

gsap.from(".tech-cloud span", {
    opacity: 0,
    scale: 0.3, // Prevents elements from disappearing
    duration: 0.6, // Smooth animation duration
    stagger: 0.1, // Delays each item slightly
    ease: "back.out(1.7)", // Adds a nice bounce effect
    transformOrigin: "center center",
    scrollTrigger: {
        trigger: ".tech-cloud",
        start: "top 80%", // Animates when 80% of the element is in view
        toggleActions: "play none none reverse" // Reverses animation when scrolling back up
    }
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

// Projects Carousel
const carouselInner = document.querySelector('.carousel-inner');
const projectCards = document.querySelectorAll('.project-card');
const cardWidth = projectCards[0]?.offsetWidth + 20 || 380; // Fallback width if no cards
let currentIndex = 0;
const visibleCards = 3;

document.querySelector('.carousel-next').addEventListener('click', () => {
    if (currentIndex < projectCards.length - visibleCards) {
        currentIndex++;
        gsap.to(carouselInner, { x: -currentIndex * cardWidth, duration: 0.5, ease: 'power2.out' });
    }
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        gsap.to(carouselInner, { x: -currentIndex * cardWidth, duration: 0.5, ease: 'power2.out' });
    }
});

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