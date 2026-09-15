"use client";

import { ListingData } from "@/data/listingData";
import { Check, Copy, Mail, MessageSquare, Share2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ListingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
    const [copied, setCopied] = useState(false);
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

    const handleCopyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            onClick={onClose}
            className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-150"
        >
            <div
                ref={containerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-modal-title"
                onClick={(e) => e.stopPropagation()}
                className="animate-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-airbnb-modal duration-200"
            >
                <div className="flex items-center justify-between border-b border-border-secondary pb-4">
                    <h2
                        id="share-modal-title"
                        className="text-[18px] font-bold text-content-primary"
                    >
                        Share this place
                    </h2>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close share dialog"
                        className="cursor-pointer rounded-full p-2 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="my-6 flex items-center gap-4 rounded-2xl border border-border-secondary p-4">
                    <div className="relative h-18 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image
                            src={data.photos[0]?.src || ""}
                            alt={data.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-1 text-[15px] font-semibold text-content-primary">
                            {data.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-[13px] text-content-secondary">
                            {data.location}
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-content-primary">
                            ₹{data.pricing.pricePerNight.toLocaleString("en-IN")}{" "}
                            <span className="font-normal text-content-secondary">
                                / night
                            </span>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-secondary p-3.5 text-left text-[14px] font-semibold text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        {copied ? (
                            <Check className="h-5 w-5 text-verified-green" />
                        ) : (
                            <Copy className="h-5 w-5 text-content-primary" />
                        )}
                        <span>{copied ? "Link copied!" : "Copy Link"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.open(
                                    `mailto:?subject=${encodeURIComponent(
                                        data.title
                                    )}&body=${encodeURIComponent(window.location.href)}`
                                );
                            }
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-secondary p-3.5 text-left text-[14px] font-semibold text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Mail className="h-5 w-5 text-content-primary" />
                        <span>Email</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.open(
                                    `https://wa.me/?text=${encodeURIComponent(
                                        data.title + " " + window.location.href
                                    )}`
                                );
                            }
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-secondary p-3.5 text-left text-[14px] font-semibold text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <MessageSquare className="h-5 w-5 text-content-primary" />
                        <span>WhatsApp</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (typeof navigator !== "undefined" && navigator.share) {
                                navigator.share({
                                    title: data.title,
                                    url: window.location.href,
                                });
                            } else {
                                handleCopyLink();
                            }
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-secondary p-3.5 text-left text-[14px] font-semibold text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Share2 className="h-5 w-5 text-content-primary" />
                        <span>More options</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
