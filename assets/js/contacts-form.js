/*
 * Contact form: validation + country picker + AJAX submit to /api/contact.php.
 * Self-contained, no deps. Load with defer after the main bundle.
 */
(function () {
  'use strict';

  var form = document.querySelector('.js-contact-form');
  if (!form) return;

  // ---- Country picker ----
  var COUNTRIES = [
    { code: '+7',   flag: '🇷🇺', name: 'Россия' },
    { code: '+380', flag: '🇺🇦', name: 'Україна' },
    { code: '+375', flag: '🇧🇾', name: 'Беларусь' },
    { code: '+7',   flag: '🇰🇿', name: 'Қазақстан' },
    { code: '+374', flag: '🇦🇲', name: 'Հայաստան' },
    { code: '+995', flag: '🇬🇪', name: 'საქართველო' },
    { code: '+994', flag: '🇦🇿', name: 'Azərbaycan' },
    { code: '+996', flag: '🇰🇬', name: 'Кыргызстан' },
    { code: '+998', flag: '🇺🇿', name: 'Oʻzbekiston' },
    { code: '+992', flag: '🇹🇯', name: 'Тоҷикистон' },
    { code: '+972', flag: '🇮🇱', name: 'ישראל' },
    { code: '+971', flag: '🇦🇪', name: 'الإمارات' },
    { code: '+966', flag: '🇸🇦', name: 'السعودية' },
    { code: '+90',  flag: '🇹🇷', name: 'Türkiye' },
    { code: '+357', flag: '🇨🇾', name: 'Κύπρος' },
    { code: '+30',  flag: '🇬🇷', name: 'Ελλάδα' },
    { code: '+39',  flag: '🇮🇹', name: 'Italia' },
    { code: '+34',  flag: '🇪🇸', name: 'España' },
    { code: '+33',  flag: '🇫🇷', name: 'France' },
    { code: '+49',  flag: '🇩🇪', name: 'Deutschland' },
    { code: '+41',  flag: '🇨🇭', name: 'Schweiz' },
    { code: '+43',  flag: '🇦🇹', name: 'Österreich' },
    { code: '+31',  flag: '🇳🇱', name: 'Nederland' },
    { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+353', flag: '🇮🇪', name: 'Éire' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+48',  flag: '🇵🇱', name: 'Polska' },
    { code: '+420', flag: '🇨🇿', name: 'Česko' },
    { code: '+36',  flag: '🇭🇺', name: 'Magyarország' },
    { code: '+1',   flag: '🇺🇸', name: 'United States' },
    { code: '+1',   flag: '🇨🇦', name: 'Canada' },
    { code: '+86',  flag: '🇨🇳', name: '中国' },
    { code: '+852', flag: '🇭🇰', name: '香港' },
    { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
    { code: '+81',  flag: '🇯🇵', name: '日本' }
  ];

  var wrap     = form.querySelector('.js-country-wrap');
  var btn      = form.querySelector('.js-country-btn');
  var flagEl   = form.querySelector('.js-country-flag');
  var codeEl   = form.querySelector('.js-country-code');
  var listEl   = form.querySelector('.js-country-list');
  var phoneEl  = form.querySelector('#contact-phone');

  // Build list
  COUNTRIES.forEach(function (c, idx) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'contacts-form__country-item';
    b.setAttribute('role', 'option');
    b.dataset.code = c.code;
    b.dataset.flag = c.flag;
    b.dataset.name = c.name;
    b.innerHTML = '<span class="contacts-form__country-item-flag">' + c.flag + '</span>'
                + '<span class="contacts-form__country-item-name">' + c.name + '</span>'
                + '<span class="contacts-form__country-item-code">' + c.code + '</span>';
    li.appendChild(b);
    listEl.appendChild(li);
  });

  function closeList() {
    listEl.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }
  function openList() {
    listEl.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (listEl.hidden) openList(); else closeList();
  });

  listEl.addEventListener('click', function (e) {
    var t = e.target.closest('.contacts-form__country-item');
    if (!t) return;
    flagEl.textContent = t.dataset.flag;
    codeEl.textContent = t.dataset.code;
    btn.dataset.country = t.dataset.name;
    closeList();
    phoneEl.focus();
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) closeList();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeList();
  });

  // ---- Phone input: digits only (allow + at start, space/dash/parens for grouping) ----
  phoneEl.addEventListener('input', function () {
    var cleaned = phoneEl.value.replace(/[^\d+\s\-\(\)]/g, '');
    if (cleaned !== phoneEl.value) phoneEl.value = cleaned;
  });

  // ---- Validation ----
  var EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
  var PHONE_RE = /^[+]?[\d\s\-\(\)]{5,}$/;

  function clearErrors() {
    form.querySelectorAll('.is-error').forEach(function (el) {
      el.classList.remove('is-error');
    });
  }
  function markError(input) {
    input.classList.add('is-error');
    var field = input.closest('.contacts-form__field');
    if (field) field.classList.add('is-error');
  }

  // Clear error on input
  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      el.classList.remove('is-error');
      var field = el.closest('.contacts-form__field');
      if (field) field.classList.remove('is-error');
    });
  });

  function validate() {
    clearErrors();
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      if (!input.value.trim()) { markError(input); ok = false; }
    });
    var email = form.querySelector('#contact-email');
    if (email.value.trim() && !EMAIL_RE.test(email.value.trim())) {
      markError(email); ok = false;
    }
    if (phoneEl.value.trim() && !PHONE_RE.test(phoneEl.value.trim())) {
      markError(phoneEl); ok = false;
    }
    return ok;
  }

  // ---- Success popup ----
  var successPopup = document.querySelector('.js-popup-success');
  var overlayEl    = document.querySelector('.js-overlay');

  function showSuccess() {
    if (!successPopup) return;
    successPopup.classList.add('active');
    if (overlayEl) overlayEl.classList.add('active');
  }
  function hideSuccess() {
    if (!successPopup) return;
    successPopup.classList.remove('active');
    if (overlayEl) overlayEl.classList.remove('active');
  }
  if (overlayEl) overlayEl.addEventListener('click', hideSuccess);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideSuccess();
  });

  // ---- Submit ----
  var submitBtn = form.querySelector('.contacts-form__submit');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector('.is-error');
      if (first && first.focus) first.focus();
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправляем…';

    var payload = {
      firstName: form.firstName.value.trim(),
      lastName:  form.lastName.value.trim(),
      email:     form.email.value.trim(),
      country:   codeEl.textContent,
      phone:     phoneEl.value.trim(),
      message:   form.message.value.trim()
    };

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
    .then(function (data) {
      if (data && data.ok) {
        form.reset();
        flagEl.textContent = '🇷🇺';
        codeEl.textContent = '+7';
        showSuccess();
      } else {
        if (data && data.fields) {
          data.fields.forEach(function (name) {
            var el = form.querySelector('[name="' + name + '"]');
            if (el) markError(el);
          });
        }
        alert('Не удалось отправить заявку. Проверьте поля и попробуйте ещё раз.');
      }
    })
    .catch(function () {
      alert('Ошибка соединения. Попробуйте позже.');
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
})();
