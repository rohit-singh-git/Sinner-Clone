"use client";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore, CartItem } from "@/store/CartStore";

export default function CartItemRow({ item }: { item: CartItem }) {
    const { removeItem, updateQuantity } = useCartStore();

    return (
        <div className="flex gap-4 py-4 border-b border-gray-100">
            {/* Image */}
            <div className="relative w-20 h-20 bg-gray-100 shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 font-semibold">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase truncate">
                            {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {item.size}
                        </p>
                    </div>
                    <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="btn-press hover:text-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3 font-semibold">
                    {/* Quantity */}
                    <div className="flex items-center border border-black">
                        <button
                            className="btn-press px-2 py-1 hover:bg-black hover:text-white transition-colors"
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.size,
                                    item.quantity - 1,
                                )
                            }
                        >
                            <Minus size={10} />
                        </button>
                        <span className="px-3 text-xs">{item.quantity}</span>
                        <button
                            className="btn-press px-2 py-1 hover:bg-black hover:text-white transition-colors"
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.size,
                                    item.quantity + 1,
                                )
                            }
                        >
                            <Plus size={10} />
                        </button>
                    </div>

                    {/* Price */}
                    <p className="text-xs font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)} INR
                    </p>
                </div>
            </div>
        </div>
    );
}
