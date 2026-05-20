"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/CartStore";
import CartItemRow from "./CartItem";
import { useSession } from "next-auth/react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
    const { items, total, count } = useCartStore();
    const { data: session } = useSession();

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-100 bg-black z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xs text-white font-semibold tracking-widest uppercase">
                        Your Cart ({count()})
                    </h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-sm text-gray-400 mb-4">
                                Your cart is empty
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-black border text-white text-xs tracking-widest uppercase px-6 py-3 hover:border-gray-500 transition-colors ease-in-out"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <CartItemRow
                                key={`${item.id}-${item.size}`}
                                item={item}
                            />
                        ))
                    )}
                </div>

                {items.length > 0 && !session && (
                    <p className="text-sm text-center text-gray-400 px-4 pb-2">
                        You will need to{" "}
                        <Link
                            href="/account/login?callbackUrl=/checkout"
                            className="underline text-white"
                            onClick={onClose}
                        >
                            log in
                        </Link>{" "}
                        before checkout
                    </p>
                )}

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-4 space-y-4">
                        <div className="flex justify-between text-sm font-semibold tracking-widest uppercase">
                            <span>Subtotal</span>
                            <span>₹{total().toFixed(2)} INR</span>
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                            Taxes and shipping calculated at checkout
                        </p>
                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="btn-press block w-full border bg-black text-white text-xs tracking-widest uppercase text-center py-4 hover:bg-gray-800 transition-colors"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
