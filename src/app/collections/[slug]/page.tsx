import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import CollectionHeader from "@/components/shop/CollectionHeader";
import ProductGrid from "@/components/shop/ProductGrid";

const collectionTitles: Record<string, string> = {
    store: "STORE",
    staple: "STAPLE",
    accessories: "ACCESSORIES",
};

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    if (!collectionTitles[slug]) notFound();

    await connectDB();
    const query = slug === "store" ? {} : { collection: slug };
    const products = (await Product.find(query).lean()) as any[];

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
                title={collectionTitles[slug]}
                count={serialized.length}
            />
            <ProductGrid products={serialized} columns={4} />
        </>
    );
}
