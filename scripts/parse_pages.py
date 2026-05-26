"""
parse_pages.py — extractor for nobell category pages.

Reads `<category>.html` catalog + every detail page it links to, writes
content/<category>/<slug>.md (YAML frontmatter) for detail pages and
content/<category>/_index.md for the catalog.

Detail-page schema is identical across all categories — `services-section`
with a flexible block list (hero / grid_2col / text), then `villa-section`
with tech_spec + tags, then `spotlight-section`.

Categories:
  cars / watches / guide / calendar / prime-residences

Usage:
  python scripts/parse_pages.py                 # parse all categories
  python scripts/parse_pages.py cars            # parse one category
  python scripts/parse_pages.py cars watches    # parse several
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, Tag
import yaml


ROOT = Path(__file__).resolve().parents[1]
OUT_ROOT = ROOT / "content"


# Per-category config:
#   - catalog_selector: where the detail-card grid lives on the catalog page
#   - card_data_attrs: which data-* attrs to extract from each card
#   - hero_count: how many slides in the catalog's hero slider
CATEGORIES = {
    "cars": {
        "catalog_grid_selector": ".cars-grid .cars-grid__col",
        "card_data_attrs": ["data-type", "data-brand"],
    },
    "watches": {
        "catalog_grid_selector": ".guide__cards .card-section__col",
        "card_data_attrs": ["data-type", "data-brand"],
    },
    "guide": {
        "catalog_grid_selector": ".guide__cards .card-section__col",
        # order matches original guide.html data-* attribute order
        "card_data_attrs": ["data-type", "data-country", "data-region", "data-brand", "data-city"],
    },
    "calendar": {
        "catalog_grid_selector": ".guide__cards .card-section__col",
        "card_data_attrs": ["data-month", "data-format", "data-city", "data-country", "data-region"],
    },
    "prime-residences": {
        "catalog_grid_selector": ".guide__cards .card-section__col",
        "card_data_attrs": ["data-type", "data-country", "data-region", "data-brand", "data-city"],
    },
}


# ──────────────────────────────────────────────────────────────────
# Small parsing helpers


def strip(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def split_ext(src: str) -> tuple[str, str]:
    """('assets/images/x/y.jpg', 'jpg') ← 'assets/images/x/y.jpg'."""
    m = re.match(r"(.+)\.(webp|jpe?g|png)$", src or "", re.I)
    return (m.group(1), m.group(2).lower()) if m else (src or "", "")


def meta(soup: BeautifulSoup, name: str = "", prop: str = "") -> str:
    if name:
        tag = soup.find("meta", attrs={"name": name})
    else:
        tag = soup.find("meta", attrs={"property": prop})
    return strip(tag.get("content")) if tag else ""


def extract_picture(pic: Tag) -> dict:
    """Return {image_base, image_ext, alt} from a <picture> element."""
    src = pic.find("source")
    img = pic.find("img")
    base, ext = "", "jpg"
    if img and img.get("src"):
        base, ext = split_ext(img["src"])
    elif src and src.get("srcset"):
        base, ext = split_ext(src["srcset"].split()[0])
    return {
        "image_base": base,
        "image_ext": ext,
        "alt": strip(img.get("alt", "")) if img else "",
    }


# ──────────────────────────────────────────────────────────────────
# Catalog


def load_catalog(catalog_path: Path, config: dict) -> dict[str, dict]:
    """Read catalog HTML, return {slug: card_info}."""
    soup = BeautifulSoup(catalog_path.read_text(encoding="utf-8"), "lxml")
    out: dict[str, dict] = {}
    for col in soup.select(config["catalog_grid_selector"]):
        a = col.find("a", class_="product")
        if not a:
            continue
        href = a.get("href", "")
        slug = re.sub(r"\.html$", "", href)
        img = col.select_one(".product__img img")
        src = col.select_one(".product__img source")
        tag_el = col.select_one(".product__tag")
        title_el = col.select_one(".product__title")
        text_el = col.select_one(".product__text")
        card_src = (img.get("src") if img else "") or (src.get("srcset", "").split()[0] if src else "")
        card_base, card_ext = split_ext(card_src)
        data = {attr.replace("data-", ""): strip(col.get(attr, "")) for attr in config["card_data_attrs"]}
        out[slug] = {
            "card_image_base": card_base,
            "card_image_ext": card_ext,
            "card_alt": strip(img.get("alt", "")) if img else "",
            "card_tag": strip(tag_el.get_text()) if tag_el else "",
            "card_title": strip(title_el.get_text()) if title_el else "",
            "card_text": strip(text_el.get_text()) if text_el else "",
            **{f"data_{k.replace('-', '_')}": v for k, v in data.items()},
        }
    return out


# ──────────────────────────────────────────────────────────────────
# Detail page


def parse_breadcrumb(header: Tag, category_label_lower: str) -> list[dict]:
    """Trailing crumbs after the category link."""
    bc = header.select_one(".breadcrumbs")
    crumbs: list[dict] = []
    saw_category = False
    for el in bc.find_all(["a", "span"], recursive=False):
        if el.name == "a":
            text = strip(el.get_text())
            href = el.get("href", "")
            if href == "/" or el.find("img") and "home" in (el.find("img").get("src", "") or ""):
                continue
            # Category-level link (e.g. cars.html, watches.html, etc.) marks end of category prefix
            if re.match(r"^[a-z-]+\.html$", href) and text.lower() == category_label_lower.lower():
                saw_category = True
                continue
            if saw_category:
                crumbs.append({"label": text, "href": href})
        elif el.name == "span" and saw_category:
            crumbs.append({"label": strip(el.get_text()), "href": None})
    return crumbs


def inner_html(tag: Tag) -> str:
    """Inner HTML with entities preserved (&nbsp; survives the BS4 decode)."""
    html = tag.decode_contents()
    # Collapse only ASCII whitespace — preserve U+00A0 (nbsp) for entity round-trip.
    html = re.sub(r"[\t\n\r ]+", " ", html).strip()
    return html.replace(" ", "&nbsp;")


def parse_body_blocks(services_root: Tag) -> tuple[list[dict], str | None]:
    """Walk .services children in order. Returns (blocks, dropcap_class).

    Block types:
      - hero        — <div class="services__img services__img--hero">
      - picture     — <div class="services__img"> with single picture (no row)
      - grid_2col   — <div class="services__img"> with services__img-row
      - text        — <div class="services__text">
    """
    blocks: list[dict] = []
    dropcap_class: str | None = None

    for el in services_root.children:
        if not isinstance(el, Tag):
            continue
        classes = el.get("class", []) or []
        if "services__head" in classes:
            continue

        if "services__img" in classes:
            row = el.find("div", class_="services__img-row")
            cap = el.find("p", class_="services__img-text")
            cap_text = strip(cap.get_text()) if cap else ""
            cap_align = ""
            if cap and "services__img-text--right" in (cap.get("class") or []):
                cap_align = "right"

            if "services__img--hero" in classes:
                pic = el.find("picture")
                blocks.append({
                    "type": "hero",
                    **extract_picture(pic),
                    "caption": cap_text,
                    "caption_align": cap_align,
                })
            elif row:
                cols = row.find_all("div", class_="services__img-col", recursive=False)
                if not cols:
                    continue
                left_pic = cols[0].find("picture")
                right_pics = cols[1].find_all("picture") if len(cols) > 1 else []
                blocks.append({
                    "type": "grid_2col",
                    "left": extract_picture(left_pic) if left_pic else {},
                    "right": [extract_picture(p) for p in right_pics],
                })
            else:
                # Single-picture services__img (used heavily in watches/guide where
                # they don't apply the --hero modifier).
                pic = el.find("picture")
                if pic:
                    blocks.append({
                        "type": "picture",
                        **extract_picture(pic),
                        "caption": cap_text,
                        "caption_align": cap_align,
                    })

        elif "services__text" in classes:
            paras = [inner_html(p) for p in el.find_all("p", recursive=False)]
            block = {"type": "text", "paragraphs": paras}
            if "services__text--first" in classes:
                for c in classes:
                    if c.endswith("-dropcap"):
                        dropcap_class = c
                        block["dropcap"] = True
                        break
            blocks.append(block)

    return blocks, dropcap_class


def parse_tech_spec(soup: BeautifulSoup) -> list[str]:
    body = soup.select_one(".villa__tech .tech__body ul")
    if not body:
        return []
    return [inner_html(li) for li in body.find_all("li")]


def parse_partners_text(soup: BeautifulSoup) -> str:
    el = soup.select_one(".villa-descr__text")
    return strip(el.get_text()) if el else ""


def parse_cta_text(soup: BeautifulSoup) -> str:
    cta = soup.select_one(".villa-descr__content .card-section__link span")
    return strip(cta.get_text()) if cta else ""


def parse_tags(soup: BeautifulSoup) -> list[dict]:
    return [
        {"label": strip(a.get_text()), "href": a.get("href", "")}
        for a in soup.select(".villa-descr__tags .villa-tag")
    ]


def parse_spotlight(soup: BeautifulSoup) -> list[str]:
    """Slugs in the page's own spotlight slider, in declared order."""
    out = []
    for a in soup.select(".spotlight__slider .swiper-slide a.product"):
        href = a.get("href", "")
        out.append(re.sub(r"\.html$", "", href))
    return out


