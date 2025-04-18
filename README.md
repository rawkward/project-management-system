# Project Management System

### Инструкция по запуску проекта (Docker Compose):

1. Установить Docker и Docker Compose, если они еще не установлены;
2. Создать файл `.env` в корне проекта с содержимым `VITE_API_URL=/api/v1`;
3. Выполнить команду `docker compose up --build`;
4. Открыть приложение по адресу http://localhost:3000/.

## Стек:

- React
- React Router
- TypeScript

## Дополнительные библиотеки и фреймворки:

- Vite

Быстрая сборка, отличная совместимость с другими библиотеками и
фреймворками. Удобный старт с `create vite@latest`

- Tanstack Query

Удобный синтаксис в сравнении с RTK, кэширование

- React Hook Form

Одно из удобных решений для создания форм, не перегружено функционалом. Интегрируется с
TypeScript и zod, дает комфортный API для валидации и обработки данных форм.

- Zod

Надежный инструмент и понятный синтаксис для валидации, интеграция с React Hook Form и TypeScript.

- Material UI

Популярная библиотека UI-компонентов, позволяющая быстро создавать
качественные пользовательские интерфейсы. Готовые адаптивные компоненты, совместимые с
современными дизайн-гайдами, помогают ускорить разработку.

- ESLint

Обеспечивает единый стиль кода, сокращает количество багов и упрощает код-ревью за счет
автоматической проверки.

- Prettier

Одной командой форматирует код и приводит его к общепринятому виду.

## О проекте:
Данный проект реализует простое и наглядное приложение для управления задачами и проектами. Приложение позволяет создавать задачи, просматривать список проектов, задачи в конкретном проекте и управлять состоянием задач.

### Архитектура проекта:
```src/
├── app                      # Настройка провайдеров, лэйаута и роутинга
├── features/                # Основные бизнес-фичи проекта
│   ├── boards               # Проекты и доски задач
│   └── issues               # Задачи и связанные с ними компоненты
├── shared/                  # Общие переиспользуемые компоненты и API-клиенты
└── ...
```

### Ключевые компоненты / Хуки:
- IssueCard\
Визуальное представление карточки задачи
- AsyncSelect\
Универсальный компонент select с поддержкой асинхронной загрузки
- useDraftIssue\
Хук для автосохранения формы задачи в localStorage
- IssueModal\
Модалка для создания и редактирования задачи
- useIssueModal\
Хук для управления состоянием модального окна
- apiClient\
Базовый клиент для обращения к API


