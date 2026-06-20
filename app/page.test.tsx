import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "./page";

vi.mock("../lib/home-data", () => ({
  getHomePageData: vi.fn(() => Promise.resolve({
    benefits: [
      {
        description: "Публичные страницы остаются доступными.",
        title: "Доставка по сценарию demo",
      },
      {
        description: "Единый визуальный язык.",
        title: "Единый UI kit",
      },
      {
        description: "Критичный контент рендерится сервером.",
        title: "SEO на сервере",
      },
    ],
    categories: [
      {
        description: "Гаджеты и аксессуары.",
        id: "electronics",
        imageUrl: null,
        name: "Электроника",
        productsCount: 12,
        slug: "electronics",
      },
    ],
    featuredProducts: [
      {
        brand: "AirBeat",
        category: {
          name: "Электроника",
          slug: "electronics",
        },
        id: "airbeat-lite-headphones",
        images: [],
        name: "Беспроводные наушники AirBeat Lite",
        oldPriceCents: 799000,
        priceCents: 649000,
        slug: "airbeat-lite-headphones",
      },
    ],
    promotions: [
      {
        description: "AirBeat",
        href: "/product/airbeat-lite-headphones",
        label: "-19%",
        title: "Беспроводные наушники AirBeat Lite",
      },
    ],
    stats: [
      { label: "категорий", value: "1" },
      { label: "товаров в подборке", value: "1" },
      { label: "единый UI kit", value: "1" },
    ],
    status: "ready",
  })),
}));

describe("HomePage", () => {
  it("renders shell landing content from API data", async () => {
    render(await HomePage());

    expect(screen.getByRole("heading", { name: /единая витрина/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /открыть каталог/i })).toHaveAttribute(
      "href",
      "/catalog",
    );
    expect(screen.getByRole("link", { name: /электроника/i })).toHaveAttribute("href", "/category/electronics");
    expect(screen.getAllByText("Беспроводные наушники AirBeat Lite").length).toBeGreaterThan(0);
  });
});
