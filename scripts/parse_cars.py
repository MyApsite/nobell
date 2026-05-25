"""
parse_cars.py — one-shot extractor: cars detail-pages → content/cars/*.md.

Reads the 12 cars detail-pages listed in cars.html, extracts:
  - SEO metadata (title/description/keywords/og:image/canonical)
  - body class
  - breadcrumb tail (brand / series / leaf)
  - hero card data (image, tag, alt, type/brand tokens) — from cars.html
  - h1, intro (services__description)
  - first paragraph drop-cap CSS class (`*-dropcap`)
  - body sequence of blocks (hero / grid_2col / text) in document order
  - tech_spec list, CTA text, tags

Writes each detail-page to content/cars/<slug>.md as a YAML-frontmatter file
(empty markdown body — all content lives in the frontmatter `body:` list).

Usage: python scripts/parse_cars.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag
import yaml


ROOT = Path(__file__).resolve().parents[1]
CARS_INDEX = ROOT / "cars.html"
OUT_DIR = ROOT / "content" / "cars"


def strip(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def strip_webp(src: str) -> str:
    # strip the trailing .webp / .jpg to keep a base; template adds extensions
    return re.sub(r"\.(webp|jpg|jpeg|png)$", "", src or "")


def meta(soup: BeautifulSoup, name: str = "", prop: str = "") -> str:
    if name:
        tag = soup.find("meta", attrs={"name": name})
    else:
        tag = soup.find("meta", attrs={"property": prop})
    return strip(tag.get("content")) if tag else ""


def load_catalog(catalog_path: Path) -> dict[str, dict]:
    """Read cars.html and return slug → catalog card info."""
    soup = BeautifulSoup(catalog_path.read_text(encoding="utf-8"), "lxml")
    out: dict[str, dict] = {}
    for col in soup.select(".cars-grid .cars-grid__col"):
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
        out[slug] = {
            "card_image_base": strip_webp(src.get("srcset", "") if src else img.get("src", "")),
            "card_alt": strip(img.get("alt", "")) if img else "",
            "card_tag": strip(tag_el.get_text()) if tag_el else "",
            "card_title": strip(title_el.get_text()) if title_el else "",
            "card_text": strip(text_el.get_text()) if text_el else "",
            "data_type": strip(col.get("data-type", "")),
            "data_brand": strip(col.get("data-brand", "")),
        }
    return out


def parse_breadcrumb(header: Tag) -> list[dict]:
    """Extract trailing crumbs after the cars-category link."""
    bc = header.select_one(".breadcrumbs")
    crumbs: list[dict] = []
    saw_category = False
    for el in bc.find_all(["a", "span"], recursive=False):
        if el.name == "a":
            text = strip(el.get_text())
            href = el.get("href", "")
            if href == "/" or el.find("img") and "home" in (el.find("img").get("src", "") or ""):
                continue
            if href == "cars.html":
                saw_category = True
                continue
            if saw_category:
                crumbs.append({"label": text, "href": href})
        elif el.name == "span" and saw_category:
            crumbs.append({"label": strip(el.get_text()), "href": None})
    return crumbs


def extract_picture(pic: Tag) -> dict:
    """Return {image_base, alt} from a <picture> element."""
    src = pic.find("source")
    img = pic.find("img")
    base = ""
    if src and src.get("srcset"):
        base = strip_webp(src["srcset"].split()[0])
    elif img and img.get("src"):
        base = strip_webp(img["src"])
    return {
        "image_base": base,
        "alt": strip(img.get("alt", "")) if img else "",
    }


def parse_body_blocks(services_root: Tag) -> tuple[list[dict], str | None]:
    """Walk .services children in order, produce a list of blocks.

    Returns (blocks, dropcap_class).
    """
    blocks: list[dict] = []
    dropcap_class: str | None = None

    for el in services_root.children:
        if not isinstance(el, Tag):
            continue
        classes = el.get("class", []) or []
        if "services__head" in classes:
            continue  # head is handled separately

        if "services__img" in classes:
            if "services__img--hero" in classes:
                pic = el.find("picture")
                cap = el.find("p", class_="services__img-text")
                cap_text = strip(cap.get_text()) if cap else ""
                cap_align = ""
                if cap:
                    if "services__img-text--right" in (cap.get("class") or []):
                        cap_align = "right"
                blocks.append({
                    "type": "hero",
                    **extract_picture(pic),
                    "caption": cap_text,
                    "caption_align": cap_align,
                })
            else:
                # 2-col grid
                row = el.find("div", class_="services__img-row")
                if not row:
                    continue
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

        elif "services__text" in classes:
            paras = [strip(p.get_text()) for p in el.find_all("p", recursive=False)]
            block = {"type": "text", "paragraphs": paras}
            if "services__text--first" in classes:
                # detect dropcap helper class (e.g. spectre-semaphore-dropcap)
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
    return [strip(li.get_text()) for li in body.find_all("li")]


def parse_cta_text(soup: BeautifulSoup) -> str:
    cta = soup.select_one(".villa-descr__content .card-section__link span")
    return strip(cta.get_text()) if cta else ""


def parse_tags(soup: BeautifulSoup) -> list[dict]:
    out = []
    for a in soup.select(".villa-descr__tags .villa-tag"):
        out.append({
            "label": strip(a.get_text()),
            "href": a.get("href", ""),
        })
    return out


def parse_page(html_path: Path, catalog: dict) -> dict:
    soup = BeautifulSoup(html_path.read_text(encoding="utf-8"), "lxml")
    slug = html_path.stem
    body_tag = soup.find("body")
    body_class = " ".join(body_tag.get("class", []) or [])

    h1 = soup.find("h1")
    intro_p = soup.select_one(".services__description p")
    services_root = soup.select_one(".services-section .services")

    body_blocks, dropcap_class = parse_body_blocks(services_root)
    catalog_info = catalog.get(slug, {})

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
        "breadcrumb": parse_breadcrumb(soup.find("header", class_="header")),
        "card": catalog_info,
        "body": body_blocks,
        "tech_spec": parse_tech_spec(soup),
        "cta_text": parse_cta_text(soup),
        "tags": parse_tags(soup),
    }


def write_md(data: dict, out_path: Path):
    payload = yaml.safe_dump(
        data,
        allow_unicode=True,
        sort_keys=False,
        width=1000,
        default_flow_style=False,
    )
    out_path.write_text(f"---\n{payload}---\n", encoding="utf-8")


def main():
    if not CARS_INDEX.exists():
        sys.exit(f"cars.html not found at {CARS_INDEX}")
    catalog = load_catalog(CARS_INDEX)
    if not catalog:
        sys.exit("Catalog parsing returned no entries — check selectors.")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    slugs = list(catalog.keys())
    if len(sys.argv) > 1:
        slugs = [s for s in slugs if s in sys.argv[1:]]
    print(f"Parsing {len(slugs)} cars detail-pages…")
    for slug in slugs:
        html = ROOT / f"{slug}.html"
        if not html.exists():
            print(f"  SKIP {slug}: source file missing")
            continue
        data = parse_page(html, catalog)
        write_md(data, OUT_DIR / f"{slug}.md")
        n_blocks = len(data["body"])
        n_spec = len(data["tech_spec"])
        print(f"  OK   {slug:<36}  blocks={n_blocks:<2} spec={n_spec:<2} tags={len(data['tags'])}")


if __name__ == "__main__":
    main()
