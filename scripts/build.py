"""
build.py — Jinja2 build-generator for nobell.com.

Phase 1 (cars-pilot):
  - Reads content/cars/*.md frontmatter
  - Renders each as dist/<slug>.html via templates/cars-detail.html.tpl
  - Spotlight cascade: every page lists all 12 cars in document-defined order

Future:
  - cars.html catalog (templates/cars.html.tpl)
  - watches/guide/calendar/prime-residences
  - sitemap.xml + assets/search-index.json regeneration
  - copy assets/ → dist/assets/

Usage:
  python scripts/build.py            # render all
  python scripts/build.py <slug>...  # render only specified slugs
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader, StrictUndefined


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
TEMPLATES_DIR = ROOT / "templates"
DIST_DIR = ROOT / "dist"


# Category metadata: how to address each category in the breadcrumb / spotlight CTA / etc.
CATEGORIES = {
    "cars": {
        "label": "ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ",
        "href": "cars.html",
        "detail_tpl": "cars-detail.html.tpl",
    },
}


def load_frontmatter(md_path: Path) -> dict:
    """Read a YAML-frontmatter markdown file and return the parsed dict."""
    text = md_path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not m:
        raise ValueError(f"{md_path}: missing YAML frontmatter")
    return yaml.safe_load(m.group(1)) or {}


def load_category(slug: str) -> list[dict]:
    """Load all content/<slug>/*.md and return them as a list."""
    items = []
    for path in sorted((CONTENT_DIR / slug).glob("*.md")):
        items.append(load_frontmatter(path))
    return items


def get_sibling_order(category: str, pages: list[dict]) -> list[dict]:
    """Spotlight slide order = original cars.html catalog order.

    The frontmatter `card.card_image_base` ends in /card-N. Sort by that N.
    """
    def card_index(p: dict) -> int:
        base = (p.get("card") or {}).get("card_image_base", "")
        m = re.search(r"card-(\d+)$", base)
        return int(m.group(1)) if m else 999
    return sorted(pages, key=card_index)


def render_category(category: str, env: Environment, only_slugs: set[str] | None):
    cat_meta = CATEGORIES[category]
    pages = load_category(category)
    siblings = get_sibling_order(category, pages)
    tpl = env.get_template(cat_meta["detail_tpl"])

    DIST_DIR.mkdir(parents=True, exist_ok=True)
    n_done = 0
    for page in pages:
        if only_slugs and page["slug"] not in only_slugs:
            continue
        body_types = {b.get("type") for b in (page.get("body") or [])}
        ctx = {
            "page": page,
            "siblings": siblings,
            "category_label": cat_meta["label"],
            "category_href": cat_meta["href"],
            "category_only": False,
            "crumbs": page.get("breadcrumb", []),
            "has_hero": "hero" in body_types,
            "has_grid": "grid_2col" in body_types,
        }
        html = tpl.render(**ctx).lstrip()
        out_path = DIST_DIR / f"{page['slug']}.html"
        out_path.write_bytes(html.encode("utf-8"))
        n_done += 1
        print(f"  OK   dist/{page['slug']}.html")
    print(f"Rendered {n_done} {category} detail-pages")


def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        undefined=StrictUndefined,
        keep_trailing_newline=True,
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    for cat in CATEGORIES:
        render_category(cat, env, only)


if __name__ == "__main__":
    main()
