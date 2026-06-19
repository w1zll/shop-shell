import type { Metadata } from "next";

import { LoginPageRemote } from "../../components/remotes/account-remotes";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в аккаунт демонстрационного магазина Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function LoginPage() {
  return <LoginPageRemote />;
}
