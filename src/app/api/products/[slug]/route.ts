import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { auth } from "@/lib/auth";

// GET /api/products/:slug — public
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    await connectDB();
    const { slug } = await params;
    const product = await Product.findOne({ slug }).lean();
    if (!product)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
}

// PATCH /api/products/:slug — admin only
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    const body = await req.json();
    const product = await Product.findOneAndUpdate({ slug }, body, {
        new: true,
    });
    return NextResponse.json({ product });
}

// DELETE /api/products/:slug — admin only
export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    await Product.findOneAndDelete({ slug });
    return NextResponse.json({ message: "Deleted" });
}
