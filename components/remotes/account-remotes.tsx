"use client";

import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import { Button, Container, LoadingState } from "@w1zll/shop-ui";

import { RemoteSlot } from "./remote-slot";

export function AccountBadgeFallback() {
  return (
    <div className="shell-sm-up">
      <Button asChild className="gap-2" variant="outline">
        <Link href="/account">
          <UserRound className="size-4" aria-hidden="true" />
          Войти
        </Link>
      </Button>
    </div>
  );
}

export function AccountBadgeRemote() {
  return (
    <RemoteSlot expose="AccountBadge" fallback={<AccountBadgeFallback />} remoteName="account" />
  );
}

export function AccountMenuFallback() {
  return (
    <div className="shell-sm-up">
      <Button asChild aria-label="Избранное" className="size-10 p-0" variant="ghost">
        <Link href="/account/favorites">
          <Heart className="size-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}

export function AccountMenuRemote() {
  return (
    <RemoteSlot expose="AccountMenu" fallback={<AccountMenuFallback />} remoteName="account" />
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
