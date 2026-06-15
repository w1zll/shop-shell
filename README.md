# Shop Shell

`shop-shell` — основное Next.js-приложение демонстрационного магазина на микрофронтендах.

## Ответственность

- главный домен приложения;
- общий layout;
- Header и Footer;
- главная страница;
- маршруты shell-зоны;
- route-level composition для catalog zone через Next rewrites;
- будущая загрузка cart/account remotes через Module Federation;
- будущие rewrites к API и remote assets.

На текущем этапе shell проксирует catalog zone, но API и Module Federation ещё не подключены.

## Технологии

- Next.js App Router;
- React;
- TypeScript strict;
- Tailwind CSS 4;
- `@w1zll/shop-ui`;
- Vitest;
- React Testing Library.

## Локальная разработка

Перед установкой зависимостей нужен доступ к GitHub Packages для `@w1zll/shop-ui`.
Токен не хранится в репозитории. Registry для scope настроен в `.npmrc`, auth token должен быть в user-level `~/.npmrc`.

```bash
pnpm install
pnpm dev
```

Для проверки интеграции каталога запустите рядом `shop-catalog` на порту `3001`.
Shell должен быть открыт как основной вход в приложение:

```text
http://localhost:3000
```

Переменная окружения:

```text
CATALOG_ORIGIN=http://localhost:3001
```

Если переменная не задана, используется локальное значение `http://localhost:3001`.

Через shell доступны маршруты каталога:

```text
/catalog
/category/[slug]
/product/[slug]
/search
/catalog-static/*
```

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Текущие ограничения

- главная страница использует статические placeholder-данные;
- API пока не подключен;
- Module Federation пока не подключен;
- placeholders корзины и аккаунта находятся в Header и будут заменены remotes на следующих этапах.
