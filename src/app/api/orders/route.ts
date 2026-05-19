import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { auth } from "@/lib/auth";

// GET /api/orders — admin gets all, user gets own
export async function GET() {
    const session = await auth();
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const isAdmin = (session.user as { role?: string }).role === "admin";
    const query = isAdmin ? {} : { "customer.email": session.user.email };

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
}
