  <!-- Фильтрация карточек авто: по типу кузова (кнопки), по бренду (dropdown), по тексту (search) -->
  <script defer>
    (function () {
      function init() {
        var cards = document.querySelectorAll('.cars-grid .cars-grid__col');
        var buttons = document.querySelectorAll('.guide__filter .guide-btn');
        var selectInput = document.querySelector('.guide-form__field--select .js-select-input');
        var searchInput = document.querySelector('input[name="cars-search"]');
        var resultsLabel = document.querySelector('.guide__results');
        var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');
        if (!cards.length) return;

        var totalCatalog = 947;
        var state = { type: 'all', direction: '', search: '' };

        // Чтение URL-параметров: ?type=, ?brand=
        try {
          var params = new URLSearchParams(window.location.search);
          if (params.get('type')) state.type = params.get('type');
          state.direction = params.get('brand') || '';
        } catch (e) {}

        function getCardText(card) {
          return (card.textContent || '').toLowerCase();
        }

        function applyFilters() {
          var visible = 0;
          var search = state.search.trim().toLowerCase();
          cards.forEach(function (card) {
            var type = card.getAttribute('data-type') || '';
            var brand = card.getAttribute('data-brand') || '';
            var matchType = state.type === 'all' || type.split(/\s+/).indexOf(state.type) !== -1;
            // brand-поле также поддерживает мульти-значения через пробел
            var matchDirection = !state.direction
              || brand.split(/\s+/).indexOf(state.direction) !== -1;
            var matchSearch = !search || getCardText(card).indexOf(search) !== -1;
            var show = matchType && matchDirection && matchSearch;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
          });
          if (resultsLabel) {
            // Если фильтры активны — показываем visible/visible. Если нет — visible из общего каталога 947.
            if (state.type !== 'all' || state.direction || search) {
              resultsLabel.textContent = 'Показано ' + visible + ' из ' + visible + ' результатов';
            } else {
              resultsLabel.textContent = 'Показаны ' + visible + ' из ' + totalCatalog + ' результатов';
            }
          }
        }

        // Кнопки-типы (спорткар / внедорожник / купе и т.д.)
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
          // Также вручную клики по опциям
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

        // Не сабмитим форму
        var form = document.querySelector('.guide-form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

        // Если из URL пришёл type — подсветить соответствующую кнопку
        if (state.type !== 'all') {
          buttons.forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-type') === state.type);
          });
        }
        // Если пришёл brand — подставить в видимое значение dropdown
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
