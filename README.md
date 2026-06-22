# Shop Shell

`shop-shell` — основное Next.js-приложение демонстрационного магазина на микрофронтендах.

## Ответственность

- главный домен приложения;
- общий layout;
- Header и Footer;
- главная страница;
- маршруты shell-зоны;
- route-level composition для catalog zone через Next rewrites;
- загрузка cart и account remotes через Module Federation Runtime;
- маршруты корзины, checkout, авторизации, аккаунта, заказов и избранного;
- rewrites к API и remote assets.

На текущем этапе shell проксирует catalog zone и подключает `shop-mf-cart` и `shop-mf-account` на клиенте.

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
Для проверки account remote запустите рядом `shop-mf-account` на порту `3003`.

Shell должен быть открыт как основной вход в приложение:

```text
http://localhost:3000
```

Переменные окружения:

```text
CATALOG_ORIGIN=http://localhost:3001
CART_REMOTE_ORIGIN=http://localhost:3002
ACCOUNT_REMOTE_ORIGIN=http://localhost:3003
API_ORIGIN=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CART_MANIFEST_URL=/mf/cart/mf-manifest.json
NEXT_PUBLIC_ACCOUNT_MANIFEST_URL=/mf/account/mf-manifest.json
```

Если переменная не задана, используются локальные значения по умолчанию.

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

Через shell доступны маршруты account remote:

```text
/login
/register
/account
/account/orders
/account/favorites
```

`/cart`, `/checkout`, `/login`, `/register` и `/account*` получают `noindex`. Во время server prerender shell отдаёт fallback-разметку, а Module Federation Runtime загружает remote только в браузере после mount. Это позволяет выполнять `next build` без запущенных remotes.

Browser-запросы remote к `/api/v1/*` проксируются shell в `API_ORIGIN`. Локально это `http://localhost:4000`, поэтому remotes внутри shell остаются same-origin для браузера.
Remote assets проксируются через `/mf/cart/*` и `/mf/account/*`, поэтому manifest URLs могут оставаться same-origin.

## Module Federation

Shell использует один runtime instance с именем `shop_shell`.

Remote `cart` загружается из `NEXT_PUBLIC_CART_MANIFEST_URL` и предоставляет:

```text
cart/CartIndicator
cart/CartPage
cart/CheckoutPage
```

`CartIndicator` встраивается в Header. Если manifest недоступен или remote не загрузился за timeout, показывается fallback и кнопка повторной загрузки.

Remote `account` загружается из `NEXT_PUBLIC_ACCOUNT_MANIFEST_URL` и предоставляет:

```text
account/AccountBadge
account/AccountMenu
account/LoginPage
account/RegisterPage
account/ProfilePage
account/OrdersPage
account/FavoritesPage
```

`AccountBadge` и `AccountMenu` встраиваются в Header. Страницы account remote доступны через shell routes и загружаются только в браузере после mount.

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Деплой на Vercel

Shell разворачивается последним и становится публичным origin приложения. В `vercel.json` зафиксированы команды install/build, чтобы Vercel до установки зависимостей настроил доступ к приватному `@w1zll/shop-ui`.

Настройки проекта:

```text
Framework Preset: Next.js
Install Command: corepack enable && pnpm config set @w1zll:registry https://npm.pkg.github.com && pnpm config set '//npm.pkg.github.com/:_authToken' "$NPM_TOKEN" && pnpm install --frozen-lockfile
Build Command: pnpm build
```

Переменные окружения:

```text
NODE_VERSION=24
NPM_TOKEN=<GitHub Packages token с read:packages>
CATALOG_ORIGIN=https://<catalog-host>
CART_REMOTE_ORIGIN=https://<cart-remote-host>
ACCOUNT_REMOTE_ORIGIN=https://<account-remote-host>
API_ORIGIN=https://<render-api-host>
NEXT_PUBLIC_SITE_URL=https://<shell-host>
NEXT_PUBLIC_CART_MANIFEST_URL=/mf/cart/mf-manifest.json
NEXT_PUBLIC_ACCOUNT_MANIFEST_URL=/mf/account/mf-manifest.json
```

Production rewrites:

```text
/catalog/*        -> CATALOG_ORIGIN
/category/*       -> CATALOG_ORIGIN
/product/*        -> CATALOG_ORIGIN
/search/*         -> CATALOG_ORIGIN
/catalog-static/* -> CATALOG_ORIGIN
/mf/cart/*        -> CART_REMOTE_ORIGIN
/mf/account/*     -> ACCOUNT_REMOTE_ORIGIN
/api/v1/*         -> API_ORIGIN
```

## Текущие ограничения

- главная страница зависит от Catalog API и показывает cold-start сообщение с повтором запроса, если API временно недоступен;
- account remote загружается только на клиенте, поэтому SEO-критичный контент не должен зависеть от него;
- cart remote загружается только на клиенте, поэтому SEO-критичный контент не должен зависеть от него.
