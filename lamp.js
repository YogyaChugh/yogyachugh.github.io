/* yogya.dev · under the lamp: the light switch, the pull cord, and the spotlight. */
(() => {
  const root = document.documentElement;
  const track = n => { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: n, title: n, event: true }); };

  /* room lights: dark by default (just the lamp), on when you pull the cord */
  const switches = document.querySelectorAll('.room-toggle, .pull');
  const set = (lit, save) => {
    if (lit) root.dataset.room = 'lit'; else delete root.dataset.room;
    switches.forEach(b => {
      b.setAttribute('aria-pressed', String(lit));
      b.setAttribute('aria-label', lit ? 'Turn the room lights off' : 'Turn the room lights on');
    });
    if (save) { try { lit ? localStorage.setItem('yo-room', 'lit') : localStorage.removeItem('yo-room'); } catch (e) {} track(lit ? 'room-lit' : 'room-dark'); }
  };
  set(root.dataset.room === 'lit', false);
  switches.forEach(b => b.addEventListener('click', () => {
    if (b.classList.contains('pull')) { b.classList.remove('tug'); void b.offsetWidth; b.classList.add('tug'); }
    set(root.dataset.room !== 'lit', true);
  }));

  /* the spotlight: whatever sits in the middle of the screen is lit, the rest rests in the dark */
  const spots = document.querySelectorAll('[data-spot]');
  if (spots.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => en.target.classList.toggle('lit', en.isIntersecting)),
      { rootMargin: '-28% 0px -28% 0px', threshold: 0 });
    spots.forEach(s => io.observe(s));
  } else spots.forEach(s => s.classList.add('lit'));
})();
