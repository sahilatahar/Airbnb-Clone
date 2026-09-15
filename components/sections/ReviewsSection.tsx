"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Review } from "@/data/listingData";

interface ReviewsSectionProps {
    reviews: Review[];
    onShowAllReviews: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
    reviews,
    onShowAllReviews,
}) => {
    const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

    return (
        <div className="border-b border-border-primary py-8">
            <div className="mb-8 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
                {reviews.map((review) => {
                    const isExpanded = expandedReviewId === review.id;
                    const hasLongComment = Boolean(review.longComment);

                    return (
                        <div key={review.id} className="flex flex-col">
                            <div className="mb-3 flex items-center gap-3">
                                {review.avatar ? (
                                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                                            review.avatarBg ||
                                            "bg-content-primary text-white"
                                        }`}
                                    >
                                        {review.initial || review.name[0]}
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-[16px] font-semibold text-content-primary">
                                        {review.name}
                                    </h4>
                                    <p className="text-[14px] text-content-secondary">
                                        {review.tenure}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-2 flex items-center gap-2 text-[14px] font-medium text-content-primary">
                                <span className="text-xs">
                                    {"★".repeat(review.rating)}
                                </span>
                                <span>·</span>
                                <span className="text-content-primary">
                                    {review.date}
                                </span>
                            </div>

                            <div className="text-[16px] leading-relaxed text-content-primary">
                                <div className="relative">
                                    <div
                                        className={`transition-all duration-200 ${
                                            !isExpanded && hasLongComment
                                                ? "max-h-18 overflow-hidden"
                                                : "max-h-none"
                                        }`}
                                    >
                                        <p>
                                            {isExpanded && review.longComment
                                                ? review.longComment
                                                : review.comment}
                                        </p>
                                    </div>

                                    {!isExpanded && hasLongComment && (
                                        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t from-white via-white/80 to-transparent" />
                                    )}
                                </div>

                                {hasLongComment && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setExpandedReviewId(
                                                isExpanded ? null : review.id
                                            )
                                        }
                                        className="group mt-1 inline-flex cursor-pointer items-center font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                                    >
                                        <span>
                                            {isExpanded ? "Show less" : "Show more"}
                                        </span>
                                        <ChevronRight
                                            className={`ml-0.5 h-3.5 w-3.5 stroke-[2.5] transition-transform ${
                                                isExpanded
                                                    ? "-rotate-90"
                                                    : "group-hover:translate-x-0.5"
                                            }`}
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={onShowAllReviews}
                className="cursor-pointer rounded-full border border-black px-6 py-3.5 text-[16px] font-semibold text-content-primary transition-all hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden active:scale-[0.98]"
            >
                Show all 19 reviews
            </button>
        </div>
    );
};
