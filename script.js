/* ================================================================
   THE YOGYA GAZETTE — script.js
   ================================================================ */

'use strict';

/* Edition date */
const dateEl = document.getElementById('edition-date');
if (dateEl) {
  const d = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = d.toLocaleDateString('en-GB', opts);
}

/* Evening Edition toggle */
const toggleBtn = document.getElementById('edition-toggle');
if (toggleBtn) {
  const saved = localStorage.getItem('gazette-edition') || 'day';
  document.documentElement.setAttribute('data-edition', saved);
  updateToggle(saved);
  toggleBtn.addEventListener('click', () => {
    const cur  = document.documentElement.getAttribute('data-edition');
    const next = cur === 'evening' ? 'day' : 'evening';
    document.documentElement.setAttribute('data-edition', next);
    localStorage.setItem('gazette-edition', next);
    updateToggle(next);
  });
}

function updateToggle(ed) {
  if (!toggleBtn) return;
  toggleBtn.textContent = ed === 'evening' ? '\u2600 Day Edition' : '\u263E Evening Edition';
}

/* Ticker: duplicate items for seamless loop */
const tickerItems = document.getElementById('ticker-items');
if (tickerItems) {
  tickerItems.innerHTML += tickerItems.innerHTML;
}

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
}

/* Smooth active nav highlighting */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.masthead-nav a');
if (sections.length && navLinks.length) {
  const sio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.masthead-nav a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sio.observe(s));
}
