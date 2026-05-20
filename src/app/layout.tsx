import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthSessionProvider from "@/components/providers/SessionProviders";
import { CurrencyProvider } from "@/context/CurrencyContext";

export const metadata: Metadata = {
    title: "SINNER – OFFICIAL SINNER",
    description: "Explore our curated collection. ARE YOU A SINNER?",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-black">
            <body
                className={`${GeistSans.className} bg-white text-black antialiased`}
            >
                <AuthSessionProvider>
                    <CurrencyProvider>
                        <AnnouncementBar />
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </CurrencyProvider>
                </AuthSessionProvider>
            </body>
        </html>
    );
}
