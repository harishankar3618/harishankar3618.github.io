/* ============================================================
   HARI-OS v2.0 — Main Script
   Boot sequence · Orb · Terminal · Easter eggs · Animations
   ============================================================ */

'use strict';

/* ─── BOOT SEQUENCE ─────────────────────────────────────────── */
const bootLines = [
  { text: '[OK]  Mounting consciousness...', cls: 'boot-ok', delay: 0 },
  { text: '[OK]  Loading problem-solving engine...', cls: 'boot-ok', delay: 220 },
  { text: '[OK]  Importing coffee dependency... v∞.0.0', cls: 'boot-ok', delay: 440 },
  { text: '[WARN] sleep module returned NULL', cls: 'boot-warn', delay: 660 },
  { text: '[OK]  Initializing curiosity daemon...', cls: 'boot-ok', delay: 820 },
  { text: '[INFO] Detected: 247 Excel files at your company', cls: 'boot-info', delay: 1000 },
  { text: '[INFO] Detected: 42 manual approval chains', cls: 'boot-info', delay: 1150 },
  { text: '[OK]  Loading automation protocols...', cls: 'boot-ok', delay: 1300 },
  { text: '[OK]  No-stack-boundaries module: ACTIVE', cls: 'boot-ok', delay: 1480 },
  { text: '[OK]  HARI-OS v2.0 ready. Booting interface...', cls: 'boot-ok', delay: 1650 },
];

function runBoot() {
  const seq = document.getElementById('bootSequence');
  const fill = document.getElementById('bootFill');
  const status = document.getElementById('bootStatus');
  const loader = document.getElementById('boot-loader');

  const statuses = ['Initializing...', 'Loading modules...', 'Configuring environment...', 'Almost there...', 'Ready.'];
  let si = 0;

  bootLines.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = `boot-line ${line.cls}`;
      el.textContent = line.text;
      seq.appendChild(el);
      seq.scrollTop = seq.scrollHeight;

      const progress = Math.round(((i + 1) / bootLines.length) * 100);
      fill.style.width = progress + '%';

      if (i % 2 === 0 && si < statuses.length) {
        status.textContent = statuses[si++];
      }
    }, line.delay);
  });

  const totalDelay = bootLines[bootLines.length - 1].delay;
  setTimeout(() => {
    status.textContent = 'Ready.';
    setTimeout(() => {
      loader.classList.add('hidden');
      initApp();
    }, 400);
  }, totalDelay + 300);
}

/* ─── INIT APP ──────────────────────────────────────────────── */
function initApp() {
  initCursor();
  initBgCanvas();
  initNavbar();
  initReveal();
  initTyped();
  initOrbCanvas();
  initAvatarCanvas();
  initCounters();
  initTerminal();
  initKonami();
  initNavLogoEgg();
  initMagneticButtons();
  initMouseGlow();
  initDiagBanner();
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
function initCursor() {
  if (window.innerWidth <= 768) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .glass-card, .proj-card, .cert-card, .contact-card, .auto-card, .skill-domain').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

/* ─── MOUSE GLOW ────────────────────────────────────────────── */
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ─── BACKGROUND CANVAS ─────────────────────────────────────── */
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle radial glow at mouse position
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
    gradient.addColorStop(0, 'rgba(0,212,255,0.03)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
      ctx.fill();
    });

    // Draw connecting lines between nearby particles
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ─── NAVBAR ────────────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[data-nav="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─── TYPED EFFECT ──────────────────────────────────────────── */
function initTyped() {
  const el = document.getElementById('typedPhrase');
  if (!el) return;

  const phrases = [
    '"I haven\'t learned it yet."',
    '"Give me the docs."',
    '"I\'ll figure it out."',
    '"Ship it."',
    '"What\'s the problem?"',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 55);
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 28);
    }
  }
  tick();
}

