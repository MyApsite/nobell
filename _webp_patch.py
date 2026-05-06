"""Wrap <img src="assets/images/X.png|jpg"> in <picture><source srcset="X.webp">...</picture>.

Skips:
- <img> already inside <picture>
- <img> whose .webp counterpart doesn't exist
- non-asset paths (logos, favicons, etc)
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))

# Tracks state of being inside <picture>...</picture>
PICTURE_OPEN = re.compile(r'<picture\b', re.IGNORECASE)
PICTURE_CLOSE = re.compile(r'</picture\s*>', re.IGNORECASE)

# Match <img ...> tag — captures full tag and src
IMG_TAG = re.compile(r'<img\b[^>]*?\bsrc="([^"]+\.(?:png|jpg|jpeg))"[^>]*?>', re.IGNORECASE)

def webp_exists(src):
    """Check if X.webp exists for given X.png|jpg path (relative to ROOT)."""
    base, _ = os.path.splitext(src)
    webp_path = os.path.join(ROOT, base + '.webp')
    return os.path.exists(webp_path)

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    out = []
    pos = 0
    inside_picture = False
    replacements = 0

    # Walk the content, tracking <picture> state
    while pos < len(content):
        # Look for next <picture>, </picture>, or <img>
        m_open = PICTURE_OPEN.search(content, pos)
        m_close = PICTURE_CLOSE.search(content, pos)
        m_img = IMG_TAG.search(content, pos)

        # Determine which comes first
        candidates = [(m.start(), kind, m) for m, kind in
                      [(m_open, 'open'), (m_close, 'close'), (m_img, 'img')] if m]
        if not candidates:
            out.append(content[pos:])
            break

        candidates.sort()
        first_pos, kind, m = candidates[0]
        out.append(content[pos:first_pos])

        if kind == 'open':
            inside_picture = True
            out.append(content[first_pos:m.end()])
            pos = m.end()
        elif kind == 'close':
            inside_picture = False
            out.append(content[first_pos:m.end()])
            pos = m.end()
        elif kind == 'img':
            full_tag = m.group(0)
            src = m.group(1)
            # Skip if inside <picture> or webp doesn't exist or src not in assets/images/
            if inside_picture or not src.startswith('assets/images/') or not webp_exists(src):
                out.append(full_tag)
            else:
                base, _ = os.path.splitext(src)
                webp_src = base + '.webp'
                wrapped = f'<picture><source type="image/webp" srcset="{webp_src}">{full_tag}</picture>'
                out.append(wrapped)
                replacements += 1
            pos = m.end()

    new_content = ''.join(out)
    if new_content != content:
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
    return replacements

# Process all HTML files
total_replacements = 0
modified_files = []
for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    name = os.path.basename(f)
    n = process_file(f)
    if n > 0:
        modified_files.append((name, n))
        total_replacements += n

print(f"=== {len(modified_files)} files modified, {total_replacements} <img> wrapped ===")
for name, n in modified_files:
    print(f"  {name}: +{n}")
