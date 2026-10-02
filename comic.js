/* Shared comic behaviour for yogya.dev: the character, reveals, booking popup */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = matchMedia('(hover: hover)').matches;

  /* ---------- contact: edit these two lines ---------- */
  const EMAIL = 'yogya.developer@gmail.com';
  const CALENDLY_URL = 'https://calendly.com/yogya-chugh/30min';

  const $ = id => document.getElementById(id);
  const gmail = (subject) => `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}`;
  document.querySelectorAll('[data-gmail]').forEach(a => { a.href = gmail(a.dataset.gmail || 'Hey Yogya!'); });

  /* booking opens Calendly inside a comic panel, tinted to match the site */
  const cal = $('cal'), calFrame = $('cal-frame');
  document.querySelectorAll('[data-calendly]').forEach(link => {
    link.href = CALENDLY_URL;
    link.addEventListener('click', e => {
      if (!cal || !cal.showModal) return; // no popup on this page: just follow the link
      e.preventDefault();
      if (!calFrame.src) {
        const q = new URLSearchParams({
          embed_domain: location.hostname || 'yogya.dev', embed_type: 'Inline', hide_gdpr_banner: '1',
          background_color: 'fffdf5', text_color: '111318', primary_color: 'e8473f'
        });
        calFrame.src = `${CALENDLY_URL}?${q}`;
      }
      cal.showModal();
    });
  });
  if (cal) {
    $('cal-close').addEventListener('click', () => cal.close());
    cal.addEventListener('click', e => { if (e.target === cal) cal.close(); });
  }
  if ($('hint')) $('hint').textContent = canHover ? 'Hover over me' : 'Tap me';

  /* =========================================================
     THE CHARACTER: pure vector shapes, no photo data.
     Red hoodie with the hood up, black fringe, sunglasses.
     ========================================================= */
  const INK = '#111318', SKIN = '#D99D7B', SKIN_D = '#B97C5C', HAIR = '#0B0C0F', HAIR_L = '#1A1C22', SHINE_C = '#5A5F6B',
        HOOD = '#E0413A', HOOD_D = '#B32E28', HOOD_IN = '#5E1714', HOOD_HI = '#F47A72',
        BEARD = 'rgba(52,32,26,.42)', MOUTH = '#7A2733';
  const CROPS = { bust: '0 0 300 300', close: '48 0 204 204' };
  const PEEK = 22; // how far the shades slide down when you hover
  const line = (d, w = 5, c = INK) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const eye = (cx) => `<ellipse class="yo-eye" cx="${cx}" cy="132" rx="5.2" ry="6.6" fill="${INK}"/><circle cx="${cx + 1.8}" cy="129.6" r="1.6" fill="#fff"/>`;
  const openEyes = `<g class="yo-eyes">${eye(123)}${eye(177)}</g>`;
  const closed = (cx) => line(`M${cx - 7} 134 Q${cx} 126 ${cx + 7} 134`, 4.5);

  // `peek` = how far the shades already sit down the nose for that expression
  const EXPR = {
    smile:      { bl: '', br: '', mouth: line('M136 181 Q153 191 168 178', 4.5) },
    wink:       { bl: 'translate(0 -2)', br: 'translate(0 -6) rotate(-6 181 102)',
                  eyes: closed(123) + `<g class="yo-eyes">${eye(177)}</g>`, mouth: line('M136 180 Q155 192 170 175', 4.5) },
    happy:      { bl: 'translate(0 -6)', br: 'translate(0 -6)', blush: true, eyes: closed(123) + closed(177),
                  mouth: `<path d="M132 176 Q151 204 172 174 Z" fill="${MOUTH}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M135 177.5 Q151 182 169 176 L167 181 Q151 186 137 182 Z" fill="#fff"/>` },
    curious:    { bl: 'translate(0 -7) rotate(-8 119 102)', br: '', look: [2, -2], mouth: line('M144 184 Q151 180 158 184', 4.5) },
    confused:   { bl: 'rotate(10 119 102)', br: 'translate(0 -6) rotate(-6 181 102)', sweat: true, peek: 13, look: [-2, 0],
                  mouth: line('M138 185 Q145 179 151 185 Q158 191 165 185', 4.2) },
    sad:        { bl: 'rotate(-14 119 102)', br: 'rotate(14 181 102)', peek: 12, look: [0, 2], mouth: line('M139 190 Q151 179 163 190', 4.5) },
    shocked:    { bl: 'translate(0 -10)', br: 'translate(0 -10)', peek: 16,
                  mouth: `<ellipse cx="151" cy="186" rx="7" ry="9" fill="${MOUTH}" stroke="${INK}" stroke-width="4.2"/>` },
    smug:       { bl: 'rotate(8 119 102)', br: 'translate(0 -4) rotate(-4 181 102)', look: [2, 0], mouth: line('M138 181 Q156 189 170 175', 4.5) },
    determined: { bl: 'translate(0 2) rotate(9 119 102)', br: 'translate(0 2) rotate(-9 181 102)', mouth: line('M140 183 Q152 189 164 182', 4.5) },
    tired:      { bl: 'translate(0 3)', br: 'translate(0 3)', peek: 11,
                  eyes: line('M116 133 L130 133', 4.5) + line('M170 133 L184 133', 4.5),
                  mouth: line('M141 187 Q151 183 161 187', 4.5) },
  };

  const HOOD_BACK = 'M70 252 Q46 150 72 80 Q102 4 152 3 Q204 4 232 78 Q258 150 230 252 Z';
  const RIM = 'M150 256 Q100 238 89 192 Q77 142 83 94 Q96 32 150 28 Q204 32 217 94 Q223 142 211 192 Q200 238 150 256 Z';
  const CROWN = 'M86 100 Q86 42 150 34 Q214 42 216 100 Q192 72 150 68 Q110 70 86 100 Z';
  const LOCKS = [
    'M88 62 Q86 86 92 104 Q98 88 108 74 Z',
    'M96 48 Q98 76 112 98 Q116 80 128 62 Z',
    'M110 38 Q118 72 138 100 Q136 76 150 54 Z',
    'M130 34 Q144 72 168 106 Q162 74 178 50 Z',
    'M154 34 Q172 70 194 112 Q190 78 206 54 Z',
    'M178 40 Q200 76 212 122 Q218 90 220 64 Z',
  ];
  const SHINE = ['M112 48 Q120 64 130 78', 'M136 42 Q146 60 160 76', 'M160 42 Q172 60 186 80'];
  const FACE = 'M94 104 Q94 62 150 60 Q206 62 206 104 L206 146 Q205 182 180 200 Q164 212 150 212 Q136 212 120 200 Q95 182 94 146 Z';
  const BODY = 'M6 330 C14 252 62 226 150 224 C238 226 286 252 294 330 Z';

  let yoCount = 0;
  function yo(expr, flip, crop) {
    const lens = `yo-lens-${++yoCount}`;
    const e = EXPR[expr] || EXPR.smile;
    return `<svg class="yo" viewBox="${CROPS[crop] || CROPS.bust}" aria-hidden="true" focusable="false">
      <defs><linearGradient id="${lens}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3D414C"/><stop offset=".55" stop-color="#15171C"/><stop offset="1" stop-color="#07080A"/>
      </linearGradient></defs>
      <g${flip ? ' transform="translate(300 0) scale(-1 1)"' : ''}>
        <path d="${HOOD_BACK}" fill="${HOOD}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M104 40 Q120 16 150 10" fill="none" stroke="${HOOD_HI}" stroke-width="4" stroke-linecap="round"/>
        <path d="${BODY}" fill="${HOOD}"/>
        <path d="M6 330 C14 252 62 226 110 226 L96 330 Z" fill="${HOOD_D}" opacity=".6"/>
        <path d="${BODY}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="${RIM}" fill="${HOOD_IN}"/>
        <path d="M122 190 L122 254 L178 254 L178 190 Z" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
        <path d="M122 198 Q150 228 178 198 L178 218 Q150 240 122 218 Z" fill="${SKIN_D}"/>
        <path d="${FACE}" fill="${SKIN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M96 118 L96 146 Q97 180 120 198 Q131 206 142 210 Q118 194 110 168 Q104 146 106 118 Z" fill="${SKIN_D}" opacity=".5"/>
        <path d="M96 150 Q97 182 120 200 Q136 212 150 212 Q164 212 180 200 Q203 182 204 150 Q200 176 182 186 Q166 195 150 195 Q134 195 118 186 Q100 176 96 150 Z" fill="${BEARD}"/>
        <path d="${CROWN}" fill="${HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        ${LOCKS.map((d, i) => `<path d="${d}" fill="${i % 2 ? HAIR_L : HAIR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`).join('')}
        ${SHINE.map(d => line(d, 3, SHINE_C)).join('')}
        <g transform="${e.bl}">${line('M105 106 Q118 97 134 101', 6.5)}</g>
        <g transform="${e.br}">${line('M166 101 Q182 97 195 106', 6.5)}</g>
        ${e.eyes || openEyes}
        ${line('M152 140 Q146 156 151 162 Q156 164 160 160', 4)}
        <g class="yo-shades" transform="translate(0 ${e.peek || 0})">
          <g stroke="${INK}" stroke-width="5" stroke-linejoin="round">
            <rect x="100" y="114" width="45" height="34" rx="8" fill="url(#${lens})"/>
            <rect x="155" y="114" width="45" height="34" rx="8" fill="url(#${lens})"/>
          </g>
          ${line('M145 124 Q150 119 155 124', 5)}
          <g class="yo-glint" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8">
            <path d="M108 141 L117 121"/><path d="M116 142 L121 132"/><path d="M163 141 L172 121"/><path d="M171 142 L176 132"/>
          </g>
        </g>
        ${e.blush ? `<ellipse cx="111" cy="164" rx="9" ry="5" fill="#E2606F" opacity=".45"/><ellipse cx="191" cy="164" rx="9" ry="5" fill="#E2606F" opacity=".45"/>` : ''}
        ${e.mouth}
        ${e.sweat ? `<path d="M226 96 Q235 111 226 116 Q217 111 226 96 Z" fill="#9ED3F5" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>` : ''}
        <path d="${RIM}" fill="none" stroke="${INK}" stroke-width="22" stroke-linejoin="round"/>
        <path d="${RIM}" fill="none" stroke="${HOOD}" stroke-width="13" stroke-linejoin="round"/>
        ${line('M138 254 L134 300', 7)}${line('M138 254 L134 300', 3.5, '#fff')}
        ${line('M162 254 L166 296', 7)}${line('M162 254 L166 296', 3.5, '#fff')}
      </g>
    </svg>`;
  }

  /* ---------- live characters ----------
     eyes follow your cursor; hover (or tap) and he slides his shades down to look at you */
  const chars = new Map();
  const visible = new Set();
  const visIO = new IntersectionObserver(entries => {
    entries.forEach(en => en.isIntersecting ? visible.add(en.target) : visible.delete(en.target));
  });
  function mount(wrap) {
    const old = wrap.querySelector('svg.yo');
    if (old) { chars.delete(old); visible.delete(old); visIO.unobserve(old); }
    const expr = wrap.dataset.expr, flip = wrap.dataset.flip === '1';
    wrap.innerHTML = yo(expr, flip, wrap.dataset.crop);
    const svg = wrap.firstElementChild;
    const base = (EXPR[expr] && EXPR[expr].peek) || 0;
    const state = {
      flip, vb: svg.viewBox.baseVal, wrap,
      eyes: svg.querySelector('.yo-eyes'), glint: svg.querySelector('.yo-glint'), shades: svg.querySelector('.yo-shades'),
      eyeEls: [...svg.querySelectorAll('.yo-eye')],
      look: (EXPR[expr] && EXPR[expr].look) || [0, 0], lx: 0, ly: 0,
      base, drop: base, hover: false, peekUntil: 0, lastT: '', lastS: '',
      blinkAt: performance.now() + 800 + Math.random() * 4000
    };
    chars.set(svg, state);
    visIO.observe(svg);
    if (!wrap.dataset.bound) {
      wrap.dataset.bound = '1';
      wrap.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { const c = chars.get(wrap.querySelector('svg.yo')); if (c) c.hover = true; } });
      wrap.addEventListener('pointerleave', () => { const c = chars.get(wrap.querySelector('svg.yo')); if (c) c.hover = false; });
    }
  }
  document.querySelectorAll('.yo-wrap').forEach(mount);

  let mx = 0, my = 0, hasPointer = false;
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY; hasPointer = true;
  }, { passive: true });

  /* motion comic: each visible panel gets its scroll position as --py (-1 … 1) */
  const panels = new Set();
  const panelIO = new IntersectionObserver(entries => {
    entries.forEach(en => en.isIntersecting ? panels.add(en.target) : panels.delete(en.target));
  });
  document.querySelectorAll('.pn').forEach(p => panelIO.observe(p));

  function frame(now) {
    if (!reduce.matches) {
      for (const p of panels) {
        const r = p.getBoundingClientRect();
        const v = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - innerHeight / 2) / (innerHeight / 2)));
        p.style.setProperty('--py', v.toFixed(3));
      }
    }
    for (const svg of visible) {
      const c = chars.get(svg);
      if (!c) continue;
      let tx = c.look[0], ty = c.look[1];
      if (hasPointer) {
        const r = svg.getBoundingClientRect();
        let dx = mx - (r.left + (150 - c.vb.x) / c.vb.width * r.width);
        let dy = my - (r.top + (132 - c.vb.y) / c.vb.height * r.height);
        const d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 240);
        dx = dx / d * m; dy = dy / d * m;
        if (c.flip) dx = -dx;
        tx = dx * 4; ty = dy * 3;
      }
      c.lx += (tx - c.lx) * 0.2; c.ly += (ty - c.ly) * 0.2;
      const t = `translate(${c.lx.toFixed(2)} ${c.ly.toFixed(2)})`;
      if (t !== c.lastT) {
        if (c.eyes) c.eyes.setAttribute('transform', t);
        if (c.glint) c.glint.setAttribute('transform', `translate(${(c.lx * .6).toFixed(2)} ${(c.ly * .6).toFixed(2)})`);
        c.lastT = t;
      }
      const target = (c.hover || now < c.peekUntil) ? PEEK : c.base;
      c.drop = reduce.matches ? target : c.drop + (target - c.drop) * 0.2;
      const s = `translate(0 ${c.drop.toFixed(2)})`;
      if (s !== c.lastS && c.shades) { c.shades.setAttribute('transform', s); c.lastS = s; }
      if (c.eyeEls.length && !reduce.matches && now > c.blinkAt) {
        const p = (now - c.blinkAt) / 150;
        const k = p >= 1 ? 1 : Math.abs(p * 2 - 1);
        c.eyeEls.forEach(el => el.setAttribute('ry', Math.max(0.6, 6.6 * k).toFixed(2)));
        if (p >= 1) c.blinkAt = now + 2200 + Math.random() * 4800;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* poke him: a hop, a word, and on touch screens the shades come down for a moment */
  const POKES = ['Hey!', 'Hi!', 'Hehe', 'Boop!', 'That tickles', 'Hire me?'];
  document.addEventListener('click', e => {
    const wrap = e.target.closest('.yo-wrap');
    if (!wrap) return;
    const svg = wrap.querySelector('svg.yo');
    const c = chars.get(svg);
    if (c) c.peekUntil = performance.now() + 1800;
    const host = wrap.closest('.pn, .cover-art, .corner-box, .face') || wrap.parentElement;
    if (host.classList.contains('face')) return;
    const tag = document.createElement('span');
    tag.className = 'poke';
    tag.textContent = POKES[Math.floor(Math.random() * POKES.length)];
    tag.setAttribute('aria-hidden', 'true');
    host.appendChild(tag);
    if (reduce.matches) { setTimeout(() => tag.remove(), 900); return; }
    svg.animate([
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-14px) rotate(-3deg)', offset: .35 },
      { transform: 'translateY(0) rotate(0deg)' }
    ], { duration: 440, easing: 'cubic-bezier(.3,.7,.4,1)' });
    tag.animate([
      { opacity: 0, transform: 'translate(-50%, 8px) scale(.6) rotate(-8deg)' },
      { opacity: 1, transform: 'translate(-50%, 0) scale(1) rotate(-4deg)', offset: .25 },
      { opacity: 1, transform: 'translate(-50%, -12px) scale(1) rotate(-4deg)', offset: .75 },
      { opacity: 0, transform: 'translate(-50%, -22px) scale(.95) rotate(-4deg)' }
    ], { duration: 1000, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => tag.remove();
  });

  /* ---------- each page lands, then its panels in reading order ---------- */
  document.querySelectorAll('.page').forEach(page => {
    page.querySelectorAll('.pn, .win, .way').forEach((el, i) => {
      el.style.setProperty('--i', i);
      el.style.setProperty('--rin', `${(i % 2 ? 2 : -2)}deg`);
    });
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
  document.querySelectorAll('.page').forEach(p => io.observe(p));

  /* the dock steps aside once the contact page is on screen */
  const dock = $('dock'), connect = $('connect');
  if (dock && connect) {
    new IntersectionObserver(([en]) => dock.classList.toggle('away', en.isIntersecting), { threshold: 0.25 }).observe(connect);
  }

  /* ---------- Delhi clock ---------- */
  const clock = $('clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
    const tick = () => { clock.textContent = `${fmt.format(new Date())} in Delhi right now`; };
    tick(); setInterval(tick, 30000);
  }
})();
