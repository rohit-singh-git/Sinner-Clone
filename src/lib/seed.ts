import { connectDB } from "./db";
import { Product } from "../models/Product";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import "dotenv/config";

const products = [
    {
        name: "STAPLE HOODIE",
        slug: "staple-hoodie",
        description:
            "Premium heavyweight hoodie. Crafted for those who live outside the lines.",
        price: 130,
        originalPrice: null,
        badge: null,
        soldOut: false,
        collection: "staple",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/A7405300-Edit.jpg?crop=center&height=2048&v=1775139073&width=2048",
            "https://www.officialsinner.com/cdn/shop/files/A7405291-Edit.jpg?crop=center&height=2048&v=1775139073&width=2048",
        ],
    },
    {
        name: "STAPLE TEE",
        slug: "staple-tee",
        description: "Signature quality tee. Oversized fit, 100% cotton.",
        price: 60,
        originalPrice: null,
        badge: null,
        soldOut: false,
        collection: "staple",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/4apr-17.jpg?crop=center&height=2048&v=1775890757&width=2048",
            "https://www.officialsinner.com/cdn/shop/files/4apr-22.jpg?crop=center&height=2048&v=1775890757&width=2048",
        ],
    },
    {
        name: "STAPLE BUNDLE",
        slug: "staple-bundle",
        description:
            "Get the Staple Hoodie + Staple Tee. Save 5% when bought together.",
        price: 180.5,
        originalPrice: 190,
        badge: "Save 5%",
        soldOut: false,
        collection: "staple",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/combined_square_both_products_1.png?crop=center&height=2048&v=1775891498&width=2048",
        ],
    },
    {
        name: "GOTHIC SINNER STICKER",
        slug: "chrome-sticker",
        description: "Gothic Sinner chrome sticker. Stick it anywhere.",
        price: 15,
        originalPrice: null,
        badge: null,
        soldOut: false,
        collection: "accessories",
        sizes: ["Standard", "Large"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/Chrome-Sticker-3.jpg?crop=center&height=2000&v=1751622410&width=2000",
            "https://www.officialsinner.com/cdn/shop/files/DSC04803.jpg?crop=center&height=2048&v=1751622410&width=2048",
        ],
    },
    {
        name: '"DEFY THE NORM" JET TAG',
        slug: "defy-the-norm-jet-tag",
        description: '"Defy The Norm" jet tag. Limited run.',
        price: 15,
        originalPrice: null,
        badge: null,
        soldOut: true,
        collection: "accessories",
        sizes: ["One Size"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/3_c824fd0f-d8e7-49ac-9916-4ef07d22b8e0.jpg?crop=center&height=2000&v=1729791021&width=2000",
            "https://www.officialsinner.com/cdn/shop/files/4_43e9adb9-ae8a-4e3d-80ab-1368981214ce.jpg?v=1729791020&width=540",
        ],
    },
    {
        name: "BRAKE RESERVOIR SOCK",
        slug: "brake-resevoir-sock",
        description: "Brake reservoir sock. Functional meets aesthetic.",
        price: 20,
        originalPrice: null,
        badge: null,
        soldOut: true,
        collection: "accessories",
        sizes: ["One Size"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/1_a6566272-9a81-40ba-a5cd-fefbe7af061b.jpg?crop=center&height=2000&v=1729161817&width=2000",
            "https://www.officialsinner.com/cdn/shop/files/2_406d12a8-c2c5-4643-90bb-c6a8320b9384.jpg?v=1729161817&width=540",
        ],
    },
    {
        name: 'CHROME "WINTER" BALACLAVA',
        slug: "chrome-winter-balaclava",
        description: "Chrome winter balaclava. Full face coverage.",
        price: 40,
        originalPrice: null,
        badge: null,
        soldOut: true,
        collection: "accessories",
        sizes: ["One Size"],
        images: [
            "https://www.officialsinner.com/cdn/shop/files/Bally.jpg?crop=center&height=2000&v=1737011981&width=2000",
            "https://www.officialsinner.com/cdn/shop/files/Bally2.jpg?v=1737011981&width=540",
        ],
    },
];

async function seed() {
    await connectDB();

    // Products
    for (const p of products) {
        await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true });
    }
    
    console.log(`✅ Seeded ${products.length} products`);

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
    } else {
        console.log("ℹ️  Admin user already exists");
    }

    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
