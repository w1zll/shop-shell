import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { Badge, Button, Container, Logo } from "@w1zll/shop-ui";

const navItems = [
  { href: "/catalog", label: "Каталог", zone: "catalog" },
  { href: "/search", label: "Поиск", zone: "catalog" },
  { href: "/cart", label: "Корзина", zone: "shell" },
  { href: "/account", label: "Аккаунт", zone: "shell" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--shop-border)] bg-[var(--shop-background)]/95 backdrop-blur">
      <Container className="flex min-h-[var(--shell-header-height)] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            aria-label="Открыть меню"
            className="size-10 p-0 md:hidden"
            type="button"
            variant="outline"
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
          <Link href="/" aria-label="На главную">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost">
              {item.zone === "catalog" ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button aria-label="Поиск" className="size-10 p-0" type="button" variant="ghost">
            <Search className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Избранное"
            className="hidden size-10 p-0 sm:inline-flex"
            type="button"
            variant="ghost"
          >
            <Heart className="size-4" aria-hidden="true" />
          </Button>
          <Button asChild className="relative size-10 p-0" variant="outline">
            <Link href="/cart" aria-label="Корзина">
              <ShoppingCart className="size-4" aria-hidden="true" />
              <Badge className="absolute -right-2 -top-2 px-1.5 py-0 text-[10px]">0</Badge>
            </Link>
          </Button>
          <Button asChild className="hidden gap-2 sm:inline-flex" variant="outline">
            <Link href="/account">
              <UserRound className="size-4" aria-hidden="true" />
              Войти
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
