"use client";

import { Photo } from "@/data/listingData";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

interface LightboxModalProps {
    isOpen: boolean;
    onClose: () => void;
    photos: Photo[];
    currentIndex: number;
    onNavigate: (index: number) => void;
    onShareClick: () => void;
    isSaved: boolean;
    onSaveToggle: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
    isOpen,
    onClose,
    photos,
    currentIndex,
    onNavigate,
    onShareClick,
    isSaved,
    onSaveToggle,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const backButtonRef = useRef<HTMLButtonElement>(null);
    const lastActiveElementRef = useRef<HTMLElement | null>(null);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
        } else {
            onNavigate(photos.length - 1);
        }
    }, [currentIndex, photos.length, onNavigate]);

    const handleNext = useCallback(() => {
        if (currentIndex < photos.length - 1) {
            onNavigate(currentIndex + 1);
        } else {
            onNavigate(0);
        }
    }, [currentIndex, photos.length, onNavigate]);

    useEffect(() => {
        if (!isOpen) return;

        lastActiveElementRef.current = document.activeElement as HTMLElement | null;

        const timer = setTimeout(() => {
            backButtonRef.current?.focus();
        }, 50);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
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
    }, [isOpen, onClose, handlePrev, handleNext]);

    if (!isOpen || !photos[currentIndex]) return null;

    const currentPhoto = photos[currentIndex];

    return (
        <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox viewer"
            className="animate-in fade-in fixed inset-0 z-60 flex flex-col justify-between bg-white text-content-primary duration-200 select-none"
        >
            <header className="z-20 flex items-center justify-between border-b border-border-secondary bg-white/95 px-6 py-4 backdrop-blur sm:px-10">
                <button
                    ref={backButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close photo view and return"
                    className="flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </button>

                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="text-sm font-semibold text-content-primary"
                >
                    {currentIndex + 1} / {photos.length}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onShareClick}
                        className="cursor-pointer rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                        aria-label="Share listing"
                    >
                        <Share className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={onSaveToggle}
                        className="cursor-pointer rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                        aria-label={isSaved ? "Remove from saved" : "Save this listing"}
                    >
                        <Heart
                            className={`h-4 w-4 ${
                                isSaved ? "fill-brand text-brand" : "text-content-primary"
                            }`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-2 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                        aria-label="Close photo viewer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-neutral-50 px-4 sm:px-16">
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-4 z-20 cursor-pointer rounded-full border border-border-primary bg-white p-3 text-content-primary shadow-md transition-all hover:scale-105 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden sm:left-8"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="relative flex h-[68vh] w-full max-w-5xl items-center justify-center">
                    <Image
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        fill
                        className="object-contain drop-shadow-sm transition-opacity duration-300"
                        priority
                    />
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-4 z-20 cursor-pointer rounded-full border border-border-primary bg-white p-3 text-content-primary shadow-md transition-all hover:scale-105 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden sm:right-8"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </main>

            <footer className="flex flex-col items-center justify-center border-t border-border-secondary bg-white px-6 py-4 text-center">
                <p className="mb-1 text-[15px] font-semibold text-content-primary">
                    {currentPhoto.title}
                </p>
                {currentPhoto.description && (
                    <p className="max-w-xl text-[13px] text-content-secondary">
                        {currentPhoto.description}
                    </p>
                )}

                <nav
                    aria-label="Thumbnail gallery"
                    className="no-scrollbar mt-3 flex max-w-2xl items-center gap-2 overflow-x-auto px-2 py-1"
                >
                    {photos.map((p, idx) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => onNavigate(idx)}
                            aria-label={`Jump to photo ${idx + 1}: ${p.title}`}
                            aria-current={idx === currentIndex ? "true" : undefined}
                            className={`relative h-10 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden ${
                                idx === currentIndex
                                    ? "scale-105 border-black opacity-100 shadow-sm"
                                    : "border-transparent opacity-50 hover:opacity-80"
                            }`}
                        >
                            <Image
                                src={p.src}
                                alt=""
                                aria-hidden="true"
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </nav>
            </footer>
        </div>
    );
};
