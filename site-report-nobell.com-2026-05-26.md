# Site Audit Report — nobell.com — 2026-05-26

Tool: `test-site` skill (sections 1-3 of 6). Target: production https://nobell.com.

---

## Сводка

| Раздел | ✅ | ⚠️ | ❌ |
|--------|----|----|----|
| 1. Доступность и ошибки | 8 | 0 | 0 |
| 2. SEO | 50 | 10 | 0 |
| 3. Контент и вёрстка | 23 | 0 | 7 |
| **Total** | **81** | **10** | **7** |

**Общая оценка: B+** — структурно крепкая база (HTTPS, security headers, sitemap, robots, header/footer/nav, charset/lang, 1 h1 на страницу), но отсутствуют 2 SEO-критичные вещи: **Schema.org JSON-LD на всех страницах** и **favicon на detail-страницах**. Описания длиннее SERP-лимита Google.

---

## Раздел 1: Доступность и ошибки

| Проверка | Статус | Результат |
|----------|--------|-----------|
| https://nobell.com/ | 200 | ✅ |
| HTTP → HTTPS redirect | 301 | ✅ 1 hop |
| www → non-www redirect | 301 | ✅ 1 hop |
| /index.html → / | 301 | ✅ (фикс PDF 2026-05-25 жив) |
| /robots.txt | 200 | ✅ есть Sitemap-ref |
| /sitemap.xml | 200 | ✅ 81 URL |
| 19 sample страниц | 200 | ✅ все живые |
| Security headers (HSTS+XFO+XCO+CSP+RP+PP) | — | ✅ полный набор |

Сервер: hcdn (Hostinger CDN). Cache-Control: 300s. Cert: валидный.

**Раздел 1: чистый.**

---

## Раздел 2: SEO

| Page | title len | desc len | canonical | og:* | viewport | h1 | img no-alt |
|------|----------|---------|-----------|------|----------|----|----|
| / | 89⚠️ | 273⚠️ | ✅ | ✅ | ✅ | 1✅ | 7⚠️ (декоративные SVG) |
| /cars.html | 77⚠️ | 250⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /watches.html | 84⚠️ | 224⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /guide.html | 66⚠️ | 227⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /calendar.html | 67⚠️ | 288⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /spectre-semaphore.html | 128⚠️ | 247⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /patek-rainbow.html | 49✅ | 221⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /omadeleine.html | 20⚠️ | 280⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /met-gala.html | 17⚠️ | 295⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |
| /aroeira-missoni.html | 39✅ | 251⚠️ | ✅ | ✅ | ✅ | 1✅ | 0✅ |

**Структура: всё на месте.** Canonical / og-теги / viewport / h1 / alt у контент-изображений — ОК.

**Предупреждения (length вне рекомендации):**
- **title** rec 30-60: у 8 страниц > 60 (для кириллицы норма); у omadeleine (20) и met-gala (17) — слишком короткие, потеря контекста бренда
- **description** rec 120-160: ВСЕ описания 221-295 — Google обрежет в SERP
- **alt на главной**: 7 декоративных SVG (соцсети/стрелки) без `alt=""` — скринридер их озвучивает

---

## Раздел 3: Контент и вёрстка

| Page | size | text | charset | lang | header | footer | nav | favicon | **JSON-LD** | lorem |
|------|------|------|---------|------|--------|--------|-----|---------|---|---|
| / | 78KB | 31KB | utf-8 | ru | ✅ | ✅ | ✅ | ✅ | **❌** | 0 |
| /cars.html | 53KB | 18KB | utf-8 | ru | ✅ | ✅ | ✅ | ✅ | **❌** | 0 |
| /watches.html | 49KB | 15KB | utf-8 | ru | ✅ | ✅ | ✅ | ✅ | **❌** | 0 |
| /guide.html | 53KB | 18KB | utf-8 | ru | ✅ | ✅ | ✅ | ✅ | **❌** | 0 |
| /calendar.html | 46KB | 15KB | utf-8 | ru | ✅ | ✅ | ✅ | ✅ | **❌** | 0 |
| /spectre-semaphore.html | 54KB | 20KB | utf-8 | ru | ✅ | ✅ | ✅ | **❌** | **❌** | 0 |

