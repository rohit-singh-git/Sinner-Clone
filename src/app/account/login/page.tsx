"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (res?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            router.push("/account");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-lg tracking-widest uppercase font-semibold mb-8 text-center">
                    Login
                </h1>

                {error && (
                    <p className="text-xs text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border bg-black border-white px-4 py-3 text-sm transition-all duration-300 ease-in-out outline-none w-full hover:border-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-white bg-black px-4 py-3 text-sm transition-all duration-300 ease-in-out outline-none w-full hover:border-gray-400"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-press bg-black text-white py-3 text-xs transition-all duration-300 ease-in-out tracking-widest uppercase border hover:border-gray-400 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <button
                        onClick={() =>
                            signIn("google", { callbackUrl: "/account" })
                        }
                        className="btn-press border border-white py-3 text-xs transition-all duration-300 ease-in-out tracking-widest uppercase hover:bg-gray-800 hover:text-white hover:border-gray-400"
                    >
                        Continue with Google
                    </button>
                </div>

                <p className="text-sm text-center text-gray-400 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/account/register"
                        className="text-white underline text-sm"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
