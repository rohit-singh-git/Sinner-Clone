"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promos = [
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
    { type: "video", src: "https://www.w3schools.com/html/movie.mp4" },
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
    { type: "video", src: "https://www.w3schools.com/html/movie.mp4" },
    {
        type: "image",
        src: "https://www.officialsinner.com/cdn/shop/files/preview_images/ace34004399748cdbecc5435fe9a0a75.thumbnail.0000000000.jpg?v=1775899638&width=720",
    },
];

export default function PromoSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
        duration: 30,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    // Track previous index to properly pause the outgoing video
    const prevIndexRef = useRef(0);
    const videoRefs = useRef([]);

    const syncVideos = useCallback((emblaApi) => {
        const activeIndex = emblaApi.selectedScrollSnap();
        const prevIndex = prevIndexRef.current;

        // Pause + reset the previously active video
        const prevVideo = videoRefs.current[prevIndex];
        if (prevVideo) {
            prevVideo.pause();
            prevVideo.currentTime = 0;
        }

        // Play the newly active video
        const nextVideo = videoRefs.current[activeIndex];
        if (nextVideo) {
            nextVideo
                .play()
                .catch((err) => console.warn("Autoplay blocked:", err));
        }

        prevIndexRef.current = activeIndex;
        setSelectedIndex(activeIndex);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        // Trigger immediately so the initial center slide plays
        syncVideos(emblaApi);

        emblaApi.on("select", syncVideos);
        emblaApi.on("reInit", syncVideos);

        return () => {
            emblaApi.off("select", syncVideos);
            emblaApi.off("reInit", syncVideos);
        };
    }, [emblaApi, syncVideos]);

    return (
        <section className="bg-black py-12 relative flex flex-col items-center justify-center min-h-165 select-none gap-6">
            <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex backface-hidden">
                    {promos.map((item, i) => {
                        const isActive = i === selectedIndex;

                        return (
                            <div
                                key={i}
                                className="flex-[0_0_24%] min-w-0 px-2 flex items-center justify-center h-160"
                            >
                                <div
                                    className={`
                                        w-full rounded-xl overflow-hidden bg-zinc-900
                                        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                                        will-change-transform
                                        ${
                                            isActive
                                                ? "scale-100 h-155 opacity-100 shadow-2xl shadow-white/10"
                                                : "scale-[0.88] h-130 opacity-30"
                                        }
                                    `}
                                >
                                    {item.type === "image" ? (
                                        <img
                                            src={item.src}
                                            alt=""
                                            className="w-full h-full object-cover pointer-events-none"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <video
                                                ref={(el) =>
                                                    (videoRefs.current[i] = el)
                                                }
                                                src={item.src}
                                                muted
                                                autoPlay
                                                loop
                                                playsInline
                                                /*
                                                 * Do NOT toggle the `controls` boolean — it remounts
                                                 * the native control bar and causes layout flicker.
                                                 * Instead, overlay a custom controls layer only on
                                                 * the active slide via CSS visibility.
                                                 */
                                                className="w-full h-full object-cover pointer-events-none"
                                            />
                                            {/* Custom mute-toggle overlay — only visible on active card */}
                                            {isActive && (
                                                <MuteToggle
                                                    videoRef={{
                                                        current:
                                                            videoRefs.current[
                                                                i
                                                            ],
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-3 rounded-full text-white hover:bg-black transition-colors backdrop-blur-sm"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-3 rounded-full text-white hover:bg-black transition-colors backdrop-blur-sm"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
                {promos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            i === selectedIndex
                                ? "w-6 h-2 bg-white"
                                : "w-2 h-2 bg-white/30 hover:bg-white/60"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

/** Minimal mute/unmute toggle rendered over the active video card */
function MuteToggle({ videoRef }) {
    const [muted, setMuted] = useState(true);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
    };

    return (
        <button
            onClick={toggle}
            className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
        >
            {muted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
    );
}