### Критические находки

❌ **Schema.org JSON-LD отсутствует на 100% страниц.** Без неё Google не видит сайт как
   - Organization (имя/лого/соцсети)
   - WebSite (с SearchAction → sitelinks search box в SERP)
   - BreadcrumbList (заменяет URL-крошки в выдаче)
   - Article / CollectionPage + ItemList (rich results)

❌ **Favicon отсутствует на 55 detail-страницах** (только каталоги имеют `<link rel="icon">`). На вкладке браузера/в bookmark/в поделить-кнопке отображается дефолтный пустой icon.

### Хорошие новости

Build-генератор (коммит 1e03aae) **уже исправляет оба пункта**:
- `templates/_schema.html.tpl` рендерит JSON-LD на всех 60 страницах dist/
- `templates/_head.html.tpl` всегда включает `<link rel="icon">`

Деплой dist/ автоматически закрывает оба критичных дефекта Раздела 3.

---

## Связь с PDF feedback (правки 27_05)

PDF-баги, видимые на проде, **не были обнаружены аудитом разделов 1-3** потому что они функциональные (filter JS, dropdown duplicate, video jump, autocomplete), а аудит проверял только статичную HTML-разметку. Для их выявления нужен раздел 6 (Формы) + Playwright/manual click-test.

Перечень багов из PDF и план фиксов в build-генераторе:

| PDF | Где | Фикс |
|---|---|---|
| 2a | contacts.html | Убрать/настроить autocomplete на полях имени |
| 2b | contacts.html | Увеличить font-size client input |
| 2c | api/contact.php | Проверить SMTP/spam-filter на myapsite@gmail.com |
| 4a | guide+calendar+prime-residences | Унифицировать filter JS — общий counter "X из X" |
| 5a | guide detail tag → catalog | Tag-link validation: если значение не в filter, показывать chip "ФИЛЬТР: name" |
| 6a | guide detail (часть страниц) | Tag href consistency — проверить data-* совпадают |
| 8a | calendar.html layout | Месяцы → dropdown, форматы (3) → кнопки на фронте |
| 9a-c | calendar cards 1/5/6 | Добавить data-format `cote-azur`, `society-calendar` на 1/5/6 |
| 11a | cars dropdown | Убрать дубль "ПОПУЛЯРНЫЕ БРЕНДЫ" (label + первая опция совпадают) |
| 13a | example.html video | Зафиксить layout-shift при первом включении (poster→video swap) |

---

## Рекомендации (приоритет)

1. **Deploy dist/ → prod** — закрывает JSON-LD на 60 стр + favicon на 55 detail + бонус Schema.org rich results
2. **Зафиксить PDF-баги в build-генераторе** (filter JS унификация + calendar layout + cars dropdown duplicate) — деплоить вместе с #1 одним заходом
3. **Сократить description до 150-160 символов** для всех страниц (обновить через `_index.md` и `content/*/*.md` или авто-truncate в template)
4. **Скоррать title omadeleine/met-gala** — добавить тег категории/года: "Met Gala 2026 — благотворительный бал Института Костюма | Nobell"
5. **alt="" на декоративных SVG главной** — скринридер пропустит

---

## Что НЕ покрыто этим отчётом

- Раздел 4: Производительность (gzip, Cache-Control, JS bundle size)
- Раздел 5: Безопасность (mixed content, /admin /.env /.git probes)
- Раздел 6: Формы (CSRF, label, action HTTPS) — критично для contacts.html
- Functional UI testing (click filter buttons, follow tag links) — это где PDF-баги живут

При следующем аудите рекомендую запустить раздел 6 + добавить Playwright headless проход.
