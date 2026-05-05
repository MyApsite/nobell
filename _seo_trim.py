"""Trim long <title> (>90 chars) and meta description (>200 chars) to SEO-friendly lengths.
Preserves brand suffix '| Nobell' on titles. Trims descriptions to ~155 chars at word boundary."""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP = re.compile(r'recommendation-(original|server)(\.local-backup)?\.html|index-mob\.html')

TITLE_MAX = 70  # Google shows ~60-70 chars
DESC_MAX = 160  # Google shows ~155 chars

def trim_title(title):
    if len(title) <= TITLE_MAX:
        return title, False
    # Try to keep "| Nobell" suffix
    if '| Nobell' in title:
        head, _, _ = title.rpartition('| Nobell')
        head = head.strip(' —-')
        # Trim head before the em-dash if present
        if ' — ' in head:
            head = head.split(' — ')[0]
        candidate = f"{head} | Nobell"
        if len(candidate) <= TITLE_MAX:
            return candidate, True
        # Still too long — hard truncate head
        avail = TITLE_MAX - len(' | Nobell') - 1
        head = head[:avail].rstrip(' ,;.—-')
        return f"{head} | Nobell", True
    # No brand suffix — just trim
    return title[:TITLE_MAX].rstrip(' ,;.—-') + '...', True

def trim_desc(desc):
    if len(desc) <= DESC_MAX:
        return desc, False
    # Trim at word boundary
    cut = desc[:DESC_MAX]
    last_space = cut.rfind(' ')
    if last_space > DESC_MAX - 30:
        cut = cut[:last_space]
    return cut.rstrip(' ,;.—-') + '.', True

modified = []
for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    name = os.path.basename(f)
    if SKIP.search(name):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()

    changes = []

    # Trim <title>
    m = re.search(r'<title>([^<]+)</title>', content)
    if m:
        new_title, changed = trim_title(m.group(1))
        if changed:
            content = content.replace(f'<title>{m.group(1)}</title>', f'<title>{new_title}</title>')
            changes.append(f'title: {len(m.group(1))} -> {len(new_title)} chars')

    # Trim meta name="description" — both name="description" and og:description and twitter:description
    for tag, pattern in [
        ('description', r'<meta name="description" content="([^"]+)"'),
        ('og:description', r'property="og:description"\s+content="([^"]+)"'),
        ('twitter:description', r'name="twitter:description"\s+content="([^"]+)"'),
    ]:
        for m in list(re.finditer(pattern, content)):
            old = m.group(1)
            new, changed = trim_desc(old)
            if changed:
                content = content.replace(f'content="{old}"', f'content="{new}"', 1)
                changes.append(f'{tag}: {len(old)} -> {len(new)} chars')

    if changes:
        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(content)
        modified.append((name, changes))

print(f"=== Modified {len(modified)} files ===\n")
for name, changes in modified:
    print(f"{name}:")
    for c in changes:
        print(f"  - {c}")
