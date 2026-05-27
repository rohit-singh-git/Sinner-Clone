"use client";
import { useState } from "react";
import SizeSelector from "./SizeSelector";
import AddToCartButton from "./AddToCartButton";

interface Props {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice: number | null;
    badge: string | null;
    description: string;
    sizes: string[];
    soldOut: boolean;
    image: string;
}

export default function ProductInfo({
    id,
    slug,
    name,
    price,
    originalPrice,
    badge,
    description,
    sizes,
    soldOut,
    image,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);


    return (
        <div className="flex flex-col gap-6 md:mt-15 lg:mt-25">
            <div>
                {badge && (
                    <span className="text-[10px] bg-black text-white px-2 py-1 tracking-widest uppercase mb-2 inline-block">
                        {badge}
                    </span>
                )}
                <h1 className="text-2xl tracking-widest uppercase font-extrabold mb-2">
                    {name}
                </h1>
                <div className="flex items-center gap-3 text-lg font-semibold">
                    <span>₹{price.toFixed(2)} INR</span>
                    {originalPrice && (
                        <span className="line-through text-gray-400">
                            ₹{originalPrice.toFixed(2)} INR
                        </span>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
                {description}
            </p>

            <SizeSelector
                sizes={sizes}
                soldOut={soldOut}
                selected={selectedSize}
                onSelect={setSelectedSize}
            />

            <AddToCartButton
                id={id}
                slug={slug}
                name={name}
                price={price}
                image={image}
                soldOut={soldOut}
                selectedSize={selectedSize}
            />

            <p className="text-xs text-gray-400 text-center tracking-wide">
                Free shipping on orders over ₹150 INR
            </p>
        </div>
    );
}
