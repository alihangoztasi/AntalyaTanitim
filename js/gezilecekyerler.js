// ===== HAMBURGER MENU =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const slides = document.querySelectorAll('.slide');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const auto = true;
const IntervalTime = 10000;
let slideInterval;

const showSlide = (index) => {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
};

const nextSlide = () => {
    const activeIndex = Array.from(slides).findIndex((slide) => slide.classList.contains('active'));
    const nextIndex = (activeIndex + 1) % slides.length;
    showSlide(nextIndex);
};

const prevSlide = () => {
    const activeIndex = Array.from(slides).findIndex((slide) => slide.classList.contains('active'));
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
};

next.addEventListener('click', () => {
    nextSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, IntervalTime);
    }
});

prev.addEventListener('click', () => {
    prevSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, IntervalTime);
    }
});

if (auto) {
    slideInterval = setInterval(nextSlide, IntervalTime);
}
