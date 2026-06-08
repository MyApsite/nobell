"""
migrate_static_v2.py — one-shot migration for the 8 root static HTML pages.

Applies the footer/nav/popup updates from Figma node 5019:* to all root
static *.html files (index, team, contacts, services, app, example,
privacy, recommendation) so they match the new build-generator templates:

  1. "ГИД ПО ОТЕЛЯМ И ЯХТАМ" → "АЛЬМАНАХ ПУТЕШЕСТВИЙ"
  2. <button class="footer__portal-btn js-popup-open"> → js-popup-login-open
  3. <button class="nav__form-link js-popup-open"> → js-popup-login-open
  4. <a href="#" class="footer__legal-link">Правила клуба</a>
     → href="terms.html"
  5. Inject the popup-login DOM (and its inline JS) just before </body>

Idempotent: re-running won't double-inject.
"""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATIC_PAGES = [
    "index.html", "team.html", "contacts.html", "services.html",
    "app.html", "example.html", "privacy.html", "recommendation.html",
    "terms.html", "registration.html",
]

POPUP_LOGIN = (ROOT / "templates" / "_popup-login.html.tpl").read_text(encoding="utf-8")


def migrate(html: str) -> str:
    # 1. Almanac wording
    html = html.replace("ГИД ПО ОТЕЛЯМ И ЯХТАМ", "АЛЬМАНАХ ПУТЕШЕСТВИЙ")
    # 2. + 3. КЛИЕНТСКИЙ ПОРТАЛ buttons switch trigger class
    html = re.sub(
        r'(class="footer__portal-btn) js-popup-open(")',
        r'\1 js-popup-login-open\2',
        html,
    )
    html = re.sub(
        r'(class="nav__form-link) js-popup-open(")',
        r'\1 js-popup-login-open\2',
        html,
    )
    # 4. Footer legal link "Правила клуба" → terms.html
    html = re.sub(
        r'(<a href=")#(" class="footer__legal-link">Правила клуба</a>)',
        r'\1terms.html\2',
        html,
    )
    # 5. Inject popup-login before </body>. Re-applies on every run so
    # template changes (e.g. JS rename in _popup-login.html.tpl) propagate.
    if "</body>" in html:
        # Strip any previous popup-login block (DOM + script) — match from
        # the opening <div ... popup--login ...> down to the next </script>.
        html = re.sub(
            r'\s*<div class="popup popup--login js-popup-login">[\s\S]+?</script>\s*',
            '\n',
            html,
        )
        html = html.replace("</body>", POPUP_LOGIN + "\n</body>", 1)
    return html


def main():
    for name in STATIC_PAGES:
        p = ROOT / name
        if not p.exists():
            print(f"  SKIP {name}: not found")
            continue
        before = p.read_text(encoding="utf-8")
        after = migrate(before)
        if before == after:
            print(f"  ··   {name} (no changes)")
            continue
        p.write_text(after, encoding="utf-8")
        diffs = []
        if before.count("АЛЬМАНАХ ПУТЕШЕСТВИЙ") != after.count("АЛЬМАНАХ ПУТЕШЕСТВИЙ"):
            diffs.append("almanac")
        if "js-popup-login-open" in after:
            diffs.append("login-trigger")
        if "js-popup-login" in after and "js-popup-login" not in before:
            diffs.append("+popup-login-dom")
        if "terms.html" in after and "terms.html" not in before:
            diffs.append("rules-link")
        print(f"  OK   {name:<25} {' '.join(diffs)}")


if __name__ == "__main__":
    main()
