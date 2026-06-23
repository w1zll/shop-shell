import Link from "next/link";
import { Container, Logo } from "@w1zll/shop-ui";

const footerLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/checkout", label: "Оформление" },
  { href: "/account", label: "Профиль" },
  { href: "/account/orders", label: "Заказы" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--shop-border)] bg-[var(--shop-secondary)]/60">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xl text-sm leading-6 text-[var(--shop-muted-foreground)]">
            Shell отвечает за общий каркас магазина, навигацию и будущую композицию микрофронтендов.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Нижняя навигация">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              className="text-[var(--shop-muted-foreground)] transition hover:text-[var(--shop-foreground)]"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
