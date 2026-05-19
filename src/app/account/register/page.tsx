"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password) {
            setError("All fields required");
            return;
        }
        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
            setLoading(false);
        } else {
            router.push("/account/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-xs tracking-widest uppercase font-semibold mb-8 text-center">
                    Create Account
                </h1>

                {error && (
                    <p className="text-xs text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border border-white px-4 py-3 text-sm outline-none w-full hover:border-gray-400 transition-all duration-300 ease-in-out"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        className="border border-white px-4 py-3 text-sm outline-none w-full hover:border-gray-400 transition-all duration-300 ease-in-out"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        className="border-white px-4 py-3 text-sm outline-none w-full border hover:border-gray-400 transition-all duration-300 ease-in-out"
                    />

                    <button
                        onClick={handleSubmit}
                        className="btn-press bg-black text-white py-3 text-xs tracking-widest uppercase border hover:border-gray-400 hover:bg-gray-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </div>

                <p className="text-sm text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/account/login"
                        className="text-white text-sm underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
