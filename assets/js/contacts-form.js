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
    { code: '+7',   name: 'Россия' },
    { code: '+380', name: 'Украина' },
    { code: '+375', name: 'Беларусь' },
    { code: '+7',   name: 'Казахстан' },
    { code: '+374', name: 'Армения' },
    { code: '+995', name: 'Грузия' },
    { code: '+994', name: 'Азербайджан' },
    { code: '+996', name: 'Киргизия' },
    { code: '+998', name: 'Узбекистан' },
    { code: '+992', name: 'Таджикистан' },
    { code: '+972', name: 'Израиль' },
    { code: '+971', name: 'ОАЭ' },
    { code: '+966', name: 'Саудовская Аравия' },
    { code: '+90',  name: 'Турция' },
    { code: '+357', name: 'Кипр' },
    { code: '+30',  name: 'Греция' },
    { code: '+39',  name: 'Италия' },
    { code: '+34',  name: 'Испания' },
    { code: '+33',  name: 'Франция' },
    { code: '+49',  name: 'Германия' },
    { code: '+41',  name: 'Швейцария' },
    { code: '+43',  name: 'Австрия' },
    { code: '+31',  name: 'Нидерланды' },
    { code: '+44',  name: 'Великобритания' },
    { code: '+353', name: 'Ирландия' },
    { code: '+351', name: 'Португалия' },
    { code: '+48',  name: 'Польша' },
    { code: '+420', name: 'Чехия' },
    { code: '+36',  name: 'Венгрия' },
    { code: '+1',   name: 'США' },
    { code: '+1',   name: 'Канада' },
    { code: '+86',  name: 'Китай' },
    { code: '+852', name: 'Гонконг' },
    { code: '+65',  name: 'Сингапур' },
    { code: '+81',  name: 'Япония' }
  ];

  var wrap     = form.querySelector('.js-country-wrap');
  var btn      = form.querySelector('.js-country-btn');
  var codeEl   = form.querySelector('.js-country-code');
  var listEl   = form.querySelector('.js-country-list');
  var phoneEl  = form.querySelector('#contact-phone');

  // Build list
  COUNTRIES.forEach(function (c) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'contacts-form__country-item';
    b.setAttribute('role', 'option');
    b.dataset.code = c.code;
    b.dataset.name = c.name;
    b.innerHTML = '<span class="contacts-form__country-item-name">' + c.name + '</span>'
                + '<span class="contacts-form__country-item-code">' + c.code + '</span>';
    li.appendChild(b);
    listEl.appendChild(li);
  });

  // "Другая страна…" — opens an inline input for manual code entry
  var otherLi = document.createElement('li');
  otherLi.className = 'contacts-form__country-other';
  otherLi.innerHTML =
    '<button type="button" class="contacts-form__country-item js-country-other-toggle">'
      + '<span class="contacts-form__country-item-name">Другая страна…</span>'
      + '<span class="contacts-form__country-item-code">+</span>'
    + '</button>'
    + '<div class="contacts-form__country-other-row js-country-other-row" hidden>'
      + '<input type="text" class="js-country-other-input" placeholder="+XXX" maxlength="5" pattern="\\+?\\d{1,4}" inputmode="numeric">'
      + '<button type="button" class="js-country-other-ok">OK</button>'
    + '</div>';
  listEl.appendChild(otherLi);

  var otherToggle = otherLi.querySelector('.js-country-other-toggle');
  var otherRow    = otherLi.querySelector('.js-country-other-row');
  var otherInput  = otherLi.querySelector('.js-country-other-input');
  var otherOk     = otherLi.querySelector('.js-country-other-ok');

  function closeList() {
    listEl.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
    otherRow.hidden = true;
  }
  function openList() {
    listEl.style.display = 'block';
    btn.setAttribute('aria-expanded', 'true');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (listEl.style.display === 'none') openList(); else closeList();
  });

  otherToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    otherRow.hidden = !otherRow.hidden;
    if (!otherRow.hidden) otherInput.focus();
  });

  function applyOther() {
    var v = otherInput.value.trim();
    if (!v) return;
    if (v.charAt(0) !== '+') v = '+' + v;
    if (!/^\+\d{1,4}$/.test(v)) {
      otherInput.classList.add('is-error');
      return;
    }
    otherInput.classList.remove('is-error');
    codeEl.textContent = v;
    btn.dataset.country = 'custom';
    closeList();
    phoneEl.focus();
  }
  otherOk.addEventListener('click', function (e) { e.stopPropagation(); applyOther(); });
  otherInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); applyOther(); }
  });
  otherInput.addEventListener('input', function () {
    otherInput.classList.remove('is-error');
  });
  otherInput.addEventListener('click', function (e) { e.stopPropagation(); });

  listEl.addEventListener('click', function (e) {
    var t = e.target.closest('.contacts-form__country-item');
    if (!t || t === otherToggle) return;
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
