"use client";
import { useState } from "react";

interface Order {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: string;
    date: string;
    items: { name: string; quantity: number; size: string }[];
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
            <div className="grid grid-cols-5 px-4 py-3 border-b bg-gray-50 text-xs tracking-widest uppercase font-semibold text-gray-800">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Total</span>
                <span>Status</span>
                <span>Date</span>
            </div>

            {orders.map((order) => (
                <div key={order.id}>
                    <button
                        onClick={() =>
                            setExpanded(expanded === order.id ? null : order.id)
                        }
                        className="w-full grid grid-cols-5 px-4 py-4 border-b text-xs hover:bg-gray-50 text-left"
                    >
                        <span className="font-medium">{order.id}</span>
                        <span>{order.customer}</span>
                        <span>${order.total.toFixed(2)} AUD</span>
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
                        <div className="px-6 py-4 bg-gray-400 border-b text-xs space-y-1">
                            <p className="text-gray-800 mb-2">{order.email}</p>
                            {order.items.map((item, i) => (
                                <p key={i}>
                                    {item.name} — Size: {item.size} ×{" "}
                                    {item.quantity}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
