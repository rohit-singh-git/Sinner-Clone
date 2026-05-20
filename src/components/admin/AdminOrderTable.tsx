"use client";
import { useState } from "react";

interface OrderItem {
    name: string;
    quantity: number;
    size: string;
    price: number;
    image?: string;
}

interface Order {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: string;
    date: string;
    items: OrderItem[];
    shippingAddress?: {
        line1?: string;
        city?: string;
        postcode?: string;
        country?: string;
    };
}

const statusColors: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    shipped: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrderTable({ orders }: { orders: Order[] }) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="border border-gray-200">
            {/* Header */}
            <div className="grid grid-cols-4 px-4 py-3 border-b bg-gray-500/10 text-white/70 text-xs tracking-widest uppercase font-semibold ">
                <span>Order ID</span>
                <span>Total</span>
                <span>Status</span>
                <span>Date</span>
            </div>

            {orders.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-8 tracking-widest uppercase">
                    No orders yet
                </p>
            )}

            {orders.map((order) => (
                <div key={order.id}>
                    <button
                        onClick={() =>
                            setExpanded(expanded === order.id ? null : order.id)
                        }
                        className="w-full font-light md:font-semibold grid grid-cols-4 px-4 py-4 border-b text-xs hover:bg-gray-800 text-left"
                    >
                        <span>{order.id.slice(-10)}</span>

                        <span>₹{order.total.toFixed(2)} INR</span>
                        <span>
                            <span
                                className={`px-2 py-1 text-[10px] tracking-widest uppercase rounded ${statusColors[order.status]}`}
                            >
                                {order.status}
                            </span>
                        </span>
                        <span className="text-gray-400">{order.date}</span>
                    </button>

                    {/* Expanded row */}
                    {expanded === order.id && (
                        <div className="px-6 py-4 bg-gray-700/40 grid grid-cols-1 md:grid-cols-3 gap-6 border-b text-sm md:text-md space-y-1">
                            {/* Customer info */}
                            <div>
                                <p className="tracking-widest uppercase text-gray-400 mb-3 font-semibold">
                                    Customer
                                </p>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-gray-500 mt-1">
                                    {order.email}
                                </p>
                            </div>

                            {/* Shipping address */}
                            <div>
                                <p className="tracking-widest uppercase text-gray-400 mb-3 font-semibold">
                                    Shipping Address
                                </p>
                                {order.shippingAddress?.line1 ? (
                                    <>
                                        <p>{order.shippingAddress.line1}</p>
                                        <p>
                                            {order.shippingAddress?.city}{" "}
                                            {order.shippingAddress?.postcode}
                                        </p>
                                        <p>{order.shippingAddress?.country}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-400">
                                        No address provided
                                    </p>
                                )}
                            </div>

                            {/* Order items */}
                            <div>
                                <p className="tracking-widest uppercase text-gray-400 mb-3 font-semibold">
                                    Items
                                </p>
                                <div className="flex flex-col gap-2">
                                    {order.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between"
                                        >
                                            <span>
                                                {item.name} × {item.quantity}{" "}
                                                <span className="text-gray-400">
                                                    ({item.size})
                                                </span>
                                            </span>
                                            <span className="text-gray-500">
                                                ₹
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
