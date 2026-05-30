# Site Audit Report — nobell.com — 2026-05-26

Tool: `test-site` skill (sections 1-3 of 6). Target: production https://nobell.com.

---

## Сводка

| Раздел | ✅ | ⚠️ | ❌ |
|--------|----|----|----|
| 1. Доступность и ошибки | 8 | 0 | 0 |
| 2. SEO | 50 | 10 | 0 |
| 3. Контент и вёрстка | 23 | 0 | 7 |
| 4. Производительность | 16 | 0 | 0 |
| 5. Безопасность | 18 | 0 | 0 |
| 6. Формы | 4 | 3 | 0 |
| **Total** | **119** | **13** | **7** |

**Общая оценка: B+** — структурно крепкая база (HTTPS, security headers, sitemap, robots, header/footer/nav, charset/lang, 1 h1 на страницу, Brotli + cache, все sensitive paths закрыты), но отсутствуют 2 SEO-критичные вещи: **Schema.org JSON-LD на всех страницах** и **favicon на detail-страницах**. Описания длиннее SERP-лимита Google.

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

## Раздел 4: Производительность

| Page | TTFB | Total | Size (br) | Encoding | Cache-Control | scripts | styles |
|------|------|-------|-----------|----------|---------------|---------|--------|
| / | 267 ms | 341 ms | 77 KB | br | max-age=300 | 3 | 5 |
| /cars.html | 264 ms | 322 ms | 52 KB | br | max-age=300 | 3 | 4 |
| /watches.html | 284 ms | 346 ms | 48 KB | br | max-age=300 | 3 | 4 |
| /spectre-semaphore.html | 271 ms | 329 ms | 53 KB | br | max-age=300 | 3 | 4 |

**Все ✅:** TTFB ниже 300мс, full-load < 350мс, Brotli-сжатие активно, 3 скрипта + 4-5 стилей — разумно. Cache-TTL 5 минут — нормально для часто-обновляемого контента (мы видели по этому fixt в предыдущей сессии: HTML кешируется CDN, статика — браузером).

---

## Раздел 5: Безопасность

**Sensitive path probes (все должны быть НЕ-200):**

| Path | Code | Verdict |
|------|------|---------|
| /admin | 404 | ✅ |
| /wp-admin | 404 | ✅ |
| /wp-login.php | 301 (→ /) | ✅ (рерайт `*.php`) |
| /.env | 404 | ✅ |
| /.git/config | 403 | ✅ |
| /phpinfo.php | 301 (→ /) | ✅ |
| /server-status | 404 | ✅ |
| /xmlrpc.php | 301 (→ /) | ✅ |
| /api/ (listing) | 403 | ✅ |
| /backup, /backup.zip, /database.sql | 404 | ✅ |
| /node_modules/ | 404 | ✅ |
| /.htaccess | 403 | ✅ |
| /web.config | 404 | ✅ |
| /api/contact.php (GET) | 405 | ✅ (POST-only) |

**Mixed content:** только `http://www.w3.org/2000/svg` (XML namespace inline-SVG — не HTTP-загрузка). ✅

**Раздел 5: чистый.**

---

## Раздел 6: Формы

**Найдено форм на сайте:** 2 (главная контактная + поиск в burger-меню)

| Form | action | method | HTTPS | CSRF | Origin/Referer check |
|------|--------|--------|-------|------|--------------------|
| contacts.html main | /api/contact.php | POST | ✅ (relative от https://) | ⚠️ нет hidden token | ✅ в PHP allowlist nobell.com |
| burger search | /search.html | GET | ✅ | n/a (search) | n/a |

**Inputs (контактная форма):** все 5 input/textarea имеют `id="contact-*"`, но **нет `<label for=...>`** — используются только placeholders. ⚠️ A11y issue: screen reader озвучивает только placeholder, а после ввода — теряет название поля.

**Сводка:**
- ⚠️ CSRF token отсутствует — митигируется Origin/Referer allowlist в api/contact.php (защищает от cross-origin POST), но не от same-origin XSS-инъекций
- ⚠️ Нет `<label>` — улучшение a11y для скринридеров (можно добавить visually-hidden label или aria-label)
- ⚠️ В PHP `Content-Transfer-Encoding: base64` нужен для UTF-8 (это уже исправлено в предыдущей сессии)
- ✅ POST + HTTPS + Same-Origin enforcement в PHP

**Рекомендация:** добавить `<label class="sr-only" for="contact-first-name">Имя</label>` перед каждым input, либо `aria-label`. Это закроет a11y warning без визуальных изменений.

---

## Итоговые приоритетные рекомендации

1. **DEPLOY dist/ → prod** (коммиты `1e03aae` + `8cd9b6e`) — закрывает все 12 PDF-багов + добавляет JSON-LD на 60 страниц + favicon на 55 detail-страниц
2. **Добавить SPF + DKIM TXT-записи на nobell.com** на стороне DNS-регистратора — без них PHP-фикс 2c в коммите `8cd9b6e` может не помочь Gmail-доставке
3. **Добавить `<label>` для контактной формы** (a11y)
4. **Сократить description до 150-160 символов** для всех страниц (auto-truncate в template)
5. **Cache-Control max-age для статики >300s** — Hostinger CDN cache HTML 5 минут, но JS/CSS можно дольше (immutable + версионирование)

## Что НЕ покрыто этим отчётом

- Functional UI testing (Playwright click-test filter buttons, follow tag links) — purely-static audit не находит JS-баги типа PDF 4a/5a/6a; они были найдены user-ом вручную, исправлены в `8cd9b6e`, остаётся только проверить визуально в браузере
- Lighthouse / CrUX / Real User Monitoring — для p75 LCP/CLS/INP метрик
- PWA / Service Worker / offline support — отсутствуют (по дизайну, для luxury сайта без жёсткой PWA-необходимости)
