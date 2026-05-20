"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    soldOut: boolean;
    badge: string | null;
}

export default function AdminProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products ?? []);
        setLoading(false);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this product?")) return;
        await fetch(`/api/products/${slug}`, { method: "DELETE" });
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading)
        return (
            <div className="border border-gray-200">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-5 px-4 py-3 border-b items-center gap-4"
                        >
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
                                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
                            </div>
                            <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                            <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />
                            <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
                        </div>
                    ))}
            </div>
        );

    return (
        <div className="border border-gray-200">
            <div className="grid grid-cols-5 px-4 py-3 border-b bg-gray-50 text-xs tracking-widest uppercase font-semibold text-gray-800">
                <span className="col-span-2">Product</span>
                <span>Price</span>
                <span>Status</span>
                <span>Actions</span>
            </div>

            {products.map((product) => (
                <div
                    key={product._id}
                    className="grid grid-cols-5 px-4 py-3 border-b items-center text-xs hover:bg-gray-800 font-semibold"
                >
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="relative w-10 h-10 bg-black shrink-0">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                            />
                        </div>
                        <span className="tracking-widest uppercase text-xs md:text-lg ">
                            {product.name}
                        </span>
                    </div>
                    <span>₹{product.price.toFixed(2)}</span>
                    <span>
                        <span
                            className={`px-2 py-1 text-[10px] tracking-widest uppercase rounded
                            ${product.soldOut ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                        >
                            {product.soldOut ? "Sold Out" : "Active"}
                        </span>
                    </span>
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/products/${product.slug}/edit`}
                            className="underline underline-offset-2 text-gray-400 hover:text-black"
                        >
                            Edit
                        </Link>
                        <button
                            className="underline underline-offset-2 text-red-400 hover:text-red-600 cursor-pointer"
                            onClick={() => handleDelete(product.slug)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
