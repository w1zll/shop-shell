import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

type MockComponentProps = React.PropsWithChildren<{
  asChild?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  label?: string;
  remoteName?: string;
  title?: string;
  description?: string;
  valueCents?: number;
}>;

function createComponent(tagName: keyof React.JSX.IntrinsicElements) {
  return function MockComponent({ asChild, children, ...props }: MockComponentProps) {
    if (asChild && React.isValidElement(children)) {
      return children;
    }

    return React.createElement(tagName, props, children);
  };
}

vi.mock("@w1zll/shop-ui", () => {
  const Button = createComponent("button");
  const Card = createComponent("article");
  const CardContent = createComponent("div");
  const Container = createComponent("div");

  return {
    Badge: createComponent("span"),
    Button,
    Card,
    CardContent,
    Container,
    EmptyState: ({ title, description, children }: MockComponentProps) =>
      React.createElement("section", null, title, description, children),
    ErrorState: ({ title, description }: MockComponentProps) =>
      React.createElement("section", null, title, description),
    Logo: () => React.createElement("div", null, "Shop MFS"),
    Price: ({ valueCents }: MockComponentProps) =>
      React.createElement("span", null, `${String(valueCents)} cents`),
    RemoteErrorFallback: ({ children, remoteName }: MockComponentProps) =>
      React.createElement("section", null, remoteName, children),
    Skeleton: createComponent("div"),
    Toaster: () => null,
  };
});
