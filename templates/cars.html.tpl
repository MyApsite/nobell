{# Cars catalog: cars-grid layout (different from card-section). #}
<!DOCTYPE html>
<html lang="ru">
<head>
  {% include '_head.html.tpl' %}
  <style>{{ catalog.inline_style|safe }}</style>
</head>

<body>
  <div class="wrapper">
    {% include '_header.html.tpl' %}

    <main class="main">
      <section class="card-section card-section--slider">
        <div class="container">
          <div class="card-section__head">
            <h1 class="card-section__title">{{ catalog.hero_title }}</h1>
            <p class="card-section__text">{{ catalog.hero_subtitle }}</p>
          </div>

          <div class="card-section__slider">
            <div class="rec-slider js-rec-slider">
              <div class="swiper-wrapper">
                {% for s in catalog.hero_slides %}
                <div class="swiper-slide">
                  <a href="{{ s.href }}" class="house-card">
                    <div class="house-card__wrap">
                      <div class="house-card__img">
                        <picture><source type="image/webp" srcset="{{ s.image_base }}.webp"><img loading="lazy" src="{{ s.image_base }}.{{ s.image_ext }}" alt="{{ s.alt }}"></picture>
                      </div>
                      <div class="house-card__body">
                        <h3 class="house-card__title">{{ s.title }}</h3>
                        <p class="house-card__text">{{ s.text }}</p>
                      </div>
                    </div>
                  </a>
                </div>
                {% endfor %}
              </div>
              <div class="rec-slider__nav">
                <button type="button" class="rec-slider__btn js-prev">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 22L7 12L17 2" stroke="#212121" stroke-width="2" />
                  </svg>
                </button>
                <div class="rec-slider__pagination js-pagination"></div>
                <button type="button" class="rec-slider__btn js-next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2L17 12L7 22" stroke="#212121" stroke-width="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card-section">
        <div class="container">
          <div class="guide">
            <div class="guide__head">
              <div class="guide__nav">
                <form action="#" class="guide-form">
                  <div class="guide-form__wrap">
                    <label class="guide-form__field guide-form__field--search" aria-label="Поиск">
                      <button type="submit" class="guide-form__btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.75 15.75L12.4928 12.4927M12.4928 12.4927C13.0499 11.9356 13.4919 11.2741 13.7935 10.5461C14.095 9.81816 14.2502 9.03792 14.2502 8.24997C14.2502 7.46202 14.095 6.68178 13.7935 5.95381C13.4919 5.22584 13.0499 4.56439 12.4928 4.00722C11.9356 3.45006 11.2742 3.00809 10.5462 2.70655C9.81822 2.40502 9.03798 2.24982 8.25003 2.24982C7.46208 2.24982 6.68184 2.40502 5.95387 2.70655C5.2259 3.00809 4.56445 3.45006 4.00728 4.00722C2.88204 5.13247 2.24988 6.65863 2.24988 8.24997C2.24988 9.84131 2.88204 11.3675 4.00728 12.4927C5.13253 13.618 6.65869 14.2501 8.25003 14.2501C9.84137 14.2501 11.3675 13.618 12.4928 12.4927Z"
                            stroke="#D8D8D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                      <input type="search" name="{{ catalog.search_name }}" class="guide-form__input" placeholder="ПОИСК">
                    </label>

                    <div class="guide-form__field guide-form__field--select js-select">
                      <input type="hidden" name="{{ catalog.hidden_name }}" class="js-select-input" value="">
                      <button type="button" class="guide-form__select-btn js-select-btn" data-value="">
                        <span class="guide-form__select-value js-select-value">{{ catalog.dropdown_button_label }}</span>
                        <span class="guide-form__select-arrow" aria-hidden="true">
                          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L8 8L14 2" stroke="#232323" stroke-width="2" stroke-linecap="round" />
                          </svg>
                        </span>
                      </button>

                      <ul class="guide-form__dropdown js-select-list">
                        <li class="guide-form__option js-select-option active" data-value="">{{ catalog.dropdown_default_option }}</li>
                        {% for opt in catalog.dropdown_items %}
                        <li class="guide-form__option js-select-option" data-value="{{ opt.value }}">{{ opt.label }}</li>
                        {% endfor %}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
              <div class="guide__filter">
                {% for b in catalog.filter_buttons %}
                <button type="button" class="guide-btn{% if b.active|default(false) %} active{% endif %}" data-{{ b.dim|default('type') }}="{{ b.value }}">{{ b.label }}</button>
                {% endfor %}
              </div>
            </div>

            <div class="cars-grid">
              {% for s in items %}
              <div class="cars-grid__col"{% for k, v in s.card.items() %}{% if k.startswith('data_') and v %} data-{{ k[5:]|replace('_','-') }}="{{ v }}"{% endif %}{% endfor %}>
                <a href="{{ s.slug }}.html" class="product">
                  <div class="product__img">
                    <picture>
                      <source srcset="{{ s.card.card_image_base }}.webp" type="image/webp">
                      <img loading="lazy" src="{{ s.card.card_image_base }}.{{ s.card.card_image_ext }}" alt="{{ s.card.card_alt }}">
                    </picture>
                  </div>
                  <div class="product__body">
                    <span class="product__tag">{{ s.card.card_tag }}</span>
                    <h3 class="product__title">{{ s.card.card_title }}</h3>
                    <p class="product__text">{{ s.card.card_text }}</p>
                  </div>
                </a>
              </div>
              {% endfor %}
            </div>

            <div class="guide__footer">
              <p class="guide__results">Показаны {{ items|length }} из {{ catalog.total_results }} результатов</p>
            </div>
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
  {% if filter_partial %}{% include filter_partial %}{% endif %}
</body>

</html>
