// The Yogya Gazette — script.js
// Evening Edition toggle + scroll reveal

(function () {
  'use strict';

  // --- Edition Toggle ---
  const html = document.documentElement;
  const btn = document.getElementById('edition-toggle');
  const KEY = 'gazette-edition';

  function applyEdition(edition) {
    html.setAttribute('data-edition', edition);
    if (btn) {
      btn.textContent = edition === 'evening' ? '\u2600 Day Edition' : '\u263D Evening Edition';
    }
  }

  const saved = localStorage.getItem(KEY) || 'day';
  applyEdition(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-edition') || 'day';
      const next = current === 'day' ? 'evening' : 'day';
      localStorage.setItem(KEY, next);
      applyEdition(next);
    });
  }

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
