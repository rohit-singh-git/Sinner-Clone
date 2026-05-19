import Link from "next/link";
import AdminProductTable from "@/components/admin/AdminProductTable";

export default function AdminProductsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-lg lg:text-2xl tracking-widest uppercase font-semibold">
                    Products
                </h1>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-sm lg:text-xl text-white tracking-widest uppercase px-4 py-2"
                >
                    + Add Product
                </Link>
            </div>
            <AdminProductTable />
        </div>
    );
}
