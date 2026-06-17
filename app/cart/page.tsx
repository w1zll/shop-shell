import type { Metadata } from "next";

import { CartPageRemote } from "../../components/remotes/cart-remotes";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Корзина покупателя в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function CartPage() {
  return <CartPageRemote />;
}
