"use client";
import { useCartStore } from "@/store/CartStore";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User} from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { Squash as Hamburger } from "hamburger-react";

export default function NavbarClient() {
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const count = useCartStore((s) => s.count());

    const [showNav, setShowNav] = useState(true);
    const [isTop, setIsTop] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 10) {
                setIsTop(true);
                setShowNav(true);
            } else {
                setIsTop(false);
                if (currentScrollY > lastScrollY.current) setShowNav(false);
                else if (currentScrollY < lastScrollY.current) setShowNav(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav
                className={`
                    fixed top-0 left-0 w-full z-50
                    transition-all duration-300 ease-in-out
                    ${showNav ? "translate-y-0" : "-translate-y-full"}
                    ${
                        isTop
                            ? "bg-transparent border-b border-b-gray-400/50 hover:bg-black hover:border-b-transparent"
                            : "bg-black shadow-md border-b border-b-transparent"
                    }
                `}
            >
                <div className="max-w-full mx-auto pt-8 md:pt-7 px-6 md:px-10 flex items-center justify-between h-21 md:h-24 font-bold text-white">
                    {/*Hamburger - mobile only*/}
                    <div className="flex md:hidden z-10">
                        <Hamburger
                            toggled={mobileMenuOpen}
                            toggle={setMobileMenuOpen}
                            size={22}
                            color="white"
                        />
                    </div>

                    {/* Left nav links — desktop only */}
                    <div className="hidden md:flex items-center -mx-5 gap-1 md:gap-3 lg:gap-6 tracking-widest uppercase text-sm z-10">
                        <Link
                            href="/collections/store"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Store
                        </Link>
                        <Link
                            href="/collections/staple"
                            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                        >
                            Staple
                            <span className="bg-white text-black px-1.5 py-0.5 text-[10px] tracking-normal font-black uppercase">
                                New
                            </span>
                        </Link>
                        <Link
                            href="/pages/contact"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Help
                        </Link>
                    </div>

                    {/* Centered Logo */}
                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl lg:text-4xl font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                    >
                        Official Sinner
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-5 z-10">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hover:text-gray-300 transition-colors cursor-pointer"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        <Link
                            href="/account"
                            className="hover:text-gray-300 transition-colors"
                            aria-label="Account"
                        >
                            <User size={20} />
                        </Link>

                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative hover:text-gray-300 transition-colors cursor-pointer"
                            aria-label="Open Cart"
                        >
                            <ShoppingBag size={20} />
                            <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                                {count}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black z-40 flex flex-col pt-20 px-8 md:hidden">
                    <nav className="flex flex-col gap-6 mt-8">
                        <Link
                            href="/collections/store"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white text-lg tracking-widest uppercase font-semibold border-b border-white/10 pb-6"
                        >
                            Store
                        </Link>
                        <Link
                            href="/collections/staple"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white text-lg tracking-widest uppercase font-semibold border-b border-white/10 pb-6 flex items-center gap-3"
                        >
                            Staple
                            <span className="bg-white text-black px-1.5 py-0.5 text-[10px] tracking-normal font-black uppercase">
                                New
                            </span>
                        </Link>
                        <Link
                            href="/pages/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white text-lg tracking-widest uppercase font-semibold border-b border-white/10 pb-6"
                        >
                            Help
                        </Link>
                        <Link
                            href="/account"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white text-lg tracking-widest uppercase font-semibold border-b border-white/10 pb-6"
                        >
                            Account
                        </Link>
                    </nav>
                </div>
            )}

            {/* Overlays/Drawers */}
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <SearchOverlay
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
}
