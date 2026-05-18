"""Add load-more button hide logic to all 5 catalog filter scripts."""
import re

CATALOGS = ['guide.html', 'watches.html', 'prime-residences.html', 'cars.html', 'calendar.html']

# Pattern: after resultsLabel update inside applyFilters(), add button hide logic
# Match: `resultsLabel.textContent = '...';` followed by `}` (closing the if-block) then `}` (closing applyFilters)

# Strategy: add `loadMoreBtn` query at top + hide logic inside applyFilters

for f in CATALOGS:
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()

    if 'loadMoreBtn' in c:
        print(f'{f}: already patched')
        continue

    # Find: var resultsLabel = document.querySelector('.guide__results');
    # Add right after: var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');
    new_c = re.sub(
        r"(var resultsLabel = document\.querySelector\('\.guide__results'\);)",
        r"\1\n        var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');",
        c
    )

    # Find: `if (resultsLabel) { resultsLabel.textContent = ...; }` inside applyFilters
    # Add right after the closing `}` of if(resultsLabel): hide button when all shown
    new_c = re.sub(
        r"(if \(resultsLabel\) \{\s*\n\s*resultsLabel\.textContent = [^\n]+\n\s*\})",
        r"""\1
          if (loadMoreBtn) {
            // Кнопка "Загрузить больше" — ховається коли всі картки видно (немає пагінації).
            // Коли пагінація буде реалізована — змінити умову на (visible < total_in_db).
            loadMoreBtn.style.display = (visible >= cards.length) ? 'none' : '';
          }""",
        new_c
    )

    if new_c != c:
        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(new_c)
        print(f'{f}: patched')
    else:
        print(f'{f}: NO MATCH')
