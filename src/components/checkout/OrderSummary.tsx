import { CartItem } from "@/store/CartStore";
import Image from "next/image";

export default function OrderSummary({
    items,
    total,
}: {
    items: CartItem[];
    total: number;
}) {
    return (
        <div className="bg-gray-950/40 p-6 mt-10">
            <h2 className="text-lg tracking-widest uppercase font-bold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-gray-200 shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs tracking-widest uppercase">
                                {item.name}
                            </p>
                            <p className="text-xs text-gray-400">{item.size}</p>
                        </div>
                        <p className="text-xs">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-lg">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${total.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-lg">
                    <span className="text-gray-400">Shipping</span>
                    <span>{total >= 150 ? "Free" : "$10.00 AUD"}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>
                        ${(total >= 150 ? total : total + 10).toFixed(2)} AUD
                    </span>
                </div>
            </div>
        </div>
    );
}
