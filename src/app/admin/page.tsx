import AdminStatsCard from "@/components/admin/AdminStatsCard";
import AdminOrderTable from "@/components/admin/AdminOrderTable";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function AdminDashboard() {
    await connectDB();

    const [totalProducts, totalOrders, orders] = await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        Order.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const totalRevenue = orders.reduce(
        (sum: number, o: any) => sum + o.total,
        0,
    );
    const pendingOrders = orders.filter(
        (o: any) => o.status === "pending",
    ).length;

    return (
        <div>
            <h1 className="text-xs tracking-widest uppercase font-semibold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <AdminStatsCard
                    label="Total Revenue"
                    value={`$${totalRevenue}`}
                    sub="AUD"
                />
                <AdminStatsCard
                    label="Total Orders"
                    value={totalOrders}
                />
                <AdminStatsCard
                    label="Products"
                    value={totalProducts}
                />
                <AdminStatsCard
                    label="Pending Orders"
                    value={pendingOrders}
                />
            </div>

            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
                Recent Orders
            </h2>
            <AdminOrderTable orders={orders} />
        </div>
    );
}
