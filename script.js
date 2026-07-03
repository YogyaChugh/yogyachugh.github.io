/* ============================================================
   YOGYA CHUGH — IDE PORTFOLIO — SCRIPT.JS
   Complete VS Code-style IDE logic
   ============================================================ */

'use strict';

/* ============================================================
   FILE DATA
   ============================================================ */
const fileData = {
  'about.md': `# Yogya Chugh

**Systems & Software Developer | CS Undergrad (Class of 2027)**
📍 Delhi, India

I build IDEs in Rust and browser engines in C++. Recently, I won a massive hardware grant during Hack Club's Summer of Making by logging over 450+ hours on 4 shipped open-source projects in 3 months.

## Languages & Stack

### Languages
- **Rust** — systems, native tooling
- **C++** — browser engine internals, systems
- **TypeScript** — full-stack, Node.js
- **Python** — scripting, Django, FastAPI
- **C** — systems programming
- **SQL** — PostgreSQL, MySQL

### Systems & Graphics
- SDL, SFML, PyGame, egui, Electron

### Web & App
- React Native, Django, FastAPI, Node.js, Hono, Flask

### Cloud & Data
- Postgres, MySQL, Supabase, Firebase, Cloudflare R2

## Currently Building
- **AnyStudio** — a native desktop IDE written in Rust using egui for building Android apps
- **Webelo** — a C++ DOM library and HTML visualizer following the WhatWG DOM Standard
`,

  'experience.md': `# Professional Experience

## Freelance — Mobile App Developer
*Jun 2026 – Present*

- **Stack:** React Native, Supabase, PostgreSQL
- Shipping an iOS + Android application with full authentication and a robust delivery pipeline for a client

## Vardhman Electricals
*Nov 2025 – Jun 2026*

- **Stack:** TypeScript, Electron, Hono
- Built a comprehensive business suite and salesperson credit system from scratch
- Running the full product on $7/month infrastructure

## Hack Club — Summer of Making
*Summer 2025*

- **Role:** Independent Developer / Participant
- Logged 450+ tracked hours across 4+ shipped open-source projects in 3 months
- Awarded a top hardware grant — GIGABYTE AERO X16 (Ryzen AI 7, RTX 5070, 32GB DDR5, 1TB SSD)
- Earned 6,612 shells (~$1,322 grant) — among the top earners in the program
`,

  'contact.md': `# Contact

| Channel      | Details |
|--------------|---------|
| **Email**    | [yogya.developer@gmail.com](mailto:yogya.developer@gmail.com) |
| **GitHub**   | [YogyaChugh](https://github.com/YogyaChugh) |
| **LinkedIn** | [yogyachugh](https://linkedin.com/in/yogyachugh) |
| **Instagram**| [@opyogaychugh](https://instagram.com/opyogaychugh) |
| **Mobile**   | [+91-9650029959](tel:+919650029959) |

## Resume
[View Resume](https://docs.google.com/document/d/1ImsKn22rHe6A_k2lnV41Iz5zwUokPKYqUZvmozV3rWM/edit)
`,

  'anystudio.md': `# AnyStudio

A **native desktop IDE** written entirely in **Rust** using **egui** for building Android apps.

It compiles straight to the smallest possible APKs via a direct DEX pipeline, meaning **no JDK is required**. Built from the ground up to solve the bloat of traditional Android development environments.

## Key Features
- Native desktop performance via Rust + egui
- Direct DEX pipeline — bypasses the JDK entirely
- Minimal APK output size
- Built to solve real developer pain points around toolchain bloat

## Tech Stack
- **Language:** Rust
- **GUI:** egui
- **Target:** Android (via DEX bytecode)
- **Platform:** Desktop (Linux, macOS, Windows)

## Links
- [GitHub Repository](https://github.com/YogyaChugh)
`,

  'webelo.md': `# Webelo

A **C++ DOM library and HTML visualizer** following the WhatWG DOM Standard.

Implements preorder DFS, standard event dispatching, and strict specification matching. It's essentially the foundational building block for a custom browser engine.

## What It Does
- Implements the WhatWG DOM Living Standard in C++
- Full event dispatch algorithm (capture, target, bubble phases)
- Preorder DFS tree traversal
- Standard-compliant node operations (insertBefore, appendChild, removeChild, etc.)
- HTML visualizer that renders the DOM tree structure

## Tech Stack
- **Language:** C++
- **Standard:** WhatWG DOM Living Standard
- **Type:** Library + Visualizer

## Links
- [GitHub Repository](https://github.com/YogyaChugh)
`,

  'pippo.md': `# Pippo

A **multilingual navigator robot** designed for colleges and tourist spots.

Features a smart navigation chassis, conversational AI, and a companion app backed by a central knowledge API and ElevenLabs for voice synthesis.

## Key Features
- Smart navigation chassis for indoor navigation
- Conversational AI for natural language interaction
- Multilingual support — can speak and understand multiple languages
- Companion mobile app (React Native) for remote control and configuration
- Central knowledge API that stores location-specific information
- ElevenLabs integration for high-quality voice output

## Use Cases
- College campus navigation and information kiosk
- Tourist spot guide robot
- Information dispensing in public spaces

## Tech Stack
- **Hardware:** Custom navigation chassis
- **Intelligence:** Conversational AI, ElevenLabs
- **App:** React Native
- **Backend:** Central knowledge API (C++)
`,

  'vardhmansaathi.md': `# Vardhman Saathi

Production business suite for a salesperson credit system, with desktop and Android apps sharing one TypeScript codebase.

## Links
- [Website](https://vardhmansaathi.shop)
`,

  'agrolens.md': `# AgroLens

Computer-vision model classifying plant-leaf diseases, including dataset pipeline, training, and deployment.

## Tech Stack
- **Language:** Python

## Links
- [GitHub Repository](https://github.com/YogyaChughCoder/AgroLens)
`,

  'snake_hustle.md': `# Snake Hustle

Browser-based snake game.

## Links
- [Play Game](https://snakehustle.netlify.app)
`,

  'timberly.md': `# Timberly

Casual lumberjack game with multiplayer support, playable in-browser with downloads for Windows, macOS, and Linux.

## Links
- [Itch.io](https://yogya-chugh.itch.io/timberly)
`,

  'webber.md': `# Webber

Desktop crawler that downloads any website for offline rendering, built with Pygame, PyWebview, and BeautifulSoup.

## Tech Stack
- **Language:** Python

## Links
- [GitHub Repository](https://github.com/YogyaChugh/Webber)
`,

  'sih_travel_security.md': `# SIH Travel Security

Blockchain system for encrypted tourist tracking with SSO to local authorities.

## Links
- [GitHub Repository](https://github.com/YogyaChugh)
`,

  'django_open_source.md': `# Django · Open Source

Merged pull requests into Django core and third-party libraries.

## Links
- [View PRs](https://github.com/django/django/pulls?q=is%3Apr+author%3Ayogyachugh+)
`,

  'first_open_source.md': `# My First Open Source Contribution

**Contributing to a massive open-source project like Django can feel intimidating. The codebase is enormous, the maintainers are brilliant, and you're just hoping your pull request doesn't break something critical. But the open-source community is built on collaboration, and my first major contribution taught me exactly that.**

## Discovering Ticket 36271

I was browsing the Django issue tracker when I came across **Ticket 36271**. It detailed a specific bug related to form rendering and widgets. Since I had some experience working with Django's forms in my own projects, I felt this was the perfect opportunity to dive in.

Setting up the local environment was the first hurdle. Django has a comprehensive test suite, and getting everything running smoothly required carefully reading through the contributing documentation. Once the tests were passing locally, I started tracing the execution path of the bug.

## Writing the Fix & Tests

Locating the exact module causing the issue took some deep diving into the framework's internals. When I finally pinpointed the problem, the actual fix only required modifying a few lines of code. However, in open source, writing the code is only half the battle.

> "The hardest part wasn't writing the code; it was ensuring the fix was robust enough for thousands of developers."

I had to write comprehensive test cases to prove the bug was fixed and ensure it wouldn't regress in the future. Django's existing tests were a great reference point, allowing me to model my assertions correctly.

## The Review Process

Submitting the pull request was exhilarating. Within a few days, **Sarah Boyce**, a Django core developer and maintainer, reviewed my code. Working with a seasoned maintainer was incredibly insightful. She provided excellent feedback, requesting a minor adjustment to how the test case was structured.

After pushing the requested changes, the checks passed, and the magical word appeared: **"Merged."** Seeing my code become part of a framework used by millions of developers worldwide was an unforgettable milestone.

*You can read the full, original technical deep-dive on my [Medium blog](https://medium.com/@yogya.developer/my-first-open-source-contribution-67c08b88e674).*
`,

  'summer_of_making.md': `# 450 hours, 4 ships, one laptop

**One random email from GitHub ended up changing my whole summer and somehow, it ended with me getting my dream laptop (completely free).**

Back in June, I was just trying to survive semester exams when this email popped up about something called Summer of Making. I didn't know that it was going to change my whole summer vacations.

It was sponsored by GitHub and run by Hack Club, a nonprofit that helps teenagers (13–18) build cool stuff and learn by doing. The idea was simple but so good: You code, you earn shells (their in-program currency).

For every hour you coded, you got 1 shell (using a VSCode extension to track time). And when your project was done, it went for community voting, where it could get a multiplier between 1x and 30x.

## The Grind

So I joined in and decided to code my summer away. For the next three months, I built five projects: a web scraper, a game, a DOM visualizer (my attempt at a browser), a website, and a custom leaderboard.

It was quite difficult in the beginning to lock so many hours but that drive for something amazing at the end kept me going. I started off with my visualizer and kept doing the scraper (a 150 hour project) and my game (another 70 hour project), and the work continued.

## The Payoff

What an irony! I was turning 19 on September 29th and this turned out to be my last but the best event ever.

I met some amazing people, learned more than I expected, and ended up coding for over 414+ hours. By the end, I had 6612 shells, got a grant of $1322, enough to finally buy my dream setup: **GIGABYTE AERO X16 with a Ryzen AI 7, RTX 5070, 32GB DDR5 RAM, and 1TB SSD.**

Still can't believe I actually earned it through just mere code. Also got a $25 Steam grant, which was just a fun little bonus. To my surprise, I was among the top few coders with the highest earned shells. 6612 boi!!

> "It started with a random email. It ended with me realizing how far a few lines of code and some late nights can really go."

A summer well spent! All thanks to Hack Club.
`,

  'classes_dex.md': `# How I cracked the DEX code

*This post is currently being written. Check back later!*

The story of building AnyStudio's direct DEX pipeline — bypassing the JDK entirely to compile the smallest possible Android APKs using Rust.
`,

  'whatwg_dom.md': `# Implementing the WhatWG DOM in C++

*This post is currently being written. Check back later!*

The deep dive into building Webelo's DOM engine — implementing the WhatWG DOM Living Standard in C++, including event dispatch, preorder DFS traversal, and the mutation observer algorithm.
`,

  'vardhman.md': `# Running a real product on $7/month

*This post is currently being written. Check back later!*

The story of building a comprehensive business suite for Vardhman Electricals using TypeScript, Electron, and Hono — running the entire product on $7/month infrastructure from Nov 2025 to Jun 2026.
`
};

