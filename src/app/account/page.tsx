import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export default async function AccountPage() {
    const session = await auth();
    if (!session) redirect("/account/login");

    await connectDB();
    const orders = (await Order.find({ "customer.email": session?.user?.email })
        .sort({ createdAt: -1 })
        .lean()) as any[];

    return (
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-16 mt-20">
            <h1 className="text-4xl tracking-widest uppercase font-semibold mb-8">
                My Account
            </h1>

            <div className="border border-gray-100 p-6 mb-6">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
                    Account Details
                </p>
                <p className="text-sm font-medium">{session.user?.name}</p>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>

            <div className="border border-gray-100 p-6 mb-6">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">
                    Order History
                </p>

                {orders.length === 0 ? (
                    <p className="text-sm text-gray-400">No orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id.toString()}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                {/* Header */}
                                <div className="bg-gray-500/30 px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400">
                                            Order ID
                                        </p>
                                        <p className="text-sm font-medium">
                                            #
                                            {order._id
                                                .toString()
                                                .slice(-8)
                                                .toUpperCase()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400">
                                            Order Date
                                        </p>
                                        <p className="text-sm">
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400">
                                            Payment
                                        </p>
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                order.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.status || "Pending"}
                                        </span>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="p-5">
                                    <div className="space-y-4">
                                        {order.items?.map(
                                            (item: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center border-b last:border-none pb-3"
                                                >
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm font-medium">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row sm:justify-between gap-3">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest text-gray-400">
                                                Order Status
                                            </p>
                                            <p className="text-sm capitalize">
                                                {order.status}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[11px] uppercase tracking-widest text-gray-400">
                                                Total
                                            </p>
                                            <p className="text-lg font-semibold">
                                                ${order.total.toFixed(2)} AUD
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                }}
            >
                <button
                    type="submit"
                    className="btn-press text-xs tracking-widest uppercase underline underline-offset-4 hover:text-red-500 cursor-pointer"
                >
                    Sign Out
                </button>
            </form>
        </div>
    );
}
