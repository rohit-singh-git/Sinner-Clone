"use client";
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";

interface Props {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    soldOut: boolean;
    selectedSize: string | null;
}

export default function AddToCartButton({
    id,
    slug,
    name,
    price,
    image,
    soldOut,
    selectedSize,
}: Props) {
    const addItem = useCartStore((s) => s.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addItem({
            id,
            slug,
            name,
            price,
            image,
            size: selectedSize,
            quantity: 1,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    if (soldOut) {
        return (
            <button
                disabled
                className="w-full py-4 text-xs tracking-widest uppercase bg-gray-200 text-gray-400 cursor-not-allowed"
            >
                Sold Out
            </button>
        );
    }

    return (
        <button
            onClick={handleAdd}
            className={`btn-press w-full py-4 text-xs border tracking-widest uppercase transition-colors
        ${added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}
        >
            {added ? "Added ✓" : "Add to Cart"}
        </button>
    );
}
