"use client";
import { useCartStore } from "@/store/CartStore";
import OrderSummary from "./OrderSummary";

export default function OrderSummaryWrapper() {
    const { items, total } = useCartStore();
    return <OrderSummary items={items} total={total()} />;
}
