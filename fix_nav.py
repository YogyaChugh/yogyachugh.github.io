import os

def fix_nav(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    changed = False
    if '<nav class="floating-dock">' in text:
        text = text.replace('<nav class="floating-dock">', '<nav class="floating-dock" aria-label="Main Navigation">')
        changed = True
    if '<a href="/writing.html" class="dock-link active">' in text:
        text = text.replace('<a href="/writing.html" class="dock-link active">', '<a href="/writing.html" class="dock-link active" aria-current="page">')
        changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)

for root, _, files in os.walk('.'):
    if 'vendor' in root: continue
    for f in files:
        if f.endswith('.html') and 'blogs' in root:
            fix_nav(os.path.join(root, f))
