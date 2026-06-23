"use client";

import { Price } from "@w1zll/shop-ui";
import { useEffect, useState } from "react";

type OrderBonusResponse = {
  earnedBonusCents: number;
};

export function CheckoutSuccessBonus({ orderId }: Readonly<{ orderId?: string }>) {
  const [earnedBonusCents, setEarnedBonusCents] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(orderId));
  const [isError, setIsError] = useState(!orderId);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/v1/orders/${encodeURIComponent(orderId)}`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Orders API returned HTTP ${String(response.status)}`);
        }

        return (await response.json()) as OrderBonusResponse;
      })
      .then((order) => {
        setEarnedBonusCents(order.earnedBonusCents);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setIsError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <p className="text-sm text-[var(--shop-muted-foreground)]">
        Считаем начисленные бонусы...
      </p>
    );
  }

  if (earnedBonusCents !== null) {
    return (
      <p className="text-base font-medium">
        За этот заказ начислено <Price valueCents={earnedBonusCents} /> бонусов.
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-[var(--shop-muted-foreground)]">
        Информацию о бонусах можно посмотреть в истории заказов.
      </p>
    );
  }

  return null;
}