/* ============================================================
   THEME SYSTEM
   ============================================================ */
const themes = [
  { id: 'dark-plus',      label: 'Dark+ (Default Dark)' },
  { id: 'monokai',        label: 'Monokai' },
  { id: 'solarized-dark', label: 'Solarized Dark' },
  { id: 'one-dark',       label: 'One Dark Pro' },
  { id: 'github-dark',    label: 'GitHub Dark' },
  { id: 'high-contrast',  label: 'High Contrast Dark' }
];

function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem('ide-theme', id);
}

/* ============================================================
   FILE → FOLDER MAP
   ============================================================ */
const fileFolder = {
  'about.md':              'profile',
  'experience.md':         'profile',
  'contact.md':            'profile',
  'anystudio.md':          'projects',
  'webelo.md':             'projects',
  'pippo.md':              'projects',
  'first_open_source.md':  'writing',
  'summer_of_making.md':   'writing',
  'classes_dex.md':        'writing',
  'whatwg_dom.md':         'writing',
  'vardhman.md':           'writing'
};

/* ============================================================
   FILE BADGE / ICON
   ============================================================ */
function getIcon(filename) {
  const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : filename.toLowerCase();
  const base = filename.toLowerCase();

  const badges = {
    rs:            ['RS', '#dea584'],
    ts:            ['TS', '#3178c6'],
    tsx:           ['TS', '#3178c6'],
    js:            ['JS', '#f7df1e'],
    jsx:           ['JS', '#f7df1e'],
    py:            ['PY', '#3572A5'],
    cpp:           ['C+', '#00599c'],
    cc:            ['C+', '#00599c'],
    c:             ['C',  '#555555'],
    h:             ['H',  '#a0522d'],
    html:          ['HT', '#e34c26'],
    htm:           ['HT', '#e34c26'],
    css:           ['CS', '#563d7c'],
    scss:          ['SC', '#c76494'],
    json:          ['{}', '#6B8E23'],
    md:            ['MD', '#4b89c3'],
    mdx:           ['MD', '#4b89c3'],
    yml:           ['YM', '#cb171e'],
    yaml:          ['YM', '#cb171e'],
    xml:           ['XM', '#e34c26'],
    toml:          ['TM', '#9c4221'],
    gitignore:     ['GI', '#f14e32'],
    gitattributes: ['GA', '#f14e32'],
    sh:            ['SH', '#89e051'],
    bash:          ['SH', '#89e051'],
    go:            ['GO', '#00ADD8'],
    java:          ['JV', '#b07219'],
    kt:            ['KT', '#A97BFF'],
    swift:         ['SW', '#F05138'],
    png:           ['IMG', '#a855f7'],
    jpg:           ['IMG', '#a855f7'],
    jpeg:          ['IMG', '#a855f7'],
    gif:           ['IMG', '#a855f7'],
    svg:           ['IMG', '#a855f7'],
    ico:           ['IMG', '#a855f7'],
    webp:          ['IMG', '#a855f7'],
    bmp:           ['IMG', '#a855f7'],
    txt:           ['TXT', '#858585'],
    env:           ['.E',  '#ecd53f'],
    dockerfile:    ['DK',  '#0db7ed']
  };

  // Special filenames
  if (base === 'package.json' || base === 'cargo.toml' || base === 'makefile') {
    return `<span class="file-badge" style="background:#e3710a">PKG</span>`;
  }
  if (base === '.env' || base.startsWith('.env.')) {
    return `<span class="file-badge" style="background:#ecd53f;color:#333">.E</span>`;
  }

  const match = badges[ext];
  if (match) {
    const [label, color] = match;
    const textColor = color === '#f7df1e' || color === '#ecd53f' ? '#333' : '#fff';
    return `<span class="file-badge" style="background:${color};color:${textColor}">${label}</span>`;
  }
  return `<span class="file-badge" style="background:#555555">??</span>`;
}

