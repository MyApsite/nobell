<!DOCTYPE html>
<html lang="ru" class="villa-page">
<head>
  {% include '_head.html.tpl' %}
  <style>{{ page.inline_style|safe }}</style>
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
                {% if block.has_webp|default(false) %}
                <source srcset="{{ block.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                {% endif %}
                <img src="{{ block.image_base }}.{{ block.image_ext }}" alt="{{ block.alt }}">
              </picture>
              {% if block.caption|default('') %}
              <p class="services__img-text{% if block.caption_align|default('') == 'right' %} services__img-text--right{% endif %}">{{ block.caption }}</p>
              {% endif %}
            </div>
            {% elif block.type == 'picture' %}
            <div class="services__img">
              <picture>
                {% if block.has_webp|default(false) %}
                <source srcset="{{ block.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                {% endif %}
                <img src="{{ block.image_base }}.{{ block.image_ext }}" alt="{{ block.alt }}">
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
                    {% if block.left.has_webp|default(false) %}
                    <source srcset="{{ block.left.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                    {% endif %}
                    <img src="{{ block.left.image_base }}.{{ block.left.image_ext }}" alt="{{ block.left.alt }}">
                  </picture>
                </div>
                <div class="services__img-col">
                  {% for pic in block.right %}
                  <picture>
                    {% if pic.has_webp|default(false) %}
                    <source srcset="{{ pic.image_base }}.webp" type="image/webp" media="(min-width: 768px)">
                    {% endif %}
                    <img src="{{ pic.image_base }}.{{ pic.image_ext }}" alt="{{ pic.alt }}">
                  </picture>
                  {% endfor %}
                </div>
              </div>
            </div>
            {% elif block.type == 'text' %}
            <div class="services__text{% if block.dropcap|default(false) %} services__text--first {{ page.dropcap_class }}{% endif %}">
              {% for p in block.paragraphs %}
              <p>{{ p|safe }}</p>
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
                      <li>{{ item|safe }}</li>
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
                  <p class="villa-descr__text">{{ page.partners_text }}</p>
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
            <h2 class="section-title">{{ spotlight_title }}</h2>
          </div>
          <div class="spotlight__slider js-spotlight-slider">
            <div class="swiper-wrapper">
              {% for s in spotlight %}
              <div class="swiper-slide">
                <a href="{{ s.slug }}.html" class="product">
                  <div class="product__wrap">
                    <div class="product__img">
                      <picture><source type="image/webp" srcset="{{ s.card.card_image_base }}.webp"><img loading="lazy" src="{{ s.card.card_image_base }}.{{ s.card.card_image_ext }}" alt=""></picture>
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
            <a href="{{ category_href }}" class="btn primary">{{ category_label }}</a>
          </div>
        </div>
      </section>
    </main>
    {% include '_footer.html.tpl' %}

    {% include '_nav.html.tpl' %}

    {% include '_popup.html.tpl' %}

    {% include '_popup-login.html.tpl' %}
  </div>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="assets/js/vendor.min.js" defer></script>
  <script src="assets/js/app.js" defer></script>
</body>

</html>
