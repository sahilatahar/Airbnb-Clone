"use client";

import { ChevronRight, Home, Minus, Plus, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ListingData } from "@/data/listingData";

interface LocationSectionProps {
    location: ListingData["locationDetails"];
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showFullNeighbourhood, setShowFullNeighbourhood] = useState(false);

    return (
        <div id="location" className="border-b border-border-primary py-8">
            <h3 className="mb-1 text-[22px] font-semibold text-content-primary">
                Where you&apos;ll be
            </h3>
            <p className="mb-6 text-[16px] text-content-primary">
                {location.city}, {location.state}, {location.country}
            </p>

            <div className="relative mb-6 h-95 w-full overflow-hidden rounded-3xl border border-border-primary bg-neutral-100 shadow-xs select-none sm:h-115">
                <div
                    className="relative h-full w-full origin-center transition-transform duration-300"
                    style={{ transform: `scale(${zoomLevel})` }}
                >
                    <Image
                        src={
                            location.mapImage ||
                            "https://media.istockphoto.com/id/1365706213/vector/usa-vector-linear-map-thin-line-united-states-map.jpg?s=612x612&w=0&k=20&c=9dCdb_cIEIepz7LPChY-aatYHnSngonNftS8VDDXnfk="
                        }
                        alt={`${location.city} Map Area`}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded-full border-2 border-teal-accent/40 bg-teal-accent/20 sm:h-44 sm:w-44" />
                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-content-primary text-white shadow-airbnb-modal sm:h-14 sm:w-14">
                            <Home className="h-6 w-6 fill-white text-white sm:h-7 sm:w-7" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 left-4 z-20 rounded-full border border-neutral-200 bg-white/95 p-2.5 shadow-md backdrop-blur">
                    <Search className="h-4 w-4 text-content-primary" />
                </div>

                <div className="absolute top-4 right-4 z-20 flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md">
                    <button
                        type="button"
                        onClick={() => setZoomLevel(Math.min(1.6, zoomLevel + 0.15))}
                        className="cursor-pointer border-b border-neutral-200 p-2.5 text-content-primary transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                        aria-label="Zoom in"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setZoomLevel(Math.max(0.85, zoomLevel - 0.15))}
                        className="cursor-pointer p-2.5 text-content-primary transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                        aria-label="Zoom out"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <p className="mb-3 text-[16px] font-semibold text-content-primary">
                Exact location will be provided after booking.
            </p>

            <div className="mt-4">
                <h4 className="mb-1 text-[16px] font-semibold text-content-primary">
                    Neighbourhood highlights
                </h4>
                <p className="text-[16px] leading-relaxed text-content-primary">
                    {location.neighbourhoodHighlights}
                </p>
                {showFullNeighbourhood && (
                    <p className="mt-2 text-[16px] leading-relaxed text-content-secondary">
                        Enjoy effortless proximity to Lake Pichola boat cruises, City
                        Palace, Bagore Ki Haveli cultural shows, Saheliyon-ki-Bari
                        gardens, artisanal handicraft bazaars, and premier lakeside
                        rooftop dining spots.
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => setShowFullNeighbourhood(!showFullNeighbourhood)}
                    className="group flex cursor-pointer items-center gap-1 pt-2 text-[16px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                >
                    <span>{showFullNeighbourhood ? "Show less" : "Show more"}</span>
                    <ChevronRight
                        className={`h-4 w-4 stroke-[2.5] transition-transform ${
                            showFullNeighbourhood
                                ? "-rotate-90"
                                : "group-hover:translate-x-0.5"
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};
