/* yogya.dev · the room. The camera visits one thing at a time as you scroll (a pencil circle draws itself
   around it and he looks at it), while the room keeps breathing: wind in the curtains, the ceiling fan,
   and a wall clock that shows the real time in Delhi. */
(() => {
  const tour = document.querySelector('.tour');
  if (!tour) return;
  const root = document.documentElement;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('still');
  const still = root.classList.contains('still');
  const stage = tour.querySelector('.tour-stage'), cam = tour.querySelector('.cam'), svg = tour.querySelector('.room');
  const stops = [...tour.querySelectorAll('.stop')];
  const me = document.getElementById('cover-yo');
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const io = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /* ---------- the real time in Delhi: the clock, and whether he's awake ---------- */
  const ist = () => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    return { h: +parts.find(p => p.type === 'hour').value, m: +parts.find(p => p.type === 'minute').value };
  };
  const tick = () => {
    const { h, m } = ist();
    const ch = svg.querySelector('#clock-h'), cm = svg.querySelector('#clock-m');
    if (ch) ch.style.rotate = ((h % 12) * 30 + m / 2) + 'deg';
    if (cm) cm.style.rotate = (m * 6) + 'deg';
    svg.classList.toggle('day', h >= 6 && h < 18);
    const t = document.getElementById('delhi-time'), a = document.getElementById('awake');
    const hh = ((h + 11) % 12) + 1, ap = h < 12 ? 'am' : 'pm', mm = String(m).padStart(2, '0');
    if (t) t.textContent = `It's ${hh}:${mm} ${ap} in Delhi`;
    if (a) a.textContent = (h >= 8 || h < 1) ? "I'm probably awake. Tell me what you want built, from the database to the app store." : "I'm probably asleep, but I'll reply in the morning. Tell me what you want built.";
  };
  tick(); setInterval(tick, 20000);
  if (still) return;

  /* ---------- the camera ---------- */
  const T = { hero: [470, 90, 1100, 760], monitor: [540, 360, 420, 290], badge: [860, 430, 170, 150], phone: [930, 500, 150, 160], board: [1160, 130, 370, 330],
    books: [680, 220, 230, 150], laptop: [1260, 470, 260, 200], trophies: [860, 220, 210, 140], poster: [690, 400, 170, 220], window: [80, 100, 640, 580] };
  let W, H, mobile, C = [], cover;
  const MOBILE_HERO = [820, 180, 640, 520];
  const focus = side => mobile ? { x: 0, y: 64, w: W, h: H * .5 - 64 }
    : side === 'right' ? { x: 0, y: 72, w: W * .58, h: H - 72 } : { x: W * .42, y: 72, w: W * .58, h: H - 72 };
  const shot = st => {
    const [x, y, w, h] = (mobile && st.dataset.cam === 'hero') ? MOBILE_HERO : (T[st.dataset.cam] || T.hero), f = focus(st.dataset.side);
    let s = Math.min(f.w / w, f.h / h) * (st.dataset.cam === 'hero' ? 1 : .78);
    s = clamp(s, cover, 3.4);
    return { s, px: x + w / 2, py: y + h / 2, fx: f.x + f.w / 2, fy: f.y + f.h / 2 };
  };
  let shots = [];
  const measure = () => {
    W = stage.clientWidth; H = stage.clientHeight; mobile = W <= 760;
    cover = Math.max(W / 1600, H / 1000);
    C = stops.map(s => { const r = s.getBoundingClientRect(); return r.top + scrollY + r.height / 2; });
    shots = stops.map(shot);
  };
  const dots = tour.querySelector('.dots');
  stops.forEach(() => dots.appendChild(document.createElement('li')));
  const dotEls = [...dots.children];

  let cur = { s: 1, tx: 0, ty: 0 }, goal = { s: 1, tx: 0, ty: 0 }, moving = false, active = -1;
  const place = (a, b, e) => {
    const far = Math.hypot(a.px - b.px, a.py - b.py) / 1600;
    let s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * e) * (1 - Math.sin(Math.PI * e) * clamp(far * 1.2, 0, .45));
    s = Math.max(s, cover);
    const px = a.px + (b.px - a.px) * e, py = a.py + (b.py - a.py) * e, fx = a.fx + (b.fx - a.fx) * e, fy = a.fy + (b.fy - a.fy) * e;
    let tx = fx - px * s, ty = fy - py * s;
    tx = clamp(tx, W - 1600 * s, 0); ty = clamp(ty, H - 1000 * s, 0);
    return { s, tx, ty };
  };
  const paint = () => { cam.style.transform = `translate(${cur.tx.toFixed(1)}px, ${cur.ty.toFixed(1)}px) scale(${cur.s.toFixed(4)})`; };
  const glide = () => {
    let done = true;
    for (const k of ['s', 'tx', 'ty']) { const d = goal[k] - cur[k]; if (Math.abs(d) > (k === 's' ? .0005 : .3)) done = false; cur[k] += d * .14; }
    paint();
    if (!done) requestAnimationFrame(glide); else { cur = { ...goal }; paint(); moving = false; }
  };
  const countUp = el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const text = el.textContent, m = text.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) return;
    const to = +m[2].replace(/,/g, ''), from = el.dataset.from ? +el.dataset.from : 0, t0 = performance.now();
    const step = now => { const p = Math.min(1, (now - t0) / 1000), e = 1 - Math.pow(1 - p, 3); el.textContent = m[1] + Math.round(from + (to - from) * e) + m[3]; if (p < 1) requestAnimationFrame(step); else el.textContent = text; };
    requestAnimationFrame(step);
  };
  const update = () => {
    const f = scrollY + H * .5;
    let i = 0, e = 0;
    if (f <= C[0]) { i = 0; e = 0; }
    else if (f >= C[C.length - 1]) { i = C.length - 2; e = 1; }
    else { while (f > C[i + 1]) i++; const t = (f - C[i]) / (C[i + 1] - C[i]); e = t < .3 ? 0 : t > .7 ? 1 : io((t - .3) / .4); }
    const a = shots[i], b = shots[Math.min(i + 1, shots.length - 1)];
    goal = place(a, b, e);
    if (!moving) { moving = true; requestAnimationFrame(glide); }
    // the thing in focus
    const now = e < .5 ? i : Math.min(i + 1, stops.length - 1);
    stage.style.setProperty('--vig', String(clamp((goal.s - cover) / (cover * 1.4)) * .9));
    if (now !== active) {
      active = now;
      const key = stops[now].dataset.cam;
      svg.querySelectorAll('.ring').forEach(r => r.classList.toggle('on', r.dataset.ring === key));
      dotEls.forEach((d, k) => d.classList.toggle('on', k === now));
      if (me) { if (key === 'hero') me.dataset.lookAt = '#hero-t em'; else me.dataset.lookAt = '#hs-' + key; }
      stops[now].querySelectorAll('.key[data-count]').forEach(countUp);
    }
  };

  /* ---------- the room breathing: wind in the curtains, the fan ---------- */
  const mk = (tag, attrs, parent) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); parent.appendChild(el); return el; };
  const curtain = (g, side) => {
    const fill = mk('path', { class: 'cf', fill: '#6FA8A6' }, g), hatch = mk('path', { fill: 'url(#h-teal)' }, g);
    const folds = [0, 1, 2, 3].map(() => mk('path', { class: 'fold' }, g));
    const edge = mk('path', { class: 'gl' }, g), edge2 = mk('path', { class: 'gl2' }, g);
    return { side, fill, hatch, folds, edge, edge2 };
  };
  const CL = curtain(svg.querySelector('#curtain-l'), -1), CR = curtain(svg.querySelector('#curtain-r'), 1);
  const drawCurtain = (c, t, wind) => {
    // left curtain hangs from x 100..252, right from 528..680; the inner edge is the free one
    const L = c.side < 0;
    const out = L ? 100 : 680, inn = L ? 252 : 528, dir = L ? 1 : -1, top = 136, bot = 652;
    const dx = (16 + 74 * wind + 7 * Math.sin(t * 2.3 + (L ? 0 : 1.7))) * dir, lift = 8 + 46 * wind + 4 * Math.sin(t * 1.7 + (L ? .5 : 0));
    const ix = inn + dx, iy = bot - lift, ox = out - dir * (4 + 6 * wind), oy = bot + 4 - lift * .25;
    const scal = [];
    for (let k = 0; k <= 6; k++) { const x = out + (inn - out) * k / 6; scal.push(`${x.toFixed(1)} ${(top + (k % 2) * 6).toFixed(1)}`); }
    const hemMid1 = { x: out + (ix - out) * .33, y: oy + 10 * Math.sin(t * 2.6) - lift * .2 }, hemMid2 = { x: out + (ix - out) * .66, y: iy + 12 + 8 * Math.sin(t * 2.2 + 1) };
    const inner = `C${(inn + dx * .15).toFixed(1)} ${(top + 160).toFixed(1)} ${(inn + dx * .7).toFixed(1)} ${(bot - 160).toFixed(1)} ${ix.toFixed(1)} ${iy.toFixed(1)}`;
    const hem = `Q${hemMid2.x.toFixed(1)} ${(hemMid2.y + 14).toFixed(1)} ${((hemMid1.x + hemMid2.x) / 2).toFixed(1)} ${((hemMid1.y + hemMid2.y) / 2 + 6).toFixed(1)} T${ox.toFixed(1)} ${oy.toFixed(1)}`;
    const d = `M${scal.join(' L')} ${inner} ${hem} C${(out - dir * 2).toFixed(1)} ${(bot - 200).toFixed(1)} ${out} ${top + 200} ${out} ${top} Z`;
    c.fill.setAttribute('d', d); c.hatch.setAttribute('d', d);
    c.edge.setAttribute('d', `M${inn} ${top} ${inner} ${hem}`);
    c.edge2.setAttribute('d', `M${inn + 1.5} ${top + 2} ${inner.replace(/(\d+\.\d) (\d+\.\d)$/, (m0, a, b) => (+a + 1.2) + ' ' + (+b - 1.5))}`);
    c.folds.forEach((p, k) => {
      const r = (k + 1) / 5, fx = out + (inn - out) * r, ex = out + (ix - out) * r, ey = oy + (iy - oy) * r - 6;
      p.setAttribute('d', `M${fx.toFixed(1)} ${top + 8} C${(fx + dx * r * .2).toFixed(1)} ${top + 200} ${(ex - dx * r * .1).toFixed(1)} ${(ey - 180).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
    });
  };
  const fan = svg.querySelector('#fan');
  const blades = [0, 1, 2].map(() => mk('path', { class: 'blade', fill: '#B9875F' }, fan));
  let angle = 0, last = performance.now(), visible = true, raf = 0;
  const life = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const t = now / 1000;
    const wind = clamp(.5 + .5 * Math.sin(t * .62) * Math.sin(t * .23 + 1.3) + .15 * Math.sin(t * 1.9));
    drawCurtain(CL, t, wind); drawCurtain(CR, t + .4, clamp(wind * .9 + .05));
    svg.style.setProperty('--gust', (.6 + wind * 1.4).toFixed(2));
    angle += dt * 2.6;
    blades.forEach((b, k) => {
      const a = angle + k * 2.0944, c = Math.cos(a), s = Math.sin(a);
      const bx = 860 + 24 * c, by = 70 + 4 * s, tx = 860 + 236 * c, ty = 70 + 18 * s, w1 = 3 + 2 * Math.abs(s), w2 = 6 + 6 * Math.abs(s);
      b.setAttribute('d', `M${bx.toFixed(1)} ${(by - w1).toFixed(1)} L${tx.toFixed(1)} ${(ty - w2).toFixed(1)} Q${(tx + 10 * c).toFixed(1)} ${ty.toFixed(1)} ${tx.toFixed(1)} ${(ty + w2).toFixed(1)} L${bx.toFixed(1)} ${(by + w1).toFixed(1)}Z`);
      b.style.opacity = s < 0 ? '.75' : '1';
    });
    raf = visible && !document.hidden ? requestAnimationFrame(life) : 0;
  };
  const wake = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(life); } };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; wake(); }).observe(stage);
  document.addEventListener('visibilitychange', wake);

  /* ---------- go ---------- */
  let queued = false;
  const onScroll = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; update(); }); };
  const refresh = () => { measure(); update(); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', refresh);
  addEventListener('load', refresh);
  measure();
  const first = place(shots[0], shots[0], 0); cur = { ...first }; goal = { ...first }; paint();
  update(); wake();
})();
