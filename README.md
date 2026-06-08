# Ghost Buyer

AI-байер редких вещей — находим, выкупаем и доставляем редкую одежду с зарубежных площадок.

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить env

```bash
cp .env.example .env.local
```

Заполни `.env.local`:

| Переменная | Где взять |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | [supabase.com](https://supabase.com) → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Там же |
| `SUPABASE_SERVICE_ROLE_KEY` | Там же (service_role) |
| `TELEGRAM_BOT_TOKEN` | [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | ID чата / канала |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |

> Приложение запускается без Supabase, Telegram и Claude — есть мок-данные и заглушки.

### 3. Supabase (необязательно для MVP)

Выполни SQL из `supabase/schema.sql` через SQL Editor в Supabase Dashboard.

### 4. Запустить

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

## Структура

```
app/
  page.tsx              # Лендинг
  search/page.tsx       # Форма поиска
  results/page.tsx      # Карточки айтемов
  item/[id]/page.tsx    # Детальная карточка
  request/page.tsx      # Прямая заявка
  api/search/           # POST — поиск через AI
  api/items/[id]/       # GET  — карточка айтема
  api/request/          # POST — заявка в Supabase + Telegram
lib/
  marketplace/          # Слой поиска (мок → реальный Playwright)
  claude.ts             # Интерпретация запроса через Claude API
  telegram.ts           # Уведомления в Telegram Bot
  supabase.ts           # Supabase client
  i18n.ts               # RU/EN переводы
contexts/
  LanguageContext.tsx   # Переключатель языка
```

## Стек

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** — тёмная тема, Ghost вайб
- **Supabase** — база заявок
- **Claude API** — интерпретация запроса → теги поиска
- **Telegram Bot API** — уведомления о заявках

## Деплой на Vercel

1. Подключи репозиторий на [vercel.com](https://vercel.com)
2. Добавь env-переменные из `.env.example`
3. Deploy
