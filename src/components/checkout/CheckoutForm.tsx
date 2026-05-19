"use client";
import { useCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutForm({
    userEmail,
    userName,
}: {
    userEmail: string;
    userName: string;
}) {
    const { items, total, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({
        name: userName,
        email: userEmail,
    });

    const [address, setAddress] = useState({
        line1: "",
        city: "",
        postcode: "",
        country: "IN",
    });

    const loadRazorpayScript = () =>
        new Promise<boolean>((resolve) => {
            if (document.getElementById("razorpay-script"))
                return resolve(true);
            const script = document.createElement("script");
            script.id = "razorpay-script";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handleCheckout = async () => {
        if (
            !customer.name ||
            !customer.email ||
            !address.line1 ||
            !address.city ||
            !address.postcode
        ) {
            alert("Please fill in all required fields");
            return;
        }
        if (items.length === 0) return;

        setLoading(true);

        const loaded = await loadRazorpayScript();
        if (!loaded) {
            alert("Failed to load Razorpay. Check your internet connection.");
            setLoading(false);
            return;
        }

        // Create Razorpay order
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
        });

        const { orderId, amount, currency, keyId } = await res.json();

        const options = {
            key: keyId,
            amount,
            currency,
            name: "Official Sinner",
            description: "Thank you for your order",
            order_id: orderId,
            handler: async (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) => {
                // Verify + save order
                const verifyRes = await fetch("/api/webhook", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...response,
                        items: items.map((i) => ({
                            name: `${i.name} (${i.size})`,
                            price: i.price,
                            quantity: i.quantity,
                            size: i.size,
                            image: i.image,
                        })),
                        customer,
                        address,
                        total: total(),
                    }),
                });

                if (verifyRes.ok) {
                    clearCart();
                    router.push("/checkout/success");
                } else {
                    alert("Payment verification failed. Contact support.");
                }
            },
            prefill: {
                name: customer.name,
                email: customer.email,
            },
            theme: { color: "#000000" },
            modal: {
                ondismiss: () => setLoading(false),
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-md tracking-widest uppercase font-semibold">
                Contact
            </h2>
            <input
                type="text"
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                }
                className="border border-white px-4 py-3 text-sm outline-none w-full"
            />
            <input
                type="email"
                placeholder="Email"
                value={customer.email}
                onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                }
                className="border border-white px-4 py-3 text-sm outline-none w-full"
            />

            <h2 className="text-md tracking-widest uppercase font-semibold">
                Shipping Address
            </h2>
            <input
                placeholder="Address..."
                value={address.line1}
                onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                }
                className="border border-white px-4 py-3 text-sm outline-none w-full"
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                    }
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
                <input
                    placeholder="Postcode"
                    value={address.postcode}
                    onChange={(e) =>
                        setAddress({ ...address, postcode: e.target.value })
                    }
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
            </div>

            <button
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
                className={`btn-press w-full py-4 border text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2
          ${
              loading || items.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
          }`}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                        Processing...
                    </>
                ) : (
                    "Proceed to Payment"
                )}
            </button>

            <p className="text-xs text-gray-400 text-center">
                Powered by Razorpay · UPI, Cards, Netbanking, Wallets accepted
            </p>
        </div>
    );
}
