  {# Universal catalog filter — drives search + dropdown + filter-buttons across all 5 categories. Read config from window.__FILTER_CONFIG__ set by the catalog template. #}
  <script defer>
    window.__FILTER_CONFIG__ = {
      "search_name": "{{ catalog.search_name }}",
      "dropdown_input_name": "{{ catalog.hidden_name }}",
      "card_selector": "{{ catalog.card_selector|default('.guide__cards .card-section__col') }}",
      "total_results": {{ catalog.total_results }}
    };
  </script>
  <script defer>
    (function () {
      function init() {
        var cfg = window.__FILTER_CONFIG__ || {};
        var cards = document.querySelectorAll(cfg.card_selector || '.guide__cards .card-section__col');
        var buttons = document.querySelectorAll('.guide__filter .guide-btn');
        var searchInput = cfg.search_name ? document.querySelector('input[name="' + cfg.search_name + '"]') : null;
        var selectInput = cfg.dropdown_input_name ? document.querySelector('input[name="' + cfg.dropdown_input_name + '"]') : null;
        var selectBtn = document.querySelector('.guide-form__field--select .js-select-btn');
        var selectLabel = document.querySelector('.guide-form__field--select .js-select-value');
        var resultsLabel = document.querySelector('.guide__results');
        if (!cards.length) return;

        // All possible filter dimensions used across categories.
        var DIMS = ['type', 'brand', 'direction', 'region', 'country', 'city', 'format', 'month'];

        var state = {
          buttonDim: 'type',
          buttonValue: 'all',
          dropdownValue: '',
          search: ''
        };

        // Detect which data-* dimension a button uses.
        function buttonDim(btn) {
          for (var i = 0; i < DIMS.length; i++) {
            if (btn.hasAttribute('data-' + DIMS[i])) return DIMS[i];
          }
          return 'type';
        }

        // Card has `value` somewhere in its data-* attributes (any dimension).
        // If preferredDim is given, check that dim first (button context).
        function cardMatches(card, value, preferredDim) {
          if (!value || value === 'all') return true;
          var checkOrder = preferredDim
            ? [preferredDim].concat(DIMS.filter(function (d) { return d !== preferredDim; }))
            : DIMS;
          for (var i = 0; i < checkOrder.length; i++) {
            var attr = (card.getAttribute('data-' + checkOrder[i]) || '').split(/\s+/);
            if (attr.indexOf(value) !== -1) return true;
          }
          return false;
        }

        function applyFilters() {
          var visible = 0;
          var searchLow = state.search.trim().toLowerCase();
          cards.forEach(function (card) {
            var ok = true;
            if (state.buttonValue && state.buttonValue !== 'all') {
              ok = ok && cardMatches(card, state.buttonValue, state.buttonDim);
            }
            if (state.dropdownValue) {
              ok = ok && cardMatches(card, state.dropdownValue);
            }
            if (searchLow) {
              ok = ok && (card.textContent || '').toLowerCase().indexOf(searchLow) !== -1;
            }
            card.style.display = ok ? '' : 'none';
            if (ok) visible++;
          });

          if (resultsLabel) {
            var hasFilter = (state.buttonValue && state.buttonValue !== 'all') || state.dropdownValue || searchLow;
            if (hasFilter) {
              // PDF 4a — when filtered, show "Показано N из N результатов" not from total
              resultsLabel.textContent = 'Показано ' + visible + ' из ' + visible + ' результатов';
            } else {
              resultsLabel.textContent = 'Показаны ' + visible + ' из ' + (cfg.total_results || cards.length) + ' результатов';
            }
          }
        }

        // Read URL params: ?type, ?brand, ?direction, etc.
        // Any one of DIMS sets dropdownValue; only ?type sets the active button.
        try {
          var params = new URLSearchParams(window.location.search);
          if (params.get('type')) {
            state.buttonValue = params.get('type');
            state.buttonDim = 'type';
          }
          for (var i = 0; i < DIMS.length; i++) {
            var d = DIMS[i];
            if (d === 'type') continue;
            var v = params.get(d);
            if (v) {
              state.dropdownValue = v;
              break;
            }
          }
        } catch (e) {}

        // Button clicks
        buttons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            buttons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.buttonDim = buttonDim(btn);
            state.buttonValue = btn.getAttribute('data-' + state.buttonDim) || 'all';
            removeUnknownFilterChip();
            applyFilters();
          });
        });

        // Dropdown listening
        if (selectBtn) {
          var lastDropdown = selectInput ? selectInput.value : '';
          var observer = new MutationObserver(function () {
            var v = selectBtn.getAttribute('data-value') || '';
            if (v !== lastDropdown) {
              lastDropdown = v;
              state.dropdownValue = v;
              removeUnknownFilterChip();
              applyFilters();
            }
          });
          observer.observe(selectBtn, { attributes: true, attributeFilter: ['data-value'] });
          document.querySelectorAll('.guide-form__field--select .js-select-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
              state.dropdownValue = opt.getAttribute('data-value') || '';
              removeUnknownFilterChip();
              applyFilters();
            });
          });
        }

        // Search (debounced)
        if (searchInput) {
          var t;
          searchInput.addEventListener('input', function (e) {
            clearTimeout(t);
            t = setTimeout(function () {
              state.search = e.target.value;
              applyFilters();
            }, 200);
          });
        }

        // Don't actually submit the form
        var form = document.querySelector('.guide-form');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

        // Sync initial UI from URL state
        if (state.buttonValue && state.buttonValue !== 'all') {
          buttons.forEach(function (b) {
            var d = buttonDim(b);
            if (b.getAttribute('data-' + d) === state.buttonValue) {
              buttons.forEach(function (x) { x.classList.remove('active'); });
              b.classList.add('active');
            }
          });
        }

        // PDF 5a — if dropdownValue isn't a known dropdown option, show chip "ФИЛЬТР: value"
        function showUnknownFilterChip(value) {
          var container = document.querySelector('.guide__filter');
          if (!container) return;
          removeUnknownFilterChip();
          var chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'guide-btn guide-btn--chip active js-unknown-chip';
          chip.textContent = 'ФИЛЬТР: ' + value.replace(/-/g, ' ').toUpperCase();
          chip.style.background = '#212121';
          chip.style.color = '#fff';
          container.appendChild(chip);
        }
        function removeUnknownFilterChip() {
          var existing = document.querySelector('.js-unknown-chip');
          if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }

        if (state.dropdownValue) {
          var opt = document.querySelector('.guide-form__field--select .js-select-option[data-value="' + state.dropdownValue + '"]');
          if (opt && selectBtn) {
            selectBtn.setAttribute('data-value', state.dropdownValue);
            if (selectInput) selectInput.value = state.dropdownValue;
            if (selectLabel) selectLabel.textContent = opt.textContent.trim();
          } else {
            showUnknownFilterChip(state.dropdownValue);
          }
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
