"use client";

import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Review } from "@/data/listingData";

interface AllReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    reviews: Review[];
    rating: number;
    reviewsCount: number;
}

export const AllReviewsModal: React.FC<AllReviewsModalProps> = ({
    isOpen,
    onClose,
    reviews,
    rating,
    reviewsCount,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const lastActiveElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        lastActiveElementRef.current = document.activeElement as HTMLElement | null;

        const timer = setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 50);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "Tab") {
                const container = containerRef.current;
                if (!container) return;

                const focusableElements = container.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (
                        document.activeElement === firstElement ||
                        !container.contains(document.activeElement)
                    ) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (
                        document.activeElement === lastElement ||
                        !container.contains(document.activeElement)
                    ) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
            if (lastActiveElementRef.current) {
                lastActiveElementRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filteredReviews = reviews.filter(
        (r) =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.longComment &&
                r.longComment.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div
            onClick={onClose}
            className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs duration-150 sm:p-6"
        >
            <div
                ref={containerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="reviews-modal-title"
                onClick={(e) => e.stopPropagation()}
                className="animate-in zoom-in-95 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-airbnb-modal duration-200"
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-secondary bg-white p-6">
                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close reviews dialog"
                        className="cursor-pointer rounded-full p-2 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="text-[14px] font-semibold text-content-primary">
                        {reviewsCount} reviews
                    </div>
                </div>
                <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-12">
                    <div className="border-b border-border-secondary p-6 md:col-span-5 md:border-r md:border-b-0 md:p-8">
                        <div className="flex items-center gap-2">
                            <Star className="h-6 w-6 fill-current text-content-primary" />
                            <h2
                                id="reviews-modal-title"
                                className="text-[26px] font-bold text-content-primary"
                            >
                                {rating.toFixed(2)}
                            </h2>
                        </div>
                        <p className="mt-1 text-[15px] font-semibold text-content-primary">
                            Guest favourite
                        </p>
                        <p className="mt-1 text-[13px] text-content-secondary">
                            One of the most loved homes on Airbnb based on ratings,
                            reviews, and reliability.
                        </p>
                        <div className="relative mt-6">
                            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-content-secondary" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search reviews"
                                aria-label="Search reviews"
                                className="w-full rounded-full border border-border-input bg-surface-secondary py-2.5 pr-4 pl-10 text-[14px] text-content-primary focus:outline-hidden"
                            />
                        </div>
                    </div>
                    <div className="space-y-6 p-6 md:col-span-7 md:p-8">
                        {filteredReviews.length === 0 ? (
                            <p className="text-[14px] text-content-secondary">
                                No reviews match &quot;{searchQuery}&quot;
                            </p>
                        ) : (
                            filteredReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="border-b border-border-secondary pb-6 last:border-none"
                                >
                                    <div className="flex items-center gap-3">
                                        {review.avatar ? (
                                            <Image
                                                src={review.avatar}
                                                alt={review.name}
                                                width={44}
                                                height={44}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${
                                                    review.avatarBg || "bg-neutral-800"
                                                }`}
                                            >
                                                {review.initial || review.name[0]}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-[15px] font-semibold text-content-primary">
                                                {review.name}
                                            </div>
                                            <div className="text-[12px] text-content-secondary">
                                                {review.tenure} · {review.date}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[14px] leading-relaxed text-content-primary">
                                        {review.longComment || review.comment}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
