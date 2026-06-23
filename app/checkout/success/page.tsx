import { redirect } from "next/navigation";

export default function CheckoutSuccessRedirectPage() {
  redirect("/checkout/successful");
}