/* ============================================================
   SYNTAX HIGHLIGHTING
   ============================================================ */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightCode(code, ext) {
  const e = ext.toLowerCase();

  if (e === 'md' || e === 'mdx') {
    return highlightMarkdownSource(code);
  }
  if (e === 'rs') {
    return highlightRust(code);
  }
  if (e === 'ts' || e === 'tsx' || e === 'js' || e === 'jsx') {
    return highlightJavaScript(code);
  }
  if (e === 'py') {
    return highlightPython(code);
  }
  if (e === 'c' || e === 'cpp' || e === 'cc' || e === 'h') {
    return highlightCpp(code);
  }
  if (e === 'json') {
    return highlightJson(code);
  }
  if (e === 'css' || e === 'scss') {
    return highlightCss(code);
  }
  return highlightGeneric(code);
}

/* --- Rust --- */
function highlightRust(code) {
  const keywords = /\b(fn|let|mut|struct|impl|use|pub|mod|enum|match|if|else|return|self|for|while|loop|true|false|Some|None|Ok|Err|where|trait|type|async|await|move|ref|dyn|unsafe|extern|crate|super|const|static)\b/g;
  const types    = /\b(String|Vec|HashMap|HashSet|BTreeMap|BTreeSet|i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|f32|f64|bool|str|usize|isize|char|Option|Result|Box|Rc|Arc|Mutex|RwLock|Cell|RefCell)\b/g;
  const lifetime = /'[a-z_]+\b/g;
  const strings  = /"(?:[^"\\]|\\.)*"|r#*"[\s\S]*?"#*/g;
  const chars    = /'(?:[^'\\]|\\.)'/g;
  const comments = /\/\/[^\n]*/g;
  const numbers  = /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[iu]\d*|f32|f64)?\b/g;
  const macros   = /\b[a-z_][a-z_\d]*!/g;
  const attrs    = /#!?\[[\s\S]*?\]/g;

  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    esc = esc
      .replace(comments.source ? /\/\/[^\n]*/g : /(?!)/g, m => `<span class="cmt">${m}</span>`)
      .replace(strings, m => `<span class="str">${m}</span>`)
      .replace(chars, m => `<span class="str">${m}</span>`)
      .replace(attrs, m => `<span class="dc">${m}</span>`)
      .replace(macros, m => `<span class="fn">${m}</span>`)
      .replace(lifetime, m => `<span class="lt">${m}</span>`)
      .replace(types, m => `<span class="tp">${m}</span>`)
      .replace(keywords, m => `<span class="kw">${m}</span>`)
      .replace(numbers, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- JavaScript / TypeScript --- */
function highlightJavaScript(code) {
  const keywords = /\b(const|let|var|function|return|class|import|export|default|from|as|async|await|if|else|for|while|do|switch|case|break|continue|new|this|super|typeof|instanceof|in|of|delete|void|throw|try|catch|finally|extends|implements|interface|type|enum|declare|abstract|public|private|protected|readonly|static|override|true|false|null|undefined|NaN|Infinity)\b/g;
  const decorator = /@[a-zA-Z_$][a-zA-Z0-9_$]*/g;
  const templateL = /`(?:[^`\\]|\\.)*`/gs;
  const strings   = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
  const comments  = /\/\/[^\n]*|\/\*[\s\S]*?\*\//g;
  const numbers   = /\b\d+(?:\.\d+)?(?:n)?\b/g;

  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    esc = esc
      .replace(/\/\/[^\n]*/g, m => `<span class="cmt">${m}</span>`)
      .replace(templateL, m => `<span class="str">${m}</span>`)
      .replace(strings, m => `<span class="str">${m}</span>`)
      .replace(decorator, m => `<span class="dc">${m}</span>`)
      .replace(keywords, m => `<span class="kw">${m}</span>`)
      .replace(numbers, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- Python --- */
function highlightPython(code) {
  const keywords  = /\b(def|class|import|from|return|if|elif|else|for|while|with|as|try|except|finally|raise|pass|break|continue|True|False|None|and|or|not|in|is|lambda|yield|global|nonlocal|del|assert|async|await)\b/g;
  const decorator = /@[a-zA-Z_][a-zA-Z0-9_.]*\b/g;
  const strings   = /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
  const comments  = /#[^\n]*/g;
  const numbers   = /\b\d+(?:\.\d+)?(?:[jJ])?\b/g;
  const builtins  = /\b(print|len|range|list|dict|set|tuple|str|int|float|bool|type|isinstance|hasattr|getattr|setattr|open|enumerate|zip|map|filter|sorted|reversed|any|all|sum|min|max|abs|round|input|super|object)\b/g;

  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    esc = esc
      .replace(comments, m => `<span class="cmt">${m}</span>`)
      .replace(strings, m => `<span class="str">${m}</span>`)
      .replace(decorator, m => `<span class="dc">${m}</span>`)
      .replace(keywords, m => `<span class="kw">${m}</span>`)
      .replace(builtins, m => `<span class="fn">${m}</span>`)
      .replace(numbers, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- C / C++ --- */
function highlightCpp(code) {
  const keywords = /\b(int|char|void|short|long|float|double|return|if|else|for|while|do|switch|case|break|continue|struct|class|public|private|protected|namespace|using|std|auto|const|nullptr|new|delete|this|virtual|override|final|template|typename|typedef|enum|union|inline|static|extern|volatile|register|signed|unsigned|sizeof|typeof|operator|try|catch|throw)\b/g;
  const preproc  = /#\s*(?:include|define|ifdef|ifndef|endif|if|else|elif|pragma|undef|error|warning)[^\n]*/g;
  const strings  = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
  const comments = /\/\/[^\n]*|\/\*[\s\S]*?\*\//g;
  const numbers  = /\b\d+(?:\.\d+)?(?:[uUlLfF]+)?\b/g;

  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    esc = esc
      .replace(/\/\/[^\n]*/g, m => `<span class="cmt">${m}</span>`)
      .replace(preproc, m => `<span class="pp">${m}</span>`)
      .replace(strings, m => `<span class="str">${m}</span>`)
      .replace(keywords, m => `<span class="kw">${m}</span>`)
      .replace(numbers, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- JSON --- */
function highlightJson(code) {
  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    // Keys: "key":
    esc = esc.replace(/"([^"\\]|\\.)*"(?=\s*:)/g, m => `<span class="jk">${m}</span>`);
    // String values
    esc = esc.replace(/:\s*("(?:[^"\\]|\\.)*")/g, (m, s) => m.replace(s, `<span class="str">${s}</span>`));
    // Numbers
    esc = esc.replace(/:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, (m, n) => m.replace(n, `<span class="num">${n}</span>`));
    // Booleans / null
    esc = esc.replace(/\b(true|false|null)\b/g, m => `<span class="kw">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- CSS --- */
