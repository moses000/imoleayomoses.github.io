// Portfolio Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = '☀️';
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        updateParticles();       // Hero section particles
        updateSoftwareParticles(); // New software particles
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

    // Projects Carousel
    const carouselInner = document.querySelector(".carousel-inner");
    const projectCards = document.querySelectorAll(".project-card");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    if (carouselInner && projectCards.length > 0) {
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

        let autoMove = setInterval(moveNext, 3000);

        carouselInner.addEventListener("mouseenter", () => {
            isPaused = true;
            clearInterval(autoMove);
        });

        carouselInner.addEventListener("mouseleave", () => {
            if (!isPaused) {
                autoMove = setInterval(moveNext, 3000);
            }
        });

        prevButton.addEventListener("click", () => {
            isManualControl = true;
            movePrev();
        });

        nextButton.addEventListener("click", () => {
            isManualControl = true;
            moveNext();
        });

        updateCarousel();
    }

    // Particles.js Background
    updateParticles();
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

    // Live Demo Widget: Visitor Performance Monitor
    const canvas = document.getElementById('performance-chart');
    const ctx = canvas.getContext('2d');
    let frameTimes = [];
    const maxDataPoints = 20;
    let lastTime = performance.now();

    function measurePerformance() {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        lastTime = currentTime;

        const fps = 1000 / delta;
        const load = Math.min(100, (60 - fps) * 2);

        if (frameTimes.length >= maxDataPoints) frameTimes.shift();
        frameTimes.push(load >= 0 ? load : 0);

        updateChart();
        requestAnimationFrame(measurePerformance);
    }

    function updateChart() {
        if (!ctx) return;
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

    const coreCount = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('performance-text').textContent = `Cores: ${coreCount} | Real-time CPU impact of this site on your device.`;
    if (canvas) requestAnimationFrame(measurePerformance);

    // Check AR Support
    checkARSupport();
});

// AR Detection Function
async function checkARSupport() {
    const arSuggestion = document.getElementById('ar-suggestion');
    const switchButton = document.getElementById('switch-to-ar');
    const dismissButton = document.getElementById('dismiss-ar');

    if (!arSuggestion || !switchButton || !dismissButton) {
        console.error("AR suggestion elements not found in DOM.");
        return;
    }

    if (!navigator.xr) {
        console.log("WebXR not supported.");
        arSuggestion.innerHTML = "<p>Sorry, your device/browser doesn’t support AR.</p>";
        arSuggestion.style.display = 'block';
        setTimeout(() => arSuggestion.style.display = 'none', 3000);
        return;
    }

    try {
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        if (isARSupported) {
            arSuggestion.style.display = 'block';
            switchButton.addEventListener('click', () => {
                window.location.href = 'ar-version.html';
            });
            dismissButton.addEventListener('click', () => {
                arSuggestion.style.display = 'none';
            });
        } else {
            arSuggestion.innerHTML = "<p>AR is not supported on this device.</p>";
            arSuggestion.style.display = 'block';
            setTimeout(() => arSuggestion.style.display = 'none', 3000);
        }
    } catch (error) {
        console.error("Error checking AR support:", error);
        arSuggestion.innerHTML = "<p>Failed to check AR support.</p>";
        arSuggestion.style.display = 'block';
        setTimeout(() => arSuggestion.style.display = 'none', 3000);
    }
}

// Particles.js Functions
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