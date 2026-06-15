import { Container, Skeleton } from "@w1zll/shop-ui";

export default function Loading() {
  return (
    <Container className="space-y-6 py-10">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </Container>
  );
}