function highlightCss(code) {
  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    // Comments
    esc = esc.replace(/\/\*[\s\S]*?\*\//g, m => `<span class="cmt">${m}</span>`);
    // Selectors (lines ending in {)
    if (esc.trim().endsWith('{')) {
      esc = `<span class="sl">${esc}</span>`;
      return esc;
    }
    // Properties
    esc = esc.replace(/^\s*([\w-]+)\s*:/g, (m, p) => m.replace(p, `<span class="pr">${p}</span>`));
    // Values: colors #hex
    esc = esc.replace(/#[0-9a-fA-F]{3,8}\b/g, m => `<span class="num">${m}</span>`);
    // Strings
    esc = esc.replace(/"[^"]*"|'[^']*'/g, m => `<span class="str">${m}</span>`);
    // Numbers with units
    esc = esc.replace(/\b\d+(?:\.\d+)?(?:px|em|rem|vh|vw|%|s|ms|deg|fr|ch|ex|vmin|vmax|pt|pc|cm|mm|in)?\b/g, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- Markdown source --- */
function highlightMarkdownSource(code) {
  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    if (/^# /.test(line))  return `<span class="mh1">${esc}</span>`;
    if (/^## /.test(line)) return `<span class="mh2">${esc}</span>`;
    if (/^### /.test(line)) return `<span class="mh3">${esc}</span>`;
    if (/^> /.test(line))  return `<span class="mbq">${esc}</span>`;
    if (/^```/.test(line)) return `<span class="mc">${esc}</span>`;
    // inline code
    esc = esc.replace(/`[^`]+`/g, m => `<span class="mc">${m}</span>`);
    // bold
    esc = esc.replace(/\*\*[^*]+\*\*/g, m => `<span class="mb">${m}</span>`);
    // italic
    esc = esc.replace(/\*[^*]+\*/g, m => `<span class="mi">${m}</span>`);
    // links
    esc = esc.replace(/\[[^\]]*\]\([^)]*\)/g, m => `<span class="mlnk">${m}</span>`);
    return esc;
  }).join('\n');
}

/* --- Generic fallback --- */
function highlightGeneric(code) {
  const lines = code.split('\n');
  return lines.map(line => {
    let esc = escapeHtml(line);
    esc = esc.replace(/#[^\n]*/g, m => `<span class="cmt">${m}</span>`);
    esc = esc.replace(/"[^"]*"|'[^']*'/g, m => `<span class="str">${m}</span>`);
    esc = esc.replace(/\b\d+(?:\.\d+)?\b/g, m => `<span class="num">${m}</span>`);
    return esc;
  }).join('\n');
}

/* ============================================================
   MARKDOWN RENDERER
   ============================================================ */
function renderMarkdown(md) {
  let html = '';
  const lines = md.split('\n');
  let i = 0;
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent = '';
  let inList = false;
  let listTag = '';
  let inTable = false;
  let tableRows = [];

  function closeList() {
    if (inList) {
      html += `</${listTag}>\n`;
      inList = false;
      listTag = '';
    }
  }

  function closeTable() {
    if (inTable) {
      html += '</tbody></table>\n';
      inTable = false;
      tableRows = [];
    }
  }

  function processInline(text) {
    // Bold italic
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Images (before links)
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    // Strikethrough
    text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
    return text;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code block start/end
    if (/^```/.test(line)) {
      if (!inCodeBlock) {
        closeList();
        closeTable();
        inCodeBlock = true;
        codeBlockLang = line.replace(/^```/, '').trim();
        codeBlockContent = '';
      } else {
        inCodeBlock = false;
        const escaped = escapeHtml(codeBlockContent.replace(/\n$/, ''));
        html += `<pre><code>${escaped}</code></pre>\n`;
        codeBlockContent = '';
        codeBlockLang = '';
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line.trim())) {
      closeList();
      closeTable();
      html += '<hr>\n';
      i++;
      continue;
    }

    // Headings
    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    const h4 = line.match(/^#### (.+)/);

    if (h1) { closeList(); closeTable(); html += `<h1>${processInline(h1[1])}</h1>\n`; i++; continue; }
    if (h2) { closeList(); closeTable(); html += `<h2>${processInline(h2[1])}</h2>\n`; i++; continue; }
    if (h3) { closeList(); closeTable(); html += `<h3>${processInline(h3[1])}</h3>\n`; i++; continue; }
    if (h4) { closeList(); closeTable(); html += `<h4>${processInline(h4[1])}</h4>\n`; i++; continue; }

    // Blockquote
    if (/^> /.test(line)) {
      closeList();
      closeTable();
      const content = line.replace(/^> /, '');
      html += `<blockquote><p>${processInline(content)}</p></blockquote>\n`;
      i++;
      continue;
    }

    // Table
    if (/^\|/.test(line)) {
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      const nextLine = lines[i + 1] || '';
      const isSeparator = /^\|[-| :]+\|$/.test(nextLine);
      if (isSeparator && !inTable) {
        closeList();
        html += '<table><thead><tr>';
        cells.forEach(c => { html += `<th>${processInline(c)}</th>`; });
        html += '</tr></thead><tbody>\n';
        inTable = true;
        i += 2; // skip separator
        continue;
      } else if (inTable && !isSeparator) {
        html += '<tr>';
        cells.forEach(c => { html += `<td>${processInline(c)}</td>`; });
        html += '</tr>\n';
        i++;
        continue;
      }
    } else {
      closeTable();
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+] (.+)/);
    if (ulMatch) {
      if (!inList || listTag !== 'ul') {
        closeList();
        html += '<ul>\n';
        inList = true;
        listTag = 'ul';
      }
      html += `<li>${processInline(ulMatch[1])}</li>\n`;
      i++;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\. (.+)/);
    if (olMatch) {
      if (!inList || listTag !== 'ol') {
        closeList();
        html += '<ol>\n';
        inList = true;
        listTag = 'ol';
      }
      html += `<li>${processInline(olMatch[1])}</li>\n`;
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      closeList();
      closeTable();
      i++;
      continue;
    }

    // Paragraph
    closeList();
    closeTable();
    html += `<p>${processInline(line)}</p>\n`;
    i++;
  }

  closeList();
  closeTable();
  if (inCodeBlock) {
    html += `<pre><code>${escapeHtml(codeBlockContent)}</code></pre>\n`;
  }

  return html;
}

/* ============================================================
   IMAGE EXTENSIONS
   ============================================================ */
const imageExts = new Set(['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'webp', 'bmp']);

function isImage(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return imageExts.has(ext);
}

/* ============================================================
   LANGUAGE → EXTENSION
   ============================================================ */
const languageMap = {
  'Markdown':   'md',
  'Rust':       'rs',
  'TypeScript': 'ts',
  'JavaScript': 'js',
  'Python':     'py',
  'C++':        'cpp',
  'C':          'c',
  'JSON':       'json',
  'CSS':        'css',
  'HTML':       'html',
  'YAML':       'yml',
  'TOML':       'toml',
  'Shell':      'sh',
  'Go':         'go',
  'Java':       'java',
  'Kotlin':     'kt',
  'Swift':      'swift'
};

const extToLanguage = {
  md: 'Markdown', mdx: 'Markdown',
  rs: 'Rust',
  ts: 'TypeScript', tsx: 'TypeScript',
  js: 'JavaScript', jsx: 'JavaScript',
  py: 'Python',
  cpp: 'C++', cc: 'C++', h: 'C/C++',
  c: 'C',
  json: 'JSON',
  css: 'CSS',
  scss: 'SCSS',
  html: 'HTML', htm: 'HTML',
  yml: 'YAML', yaml: 'YAML',
  toml: 'TOML',
  sh: 'Shell', bash: 'Shell',
  go: 'Go',
  java: 'Java',
  kt: 'Kotlin',
  swift: 'Swift'
};

/* ============================================================
   STATE
   ============================================================ */
let openTabs    = [];          // [{filename, mdMode:'preview'|'source'}]
let activeFile  = null;
let mdMode      = 'preview';   // 'preview' or 'source'
let allRepos    = [];
let reposFetched = false;
let currentLang = 'Markdown';

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const tabsEl         = document.getElementById('tabs');
const lineNums       = document.getElementById('line-numbers');
const codeArea       = document.getElementById('code-area');
const codeContent    = document.getElementById('code-content');
const statusLnCol    = document.getElementById('status-ln-col');
const statusSpaces   = document.getElementById('status-spaces');
const statusEncoding = document.getElementById('status-encoding');
const statusEol      = document.getElementById('status-eol');
const statusLang     = document.getElementById('status-lang');
const themeBtnEl     = document.getElementById('theme-btn');
const branchStatus   = document.getElementById('branch-status');
const dlZipBtn       = document.getElementById('dl-zip-btn');
const mdToggleBtn    = document.getElementById('md-toggle-btn');
const titleText      = document.getElementById('title-text');
const breadcrumbFolder = document.getElementById('breadcrumb-folder');
const breadcrumbFile   = document.getElementById('breadcrumb-file');
const overlay        = document.getElementById('command-palette-overlay');
const cmdInput       = document.getElementById('command-input');
const cmdList        = document.getElementById('command-list');
const accountsMenu   = document.getElementById('accounts-menu');
const accountsIcon   = document.getElementById('accounts-icon');
const searchInput    = document.getElementById('search-input');
const searchResults  = document.getElementById('search-results');
const reposList      = document.getElementById('repos-list');
const repoFilter     = document.getElementById('repo-filter');
const scStatus       = document.getElementById('sc-status');

/* ============================================================
   INJECT FILE BADGES INTO SIDEBAR
   ============================================================ */
function initFileBadges() {
  document.querySelectorAll('.file-list li').forEach(li => {
    const filename = li.getAttribute('data-file');
    if (filename) {
      const wrap = li.querySelector('.file-badge-wrap');
      if (wrap) wrap.innerHTML = getIcon(filename);
    }
  });
}

/* ============================================================
   TAB MANAGEMENT
   ============================================================ */
function renderTabs() {
  tabsEl.innerHTML = '';
  openTabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = 'tab' + (tab.filename === activeFile ? ' active' : '');
    el.dataset.file = tab.filename;
    el.innerHTML = `
      ${getIcon(tab.filename)}
      <span>${tab.filename}</span>
      <span class="tab-close" data-close="${tab.filename}">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
    `;
    el.addEventListener('click', ev => {
      if (ev.target.closest('[data-close]')) return;
      loadFile(tab.filename);
    });
    const closeBtn = el.querySelector('[data-close]');
    closeBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      closeTab(tab.filename);
    });
    tabsEl.appendChild(el);
  });
}

function openTab(filename) {
  if (!openTabs.find(t => t.filename === filename)) {
    openTabs.push({ filename, mdMode: 'preview' });
  }
  renderTabs();
}

function closeTab(filename) {
  openTabs = openTabs.filter(t => t.filename !== filename);
  if (activeFile === filename) {
    const next = openTabs[openTabs.length - 1];
    if (next) {
      loadFile(next.filename);
    } else {
      activeFile = null;
      codeArea.innerHTML = '<pre><code id="code-content"></code></pre>';
      lineNums.textContent = '';
      titleText.textContent = 'Yogya Chugh';
      mdToggleBtn.style.display = 'none';
      dlZipBtn.style.display = 'none';
    }
  }
  renderTabs();
  updateExplorerActive();
}

/* ============================================================
   FILE LOADING
   ============================================================ */
function loadFile(filename) {
  activeFile = filename;
  openTab(filename);

  // Update sidebar selection
  updateExplorerActive();
  renderTabs();

  // Update breadcrumb
  const folder = fileFolder[filename] || '';
  if (breadcrumbFolder) breadcrumbFolder.textContent = folder;
  if (breadcrumbFile) breadcrumbFile.textContent = filename;

  // Update title
  if (titleText) titleText.textContent = filename;

  // Determine extension
  const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : 'txt';
  const lang = extToLanguage[ext] || 'Plain Text';
  currentLang = lang;
  if (statusLang) statusLang.textContent = lang;

  // Image?
  if (isImage(filename)) {
    const rawUrl = `https://raw.githubusercontent.com/YogyaChugh/yogyachugh.github.io/main/${filename}`;
    codeArea.innerHTML = `<div class="image-viewer"><img src="${rawUrl}" alt="${filename}"></div>`;
    lineNums.textContent = '';
    mdToggleBtn.style.display = 'none';
    dlZipBtn.style.display = 'none';
    if (statusLang) statusLang.textContent = 'Image';
    return;
  }

  // Markdown?
  const isMd = ext === 'md' || ext === 'mdx';
  if (isMd) {
    mdToggleBtn.style.display = 'inline-flex';
    // Restore this tab's mode
    const tabObj = openTabs.find(t => t.filename === filename);
    mdMode = tabObj ? tabObj.mdMode : 'preview';
  } else {
    mdToggleBtn.style.display = 'none';
  }
  dlZipBtn.style.display = 'none';

  // Get content
  const content = fileData[filename];
  if (!content) {
    codeArea.innerHTML = `<pre><code id="code-content" style="color:var(--text-muted)">// File not found: ${filename}</code></pre>`;
    lineNums.textContent = '1';
    return;
  }

  if (isMd && mdMode === 'preview') {
    renderMarkdownPreview(content);
  } else {
    renderSource(content, ext);
  }
}

function renderMarkdownPreview(content) {
  const html = renderMarkdown(content);
  codeArea.innerHTML = `<div class="markdown-preview">${html}</div>`;
  lineNums.textContent = '';
  if (statusLang) statusLang.textContent = 'Markdown Preview';
}

function renderSource(content, ext) {
  const highlighted = highlightCode(content, ext);
  const lines = content.split('\n');
  lineNums.textContent = lines.map((_, i) => i + 1).join('\n');
  codeArea.innerHTML = `<pre><code id="code-content">${highlighted}</code></pre>`;

  // Cursor position tracking
  const pre = codeArea.querySelector('pre');
  if (pre) {
    pre.addEventListener('click', updateCursor);
    pre.addEventListener('keyup', updateCursor);
  }
  document.addEventListener('selectionchange', updateCursor);
  if (statusLang) statusLang.textContent = extToLanguage[ext] || 'Plain Text';
}

function updateExplorerActive() {
  document.querySelectorAll('.file-list li').forEach(li => {
    li.classList.toggle('active', li.dataset.file === activeFile);
  });
}

/* ============================================================
   CURSOR POSITION
   ============================================================ */
function updateCursor() {
  if (!statusLnCol) return;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const pre = codeArea.querySelector('pre');
  if (!pre) return;

  // Count chars from start of pre to range.startContainer
  try {
    const preRange = document.createRange();
    preRange.setStart(pre, 0);
    preRange.setEnd(range.startContainer, range.startOffset);
    const text = preRange.toString();
    const lineNum = (text.match(/\n/g) || []).length + 1;
    const lastNl = text.lastIndexOf('\n');
    const col = lastNl === -1 ? text.length + 1 : text.length - lastNl;
    statusLnCol.textContent = `Ln ${lineNum}, Col ${col}`;
  } catch (e) {
    // ignore
  }
}

/* ============================================================
   MD TOGGLE
   ============================================================ */
if (mdToggleBtn) {
  mdToggleBtn.addEventListener('click', () => {
    if (!activeFile) return;
    const ext = activeFile.split('.').pop().toLowerCase();
    if (ext !== 'md' && ext !== 'mdx') return;
    mdMode = mdMode === 'preview' ? 'source' : 'preview';
    // Update tab state
    const tabObj = openTabs.find(t => t.filename === activeFile);
    if (tabObj) tabObj.mdMode = mdMode;
    const content = fileData[activeFile];
    if (!content) return;
    if (mdMode === 'preview') {
      renderMarkdownPreview(content);
    } else {
      renderSource(content, ext);
    }
  });
}

/* ============================================================
   ACTIVITY BAR — SIDEBAR SWITCHING
   ============================================================ */
document.querySelectorAll('.activity-icon[data-sidebar]').forEach(icon => {
  icon.addEventListener('click', () => {
    const target = icon.dataset.sidebar;
    const isMobile = window.innerWidth <= 768;
    const sidebarElement = document.getElementById('sidebar');

    if (isMobile && icon.classList.contains('active')) {
      // Toggle sidebar off if clicking the already active icon
      sidebarElement.classList.toggle('open');
      return;
    }

    // Deactivate all
    document.querySelectorAll('.activity-icon').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.sidebar-view').forEach(v => v.classList.remove('active'));

    icon.classList.add('active');
    const view = document.getElementById(`sidebar-${target}`);
    if (view) view.classList.add('active');
    
    if (isMobile) {
      sidebarElement.classList.add('open');
    }

    // Source control auto-fetch
    if (target === 'source-control' && !reposFetched) {
      fetchGitHubRepos();
    }
  });
});

/* ============================================================
   FOLDER COLLAPSE / EXPAND
   ============================================================ */
document.querySelectorAll('.folder-title').forEach(title => {
  title.addEventListener('click', () => {
    const group = title.closest('.folder-group');
    if (group) {
      group.classList.toggle('expanded');
      group.classList.toggle('collapsed');
    }
  });
});

/* ============================================================
   FILE CLICK IN EXPLORER
   ============================================================ */
document.querySelectorAll('.file-list li').forEach(li => {
  li.addEventListener('click', () => {
    const filename = li.dataset.file;
    if (filename) loadFile(filename);
    
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

/* ============================================================
   GITHUB SOURCE CONTROL
   ============================================================ */
async function fetchGitHubRepos() {
  if (reposFetched) {
    renderRepos(allRepos);
    return;
  }
  scStatus.textContent = 'Fetching repositories...';
  reposList.innerHTML = '';

  try {
    const res = await fetch('https://api.github.com/users/YogyaChugh/repos?per_page=50&sort=updated');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allRepos = await res.json();
    reposFetched = true;
    scStatus.textContent = `${allRepos.length} repositories`;
    renderRepos(allRepos);
  } catch (err) {
    scStatus.textContent = `Failed to fetch: ${err.message}`;
    reposList.innerHTML = `<div style="color:var(--text-muted);font-size:12px;padding:4px 0;">Could not reach GitHub API. Check your connection.</div>`;
  }
}

const langColors = {
  Rust: '#dea584', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  Python: '#3572A5', 'C++': '#f34b7d', C: '#555555', Go: '#00ADD8',
  Java: '#b07219', Kotlin: '#A97BFF', Swift: '#F05138', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Vue: '#42b883', React: '#61dafb'
};

function renderRepos(repos) {
  reposList.innerHTML = '';
  if (!repos || repos.length === 0) {
    reposList.innerHTML = '<div style="color:var(--text-muted);font-size:12px;">No repositories found.</div>';
    return;
  }
  repos.forEach(repo => {
    const item = document.createElement('div');
    item.className = 'repo-item';
    const langColor = langColors[repo.language] || '#858585';
    const desc = repo.description ? repo.description.slice(0, 80) + (repo.description.length > 80 ? '…' : '') : 'No description';
    item.innerHTML = `
      <div class="repo-item-name">${escapeHtml(repo.name)}</div>
      <div class="repo-item-desc">${escapeHtml(desc)}</div>
      <div class="repo-item-meta">
        ${repo.language ? `<span><span class="repo-lang-dot" style="background:${langColor}"></span>${escapeHtml(repo.language)}</span>` : ''}
        <span>★ ${repo.stargazers_count}</span>
        ${repo.fork ? '<span>fork</span>' : ''}
      </div>
    `;
    item.addEventListener('click', async () => {
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
      try {
        codeArea.innerHTML = `<div class="markdown-preview" style="padding:24px;">Loading ${escapeHtml(repo.name)} README...</div>`;
        lineNums.textContent = '';
        if (breadcrumbFile) breadcrumbFile.textContent = 'README.md';
        if (breadcrumbFolder) breadcrumbFolder.textContent = repo.name;
        
        // Try fetching README from default branch
        let res = await fetch(`https://raw.githubusercontent.com/YogyaChugh/${repo.name}/${repo.default_branch}/README.md`);
        if (!res.ok) {
          // Fallback to lower case readme
          res = await fetch(`https://raw.githubusercontent.com/YogyaChugh/${repo.name}/${repo.default_branch}/readme.md`);
        }
        
        let content = '';
        if (!res.ok) {
          content = `# ${repo.name}\n\n*No README.md found in this repository.*`;
        } else {
          content = await res.text();
        }
        
        renderMarkdownPreview(content);
        
        // Prepend the View on GitHub button
        const btnHtml = `<div style="margin-bottom: 24px;"><a href="${repo.html_url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:var(--accent-color);color:#fff;border-radius:4px;text-decoration:none;font-weight:500;font-size:13px;transition:opacity 0.2s;"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> View on GitHub</a></div>`;
        const preview = codeArea.querySelector('.markdown-preview');
        if (preview) {
          preview.insertAdjacentHTML('afterbegin', btnHtml);
        }
        
        // Hide sidebar on mobile when a repo is opened
        if (window.innerWidth <= 768) {
          document.getElementById('sidebar').classList.remove('open');
        }
      } catch (err) {
        renderMarkdownPreview(`# Error\nFailed to fetch README for ${repo.name}.`);
      }
    });
    reposList.appendChild(item);
  });
}

/* Repo filter */
if (repoFilter) {
  repoFilter.addEventListener('input', () => {
    const q = repoFilter.value.toLowerCase();
    const filtered = allRepos.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q)
    );
    renderRepos(filtered);
    scStatus.textContent = `${filtered.length} of ${allRepos.length} repositories`;
  });
}

/* ============================================================
   SEARCH
   ============================================================ */
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }

    let html = '';
    let totalMatches = 0;

    Object.entries(fileData).forEach(([filename, content]) => {
      const lines = content.split('\n');
      const matches = [];
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(q)) {
          matches.push({ line: idx + 1, text: line.trim() });
        }
      });
      if (matches.length > 0) {
        totalMatches += matches.length;
        html += `<div class="search-file-group">`;
        html += `<div class="search-file-header">${getIcon(filename)} ${escapeHtml(filename)}</div>`;
        matches.slice(0, 5).forEach(m => {
          const highlighted = escapeHtml(m.text).replace(
            new RegExp(escapeHtml(q), 'gi'),
            match => `<span class="search-highlight">${match}</span>`
          );
          html += `<div class="search-match" data-file="${escapeHtml(filename)}" data-line="${m.line}">
            <span style="color:var(--text-muted);margin-right:8px;">${m.line}</span>${highlighted}
          </div>`;
        });
        if (matches.length > 5) {
          html += `<div style="color:var(--text-muted);font-size:11px;padding:2px 8px;">+${matches.length - 5} more matches</div>`;
        }
        html += `</div>`;
      }
    });

    if (!html) {
      searchResults.innerHTML = `<div class="search-no-results">No results for "${escapeHtml(q)}"</div>`;
    } else {
      searchResults.innerHTML = html;
      // Click on match → open file
      searchResults.querySelectorAll('.search-match').forEach(el => {
        el.addEventListener('click', () => {
          loadFile(el.dataset.file);
          if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
          }
        });
      });
    }
  });
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
let commandSelected = -1;
let commandItems    = [];

