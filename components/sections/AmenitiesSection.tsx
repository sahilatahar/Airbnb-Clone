"use client";

import {
    Ban,
    Bath,
    Car,
    Laptop,
    PawPrint,
    ShieldAlert,
    UtensilsCrossed,
    Video,
    Waves,
    Wifi,
} from "lucide-react";
import React from "react";

interface AmenitiesSectionProps {
    onShowAllAmenities: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
    onShowAllAmenities,
}) => {
    const featuredAmenities = [
        { icon: <UtensilsCrossed className="h-6 w-6 stroke-[1.5]" />, name: "Kitchen" },
        { icon: <Wifi className="h-6 w-6 stroke-[1.5]" />, name: "Wifi" },
        {
            icon: <Laptop className="h-6 w-6 stroke-[1.5]" />,
            name: "Dedicated workspace",
        },
        {
            icon: <Car className="h-6 w-6 stroke-[1.5]" />,
            name: "Free parking on premises",
        },
        { icon: <Waves className="h-6 w-6 stroke-[1.5]" />, name: "Pool" },
        { icon: <Bath className="h-6 w-6 stroke-[1.5]" />, name: "Hot tub" },
        { icon: <PawPrint className="h-6 w-6 stroke-[1.5]" />, name: "Pets allowed" },
        {
            icon: <Video className="h-6 w-6 stroke-[1.5]" />,
            name: "Exterior security cameras on property",
        },
        {
            icon: <ShieldAlert className="h-6 w-6 stroke-[1.5] text-neutral-400" />,
            name: (
                <span className="text-neutral-500 line-through">
                    Carbon monoxide alarm
                </span>
            ),
        },
        {
            icon: <Ban className="h-6 w-6 stroke-[1.5] text-neutral-400" />,
            name: <span className="text-neutral-500 line-through">Smoke alarm</span>,
        },
    ];

    return (
        <div id="amenities" className="border-b border-border-primary py-8">
            <h3 className="mb-6 text-[22px] font-semibold text-content-primary">
                What this place offers
            </h3>

            <div className="mb-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {featuredAmenities.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 text-[16px] text-content-primary"
                    >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                            {item.icon}
                        </div>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onShowAllAmenities}
                className="cursor-pointer rounded-full border border-black px-6 py-3.5 text-[16px] font-semibold text-content-primary transition-all hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden active:scale-[0.98]"
            >
                Show all 50 amenities
            </button>
        </div>
    );
};
