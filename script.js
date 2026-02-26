/* RAWCUTZZ — script.js */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateCursor() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top = ty + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .price-card, .svc-card, .reel-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorTrail.style.width = '56px';
    cursorTrail.style.height = '56px';
    cursorTrail.style.borderColor = 'rgba(255, 255, 255, 0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorTrail.style.width = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'rgba(255,255,255,0.3)';
  });
});

// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.style.opacity = menuOpen ? '0.6' : '1';
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = duration / 60;
  const increment = target / 60;
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start);
  }, step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-n').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── TILT EFFECT ON PRICE CARDS ──
document.querySelectorAll('.price-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy * -5;
    const ry = (x - cx) / cx * 5;
    card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.35s ease';
  });
});

// ── PARALLAX HERO TEXT ──
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroInner = document.querySelector('.hero-inner');
  const heroNoise = document.querySelector('.hero-noise');
  if (heroInner && scrollY < window.innerHeight) {
    heroInner.style.transform = `translateY(${scrollY * 0.25}px)`;
    heroInner.style.opacity = 1 - (scrollY / (window.innerHeight * 0.6));
  }
  if (heroNoise) {
    heroNoise.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
});

// ── CONTACT FORM ──
const form = document.querySelector('.contact-form');
if (form) {
  const btn = form.querySelector('.btn-primary');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const pkg = form.querySelector('select').value;

    if (!name || !phone) {
      btn.textContent = 'Fill in required fields!';
      btn.style.background = '#555';
      setTimeout(() => {
        btn.textContent = 'Send Booking Request';
        btn.style.background = '';
      }, 2000);
      return;
    }

    btn.textContent = '✓ Request Sent!';
    btn.style.background = '#1a7a3a';
    setTimeout(() => {
      btn.textContent = 'Send Booking Request';
      btn.style.background = '';
    }, 3000);
  });
}

// ── PAGE LOAD ANIMATION ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});
