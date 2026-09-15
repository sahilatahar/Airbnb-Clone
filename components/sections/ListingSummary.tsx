"use client";

import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import { ListingData } from "@/data/listingData";

interface ListingSummaryProps {
    data: ListingData;
    onShowAllReviews?: () => void;
}

export const ListingSummary: React.FC<ListingSummaryProps> = ({
    data,
    onShowAllReviews,
}) => {
    return (
        <div className="border-b border-border-primary pb-6">
            <h2 className="mb-1 text-[22px] font-semibold tracking-tight text-content-primary">
                {data.propertyType}
            </h2>
            <p className="text-[15px] text-content-primary">
                {data.specs.guests} guests · {data.specs.bedrooms}{" "}
                {data.specs.bedrooms > 1 ? "bedrooms" : "bedroom"} · {data.specs.beds}{" "}
                {data.specs.beds > 1 ? "beds" : "bed"} · {data.specs.bathrooms}{" "}
                {data.specs.bathrooms > 1 ? "bathrooms" : "bathroom"}
            </p>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-border-primary p-4 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-8 w-8 items-center justify-center text-content-primary">
                        <Award className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <div>
                        <div className="text-[16px] font-semibold text-content-primary">
                            Guest favourite
                        </div>
                        <div className="text-[14px] text-content-secondary">
                            One of the most loved homes on Airbnb, according to guests
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                    <div>
                        <div className="flex items-center justify-end gap-1 text-[18px] font-semibold text-content-primary">
                            <span>{data.rating.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-end text-xs text-black">
                            {"★".repeat(5)}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onShowAllReviews}
                        className="cursor-pointer border-l border-border-primary pl-6 text-center transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                    >
                        <div className="text-[18px] font-semibold text-content-primary">
                            {data.reviewsCount}
                        </div>
                        <div className="text-[12px] text-content-secondary underline">
                            Reviews
                        </div>
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200">
                    <Image
                        src={data.host.avatar}
                        alt={data.host.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-[16px] font-semibold text-content-primary">
                        Hosted by {data.host.name}
                    </h3>
                    <p className="text-[14px] text-content-secondary">
                        {data.host.yearsHosting} years hosting
                    </p>
                </div>
            </div>
        </div>
    );
};
