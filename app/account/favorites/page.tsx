import type { Metadata } from "next";

import { FavoritesPageRemote } from "../../../components/remotes/account-remotes";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Избранные товары покупателя в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AccountFavoritesPage() {
  return <FavoritesPageRemote />;
}