const defaultCommands = [
  { icon: '🎨', label: 'Change Color Theme',      action: 'theme-list' },
  { icon: '📂', label: 'Open File...',             action: 'file-list' },
  { icon: '👁', label: 'Toggle Markdown Preview',  action: 'toggle-md' },
  { icon: '🔧', label: 'Change Language Mode',     action: 'lang-list' },
  { icon: '⬇', label: 'Change Indentation',       action: 'indent-list' },
  { icon: '🗄', label: 'Close Repository',         action: 'close-repo' }
];

function openCommandPalette(items, placeholder) {
  overlay.style.display = 'flex';
  cmdInput.value = '';
  cmdInput.placeholder = placeholder || "Type '>' to show commands...";
  renderCommandList(items || defaultCommands);
  commandSelected = -1;
  setTimeout(() => cmdInput.focus(), 50);
}

function closeCommandPalette() {
  overlay.style.display = 'none';
}

function renderCommandList(items) {
  commandItems = items;
  cmdList.innerHTML = '';
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'command-item';
    li.innerHTML = `
      <span class="command-item-icon">${item.icon || ''}</span>
      <span class="command-item-label">${item.label}</span>
      ${item.desc ? `<span class="command-item-desc">${item.desc}</span>` : ''}
    `;
    li.addEventListener('click', () => executeCommand(item));
    li.addEventListener('mouseenter', () => {
      document.querySelectorAll('.command-item').forEach(el => el.classList.remove('selected'));
      li.classList.add('selected');
      commandSelected = idx;
    });
    cmdList.appendChild(li);
  });
}

