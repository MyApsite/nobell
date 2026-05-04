# Гид по созданию и наполнению детальных страниц

Этот документ описывает процесс создания и наполнения детальных страниц объектов (отелей, яхт, ретритов и т.д.), которые отображаются в каталоге [guide.html](guide.html).

---

## Архитектура

### Структура одной детальной страницы

Каждая детальная страница (например [villa.html](villa.html), [danieli.html](danieli.html), [eha.html](eha.html), [omadeleine.html](omadeleine.html), [six-senses-milan.html](six-senses-milan.html)) состоит из:

1. **`<head>`** — общий: `<title>`, ссылки на `vendor.min.css`, `styles.min.css`, AOS, `<style>` с page-scoped CSS (drop-cap + aspect-ratio).
2. **`<header>`** — лого Nobell, breadcrumbs (Гид → регион → страна → город), кнопка burger с классом `header__burger--fixed` (плавает при прокрутке).
3. **`<main>`** содержит:
   - **`<section class="services-section">`** — основной контент: заголовок (h1), italic-описание, share-блок, hero-изображение(я), текстовые блоки (с drop-cap на первом), 2-колоночные сетки фото.
   - **`<section class="villa-section">`** — техническая спецификация (`tech` блок) + Nobell Partners Community + соцсети + теги внизу.
   - **`<section class="spotlight-section">`** — слайдер «In the Spotlight» с 12 карточками-ссылками на остальные детальные страницы. **Одинаковый на всех 12 страницах**, не модифицировать.
4. **`<footer>`** — 4 колонки ссылок + соцсети + копирайт. Везде одинаковый.
5. **`<nav class="nav js-burger">`** — выезжающее меню. Везде одинаковое.
6. **`<div class="popup">`** — попап «Клиентский портал». Везде одинаковый.

### Связь с guide.html

На [guide.html](guide.html) есть 12 карточек, каждая ведёт на свою детальную страницу. Теги внизу детальной страницы — это ссылки на `guide.html?<param>=<value>`, которые срабатывают как фильтр.

**Правило соответствия:** теги детальной страницы должны совпадать с `data-*` атрибутами её карточки на guide.html.

| Карточка | data-type | data-country | data-region | data-brand | data-city |
|---|---|---|---|---|---|
| 1. Four Seasons I | cruises | "" | worldwide | four-seasons | "" |
| 2. Erebero Hills | safari-lodge | uganda | africa | "" | bwindi |
| 3. Zannier Bendor → villa.html | islands | france | europe | zannier | french-riviera |
| 4. Mpala Jena | safari-lodge | zimbabwe | africa | "" | victoria-falls |
| 5. Four Seasons Danieli → danieli.html | historic-hotel | italy | europe | four-seasons | venice |
| 6. Eha → eha.html | retreat wellness | estonia | europe | "" | hiiumaa |
| 7. The Brecon | mountain-resort | switzerland | europe | "" | adelboden |
| 8. O'Madeleine → omadeleine.html | charter | mediterranean | mediterranean | golden-yachts | "" |
| 9. Six Senses Milan → six-senses-milan.html | wellness | italy | europe | six-senses | milan |
| 10. Four Seasons Маврикий | wellness | mauritius | indian-ocean | four-seasons | beau-champ |
| 11. Nômade Temple Ibiza | coastal-hotel | spain | europe | nomade | ibiza |
| 12. Orient Express | cruises | mediterranean | mediterranean | orient-express | "" |

**Multiple types:** одна карточка может иметь несколько типов — пишутся через пробел (`data-type="retreat wellness"`). Логика фильтра это поддерживает (`type.split(/\s+/).indexOf(state.type) !== -1`).

---

## Соглашения

### CSS-классы и стили

- `<html lang="ru" class="villa-page">` — обязательно `villa-page` (от него зависят глобальные `villa-section` стили).
- `<body class="<page-name>-page">` — для page-scoped CSS (например `eha-page`, `omadeleine-page`, `six-senses-milan-page`).
- Page-scoped стили в inline `<style>` блоке в `<head>`:
  - `.<page>-dropcap p:first-of-type::first-letter { font-family: 'Playfair', serif; font-weight: 500; float: left; font-size: 80px; line-height: 0.85; margin: 0 18px 0 0; color: #212121; }` — drop-cap для первой буквы первого параграфа.
  - Для 2-колоночных сеток фото: типичные пропорции — `aspect-ratio: 678 / 690` (левая колонка), `aspect-ratio: 452 / 690` (правая колонка с gap:6px), `flex: 0 0 calc((100% - 6px) * 337 / 684)` (верх), `347 / 684` (низ).
  - Для full-width одиночных hero — `aspect-ratio: 1110 / 830` или из реальных размеров фрейма Figma.

