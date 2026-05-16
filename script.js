/* =============================================
   FLOWLY — script.js
   ============================================= */

// ── Nav scroll effect ──────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(9,9,15,0.95)';
  } else {
    nav.style.background = 'rgba(9,9,15,0.75)';
  }
});

// ── Mobile menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ── Billing toggle ─────────────────────────────
let isAnnual = false;

const prices = {
  pro:  { monthly: 12, annual: 10 },
  team: { monthly: 29, annual: 23 },
};

function toggleBilling() {
  isAnnual = !isAnnual;
  const btn = document.getElementById('toggleBtn');
  const label = document.getElementById('toggleLabel');

  btn.classList.toggle('active', isAnnual);
  label.textContent = isAnnual ? 'Anual' : 'Mensual';

  animatePrice('proPrice', isAnnual ? prices.pro.annual : prices.pro.monthly);
  animatePrice('teamPrice', isAnnual ? prices.team.annual : prices.team.monthly);
}

function animatePrice(id, target) {
  const el = document.getElementById(id);
  const current = parseInt(el.textContent.replace('$', ''));
  const duration = 300;
  const start = performance.now();

  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    el.textContent = '$' + Math.round(current + (target - current) * eased);
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = '$' + target;
  }
  requestAnimationFrame(update);
}

// ── Scroll reveal ──────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.feature-card, .step, .pricing-card, .logos__grid span'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Inject "revealed" style
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── Active nav link on scroll ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));

// ── Smooth CTA button feedback ─────────────────
document.querySelectorAll('.btn--primary').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      transform:scale(0);
      animation:ripple 0.6s linear;
      background:rgba(255,255,255,0.25);
      width:100px; height:100px;
      left:${e.clientX - rect.left - 50}px;
      top:${e.clientY - rect.top - 50}px;
      pointer-events:none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

console.log('%c🌊 Flowly', 'font-size:20px;font-weight:bold;color:#7b5cfa;');
console.log('%cProyecto de muestra — hecho con HTML + CSS + JS', 'color:#8888aa;');
