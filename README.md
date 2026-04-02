# News Portal MERN

Курсовой проект по модулю «Проектирование и обеспечение бесперебойной работы web-сайта».

Проект представляет собой новостной портал на стеке MERN:
- `client/` — React + Vite + React Router + i18n
- `server/` — Node.js + Express + MongoDB + Mongoose + JWT + bcrypt

Корневая папка `app/` с Next.js не используется в защищаемой версии курсового проекта и не входит в основной сценарий запуска.

## Цель проекта

Разработать полнофункциональное web-приложение для публикации и просмотра статей с:
- регистрацией и входом пользователей;
- разграничением ролей `reader / author / admin`;
- полным CRUD для статей;
- адаптивным интерфейсом;
- локализацией на русском и казахском языках;
- хранением данных в MongoDB.

## Основной функционал

- регистрация пользователя;
- вход по email и паролю;
- JWT-авторизация;
- просмотр списка статей;
- фильтрация по категории и поиск;
- просмотр полной статьи;
- создание статьи для `author` и `admin`;
- редактирование статьи автором или администратором;
- удаление статьи автором или администратором;
- страница профиля;
- темы интерфейса `light / dark`;
- локализация `RU / KK / EN`;
- обработка состояний `loading / error / empty / 404`.

## Стек технологий

### Client

- React 18
- Vite
- React Router
- Axios
- React Quill
- React Toastify
- i18next / react-i18next
- TypeScript

### Server

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- CORS

## Структура проекта

```text
webka/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   ├── i18n.ts
│   │   ├── index.css
│   │   └── types.ts
│   └── .env.example
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── seed.js
│   └── .env.example
└── docs/
    └── course-project-materials.md
```

## Настройка окружения

### 1. MongoDB

Запусти локальный MongoDB или используй MongoDB Atlas.

Пример локального URI:

```env
mongodb://localhost:27017/newsportal
```

### 2. Server env

Создай файл `server/.env` на основе `server/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newsportal
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES_IN=7d
```

### 3. Client env

Создай файл `client/.env` на основе `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Локальный запуск

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

После запуска:
- client: [http://localhost:5173](http://localhost:5173)
- server: [http://localhost:5000](http://localhost:5000)

## Тестовые данные

Для заполнения базы тестовыми пользователями и статьями:

```bash
cd server
npm run seed
```

Seed создаёт:
- `reader@example.com / reader123`
- `author@example.com / author123`
- `admin@example.com / admin123`

## Роли пользователей

- `reader` — просмотр статей;
- `author` — просмотр, создание, редактирование и удаление своих статей;
- `admin` — полный контроль над материалами.

## API Endpoints

### Auth

- `POST /api/auth/register` — регистрация пользователя
- `POST /api/auth/login` — вход и получение JWT

### Articles

- `GET /api/articles` — список статей
- `GET /api/articles/:id` — одна статья
- `POST /api/articles` — создать статью (`author/admin`)
- `PUT /api/articles/:id` — обновить статью (`author/admin`, владелец или admin)
- `DELETE /api/articles/:id` — удалить статью (`author/admin`, владелец или admin)

## Пример запросов

### Регистрация

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456",
  "role": "author"
}
```

### Вход

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "author@example.com",
  "password": "author123"
}
```

### Создание статьи

```http
POST /api/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Новая статья",
  "category": "Tech",
  "featured_image": "https://example.com/image.jpg",
  "content": "<p>Полный текст статьи...</p>"
}
```

## Ручное тестирование

Нужно проверить:

1. Регистрацию нового пользователя.
2. Запрет дублирования email.
3. Вход с корректными и некорректными данными.
4. Получение списка статей.
5. Фильтрацию и поиск.
6. Просмотр статьи по `id`.
7. Создание статьи автором.
8. Редактирование своей статьи.
9. Запрет редактирования чужой статьи.
10. Удаление статьи.
11. Переключение языков `RU / KK`.
12. Переключение темы `light / dark`.
13. Отображение `404` и ошибок API.
14. Адаптивность на mobile / tablet / desktop.

## Материалы для защиты

Для пояснительной записки и защиты используй файл:

[docs/course-project-materials.md](./docs/course-project-materials.md)

В нём собраны:
- введение;
- предметная область;
- архитектура;
- структура БД;
- описание маршрутов;
- сценарий демонстрации;
- план тестирования.

## Деплой

Для максимальной оценки рекомендуется выложить:
- client на Vercel или Netlify;
- server на Render или Railway;
- MongoDB на Atlas.

## Автор

Курсовой проект по дисциплине ПМ04 «Проектирование и обеспечение бесперебойной работы web-сайта».
