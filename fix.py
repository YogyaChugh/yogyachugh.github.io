import os

def fix_file(path):
    with open(path, 'rb') as f:
        c = f.read()
    
    text = c.decode('utf-8', errors='replace')
    text = text.replace('â€”', '&mdash;')
    text = text.replace('â€“', '&ndash;')
    text = text.replace('â€œ', '&ldquo;')
    text = text.replace('â€', '&rdquo;')
    text = text.replace('â€˜', '&lsquo;')
    text = text.replace('â€™', '&rsquo;')
    text = text.replace('Â·', '&middot;')
    text = text.replace('ï¿½', '&mdash;') # Just in case

    with open(path, 'wb') as f:
        f.write(text.encode('utf-8'))

for root, _, files in os.walk('.'):
    if 'vendor' in root: continue
    for f in files:
        if f.endswith('.html'):
            fix_file(os.path.join(root, f))
