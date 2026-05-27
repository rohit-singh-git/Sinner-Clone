import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthSessionProvider from "@/components/providers/SessionProviders";

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
        <html lang="en" className="bg-black no-scrollbar overflow-auto">
            <body
                className={`${GeistSans.className} bg-white text-black antialiased`}
            >
                <AuthSessionProvider>
                    <AnnouncementBar />
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </AuthSessionProvider>
            </body>
        </html>
    );
}
