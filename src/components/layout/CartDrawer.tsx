"use client";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-100 bg-black z-50 shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-sm font-semibold tracking-widest uppercase">
                        Your Cart
                    </h2>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center h-[60%] text-center px-6">
                    <p className="text-sm text-gray-500 mb-4">
                        Your cart is empty
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-black text-white text-xs tracking-widest uppercase px-6 py-3"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </>
    );
}
