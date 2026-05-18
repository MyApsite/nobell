"""Replace 'островной отдых' tag/filter with 'ПРИБРЕЖНЫЙ ОТЕЛЬ' across all detail pages and guide.html.
Underlying data-type and ?type= change from 'islands' to 'coastal-hotel' to merge with existing filter."""
import re, glob, os

ROOT = os.path.dirname(os.path.abspath(__file__))

for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    orig = c
    name = os.path.basename(f)

    # 1. Remove duplicate filter button (only in guide.html)
    if name == 'guide.html':
        c = re.sub(
            r'\s*<button type="button" class="guide-btn" data-type="islands">островной отдых</button>',
            '',
            c
        )

    # 2. Replace data-type="islands" with data-type="coastal-hotel"
    # Handle multi-types like "wellness islands" → "wellness coastal-hotel"
    c = re.sub(r'data-type="islands"', 'data-type="coastal-hotel"', c)
    c = re.sub(r'(data-type="[^"]*?)\bislands\b([^"]*")', r'\1coastal-hotel\2', c)
    # Collapse "coastal-hotel coastal-hotel" if it accidentally appears (when card has both already)
    c = re.sub(r'\bcoastal-hotel\s+coastal-hotel\b', 'coastal-hotel', c)

    # 3. Replace tag <a href="...?type=islands" class="villa-tag">островной отдых</a>
    # with href ?type=coastal-hotel and text ПРИБРЕЖНЫЙ ОТЕЛЬ
    c = re.sub(
        r'<a href="([^"]+)\?type=islands" class="villa-tag">островной отдых</a>',
        r'<a href="\1?type=coastal-hotel" class="villa-tag">прибрежный отель</a>',
        c
    )

    # 4. Update meta keywords / descriptions
    c = c.replace('островной отдых,', 'прибрежный отель,')
    c = c.replace('островной отдых ', 'прибрежный отель ')  # trailing space case
    # Edge: "островной отдых" at end of meta keywords (no comma after)
    c = re.sub(r'(keywords"\s+content="[^"]*?)островной отдых([",])', r'\1прибрежный отель\2', c)

    if c != orig:
        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(c)
        print(f'{name}: updated')
