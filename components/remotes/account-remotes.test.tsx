import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccountBadgeRemote, AccountMenuRemote } from "./account-remotes";

const remoteSlotMock = vi.hoisted(() => vi.fn());

vi.mock("./remote-slot", () => ({
  RemoteSlot: remoteSlotMock,
}));

type RemoteSlotMockProps = {
  errorFallback?: (error: Error, retry: () => void) => ReactNode;
  fallback: ReactNode;
};

describe("account remotes", () => {
  beforeEach(() => {
    remoteSlotMock.mockReset();
    remoteSlotMock.mockImplementation(({ errorFallback, fallback }: RemoteSlotMockProps) =>
      errorFallback ? errorFallback(new Error("account remote failed"), vi.fn()) : fallback,
    );
  });

  it("renders a disabled account badge when the account remote fails", () => {
    render(<AccountBadgeRemote />);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTitle(/account remote/)).toBeInTheDocument();
  });

  it("renders a disabled favorites control when the account menu remote fails", () => {
    render(<AccountMenuRemote />);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTitle(/account remote/)).toBeInTheDocument();
  });
});
