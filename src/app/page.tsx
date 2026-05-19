import HeroVideo from "@/components/home/HeroVideo";
import ProductGrid from "@/components/shop/ProductGrid";
import CategoryStrip from "@/components/home/CategoryStrip";
import PromoVideos from "@/components/home/PromoVideos";
import InstagramSection from "@/components/home/InstagramSection";
// import { stapleProducts, accessoryProducts } from "@/lib/mock-products";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export default async function HomePage() {
    await connectDB();

    const staple = (await Product.find({
        collection: "staple",
    }).lean()) as any[];
    const accessories = (await Product.find({
        collection: "accessories",
    }).lean()) as any[];

    const serialize = (products: any[]) =>
        products.map((p) => ({
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
            <HeroVideo />
            <ProductGrid products={serialize(staple)} columns={3} />
            <ProductGrid
                title="ACCESSORIES"
                products={serialize(accessories)}
                columns={4}
            />
            <CategoryStrip />
            <PromoVideos />
            <InstagramSection />
        </>
    );
}
