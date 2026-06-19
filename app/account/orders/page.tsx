import type { Metadata } from "next";

import { OrdersPageRemote } from "../../../components/remotes/account-remotes";

export const metadata: Metadata = {
  title: "Заказы",
  description: "История заказов покупателя в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AccountOrdersPage() {
  return <OrdersPageRemote />;
}
