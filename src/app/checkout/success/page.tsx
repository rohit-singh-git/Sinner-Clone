import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
                Order Confirmed
            </p>
            <h1 className="text-3xl font-semibold tracking-widest uppercase mb-4">
                Thank You
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                Your order has been placed. You&apos;ll receive a confirmation email
                shortly.
            </p>
            <Link
                href="/"
                className="bg-black text-white border text-xs tracking-widest uppercase px-8 py-4"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
