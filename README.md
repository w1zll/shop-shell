# Shop Shell

`shop-shell` — основное Next.js-приложение демонстрационного магазина на микрофронтендах.

## Ответственность

- главный домен приложения;
- общий layout;
- Header и Footer;
- главная страница;
- маршруты shell-зоны;
- будущая загрузка cart/account remotes через Module Federation;
- будущие rewrites к catalog zone, API и remote assets.

На текущем этапе реализован только bootstrap shell без API и Module Federation.

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

Локальный адрес:

```text
http://localhost:3000
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
