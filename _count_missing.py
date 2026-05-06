"""Count cards in each catalog that don't have a detail page (href='#' or file missing)."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
CATALOGS = ['guide.html', 'watches.html', 'cars.html', 'prime-residences.html', 'calendar.html']

def cards_in(path):
    """Find cards in main catalog grid (.guide__cards or .cars-grid)."""
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    # Find catalog section (cards grid). Match <a class="product" href="X"> within guide__cards or cars-grid.
    # First narrow to grid section.
    grids = re.findall(r'<div class="(?:guide__cards|cars-grid)"[^>]*>(.*?)</div>\s*<div class="(?:guide__footer|cars__footer)', c, re.DOTALL)
    if not grids:
        # fallback: try to grab everything between guide__cards and the section/main close
        m = re.search(r'<div class="(?:guide__cards|cars-grid)"[^>]*>(.*)', c, re.DOTALL)
        grids = [m.group(1) if m else '']
    section = grids[0]
    # Extract card hrefs and titles
    cards = []
    for m in re.finditer(r'<a\s+href="([^"]*)"[^>]*class="product"', section):
        href = m.group(1)
        # find following <h3 class="product__title">TITLE</h3>
        rest = section[m.end():m.end()+800]
        tm = re.search(r'<h3 class="product__title">([^<]+)</h3>', rest)
        title = tm.group(1).strip() if tm else '???'
        cards.append((href, title))
    return cards

print(f"=== Missing detail pages by catalog ===\n")
total_missing = 0
total_cards = 0
for cat in CATALOGS:
    path = os.path.join(ROOT, cat)
    if not os.path.exists(path):
        continue
    cards = cards_in(path)
    missing = []
    for href, title in cards:
        if href in ('', '#'):
            missing.append((href, title, 'href=#'))
        elif href.endswith('.html'):
            target = os.path.join(ROOT, href.split('?')[0].split('#')[0])
            if not os.path.exists(target):
                missing.append((href, title, 'file missing'))
    total_cards += len(cards)
    total_missing += len(missing)
    print(f"{cat}: {len(cards)} cards, {len(missing)} missing detail pages")
    for href, title, reason in missing:
        print(f"  - [{reason}] {title[:70]}")
    print()

print(f"=== Summary: {total_missing} missing of {total_cards} total cards ===")
