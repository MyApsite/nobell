"""SEO audit — runs on local repo (= prod after FTP sync). Reports issues only."""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP = re.compile(r'recommendation-(original|server)(\.local-backup)?\.html|index-mob\.html')

# Patterns
P_TITLE = re.compile(r'<title>([^<]+)</title>', re.IGNORECASE)
P_DESC = re.compile(r'<meta\s+name="description"\s+content="([^"]+)"', re.IGNORECASE)
P_KEYWORDS = re.compile(r'<meta\s+name="keywords"\s+content="([^"]+)"', re.IGNORECASE)
P_CANON = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.IGNORECASE)
P_OG_URL = re.compile(r'property="og:url"\s+content="([^"]+)"', re.IGNORECASE)
P_OG_IMG = re.compile(r'property="og:image"\s+content="([^"]+)"', re.IGNORECASE)
P_OG_TITLE = re.compile(r'property="og:title"', re.IGNORECASE)
P_OG_DESC = re.compile(r'property="og:description"', re.IGNORECASE)
P_TWITTER = re.compile(r'name="twitter:card"', re.IGNORECASE)
P_HTML_LANG = re.compile(r'<html[^>]*\blang="([^"]+)"', re.IGNORECASE)
P_H1 = re.compile(r'<h1\b', re.IGNORECASE)
P_IMG = re.compile(r'<img\b[^>]*>', re.IGNORECASE)
P_IMG_ALT = re.compile(r'\balt=', re.IGNORECASE)

def first(p, content):
    m = p.search(content)
    return m.group(1) if m else None

issues_by_file = {}
all_titles = {}
all_descs = {}

for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    name = os.path.basename(f)
    if SKIP.search(name):
        continue

    with open(f, 'r', encoding='utf-8', errors='replace') as fh:
        c = fh.read()

    issues = []
    expected_canon = f"https://nobell.com/{name}"

    title = first(P_TITLE, c)
    if not title:
        issues.append("missing <title>")
    else:
        if len(title) > 90:
            issues.append(f"title too long ({len(title)} chars)")
        if len(title) < 10:
            issues.append(f"title too short ({len(title)} chars): '{title}'")
        all_titles.setdefault(title, []).append(name)

    desc = first(P_DESC, c)
    if not desc:
        issues.append("missing meta description")
    else:
        if len(desc) > 200:
            issues.append(f"description too long ({len(desc)} chars)")
        if len(desc) < 50:
            issues.append(f"description too short ({len(desc)} chars)")
        all_descs.setdefault(desc, []).append(name)

    if not first(P_KEYWORDS, c):
        issues.append("missing meta keywords")

    canon = first(P_CANON, c)
    if not canon:
        issues.append("missing rel=canonical")
    elif canon != expected_canon:
        issues.append(f"canonical mismatch: {canon} != {expected_canon}")

    ogurl = first(P_OG_URL, c)
    if not ogurl:
        issues.append("missing og:url")
    elif ogurl != expected_canon:
        issues.append(f"og:url mismatch: {ogurl} != {expected_canon}")

    if not first(P_OG_IMG, c):
        issues.append("missing og:image")
    if not P_OG_TITLE.search(c):
        issues.append("missing og:title")
    if not P_OG_DESC.search(c):
        issues.append("missing og:description")
    if not P_TWITTER.search(c):
        issues.append("missing twitter:card")

    lang = first(P_HTML_LANG, c)
    if not lang:
        issues.append("missing lang= on <html>")

    h1_count = len(P_H1.findall(c))
    if h1_count == 0:
        issues.append("no <h1>")
    elif h1_count > 1:
        issues.append(f"multiple <h1> ({h1_count})")

    imgs = P_IMG.findall(c)
    no_alt = sum(1 for img in imgs if not P_IMG_ALT.search(img))
    if no_alt > 0:
        issues.append(f"{no_alt} <img> without alt=")

    if issues:
        issues_by_file[name] = issues

# Find duplicates
dup_titles = {t: pages for t, pages in all_titles.items() if len(pages) > 1}
dup_descs = {d: pages for d, pages in all_descs.items() if len(pages) > 1}

# Report
total_issues = sum(len(v) for v in issues_by_file.values())
print(f"=== SEO audit: {len(issues_by_file)} pages with {total_issues} issues ===\n")

for name in sorted(issues_by_file):
    print(f"\n{name}:")
    for i in issues_by_file[name]:
        print(f"  - {i}")

if dup_titles:
    print(f"\n\n=== DUPLICATE titles: {len(dup_titles)} groups ===")
    for t, pages in dup_titles.items():
        print(f"\n  '{t[:80]}{'...' if len(t)>80 else ''}'")
        for p in pages:
            print(f"    - {p}")

if dup_descs:
    print(f"\n=== DUPLICATE descriptions: {len(dup_descs)} groups ===")
    for d, pages in dup_descs.items():
        print(f"\n  '{d[:80]}{'...' if len(d)>80 else ''}'")
        for p in pages:
            print(f"    - {p}")

# Sitemap check
sitemap_path = os.path.join(ROOT, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as fh:
        sm = fh.read()
    sitemap_urls = set(re.findall(r'<loc>https://nobell\.com/([^<]+)</loc>', sm))
    all_pages = {os.path.basename(f) for f in glob.glob(os.path.join(ROOT, '*.html')) if not SKIP.search(os.path.basename(f))}
    # index.html may be listed as just "/"
    sitemap_urls_normalized = {u if u else 'index.html' for u in sitemap_urls}
    missing_in_sitemap = sorted(all_pages - sitemap_urls_normalized)
    extra_in_sitemap = sorted(sitemap_urls_normalized - all_pages - {''})

    if missing_in_sitemap:
        print(f"\n=== Pages NOT in sitemap.xml ({len(missing_in_sitemap)}) ===")
        for p in missing_in_sitemap:
            print(f"  - {p}")
    if extra_in_sitemap:
        print(f"\n=== Sitemap entries NOT existing as files ({len(extra_in_sitemap)}) ===")
        for p in extra_in_sitemap:
            print(f"  - {p}")

print(f"\n=== Summary ===")
print(f"Total HTML pages audited: {len(glob.glob(os.path.join(ROOT, '*.html'))) - sum(1 for f in glob.glob(os.path.join(ROOT, '*.html')) if SKIP.search(os.path.basename(f)))}")
print(f"Pages with issues: {len(issues_by_file)}")
print(f"Total issues: {total_issues}")
print(f"Duplicate titles: {len(dup_titles)}")
print(f"Duplicate descriptions: {len(dup_descs)}")
