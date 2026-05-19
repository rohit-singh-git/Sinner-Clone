import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("Webhook body received:", JSON.stringify(body));

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        items,
        customer,
        address,
        total,
    } = body;

    console.log("order_id:", razorpay_order_id);
    console.log("payment_id:", razorpay_payment_id);
    console.log("signature received:", razorpay_signature);

    // Verify signature
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 },
        );
    }

    // Save order to DB
    await connectDB();
    await Order.create({
        paymentOrderId: razorpay_order_id,
        customer: { name: customer.name, email: customer.email },
        items,
        total,
        status: "paid",
        shippingAddress: address,
    });

    return NextResponse.json({ success: true });
}
