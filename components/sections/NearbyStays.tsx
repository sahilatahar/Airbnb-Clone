"use client";

import { NearbyStay } from "@/data/listingData";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface NearbyStaysProps {
    stays: NearbyStay[];
}

export const NearbyStays: React.FC<NearbyStaysProps> = ({ stays }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(1);
    const [likedMap, setLikedMap] = useState<{ [key: string]: boolean }>({});
    const isProgrammaticScroll = useRef(false);

    const goToPage = (targetPage: number) => {
        const el = scrollContainerRef.current;
        if (!el) return;

        setPage(targetPage);
        isProgrammaticScroll.current = true;

        if (targetPage === 1) {
            el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        }

        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 500);
    };

    // Handle manual swipe/drag by user without causing mid-scroll flickering
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        let scrollTimer: NodeJS.Timeout;

        const handleScrollEnd = () => {
            if (isProgrammaticScroll.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = el;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll <= 0) return;

            // Determine closest page based on scroll midpoint
            const newPage = scrollLeft > maxScroll / 2 ? 2 : 1;
            setPage(newPage);
        };

        const onScroll = () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(handleScrollEnd, 100);
        };

        el.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearTimeout(scrollTimer);
            el.removeEventListener("scroll", onScroll);
        };
    }, []);

    const toggleLike = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section aria-label="More stays nearby" className="py-12">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[22px] font-semibold text-content-primary">
                    More stays nearby
                </h3>

                <div className="flex items-center gap-3 text-[14px] text-content-primary">
                    <span className="text-[14px] font-medium">{page}/2</span>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => goToPage(1)}
                            disabled={page === 1}
                            aria-label="Previous stays"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-neutral-300 transition-colors hover:border-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden disabled:opacity-30 disabled:hover:border-neutral-300"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goToPage(2)}
                            disabled={page === 2}
                            aria-label="Next stays"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:border-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-300"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth pb-2"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {stays.map((stay) => (
                    <div
                        key={stay.id}
                        style={{ scrollSnapAlign: "start" }}
                        className="group flex w-[calc(50%-8px)] min-w-50 shrink-0 cursor-pointer flex-col sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
                    >
                        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-xs">
                            <Image
                                src={stay.image}
                                alt={stay.title}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                                type="button"
                                onClick={(e) => toggleLike(stay.id, e)}
                                aria-label={
                                    likedMap[stay.id]
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                className="absolute top-3 right-3 cursor-pointer rounded-full p-1.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                            >
                                <Heart
                                    className={`h-5 w-5 drop-shadow ${
                                        likedMap[stay.id]
                                            ? "fill-brand text-brand"
                                            : "fill-black/20 text-white"
                                    }`}
                                />
                            </button>
                        </div>

                        <h4 className="mb-1 line-clamp-2 text-[15px] leading-tight font-medium text-content-primary">
                            {stay.title}
                        </h4>

                        <div className="flex items-center gap-2 text-[14px] text-content-primary">
                            <span className="font-semibold">{stay.price}</span>
                            <span>★ {stay.rating.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
