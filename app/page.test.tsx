import { render, screen } from "@testing-library/react";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders shell landing content and placeholders", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /единая витрина/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /открыть каталог/i })).toHaveAttribute(
      "href",
      "/catalog",
    );
    expect(screen.getByText("Каталог")).toBeInTheDocument();
    expect(screen.getByText("Корзина")).toBeInTheDocument();
    expect(screen.getByText("Аккаунт")).toBeInTheDocument();
  });
});
