"use client";

import { ChevronLeft, Heart, Share } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Photo, TourCategory } from "@/data/listingData";

interface PhotoTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    photos: Photo[];
    tourCategories: TourCategory[];
    onSelectPhoto: (index: number) => void;
    onShareClick: () => void;
    isSaved: boolean;
    onSaveToggle: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
    isOpen,
    onClose,
    photos,
    tourCategories,
    onSelectPhoto,
    onShareClick,
    isSaved,
    onSaveToggle,
}) => {
    const [activeTab, setActiveTab] = useState<string>(
        tourCategories[0]?.id || "living-room-1"
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const backButtonRef = useRef<HTMLButtonElement>(null);
    const lastActiveElementRef = useRef<HTMLElement | null>(null);
    const isManualScrolling = useRef(false);

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
                return;
            }

            if (e.key === "Tab") {
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

    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => {
            if (isManualScrolling.current) return;
            const scrollContainer = containerRef.current;
            if (!scrollContainer) return;

            const offset = 200;
            const scrollPos = scrollContainer.scrollTop;

            for (let i = tourCategories.length - 1; i >= 0; i--) {
                const cat = tourCategories[i];
                const el = document.getElementById(`tour-${cat.id}`);
                if (el) {
                    const top = el.offsetTop - offset;
                    if (scrollPos >= top) {
                        if (activeTab !== cat.id) {
                            setActiveTab(cat.id);
                        }
                        break;
                    }
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [isOpen, tourCategories, activeTab]);

    const scrollToCategory = (categoryId: string) => {
        setActiveTab(categoryId);
        isManualScrolling.current = true;

        const targetEl = document.getElementById(`tour-${categoryId}`);
        const container = containerRef.current;

        if (targetEl && container) {
            const offset = 140;
            const targetPos = targetEl.offsetTop - offset;

            container.scrollTo({
                top: Math.max(0, targetPos),
                behavior: "smooth",
            });

            setTimeout(() => {
                isManualScrolling.current = false;
            }, 600);
        }
    };

    const handlePhotoKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        index: number
    ) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const nextBtn = containerRef.current?.querySelector<HTMLButtonElement>(
                `button[data-tour-photo-index="${index + 1}"]`
            );
            if (nextBtn) {
                nextBtn.focus();
                nextBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prevBtn = containerRef.current?.querySelector<HTMLButtonElement>(
                `button[data-tour-photo-index="${index - 1}"]`
            );
            if (prevBtn) {
                prevBtn.focus();
                prevBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    };

    if (!isOpen) return null;

    const renderPhotoGroups = (roomPhotos: Photo[], roomTitle: string) => {
        const groups: Array<{ type: "single" | "pair"; items: Photo[] }> = [];
        let i = 0;
        let isSingle = true;

        while (i < roomPhotos.length) {
            if (isSingle) {
                groups.push({
                    type: "single",
                    items: [roomPhotos[i]],
                });
                i += 1;
                isSingle = false;
            } else {
                if (i + 1 < roomPhotos.length) {
                    groups.push({
                        type: "pair",
                        items: [roomPhotos[i], roomPhotos[i + 1]],
                    });
                    i += 2;
                } else {
                    groups.push({
                        type: "single",
                        items: [roomPhotos[i]],
                    });
                    i += 1;
                }
                isSingle = true;
            }
        }

        return (
            <div className="flex w-full flex-col gap-4 sm:gap-6">
                {groups.map((group, gIdx) => {
                    if (group.type === "single") {
                        const photo = group.items[0];
                        const globalIndex = photos.findIndex((p) => p.id === photo.id);
                        const safeIndex = globalIndex >= 0 ? globalIndex : 0;
                        return (
                            <button
                                key={`single-${photo.id}-${gIdx}`}
                                type="button"
                                data-tour-photo-index={safeIndex}
                                onClick={() => onSelectPhoto(safeIndex)}
                                onKeyDown={(e) => handlePhotoKeyDown(e, safeIndex)}
                                aria-label={`Photo ${safeIndex + 1} of ${
                                    photos.length
                                }: ${photo.title} in ${roomTitle}. Press Enter to view full size.`}
                                className="group relative block aspect-16/10 w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-secondary text-left shadow-xs transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 480px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                            </button>
                        );
                    } else {
                        return (
                            <div
                                key={`pair-${gIdx}`}
                                className="grid w-full grid-cols-2 gap-4 sm:gap-6"
                            >
                                {group.items.map((photo) => {
                                    const globalIndex = photos.findIndex(
                                        (p) => p.id === photo.id
                                    );
                                    const safeIndex = globalIndex >= 0 ? globalIndex : 0;
                                    return (
                                        <button
                                            key={`photo-${photo.id}`}
                                            type="button"
                                            data-tour-photo-index={safeIndex}
                                            onClick={() => onSelectPhoto(safeIndex)}
                                            onKeyDown={(e) =>
                                                handlePhotoKeyDown(e, safeIndex)
                                            }
                                            aria-label={`Photo ${safeIndex + 1} of ${
                                                photos.length
                                            }: ${photo.title} in ${roomTitle}. Press Enter to view full size.`}
                                            className="group relative block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-secondary text-left shadow-xs transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                                        >
                                            <Image
                                                src={photo.src}
                                                alt={photo.title}
                                                fill
                                                sizes="(max-width: 1024px) 50vw, 240px"
                                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-tour-modal-title"
            className="animate-in fade-in fixed inset-0 z-50 overflow-y-auto bg-white text-content-primary duration-200"
        >
            <h1 id="photo-tour-modal-title" className="sr-only">
                Photo Tour Gallery
            </h1>

            <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur">
                <div className="flex w-full items-center justify-between px-6 py-4 sm:px-10">
                    <button
                        ref={backButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close photo tour and return to listing"
                        className="flex cursor-pointer items-center justify-center rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-95"
                    >
                        <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onShareClick}
                            className="flex cursor-pointer items-center gap-2 rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            aria-label="Share listing"
                        >
                            <Share className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={onSaveToggle}
                            className="cursor-pointer rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            aria-label={
                                isSaved ? "Remove from saved" : "Save this listing"
                            }
                        >
                            <Heart
                                className={`h-4 w-4 ${
                                    isSaved
                                        ? "fill-brand text-brand"
                                        : "text-content-primary"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            <nav
                aria-label="Room categories navigation"
                className="border-b border-border-secondary bg-white px-6 py-6 sm:px-10"
            >
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-3 text-[14px] font-bold text-content-primary">
                        Jump to section
                    </h2>
                    <div
                        role="tablist"
                        aria-label="Photo tour room categories"
                        className="flex flex-wrap gap-3 sm:gap-4"
                    >
                        {tourCategories.map((cat) => {
                            const isActive = activeTab === cat.id;
                            const firstPhoto =
                                cat.photos[0]?.src ||
                                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=320&h=200&fit=crop&q=80";

                            return (
                                <button
                                    key={cat.id}
                                    id={`top-card-${cat.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`tour-${cat.id}`}
                                    aria-label={`Jump to ${cat.title} section with ${cat.photos.length} photos`}
                                    onClick={() => scrollToCategory(cat.id)}
                                    className={`group flex w-[calc(50%-6px)] min-w-30 cursor-pointer flex-col items-start gap-1.5 rounded-xl p-1.5 text-left transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden sm:w-[calc(25%-12px)] md:w-[calc(12.5%-14px)] ${
                                        isActive
                                            ? "bg-surface-secondary/70 shadow-xs ring-2 ring-content-primary ring-offset-1"
                                            : "opacity-80 hover:bg-surface-secondary/40 hover:opacity-100"
                                    }`}
                                >
                                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-surface-secondary">
                                        <Image
                                            src={firstPhoto}
                                            alt=""
                                            aria-hidden="true"
                                            fill
                                            sizes="(max-width: 640px) 50vw, 160px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                                        <span className="absolute right-1.5 bottom-1 text-[10px] font-semibold text-white drop-shadow">
                                            {cat.photos.length} photos
                                        </span>
                                    </div>

                                    <span
                                        className={`line-clamp-1 w-full text-[12px] font-semibold transition-colors ${
                                            isActive
                                                ? "font-bold text-content-primary"
                                                : "text-content-secondary group-hover:text-content-primary"
                                        }`}
                                    >
                                        {cat.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
                {tourCategories.map((cat) => (
                    <section
                        key={cat.id}
                        id={`tour-${cat.id}`}
                        aria-labelledby={`tour-heading-${cat.id}`}
                        tabIndex={-1}
                        className="border-border-secondary py-14 first:pt-2 last:border-b-0 focus:outline-hidden"
                    >
                        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14 xl:gap-20">
                            <div className="shrink-0 self-start lg:sticky lg:top-28 lg:w-65 xl:w-70">
                                <h2
                                    id={`tour-heading-${cat.id}`}
                                    className="text-[24px] font-bold tracking-tight text-content-primary sm:text-[28px] sm:leading-8"
                                >
                                    {cat.title}
                                </h2>
                                <p className="mt-2 text-[14px] leading-relaxed text-content-secondary">
                                    {cat.subtitle}
                                </p>
                                <div
                                    aria-label={`${cat.photos.length} photos available`}
                                    className="mt-3.5 inline-flex items-center rounded-full bg-surface-secondary px-2.5 py-1 text-[11px] font-semibold text-content-primary"
                                >
                                    {cat.photos.length} photos
                                </div>
                            </div>

                            <div className="w-full max-w-105 shrink-0">
                                {renderPhotoGroups(cat.photos, cat.title)}
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};
