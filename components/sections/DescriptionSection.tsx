"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ListingData } from "@/data/listingData";

interface DescriptionSectionProps {
    data: ListingData;
    onOpenFullDescription?: () => void;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-b border-border-primary py-8">
            <div className="mb-6 flex flex-col justify-between gap-2 rounded-xl bg-surface-secondary p-4 text-[14px] text-content-primary sm:flex-row sm:items-center">
                <span>{data.translationNotice.text}</span>
                <button className="cursor-pointer text-left font-semibold underline hover:text-black sm:text-right">
                    {data.translationNotice.action}
                </button>
            </div>

            <div className="relative">
                <div
                    className={`text-[16px] leading-6 text-content-primary transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-75" : "max-h-18 overflow-hidden"
                    }`}
                >
                    <p>{data.description.preview}</p>
                </div>

                {!isExpanded && (
                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-white via-white/80 to-transparent" />
                )}
            </div>

            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex cursor-pointer items-center gap-1 pt-3 text-[16px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
            >
                <span>{isExpanded ? "Show less" : "Show more"}</span>
                <ChevronRight
                    className={`h-4 w-4 stroke-[2.5] transition-transform duration-200 ${
                        isExpanded ? "-rotate-90" : "group-hover:translate-x-0.5"
                    }`}
                />
            </button>
        </div>
    );
};
