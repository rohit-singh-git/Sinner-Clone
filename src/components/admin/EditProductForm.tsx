"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

interface Props {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        description: string;
        sizes: string[];
        collection: string;
        images: string[];
        soldOut: boolean;
    };
}

export default function EditProductForm({ product }: Props) {
    const router = useRouter();
    const [form, setForm] = useState({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        sizes: product.sizes.join(", "),
        collection: product.collection,
        soldOut: product.soldOut,
    });
    const [images, setImages] = useState<string[]>(product.images);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await fetch(`/api/products/${product.slug}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                price: parseFloat(form.price),
                sizes: form.sizes.split(",").map((s) => s.trim()),
                images,
            }),
        });
        router.push("/admin/products");
    };

    const handleDelete = async () => {
        if (!confirm("Delete this product?")) return;
        await fetch(`/api/products/${product.slug}`, { method: "DELETE" });
        router.push("/admin/products");
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border px-4 py-3 text-sm outline-none"
            />
            <input
                placeholder="Price (AUD)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border px-4 py-3 text-sm outline-none"
            />
            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="border px-4 py-3 text-sm outline-none resize-none"
            />
            <input
                placeholder="Sizes"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                className="border px-4 py-3 text-sm outline-none"
            />
            <select
                value={form.collection}
                onChange={(e) =>
                    setForm({ ...form, collection: e.target.value })
                }
                className="border px-4 py-3 text-sm outline-none"
            >
                <option value="staple" className="bg-black">
                    Staple
                </option>
                <option value="accessories" className="bg-black">
                    Accessories
                </option>
                <option value="store" className="bg-black">
                    Store
                </option>
            </select>

            <label className="flex items-center gap-2 text-xs tracking-widest uppercase">
                <input
                    type="checkbox"
                    checked={form.soldOut}
                    onChange={(e) =>
                        setForm({ ...form, soldOut: e.target.checked })
                    }
                />
                Sold Out
            </label>

            <ImageUploader images={images} onChange={setImages} />

            <div className="flex gap-4">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn-press flex-1 bg-black border text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                    onClick={handleDelete}
                    className="btn-press flex-1 border border-red-500 text-red-500 py-3 text-xs tracking-widest uppercase hover:bg-red-500 hover:text-white hover:border-white transition-colors"
                >
                    Delete Product
                </button>
            </div>
        </div>
    );
}
