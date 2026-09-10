const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

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

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const scrollArrow = document.getElementById('scrollArrow');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const statsSection = document.getElementById('statsSection');
        if (statsSection) {
            statsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(start).toLocaleString('tr-TR');
    }, 16);
}

const statsSection = document.getElementById('statsSection');
const statCards = document.querySelectorAll('.stat-card');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;

            statCards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 150);
            });

            const statEls = [
                { el: document.getElementById('stat1'), target: 3000 },
                { el: document.getElementById('stat2'), target: 365 },
                { el: document.getElementById('stat3'), target: 15 },
                { el: document.getElementById('stat4'), target: 700 },
            ];

            statEls.forEach(({ el, target }, i) => {
                setTimeout(() => {
                    if (el) animateCounter(el, target);
                }, i * 200 + 300);
            });
        }
    });
}, { threshold: 0.2 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

const exploreCards = document.querySelectorAll('.explore-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, i * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

exploreCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    cardObserver.observe(card);
});
