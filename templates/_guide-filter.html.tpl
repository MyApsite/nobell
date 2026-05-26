  <script defer>
    (function () {
      function init() {
        var cards = document.querySelectorAll('.guide__cards .card-section__col');
        var buttons = document.querySelectorAll('.guide__filter .guide-btn');
        var selectInput = document.querySelector('.guide-form__field--select .js-select-input');
        var searchInput = document.querySelector('input[name="guide-search"]');
        var resultsLabel = document.querySelector('.guide__results');
        var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');
        if (!cards.length) return;

        var state = { type: 'all', direction: '', search: '' };

        // Чтение URL-параметров: ?type=, ?country=, ?region=, ?brand=, ?city= — все
        // location-фильтры объединяем в одно поле direction (соответствует выбору в dropdown).
        try {
          var params = new URLSearchParams(window.location.search);
          if (params.get('type')) state.type = params.get('type');
          state.direction = params.get('country') || params.get('region') || params.get('city') || params.get('brand') || '';
        } catch (e) {}

        function getCardText(card) {
          return (card.textContent || '').toLowerCase();
        }

        function applyFilters() {
          var visible = 0;
          var search = state.search.trim().toLowerCase();
          cards.forEach(function (card) {
            var type = card.getAttribute('data-type') || '';
            var country = card.getAttribute('data-country') || '';
            var region = card.getAttribute('data-region') || '';
            var brand = card.getAttribute('data-brand') || '';
            var city = card.getAttribute('data-city') || '';
            var matchType = state.type === 'all' || type.split(/\s+/).indexOf(state.type) !== -1;
            // direction совпадает с country, region, city или brand карточки.
            // Все эти поля поддерживают мульти-значения через пробел (как и data-type),
            // чтобы карточка могла одновременно относиться к нескольким регионам/брендам и т.д.
            var matchDirection = !state.direction
              || country.split(/\s+/).indexOf(state.direction) !== -1
              || region.split(/\s+/).indexOf(state.direction) !== -1
              || city.split(/\s+/).indexOf(state.direction) !== -1
              || brand.split(/\s+/).indexOf(state.direction) !== -1;
            var matchSearch = !search || getCardText(card).indexOf(search) !== -1;
            var show = matchType && matchDirection && matchSearch;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
          });
          if (resultsLabel) {
            resultsLabel.textContent = 'Показано ' + visible + ' из ' + cards.length + ' результатов';
          }
          if (loadMoreBtn) {
            // Кнопка "Загрузить больше" — ховається коли всі картки видно (немає пагінації).
            // Коли пагінація буде реалізована — змінити умову на (visible < total_in_db).
            loadMoreBtn.style.display = (visible >= cards.length) ? 'none' : '';
          }
        }

        // Кнопки-типы (прибрежный отель / ретрит / круизы и т.д.)
        buttons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            buttons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.type = btn.getAttribute('data-type') || 'all';
            applyFilters();
          });
        });

        // Dropdown — слушаем изменение скрытого input (его правит компонент select из app.js)
        if (selectInput) {
          var lastValue = selectInput.value;
          // app.js не диспатчит change → проверяем вручную через MutationObserver на data-value у js-select-btn
          var selectBtn = document.querySelector('.guide-form__field--select .js-select-btn');
          if (selectBtn) {
            var observer = new MutationObserver(function () {
              var newValue = selectBtn.getAttribute('data-value') || '';
              if (newValue !== lastValue) {
                lastValue = newValue;
                state.direction = newValue;
                applyFilters();
              }
            });
            observer.observe(selectBtn, { attributes: true, attributeFilter: ['data-value'] });
          }
          // Также вручную клики по опциям (на случай если data-value не меняется)
          document.querySelectorAll('.guide-form__field--select .js-select-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
              state.direction = opt.getAttribute('data-value') || '';
              applyFilters();
            });
          });
        }

        // Поиск
        if (searchInput) {
          var debounce;
          searchInput.addEventListener('input', function (e) {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
              state.search = e.target.value;
              applyFilters();
            }, 200);
          });
        }

        // Не сабмитим форму — фильтр работает живьём
        var form = document.querySelector('.guide-form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

        // Если из URL пришёл type — подсветить соответствующую кнопку
        if (state.type !== 'all') {
          buttons.forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-type') === state.type);
          });
        }
        // Если пришёл country — подставить в видимое значение dropdown
        if (state.direction) {
          var btn = document.querySelector('.guide-form__field--select .js-select-btn');
          var label = document.querySelector('.guide-form__field--select .js-select-value');
          var hidden = document.querySelector('.guide-form__field--select .js-select-input');
          var opt = document.querySelector('.guide-form__field--select .js-select-option[data-value="' + state.direction + '"]');
          if (btn) btn.setAttribute('data-value', state.direction);
          if (hidden) hidden.value = state.direction;
          if (opt && label) label.textContent = opt.textContent.trim();
        }

        applyFilters();
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
  </script>
