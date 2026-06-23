import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckoutSuccessBonus } from "./checkout-success-bonus";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("CheckoutSuccessBonus", () => {
  it("loads and shows bonuses for the order", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ earnedBonusCents: 9_500 }),
          ok: true,
          status: 200,
        } as Response),
      ),
    );

    render(<CheckoutSuccessBonus orderId="order-1" />);

    expect(await screen.findByText(/За этот заказ начислено/)).toHaveTextContent("9500");
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/orders/order-1",
      expect.objectContaining({ credentials: "include" }),
    );
  });
});
