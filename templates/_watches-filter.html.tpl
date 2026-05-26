  <!-- Фильтрация карточек часов: по типу (кнопки), по бренду (dropdown), по тексту (search) -->
  <script defer>
    (function () {
      function init() {
        var cards = document.querySelectorAll('.guide__cards .card-section__col');
        var buttons = document.querySelectorAll('.guide__filter .guide-btn');
        var selectInput = document.querySelector('.guide-form__field--select .js-select-input');
        var searchInput = document.querySelector('input[name="watches-search"]');
        var resultsLabel = document.querySelector('.guide__results');
        var loadMoreBtn = document.querySelector('.guide__footer .btn.primary');
        if (!cards.length) return;

        var totalCatalog = 947;
        var state = { type: 'all', direction: '', search: '' };

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
            var matchDirection = !state.direction
              || brand.split(/\s+/).indexOf(state.direction) !== -1;
            var matchSearch = !search || getCardText(card).indexOf(search) !== -1;
            var show = matchType && matchDirection && matchSearch;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
          });
          if (resultsLabel) {
            if (state.type !== 'all' || state.direction || search) {
              resultsLabel.textContent = 'Показано ' + visible + ' из ' + visible + ' результатов';
            } else {
              resultsLabel.textContent = 'Показаны ' + visible + ' из ' + totalCatalog + ' результатов';
            }
          }
        }

        buttons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            buttons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.type = btn.getAttribute('data-type') || 'all';
            applyFilters();
          });
        });

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
          document.querySelectorAll('.guide-form__field--select .js-select-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
              state.direction = opt.getAttribute('data-value') || '';
              applyFilters();
            });
          });
        }

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

        if (state.type !== 'all') {
          buttons.forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-type') === state.type);
          });
        }
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
