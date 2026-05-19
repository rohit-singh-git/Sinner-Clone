"use client";

import Link from "next/link";

export default function Footer() {
    const payments = [
        "Amex",
        "Apple Pay",
        "Google Pay",
        "Mastercard",
        "PayPal",
        "Shop Pay",
        "Union Pay",
        "Visa",
    ];

    return (
        <footer className="bg-black text-white border-t border-zinc-800">
            <div className="max-w-400 mx-auto px-6 md:px-10 py-16">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-b border-zinc-800 pb-14">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-[0.25em] mb-5">
                            OFFICIAL SINNER
                        </h2>

                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            [ one who engages in actions considered sinful; a
                            sinner ]
                        </p>

                        <div className="space-y-2 text-sm text-zinc-300">
                            <a
                                href="https://www.instagram.com/sinnermngt/"
                                target="_blank"
                                className="block hover:text-white transition"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="uppercase text-xs tracking-[0.25em] mb-6 text-zinc-300">
                            Quick Links
                        </h3>

                        <div className="space-y-3 text-sm text-zinc-400">
                            <Link href="#">Contact</Link>
                            <br />
                            <Link href="#">Shipping Policy</Link>
                            <br />
                            <Link href="#">Refund Policy</Link>
                            <br />
                            <Link href="#">Privacy Policy</Link>
                            <br />
                            <Link href="#">Terms of Service</Link>
                            <br />
                            <Link href="#">
                                Gift Card & Store Credit Policy
                            </Link>
                        </div>
                    </div>

                    {/* Region + Payments */}
                    <div>
                        <h3 className="uppercase text-xs tracking-[0.25em] mb-4 text-zinc-300">
                            Country / Region
                        </h3>

                        <select
                            name="country"
                            id="count"
                            className="mb-5 bg-black text-white border rounded-md p-2"
                        >
                            <option value="Australia" defaultChecked>
                                Australia
                            </option>
                            <option value="Austria">Austria</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                        </select>

                        <h3 className="uppercase text-xs tracking-[0.25em] mb-4 text-zinc-300">
                            Payment Methods
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {payments.map((item) => (
                                <span
                                    key={item}
                                    className="border border-zinc-700 px-3 py-1 text-[11px] text-zinc-300 rounded"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 text-xs text-zinc-500">
                    <p>© 2026, Official Sinner</p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="#">Privacy policy</Link>
                        <Link href="#">Refund policy</Link>
                        <Link href="#">Terms of service</Link>
                        <Link href="#">Shipping policy</Link>
                        <Link href="#">Contact information</Link>
                    </div>

                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="hover:text-white transition"
                    >
                        Scroll to top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}
