import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, RefreshCw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Badge, Button, Card, CardContent, Container, Price } from "@w1zll/shop-ui";

import { getHomePageData, type HomeProduct } from "../lib/home-data";

export const dynamic = "force-dynamic";

const benefitIcons = [Truck, ShieldCheck, Sparkles] as const;

function ProductImage({ priority = false, product }: Readonly<{ priority?: boolean; product: HomeProduct }>) {
  const image = product.images.length > 0 ? product.images[0] : undefined;

  if (!image?.url) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-[var(--shop-secondary)] text-sm text-[var(--shop-muted-foreground)]">
        {product.category.name}
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--shop-secondary)]">
      <Image
        alt={image.alt || product.name}
        className="object-cover"
        fill
        loading={priority ? undefined : "lazy"}
        priority={priority}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        src={image.url}
        unoptimized
      />
    </div>
  );
}

export default async function HomePage() {
  const homeData = await getHomePageData();

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
                Shell рендерит главную страницу серверно, а catalog, cart и account подключаются как
                независимые зоны и remotes.
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
              {homeData.stats.map((stat) => (
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

          {homeData.status === "ready" ? (
            <div className="rounded-lg border border-[var(--shop-border)] bg-[var(--shop-card)] p-4 shadow-[var(--shop-shadow-sm)]">
              <div className="grid gap-3">
                {homeData.promotions.map((promotion) => (
                  <a
                    className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-md bg-[var(--shop-secondary)]/70 p-4 transition hover:bg-[var(--shop-secondary)]"
                    href={promotion.href}
                    key={promotion.href}
                  >
                    <span className="flex size-10 items-center justify-center rounded-md bg-[var(--shop-background)] text-[var(--shop-primary)]">
                      <BadgePercent className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-xs font-semibold uppercase tracking-normal text-[var(--shop-primary)]">
                        {promotion.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-[var(--shop-foreground)]">
                        {promotion.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--shop-muted-foreground)]">
                        {promotion.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 text-amber-950 shadow-[var(--shop-shadow-sm)]">
              <div className="flex items-start gap-3">
                <RefreshCw className="mt-1 size-5" aria-hidden="true" />
                <div className="space-y-3">
                  <div>
                    <h2 className="font-semibold">API запускается</h2>
                    <p className="mt-1 text-sm leading-6">{homeData.message}</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <a href={homeData.retryHref}>Повторить запрос</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {homeData.status === "ready" ? (
        <>
          <section className="py-10">
            <Container className="space-y-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--shop-foreground)]">
                    Категории
                  </h2>
                  <p className="mt-1 text-sm text-[var(--shop-muted-foreground)]">
                    Разделы приходят из Catalog API и ведут в catalog zone.
                  </p>
                </div>
                <Button asChild variant="ghost">
                  <a href="/catalog">Все категории</a>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {homeData.categories.map((category) => (
                  <a
                    key={category.slug}
                    className="block rounded-lg border border-[var(--shop-border)] p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-md)]"
                    href={`/category/${category.slug}`}
                  >
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--shop-muted-foreground)]">
                      {category.description ?? `Товары категории ${category.name}.`}
                    </p>
                    <p className="mt-4 text-xs text-[var(--shop-muted-foreground)]">
                      Товаров: {category.productsCount}
                    </p>
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
                  Featured products загружаются из Catalog API на сервере shell.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {homeData.featuredProducts.map((product, index) => (
                  <Card key={product.slug} className="overflow-hidden">
                    <CardContent className="flex h-full flex-col gap-4 p-4">
                      <ProductImage priority={index === 0} product={product} />
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="space-y-2">
                          <Badge variant="outline">{product.brand}</Badge>
                          <h3 className="min-h-12 text-sm font-semibold leading-6 text-[var(--shop-foreground)]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[var(--shop-muted-foreground)]">
                            {product.category.name}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3">
                          <Price
                            className="text-base font-semibold"
                            valueCents={product.priceCents}
                          />
                          <Button asChild size="sm" variant="outline">
                            <a href={`/product/${product.slug}`}>Смотреть</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        </>
      ) : null}

      <section className="border-t border-[var(--shop-border)] py-10">
        <Container className="grid gap-4 md:grid-cols-3">
          {homeData.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];

            return (
              <div
                className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-lg border border-[var(--shop-border)] p-4"
                key={benefit.title}
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-[var(--shop-secondary)] text-[var(--shop-primary)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-[var(--shop-foreground)]">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--shop-muted-foreground)]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </div>
  );
}