def parse_category_label(header: Tag) -> str:
    """The category breadcrumb text (e.g. ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ)."""
    bc = header.select_one(".breadcrumbs")
    for a in bc.find_all("a"):
        href = a.get("href", "")
        if re.match(r"^[a-z-]+\.html$", href):
            return strip(a.get_text())
    return ""


def parse_page(html_path: Path, catalog: dict) -> dict:
    soup = BeautifulSoup(html_path.read_text(encoding="utf-8"), "lxml")
    slug = html_path.stem
    body_tag = soup.find("body")
    body_class = " ".join(body_tag.get("class", []) or [])

    h1 = soup.find("h1")
    intro_p = soup.select_one(".services__description p")
    services_root = soup.select_one(".services-section .services")
    header = soup.find("header", class_="header")
    category_label = parse_category_label(header)

    body_blocks, dropcap_class = parse_body_blocks(services_root)

    # Verbatim <style> block content (preserves per-page CSS, brand shadows, etc.)
    inline_style_tag = soup.head.find("style") if soup.head else None
    inline_style = str(inline_style_tag.string) if (inline_style_tag and inline_style_tag.string) else ""

    title = strip(soup.title.get_text()) if soup.title else ""
    description = meta(soup, name="description")

    return {
        "slug": slug,
        "title": title,
        "h1": strip(h1.get_text()) if h1 else "",
        "intro": strip(intro_p.get_text()) if intro_p else "",
        "description": description,
        "keywords": meta(soup, name="keywords"),
        "canonical": strip(
            soup.find("link", rel="canonical").get("href", "")
            if soup.find("link", rel="canonical") else ""
        ),
        "og_image": meta(soup, prop="og:image"),
        "og_type": meta(soup, prop="og:type") or "article",
        "og_title": meta(soup, prop="og:title") or title,
        "og_description": meta(soup, prop="og:description") or description,
        "twitter_title": meta(soup, name="twitter:title") or title,
        "twitter_description": meta(soup, name="twitter:description") or description,
        "body_class": body_class,
        "dropcap_class": dropcap_class or "",
        "inline_style": inline_style,
        "breadcrumb": parse_breadcrumb(header, category_label),
        "card": catalog.get(slug, {}),
        "body": body_blocks,
        "tech_spec": parse_tech_spec(soup),
        "partners_text": parse_partners_text(soup),
        "cta_text": parse_cta_text(soup),
        "tags": parse_tags(soup),
        "spotlight_slugs": parse_spotlight(soup),
    }


