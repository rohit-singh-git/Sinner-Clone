import AdminStatsCard from "@/components/admin/AdminStatsCard";
import AdminOrderTable from "@/components/admin/AdminOrderTable";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function AdminDashboard() {
    await connectDB();

    const [totalProducts, totalOrders, recentOrders] = await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        Order.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const totalRevenue = recentOrders.reduce(
        (sum: number, o: any) => sum + o.total,
        0,
    );

    const pendingOrders = await Order.countDocuments({ status: "pending" });

    const serialized = recentOrders.map((o: any) => ({
        id: o._id.toString(),
        customer: o.customer?.name ?? "Guest",
        email: o.customer?.email ?? "",
        total: o.total,
        status: o.status,
        date: new Date(o.createdAt).toISOString().split("T")[0],
        items: o.items ?? [],
        shippingAddress: o.shippingAddress ?? null, // ← add this
    }));

    return (
        <div>
            <h1 className="text-lg lg:text-2xl tracking-widest uppercase font-semibold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <AdminStatsCard
                    label="Total Revenue"
                    value={`₹${totalRevenue.toFixed(2)}`}
                    sub="INR"
                />
                <AdminStatsCard label="Total Orders" value={totalOrders} />
                <AdminStatsCard label="Products" value={totalProducts} />
                <AdminStatsCard label="Pending Orders" value={pendingOrders} />
            </div>

            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
                Recent Orders
            </h2>
            <AdminOrderTable orders={serialized} />
        </div>
    );
}
