<!DOCTYPE html>
<html lang="ru" class="villa-page">
<head>
  {% include '_head.html.tpl' %}
  <style>
    /* Italic подзаголовок под H1 — Playfair Italic 11px / 18px / 0.88px (по Figma) */
    .{{ page.body_class }} .services__description p {
      font-family: 'Playfair', serif;
      font-style: italic;
      font-size: 11px;
      line-height: 18px;
      letter-spacing: 0.88px;
      color: #212121;
    }
    {% if page.dropcap_class %}
    /* Drop-cap в первом параграфе — Playfair Display Medium 80px */
    .{{ page.dropcap_class }} p:first-of-type::first-letter {
      font-family: 'Playfair', serif;
      font-weight: 500;
      float: left;
      font-size: 80px;
      line-height: 0.85;
      margin: 0 18px 0 0;
      color: #212121;
    }
    {% endif %}
    {% if has_hero %}
    /* Full-width hero — пропорции 1110×830 из Figma */
    .{{ page.body_class }} .services__img--hero picture,
    .{{ page.body_class }} .services__img--hero img {
      aspect-ratio: 1110 / 830;
      width: 100%;
      object-fit: cover;
      display: block;
    }
    {% endif %}
    {% if has_grid %}
    /* Сетка фото: пропорции по Figma. Левая колонка 678/690, правая колонка 452/690 с двумя картинками 337+347 / gap 6px */
    .{{ page.body_class }} .services__img-row .services__img-col:first-child {
      aspect-ratio: 678 / 690;
    }
    .{{ page.body_class }} .services__img-row .services__img-col:nth-child(2) {
      aspect-ratio: 452 / 690;
      gap: 6px;
    }
    .{{ page.body_class }} .services__img-row picture {
      display: block;
      width: 100%;
      overflow: hidden;
      flex: 1 1 auto;
    }
    .{{ page.body_class }} .services__img-row picture img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    /* Правая колонка: верхняя 337/690, нижняя 347/690 */
    .{{ page.body_class }} .services__img-row .services__img-col:nth-child(2) picture:nth-of-type(1) {
      flex: 0 0 calc((100% - 6px) * 337 / 684);
      height: auto;
    }
    .{{ page.body_class }} .services__img-row .services__img-col:nth-child(2) picture:nth-of-type(2) {
      flex: 0 0 calc((100% - 6px) * 347 / 684);
      height: auto;
    }
    {% endif %}
    /* Spotlight: на десктопе 4 карточки по 296px */
    .spotlight__slider .product {
      background-color: #f9f9f9;
      box-shadow: none;
    }

    .spotlight__slider .product__wrap {
      height: 100%;
      background-color: #f9f9f9;
      border-radius: 12px;
      overflow: hidden;
    }

    @media (min-width: 1280px) {
      .spotlight__slider {
        --spotlight-slide-width: min(296px, calc((100vw - 40px - 30px * 3) / 4));
        width: calc(var(--spotlight-slide-width) * 4 + 30px * 3);
        margin: 0 auto;
        padding-left: 0;
        padding-right: 0;
        overflow: hidden;
      }
      .spotlight__slider .swiper-slide { width: var(--spotlight-slide-width) !important; }
      .spotlight__slider .product__img { aspect-ratio: 296 / 226; overflow: hidden; }
      .spotlight__slider .product__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    }
  </style>
</head>

