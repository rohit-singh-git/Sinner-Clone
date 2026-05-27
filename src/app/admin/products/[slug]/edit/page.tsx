import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    await connectDB();
    const product = (await Product.findOne({ slug }).lean()) as any;
    if (!product) notFound();

    return (
        <div className="max-w-xl">
            <h1 className="text-xs tracking-widest uppercase font-semibold mb-8">
                Edit Product
            </h1>
            <EditProductForm
                product={{
                    id: product._id.toString(),
                    name: product.name,
                    slug: product.slug,
                    description: product.description ?? "",
                    price: product.price,
                    originalPrice: product.originalPrice ?? null,
                    badge: product.badge ?? null,
                    sizes: product.sizes ?? [],
                    images: product.images ?? [],
                    collection: product.collection ?? "",
                    soldOut: product.soldOut ?? false,
                }}
            />
        </div>
    );
}
