"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge, Button, Container, LoadingState } from "@w1zll/shop-ui";

import { RemoteSlot } from "./remote-slot";

export function CartIndicatorFallback() {
  return (
    <Button asChild className="relative size-10 p-0" variant="outline">
      <Link href="/cart" aria-label="Корзина">
        <ShoppingCart className="size-4" aria-hidden="true" />
        <Badge className="absolute -right-2 -top-2 px-1.5 py-0 text-[10px]">0</Badge>
      </Link>
    </Button>
  );
}

export function CartIndicatorRemote() {
  return <RemoteSlot expose="CartIndicator" fallback={<CartIndicatorFallback />} remoteName="cart" />;
}

function CartPageFallback() {
  return (
    <Container className="py-10">
      <LoadingState label="Корзина загружается" />
    </Container>
  );
}

function CheckoutPageFallback() {
  return (
    <Container className="py-10">
      <LoadingState label="Оформление загружается" />
    </Container>
  );
}

export function CartPageRemote() {
  return <RemoteSlot expose="CartPage" fallback={<CartPageFallback />} remoteName="cart" />;
}

export function CheckoutPageRemote() {
  return <RemoteSlot expose="CheckoutPage" fallback={<CheckoutPageFallback />} remoteName="cart" />;
}
