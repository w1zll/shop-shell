import type { Metadata } from "next";

import { RegisterPageRemote } from "../../components/remotes/account-remotes";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрация аккаунта в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function RegisterPage() {
  return <RegisterPageRemote />;
}
