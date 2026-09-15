"use client";

import { ListingData } from "@/data/listingData";
import { useClickOutside } from "@/hooks";
import { ChevronDown, Flag, Minus, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";

interface StickyBookingWidgetProps {
    data: ListingData;
    onReserveSuccess?: () => void;
}

export const StickyBookingWidget: React.FC<StickyBookingWidgetProps> = ({
    data,
    onReserveSuccess,
}) => {
    const [guestsCount, setGuestsCount] = useState(2);
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [isReserved, setIsReserved] = useState(false);

    const closeGuestPicker = useCallback(() => setShowGuestPicker(false), []);
    const guestPickerRef = useClickOutside<HTMLDivElement>(
        closeGuestPicker,
        showGuestPicker
    );

    const price = isClaimed
        ? Math.round(data.pricing.totalBasePrice * 0.9)
        : data.pricing.totalBasePrice;

    const handleReserve = () => {
        setIsReserved(true);
        if (onReserveSuccess) {
            onReserveSuccess();
        }
    };

    return (
        <div id="booking-widget" className="sticky top-28 ml-auto w-full max-w-92.5">
            <div className="rounded-2xl border border-border-primary bg-white p-6 shadow-airbnb-card">
                <div className="mb-5 flex items-center justify-between gap-2 rounded-xl border border-border-secondary bg-surface-secondary p-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg text-emerald-600" aria-hidden="true">
                            🌿
                        </span>
                        <div className="text-[12px] leading-tight text-content-primary">
                            <span className="block font-semibold">
                                Get 10% off your next stay.
                            </span>
                            <span className="cursor-pointer text-content-secondary underline">
                                Terms apply
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsClaimed(!isClaimed)}
                        className={`cursor-pointer rounded-full border px-3 py-1 text-[12px] font-semibold transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden ${
                            isClaimed
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-black hover:bg-black hover:text-white"
                        }`}
                    >
                        {isClaimed ? "Applied" : "Claim"}
                    </button>
                </div>
                <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-[22px] font-bold text-content-primary">
                        {data.pricing.currencySymbol}
                        {price.toLocaleString()}
                    </span>
                    <span className="text-[15px] text-content-secondary">
                        for {data.pricing.defaultNights} nights
                    </span>
                </div>
                <div className="mb-4 overflow-hidden rounded-2xl border border-border-input">
                    <div className="grid grid-cols-2 border-b border-border-input">
                        <div className="cursor-pointer border-r border-border-input p-3 hover:bg-neutral-50">
                            <label className="block text-[10px] font-bold tracking-wider text-content-primary uppercase">
                                CHECK-IN
                            </label>
                            <div className="text-[14px] font-medium text-content-primary">
                                10/18/2026
                            </div>
                        </div>
                        <div className="cursor-pointer p-3 hover:bg-neutral-50">
                            <label className="block text-[10px] font-bold tracking-wider text-content-primary uppercase">
                                CHECKOUT
                            </label>
                            <div className="text-[14px] font-medium text-content-primary">
                                10/23/2026
                            </div>
                        </div>
                    </div>
                    <div ref={guestPickerRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setShowGuestPicker((prev) => !prev)}
                            aria-expanded={showGuestPicker}
                            aria-haspopup="dialog"
                            aria-label={`Guests selector, currently ${guestsCount} guests`}
                            className="flex w-full cursor-pointer items-center justify-between p-3 text-left hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                        >
                            <div>
                                <span className="block text-[10px] font-bold tracking-wider text-content-primary uppercase">
                                    GUESTS
                                </span>
                                <span className="text-[14px] text-content-primary">
                                    {guestsCount} guests
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 text-content-primary transition-transform ${
                                    showGuestPicker ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {showGuestPicker && (
                            <div
                                role="dialog"
                                aria-label="Guests selector"
                                className="animate-in fade-in zoom-in-95 absolute top-full right-0 left-0 z-20 mt-1 rounded-2xl border border-border-primary bg-white p-4 shadow-airbnb-card"
                            >
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <div className="text-sm font-semibold">
                                            Adults
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            Age 13+
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuestsCount(
                                                    Math.max(1, guestsCount - 1)
                                                )
                                            }
                                            disabled={guestsCount <= 1}
                                            aria-label="Decrease number of adults"
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-neutral-300 hover:border-black disabled:opacity-30"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-4 text-center text-sm font-semibold">
                                            {guestsCount}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuestsCount(
                                                    Math.min(3, guestsCount + 1)
                                                )
                                            }
                                            disabled={guestsCount >= 3}
                                            aria-label="Increase number of adults"
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-neutral-300 hover:border-black disabled:opacity-30"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-2 text-right">
                                    <button
                                        type="button"
                                        onClick={closeGuestPicker}
                                        className="cursor-pointer text-xs font-semibold text-black underline"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <p className="mb-4 text-center text-[13px] text-content-secondary">
                    Free cancellation before {data.pricing.freeCancellationDate}
                </p>
                <button
                    type="button"
                    onClick={handleReserve}
                    className="flex w-full cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-brand-from via-brand-via to-brand-to py-3.5 text-[16px] font-semibold text-white shadow-sm transition-all hover:opacity-95 hover:shadow active:scale-[0.99]"
                >
                    {isReserved ? "Reservation requested!" : "Reserve"}
                </button>
                <p className="mt-4 text-center text-[14px] text-content-secondary">
                    You won&apos;t be charged yet
                </p>
            </div>
            <div className="mt-6 flex cursor-pointer items-center justify-center gap-2 text-[14px] text-content-secondary underline hover:text-content-primary">
                <Flag className="h-4 w-4" />
                <span>Report this listing</span>
            </div>
        </div>
    );
};
