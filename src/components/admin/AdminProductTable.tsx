"use client";
import Image from "next/image";
import { allProducts } from "@/lib/mock-products";
import Link from "next/link";

export default function AdminProductTable() {
    return (
        <div className="border border-gray-200">
            <div className="grid grid-cols-5 px-4 py-3 border-b bg-gray-50 text-xs tracking-widest uppercase font-semibold text-gray-800">
                <span className="col-span-2">Product</span>
                <span>Price</span>
                <span>Status</span>
                <span>Actions</span>
            </div>

            {allProducts.map((product) => (
                <div
                    key={product.id}
                    className="grid grid-cols-5 px-4 py-3 border-b items-center text-xs hover:bg-gray-50 hover:text-black font-semibold"
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
                        <span className="tracking-widest uppercase font-medium">
                            {product.name}
                        </span>
                    </div>
                    <span>${product.price.toFixed(2)}</span>
                    <span>
                        <span
                            className={`px-2 py-1 text-[10px] tracking-widest uppercase rounded
              ${product.badge === "Sold out" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                        >
                            {product.badge === "Sold out"
                                ? "Sold Out"
                                : "Active"}
                        </span>
                    </span>
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/products/${product.slug}/edit`}
                            className="underline underline-offset-2 text-gray-400 hover:text-black"
                        >
                            Edit
                        </Link>
                        <button className="underline underline-offset-2 text-red-400 hover:text-red-600 hover:cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
