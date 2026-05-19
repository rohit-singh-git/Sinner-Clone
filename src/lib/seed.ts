import { connectDB } from "./db";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { allProducts, productDetails } from "./mock-products";
import bcrypt from "bcryptjs";

async function seed() {
    await connectDB();

    // Products
    await Product.deleteMany({});
    const docs = allProducts.map((p) => ({
        ...p,
        ...productDetails[p.slug],
        collection: ["staple-hoodie", "staple-tee", "staple-bundle"].includes(
            p.slug,
        )
            ? "staple"
            : "accessories",
    }));
    await Product.insertMany(docs);
    console.log(`✅ Seeded ${docs.length} products`);

    // Admin user
    const existing = await User.findOne({ email: "admin@sinner.com" });
    if (!existing) {
        const hashed = await bcrypt.hash("admin123", 12);
        await User.create({
            name: "Admin",
            email: "admin@sinner.com",
            password: hashed,
            role: "admin",
        });
        console.log("✅ Admin user created → admin@sinner.com / admin123");
    }

    process.exit(0);
}

seed();
