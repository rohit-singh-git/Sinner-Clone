import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummaryWrapper from "@/components/checkout/OrderSummaryWrapper";

export default async function CheckoutPage() {
    const session = await auth();

    if (!session) redirect("/account/login?callbackUrl=/checkout");

    return (
        <div className="min-h-screen max-w-6xl mx-auto px-4 py-12 mt-20">
            <h1 className="text-4xl tracking-widest uppercase font-bold mb-5">
                Checkout
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <CheckoutForm
                    userEmail={session?.user?.email ?? ""}
                    userName={session?.user?.name ?? ""}
                />
                <OrderSummaryWrapper />
            </div>
        </div>
    );
}
