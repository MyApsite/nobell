# Decap CMS — Nobell content admin

Веб-интерфейс для редактирования контента в `content/*.md` без git-команд.
Живёт по URL `https://nobell.com/admin/`.

## Одноразовая настройка (Netlify Identity + Git Gateway)

Выполнить ОДИН РАЗ, потом любой редактор просто заходит на `/admin/`.

### 1. Создать Netlify-аккаунт

→ https://app.netlify.com/signup — sign up через GitHub-аккаунт (быстрее).

### 2. Создать пустой Netlify-сайт (нужен только для Identity-сервиса)

- Нажать **Add new site** → **Deploy manually**
- Перетянуть в окно ЛЮБУЮ папку (можно пустую с одним `index.html` "hello")
- Это создаст сайт типа `random-name-12345.netlify.app` — сам сайт нам не нужен,
  но без него Netlify не даст включить Identity

### 3. Включить Identity

- Перейти **Site overview** → **Site configuration** → **Identity**
- Нажать **Enable Identity**
- Внизу секция **Registration preferences** → переключить на **Invite only**
  (чтобы случайные люди не регистрировались)

### 4. Подключить Git Gateway к GitHub-репозиторию

- В том же разделе **Identity** → секция **Services** → **Git Gateway**
- Нажать **Enable Git Gateway**
- Netlify попросит OAuth-доступ к GitHub → разрешить
- Выбрать репозиторий `MyApsite/nobell`, ветку `main`
- Готово — теперь Decap CMS сможет commit/push через Identity

### 5. Пригласить себя как редактора

- **Identity** → **Invite users** → ввести `myapsite@gmail.com` (или другой)
- Получишь email-приглашение → клик на ссылку → задать пароль

### 6. Добавить виджет Netlify Identity в head ГЛАВНОЙ страницы сайта

Чтобы email-приглашение корректно редиректило на nobell.com (а не на
netlify.app), добавь в `<head>` файла `index.html` на проде:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

И в `<body>` (перед `</body>`):

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", function (user) {
      if (!user) {
        window.netlifyIdentity.on("login", function () {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

(Опционально — для UX. Без этого приглашение всё равно работает, но
завершает регистрацию на netlify.app)

### 7. Залить /admin/ на FTP

```bash
cd e:/GitHub/nobell
curl -T admin/index.html -u 'u141621525.nobell.com:e5^fyWc&MtM@g~7E' \
  ftp://89.117.102.250/admin/index.html
curl -T admin/config.yml -u 'u141621525.nobell.com:e5^fyWc&MtM@g~7E' \
  ftp://89.117.102.250/admin/config.yml
```

### 8. Открыть https://nobell.com/admin/

Логин через Netlify Identity → доступ ко всем коллекциям:
- Автомобили (12)
- Часы (12)
- Гид (12)
- Календарь (7)
- Резиденции (12)
- Каталоги (5 _index.md)

## Как работает редактирование

1. Редактор открывает `/admin/`, логинится через Netlify
2. Выбирает коллекцию (например «Автомобили»)
3. Создаёт/редактирует запись через UI
4. Клик **Publish** → Decap делает git commit + push в репо через Git Gateway
5. **GitHub Actions / локальный билдер** автоматически НЕ запускается — кто-то
   должен запустить `python scripts/build.py` + FTP-deploy после правки
   (TODO: настроить GitHub Action для автодеплоя)

## Что НЕЛЬЗЯ делать через CMS

- Менять templates/*.html.tpl (только разработчик)
- Менять scripts/build.py (только разработчик)
- Добавлять новые категории (требует правки CATEGORIES в build.py)
- Загружать .htaccess, sitemap.xml, search-index.json (автогенерируются)

## Troubleshooting

- **"Failed to load CMS config"** — проверь синтаксис config.yml через
  https://www.yamllint.com/
- **"You don't have permission"** — Git Gateway не настроен или юзер не
  приглашён
- **Изменения не появляются на сайте** — нужен build + FTP-deploy.
  CMS только записывает в git, не запускает билд.
