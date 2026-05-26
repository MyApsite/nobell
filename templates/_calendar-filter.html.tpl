  <script defer>
    (function () {
      function init() {
        var cards = document.querySelectorAll('.guide__cards .card-section__col');
        var buttons = document.querySelectorAll('.guide__filter .guide-btn');
        var selectInput = document.querySelector('.guide-form__field--select .js-select-input');
        var searchInput = document.querySelector('input[name="calendar-search"]');
        var resultsLabel = document.querySelector('.guide__results');
        var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');
        if (!cards.length) return;

        var state = { month: 'all', format: '', city: '', country: '', region: '', search: '' };

        // URL-параметры: ?month=, ?format=, ?city=, ?country=, ?region= (теги на детальных страницах ведут сюда)
        try {
          var params = new URLSearchParams(window.location.search);
          if (params.get('month')) state.month = params.get('month');
          if (params.get('format')) state.format = params.get('format');
          if (params.get('city')) state.city = params.get('city');
          if (params.get('country')) state.country = params.get('country');
          if (params.get('region')) state.region = params.get('region');
        } catch (e) {}

        function getCardText(card) {
          return (card.textContent || '').toLowerCase();
        }

        function applyFilters() {
          var visible = 0;
          var search = state.search.trim().toLowerCase();
          cards.forEach(function (card) {
            var month = card.getAttribute('data-month') || '';
            var format = card.getAttribute('data-format') || '';
            var city = card.getAttribute('data-city') || '';
            var country = card.getAttribute('data-country') || '';
            var region = card.getAttribute('data-region') || '';
            // data-month поддерживает мульти-значения через пробел (например, событие на стыке месяцев).
            var matchMonth = state.month === 'all' || month.split(/\s+/).indexOf(state.month) !== -1;
            var matchFormat = !state.format || format.split(/\s+/).indexOf(state.format) !== -1;
            var matchCity = !state.city || city.split(/\s+/).indexOf(state.city) !== -1;
            var matchCountry = !state.country || country.split(/\s+/).indexOf(state.country) !== -1;
            var matchRegion = !state.region || region.split(/\s+/).indexOf(state.region) !== -1;
            var matchSearch = !search || getCardText(card).indexOf(search) !== -1;
            var show = matchMonth && matchFormat && matchCity && matchCountry && matchRegion && matchSearch;
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

        // Кнопки-месяцы
        buttons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            buttons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.month = btn.getAttribute('data-month') || 'all';
            applyFilters();
          });
        });

        // Dropdown форматов
        if (selectInput) {
          var lastValue = selectInput.value;
          var selectBtn = document.querySelector('.guide-form__field--select .js-select-btn');
          if (selectBtn) {
            var observer = new MutationObserver(function () {
              var newValue = selectBtn.getAttribute('data-value') || '';
              if (newValue !== lastValue) {
                lastValue = newValue;
                state.format = newValue;
                applyFilters();
              }
            });
            observer.observe(selectBtn, { attributes: true, attributeFilter: ['data-value'] });
          }
          document.querySelectorAll('.guide-form__field--select .js-select-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
              state.format = opt.getAttribute('data-value') || '';
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

        var form = document.querySelector('.guide-form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

        // Подсветка активной кнопки месяца из URL
        if (state.month !== 'all') {
          buttons.forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-month') === state.month);
          });
        }
        // Подстановка выбранного формата из URL в dropdown
        if (state.format) {
          var btn = document.querySelector('.guide-form__field--select .js-select-btn');
          var label = document.querySelector('.guide-form__field--select .js-select-value');
          var hidden = document.querySelector('.guide-form__field--select .js-select-input');
          var opt = document.querySelector('.guide-form__field--select .js-select-option[data-value="' + state.format + '"]');
          if (btn) btn.setAttribute('data-value', state.format);
          if (hidden) hidden.value = state.format;
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
  <script defer>
    (function () {
      var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
      var d = new Date();
      var el = document.getElementById('js-today-date');
      if (el) el.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    })();
  </script>
