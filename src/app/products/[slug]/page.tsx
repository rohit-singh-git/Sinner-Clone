import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import ProductInfo from "@/components/shop/ProductInfo";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    await connectDB();
    const product = (await Product.findOne({ slug }).lean()) as any;
    if (!product) notFound();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-12 items-start">
                <ProductImageGallery
                    images={product.images}
                    name={product.name}
                />
                <ProductInfo
                    id={product._id.toString()}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice ?? null}
                    badge={product.badge ?? null}
                    description={product.description}
                    sizes={product.sizes}
                    soldOut={product.soldOut}
                    image={product.images[0]}
                />
            </div>
        </div>
    );
}
