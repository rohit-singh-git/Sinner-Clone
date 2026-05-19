import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import CollectionHeader from "@/components/shop/CollectionHeader";
import ProductGrid from "@/components/shop/ProductGrid";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    await connectDB();

    const products = (await Product.find({
        name: { $regex: q, $options: "i" },
    }).lean()) as any[];

    const serialized = products.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        badge: p.badge ?? null,
        slug: p.slug,
        images: p.images,
    }));

    return (
        <>
            <CollectionHeader
                title={`Search: "${q}"`}
                count={serialized.length}
            />
            {serialized.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-20">
                    No products found.
                </p>
            ) : (
                <ProductGrid products={serialized} columns={4} />
            )}
        </>
    );
}
