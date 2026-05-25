    <div class="overlay js-overlay"></div>

    <nav class="nav js-burger" aria-label="Меню">
        <div class="nav__wrap">
            <button type="button" class="nav__close js-burger-close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.7" d="M0.353516 0.646408L11.3535 11.6464M0.353516 11.3535L11.3535 0.353516"
                        stroke="#212121" />
                </svg>
            </button>
            <div class="nav__panels">
                <section class="nav__panel nav__panel--active js-burger-panel" data-panel="root">
                    <ul class="nav__menu">
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn js-burger-submenu" data-target="about">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/people.svg" alt="">
                                </span>
                                <span class="nav__menu-text">О НАС</span>
                                <span class="nav__menu-arrow" aria-hidden="true">
                                    <img src="assets/images/arrow.svg" alt="">
                                </span>
                            </button>
                        </li>
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn js-burger-submenu" data-target="fine-living">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/flag.svg" alt="">
                                </span>
                                <span class="nav__menu-text">УСЛУГИ ЛАЙФСТАЙЛ</span>
                                <span class="nav__menu-arrow" aria-hidden="true">
                                    <img src="assets/images/arrow.svg" alt="">
                                </span>
                            </button>
                        </li>
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn js-burger-submenu" data-target="fine-shopping">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/diamond.svg" alt="">
                                </span>
                                <span class="nav__menu-text">ПРЕМИАЛЬНЫЙ ШОППИНГ</span>
                                <span class="nav__menu-arrow" aria-hidden="true">
                                    <img src="assets/images/arrow.svg" alt="">
                                </span>
                            </button>
                        </li>
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn js-burger-submenu" data-target="concierge">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/message.svg" alt="">
                                </span>
                                <span class="nav__menu-text">РЕЗИДЕНТСКИЙ КОНСЬЕРЖ</span>
                                <span class="nav__menu-arrow" aria-hidden="true">
                                    <img src="assets/images/arrow.svg" alt="">
                                </span>
                            </button>
                        </li>
                    </ul>
                </section>

                <section class="nav__panel js-burger-panel" data-panel="about">
                    <ul class="nav__submenu">
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn nav__menu-btn--info">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/people.svg" alt="">
                                </span>
                                <span class="nav__menu-text">О НАС</span>
                            </button>
                        </li>
                        <li class="nav__submenu-item"><a href="/" class="nav__submenu-link">УСЛУГИ ДЛЯ РЕЗИДЕНТОВ</a></li>
                        <li class="nav__submenu-item"><a href="team.html" class="nav__submenu-link">МЕЖДУНАРОДНАЯ КОМАНДА
                                ЭКСПЕРТОВ</a></li>
                        <li class="nav__submenu-item"><a href="contacts.html" class="nav__submenu-link">КОНТАКТЫ</a></li>
                    </ul>
                    <button type="button" class="nav__back js-burger-back" data-target="root">
                        <span class="nav__back-arrow" aria-hidden="true">
                            <img src="assets/images/arrow.svg" alt="">
                        </span>
                        <span class="nav__back-text">НАЗАД</span>
                    </button>
                </section>

                <section class="nav__panel js-burger-panel" data-panel="fine-living">
                    <ul class="nav__submenu">
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn nav__menu-btn--info">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/flag.svg" alt="">
                                </span>
                                <span class="nav__menu-text">УСЛУГИ ЛАЙФСТАЙЛ</span>
                            </button>
                        </li>
                        <li class="nav__submenu-item"><a href="recommendation.html" class="nav__submenu-link">ВИТРИНА РЕКОМЕНДАЦИЙ</a></li>
                        <li class="nav__submenu-item"><a href="guide.html" class="nav__submenu-link">ГИД ПО ОТЕЛЯМ И ЯХТАМ</a></li>
                        <li class="nav__submenu-item"><a href="calendar.html" class="nav__submenu-link">КАЛЕНДАРЬ КЛЮЧЕВЫХ
                                МЕРОПРИЯТИЙ</a></li>
                    </ul>
                    <button type="button" class="nav__back js-burger-back" data-target="root">
                        <span class="nav__back-arrow" aria-hidden="true">
                            <img src="assets/images/arrow.svg" alt="">
                        </span>
                        <span class="nav__back-text">НАЗАД</span>
                    </button>
                </section>

                <section class="nav__panel js-burger-panel" data-panel="fine-shopping">
                    <ul class="nav__submenu">
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn nav__menu-btn--info">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/diamond.svg" alt="">
                                </span>
                                <span class="nav__menu-text">ПРЕМИАЛЬНЫЙ ШОППИНГ</span>
                            </button>
                        </li>
                        <li class="nav__submenu-item"><a href="prime-residences.html" class="nav__submenu-link">ЗАРУБЕЖНАЯ НЕДВИЖИМОСТЬ</a></li>
                        <li class="nav__submenu-item"><a href="cars.html" class="nav__submenu-link">ЭКСКЛЮЗИВНЫЕ АВТОМОБИЛИ</a></li>
                        <li class="nav__submenu-item"><a href="watches.html" class="nav__submenu-link">ШЕДЕВРЫ ЧАСОВОГО ИСКУССТВА</a>
                        </li>
                    </ul>
                    <button type="button" class="nav__back js-burger-back" data-target="root">
                        <span class="nav__back-arrow" aria-hidden="true">
                            <img src="assets/images/arrow.svg" alt="">
                        </span>
                        <span class="nav__back-text">НАЗАД</span>
                    </button>
                </section>

                <section class="nav__panel js-burger-panel" data-panel="concierge">
                    <ul class="nav__submenu">
                        <li class="nav__menu-item">
                            <button type="button" class="nav__menu-btn nav__menu-btn--info">
                                <span class="nav__menu-ico" aria-hidden="true">
                                    <img src="assets/images/message.svg" alt="">
                                </span>
                                <span class="nav__menu-text">РЕЗИДЕНТСКИЙ КОНСЬЕРЖ</span>
                            </button>
                        </li>
                        <li class="nav__submenu-item"><a href="services.html" class="nav__submenu-link">УСЛУГИ ДЛЯ УК</a>
                        </li>
                        <li class="nav__submenu-item"><a href="example.html" class="nav__submenu-link">ПРИМЕР РЕАЛИЗОВАННОГО
                                ПРОЕКТА</a></li>
                        <li class="nav__submenu-item"><a href="app.html" class="nav__submenu-link">ПРИЛОЖЕНИЕ ДЛЯ РЕЗИДЕНТОВ</a>
                        </li>
                    </ul>
                    <button type="button" class="nav__back js-burger-back" data-target="root">
                        <span class="nav__back-arrow" aria-hidden="true">
                            <img src="assets/images/arrow.svg" alt="">
                        </span>
                        <span class="nav__back-text">НАЗАД</span>
                    </button>
                </section>
            </div>
            <div class="nav__form">
                <form action="/search.html" method="get">
                    <input type="search" name="s" placeholder="ПОИСК" autocomplete="off">
                    <button type="submit">
                        <img src="assets/images/search.svg" alt="">
                    </button>
                </form>
                <button type="button" class="nav__form-link js-popup-open">КЛИЕНТСКИЙ ПОРТАЛ</button>
            </div>
        </div>
    </nav>
