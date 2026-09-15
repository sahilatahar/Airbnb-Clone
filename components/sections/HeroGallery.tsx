"use client";

import { Grid, Heart, Share } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Photo } from "@/data/listingData";

interface HeroGalleryProps {
    photos: Photo[];
    title: string;
    onOpenPhotoTour: () => void;
    onOpenLightbox: (photoIndex: number) => void;
    onShareClick: () => void;
    isSaved: boolean;
    onSaveToggle: () => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
    photos,
    title,
    onOpenPhotoTour,
    onOpenLightbox,
    onShareClick,
    isSaved,
    onSaveToggle,
}) => {
    return (
        <section
            id="photos"
            aria-label="Listing photo gallery overview"
            className="mx-auto max-w-7xl px-6 pt-6 pb-4 sm:px-10"
        >
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <h1 className="text-[26px] font-semibold tracking-tight text-content-primary sm:leading-8">
                    {title}
                </h1>

                <div className="flex items-center gap-4 text-[14px] font-semibold text-content-primary">
                    <button
                        type="button"
                        onClick={onShareClick}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 underline decoration-solid underline-offset-2 transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Share className="h-4 w-4 stroke-2" />
                        <span>Share</span>
                    </button>

                    <button
                        type="button"
                        onClick={onSaveToggle}
                        className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 underline decoration-solid underline-offset-2 transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Heart
                            className={`h-4 w-4 transition-all ${
                                isSaved
                                    ? "scale-110 fill-brand text-brand"
                                    : "text-content-primary group-hover:scale-105"
                            }`}
                        />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                </div>
            </div>

            <div className="relative grid h-105 grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-4 lg:h-115">
                <button
                    type="button"
                    onClick={onOpenPhotoTour}
                    aria-label={`Open photo tour. Primary photo: ${
                        photos[0]?.title || "Listing main photo"
                    }`}
                    className="group relative block h-full w-full cursor-pointer overflow-hidden p-0 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden md:col-span-2"
                >
                    <Image
                        src={photos[0]?.src || ""}
                        alt={photos[0]?.title || "Listing main photo"}
                        fill
                        priority
                        className="object-cover transition-all duration-300 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                </button>

                <div className="hidden h-full flex-col gap-2 md:flex">
                    <button
                        type="button"
                        onClick={onOpenPhotoTour}
                        aria-label={`Open photo tour. Photo 2: ${
                            photos[1]?.title || "Living room"
                        }`}
                        className="group relative block w-full flex-1 cursor-pointer overflow-hidden p-0 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Image
                            src={photos[1]?.src || ""}
                            alt={photos[1]?.title || "Patio"}
                            fill
                            className="object-cover transition-all duration-300 group-hover:brightness-90"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={onOpenPhotoTour}
                        aria-label={`Open photo tour. Photo 3: ${
                            photos[3]?.title || "Bedroom"
                        }`}
                        className="group relative block w-full flex-1 cursor-pointer overflow-hidden p-0 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Image
                            src={photos[3]?.src || ""}
                            alt={photos[3]?.title || "Bedroom"}
                            fill
                            className="object-cover transition-all duration-300 group-hover:brightness-90"
                        />
                    </button>
                </div>

                <div className="relative hidden h-full flex-col gap-2 md:flex">
                    <button
                        type="button"
                        onClick={onOpenPhotoTour}
                        aria-label={`Open photo tour. Photo 4: ${
                            photos[2]?.title || "Jacuzzi"
                        }`}
                        className="group relative block w-full flex-1 cursor-pointer overflow-hidden p-0 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Image
                            src={photos[2]?.src || ""}
                            alt={photos[2]?.title || "Jacuzzi"}
                            fill
                            className="object-cover transition-all duration-300 group-hover:brightness-90"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={onOpenPhotoTour}
                        aria-label={`Open photo tour. Photo 5: ${
                            photos[4]?.title || "Exterior"
                        }`}
                        className="group relative block w-full flex-1 cursor-pointer overflow-hidden p-0 text-left focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <Image
                            src={photos[4]?.src || ""}
                            alt={photos[4]?.title || "Exterior"}
                            fill
                            className="object-cover transition-all duration-300 group-hover:brightness-90"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenPhotoTour();
                        }}
                        aria-label="Show all photos in photo tour"
                        className="absolute right-4 bottom-4 z-10 flex cursor-pointer items-center gap-2 rounded-full border border-black/80 bg-white/95 px-4 py-2 text-[14px] font-semibold text-content-primary shadow-md transition-all hover:scale-[1.02] hover:bg-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98]"
                    >
                        <Grid className="h-4 w-4" />
                        <span>Show all photos</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
