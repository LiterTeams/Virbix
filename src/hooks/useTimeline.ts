"use client";
import { useState, useRef, useEffect, MouseEvent } from "react";

import { parseTime } from "../helpers";

import { UseTimelineProps } from "../types";

export const useTimeline = ({ audioRef, skipTime = "15s", totalTime }: UseTimelineProps) => {
    const skip = parseTime(skipTime);
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

    const timeSkip = (direction: "forward" | "backward") => {
        if (!audioRef.current) return;
        const currentTime = audioRef.current.currentTime;
        const currentDuration = audioRef.current.duration;
        const newTime = currentTime + (direction === "forward" ? skip : -skip);
        audioRef.current.currentTime = Math.max(0, Math.min(currentDuration, newTime));
    };

    const handleManualRewind = (event: MouseEvent<HTMLDivElement>) => {
        if (totalTime <= 0 || !audioRef.current) return;
        const timeline = event.currentTarget;
        const rect = timeline.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newTime = (offsetX / rect.width) * totalTime;
        audioRef.current.currentTime = newTime;
    };

    useEffect(() => {
        return () => stopAnimation();
    }, []);

    return { progress, startAnimation, stopAnimation, timeSkip, handleManualRewind };
};
