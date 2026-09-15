"use client";

import { ListingData } from "@/data/listingData";
import { Star } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface StickyTabBarProps {
    data: ListingData;
    onReserveClick?: () => void;
}

export const StickyTabBar: React.FC<StickyTabBarProps> = ({ data, onReserveClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("photos");

    const tabs = [
        { id: "photos", label: "Photos" },
        { id: "amenities", label: "Amenities" },
        { id: "reviews", label: "Reviews" },
        { id: "location", label: "Location" },
    ];

    useEffect(() => {
        let ticking = false;

        const updateScroll = () => {
            const scrollPosition = window.scrollY;

            setIsVisible(scrollPosition > 520);

            const amenitiesEl = document.getElementById("amenities");
            const reviewsEl = document.getElementById("reviews");
            const locationEl = document.getElementById("location");

            const offset = 140;

            if (locationEl && scrollPosition >= locationEl.offsetTop - offset) {
                setActiveTab("location");
            } else if (reviewsEl && scrollPosition >= reviewsEl.offsetTop - offset) {
                setActiveTab("reviews");
            } else if (amenitiesEl && scrollPosition >= amenitiesEl.offsetTop - offset) {
                setActiveTab("amenities");
            } else {
                setActiveTab("photos");
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 90;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveTab(id);
        }
    }, []);

    const scrollToBooking = useCallback(() => {
        if (onReserveClick) {
            onReserveClick();
        } else {
            const bookingWidget = document.getElementById("booking-widget");
            if (bookingWidget) {
                bookingWidget.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            } else {
                window.scrollTo({ top: 300, behavior: "smooth" });
            }
        }
    }, [onReserveClick]);

    if (!isVisible) return null;

    return (
        <div className="animate-in slide-in-from-top-2 sticky top-0 z-40 border-b border-border-secondary bg-white shadow-sm transition-all duration-200">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
                <nav
                    role="tablist"
                    aria-label="Listing content navigation"
                    className="flex h-full items-center gap-8"
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`relative flex h-full cursor-pointer items-center text-[14px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden ${
                                    isActive
                                        ? "text-content-primary"
                                        : "text-content-secondary hover:text-content-primary"
                                }`}
                            >
                                <span>{tab.label}</span>
                                {isActive && (
                                    <span className="absolute right-0 bottom-0 left-0 h-0.75 rounded-t-full bg-content-primary transition-all duration-200" />
                                )}
                            </button>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-6">
                    <div className="hidden text-right sm:block">
                        <div className="flex items-baseline justify-end gap-1">
                            <span className="text-[16px] font-bold text-content-primary">
                                {data.pricing.currencySymbol}
                                {data.pricing.totalBasePrice.toLocaleString()}
                            </span>
                            <span className="text-[13px] text-content-secondary">
                                for {data.pricing.defaultNights} nights
                            </span>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-[12px] font-semibold text-content-primary">
                            <Star className="h-3 w-3 fill-content-primary text-content-primary" />
                            <span>{data.rating.toFixed(2)}</span>
                            <span className="font-normal text-content-secondary">
                                ({data.reviewsCount} reviews)
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={scrollToBooking}
                        className="cursor-pointer rounded-full bg-linear-to-r from-brand-from via-brand-via to-brand-to px-6 py-3 text-[14px] font-semibold whitespace-nowrap text-white shadow-sm transition-all hover:opacity-95 hover:shadow active:scale-[0.98]"
                    >
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};
