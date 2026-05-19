import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) throw new Error("DATABASE_URL is not defined");

// Cached connection for Next.js hot reload
const cached = global as typeof global & {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
};

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.mongoose!.conn) return cached.mongoose!.conn;

    if (!cached.mongoose!.promise) {
        cached.mongoose!.promise = mongoose.connect(MONGODB_URI);
    }

    cached.mongoose!.conn = await cached.mongoose!.promise;
    return cached.mongoose!.conn;
}
