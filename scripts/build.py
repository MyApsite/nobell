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
        "filter_partial": "_filter.html.tpl",
    },
    "watches": {
        "label": "ШЕДЕВРЫ ЧАСОВОГО ИСКУССТВА",
        "href": "watches.html",
        "spotlight_title": "Masterpieces of Time",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_filter.html.tpl",
    },
    "guide": {
        "label": "АЛЬМАНАХ ПУТЕШЕСТВИЙ",
        "href": "guide.html",
        "spotlight_title": "In the Spotlight",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_filter.html.tpl",
    },
    "calendar": {
        "label": "КАЛЕНДАРЬ КЛЮЧЕВЫХ МЕРОПРИЯТИЙ",
        "href": "calendar.html",
        "spotlight_title": "Global Calendar",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_filter.html.tpl",
    },
    "prime-residences": {
        "label": "ЗАРУБЕЖНАЯ НЕДВИЖИМОСТЬ",
        "href": "prime-residences.html",
        "spotlight_title": "Prime Residences",
        "detail_tpl": "cars-detail.html.tpl",
        "catalog_tpl": "catalog.html.tpl",
        "filter_partial": "_filter.html.tpl",
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
            # Always reflect the real catalog size — overrides any stale value
            # in _index.md so adding/removing detail pages never leaves the
            # "Показаны X из Y" count out of date.
            catalog["total_results"] = len(siblings)
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
    # Static pages keep their hand-built layout; we surgically inject JSON-LD
    # into <head> and copy them into dist/ so the whole deployable set
    # carries Schema.org.
    if not only:
        inject_schema_into_static()
        regen_sitemap()
        regen_search_index()


# ──────────────────────────────────────────────────────────────────
# Sitemap + search-index regeneration
#
# Both files reflect the deployable set of pages: 60 build-gen outputs in
# dist/ plus 9 hand-authored static pages still living at root (index/team/
# contacts/services/app/example/privacy/recommendation/search). Mobile and
# *.local-backup variants stay out.

SITEMAP_BASE_URL = "https://nobell.com"

# Static (non-build-gen) root pages worth indexing. Skip mobile-only redirects
# (index-mob, app-mob), search results page, recommendation backups/variants.
STATIC_PAGES = [
    "index.html", "team.html", "contacts.html", "services.html",
    "app.html", "example.html", "privacy.html", "recommendation.html",
    "terms.html", "registration.html",
]


def inject_schema_into_static():
    """Copy each STATIC_PAGES file into dist/ with JSON-LD added before </head>.

    Layout, scripts, CSS and content remain untouched — this only adds the
    Schema.org microdata block (Organization + WebSite + BreadcrumbList +
    WebPage) so static pages match the build-gen pages for Google rich
    results coverage.
    """
    import html as html_mod
    import json
    for name in STATIC_PAGES:
        src = ROOT / name
        if not src.exists():
            continue
        html = src.read_text(encoding="utf-8")
        # Skip if already has JSON-LD (don't double-inject)
        if "application/ld+json" in html:
            (DIST_DIR / name).write_text(html, encoding="utf-8")
            continue

        canonical = _extract_meta_link(html, "canonical") or f"{SITEMAP_BASE_URL}/{name}"
        title = _extract_first(html, r"<title>(.+?)</title>")
        desc = _extract_meta(html, "description")
        og_image = _extract_meta(html, prop="og:image")
        h1 = _extract_first(html, r"<h1[^>]*>(.+?)</h1>")
        # Strip any inline tags from h1
        h1_clean = re.sub(r"<[^>]+>", "", h1).strip()
        # Last <span> in .breadcrumbs is the current page label
        bc_span = _extract_first(html, r'class="breadcrumbs">.*?<span>([^<]+)</span>\s*</div>')
        page_label = bc_span or h1_clean or title

        graph = [
            {
                "@type": "Organization", "@id": f"{SITEMAP_BASE_URL}#organization",
                "name": "Nobell", "url": SITEMAP_BASE_URL,
                "logo": f"{SITEMAP_BASE_URL}/assets/images/logo.svg",
                "sameAs": [
                    "https://instagram.com/nobell", "https://twitter.com/nobell",
                    "https://facebook.com/nobell", "https://youtube.com/@nobell"
                ],
            },
            {
                "@type": "WebSite", "@id": f"{SITEMAP_BASE_URL}#website",
                "url": SITEMAP_BASE_URL, "name": "Nobell",
                "publisher": {"@id": f"{SITEMAP_BASE_URL}#organization"},
                "inLanguage": "ru-RU",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {"@type": "EntryPoint", "urlTemplate": f"{SITEMAP_BASE_URL}/search.html?s={{search_term_string}}"},
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "BreadcrumbList", "@id": f"{canonical}#breadcrumb",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Главная", "item": f"{SITEMAP_BASE_URL}/"},
                ] + ([{"@type": "ListItem", "position": 2, "name": page_label}] if name != "index.html" and page_label else []),
            },
            {
                "@type": "WebPage", "@id": f"{canonical}#webpage",
                "url": canonical, "name": title, "description": desc,
                "isPartOf": {"@id": f"{SITEMAP_BASE_URL}#website"},
                "breadcrumb": {"@id": f"{canonical}#breadcrumb"},
                **({"image": og_image} if og_image else {}),
                "inLanguage": "ru-RU",
            },
        ]
        ld_json = {"@context": "https://schema.org", "@graph": graph}
        block = (
            '  <script type="application/ld+json">\n'
            + json.dumps(ld_json, ensure_ascii=False, indent=2)
            + "\n  </script>\n"
        )
        # Insert before </head>
        new_html = html.replace("</head>", block + "</head>", 1)
        (DIST_DIR / name).write_text(new_html, encoding="utf-8")
        print(f"  OK   dist/{name}  (+JSON-LD)")


