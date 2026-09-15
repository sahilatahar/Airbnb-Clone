"use client";

import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import React, { useState } from "react";

interface CalendarSectionProps {
    startDate?: string;
    endDate?: string;
    nights?: number;
    locationName?: string;
    onDatesChange?: (start: string, end: string, count: number) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
    locationName = "Malibu",
}) => {
    const [selectedStart, setSelectedStart] = useState<number | null>(18);
    const [selectedEnd, setSelectedEnd] = useState<number | null>(23);

    const daysInOct = 31;
    const octStartDayOfWeek = 4;

    const daysInNov = 30;
    const novStartDayOfWeek = 0;

    const handleDayClick = (day: number) => {
        if (!selectedStart || (selectedStart && selectedEnd)) {
            setSelectedStart(day);
            setSelectedEnd(null);
        } else if (selectedStart && !selectedEnd) {
            if (day < selectedStart) {
                setSelectedStart(day);
                setSelectedEnd(null);
            } else {
                setSelectedEnd(day);
            }
        }
    };

    const handleClear = () => {
        setSelectedStart(null);
        setSelectedEnd(null);
    };

    const calculateNights = () => {
        if (selectedStart && selectedEnd) {
            return selectedEnd - selectedStart;
        }
        return 0;
    };

    const nights = calculateNights();

    return (
        <div className="border-b border-border-primary py-8">
            <h3 className="text-[22px] font-semibold text-content-primary">
                {nights > 0 ? `${nights} nights in ${locationName}` : "Select dates"}
            </h3>
            <p className="mt-1 mb-6 text-[14px] text-content-secondary">
                {selectedStart && selectedEnd
                    ? `${selectedStart} Oct 2026 - ${selectedEnd} Oct 2026`
                    : "Add your travel dates for exact pricing"}
            </p>
            <div className="grid max-w-2xl grid-cols-1 gap-8 select-none md:grid-cols-2">
                <div>
                    <div className="mb-4 flex items-center justify-between text-[16px] font-semibold text-content-primary">
                        <button
                            type="button"
                            aria-label="Previous month"
                            className="cursor-pointer rounded-full p-2 hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span>October 2026</span>
                        <div className="w-8 md:hidden" />
                    </div>
                    <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-content-secondary">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-center text-[14px] font-medium text-content-primary">
                        {Array.from({ length: octStartDayOfWeek }).map((_, i) => (
                            <div key={`empty-oct-${i}`} className="h-10" />
                        ))}
                        {Array.from({ length: daysInOct }).map((_, i) => {
                            const day = i + 1;
                            const isStart = selectedStart === day;
                            const isEnd = selectedEnd === day;
                            const inRange =
                                selectedStart &&
                                selectedEnd &&
                                day > selectedStart &&
                                day < selectedEnd;

                            return (
                                <div
                                    key={`oct-${day}`}
                                    onClick={() => handleDayClick(day)}
                                    className={`group relative flex h-10 cursor-pointer items-center justify-center ${
                                        inRange ? "bg-surface-secondary" : ""
                                    } ${isStart ? "rounded-l-full bg-linear-to-r from-transparent to-surface-secondary" : ""} ${
                                        isEnd
                                            ? "rounded-r-full bg-linear-to-l from-transparent to-surface-secondary"
                                            : ""
                                    }`}
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                                            isStart || isEnd
                                                ? "bg-black font-bold text-white"
                                                : inRange
                                                  ? "font-semibold text-content-primary"
                                                  : "hover:border hover:border-black"
                                        }`}
                                    >
                                        {day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="mb-4 flex items-center justify-between text-[16px] font-semibold text-content-primary">
                        <div className="hidden w-8 md:block" />
                        <span>November 2026</span>
                        <button
                            type="button"
                            aria-label="Next month"
                            className="cursor-pointer rounded-full p-2 hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-content-secondary">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-center text-[14px] font-medium text-content-primary">
                        {Array.from({ length: novStartDayOfWeek }).map((_, i) => (
                            <div key={`empty-nov-${i}`} className="h-10" />
                        ))}
                        {Array.from({ length: daysInNov }).map((_, i) => {
                            const day = i + 1;
                            const isFaded = day > 15;
                            return (
                                <div
                                    key={`nov-${day}`}
                                    className="flex h-10 items-center justify-center"
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                            isFaded
                                                ? "text-neutral-400"
                                                : "cursor-pointer text-content-primary hover:border hover:border-black"
                                        }`}
                                    >
                                        {day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex max-w-2xl items-center justify-between pt-6">
                <button
                    type="button"
                    aria-label="Keyboard shortcuts"
                    className="rounded-lg p-2 text-content-primary hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                >
                    <Keyboard className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="cursor-pointer text-[14px] font-semibold text-content-primary underline hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden"
                >
                    Clear dates
                </button>
            </div>
        </div>
    );
};
