"""Build the comic landing pages for the yogya.dev project subdomains. Re-runnable; writes into ../yogya-subsites/<repo>."""
import html, io, json, os, shutil, subprocess, sys, urllib.parse
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = r'C:\UrDad\Projects\yogya-subsites'
SITE = r'C:\UrDad\Projects\Yogya'
EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
TODAY = '2026-10-04'
PERSON = {'@type': 'Person', '@id': 'https://yogya.dev/#person', 'name': 'Yogya Chugh', 'url': 'https://yogya.dev/',
          'sameAs': ['https://github.com/YogyaChugh', 'https://www.linkedin.com/in/yogyachugh']}
GH_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>'

def rel(name, url):
    return 'https://github.com/YogyaChugh/%s/releases/latest/download/%s' % (name, url)

P = {
 'webelo': dict(repo='Webelo', out='', name='Webelo', kind='SoftwareApplication', category='DeveloperApplication', os='Windows, Linux',
   chips=['C++', 'Python', 'DOM library'], expr='curious',
   title='Webelo: the DOM, rebuilt in C++',
   desc="Webelo is Yogya Chugh's C++ implementation of the WHATWG DOM standard, with Python bindings and a viewer that draws any web page as a tree.",
   says="I wanted to know how a browser reads a web page, so I built that part myself.",
   lead='The part of a browser that understands a web page, <mark>rebuilt from the official WHATWG spec</mark> in C++.',
   ctas=[('Download the viewer', 'https://github.com/YogyaChugh/Webelo/releases/latest', ''), ('Read the docs ↗', 'https://webelo.onrender.com', 'white'), ('The story →', 'https://yogya.dev/blogs/whatwg_dom', 'white')],
   hero=(SITE + r'\assets\projects\webelo.jpg', 'cover', '#232A4D'),
   feats=[('Follows the standard', 'Nodes, trees, traversal and events, built the way the WHATWG DOM Living Standard defines them.'),
          ('See the tree', 'The viewer draws any page’s HTML as the DOM tree a browser would build from it.'),
          ('C++ or Python', 'Include one C++ source file in your project, or use the Python bindings.')],
   get=[('Get the viewer', [('Windows', rel('Webelo', 'Webelo.exe')), ('Linux', rel('Webelo', 'Webelo-Linux'))], 'Version 2.0, from GitHub releases.'),
        ('Use the library', None, '<pre class="code">git clone https://github.com/YogyaChugh/Webelo.git</pre><p>Then include <code>src/Webelo.cpp</code> and you’re set.</p>')]),
 'webber': dict(repo='Webber', out='', name='Webber', kind='SoftwareApplication', category='UtilitiesApplication', os='Windows, Linux',
   chips=['Python', 'Pygame', 'Desktop app'], expr='smile',
   title='Webber: save websites to read offline',
   desc='Webber is a desktop app by Yogya Chugh that downloads whole websites, with their styles, scripts and images, so you can read them offline.',
   says='For the days I want to read docs without the internet pulling me away.',
   lead='Download a website once, then <mark>read it offline</mark> whenever you like.',
   ctas=[('Download', 'https://github.com/YogyaChugh/Webber/releases/latest', '')],
   hero=(ROOT + r'\Webber\assets\main_logo_webber.png', 'contain', '#2A1B3D'),
   feats=[('The whole page', 'HTML, styles, scripts and images, tidied up so the page still works offline.'),
          ('A window or a command', 'Use the app’s window, or run it from the command line with your own settings.'),
          ('Plays fair', 'Only for sites that allow downloading. Sites like YouTube are off-limits.')],
   get=[('Download Webber', [('Windows', rel('Webber', 'Webber-Windows.exe')), ('Linux', rel('Webber', 'Webber-Linux')), ('AppImage', rel('Webber', 'Webber-x86_64.AppImage'))], 'Version 1.0, from GitHub releases.'),
        ('Run it from source', None, '<pre class="code">python src/main.py</pre><p>Or <code>python src/website.py</code> for the command line. Setup steps are in the README.</p>')]),
 'safario': dict(repo='Safario', out='site', name='Safario', kind='WebApplication', category='TravelApplication', os='Web browser',
   chips=['React', 'TypeScript', 'Web3'], expr='happy',
   title='Safario: a digital ID for tourists',
   desc='Safario is a Web3 digital ID app for tourists, built by Yogya Chugh and team for Smart India Hackathon: register once, carry a verifiable ID with a QR code.',
   says='We built this as a team for Smart India Hackathon. It got us through the internal rounds.',
   lead='A <mark>digital ID for tourists</mark>, backed by the blockchain and ready to show as a QR code.',
   ctas=[('Open the app →', 'play/', '')],
   hero=(HERE + r'\safario-live.png', 'phone', '#F1F0FB'),
   feats=[('A smart ID', 'Register once and get a verifiable ID card, with a QR code for quick checks.'),
          ('Two languages, two themes', 'English and Hindi, in light or dark mode.'),
          ('Made for travel', 'Maps, an SOS button, and a step-by-step sign-up with ID photos.')],
   get=[('Try it', None, '<p style="margin-top:0">It’s a hackathon prototype, so please don’t enter real ID details.</p><div class="row" style="margin-top:10px"><a class="btn" href="play/">Open the app →</a></div>')]),
 'votes': dict(repo='Vote-Leaderboard', out='docs', name='Vote Leaderboard', kind='SoftwareApplication', category='UtilitiesApplication', os='Windows, Linux',
   chips=['Python', 'Pygame', 'Summer of Making'], expr='smug',
   title="Vote Leaderboard for Hack Club's Summer of Making",
   desc="Vote Leaderboard is Yogya Chugh's desktop app that ranked every voter in Hack Club's Summer of Making 2025, straight from the Summer of Making API.",
   says='In Summer of Making, voting decided how fast your project got certified. So I built a scoreboard.',
   lead="A live leaderboard of every voter in <mark>Hack Club's Summer of Making</mark>.",
   ctas=[('Download', 'https://github.com/YogyaChugh/Vote-Leaderboard/releases/latest', '')],
   hero=(HERE + r'\vote1.png', 'cover', '#F3E3C4'),
   feats=[('Straight from Hack Club', 'Every user and their vote count, from the Summer of Making API.'),
          ('Ranked and paged', 'Sorted from the top, a page at a time, with a refresh button.'),
          ('A desktop app', 'Built in Pygame, for Windows and Linux.')],
   get=[('Download', [('Windows', rel('Vote-Leaderboard', 'Vote-Leaderboard.exe')), ('Linux', rel('Vote-Leaderboard', 'Vote-Leaderboard-Linux'))], 'Version 0.1, from GitHub releases. Built for Summer of Making 2025.')]),
 'timberly': dict(repo='Timberly', out='', name='Timberly', kind='VideoGame', category='GameApplication', os='Web browser, Windows, macOS, Linux',
   chips=['Python', 'Pygame', 'Game'], expr='happy',
   title='Timberly: a lumberjack game with an online leaderboard',
   desc='Timberly is a lumberjack game by Yogya Chugh: chop the tree, dodge the branches and beat your friends on the online leaderboard. Play in your browser or on Windows, macOS and Linux.',
   says="Hey, let's make a game! This one has a leaderboard, so you can beat your friends.",
   lead='Chop the tree, dodge the branches, and beat your friends on the <mark>online leaderboard</mark>.',
   ctas=[('Play in your browser ↗', 'https://yogya-chugh.itch.io/timberly', '')],
   hero=(HERE + r'\timberly-2.img', 'cover', '#E07A2C'),
   feats=[('Online leaderboard', 'Every score goes on the board, so you can fight for the top spot.'),
          ('Learn as you play', 'A short in-game guide teaches the basics.'),
          ('Plays everywhere', 'In the browser on desktop and phone, or on Windows, macOS and Linux.')],
   get=[('Download Timberly', [('Windows', rel('Timberly', 'Timberly.exe')), ('macOS', rel('Timberly', 'Timberly-Mac')), ('Linux', rel('Timberly', 'Timberly-Linux'))], 'Version 2.0, from GitHub releases.'),
        ('Credits', None, '<p style="margin-top:0">Timberly uses art and sounds by many generous people. <a href="https://timber-credits.onrender.com">See the credits ↗</a></p>')]),
 'island': dict(repo='Western-Upside-Down-Island', out='', name='Western Upside-Down Island', kind='VideoGame', category='GameApplication', os='Web browser',
   chips=['JavaScript', 'Phaser', 'Game'], expr='curious',
   title='Western Upside-Down Island: a game where gravity runs backwards',
   desc="Western Upside-Down Island is Yogya Chugh's browser game for the Summer of Making Grand Survey map: an island where a curse turned gravity upside down.",
   says='My island for the Summer of Making Grand Survey map.',
   lead='An island where <mark>gravity runs backwards</mark>, all because of one small mistake.',
   ctas=[('Play now →', 'play/', '')],
   hero=(HERE + r'\island-live.png', 'cover', '#1E1E1E'),
   story='Long ago, Saint Ditchi was meditating in the forests of the West when a cockroach scared him. He killed it, and it rose again as an angry angel with a curse: if his family ever set foot on the ground, gravity would flip. Generations later, they still live upside down.',
   feats=[('Play in your browser', 'Nothing to install. It runs right on this page.'),
          ('Built with Phaser', 'Pixel art, an elevator and an explorer who isn’t from around here.'),
          ('Part of a bigger map', 'One island in Summer of Making’s Grand Survey expedition.')],
   get=[]),
 'snake': dict(repo='SnakeGame', out='', name='Snake Hustle', kind='VideoGame', category='GameApplication', os='Web browser, Windows, Linux',
   chips=['Python', 'Flet', 'Game'], expr='smug',
   title="Snake Hustle: Nokia's Snake, taken further",
   desc="Snake Hustle is Yogya Chugh's take on Nokia's Snake, built in Python with Flet: play it in your browser or on Windows and Linux.",
   says="I'd already made a basic Snake in Pygame. This is the one where I kept going.",
   lead="<mark>Nokia's Snake</mark>, taken further. Play it in your browser or on your desktop.",
   ctas=[('Play in your browser ↗', 'https://snakehustle.netlify.app/', '')],
   hero=(HERE + r'\snake-readme.png', 'cover', '#2F5D3A'),
   feats=[('Classic controls', 'Steer, eat the fruit, grow, and reset when it goes wrong.'),
          ('One codebase', 'Built with Flet, so the same Python runs on the web and the desktop.'),
          ('More to come', 'New maps, snake skins and multiplayer are on the list.')],
   get=[('Download', [('Windows', rel('SnakeGame', 'Snake_Game_Windows.exe')), ('Linux', rel('SnakeGame', 'Snake_Hustler_Linux'))], 'Version 1.0, from GitHub releases.')]),
}
ORDER = ['webelo', 'webber', 'safario', 'votes', 'timberly', 'island', 'snake']

