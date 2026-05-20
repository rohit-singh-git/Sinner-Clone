"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

// const trending = ["Tees", "Sweats", "Shorts", "Headwear"];

export default function SearchOverlay({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const res = await fetch(`/api/products?search=${query}`);
            const data = await res.json();
            setResults(data.products ?? []);
            setLoading(false);
        }, 400); // debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = () => {
        if (!query.trim()) return;
        onClose();
        setQuery("");
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    if (!open) return null;

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 left-0 w-full mt-25 bg-black z-50 transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold uppercase text-white">
                        Search
                    </h2>

                    <button
                        onClick={() => {
                            onClose();
                            setQuery("");
                        }}
                        className="hover:text-red-500"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-6 border-b">
                    <div className="flex items-center border-b border-gray-600 pb-2 gap-2">
                        <Search size={16} className="text-gray-400 shrink-0" />
                        <input
                            autoFocus={open}
                            type="text"
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full bg-transparent outline-none text-white tracking-wide"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {loading && (
                            <p className="text-xs text-gray-400 tracking-widest uppercase">
                                Searching...
                            </p>
                        )}

                        {!loading && query && results.length === 0 && (
                            <p className="text-xs text-gray-400 tracking-widest uppercase">
                                No products found for {query}
                            </p>
                        )}

                        {!loading && results.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">
                                    {results.length} result
                                    {results.length !== 1 ? "s" : ""}
                                </p>
                                <div className="flex flex-col divide-y divide-gray-500">
                                    {results.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={`/products/${product.slug}`}
                                            onClick={() => {
                                                onClose();
                                                setQuery("");
                                            }}
                                            className="flex items-center gap-4 py-3 px-3 hover:bg-gray-800/30 transition-colors"
                                        >
                                            <div className="relative w-14 h-14 shrink-0">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs tracking-widest uppercase font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    ${product.price.toFixed(2)}{" "}
                                                    AUD
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* View all results */}
                                <button
                                    onClick={handleSearch}
                                    className="mt-4 w-full border py-3 text-xs tracking-widest uppercase text-gray-400 hover:bg-black hover:text-white transition-colors"
                                >
                                    View All Results ({results.length})
                                </button>
                            </div>
                        )}

                        {/* Trending — only when no query */}
                        {!query && (
                            <div>
                                <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
                                    Trending
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Tee",
                                        "Sweats",
                                        "Shorts",
                                        "Headwear",
                                    ].map((t) => (
                                        <span
                                            key={t}
                                            onClick={() => setQuery(t)}
                                            className="border text-xs px-3 py-1 cursor-pointer hover:bg-black hover:text-white transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
