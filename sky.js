/* The sky over Delhi: day or night by Delhi's real clock, unless the visitor flips it. */
(() => {
  const root = document.documentElement;
  const sky = document.querySelector('.sky');
  if (!sky) return;
  const bar = document.getElementById('topbar');
  const toggle = document.querySelector('.sky-toggle');
  const line = document.getElementById('delhi-time');

  const delhiHour = () => Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }).format(new Date()));
  const natural = () => { const hr = delhiHour(); return hr >= 6 && hr < 18 ? 'day' : 'night'; };
  let choice = null;
  try { choice = sessionStorage.getItem('yo-sky'); } catch (e) {}
  const apply = mode => {
    root.dataset.sky = mode;
    if (toggle) toggle.setAttribute('aria-label', mode === 'day' ? 'It is day. Switch to night' : 'It is night. Switch to day');
  };
  apply(choice || natural());
  if (toggle) toggle.addEventListener('click', () => {
    choice = root.dataset.sky === 'day' ? 'night' : 'day';
    apply(choice);
    try { sessionStorage.setItem('yo-sky', choice); } catch (e) {}
  });

  // a live greeting: what time it is where I am
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
  const tick = () => { if (line) line.textContent = `It's ${fmt.format(new Date()).toLowerCase()} in Delhi`; if (!choice) apply(natural()); };
  tick(); setInterval(tick, 30000);

  if (bar) new IntersectionObserver(([en]) => bar.classList.toggle('solid', !en.isIntersecting), { rootMargin: '-64px 0px 0px 0px' }).observe(sky);
})();