/* ─── ORB CANVAS ────────────────────────────────────────────── */
function initOrbCanvas() {
  const canvas = document.getElementById('orbCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;

  let t = 0;
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    angle: (i / 18) * Math.PI * 2,
    r: 80 + Math.random() * 40,
    speed: (Math.random() - 0.5) * 0.01 + 0.008,
    phase: Math.random() * Math.PI * 2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Core glow
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 110);
    grad.addColorStop(0, 'rgba(0,212,255,0.5)');
    grad.addColorStop(0.4, 'rgba(0,212,255,0.15)');
    grad.addColorStop(0.7, 'rgba(167,139,250,0.08)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 130, 0, Math.PI * 2);
    ctx.fill();

    // Inner sphere
    const iGrad = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, 55);
    iGrad.addColorStop(0, 'rgba(120,240,255,0.9)');
    iGrad.addColorStop(0.4, 'rgba(0,212,255,0.6)');
    iGrad.addColorStop(1, 'rgba(0,100,180,0.2)');
    ctx.fillStyle = iGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting nodes and connections
    const positions = nodes.map(n => {
      const a = n.angle + t * n.speed;
      const wobble = Math.sin(t * 0.5 + n.phase) * 8;
      return {
        x: cx + Math.cos(a) * (n.r + wobble),
        y: cy + Math.sin(a) * (n.r + wobble) * 0.4, // flatten for 3D feel
      };
    });

    // Draw connections
    positions.forEach((p, i) => {
      positions.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - d / 100)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    positions.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,255,0.8)';
      ctx.fill();
    });

    // Scan ring
    const scanAngle = (t * 0.3) % (Math.PI * 2);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(scanAngle);
    const scanGrad = ctx.createLinearGradient(-120, 0, 120, 0);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.8, 'transparent');
    scanGrad.addColorStop(1, 'rgba(0,212,255,0.4)');
    ctx.fillStyle = scanGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 120, -0.3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    t++;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─── AVATAR CANVAS ─────────────────────────────────────────── */
