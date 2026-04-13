/* ============================================================
   HARI SHANKAR PORTFOLIO — script.js
   ============================================================ */

/* ── Loader ──────────────────────────────────────────────────── */
const loaderPhrases = [
  'initializing...', 'loading modules...', 'compiling assets...',
  'securing connection...', 'ready.'
];
let loaderIdx = 0;
const loaderText = document.getElementById('loader-text');

const loaderInterval = setInterval(() => {
  loaderIdx++;
  if (loaderIdx < loaderPhrases.length) {
    loaderText.textContent = loaderPhrases[loaderIdx];
  } else {
    clearInterval(loaderInterval);
  }
}, 300);

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
    // Start reveal animations after load
    initReveal();
    typeTerminal();
  }, 1800);
});

/* ── Particles ───────────────────────────────────────────────── */
particlesJS('particles-js', {
  particles: {
    number: { value: 55, density: { enable: true, value_area: 900 } },
    color: { value: '#00d4ff' },
    shape: { type: 'circle' },
    opacity: { value: 0.25, random: true },
    size: { value: 2, random: true },
    line_linked: {
      enable: true, distance: 140,
      color: '#00d4ff', opacity: 0.12, width: 1
    },
    move: {
      enable: true, speed: 1.4,
      direction: 'none', random: true,
      straight: false, out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: false }
    },
    modes: { grab: { distance: 160, line_linked: { opacity: 0.35 } } }
  },
  retina_detect: true
});

/* ── Navbar scroll ───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
}, { passive: true });

function highlightNav() {
  const scrollPos = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}` && scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

/* ── Mobile nav toggle ───────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ── Smooth scroll ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Scroll reveal ───────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Terminal typewriter ─────────────────────────────────────── */
function typeTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { text: '$ whoami', class: 't-prompt', delay: 0 },
    { text: 'hari_shankar_bakkamanthula', class: 't-green', delay: 400 },
    { text: '', class: '', delay: 700 },
    { text: '$ cat skills.txt', class: 't-prompt', delay: 900 },
    { text: '» full_stack_engineer  · security_first', class: '', delay: 1200 },
    { text: '» mern · flask · laravel · linux · aws', class: '', delay: 1450 },
    { text: '» vapt · owasp · malware_analysis', class: '', delay: 1700 },
    { text: '', class: '', delay: 2000 },
    { text: '$ ping harishankar3618.github.io', class: 't-prompt', delay: 2200 },
    { text: 'PING harishankar3618.github.io', class: 't-dim', delay: 2600 },
    { text: '64 bytes: icmp_seq=0 ttl=64  <span class="t-green">STATUS: ONLINE ✓</span>', class: '', delay: 2900 },
    { text: '', class: '', delay: 3200 },
    { text: '$ ./deploy --env production --secure', class: 't-prompt', delay: 3400 },
    { text: '<span class="t-green">✓ Build succeeded</span>  ·  <span class="t-blue">0 vulnerabilities</span>', class: '', delay: 3900 },
    { text: '<span class="t-green">✓ Deployed successfully</span>', class: '', delay: 4200 },
    { text: '', class: '', delay: 4500 },
    { text: '$ █', class: 't-prompt cursor-line', delay: 4700 },
  ];

  lines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.innerHTML = `<span class="${line.class}">${line.text}</span>`;
      if (line.class === 'cursor-line' || line.text === '$ █') {
        div.innerHTML = `<span class="t-prompt">$ </span><span class="terminal-cursor"></span>`;
      }
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }, line.delay);
  });
}

/* ── Contact form ────────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    // Let formsubmit.co handle the actual submission (no preventDefault)
    // Re-enable after a moment in case of error
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 4000);
  });
}

/* ── Active section glow on scroll ──────────────────────────── */
(function addSectionGlow() {
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--section-visible', '1');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(s => obs.observe(s));
})();
