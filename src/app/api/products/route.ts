import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { auth } from "@/lib/auth";

// GET /api/products — public
export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get("collection");
    const search = searchParams.get("search");

    const query: any = {};
    if (collection) query.collection = collection;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query).limit(10).lean();

    return NextResponse.json({ products });
}

// POST /api/products — admin only
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
}