function initAvatarCanvas() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;

  let t = 0;
  const hexagons = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    size: 12 + Math.random() * 20,
    speed: 0.002 + Math.random() * 0.004,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  function hexPath(x, y, s) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      i === 0 ? ctx.moveTo(x + s * Math.cos(a), y + s * Math.sin(a))
               : ctx.lineTo(x + s * Math.cos(a), y + s * Math.sin(a));
    }
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Background
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160);
    bg.addColorStop(0, 'rgba(0,20,40,0.95)');
    bg.addColorStop(1, 'rgba(5,5,8,0.98)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Floating hexagons
    hexagons.forEach(h => {
      h.y -= h.speed;
      if (h.y + h.size < 0) { h.y = H + h.size; h.x = Math.random() * W; }
      const alpha = h.opacity + Math.sin(t * 0.02 + h.phase) * 0.05;
      hexPath(h.x, h.y, h.size);
      ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    });

    // Central figure — abstract human silhouette made of geometric shapes
    // Head
    const headGrad = ctx.createRadialGradient(cx, cy - 60, 5, cx, cy - 60, 38);
    headGrad.addColorStop(0, 'rgba(0,212,255,0.6)');
    headGrad.addColorStop(1, 'rgba(0,100,180,0.1)');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(cx, cy - 60, 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Face scan lines
    for (let i = 0; i < 5; i++) {
      const lx = cx - 20 + i * 10;
      ctx.beginPath();
      ctx.moveTo(lx, cy - 80);
      ctx.lineTo(lx, cy - 40);
      ctx.strokeStyle = `rgba(0,212,255,${0.1 + Math.sin(t * 0.05 + i) * 0.05})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Eyes
    const eyeGlow = Math.sin(t * 0.04) * 0.3 + 0.7;
    [-12, 12].forEach(dx => {
      const eg = ctx.createRadialGradient(cx + dx, cy - 62, 0, cx + dx, cy - 62, 5);
      eg.addColorStop(0, `rgba(0,212,255,${eyeGlow})`);
      eg.addColorStop(1, 'transparent');
      ctx.fillStyle = eg;
      ctx.beginPath();
      ctx.arc(cx + dx, cy - 62, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Body — wireframe torso
    ctx.strokeStyle = 'rgba(0,212,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 22);
    ctx.lineTo(cx - 50, cy + 60);
    ctx.moveTo(cx + 30, cy - 22);
    ctx.lineTo(cx + 50, cy + 60);
    ctx.moveTo(cx - 30, cy - 22);
    ctx.lineTo(cx + 30, cy - 22);
    ctx.moveTo(cx - 45, cy + 20);
    ctx.lineTo(cx + 45, cy + 20);
    ctx.moveTo(cx - 48, cy + 40);
    ctx.lineTo(cx + 48, cy + 40);
    ctx.moveTo(cx - 50, cy + 60);
    ctx.lineTo(cx + 50, cy + 60);
    ctx.stroke();

    // Grid on body
    for (let gi = 0; gi < 3; gi++) {
      const gx = cx - 30 + gi * 30;
      ctx.beginPath();
      ctx.moveTo(gx, cy - 22);
      ctx.lineTo(gx + (gi === 2 ? 20 : 0), cy + 60);
      ctx.strokeStyle = `rgba(0,212,255,${0.1 + Math.sin(t * 0.03 + gi) * 0.05})`;
      ctx.stroke();
    }

    // Arms
    ctx.strokeStyle = 'rgba(0,212,255,0.25)';
    ctx.lineWidth = 1.2;
    // Left arm
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 10);
    ctx.quadraticCurveTo(cx - 75, cy, cx - 65, cy + 50);
    ctx.stroke();
    // Right arm
    ctx.beginPath();
    ctx.moveTo(cx + 30, cy - 10);
    ctx.quadraticCurveTo(cx + 75, cy, cx + 65, cy + 50);
    ctx.stroke();

    // Animated scan line across entire avatar
    const scanY = cy - 100 + ((t * 0.7) % 200);
    const scanGrad = ctx.createLinearGradient(cx - 100, scanY, cx + 100, scanY + 2);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.4, 'rgba(0,212,255,0.6)');
    scanGrad.addColorStop(0.6, 'rgba(0,212,255,0.6)');
    scanGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(cx - 110, scanY, 220, 1.5);

    // Corner brackets — HUD style
    const bSize = 15;
    [
      [20, 20], [W - 20 - bSize, 20],
      [20, H - 20 - bSize], [W - 20 - bSize, H - 20 - bSize],
    ].forEach(([bx, by], idx) => {
      ctx.strokeStyle = `rgba(0,212,255,${0.3 + Math.sin(t * 0.04 + idx) * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const dx = idx % 2 === 0 ? 1 : -1;
      const dy = idx < 2 ? 1 : -1;
      ctx.moveTo(bx, by + dy * bSize);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + dx * bSize, by);
      ctx.stroke();
    });

    // Status text
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = `rgba(0,212,255,${0.4 + Math.sin(t * 0.06) * 0.1})`;
    ctx.fillText('ID: HARI_SHANKAR', 22, H - 28);
    ctx.fillText(`STATUS: ACTIVE [${('0' + Math.floor(t / 10) % 60).slice(-2)}s]`, 22, H - 16);

    t++;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─── COUNTER ANIMATION ─────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.av-num[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = target / 30;
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(interval);
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─── TERMINAL ──────────────────────────────────────────────── */
function initTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const openBtn = document.getElementById('openTerminalBtn');
  const closeBtn = document.getElementById('termClose');

  function open() {
    overlay.classList.remove('hidden');
    setTimeout(() => input.focus(), 100);
  }

  function close() {
    overlay.classList.add('hidden');
  }

  document.addEventListener('keydown', e => {
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      overlay.classList.contains('hidden') ? open() : close();
    }
    if (e.key === 'Escape') close();
  });

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  const commands = {
    help: () => [
      { text: '╭─────────────────────────────────────────────────────╮', cls: 't-info' },
      { text: '│  HARI-OS v2.0 — Available Commands                   │', cls: 't-info' },
      { text: '╰─────────────────────────────────────────────────────╯', cls: 't-info' },
      { text: '  about       — Who is Hari Shankar?', cls: '' },
      { text: '  skills      — What can he actually do?', cls: '' },
      { text: '  projects    — Proof of work', cls: '' },
      { text: '  experience  — The mission log', cls: '' },
      { text: '  contact     — Initialize connection', cls: '' },
      { text: '  coffee      — Critical system status', cls: '' },
      { text: '  joke        — Intelligent humor module', cls: '' },
      { text: '  hire        — The obvious next step', cls: '' },
      { text: '  diagnose    — Scan your company', cls: '' },
      { text: '  clear       — Clear terminal', cls: '' },
      { text: '  quote       — Random philosophy', cls: '' },
    ],

    about: () => [
      { text: '> Loading profile: HARI_SHANKAR...', cls: 't-info' },
      { text: '  Name:       Hari Shankar', cls: '' },
      { text: '  Role:       Problem Solver (disguised as an engineer)', cls: '' },
      { text: '  Education:  B.Tech CSE (Cybersecurity) · Parul Uni · 2026', cls: '' },
      { text: '  Philosophy: "I haven\'t learned it yet." — not "That\'s not my stack."', cls: '' },
      { text: '  Coffee:     98% · Sleep: NULL · Ideas: ∞', cls: 't-success' },
      { text: '  Status:     Available for full-time roles', cls: 't-success' },
    ],

    skills: () => [
      { text: '> Running capability scan...', cls: 't-info' },
      { text: '  [████████████████████] Security    — VAPT, OWASP, Threat Modeling', cls: 't-success' },
      { text: '  [████████████████░░░░] Backend     — Node.js, Flask, Laravel, APIs', cls: 't-success' },
      { text: '  [████████████████░░░░] Frontend    — React, JS, CSS, Extensions', cls: 't-success' },
      { text: '  [██████████████░░░░░░] Infra       — Linux, AWS, Docker, CI/CD', cls: 't-success' },
      { text: '  [████████████░░░░░░░░] AI/Automate — LLMs, n8n, Agent Design', cls: 't-success' },
      { text: '  [██████████████████∞∞] Adaptability— Loading. Never finished.', cls: 't-info' },
    ],

    projects: () => [
      { text: '> Fetching deployment manifest...', cls: 't-info' },
      { text: '  1. Secure Chat App  — E2EE messaging, RSA keys, zero plaintext', cls: '' },
      { text: '  2. SecureScope      — VAPT automation platform, 60% faster assessments', cls: '' },
      { text: '  3. RansomWatch      — Malware scanner, zero false-negatives on known families', cls: '' },
      { text: '  4. Malware Detector — Windows antivirus, heuristic + signature scanning', cls: '' },
      { text: '  5. Phishing Ext     — Browser extension, 85% reduction in test environments', cls: '' },
      { text: '  6. EHR Platform     — Healthcare records, RBAC, audit logging', cls: '' },
      { text: '  7. POS System       — Real-time inventory, zero downtime since launch', cls: '' },
      { text: '', cls: '' },
      { text: '  → github.com/harishankar3618', cls: 't-success' },
    ],

    experience: () => [
      { text: '> Loading mission log...', cls: 't-info' },
      { text: '  ● 2023–Present: Freelance Full-Stack & Security Engineer', cls: '' },
      { text: '    └─ EHR system, POS platform, security consultations', cls: 't-muted' },
      { text: '  ● Dec 2024–Apr 2025: Cyber Security Intern @ Tinkering Hub', cls: '' },
      { text: '    └─ Malware detection engine, phishing extension, SOC exposure', cls: 't-muted' },
      { text: '  ● Dec 2024–Jan 2025: Cyber Security Intern @ SkillVertex', cls: '' },
      { text: '    └─ VAPT assessments, SQLi/XSS exploitation, CVSS reports', cls: 't-muted' },
    ],

    contact: () => [
      { text: '> Initializing secure channel...', cls: 't-info' },
      { text: '  Email:    harishankar3618@gmail.com', cls: 't-success' },
      { text: '  LinkedIn: linkedin.com/in/harishankar3618', cls: 't-success' },
      { text: '  GitHub:   github.com/harishankar3618', cls: 't-success' },
      { text: '  Phone:    +91 7330920531', cls: 't-success' },
      { text: '', cls: '' },
      { text: '  Response time: Fast. Faster than your approval chain, probably.', cls: 't-muted' },
    ],

    coffee: () => [
      { text: '> Checking critical system dependencies...', cls: 't-info' },
      { text: '', cls: '' },
      { text: '  coffee    ████████████████████ 98%  [CRITICAL — DO NOT DEPLETE]', cls: 't-success' },
      { text: '  sleep     ██░░░░░░░░░░░░░░░░░░ NULL [MODULE NOT FOUND]', cls: 't-error' },
      { text: '  ideas     ████████████████████∞∞∞  [OVERFLOW: handling gracefully]', cls: 't-info' },
      { text: '  patience  ████████████░░░░░░░░ 62%  [for bad code only]', cls: '' },
      { text: '', cls: '' },
      { text: '  Warning: depleting coffee reserves may reduce throughput.', cls: 't-error' },
      { text: '  Solution: hire Hari and ensure adequate coffee supply.', cls: 't-success' },
    ],

    joke: () => {
      const jokes = [
        [
          { text: '  Two developers walk into a bar.', cls: '' },
          { text: '  The first orders O(1) beers.', cls: '' },
          { text: '  The second orders O(n) beers.', cls: '' },
          { text: '  The bartender looks at their bill and says:', cls: '' },
          { text: '  "Who\'s paying? This is O(broke)."', cls: 't-success' },
        ],
        [
          { text: '  99 little bugs in the code.', cls: '' },
          { text: '  99 little bugs.', cls: '' },
          { text: '  Take one down, patch it around.', cls: '' },
          { text: '  127 little bugs in the code.', cls: 't-error' },
        ],
        [
          { text: '  A manager asks: "Can you make it by Friday?"', cls: '' },
          { text: '  Dev: "Which Friday?"', cls: 't-success' },
        ],
        [
          { text: '  A user reports: "It doesn\'t work."', cls: '' },
          { text: '  Dev: "Works on my machine."', cls: '' },
          { text: '  Solution: ship their machine.', cls: 't-success' },
          { text: '  (I fixed this. It works everywhere now.)', cls: 't-muted' },
        ],
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    hire: () => [
      { text: '', cls: '' },
      { text: '  ┌───────────────────────────────────────────────┐', cls: 't-success' },
      { text: '  │                                               │', cls: 't-success' },
      { text: '  │   Excellent decision.                         │', cls: 't-success' },
      { text: '  │                                               │', cls: 't-success' },
      { text: '  │   harishankar3618@gmail.com                   │', cls: 't-success' },
      { text: '  │   linkedin.com/in/harishankar3618             │', cls: 't-success' },
      { text: '  │                                               │', cls: 't-success' },
      { text: '  │   Give me one week. I\'ll show you what        │', cls: 't-success' },
      { text: '  │   "I haven\'t learned it yet" actually means.  │', cls: 't-success' },
      { text: '  │                                               │', cls: 't-success' },
      { text: '  └───────────────────────────────────────────────┘', cls: 't-success' },
      { text: '', cls: '' },
    ],

    diagnose: () => [
      { text: '> Initializing HARI-OS company diagnostics...', cls: 't-info' },
      { text: '  Scanning...', cls: 't-muted' },
      { text: '', cls: '' },
      { text: '  [FOUND]  247 Excel files with no backup plan', cls: 't-error' },
      { text: '  [FOUND]  42 manual approval chains still active', cls: 't-error' },
      { text: '  [FOUND]  3 "temporary" scripts running in production since 2019', cls: 't-error' },
      { text: '  [FOUND]  1 person who "knows how everything works" and is on vacation', cls: 't-error' },
      { text: '  [FOUND]  Undocumented deployment process', cls: 't-error' },
      { text: '', cls: '' },
      { text: '  Severity: HIGH', cls: 't-error' },
      { text: '', cls: '' },
      { text: '  Recommended action: hire Hari Shankar immediately.', cls: 't-success' },
      { text: '  Estimated time to resolution: 1–2 weeks per issue.', cls: 't-success' },
      { text: '  harishankar3618@gmail.com', cls: 't-success' },
    ],

    quote: () => {
      const quotes = [
        [
          { text: '  "Technology changes. Problem solving doesn\'t."', cls: 't-info' },
          { text: '  — Hari Shankar', cls: 't-muted' },
        ],
        [
          { text: '  "Every technology was once new. So what\'s next?"', cls: 't-info' },
          { text: '  — The person you should hire', cls: 't-muted' },
        ],
        [
          { text: '  "The biggest thing I automate isn\'t software."', cls: 't-info' },
          { text: '  "It\'s wasted human time."', cls: 't-info' },
          { text: '  — Hari Shankar', cls: 't-muted' },
        ],
        [
          { text: '  "Give me a business problem, documentation, and coffee."', cls: 't-info' },
          { text: '  "I\'ll figure it out."', cls: 't-info' },
          { text: '  — The engineer currently applying to your company', cls: 't-muted' },
        ],
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },

    clear: () => {
      output.innerHTML = '';
      return [];
    },

    whoami: () => [{ text: '  hari — problem solver, engineer, coffee consumer', cls: 't-success' }],

    sudo: () => [
      { text: '  Nice try.', cls: 't-error' },
      { text: '  But you don\'t need sudo here. Just good engineering.', cls: 't-muted' },
    ],

    ls: () => [
      { text: '  about/  experience/  projects/  skills/  contact/', cls: '' },
      { text: '  coffee.exe  ideas.∞  sleep.null', cls: 't-muted' },
    ],

    pwd: () => [{ text: '  /home/hari/portfolio', cls: '' }],

    date: () => [{ text: `  ${new Date().toLocaleString()}`, cls: '' }],

    echo: (args) => [{ text: `  ${args.join(' ')}`, cls: '' }],

    matrix: () => {
      const chars = '01ハリシャンカル';
      const lines = Array.from({ length: 8 }, () =>
        Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join(' ')
      );
      return [
        { text: '> Entering the matrix...', cls: 't-info' },
        ...lines.map(l => ({ text: '  ' + l, cls: 't-success' })),
        { text: '> Follow the white rabbit. Or just hire me.', cls: 't-muted' },
      ];
    },
  };

  function processCommand(raw) {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    printLine(`hari@system:~$ ${raw}`, 't-cmd-echo');

    if (cmd === '') return;

    const handler = commands[cmd];
    if (handler) {
      const lines = handler(args);
      if (Array.isArray(lines)) {
        lines.forEach((l, i) => {
          setTimeout(() => printLine(l.text, l.cls), i * 30);
        });
      }
    } else {
      printLine(`  bash: ${cmd}: command not found`, 't-error');
      printLine(`  Type 'help' to see available commands.`, 't-muted');
    }
  }

  function printLine(text, cls = '') {
    const line = document.createElement('div');
    line.className = `t-line${cls ? ' ' + cls : ''}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
  }

  let historyLog = [];
  let historyIdx = -1;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        historyLog.unshift(val);
        historyIdx = -1;
        processCommand(val);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < historyLog.length - 1) {
        historyIdx++;
        input.value = historyLog[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = historyLog[historyIdx];
      } else {
        historyIdx = -1;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const match = Object.keys(commands).find(c => c.startsWith(partial) && c !== partial);
      if (match) input.value = match;
    }
  });

  // Stop backtick from going into input
  input.addEventListener('keypress', e => {
    if (e.key === '`') e.preventDefault();
  });
}

/* ─── KONAMI CODE ───────────────────────────────────────────── */
function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  const overlay = document.getElementById('konamiOverlay');
  const closeBtn = document.getElementById('konamiClose');

  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        overlay.classList.remove('hidden');
      }
    } else {
      pos = 0;
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });
}

