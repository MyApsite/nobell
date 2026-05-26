"""
parse_catalog_index.py — one-shot extractor: catalog HTML <head> + filter form
config → content/<category>/_index.md.

Generates the catalog metadata frontmatter (SEO + inline style + filter dropdowns
+ filter buttons) by reading each `<category>.html` directly.

Usage:
  python scripts/parse_catalog_index.py             # all
  python scripts/parse_catalog_index.py watches     # one
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup
import yaml


ROOT = Path(__file__).resolve().parents[1]
OUT_ROOT = ROOT / "content"


CATEGORIES = ["cars", "watches", "guide", "calendar", "prime-residences"]


def strip(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def meta(soup, name="", prop=""):
    if name:
        tag = soup.find("meta", attrs={"name": name})
    else:
        tag = soup.find("meta", attrs={"property": prop})
    return strip(tag.get("content")) if tag else ""


def parse_catalog(category: str) -> dict:
    src = ROOT / f"{category}.html"
    soup = BeautifulSoup(src.read_text(encoding="utf-8"), "lxml")

    title = strip(soup.title.get_text()) if soup.title else ""
    description = meta(soup, name="description")

    # Inline <style>
    style_tag = soup.head.find("style") if soup.head else None
    inline_style = str(style_tag.string) if (style_tag and style_tag.string) else ""

    # Hero h1 + subtitle from card-section--slider
    head = soup.find("div", class_="card-section__head")
    hero_title = ""
    hero_subtitle = ""
    if head:
        h1 = head.find("h1") or head.find("h2") or head.find("h3")
        hero_title = strip(h1.get_text()) if h1 else ""
        sub = head.find("p", class_="card-section__text")
        hero_subtitle = strip(sub.get_text()) if sub else ""

    # Hero slides (verbatim — image/title/text vary between hero and catalog cards)
    hero_slides: list[dict] = []
    slider = soup.find("div", class_="js-rec-slider")
    if slider:
        for slide in slider.select(".swiper-slide"):
            a = slide.find("a")
            href = a.get("href", "") if a else ""
            img = slide.select_one("img")
            src_el = slide.select_one("source")
            img_src = (img.get("src") if img else "") or (src_el.get("srcset", "").split()[0] if src_el else "")
            base, ext = "", ""
            m = re.match(r"(.+)\.(webp|jpe?g|png)$", img_src or "", re.I)
            if m:
                base, ext = m.group(1), m.group(2).lower()
            title_el = slide.select_one(".house-card__title")
            text_el = slide.select_one(".house-card__text")
            hero_slides.append({
                "href": href,
                "image_base": base,
                "image_ext": ext,
                "alt": strip(img.get("alt", "")) if img else "",
                "title": strip(title_el.get_text()) if title_el else "",
                "text": strip(text_el.get_text()) if text_el else "",
            })

    # Filter form
    form = soup.find("form", class_="guide-form")
    search_name = ""
    hidden_name = ""
    dropdown_button_label = ""
    dropdown_default_option = ""
    dropdown_items: list[dict] = []
    if form:
        srch = form.find("input", attrs={"type": "search"})
        if srch:
            search_name = srch.get("name", "")
        hidden = form.find("input", attrs={"type": "hidden"})
        if hidden:
            hidden_name = hidden.get("name", "")
        btn_label = form.select_one(".js-select-value")
        if btn_label:
            dropdown_button_label = strip(btn_label.get_text())
        opts = form.select(".js-select-option")
        for o in opts:
            val = o.get("data-value", "")
            label = strip(o.get_text())
            if val == "" and "active" in (o.get("class") or []):
                dropdown_default_option = label
            else:
                dropdown_items.append({"value": val, "label": label})

    # Filter buttons (type/region/month)
    filter_buttons = []
    for b in soup.select(".guide__filter .guide-btn"):
        d = {
            "value": b.get("data-type") or b.get("data-region") or b.get("data-month") or "",
            "label": strip(b.get_text()),
        }
        if "active" in (b.get("class") or []):
            d["active"] = True
        # Capture the dimension as well, in case it differs from "type"
        for k in ("data-type", "data-region", "data-month"):
            if b.get(k):
                d["dim"] = k.replace("data-", "")
                break
        filter_buttons.append(d)

    # Results label (e.g., "Показаны 12 из 947 результатов")
    results_el = soup.select_one(".guide__results")
    total = 0
    if results_el:
        m = re.search(r"из\s+(\d+)", results_el.get_text())
        if m:
            total = int(m.group(1))

    return {
        "slug": category,
        "title": title,
        "description": description,
        "keywords": meta(soup, name="keywords"),
        "canonical": strip(
            soup.find("link", rel="canonical").get("href", "")
            if soup.find("link", rel="canonical") else ""
        ),
        "og_image": meta(soup, prop="og:image"),
        "og_type": meta(soup, prop="og:type") or "website",
        "og_title": meta(soup, prop="og:title") or title,
        "og_description": meta(soup, prop="og:description") or description,
        "twitter_title": meta(soup, name="twitter:title") or title,
        "twitter_description": meta(soup, name="twitter:description") or description,
        "hero_title": hero_title,
        "hero_subtitle": hero_subtitle,
        "hero_slides": hero_slides,
        "inline_style": inline_style,
        "search_name": search_name,
        "hidden_name": hidden_name,
        "dropdown_button_label": dropdown_button_label,
        "dropdown_default_option": dropdown_default_option,
        "dropdown_items": dropdown_items,
        "filter_buttons": filter_buttons,
        "total_results": total,
    }


def write_md(data: dict, out_path: Path):
    payload = yaml.safe_dump(data, allow_unicode=True, sort_keys=False, width=1000, default_flow_style=False)
    out_path.write_text(f"---\n{payload}---\n", encoding="utf-8")


def main():
    targets = sys.argv[1:] or CATEGORIES
    for cat in targets:
        if cat not in CATEGORIES:
            print(f"unknown: {cat}")
            continue
        data = parse_catalog(cat)
        out_dir = OUT_ROOT / cat
        out_dir.mkdir(parents=True, exist_ok=True)
        write_md(data, out_dir / "_index.md")
        print(f"  OK   content/{cat}/_index.md  (dropdown={len(data['dropdown_items'])} buttons={len(data['filter_buttons'])})")


if __name__ == "__main__":
    main()
