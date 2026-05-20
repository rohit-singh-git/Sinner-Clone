import Image from "next/image";

export default function Loading() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-6">
                {/* Logo / Brand */}
                <Image
                    src={
                        "https://www.officialsinner.com/cdn/shop/files/cat-icon.png?crop=center&height=4119&v=1755773412&width=3800"
                    }
                    width={60}
                    height={60}
                    alt="Sinner Logo"
                    className="glitchImg"
                />
                <h1 className="text-lg md:text-2xl font-bold tracking-[0.3em]">
                    Let&apos;s do a sin together...
                </h1>

                {/* Spinner */}
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin" />
                </div>

                {/* Loading text */}
                <p className="text-sm tracking-[0.25em] text-gray-500 uppercase">
                    Loading...
                </p>
            </div>
        </main>
    );
}
