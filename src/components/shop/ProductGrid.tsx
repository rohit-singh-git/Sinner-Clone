import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    badge: string | null;
    slug: string;
    images: string[];
}

interface Props {
    title?: string;
    products: Product[];
    columns?: 3 | 4;
}

export default function ProductGrid({ title, products, columns = 3 }: Props) {
    return (
        <section className="mx-5 px-4 mt-15 mb-15">
            {title && (
                <h2 className="text-4xl tracking-widest uppercase font-bold mb-8">
                    {title}
                </h2>
            )}
            <div
                className={`grid gap-4 ${columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}
            >
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
