"use client";

import { useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            document.body.classList.add("modal-open");
            document.documentElement.classList.add("modal-open");
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.classList.remove("modal-open");
            document.documentElement.classList.remove("modal-open");
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.documentElement.classList.remove("modal-open");
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isLocked]);
}