def esc(s): return html.escape(s, quote=True)

def page(key, p):
    url = 'https://%s.yogya.dev/' % key
    card = url + 'page/card.jpg'
    repo_url = 'https://github.com/YogyaChugh/' + p['repo']
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'WebPage', '@id': url + '#webpage', 'url': url, 'name': p['title'], 'description': p['desc'], 'inLanguage': 'en',
         'isPartOf': {'@type': 'WebSite', '@id': 'https://yogya.dev/#website', 'name': 'Yogya Chugh', 'url': 'https://yogya.dev/'},
         'about': {'@id': url + '#app'}, 'author': {'@id': PERSON['@id']}, 'primaryImageOfPage': card, 'dateModified': TODAY + 'T00:00:00+05:30'},
        {'@type': p['kind'], '@id': url + '#app', 'name': p['name'], 'description': p['desc'], 'url': url, 'image': card,
         'applicationCategory': p['category'], 'operatingSystem': p['os'], 'author': PERSON, 'creator': {'@id': PERSON['@id']},
         'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'USD'}, 'sameAs': [repo_url]},
    ]}
    if p['kind'] == 'VideoGame':
        ld['@graph'][1]['gamePlatform'] = p['os']
    ctas = ''.join('<a class="btn %s" href="%s">%s</a>' % (cls, esc(href), esc(label)) for label, href, cls in p['ctas'])
    ctas += '<a class="btn white" href="%s">%s Code</a>' % (repo_url, GH_ICON)
    img_path, mode, bg = p['hero']
    art_cls = {'cover': 'art', 'contain': 'art contain', 'phone': 'art phone'}[mode]
    w, h = Image.open(os.path.join(dest(key, p), 'page', 'hero.webp')).size
    story = '<p class="story">%s</p>\n' % esc(p['story']) if p.get('story') else ''
    feats = ''.join('<article class="feat"><h3>%s</h3><p>%s</p></article>' % (esc(t), esc(d)) for t, d in p['feats'])
    gets = ''
    for title, links, note in p['get']:
        inner = ''
        if links:
            inner += '<div class="row">' + ''.join('<a class="btn %s" href="%s">%s ↓</a>' % ('' if i == 0 else 'white', esc(u), esc(l)) for i, (l, u) in enumerate(links)) + '</div>'
            inner += '<p>%s</p>' % note
        else:
            inner += note
        gets += '<div class="get-box"><h3>%s</h3>%s</div>' % (esc(title), inner)
    get_section = ('''  <section class="page" style="--pr:.2deg" aria-labelledby="get-t">
    <header class="page-title"><h2 id="get-t"><span class="tag">Get it</span>%s</h2></header>
    <div class="get">%s</div>
  </section>
''' % ('Download and run' if any(l for _, l, _ in p['get']) else 'Try it', gets)) if p['get'] else ''
    others = ''.join('<li><a href="https://%s.yogya.dev/">%s</a></li>' % (k, esc(P[k]['name'])) for k in ORDER if k != key)
    chips = ''.join('<li>%s</li>' % esc(c) for c in p['chips'])
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(p['title'])} · Yogya Chugh</title>
<meta name="description" content="{esc(p['desc'])}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{url}">
<meta name="author" content="Yogya Chugh">
<meta name="theme-color" content="#E8473F">
<link rel="icon" href="https://yogya.dev/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="512x512" href="https://yogya.dev/favicon.png">
<link rel="apple-touch-icon" href="https://yogya.dev/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Yogya Chugh">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(p['title'])}">
<meta property="og:description" content="{esc(p['desc'])}">
<meta property="og:image" content="{card}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(p['name'])}, a project by Yogya Chugh">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(p['title'])}">
<meta name="twitter:description" content="{esc(p['desc'])}">
<meta name="twitter:image" content="{card}">
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="page/project.css?v=1">
<script>window.goatcounter = {{ path: function (p) {{ return location.host + p; }} }};</script>
<script data-goatcounter="https://yogya.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body>
<main>
  <section class="page" style="--pr:-.3deg" aria-label="{esc(p['name'])}">
    <div class="cover-in">
      <div class="mast">
        <div>
          <p class="series">A project by <a href="https://yogya.dev/">Yogya Chugh</a></p>
          <h1>{esc(p['name'])}</h1>
          <ul class="chips">{chips}</ul>
        </div>
        <a class="home" href="https://yogya.dev/">← yogya.dev</a>
      </div>
      <div class="hero">
        <div>
          <div class="says"><img src="page/yogya.webp" alt="Yogya Chugh, drawn as a comic character" width="68" height="68"><p class="bub">{esc(p['says'])}</p></div>
          <p class="lead">{p['lead']}</p>
          <div class="ctas">{ctas}</div>
        </div>
        <div class="{art_cls}" style="--art:{bg}"><img src="page/hero.webp" alt="{esc(p['name'])} screenshot" width="{w}" height="{h}"></div>
      </div>
    </div>
  </section>

  <section class="page" style="--pr:.25deg" aria-labelledby="what-t">
    <header class="page-title"><h2 id="what-t"><span class="tag">What it does</span>{esc(p['name'])}, in short</h2></header>
    {story}<div class="feats">{feats}</div>
  </section>

