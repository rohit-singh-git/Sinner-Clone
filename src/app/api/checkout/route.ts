import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json();
        console.log("Items received:", items);

        const total = items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + item.price * item.quantity,
            0,
        );
        console.log("Total:", total);

        const amountInPaise = Math.round(total * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${crypto.randomBytes(8).toString("hex")}`,
        });

        console.log("Razorpay order:", order);

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error("Checkout error:", err);
        return NextResponse.json(
            { error: "Checkout failed", detail: String(err) },
            { status: 500 },
        );
    }
}
