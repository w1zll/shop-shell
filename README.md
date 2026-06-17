# Shop Shell

`shop-shell` — основное Next.js-приложение демонстрационного магазина на микрофронтендах.

## Ответственность

- главный домен приложения;
- общий layout;
- Header и Footer;
- главная страница;
- маршруты shell-зоны;
- route-level composition для catalog zone через Next rewrites;
- загрузка cart remote через Module Federation Runtime;
- подготовленная конфигурация account remote;
- будущие rewrites к API и remote assets.

На текущем этапе shell проксирует catalog zone и подключает `shop-mf-cart` на клиенте.
API и account remote ещё не подключены.

## Технологии

- Next.js App Router;
- React;
- TypeScript strict;
- Tailwind CSS 4;
- `@w1zll/shop-ui`;
- `@module-federation/runtime`;
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
Для проверки cart remote запустите рядом `shop-mf-cart` на порту `3002`.
Shell должен быть открыт как основной вход в приложение:

```text
http://localhost:3000
```

Переменная окружения:

```text
CATALOG_ORIGIN=http://localhost:3001
NEXT_PUBLIC_CART_MANIFEST_URL=http://localhost:3002/mf-manifest.json
NEXT_PUBLIC_ACCOUNT_MANIFEST_URL=http://localhost:3003/mf-manifest.json
```

Если переменная не задана, используется локальное значение `http://localhost:3001`.
Для cart/account manifest URL также есть локальные значения по умолчанию.

Через shell доступны маршруты каталога:

```text
/catalog
/category/[slug]
/product/[slug]
/search
/catalog-static/*
```

Через shell доступны маршруты cart remote:

```text
/cart
/checkout
```

`/cart` и `/checkout` получают `noindex`. Во время server prerender shell отдаёт fallback-разметку,
а Module Federation Runtime загружает remote только в браузере после mount. Это позволяет выполнять
`next build` без запущенного `shop-mf-cart`.

## Module Federation

Shell использует один runtime instance с именем `shop_shell`.
Remote `cart` загружается из `NEXT_PUBLIC_CART_MANIFEST_URL` и предоставляет:

```text
cart/CartIndicator
cart/CartPage
cart/CheckoutPage
```

`CartIndicator` встраивается в Header. Если manifest недоступен или remote не загрузился за timeout,
показывается fallback и кнопка повторной загрузки.

Remote `account` пока только зарегистрирован через `NEXT_PUBLIC_ACCOUNT_MANIFEST_URL` для следующего
этапа интеграции.

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
- account remote пока не подключен к UI;
- cart remote загружается только на клиенте, поэтому SEO-критичный контент не должен зависеть от него.
