import AdminOrderTable from "@/components/admin/AdminOrderTable";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export default async function AdminOrdersPage() {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    const serialized = orders.map((o: any) => ({
        id: o._id.toString(),
        customer: o.customer.name ?? "Guest",
        email: o.customer.email,
        total: o.total,
        status: o.status,
        date: new Date(o.createdAt).toISOString().split("T")[0],
        items: o.items,
    }));

    return (
        <div>
            <h1 className="text-md tracking-widest uppercase font-semibold mb-8">
                Orders
            </h1>
            <AdminOrderTable orders={serialized} />
        </div>
    );
}
