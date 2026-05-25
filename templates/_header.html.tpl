    <header class="header">
      <a href="/" class="header__logo">
        <img src="assets/images/logo.svg" alt="">
      </a>

      <div class="breadcrumbs">
        <a href="/">
          <img src="assets/images/home.svg" alt="">
        </a>
        <img src="assets/images/next.svg" alt="">
        {% if category_only %}
        <span>{{ category_label }}</span>
        {% else %}
        <a href="{{ category_href }}">{{ category_label }}</a>
        {% for c in crumbs %}
        <img src="assets/images/next.svg" alt="">
        {% if c.href %}
        <a href="{{ c.href }}">{{ c.label }}</a>
        {% else %}
        <span>{{ c.label }}</span>
        {% endif %}
        {% endfor %}
        {% endif %}
      </div>

      <button type="button" class="header__burger header__burger--fixed js-burger-open">
        <div class="header__burger-mob">
          <img src="assets/images/b-mob.svg" alt="">
        </div>
        <div class="header__burger-desk">
          <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="15" height="1" fill="#000000" />
            <rect y="6" width="23" height="1" fill="#000000" />
            <rect x="8" y="13" width="15" height="1" fill="#000000" />
          </svg>
        </div>
      </button>
    </header>
