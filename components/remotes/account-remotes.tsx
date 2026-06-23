"use client";

import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import { Button, Container, LoadingState } from "@w1zll/shop-ui";

import { RemoteSlot } from "./remote-slot";

export function AccountBadgeFallback() {
  return <AccountBadgeButton />;
}

function AccountBadgeButton() {
  return (
    <Button asChild className="size-10 p-0" variant="outline">
      <Link href="/account" aria-label="Войти в аккаунт">
        <UserRound className="size-4" aria-hidden="true" />
      </Link>
    </Button>
  );
}

export function AccountBadgeRemote() {
  return (
    <RemoteSlot
      errorFallback={() => (
        <UnavailableAccountControl
          icon="user"
          iconOnly
          label="Аккаунт временно недоступен"
          title="Аккаунт временно недоступен: account remote не загрузился"
        />
      )}
      expose="AccountBadge"
      fallback={<AccountBadgeFallback />}
      remoteName="account"
    />
  );
}

export function AccountMenuFallback() {
  return (
    <div className="shell-sm-up">
      <AccountMenuButton />
    </div>
  );
}

function AccountMenuButton() {
  return (
    <Button asChild aria-label="Избранное" className="size-10 p-0" variant="ghost">
      <Link href="/account/favorites">
        <Heart className="size-4" aria-hidden="true" />
      </Link>
    </Button>
  );
}

export function AccountMenuRemote() {
  return (
    <RemoteSlot
      errorFallback={() => (
        <UnavailableAccountControl
          iconOnly
          label="Избранное временно недоступно"
          title="Избранное временно недоступно: account remote не загрузился"
        />
      )}
      expose="AccountMenu"
      fallback={<AccountMenuFallback />}
      remoteName="account"
    />
  );
}

function UnavailableAccountControl({
  icon = "heart",
  iconOnly = false,
  label,
  title,
}: Readonly<{ icon?: "heart" | "user"; iconOnly?: boolean; label: string; title: string }>) {
  return (
    <span title={title}>
      <Button
        aria-label={label}
        className={
          iconOnly
            ? "size-10 border border-red-500/70 p-0 text-red-600 opacity-100"
            : "gap-2 border-red-500/70 text-red-600 opacity-100"
        }
        disabled
        type="button"
        variant={iconOnly ? "ghost" : "outline"}
      >
        {iconOnly ? (
          icon === "user" ? (
            <UserRound className="size-4" aria-hidden="true" />
          ) : (
            <Heart className="size-4" aria-hidden="true" />
          )
        ) : (
          <>
            <UserRound className="size-4" aria-hidden="true" />
            Аккаунт
          </>
        )}
      </Button>
    </span>
  );
}

function AccountPageFallback({ label }: Readonly<{ label: string }>) {
  return (
    <Container className="py-10">
      <LoadingState label={label} />
    </Container>
  );
}

export function LoginPageRemote() {
  return (
    <RemoteSlot
      expose="LoginPage"
      fallback={<AccountPageFallback label="Вход загружается" />}
      remoteName="account"
    />
  );
}

export function RegisterPageRemote() {
  return (
    <RemoteSlot
      expose="RegisterPage"
      fallback={<AccountPageFallback label="Регистрация загружается" />}
      remoteName="account"
    />
  );
}

export function ProfilePageRemote() {
  return (
    <RemoteSlot
      expose="ProfilePage"
      fallback={<AccountPageFallback label="Профиль загружается" />}
      remoteName="account"
    />
  );
}

export function OrdersPageRemote() {
  return (
    <RemoteSlot
      expose="OrdersPage"
      fallback={<AccountPageFallback label="Заказы загружаются" />}
      remoteName="account"
    />
  );
}

export function FavoritesPageRemote() {
  return (
    <RemoteSlot
      expose="FavoritesPage"
      fallback={<AccountPageFallback label="Избранное загружается" />}
      remoteName="account"
    />
  );
}
