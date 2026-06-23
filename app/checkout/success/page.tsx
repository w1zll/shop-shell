import { redirect } from "next/navigation";

type CheckoutSuccessRedirectPageProps = {
  searchParams: Promise<{
    orderId?: string | string[];
  }>;
};

export default async function CheckoutSuccessRedirectPage({
  searchParams,
}: CheckoutSuccessRedirectPageProps) {
  const params = await searchParams;
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;

  redirect(
    orderId
      ? `/checkout/successful?orderId=${encodeURIComponent(orderId)}`
      : "/checkout/successful",
  );
}
