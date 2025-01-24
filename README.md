# Посты и Управление Контентом

## Описание проекта

Проект предназначен для отображения, редактирования и удаления постов. Он включает в себя систему управления контентом, где пользователи могут создавать, редактировать и удалять посты. Компонент отображает список постов и предоставляет функции редактирования и удаления с подтверждением.

## Структура проекта

- **Frontend**: React.js, Ant Design
- **Backend**: Node.js, Express, PostgreSQL
- **Авторизация**: JWT токены
- **API**: REST API для работы с постами

## Структура таблиц

### 1. Таблица `posts`

Таблица хранит информацию о постах, созданных пользователями. Каждый пост связан с конкретным пользователем.

| Поле         | Тип данных       | Описание                        |
|--------------|------------------|---------------------------------|
| `id`         | `SERIAL PRIMARY KEY` | Уникальный идентификатор поста |
| `user_id`    | `INTEGER`        | Идентификатор пользователя, который создал пост |
| `title`      | `VARCHAR(255)`    | Заголовок поста                |
| `content`    | `TEXT`           | Содержимое поста               |
| `created_at` | `TIMESTAMP`      | Время создания поста           |
| `updated_at` | `TIMESTAMP`      | Время последнего обновления поста |

**Пример создания таблицы `posts`:**

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