<body class="{{ page.body_class }}">
  <div class="wrapper">
    {% include '_header.html.tpl' %}

    <main class="main">
      <section class="services-section">
        <div class="container">
          <div class="services">
            <div class="services__head">
              <div class="services__title">
                <h1>{{ page.h1 }}</h1>
              </div>
              <div class="services__description">
                <p>{{ page.intro }}</p>
              </div>
              <div class="services__contacts">
                <span>Share</span>
                <div class="services__soc">
                  <a href="#" class="footer__social-link" aria-label="whatsapp">
                    <img src="assets/images/whatsapp.svg" alt="">
                  </a>
                  <a href="#" class="footer__social-link" aria-label="linkedin">
                    <img src="assets/images/linkedin.svg" alt="">
                  </a>
                  <a href="#" class="footer__social-link" aria-label="facebook">
                    <img src="assets/images/facebook.svg" alt="">
                  </a>
                  <a href="#" class="footer__social-link" aria-label="mail">
                    <img src="assets/images/mail.svg" alt="">
                  </a>
                </div>
              </div>
            </div>
            {% for block in page.body %}
            {% if block.type == 'hero' %}
            <div class="services__img services__img--hero">
              <picture>
                <source srcset="{{ block.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                <img src="{{ block.image_base }}.jpg" alt="{{ block.alt }}">
              </picture>
              {% if block.caption|default('') %}
              <p class="services__img-text{% if block.caption_align|default('') == 'right' %} services__img-text--right{% endif %}">{{ block.caption }}</p>
              {% endif %}
            </div>
            {% elif block.type == 'grid_2col' %}
            <div class="services__img">
              <div class="services__img-row">
                <div class="services__img-col">
                  <picture>
                    <source srcset="{{ block.left.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                    <img src="{{ block.left.image_base }}.jpg" alt="{{ block.left.alt }}">
                  </picture>
                </div>
                <div class="services__img-col">
                  {% for pic in block.right %}
                  <picture>
                    <source srcset="{{ pic.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                    <img src="{{ pic.image_base }}.jpg" alt="{{ pic.alt }}">
                  </picture>
                  {% endfor %}
                </div>
              </div>
            </div>
            {% elif block.type == 'text' %}
            <div class="services__text{% if block.dropcap|default(false) %} services__text--first {{ page.dropcap_class }}{% endif %}">
              {% for p in block.paragraphs %}
              <p>{{ p }}</p>
              {% endfor %}
            </div>
            {% endif %}
            {% endfor %}
          </div>
        </div>
      </section>

      <section class="villa-section">
        <div class="container">
          <div class="villa">
            <div class="villa__tech">
              <div class="tech">
                <div class="tech__wrap">
                  <div class="tech__head">
                    <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.16504 3.75L-2.47955e-05 0L4.3301 0L2.16504 3.75Z" fill="#212121" />
                    </svg>
                    <span>Техническая спецификация</span>
                  </div>
                  <div class="tech__body">
                    <ul>
                      {% for item in page.tech_spec %}
                      <li>{{ item }}</li>
                      {% endfor %}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="villa__descr">
              <div class="villa-descr">
                <div class="villa-descr__content">
                  <div class="villa-descr__title">
                    <h2 class="section-title">Nobell Partners Community</h2>
                  </div>
                  <p class="villa-descr__text">Благодаря международному сообществу партнёров Nobell наши клиенты
                    получают прямой доступ к лучшим
                    ценам и экспертизе высшего уровня</p>
                  <a href="#" class="card-section__link js-popup-open">
                    <img loading="lazy" src="assets/images/arrow-to.svg" alt="">
                    <span>{{ page.cta_text }}</span>
                  </a>
                </div>
                <div class="villa-descr__footer">
                  <div class="services__contacts">
                    <span>Share</span>
                    <div class="services__soc">
                      <a href="#" class="footer__social-link" aria-label="whatsapp">
                        <img src="assets/images/whatsapp.svg" alt="">
                      </a>
                      <a href="#" class="footer__social-link" aria-label="linkedin">
                        <img src="assets/images/linkedin.svg" alt="">
                      </a>
                      <a href="#" class="footer__social-link" aria-label="facebook">
                        <img src="assets/images/facebook.svg" alt="">
                      </a>
                      <a href="#" class="footer__social-link" aria-label="mail">
                        <img src="assets/images/mail.svg" alt="">
                      </a>
                    </div>
                  </div>
                  <div class="villa-descr__tags">
                    {% for tag in page.tags %}
                    <a href="{{ tag.href }}" class="villa-tag">{{ tag.label }}</a>
                    {% endfor %}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight">
          <div class="spotlight__title">
            <h2 class="section-title">In the Spotlight</h2>
          </div>
          <div class="spotlight__slider js-spotlight-slider">
            <div class="swiper-wrapper">
              {% for s in siblings %}
              <div class="swiper-slide">
                <a href="{{ s.slug }}.html" class="product">
                  <div class="product__wrap">
                    <div class="product__img">
                      <picture><source type="image/webp" srcset="{{ s.card.card_image_base }}.webp"><img loading="lazy" src="{{ s.card.card_image_base }}.jpg" alt=""></picture>
                    </div>
                    <div class="product__body">
                      <span class="product__tag">{{ s.card.card_tag }}</span>
                      <h3 class="product__title">{{ s.card.card_title }}</h3>
                      <p class="product__text">{{ s.card.card_text }}</p>
                    </div>
                  </div>
                </a>
              </div>
              {% endfor %}
            </div>
            <div class="spotlight__nav">
              <button type="button" class="rec-slider__btn js-spotlight-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 22L7 12L17 2" stroke="#212121" stroke-width="2" />
                </svg>
              </button>
              <div class="rec-slider__pagination js-spotlight-pagination"></div>
              <button type="button" class="rec-slider__btn js-spotlight-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2L17 12L7 22" stroke="#212121" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <div class="spotlight__footer">
            <a href="cars.html" class="btn primary">ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ</a>
          </div>
        </div>
      </section>
    </main>
    {% include '_footer.html.tpl' %}

    {% include '_nav.html.tpl' %}

    {% include '_popup.html.tpl' %}
  </div>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="assets/js/vendor.min.js" defer></script>
  <script src="assets/js/app.js" defer></script>
</body>

</html>
