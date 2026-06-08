    <div class="popup popup--login js-popup-login">
        <div class="popup__wrap popup__wrap--login">
            <div class="popup__head popup__head--login">
                <h2>Начните жить красиво</h2>
            </div>
            <div class="popup__body popup__body--login">
                <p class="popup__subtitle">Данный раздел предназначен исключительно для действующих участников клуба</p>
                <form class="popup-login-form js-popup-login-form" novalidate>
                    <label for="login-username" class="sr-only">Логин</label>
                    <input class="popup-login-form__control" id="login-username" name="login" type="text" placeholder="ЛОГИН" autocomplete="off" autocorrect="off" spellcheck="false" required>
                    <label for="login-password" class="sr-only">Пароль</label>
                    <input class="popup-login-form__control" id="login-password" name="password" type="password" placeholder="ПАРОЛЬ" autocomplete="off" required>
                    <p class="popup-login-form__error js-popup-login-error" hidden>*Введите корректные данные</p>
                    <div class="popup-login-form__actions">
                        <button type="submit" class="popup-login-form__btn popup-login-form__btn--primary">ВОЙТИ</button>
                        <a href="registration.html" class="popup-login-form__btn popup-login-form__btn--secondary">РЕГИСТРАЦИЯ</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
      (function () {
        function init() {
          var popupEl = document.querySelector('.js-popup-login');
          var overlayEl = document.querySelector('.js-overlay');
          var openBtns = document.querySelectorAll('.js-popup-login-open');
          var form = document.querySelector('.js-popup-login-form');
          var error = document.querySelector('.js-popup-login-error');
          if (!popupEl || !overlayEl) return;

          function openPopupLogin(e) {
            if (e) e.preventDefault();
            popupEl.classList.add('active');
            overlayEl.classList.add('active');
          }
          function closePopupLogin() {
            popupEl.classList.remove('active');
            overlayEl.classList.remove('active');
          }
          openBtns.forEach(function (b) { b.addEventListener('click', openPopupLogin); });
          overlayEl.addEventListener('click', closePopupLogin);
          document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closePopupLogin();
          });

          // UI-only login: show error chip "*Введите корректные данные" per PDF / Figma.
          // Real auth wires up later.
          if (form) {
            form.addEventListener('submit', function (e) {
              e.preventDefault();
              var ok = true;
              form.querySelectorAll('.popup-login-form__control').forEach(function (f) {
                if (!f.value.trim()) { f.classList.add('is-error'); ok = false; }
                else { f.classList.remove('is-error'); }
              });
              if (!ok && error) error.hidden = false;
              else if (error) error.hidden = true;
            });
            form.querySelectorAll('.popup-login-form__control').forEach(function (f) {
              f.addEventListener('input', function () { f.classList.remove('is-error'); });
            });
          }
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
          init();
        }
      })();
    </script>