function executeCommand(item) {
  if (!item) return;

  if (item.action === 'theme-list') {
    const themeItems = themes.map(t => ({
      icon: '🎨',
      label: t.label,
      action: 'apply-theme',
      themeId: t.id
    }));
    renderCommandList(themeItems);
    cmdInput.placeholder = 'Select Color Theme';
    return;
  }

  if (item.action === 'file-list') {
    const fileItems = Object.keys(fileData).map(f => ({
      icon: '',
      label: f,
      iconHtml: getIcon(f),
      action: 'open-file',
      filename: f
    }));
    renderCommandList(fileItems);
    cmdInput.placeholder = 'Select File to Open';
    return;
  }

  if (item.action === 'lang-list') {
    const langItems = Object.keys(languageMap).map(l => ({
      icon: '',
      label: l,
      action: 'set-lang',
      lang: l
    }));
    renderCommandList(langItems);
    cmdInput.placeholder = 'Select Language Mode';
    return;
  }

  if (item.action === 'indent-list') {
    const indentItems = [
      { icon: '', label: '2 Spaces', action: 'set-indent', value: 2 },
      { icon: '', label: '4 Spaces', action: 'set-indent', value: 4 },
      { icon: '', label: 'Tab', action: 'set-indent', value: 'tab' }
    ];
    renderCommandList(indentItems);
    cmdInput.placeholder = 'Select Indentation';
    return;
  }

  if (item.action === 'apply-theme') {
    applyTheme(item.themeId);
    closeCommandPalette();
    return;
  }

  if (item.action === 'open-file') {
    loadFile(item.filename);
    closeCommandPalette();
    return;
  }

  if (item.action === 'toggle-md') {
    if (mdToggleBtn) mdToggleBtn.click();
    closeCommandPalette();
    return;
  }

  if (item.action === 'close-repo') {
    dlZipBtn.style.display = 'none';
    closeCommandPalette();
    return;
  }

  if (item.action === 'set-lang') {
    if (statusLang) statusLang.textContent = item.lang;
    currentLang = item.lang;
    closeCommandPalette();
    return;
  }

  if (item.action === 'set-indent') {
    const label = item.value === 'tab' ? 'Tab' : `Spaces: ${item.value}`;
    if (statusSpaces) statusSpaces.textContent = label;
    closeCommandPalette();
    return;
  }

  if (item.action === 'encoding-list') {
    const items2 = ['UTF-8','UTF-16','Latin-1'].map(e => ({
      icon: '', label: e, action: 'set-encoding', enc: e
    }));
    renderCommandList(items2);
    return;
  }

  if (item.action === 'set-encoding') {
    if (statusEncoding) statusEncoding.textContent = item.enc;
    closeCommandPalette();
    return;
  }

  if (item.action === 'eol-list') {
    const items3 = ['LF','CRLF','CR'].map(e => ({
      icon: '', label: e, action: 'set-eol', eol: e
    }));
    renderCommandList(items3);
    return;
  }

  if (item.action === 'set-eol') {
    if (statusEol) statusEol.textContent = item.eol;
    closeCommandPalette();
    return;
  }

  closeCommandPalette();
}