# ──────────────────────────────────────────────────────────────────
# Writer


def write_md(data: dict, out_path: Path):
    payload = yaml.safe_dump(
        data,
        allow_unicode=True,
        sort_keys=False,
        width=1000,
        default_flow_style=False,
    )
    out_path.write_text(f"---\n{payload}---\n", encoding="utf-8")


# ──────────────────────────────────────────────────────────────────
# Entrypoint


def parse_category(category: str):
    config = CATEGORIES[category]
    catalog_path = ROOT / f"{category}.html"
    if not catalog_path.exists():
        print(f"  SKIP {category}: catalog file missing")
        return
    catalog = load_catalog(catalog_path, config)
    if not catalog:
        print(f"  ERROR {category}: catalog parser returned no entries")
        return

    out_dir = OUT_ROOT / category
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"=== {category} ({len(catalog)} detail-pages) ===")

    for slug in catalog:
        html_path = ROOT / f"{slug}.html"
        if not html_path.exists():
            print(f"  SKIP {slug}: source file missing")
            continue
        data = parse_page(html_path, catalog)
        write_md(data, out_dir / f"{slug}.md")
        print(f"  OK   {slug:<36}  blocks={len(data['body']):<2} spec={len(data['tech_spec']):<2} tags={len(data['tags'])} spot={len(data['spotlight_slugs'])}")


def main():
    targets = sys.argv[1:] or list(CATEGORIES.keys())
    for cat in targets:
        if cat not in CATEGORIES:
            print(f"unknown category: {cat}")
            continue
        parse_category(cat)


if __name__ == "__main__":
    main()
