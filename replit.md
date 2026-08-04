# Hari Shankar — Portfolio (HARI-OS v2.0)

## Overview
A completely reinvented personal portfolio for Hari Shankar. Designed as an AI Operating System experience — dark glassmorphism, JARVIS-style animations, interactive terminal, easter eggs, and premium motion design. Pure static HTML/CSS/JS — no build step, no dependencies, GitHub Pages ready.

## Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts: Outfit + JetBrains Mono
- Font Awesome 6.5 (CDN)
- Zero frameworks, zero build tools

## How to run
`npx serve . -p 5000 -s`

Or just open `index.html` directly in a browser — it works with no server (GitHub Pages compatible).

## Files
- `index.html` — full site structure
- `style.css` — all styles, animations, glassmorphism, responsive
- `script.js` — boot sequence, canvas orbs, terminal, easter eggs, typed effect
- `assets/hari_shankar_resume.pdf` — resume (download link)
- `assets/profile.jpg` — original photo (not used; replaced by animated avatar canvas)
- `CNAME` — for custom domain on GitHub Pages

## Features
- **Boot sequence** — HARI-OS loader with animated progress and humor
- **Custom cursor** — dot + trailing ring, hover states
- **Particle canvas background** — connected particles with mouse glow
- **Animated orb** — orbiting nodes + scan sweep (hero visual)
- **AI avatar canvas** — wireframe geometric figure with HUD overlays
- **Typing effect** — rotating "I haven't learned it yet." phrases
- **System status panel** — coffee/sleep/ideas bars with humor
- **Scrolling diagnostic banner** — "247 Excel files detected"
- **Hidden terminal** (press `` ` `` anywhere) — 15+ commands: `help`, `hire`, `diagnose`, `coffee`, `joke`, `matrix`, `konami`, etc.
- **Konami code easter egg** — ↑↑↓↓←→←→BA
- **Nav logo easter egg** — click 5 times to open terminal
- **Magnetic buttons** — subtle cursor attraction on hover
- **Scroll reveal** — IntersectionObserver-based staggered reveals
- **Counter animation** — stats count up when scrolled into view
- **Contact form** — formsubmit.co (no backend needed)

## GitHub Pages deployment
1. Push this repo to GitHub
2. Go to Settings → Pages → Source: Deploy from branch → main → / (root)
3. Done. No build step needed.

## User preferences
- Keep all code as pure static HTML/CSS/JS — no frameworks, no bundlers
- GitHub Pages compatible (no server required)
- Humor tone: intelligent, confident, not cringe
