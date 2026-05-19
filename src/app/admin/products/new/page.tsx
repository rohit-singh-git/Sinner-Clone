"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

export default function NewProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        slug: "",
        price: "",
        description: "",
        sizes: "",
        collection: "",
    });
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!form.name || !form.slug || !form.price || !images.length) {
            setError("Name, slug, price and at least one image required");
            return;
        }
        setLoading(true);

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                price: parseFloat(form.price),
                sizes: form.sizes.split(",").map((s) => s.trim()),
                images,
            }),
        });

        if (res.ok) router.push("/admin/products");
        else {
            setError("Failed to save product");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl">
            <h1 className="text-md tracking-widest uppercase font-semibold mb-8">
                Add Product
            </h1>
            {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

            <div className="flex flex-col gap-4">
                <input
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
                <input
                    placeholder="Slug (e.g. staple-hoodie)"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
                <input
                    placeholder="Price (AUD)"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                    }
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    rows={4}
                    className="border border-white px-4 py-3 text-sm outline-none resize-none"
                />
                <input
                    placeholder="Sizes (XS, S, M, L, XL)"
                    value={form.sizes}
                    onChange={(e) =>
                        setForm({ ...form, sizes: e.target.value })
                    }
                    className="border border-white px-4 py-3 text-sm outline-none"
                />
                <select
                    value={form.collection}
                    onChange={(e) =>
                        setForm({ ...form, collection: e.target.value })
                    }
                    className="border border-white px-4 py-3 text-sm outline-none"
                >
                    <option value="">Select Collection</option>
                    <option value="staple">Staple</option>
                    <option value="accessories">Accessories</option>
                    <option value="store">Store</option>
                </select>

                <ImageUploader images={images} onChange={setImages} />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-press bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </div>
    );
}
