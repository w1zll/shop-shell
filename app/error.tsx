"use client";

import { Container, ErrorState } from "@w1zll/shop-ui";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-10">
      <ErrorState
        description="Shell не смог отрендерить текущий экран. Можно повторить попытку без перезагрузки страницы."
        onRetry={reset}
        retryLabel="Повторить"
        title="Не удалось загрузить страницу"
      />
    </Container>
  );
}
