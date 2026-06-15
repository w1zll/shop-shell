export const featuredCategories = [
  {
    name: "Электроника",
    href: "/catalog?category=electronics",
    description: "Гаджеты, аксессуары и умные устройства для повседневных задач.",
    tone: "bg-blue-50 text-blue-900 ring-blue-200",
  },
  {
    name: "Дом",
    href: "/catalog?category=home",
    description: "Практичные вещи для кухни, хранения, света и спокойного быта.",
    tone: "bg-emerald-50 text-emerald-900 ring-emerald-200",
  },
  {
    name: "Спорт",
    href: "/catalog?category=sport",
    description: "Базовый инвентарь для тренировок дома, в зале и на улице.",
    tone: "bg-amber-50 text-amber-950 ring-amber-200",
  },
] as const;

export const featuredProducts = [
  {
    name: "Беспроводные наушники AirBeat Lite",
    href: "/product/airbeat-lite-headphones",
    category: "Электроника",
    priceCents: 649000,
    badge: "Хит",
  },
  {
    name: "Кроссовки Move Runner",
    href: "/product/move-runner-sneakers",
    category: "Одежда",
    priceCents: 749000,
    badge: "Новинка",
  },
  {
    name: "Коврик для йоги Grip Mat",
    href: "/product/grip-mat-yoga",
    category: "Спорт",
    priceCents: 259000,
    badge: "Выбор",
  },
  {
    name: "Clean Architecture на практике",
    href: "/product/clean-architecture-practice-book",
    category: "Книги",
    priceCents: 249000,
    badge: "Полезно",
  },
] as const;

export const shellStats = [
  { label: "репозиториев", value: "7" },
  { label: "зоны фронта", value: "4" },
  { label: "единый UI kit", value: "1" },
] as const;
