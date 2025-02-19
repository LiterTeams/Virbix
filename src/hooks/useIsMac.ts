"use client";
import { useEffect, useState } from "react";

export const useIsMac = () => {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        if (typeof navigator !== "undefined") {
            setIsMac(navigator.userAgent.toUpperCase().includes("MAC"));
        }
    }, []);

    return isMac;
};
