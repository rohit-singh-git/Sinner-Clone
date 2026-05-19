import { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema({
    productId: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
    image: { type: String },
});

const OrderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true,
        },
        paymentOrderId: { type: String, required: true, unique: true },
        customer: {
            name: { type: String },
            email: { type: String, required: true, index: true },
        },
        items: [OrderItemSchema],
        total: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "cancelled"],
            default: "pending",
            index: true,
        },
        shippingAddress: {
            line1: String,
            city: String,
            postcode: String,
            country: String,
        },
    },
    { timestamps: true },
);

export const Order = models.Order || model("Order", OrderSchema);
