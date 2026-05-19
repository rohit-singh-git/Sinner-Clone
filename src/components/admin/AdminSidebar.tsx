"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";

const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
    const path = usePathname();

    return (
        <aside className="md:w-56 min-h-screen bg-black text-white flex flex-col">
            <div className="p-6 border-b border-white/10">
                <p className="text-lg lg:text-xl tracking-widest uppercase font-semibold">
                    Sinner Admin
                </p>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-1">
                {links.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest uppercase transition-colors
              ${path === href ? "bg-white text-black" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                    >
                        <Icon size={14} />
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest uppercase text-white/60 hover:text-white"
                >
                    <LogOut size={14} />
                    Back to Store
                </Link>
            </div>
        </aside>
    );
}