### Spotlight slider — синхронизация при создании новой детальной страницы

**КРИТИЧЕСКОЕ ПРАВИЛО.** Spotlight slider в каждой категории показывает «сестринские» детальные страницы (карточки из соответствующего хаба). Когда создаётся новая детальная страница — нужно НЕ ТОЛЬКО собрать её собственный spotlight, но и обновить spotlight на ВСЕХ ранее созданных сестринских страницах в этой же категории, добавив ссылку на новую.

**Why:** иначе пользователь, перейдя на старую детальную страницу, увидит spotlight, в котором новая страница либо отсутствует, либо ведёт на хаб вместо своей детальной. Это уже случалось — приходилось чинить ретроспективно.

**Категории и их хабы:**
| Категория | Хаб | Spotlight-карточки берутся из |
|---|---|---|
| Гид по отелям и яхтам | `guide.html` | 12 карточек guide.html |
| Зарубежная недвижимость / Prime Residences | `prime-residences.html` | 12 карточек prime-residences.html |
| Эксклюзивные автомобили | `cars.html` | карточки cars.html |
| Шедевры часового искусства | `watches.html` | карточки watches.html |

**Чек-лист при создании новой детальной страницы `<new-page>.html`:**
1. **На самой `<new-page>.html`** — собрать spotlight из всех сестринских карточек хаба, исключив саму себя. Каждая карточка `<a href="...">`:
   - если детальная страница для карточки уже существует — ссылка на неё (`maison-margiela.html` и т.п.);
   - если не создана — ссылка на хаб (`prime-residences.html`).
2. **На всех сестринских детальных страницах** (например `maison-margiela.html`, `limassol-blu-marine.html` для prime-residences) — обновить ту карточку spotlight, которая соответствует `<new-page>` — заменить `href="<хаб>.html"` на `href="<new-page>.html"`.
3. На хабе (`prime-residences.html` и т.п.) — обновить ссылку соответствующей карточки в сетке `card-section__col` тоже на `<new-page>.html`.

**Поиск целевых ссылок для замены** — по комбинации `href="<хаб>.html"` + `<img src="...card-N.jpg">` соответствующей карточки.

### Spotlight slider — общие стили (одинаковый CSS на всех страницах)

```css
.spotlight__slider .product { background-color: #f9f9f9; box-shadow: none; }
.spotlight__slider .product__wrap {
  height: 100%; background-color: #f9f9f9; border-radius: 12px; overflow: hidden;
}
@media (min-width: 1280px) {
  .spotlight__slider {
    --spotlight-slide-width: min(296px, calc((100vw - 40px - 30px * 3) / 4));
    width: calc(var(--spotlight-slide-width) * 4 + 30px * 3);
    margin: 0 auto;
    padding-left: 0; padding-right: 0;
    overflow: hidden;
  }
  .spotlight__slider .swiper-slide { width: var(--spotlight-slide-width) !important; }
  .spotlight__slider .product__img { aspect-ratio: 296 / 226; overflow: hidden; }
  .spotlight__slider .product__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
}
```

### Имена файлов и assets

- Имя файла страницы — короткий алиас по названию объекта: `eha.html`, `omadeleine.html`, `six-senses-milan.html`, `villa.html` (исключение для Zannier Bendor — раньше создан), `danieli.html` (исключение для Four Seasons Danieli).
- Assets — в подпапке `assets/images/<page-name>/`:
  - `hero-N.png` — full-width одиночные изображения.
  - `g{N}-{1|2|3}.png` — 2-колоночные сетки (1=левая большая, 2=правая верх, 3=правая низ).

### Burger menu

Везде кнопка burger должна иметь класс `header__burger--fixed` чтобы плавала с прокруткой:

```html
<button type="button" class="header__burger header__burger--fixed js-burger-open">
```

### Ссылки в nav-меню и footer