def _extract_meta_link(html: str, rel: str) -> str:
    m = re.search(rf'<link rel="{rel}" href="([^"]*)"', html)
    return m.group(1) if m else ""


def _list_deployable_pages() -> list[tuple[str, Path]]:
    """Return [(url_path, source_file_path)] for everything that ships.

    inject_schema_into_static() writes static pages into dist/ too, so a
    plain dist/ scan covers both build-gen and static — no need to dedupe.
    """
    return [(html.name, html) for html in sorted(DIST_DIR.glob("*.html"))]


def regen_sitemap():
    import xml.sax.saxutils as su
    from datetime import datetime, timezone

    pages = _list_deployable_pages()
    parts = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url_path, source in pages:
        # Homepage entry uses root URL (/), not index.html
        loc = f"{SITEMAP_BASE_URL}/" if url_path == "index.html" else f"{SITEMAP_BASE_URL}/{url_path}"
        mtime = datetime.fromtimestamp(source.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
        priority = "1.0" if url_path == "index.html" else (
            "0.8" if any(url_path == f"{c}.html" for c in CATEGORIES) else "0.6"
        )
        parts.append("  <url>")
        parts.append(f"    <loc>{su.escape(loc)}</loc>")
        parts.append(f"    <lastmod>{mtime}</lastmod>")
        parts.append(f"    <changefreq>weekly</changefreq>")
        parts.append(f"    <priority>{priority}</priority>")
        parts.append("  </url>")
    parts.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(parts) + "\n", encoding="utf-8")
    print(f"Regenerated sitemap.xml — {len(pages)} URLs")


def regen_search_index():
    """Build assets/search-index.json by scanning every deployable HTML page."""
    import json
    pages = _list_deployable_pages()
    out_entries: list[dict] = []
    for url_path, source in pages:
        html = source.read_text(encoding="utf-8")
        title = _extract_first(html, r"<title>(.+?)</title>")
        desc = _extract_meta(html, "description")
        image = _extract_meta(html, prop="og:image")
        # First product/spotlight __tag for category-themed badge
        tag = _extract_first(html, r'class="product__tag">([^<]+)<')
        # Cobble together rough indexable text: h1 + h2 of section-titles
        h1 = _extract_first(html, r"<h1[^>]*>(.+?)</h1>")
        section_titles = _extract_all(html, r'class="section-title">([^<]+)<')
        text = " ".join([t for t in ([h1] + section_titles) if t])
        # og:image is absolute; convert to relative for prod hot-linking
        if image and image.startswith(f"{SITEMAP_BASE_URL}/"):
            image = image[len(SITEMAP_BASE_URL) + 1:]
        out_entries.append({
            "url": url_path,
            "title": title or "",
            "description": desc or "",
            "tag": tag or "",
            "image": image or "",
            "text": text or "",
        })
    out_path = ROOT / "assets" / "search-index.json"
    out_path.write_text(json.dumps(out_entries, ensure_ascii=False), encoding="utf-8")
    print(f"Regenerated assets/search-index.json — {len(out_entries)} entries")


def _extract_first(html: str, pattern: str) -> str:
    m = re.search(pattern, html, re.S)
    if not m:
        return ""
    return re.sub(r"\s+", " ", m.group(1)).strip()


def _extract_all(html: str, pattern: str) -> list[str]:
    return [re.sub(r"\s+", " ", m).strip() for m in re.findall(pattern, html, re.S)]


def _extract_meta(html: str, name: str = "", prop: str = "") -> str:
    attr = f'name="{name}"' if name else f'property="{prop}"'
    m = re.search(rf'<meta {attr} content="([^"]*)"', html)
    if not m:
        m = re.search(rf'<meta content="([^"]*)" {attr}', html)
    return m.group(1) if m else ""


if __name__ == "__main__":
    main()
