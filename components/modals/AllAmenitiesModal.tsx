"use client";

import React, { useEffect, useRef } from "react";
import { X, Check, XCircle } from "lucide-react";
import { AmenityCategory } from "@/data/listingData";

interface AllAmenitiesModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: AmenityCategory[];
}

export const AllAmenitiesModal: React.FC<AllAmenitiesModalProps> = ({
    isOpen,
    onClose,
    categories,
}) => {
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

    return (
        <div
            onClick={onClose}
            className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs duration-150 sm:p-6"
        >
            <div
                ref={containerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="amenities-modal-title"
                onClick={(e) => e.stopPropagation()}
                className="animate-in zoom-in-95 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-airbnb-modal duration-200"
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-secondary bg-white p-6">
                    <h2
                        id="amenities-modal-title"
                        className="text-[18px] font-bold text-content-primary"
                    >
                        What this place offers
                    </h2>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close amenities dialog"
                        className="cursor-pointer rounded-full p-2 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-8 overflow-y-auto p-6 sm:p-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="border-b border-border-secondary pb-6 last:border-none"
                        >
                            <h3 className="mb-4 text-[18px] font-semibold text-content-primary">
                                {cat.category}
                            </h3>
                            <div className="space-y-4">
                                {cat.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 text-[16px] text-content-primary"
                                    >
                                        <div className="mt-0.5" aria-hidden="true">
                                            {item.available ? (
                                                <Check className="h-5 w-5 stroke-2 text-content-primary" />
                                            ) : (
                                                <XCircle className="h-5 w-5 stroke-[1.5] text-neutral-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                className={
                                                    item.available
                                                        ? ""
                                                        : "text-neutral-500 line-through"
                                                }
                                            >
                                                {item.name}
                                                {!item.available && (
                                                    <span className="sr-only">
                                                        {" "}
                                                        (Not available)
                                                    </span>
                                                )}
                                            </div>
                                            {item.description && (
                                                <div className="text-[14px] text-content-secondary">
                                                    {item.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
