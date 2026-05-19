import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: { type: String, select: false }, // never returned by default
        provider: { type: String, default: "credentials" },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true },
);

export const User = models.User || model("User", UserSchema);
