import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields required" },
                { status: 400 },
            );
        }

        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 },
            );
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashed });

        return NextResponse.json(
            { message: "Account created", userId: user._id },
            { status: 201 },
        );
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
