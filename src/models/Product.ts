import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number, default: null },
        images: [{ type: String, required: true }],
        sizes: [{ type: String }],
        badge: { type: String, default: null },
        soldOut: { type: Boolean, default: false, index: true },
        collection: { type: String, index: true },
    },
    { timestamps: true },
);

export const Product = models.Product || model("Product", ProductSchema);
