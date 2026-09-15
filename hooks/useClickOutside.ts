"use client";

import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void,
    active: boolean = true
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!active) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handler, active]);

    return ref;
}
