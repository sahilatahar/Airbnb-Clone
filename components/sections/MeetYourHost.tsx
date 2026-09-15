"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cake, GraduationCap, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ListingData } from "@/data/listingData";

interface MeetYourHostProps {
    host: ListingData["host"];
}

export const MeetYourHost: React.FC<MeetYourHostProps> = ({ host }) => {
    const [showMessageSent, setShowMessageSent] = useState(false);

    return (
        <div className="border-b border-border-primary py-8">
            <h3 className="mb-6 text-[22px] font-semibold text-content-primary">
                Meet your host
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center justify-between rounded-3xl border border-border-primary bg-white p-8 text-center shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-3">
                            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-neutral-100">
                                <Image
                                    src={host.avatar}
                                    alt={host.name}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute right-0 bottom-0 rounded-full border-2 border-white bg-verified-green p-1 text-white">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                        </div>

                        <h4 className="text-[24px] leading-tight font-bold text-content-primary">
                            {host.name}
                        </h4>
                        <p className="mt-0.5 text-[14px] font-medium text-content-secondary">
                            Host
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-3 border-t border-border-secondary pt-6 text-center">
                        <div>
                            <div className="text-[18px] font-bold text-content-primary">
                                {host.totalReviews.toLocaleString()}
                            </div>
                            <div className="mt-0.5 text-[11px] font-medium text-content-secondary uppercase">
                                Reviews
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-0.5 text-[18px] font-bold text-content-primary">
                                <span>{host.rating}</span>
                                <span className="text-xs">★</span>
                            </div>
                            <div className="mt-0.5 text-[11px] font-medium text-content-secondary uppercase">
                                Rating
                            </div>
                        </div>
                        <div>
                            <div className="text-[18px] font-bold text-content-primary">
                                {host.yearsHosting}
                            </div>
                            <div className="mt-0.5 text-[11px] leading-tight font-medium text-content-secondary uppercase">
                                Years hosting
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-6 md:col-span-2">
                    <div>
                        <h5 className="mb-3 text-[16px] font-semibold text-content-primary">
                            Co-Hosts
                        </h5>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {host.coHosts.map((co, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {co.avatar ? (
                                        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-neutral-100">
                                            <Image
                                                src={co.avatar}
                                                alt={co.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                                co.avatarBg ||
                                                "bg-content-primary text-white"
                                            }`}
                                        >
                                            {co.initial || co.name[0]}
                                        </div>
                                    )}
                                    <span className="truncate text-[14px] text-content-primary">
                                        {co.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="mb-1 text-[16px] font-semibold text-content-primary">
                            Host details
                        </h5>
                        <p className="text-[14px] text-content-primary">
                            Response rate: {host.responseRate}
                        </p>
                        <p className="text-[14px] text-content-primary">
                            {host.responseTime}
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowMessageSent(true)}
                            className="mt-4 cursor-pointer rounded-full border border-black px-6 py-3 text-[16px] font-semibold text-content-primary transition-all hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden active:scale-[0.98]"
                        >
                            {showMessageSent ? "Message sent!" : "Message host"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-6 space-y-3 pt-2">
                <div className="flex items-center gap-3 text-[16px] text-content-primary">
                    <Cake className="h-5 w-5 stroke-[1.5] text-content-primary" />
                    <span>{host.bornIn}</span>
                </div>
                <div className="flex items-center gap-3 text-[16px] text-content-primary">
                    <GraduationCap className="h-5 w-5 stroke-[1.5] text-content-primary" />
                    <span>{host.school}</span>
                </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border-secondary pt-4 text-[12px] text-content-secondary">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                <p>
                    To help protect your payment, always use Airbnb to send money and
                    communicate with hosts.
                </p>
            </div>
        </div>
    );
};