{get_section}  <footer class="page credit" style="--pr:-.2deg">
    <img src="page/yogya.webp" alt="" width="96" height="96">
    <div>
      <h2>Made by Yogya Chugh</h2>
      <p>A software engineer in Delhi who builds things to find out how they work. See all of it, as a comic, at <a href="https://yogya.dev/">yogya.dev</a>.</p>
      <ul class="others" aria-label="More projects">{others}</ul>
    </div>
  </footer>
  <p class="foot">© 2026 Yogya Chugh · <a href="{repo_url}">Source on GitHub</a></p>
</main>
</body>
</html>
'''

def dest(key, p):
    return os.path.join(ROOT, p['repo'], p['out']) if p['out'] else os.path.join(ROOT, p['repo'])

def assets(key, p):
    d = os.path.join(dest(key, p), 'page'); os.makedirs(d, exist_ok=True)
    shutil.copy(os.path.join(HERE, 'project.css'), os.path.join(d, 'project.css'))
    av = Image.open(r'C:\UrDad\Projects\Yogya-unused\assets\yogya-avatar-transparent.png').convert('RGBA')
    av = av.crop(av.getbbox()); av.thumbnail((200, 200)); av.save(os.path.join(d, 'yogya.webp'), quality=88, method=6)
    src, mode, bg = p['hero']
    im = Image.open(src)
    im = im.convert('RGBA') if mode == 'contain' else im.convert('RGB')
    if mode == 'phone':
        im = im.crop((0, 0, im.width, min(im.height, round(im.width * 16 / 9))))
    im.thumbnail((1100, 1100))
    im.save(os.path.join(d, 'hero.webp'), quality=82, method=6)
    url = 'https://%s.yogya.dev/' % key
    root = dest(key, p)
    io.open(os.path.join(root, 'robots.txt'), 'w', encoding='utf-8', newline='\n').write(
        'User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n' % url)
    io.open(os.path.join(root, 'sitemap.xml'), 'w', encoding='utf-8', newline='\n').write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        '  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n</urlset>\n' % (url, TODAY))
    io.open(os.path.join(root, 'CNAME'), 'w', encoding='utf-8', newline='\n').write('%s.yogya.dev\n' % key)

def card(key, p):
    d = os.path.join(dest(key, p), 'page')
    src, mode, bg = p['hero']
    q = urllib.parse.urlencode({'k': 'A project by Yogya Chugh', 't': p['name'], 'b': html.unescape(p['lead'].replace('<mark>', '').replace('</mark>', '')),
                                'u': '%s.yogya.dev' % key, 'img': 'file:///' + os.path.join(d, 'hero.webp').replace('\\', '/'), 'mode': '' if mode == 'cover' else mode, 'bg': bg})
    png = os.path.join(HERE, 'card-%s.png' % key)
    subprocess.run([EDGE, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
                    '--user-data-dir=' + os.path.join(HERE, 'edge-card'), '--window-size=1200,630', '--virtual-time-budget=5000',
                    '--screenshot=' + png, 'file:///' + os.path.join(HERE, 'pcard.html').replace('\\', '/') + '?' + q], capture_output=True)
    Image.open(png).convert('RGB').save(os.path.join(d, 'card.jpg'), quality=84, optimize=True, progressive=True)

if __name__ == '__main__':
    only = sys.argv[1:] or ORDER
    for key in only:
        p = P[key]
        assets(key, p)
        io.open(os.path.join(dest(key, p), 'index.html'), 'w', encoding='utf-8', newline='\n').write(page(key, p))
        card(key, p)
        print('built', key, '->', dest(key, p))
