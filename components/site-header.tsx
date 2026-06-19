import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button, Container, Logo } from "@w1zll/shop-ui";

import { AccountBadgeRemote, AccountMenuRemote } from "./remotes/account-remotes";
import { CartIndicatorRemote } from "./remotes/cart-remotes";

const navItems = [
  { href: "/catalog", label: "Каталог", zone: "catalog" },
  { href: "/search", label: "Поиск", zone: "catalog" },
  { href: "/cart", label: "Корзина", zone: "shell" },
  { href: "/account", label: "Аккаунт", zone: "shell" },
] as const;

function NavLink({ href, label, zone }: (typeof navItems)[number]) {
  if (zone === "catalog") {
    return <a href={href}>{label}</a>;
  }

  return <Link href={href}>{label}</Link>;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--shop-border)] bg-[var(--shop-background)]/95 backdrop-blur">
      <Container className="flex min-h-[var(--shell-header-height)] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="shell-mobile-menu">
            <details className="relative">
              <summary className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-[var(--shop-border)] bg-[var(--shop-background)] p-0 text-sm font-medium transition-colors hover:bg-[var(--shop-muted)] [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Открыть меню</span>
                <Menu className="size-4" aria-hidden="true" />
              </summary>
              <nav className="absolute left-0 top-[calc(100%+0.5rem)] z-50 grid w-48 gap-1 rounded-lg border border-[var(--shop-border)] bg-[var(--shop-background)] p-2 shadow-lg">
                {navItems.map((item) => (
                  <Button key={item.href} asChild className="justify-start" variant="ghost">
                    <NavLink {...item} />
                  </Button>
                ))}
              </nav>
            </details>
          </div>
          <Link href="/" aria-label="На главную">
            <Logo />
          </Link>
        </div>

        <nav className="shell-desktop-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost">
              <NavLink {...item} />
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button aria-label="Поиск" className="size-10 p-0" type="button" variant="ghost">
            <Search className="size-4" aria-hidden="true" />
          </Button>
          <AccountMenuRemote />
          <CartIndicatorRemote />
          <AccountBadgeRemote />
        </div>
      </Container>
    </header>
  );
}
