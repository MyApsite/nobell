"""
build.py — Jinja2 build-generator for nobell.com.

Renders all category catalogs + detail-pages from content/<category>/*.md
into dist/*.html via Jinja2 templates.

Categories:
  cars / watches / guide / calendar / prime-residences

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


CATEGORIES = {
    "cars": {
        "label": "ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ",
        "href": "cars.html",
        "spotlight_title": "In the Spotlight",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "cars.html.tpl",
        "filter_partial": "_cars-filter.html.tpl",
    },
    "watches": {
        "label": "ШЕДЕВРЫ ЧАСОВОГО ИСКУССТВА",
        "href": "watches.html",
        "spotlight_title": "Masterpieces of Time",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_watches-filter.html.tpl",
    },
    "guide": {
        "label": "ГИД ПО ОТЕЛЯМ И ЯХТАМ",
        "href": "guide.html",
        "spotlight_title": "In the Spotlight",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_guide-filter.html.tpl",
    },
    "calendar": {
        "label": "КАЛЕНДАРЬ КЛЮЧЕВЫХ МЕРОПРИЯТИЙ",
        "href": "calendar.html",
        "spotlight_title": "Global Calendar",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_calendar-filter.html.tpl",
    },
    "prime-residences": {
        "label": "ЗАРУБЕЖНАЯ НЕДВИЖИМОСТЬ",
        "href": "prime-residences.html",
        "spotlight_title": "Prime Residences",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_prime-residences-filter.html.tpl",
    },
}


def load_frontmatter(md_path: Path) -> dict:
    text = md_path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not m:
        raise ValueError(f"{md_path}: missing YAML frontmatter")
    return yaml.safe_load(m.group(1)) or {}


def load_category(slug: str) -> tuple[list[dict], dict | None]:
    items: list[dict] = []
    index: dict | None = None
    for path in sorted((CONTENT_DIR / slug).glob("*.md")):
        data = load_frontmatter(path)
        if path.name.startswith("_index."):
            index = data
        else:
            items.append(data)
    return items, index


def get_sibling_order(pages: list[dict]) -> list[dict]:
    """Order pages by card-N index (original catalog order)."""
    def card_index(p: dict) -> int:
        base = (p.get("card") or {}).get("card_image_base", "")
        m = re.search(r"card-(\d+)$", base)
        return int(m.group(1)) if m else 999
    return sorted(pages, key=card_index)


def render_category(category: str, env: Environment, only_slugs: set[str] | None):
    cat_meta = CATEGORIES[category]
    pages, catalog = load_category(category)
    siblings = get_sibling_order(pages)
    by_slug = {p["slug"]: p for p in pages}
    detail_tpl = env.get_template(cat_meta["detail_tpl"])

    DIST_DIR.mkdir(parents=True, exist_ok=True)

    n_done = 0
    for page in pages:
        if only_slugs and page["slug"] not in only_slugs:
            continue
        body_types = {b.get("type") for b in (page.get("body") or [])}
        # Spotlight uses the per-page spotlight_slugs list (preserves "exclude self"
        # behavior on prime-residences). Falls back to all siblings.
        slugs = page.get("spotlight_slugs") or [p["slug"] for p in siblings]
        spotlight = [by_slug[s] for s in slugs if s in by_slug]
        ctx = {
            "page": page,
            "siblings": siblings,
            "spotlight": spotlight,
            "category_label": cat_meta["label"],
            "category_href": cat_meta["href"],
            "spotlight_title": cat_meta.get("spotlight_title", "In the Spotlight"),
            "category_only": False,
            "crumbs": page.get("breadcrumb", []),
            "has_hero": "hero" in body_types,
            "has_grid": "grid_2col" in body_types,
        }
        html = detail_tpl.render(**ctx).lstrip()
        out_path = DIST_DIR / f"{page['slug']}.html"
        out_path.write_bytes(html.encode("utf-8"))
        n_done += 1
        print(f"  OK   dist/{page['slug']}.html")

    catalog_render = "catalog_tpl" in cat_meta and catalog is not None
    if catalog_render:
        if not (TEMPLATES_DIR / cat_meta["catalog_tpl"]).exists():
            print(f"  SKIP catalog: template {cat_meta['catalog_tpl']} not yet created")
        elif not only_slugs or catalog["slug"] in only_slugs:
            catalog_tpl = env.get_template(cat_meta["catalog_tpl"])
            ctx = {
                "page": catalog,
                "items": siblings,
                "catalog": catalog,
                "category_label": cat_meta["label"],
                "category_href": cat_meta["href"],
                "category_only": True,
                "crumbs": [],
                "filter_partial": cat_meta.get("filter_partial"),
            }
            html = catalog_tpl.render(**ctx).lstrip()
            out_path = DIST_DIR / f"{catalog['slug']}.html"
            out_path.write_bytes(html.encode("utf-8"))
            print(f"  OK   dist/{catalog['slug']}.html  (catalog)")

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
        if (CONTENT_DIR / cat).exists():
            render_category(cat, env, only)


if __name__ == "__main__":
    main()
