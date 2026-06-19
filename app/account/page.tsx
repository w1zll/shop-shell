import type { Metadata } from "next";

import { ProfilePageRemote } from "../../components/remotes/account-remotes";

export const metadata: Metadata = {
  title: "Аккаунт",
  description: "Профиль покупателя в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AccountPage() {
  return <ProfilePageRemote />;
}
