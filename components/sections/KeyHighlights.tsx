"use client";

import React from "react";
import { Sun, Wind, KeyRound } from "lucide-react";

interface KeyHighlightsProps {
    highlights: {
        icon: string;
        title: string;
        description: string;
    }[];
}

export const KeyHighlights: React.FC<KeyHighlightsProps> = ({ highlights }) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "umbrella":
            case "sun":
                return <Sun className="h-6 w-6 stroke-[1.5] text-content-primary" />;
            case "wind":
                return <Wind className="h-6 w-6 stroke-[1.5] text-content-primary" />;
            case "key":
            default:
                return <KeyRound className="h-6 w-6 stroke-[1.5] text-content-primary" />;
        }
    };

    return (
        <div className="space-y-6 border-b border-border-primary py-8">
            {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-5">
                    <div className="mt-0.5">{getIcon(h.icon)}</div>
                    <div>
                        <h3 className="text-[16px] font-semibold text-content-primary">
                            {h.title}
                        </h3>
                        <p className="text-[14px] leading-relaxed text-content-secondary">
                            {h.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
