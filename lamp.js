/* yogya.dev · the sketchbook: night mode, drawings that draw themselves, where he looks, the reading line. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const track = n => { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: n, title: n, event: true }); };

  /* ---------- night mode: paper by default, navy when you ask for it ---------- */
  const toggles = document.querySelectorAll('.room-toggle');
  const set = (dark, save) => {
    if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
    toggles.forEach(b => {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to day mode' : 'Switch to night mode');
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#15172B' : '#FBF7F0';
    if (save) { try { dark ? localStorage.setItem('yo-theme', 'dark') : localStorage.removeItem('yo-theme'); } catch (e) {} track(dark ? 'theme-dark' : 'theme-light'); }
  };
  set(root.dataset.theme === 'dark', false);
  toggles.forEach(b => b.addEventListener('click', () => set(root.dataset.theme !== 'dark', true)));

  /* ---------- the drawings: every line draws itself the first time it comes into view ---------- */
  document.querySelectorAll('.ill-svg :is(path, rect, circle, ellipse), .scribble path').forEach(el => el.setAttribute('pathLength', '1'));
  const countUp = el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const text = el.textContent, m = text.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m || reduce.matches) return;
    const to = parseInt(m[2].replace(/,/g, ''), 10), from = el.dataset.from ? parseInt(el.dataset.from, 10) : 0;
    const t0 = performance.now(), dur = 1100;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = m[1] + Math.round(from + (to - from) * e) + m[3];
      if (p < 1) requestAnimationFrame(step); else el.textContent = text;
    };
    requestAnimationFrame(step);
  };
  const arrivals = document.querySelectorAll('.ill, .feature, .card, .item');
  if ('IntersectionObserver' in window && !reduce.matches) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('drawn');
      e.target.querySelectorAll('.key[data-count]').forEach(countUp);
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -15% 0px' });
    arrivals.forEach(a => io.observe(a));
  } else arrivals.forEach(a => a.classList.add('drawn'));

  /* ---------- the reading line under the top bar ---------- */
  const bar = document.querySelector('.lampbar');
  if (bar) {
    const progress = document.createElement('span');
    progress.className = 'progress'; progress.setAttribute('aria-hidden', 'true');
    bar.appendChild(progress);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : '0');
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- where he looks: at the key words, then at the button, then at you ---------- */
  const hero = document.getElementById('cover-yo');
  if (hero && hero.dataset.lookAt) {
    setTimeout(() => { hero.dataset.lookAt = '#hero-go'; }, 2600);
    setTimeout(() => { delete hero.dataset.lookAt; }, 5200);
  }
  document.querySelectorAll('.head-panel').forEach((p, i) => {
    const w = p.querySelector('.head-art .yo-wrap'), h1 = p.querySelector('h1');
    if (!w || !h1 || w.dataset.lookAt) return;
    if (!h1.id) h1.id = 'page-title-' + i;
    w.dataset.lookAt = '#' + h1.id;
  });
})();
