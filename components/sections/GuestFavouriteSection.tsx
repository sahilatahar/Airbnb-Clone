"use client";

import React from "react";
import { Sparkles, CheckCircle2, Key, MessageSquare, MapPin, Tag } from "lucide-react";
import { ListingData } from "@/data/listingData";

interface GuestFavouriteSectionProps {
    data: ListingData;
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void;
}

export const GuestFavouriteSection: React.FC<GuestFavouriteSectionProps> = ({
    data,
    selectedTag,
    onSelectTag,
}) => {
    const getCategoryIcon = (iconName: string) => {
        switch (iconName) {
            case "sparkles":
                return <Sparkles className="h-8 w-8 stroke-[1.5] text-content-primary" />;
            case "check-circle":
                return (
                    <CheckCircle2 className="h-8 w-8 stroke-[1.5] text-content-primary" />
                );
            case "key":
                return <Key className="h-8 w-8 stroke-[1.5] text-content-primary" />;
            case "message-square":
                return (
                    <MessageSquare className="h-8 w-8 stroke-[1.5] text-content-primary" />
                );
            case "map-pin":
                return <MapPin className="h-8 w-8 stroke-[1.5] text-content-primary" />;
            case "tag":
            default:
                return <Tag className="h-8 w-8 stroke-[1.5] text-content-primary" />;
        }
    };

    return (
        <div id="reviews" className="border-b border-border-primary pt-12 pb-6">
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center gap-3 sm:gap-6">
                    <Sparkles className="h-10 w-10 stroke-[1.75] text-content-primary sm:h-12 sm:w-12" />
                    <span className="text-[52px] leading-none font-extrabold tracking-tight text-content-primary sm:text-[60px]">
                        {data.rating.toFixed(2)}
                    </span>
                    <Sparkles className="h-10 w-10 stroke-[1.75] text-content-primary sm:h-12 sm:w-12" />
                </div>

                <h3 className="mb-1 text-[24px] font-bold text-content-primary">
                    Guest favourite
                </h3>
                <p className="mb-1 max-w-lg text-[16px] text-content-secondary">
                    This home is a guest favourite based on ratings, reviews and
                    reliability
                </p>
                <a
                    href="#reviews"
                    className="text-[14px] font-semibold text-content-primary underline"
                >
                    How reviews work
                </a>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-border-primary py-8 sm:grid-cols-4 lg:grid-cols-7">
                <div className="border-r border-border-primary pr-4">
                    <div className="mb-2 text-[14px] font-semibold text-content-primary">
                        Overall rating
                    </div>
                    <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div
                                key={stars}
                                className="flex items-center gap-2 text-[12px] text-content-secondary"
                            >
                                <span className="w-2">{stars}</span>
                                <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200">
                                    <div
                                        className="h-full rounded-full bg-content-primary"
                                        style={{
                                            width:
                                                stars === 5
                                                    ? "95%"
                                                    : stars === 4
                                                      ? "5%"
                                                      : "0%",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {data.categoryRatings.map((cat, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col justify-between ${
                            idx < data.categoryRatings.length - 1
                                ? "border-border-primary pr-3 sm:border-r"
                                : ""
                        }`}
                    >
                        <div>
                            <div className="text-[14px] font-semibold text-content-primary">
                                {cat.category}
                            </div>
                            <div className="mt-0.5 text-[18px] font-bold text-content-primary">
                                {cat.score.toFixed(1)}
                            </div>
                        </div>
                        <div className="mt-4">{getCategoryIcon(cat.icon)}</div>
                    </div>
                ))}
            </div>

            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-6">
                {data.reviewTags.map((tag) => (
                    <button
                        key={tag.label}
                        type="button"
                        onClick={() =>
                            onSelectTag(selectedTag === tag.label ? null : tag.label)
                        }
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden ${
                            selectedTag === tag.label
                                ? "border-content-primary bg-content-primary text-white"
                                : "border-border-primary text-content-primary hover:border-black"
                        }`}
                    >
                        {tag.icon && (
                            <span className="flex items-center justify-center text-[17px] leading-none select-none sm:text-[18px]">
                                {tag.icon}
                            </span>
                        )}
                        <span>{tag.label}</span>
                        <span className="text-xs opacity-75">{tag.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