/* ─── NAV LOGO EASTER EGG ───────────────────────────────────── */
function initNavLogoEgg() {
  const logo = document.getElementById('navLogo');
  if (!logo) return;

  let clicks = 0;
  let timer;

  const messages = [
    '1 click. Nice.',
    '2 clicks. Interesting.',
    '3 clicks. Getting somewhere.',
    '4 clicks. Almost there...',
  ];

  const msgs = [];

  logo.addEventListener('click', e => {
    e.preventDefault();
    clicks++;
    clearTimeout(timer);

    if (clicks < 5) {
      const msg = document.createElement('div');
      msg.style.cssText = `
        position:fixed;
        top:80px;
        left:50%;
        transform:translateX(-50%);
        background:rgba(0,212,255,0.15);
        border:1px solid rgba(0,212,255,0.3);
        color:#00d4ff;
        font-family:'JetBrains Mono',monospace;
        font-size:0.75rem;
        padding:0.5rem 1.25rem;
        border-radius:100px;
        z-index:2000;
        pointer-events:none;
        animation:overlay-in 0.2s ease;
      `;
      msg.textContent = messages[clicks - 1];
      document.body.appendChild(msg);
      msgs.push(msg);
      setTimeout(() => msg.remove(), 1500);

      timer = setTimeout(() => { clicks = 0; }, 2000);
    } else {
      msgs.forEach(m => m.remove());
      // Open terminal on 5th click
      document.getElementById('terminal-overlay').classList.remove('hidden');
      setTimeout(() => document.getElementById('terminalInput').focus(), 100);
      clicks = 0;
    }
  });
}

/* ─── MAGNETIC BUTTONS ──────────────────────────────────────── */
function initMagneticButtons() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─── DIAGNOSTIC BANNER ─────────────────────────────────────── */
function initDiagBanner() {
  const banner = document.querySelector('.diag-inner');
  if (!banner) return;
  // Pause on hover
  banner.addEventListener('mouseenter', () => { banner.style.animationPlayState = 'paused'; });
  banner.addEventListener('mouseleave', () => { banner.style.animationPlayState = 'running'; });
}

/* ─── CONTACT FORM ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"] span');
      if (btn) btn.textContent = 'Sending...';
    });
  }
});

/* ─── START ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', runBoot);
