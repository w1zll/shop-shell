import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container } from "@w1zll/shop-ui";

import { CheckoutSuccessBonus } from "../../../components/checkout-success-bonus";

export const metadata: Metadata = {
  title: "Заказ оформлен",
  description: "Заказ успешно оформлен в демонстрационном магазине Shop MFS.",
  robots: {
    follow: false,
    index: false,
  },
};

type CheckoutSuccessfulPageProps = {
  searchParams: Promise<{
    orderId?: string | string[];
  }>;
};

export default async function CheckoutSuccessfulPage({
  searchParams,
}: CheckoutSuccessfulPageProps) {
  const params = await searchParams;
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;

  return (
    <Container className="py-10">
      <section className="mx-auto max-w-2xl space-y-5 rounded-lg border border-[var(--shop-border)] p-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--shop-primary)]">Заказ оформлен</p>
          <h1 className="text-3xl font-semibold tracking-normal">Спасибо за заказ</h1>
          <p className="text-sm leading-6 text-[var(--shop-muted-foreground)]">
            Оплата прошла успешно. Историю заказов и текущий статус можно посмотреть в аккаунте.
          </p>
          <CheckoutSuccessBonus orderId={orderId} />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/account/orders">Открыть заказы</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </section>
    </Container>
  );
}
