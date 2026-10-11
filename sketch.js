/* yogya.dev · the sketchbook: a reading line under the top bar, things that draw in as you scroll,
   and a portrait that reacts to what you are about to click. */
(() => {
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const bar = $('.sk-top');
  if (bar && !document.body.classList.contains('home')) {
    const line = document.createElement('span');
    line.className = 'sk-progress'; line.setAttribute('aria-hidden', 'true');
    bar.appendChild(line);
    let queued = false;
    const update = () => { queued = false; const max = document.documentElement.scrollHeight - innerHeight; line.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : '0'); };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); update();
  }

  const items = $$('.it, .mini, .talk');
  if (items.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
      items.forEach(el => io.observe(el));
    } else items.forEach(el => el.classList.add('in'));
  }

  // the portrait beside "Got something to build?"
  const face = $('#face');
  if (face) {
    const F = { calm: '/assets/sketch/head-1.png', smile: '/assets/sketch/head-2.png', think: '/assets/sketch/head-3.png' };
    Object.values(F).forEach(u => { const i = new Image(); i.src = u; });
    $$('.contact .btn, .contact .mail').forEach(el => {
      const f = el.getAttribute('href') === '/resume/' ? 'think' : 'smile';
      ['pointerenter', 'focus'].forEach(ev => el.addEventListener(ev, () => { face.src = F[f]; }));
      ['pointerleave', 'blur'].forEach(ev => el.addEventListener(ev, () => { face.src = F.calm; }));
    });
  }
})();
