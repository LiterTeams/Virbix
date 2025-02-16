"use client";
import { useState, useRef, useEffect } from "react";

import { parseTime } from "../helpers";

import { UseTimelineProps } from "../types";

export const useTimeline = ({ audioRef, timeSkip = "15s" }: UseTimelineProps) => {
    const skip = parseTime(timeSkip);
    const [progress, setProgress] = useState(0);
    const animationRef = useRef<number | null>(null);

    const updateProgress = () => {
        if (!audioRef.current) return;
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 1;
        setProgress((currentTime / duration) * 100);
        animationRef.current = requestAnimationFrame(updateProgress);
    };

    const startAnimation = () => {
        if (!audioRef.current) return;
        animationRef.current = requestAnimationFrame(updateProgress);
    };

    const stopAnimation = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    const skipTime = (direction: "forward" | "backward") => {
        if (!audioRef.current) return;
        const currentTime = audioRef.current.currentTime;
        const currentDuration = audioRef.current.duration;
        const newTime = currentTime + (direction === "forward" ? skip : -skip);
        audioRef.current.currentTime = Math.max(0, Math.min(currentDuration, newTime));
    };

    useEffect(() => {
        return () => stopAnimation();
    }, []);

    return { progress, startAnimation, stopAnimation, skipTime };
};