Везде:
- `ГИД ПО ОТЕЛЯМ И ЯХТАМ` → `guide.html`
- `ПРИЛОЖЕНИЕ ДЛЯ РЕЗИДЕНТОВ` → `app.html`
- `ВИТРИНА РЕКОМЕНДАЦИЙ` → `recommendation.html`
- `МЕЖДУНАРОДНАЯ КОМАНДА ЭКСПЕРТОВ` → `team.html`
- `КОНТАКТЫ` → `contacts.html`
- `УСЛУГИ ДЛЯ УК` → `services.html`
- `ПРИМЕР РЕАЛИЗОВАННОГО ПРОЕКТА` → `example.html`
- Остальные пункты (УСЛУГИ ДЛЯ РЕЗИДЕНТОВ, КАЛЕНДАРЬ, ЗАРУБЕЖНАЯ НЕДВИЖИМОСТЬ, ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ, ШЕДЕВРЫ ЧАСОВОГО ИСКУССТВА) — `#` (страниц пока нет).

---

## Workflow для новой страницы

### Шаг 1. Создание заготовки (если ещё нет)

1. Скопировать [villa.html](villa.html) → новый файл с именем-алиасом.
2. Заменить:
   - `<title>` — название объекта + `| Nobell`.
   - Breadcrumbs — `Гид → регион → страна → город` (или `Гид → Яхтинг → ...` для яхт).
   - `<section class="services-section">` — placeholder с h1 + описание + 1 hero + 1 параграф «Контент готовится».
   - `<section class="villa-section">` — placeholder в tech-spec + теги по соответствию с card в guide.html.
   - В spotlight slider — обновить ссылки 12 карточек на актуальные файлы.
3. Добавить `class="<page-name>-page"` к `<body>`.
4. Создать карточку в [guide.html](guide.html) с правильными `data-*` атрибутами.
5. Добавить недостающие направления в `<select>` dropdown на guide.html (если city/region/country новые).

### Шаг 2. Наполнение из Figma (pixel-perfect)

1. Получить от пользователя ссылку на ноду в Figma — десктопный фрейм 1440px шириной (не мобильный).
2. Извлечь nodeId из URL (формат `node-id=2686-12772` → `2686:12772`).
3. Вызвать `mcp__claude_ai_Figma__get_design_context` — получить React/Tailwind-референс с текстами и URL-ами картинок.
4. Скачать все картинки в `assets/images/<page-name>/` через `curl -sL -o ...`.
5. Заменить `<section class="services-section">` body на реальный layout по Figma:
   - Заголовок и описание (italic).
   - Hero и/или 2-колоночные сетки + текстовые блоки в правильной последовательности.
   - Drop-cap на первом тексте через `.<page>-dropcap`.
   - Photo caption — `<p class="services__img-text services__img-text--right">`.
6. Заменить tech-spec список на реальные пункты из Figma (точно как в Figma, включая em-dashes, soft hyphens, кавычки).
7. Обновить теги внизу villa-section по правилу соответствия с card в guide.html.
8. Добавить page-scoped CSS в inline `<style>` блок (drop-cap + aspect-ratio для каждого типа изображения/сетки).

### Шаг 3. Делегирование агенту (для сложных страниц)

Для страниц с большим количеством текста и фото — делегировать general-purpose агенту с подробным prompt'ом. Образец промпта см. в истории коммитов или в этом гайде ниже.

### Шаг 4. Коммит и пуш

```bash
git add <files...>
git commit -m "feat: fill <page-name>.html from Figma node <nodeId>"
git push origin main
```

GitHub Pages обновится через ~1 минуту на `https://myapsite.github.io/nobell/<page-name>.html`.

---

## Образец промпта для агента

```
You are working in `e:\GitHub\nobell`. Fill `<page-name>.html` with content from Figma node `<nodeId>` in file `NOdptEwohMMLLm3ViBNulu`. Goal: pixel-perfect at desktop 1440px.

This is the page about <object name>. Card N in guide.html, type=<X>, country=<Y>, region=<Z>, city=<W>, brand=<B>.

## Reference: same pattern as eha.html, omadeleine.html, six-senses-milan.html
Read those first to understand the working pattern: <body class="<page>-page">, inline <style> with .<page>-dropcap and aspect-ratio rules, alternating services__img + services__text blocks.

## Constraints — DO NOT modify
- header, breadcrumbs, burger menu, footer, popup, scripts
- Spotlight section (12 cards with hrefs)
- assets/css/* and assets/js/app.js
- Other detail pages
- Keep <html lang="ru" class="villa-page">; add <body class="<page-name>-page">

## What to do
1. Call mcp__claude_ai_Figma__get_design_context for nodeId/fileKey.
2. Extract: title, italic description, body paragraphs (with drop-cap on first), all image URLs, tech-spec items, photo caption.
3. Download images via curl to assets/images/<page-name>/. Naming: hero-1, hero-2 for full-width images; g1-1/g1-2/g1-3 for 2-col grids.
4. Replace <title>, add body class, add inline <style> with page-scoped drop-cap + aspect-ratio.
5. Replace services-section body with real Figma layout.
6. Replace villa-section tech-spec with real items, update tags per guide.html card data-attrs.

## Critical
- Russian text EXACT (em-dashes, soft hyphens, curly quotes)
- Image aspect ratios per Figma frame sizes
- Photo grids: replicate Figma layout exactly
- Don't commit/push — user reviews

## When done, report (under 250 words)
1. Number of images downloaded with filenames
2. Confirmation untouched: header/footer/spotlight/nav/popup
3. Decisions for ambiguous content
```

