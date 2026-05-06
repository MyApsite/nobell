"""Fix existing <picture> blocks where <source srcset="X.png|jpg"> points to non-webp.
Replace with <source type="image/webp" srcset="X.webp"> if webp exists."""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# Match <source srcset="X.png|jpg">  (NOT already pointing to webp)
SRC_TAG = re.compile(
    r'<source\s+srcset="(assets/images/[^"]+\.(?:png|jpg|jpeg))"([^>]*)>',
    re.IGNORECASE
)

def webp_exists(src):
    base, _ = os.path.splitext(src)
    return os.path.exists(os.path.join(ROOT, base + '.webp'))

total = 0
files_changed = []
for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    name = os.path.basename(f)
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()

    def repl(m):
        global total
        src = m.group(1)
        attrs = m.group(2)
        if not webp_exists(src):
            return m.group(0)
        base, _ = os.path.splitext(src)
        webp = base + '.webp'
        # Add type="image/webp" if not present, keep other attrs (like media=)
        if 'type=' not in attrs:
            attrs = ' type="image/webp"' + attrs
        total += 1
        return f'<source srcset="{webp}"{attrs}>'

    new_c = SRC_TAG.sub(repl, c)
    if new_c != c:
        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(new_c)
        files_changed.append(name)

print(f"=== {len(files_changed)} files, {total} <source> tags switched to .webp ===")
for n in files_changed:
    print(f"  {n}")
