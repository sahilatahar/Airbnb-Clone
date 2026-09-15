"use client";

import React from "react";
import { Calendar, KeyRound, ShieldAlert, ChevronRight } from "lucide-react";
import { ListingData } from "@/data/listingData";

interface ThingsToKnowProps {
    data: ListingData["thingsToKnow"];
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ data }) => {
    return (
        <div className="border-b border-border-primary py-8">
            <h3 className="mb-6 text-[22px] font-semibold text-content-primary">
                Things to know
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <Calendar className="h-6 w-6 stroke-[1.5] text-content-primary" />
                        </div>
                        <h4 className="mb-2 text-[16px] font-semibold text-content-primary">
                            {data.cancellationPolicy.title}
                        </h4>
                        <div className="space-y-2 text-[15px] leading-relaxed text-content-secondary">
                            {data.cancellationPolicy.details.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                    >
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <KeyRound className="h-6 w-6 stroke-[1.5] text-content-primary" />
                        </div>
                        <h4 className="mb-2 text-[16px] font-semibold text-content-primary">
                            {data.houseRules.title}
                        </h4>
                        <div className="space-y-2 text-[15px] leading-relaxed text-content-secondary">
                            {data.houseRules.rules.map((rule, i) => (
                                <p key={i}>{rule}</p>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                    >
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <ShieldAlert className="h-6 w-6 stroke-[1.5] text-content-primary" />
                        </div>
                        <h4 className="mb-2 text-[16px] font-semibold text-content-primary">
                            {data.safetyAndProperty.title}
                        </h4>
                        <div className="space-y-2 text-[15px] leading-relaxed text-content-secondary">
                            {data.safetyAndProperty.items.map((item, i) => (
                                <p key={i}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                    >
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>
            </div>
        </div>
    );
};