---

## Когда добавляются новые направления

Если объект находится в стране/городе/регионе которых нет в `<select>` dropdown на guide.html (`<ul class="guide-form__dropdown">`) — добавить опцию.

**Принцип:** в dropdown должны быть только реально встречающиеся направления. Структура: регион → страна (с `—` префиксом) → город (с `— —` префиксом). Бренды в dropdown не добавляем (они не «направление»).

Пример: добавление страны Япония + города Киото для будущей карточки:
```html
<li class="guide-form__option js-select-option" data-value="asia">АЗИЯ</li>
<li class="guide-form__option js-select-option" data-value="japan">— ЯПОНИЯ</li>
<li class="guide-form__option js-select-option" data-value="kyoto">— — КИОТО</li>
```

---

## Поведение фильтра на guide.html

JS-логика на guide.html (внутри inline-script в конце body) делает:
- При загрузке страницы — парсит URL: `?type=`, `?country=`, `?region=`, `?city=`, `?brand=`.
- Все location-параметры (country/region/city/brand) объединяются в `state.direction`.
- Применяет фильтр: matchType + matchDirection + search.
- Подставляет в dropdown UI выбранную опцию (если она есть в списке).
- Подсвечивает active type-кнопку.
- Реагирует на клики по type-кнопкам, dropdown-опциям, ввод в поиск (debounce 200ms).

---

## Чек-лист перед коммитом

- [ ] `<body>` имеет `class="<page-name>-page"`.
- [ ] Breadcrumbs корректные (соответствуют location).
- [ ] Burger button имеет класс `header__burger--fixed`.
- [ ] Inline `<style>` содержит drop-cap правило и aspect-ratio для каждого типа изображения.
- [ ] Drop-cap класс применён на первом текстовом блоке.
- [ ] Каждое изображение скачано в `assets/images/<page-name>/`.
- [ ] Все теги внизу villa-section соответствуют data-attrs соответствующей card в guide.html.
- [ ] Card в guide.html имеет правильные data-attrs (если новая страна/город — добавить data-* атрибут и опцию в dropdown).
- [ ] Spotlight slider не тронут.
- [ ] `<header>`, `<footer>`, `<nav class="nav js-burger">`, `<div class="popup">` не тронуты.
- [ ] Russian text — точно как в Figma (em-dashes, soft hyphens, кавычки).

---

## Текущее состояние (на момент написания)

**Заготовки созданы для всех 12 страниц.**

**Наполнены из Figma:**
- ✅ [villa.html](villa.html) — Zannier Bendor (создан до этой работы)
- ✅ [danieli.html](danieli.html) — Four Seasons Danieli (создан до этой работы)
- ✅ [eha.html](eha.html) — Eha
- ✅ [omadeleine.html](omadeleine.html) — O'Madeleine
- ✅ [six-senses-milan.html](six-senses-milan.html) — Six Senses Milan

**Только заготовки (placeholder контент):**
- ⏳ [four-seasons-i.html](four-seasons-i.html) — Four Seasons I
- ⏳ [erebero-hills.html](erebero-hills.html) — Erebero Hills
- ⏳ [mpala-jena.html](mpala-jena.html) — Mpala Jena Private Villas
- ⏳ [brecon.html](brecon.html) — The Brecon
- ⏳ [four-seasons-mauritius.html](four-seasons-mauritius.html) — Four Seasons Mauritius
- ⏳ [nomade-ibiza.html](nomade-ibiza.html) — Nômade Temple Ibiza
- ⏳ [orient-express.html](orient-express.html) — Orient Express