/* Command input handler */
if (cmdInput) {
  cmdInput.addEventListener('input', () => {
    const val = cmdInput.value;
    if (val.startsWith('>')) {
      // Filter commands
      const q = val.slice(1).trim().toLowerCase();
      const filtered = defaultCommands.filter(c => c.label.toLowerCase().includes(q));
      renderCommandList(filtered.length ? filtered : defaultCommands);
    } else if (val.trim()) {
      // Fuzzy search files
      const q = val.toLowerCase();
      const fileItems = Object.keys(fileData)
        .filter(f => f.toLowerCase().includes(q))
        .map(f => ({ icon: '', label: f, action: 'open-file', filename: f }));
      renderCommandList(fileItems);
    } else {
      renderCommandList(defaultCommands);
    }
    commandSelected = -1;
  });

  cmdInput.addEventListener('keydown', ev => {
    const items = cmdList.querySelectorAll('.command-item');
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      commandSelected = Math.min(commandSelected + 1, items.length - 1);
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      commandSelected = Math.max(commandSelected - 1, 0);
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      if (commandSelected >= 0 && commandItems[commandSelected]) {
        executeCommand(commandItems[commandSelected]);
      } else if (commandItems[0]) {
        executeCommand(commandItems[0]);
      }
      return;
    } else if (ev.key === 'Escape') {
      closeCommandPalette();
      return;
    }

    items.forEach((el, i) => {
      el.classList.toggle('selected', i === commandSelected);
    });
    if (items[commandSelected]) {
      items[commandSelected].scrollIntoView({ block: 'nearest' });
    }
  });
}

