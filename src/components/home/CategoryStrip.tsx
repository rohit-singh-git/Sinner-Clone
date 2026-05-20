import Image from "next/image";

export default function CategoryStrip() {
    const items = Array(6).fill(
        "https://www.officialsinner.com/cdn/shop/files/cat-icon.png?crop=center&height=4119&v=1755773412&width=3800",
    );

    return (
        <section className="overflow-hidden border-y border-white/50 py-10 bg-black">
            <div className="flex w-max animate-marquee">
                {[...items, ...items].map((src, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-6 px-12 shrink-0"
                    >
                        <Image
                            src={src}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                        />
                        <p className="text-white text-4xl font-bold whitespace-nowrap ml-20">
                            SHOP NOW
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
