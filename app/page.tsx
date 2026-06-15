import Link from "next/link";
import { ArrowRight, Boxes, ShieldCheck, Truck } from "lucide-react";
import { Badge, Button, Card, CardContent, Container, Price } from "@w1zll/shop-ui";

import { featuredCategories, featuredProducts, shellStats } from "../lib/home-data";

const workflowItems = [
  {
    title: "Каталог",
    description: "Next zone с SSR/SEO будет подключена через rewrites.",
    icon: Boxes,
  },
  {
    title: "Корзина",
    description: "Remote placeholder в Header позже заменится Module Federation компонентом.",
    icon: Truck,
  },
  {
    title: "Аккаунт",
    description: "Auth и профиль будут загружаться как отдельный account remote.",
    icon: ShieldCheck,
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-[var(--shop-background)]">
      <section className="border-b border-[var(--shop-border)]">
        <Container className="grid gap-10 py-12 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-16">
          <div className="space-y-7">
            <div className="space-y-4">
              <Badge variant="secondary">Shell app</Badge>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--shop-foreground)] md:text-5xl">
                Единая витрина для магазина на микрофронтендах
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--shop-muted-foreground)] md:text-lg">
                Главный shell держит общий каркас, навигацию и будущую композицию catalog, cart и
                account зон. Сейчас страница работает на статических placeholder-данных.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="/catalog">
                  Открыть каталог
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/account">Проверить аккаунт</Link>
              </Button>
            </div>

            <dl className="grid max-w-xl grid-cols-3 gap-3">
              {shellStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l border-[var(--shop-border)] pl-4 first:border-l-0 first:pl-0"
                >
                  <dt className="text-xs text-[var(--shop-muted-foreground)]">{stat.label}</dt>
                  <dd className="text-2xl font-semibold text-[var(--shop-foreground)]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-[var(--shop-border)] bg-[var(--shop-card)] p-4 shadow-[var(--shop-shadow-sm)]">
            <div className="grid gap-3">
              {workflowItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-md bg-[var(--shop-secondary)]/70 p-4"
                  >
                    <span className="flex size-10 items-center justify-center rounded-md bg-[var(--shop-background)] text-[var(--shop-primary)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold text-[var(--shop-foreground)]">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[var(--shop-muted-foreground)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--shop-foreground)]">Категории</h2>
              <p className="mt-1 text-sm text-[var(--shop-muted-foreground)]">
                Placeholder-разделы до подключения catalog zone.
              </p>
            </div>
            <Button asChild variant="ghost">
              <a href="/catalog">Все категории</a>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredCategories.map((category) => (
              <a
                key={category.href}
                className={`block rounded-lg p-5 ring-1 transition hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-md)] ${category.tone}`}
                href={category.href}
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm leading-6">{category.description}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--shop-foreground)]">
              Подборка товаров
            </h2>
            <p className="mt-1 text-sm text-[var(--shop-muted-foreground)]">
              Статические данные для проверки layout и UI-пакета.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card key={product.href} className="overflow-hidden">
                <CardContent className="flex h-full flex-col gap-4 p-4">
                  <div className="aspect-[4/3] rounded-md bg-[var(--shop-secondary)]" />
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="space-y-2">
                      <Badge variant="outline">{product.badge}</Badge>
                      <h3 className="min-h-12 text-sm font-semibold leading-6 text-[var(--shop-foreground)]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[var(--shop-muted-foreground)]">
                        {product.category}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <Price className="text-base font-semibold" valueCents={product.priceCents} />
                      <Button asChild size="sm" variant="outline">
                        <a href={product.href}>Смотреть</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
