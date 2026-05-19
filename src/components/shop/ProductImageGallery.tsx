"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImageGallery({
    images,
    name,
}: {
    images: string[];
    name: string;
}) {
    const [active, setActive] = useState(0);

    return (
        <div className="w-full mt-5 md:mt-25 px-3 md:px-0 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full mt-8 md:-mt-24 aspect-4/5 bg-black rounded-sm overflow-hidden">
                <Image
                    key={active}
                    src={images[active]}
                    alt={name}
                    fill
                    priority
                    className="object-contain animate-fade"
                    sizes="(max-width: 1024px) 100vw, 900px"
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 w-full -mt-8 md:-mt-20">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`relative aspect-square w-full bg-black rounded-sm border transition
              ${
                  active === i
                      ? "border-white"
                      : "border-transparent hover:border-gray-500"
              }`}
                    >
                        <Image
                            src={img}
                            alt={`${name}-${i}`}
                            fill
                            className="object-contain p-1"
                            sizes="100vw"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
