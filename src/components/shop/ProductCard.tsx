"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    badge: string | null;
    slug: string;
    images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/products/${product.slug}`} className="group block mb-5">
            <div
                className="relative aspect-square overflow-hidden bg-black text-black"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-2 left-2 z-20 bg-black text-white text-[10px] px-2 py-1 tracking-widest uppercase">
                        {product.badge}
                    </span>
                )}

                {/* First image */}
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`
            object-cover absolute inset-0
            transition-all duration-500 ease-in-out
            ${hovered ? "opacity-0 scale-100" : "opacity-100 scale-100"}
          `}
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Hover image */}
                {product.images[1] && (
                    <Image
                        src={product.images[1]}
                        alt={`${product.name} hover`}
                        fill
                        className={`
              object-cover absolute inset-0
              transition-all duration-700 ease-in-out
              ${hovered ? "opacity-100 scale-110" : "opacity-0 scale-100"}
            `}
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                )}

                {/* Quick view */}
                <div className="absolute m-5 -bottom-5 left-0 right-0 bg-white/90 py-2 text-center text-lg tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                </div>
            </div>

            <div className="mt-3 space-y-1">
                <p className="text-lg tracking-widest uppercase font-medium">
                    {product.name}
                </p>

                <div className="flex items-center gap-2 text-xl font-bold">
                    <span>₹{product.price.toFixed(2)} INR</span>
                    {product.originalPrice && (
                        <span className="line-through text-gray-400">
                            ₹{product.originalPrice.toFixed(2)} INR
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
