import Link from "next/link";
import { Button, Container, EmptyState } from "@w1zll/shop-ui";

export default function NotFound() {
  return (
    <Container className="py-10">
      <EmptyState
        action={
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
        }
        description="Такого маршрута пока нет в shell. Возможно, он появится после подключения catalog или remote-зон."
        title="Страница не найдена"
      />
    </Container>
  );
}
