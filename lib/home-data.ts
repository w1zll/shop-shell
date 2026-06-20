const DEFAULT_API_ORIGIN = "http://localhost:4000";
const HOME_API_ATTEMPTS = 2;
const HOME_API_TIMEOUT_MS = 4_000;
const SITEMAP_PRODUCTS_LIMIT = 50;

export type HomeCategory = {
  description: string | null;
  id: string;
  imageUrl: string | null;
  name: string;
  productsCount: number;
  slug: string;
};

export type HomeProduct = {
  brand: string;
  category: {
    name: string;
    slug: string;
  };
  id: string;
  images: Array<{
    alt: string;
    id: string;
    position: number;
    url: string;
  }>;
  name: string;
  oldPriceCents: number | null;
  priceCents: number;
  slug: string;
};

export type HomePromotion = {
  description: string;
  href: string;
  label: string;
  title: string;
};

export type HomeBenefit = {
  description: string;
  title: string;
};

export type HomeStat = {
  label: string;
  value: string;
};

export type HomePageData =
  | {
      benefits: HomeBenefit[];
      categories: HomeCategory[];
      featuredProducts: HomeProduct[];
      promotions: HomePromotion[];
      stats: HomeStat[];
      status: "ready";
    }
  | {
      benefits: HomeBenefit[];
      message: string;
      retryHref: string;
      stats: HomeStat[];
      status: "unavailable";
    };

type FeaturedProductsResponse = {
  items: HomeProduct[];
};

type ProductListResponse = {
  items: HomeProduct[];
};

export const homeBenefits: HomeBenefit[] = [
  {
    title: "Доставка по сценарию demo",
    description: "Публичные страницы остаются доступными, даже если remotes еще запускаются.",
  },
  {
    title: "Единый UI kit",
    description: "Shell, catalog, cart и account используют общий визуальный язык.",
  },
  {
    title: "SEO на сервере",
    description: "Каталог и карточки товаров рендерят критичный контент без зависимости от remotes.",
  },
] as const;

function normalizeOrigin(origin: string | undefined) {
  const rawOrigin = origin?.trim() || DEFAULT_API_ORIGIN;
  const parsedOrigin = new URL(rawOrigin);

  return parsedOrigin.origin;
}

function createAbortSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return {
    signal: controller.signal,
    cleanup() {
      clearTimeout(timeoutId);
    },
  };
}

async function fetchJson<TResponse>(path: string, attempt = 1): Promise<TResponse> {
  const abortSignal = createAbortSignal(HOME_API_TIMEOUT_MS);

  try {
    const response = await fetch(`${normalizeOrigin(process.env.API_ORIGIN)}/api/v1${path}`, {
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
      signal: abortSignal.signal,
    });

    if (!response.ok) {
      throw new Error(`API returned HTTP ${String(response.status)}`);
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (attempt < HOME_API_ATTEMPTS) {
      return await fetchJson<TResponse>(path, attempt + 1);
    }

    throw error;
  } finally {
    abortSignal.cleanup();
  }
}

function calculateDiscountPercent(product: HomeProduct) {
  if (!product.oldPriceCents || product.oldPriceCents <= product.priceCents) {
    return null;
  }

  return Math.round(((product.oldPriceCents - product.priceCents) / product.oldPriceCents) * 100);
}

function createPromotions(products: HomeProduct[]): HomePromotion[] {
  const discountPromotions = products
    .map((product) => ({
      discountPercent: calculateDiscountPercent(product),
      product,
    }))
    .filter((item): item is { discountPercent: number; product: HomeProduct } =>
      Boolean(item.discountPercent),
    )
    .slice(0, 2)
    .map(({ discountPercent, product }) => ({
      description: product.brand,
      href: `/product/${product.slug}`,
      label: `-${String(discountPercent)}%`,
      title: product.name,
    }));

  if (discountPromotions.length > 0) {
    return discountPromotions;
  }

  return products.slice(0, 2).map((product) => ({
    description: product.category.name,
    href: `/product/${product.slug}`,
    label: "Подборка",
    title: product.name,
  }));
}

function createStats(categories: HomeCategory[], products: HomeProduct[]): HomeStat[] {
  return [
    { label: "категорий", value: String(categories.length) },
    { label: "товаров в подборке", value: String(products.length) },
    { label: "единый UI kit", value: "1" },
  ];
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const [categories, featuredProductsResponse] = await Promise.all([
      fetchJson<HomeCategory[]>("/categories"),
      fetchJson<FeaturedProductsResponse>("/products/featured"),
    ]);
    const featuredProducts = featuredProductsResponse.items.slice(0, 4);

    return {
      benefits: homeBenefits,
      categories: categories.slice(0, 6),
      featuredProducts,
      promotions: createPromotions(featuredProducts),
      stats: createStats(categories, featuredProducts),
      status: "ready",
    };
  } catch {
    return {
      benefits: homeBenefits,
      message:
        "Демонстрационный API может запускаться после паузы. Подождите немного и повторите запрос.",
      retryHref: `/?retry=${String(Date.now())}`,
      stats: [
        { label: "API", value: "стартует" },
        { label: "повтор", value: "1" },
        { label: "loader", value: "нет" },
      ],
      status: "unavailable",
    };
  }
}

export async function getSitemapCatalogData() {
  const [categories, productsResponse] = await Promise.all([
    fetchJson<HomeCategory[]>("/categories"),
    fetchJson<ProductListResponse>(`/products?limit=${String(SITEMAP_PRODUCTS_LIMIT)}`),
  ]);

  return {
    categories,
    products: productsResponse.items,
  };
}
