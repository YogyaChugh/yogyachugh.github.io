"""Refresh the "Meanwhile... on GitHub" numbers baked into index.html.

The page also refreshes them live in the browser; this keeps the HTML itself current
for search engines and for visitors whose browser can't reach the stats service.
Run by .github/workflows/contributions.yml once a day. Standard library only.
"""
import datetime
import io
import json
import re
import urllib.request

SRC = 'https://github-contributions-api.jogruber.de/v4/YogyaChugh?y=last'
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December']


def main():
    data = json.load(urllib.request.urlopen(SRC, timeout=30))
    days = data['contributions']
    sums = {}
    for d in days:
        sums[d['date'][:7]] = sums.get(d['date'][:7], 0) + d['count']
    keys = sorted(sums)[-12:]
    top = max(1, max(sums[k] for k in keys))
    bars = ''.join(
        '<span class="%s" style="--h:%.3f" data-m="%s" title="%s %s: %d"><i></i></span>' % (
            'top' if sums[k] == top else ('hot' if sums[k] / top >= .4 else ''),
            sums[k] / top, MONTHS[int(k[5:]) - 1][0], MONTHS[int(k[5:]) - 1], k[:4], sums[k])
        for k in keys)
    total = data['total']['lastYear']
    active = [d for d in days if d['count'] > 0]
    last = datetime.date.fromisoformat(active[-1]['date'])
    last_text = '%d %s' % (last.day, last.strftime('%b %Y'))

    path = 'index.html'
    s = io.open(path, encoding='utf-8', newline='').read()
    before = s
    s = re.sub(r'(<span class="gh-num" id="gh-num">)[^<]*(</span>)', r'\g<1>%d\2' % total, s)
    s = re.sub(r'(<span class="gh-last" id="gh-last">)[^<]*(</span>)', r'\g<1>Last one: %s\2' % last_text, s)
    s = re.sub(r'(<div class="gh-bars" id="gh-bars"[^>]*>).*?(</div>)', lambda m: m.group(1) + bars + m.group(2), s, flags=re.S)
    if s == before:
        print('No change.')
        return
    io.open(path, 'w', encoding='utf-8', newline='').write(s)

    # the homepage changed, so its sitemap date does too
    sm = io.open('sitemap.xml', encoding='utf-8', newline='').read()
    today = datetime.date.today().isoformat()
    sm = re.sub(r'(<loc>https://yogya\.dev/</loc>\s*<lastmod>)[^<]*(</lastmod>)', r'\g<1>%s\2' % today, sm)
    io.open('sitemap.xml', 'w', encoding='utf-8', newline='').write(sm)
    print('Updated: %d contributions, last %s.' % (total, last_text))


if __name__ == '__main__':
    main()