/* Close on overlay click */
if (overlay) {
  overlay.addEventListener('click', ev => {
    if (ev.target === overlay) closeCommandPalette();
  });
}

/* Global keyboard shortcut */
document.addEventListener('keydown', ev => {
  if ((ev.ctrlKey || ev.metaKey) && ev.key === 'p') {
    ev.preventDefault();
    if (overlay.style.display === 'none' || !overlay.style.display) {
      openCommandPalette(defaultCommands);
    } else {
      closeCommandPalette();
    }
  }
  if (ev.key === 'Escape' && overlay.style.display !== 'none') {
    closeCommandPalette();
  }
});

/* ============================================================
   STATUS BAR INTERACTIVITY
   ============================================================ */
if (branchStatus) {
  branchStatus.addEventListener('click', () => openCommandPalette(defaultCommands));
}

if (statusLnCol) {
  statusLnCol.addEventListener('click', () => {
    alert('Go to Line... (mock)\nType a line number to navigate.');
  });
}

if (statusSpaces) {
  statusSpaces.addEventListener('click', () => {
    openCommandPalette([
      { icon: '', label: '2 Spaces', action: 'set-indent', value: 2 },
      { icon: '', label: '4 Spaces', action: 'set-indent', value: 4 },
      { icon: '', label: 'Tab', action: 'set-indent', value: 'tab' }
    ], 'Select Indentation');
  });
}

if (statusEncoding) {
  statusEncoding.addEventListener('click', () => {
    openCommandPalette([
      { icon: '', label: 'UTF-8',    action: 'set-encoding', enc: 'UTF-8' },
      { icon: '', label: 'UTF-16',   action: 'set-encoding', enc: 'UTF-16' },
      { icon: '', label: 'Latin-1',  action: 'set-encoding', enc: 'Latin-1' }
    ], 'Select Encoding');
  });
}

if (statusEol) {
  statusEol.addEventListener('click', () => {
    openCommandPalette([
      { icon: '', label: 'LF',   action: 'set-eol', eol: 'LF' },
      { icon: '', label: 'CRLF', action: 'set-eol', eol: 'CRLF' },
      { icon: '', label: 'CR',   action: 'set-eol', eol: 'CR' }
    ], 'Select End of Line Sequence');
  });
}

if (statusLang) {
  statusLang.addEventListener('click', () => {
    openCommandPalette(
      Object.keys(languageMap).map(l => ({ icon: '', label: l, action: 'set-lang', lang: l })),
      'Select Language Mode'
    );
  });
}

if (themeBtnEl) {
  themeBtnEl.addEventListener('click', () => {
    openCommandPalette(
      themes.map(t => ({ icon: '🎨', label: t.label, action: 'apply-theme', themeId: t.id })),
      'Select Color Theme'
    );
  });
}

/* ============================================================
   ACCOUNTS MENU
   ============================================================ */
if (accountsIcon) {
  accountsIcon.addEventListener('click', ev => {
    ev.stopPropagation();
    const visible = accountsMenu.style.display !== 'none';
    accountsMenu.style.display = visible ? 'none' : 'block';
  });
}

document.addEventListener('click', ev => {
  if (accountsMenu && !accountsMenu.contains(ev.target) && ev.target !== accountsIcon) {
    accountsMenu.style.display = 'none';
  }
});

/* ============================================================
});

/* ============================================================
   INITIALIZE
   ============================================================ */
(function init() {
  // Apply saved theme
  const savedTheme = localStorage.getItem('ide-theme') || 'dark-plus';
  applyTheme(savedTheme);

  // Inject file badges
  initFileBadges();

  // Load default file
  loadFile('about.md');
})();
