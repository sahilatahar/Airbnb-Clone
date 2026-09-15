"use client";

import Image from "next/image";
import React from "react";
import { ListingData } from "@/data/listingData";

interface WhereYoullSleepProps {
    arrangements: ListingData["sleepingArrangements"];
    onSelectPhoto?: (index: number) => void;
}

export const WhereYoullSleep: React.FC<WhereYoullSleepProps> = ({
    arrangements,
    onSelectPhoto,
}) => {
    return (
        <div className="border-b border-border-primary py-8">
            <h3 className="mb-6 text-[22px] font-semibold text-content-primary">
                Where you&apos;ll sleep
            </h3>

            <div className="grid w-full max-w-none grid-cols-1 gap-6 md:grid-cols-1 lg:max-w-2xl lg:grid-cols-2">
                {arrangements.map((item, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectPhoto && onSelectPhoto(idx === 0 ? 5 : 6)}
                        className="group flex w-full cursor-pointer flex-col gap-3 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                    >
                        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-sm transition-shadow group-hover:shadow-md sm:aspect-video lg:aspect-4/3">
                            <Image
                                src={item.image}
                                alt={item.room}
                                fill
                                sizes="(max-width: 1024px) 100vw, 320px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div>
                            <div className="text-[16px] font-semibold text-content-primary">
                                {item.room}
                            </div>
                            <div className="text-[14px] text-content-secondary">
                                {item.bedType}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
