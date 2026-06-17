import type { Metadata } from "next";

import { CheckoutPageRemote } from "../../components/remotes/cart-remotes";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageRemote />;
}
