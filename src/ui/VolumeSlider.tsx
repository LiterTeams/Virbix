"use client";
import { useEffect, useRef, useCallback } from "react";
import { useMusic } from "../hooks";

export const VolumeSlider = () => {
    const { player, playback } = useMusic();
    const { volume } = player;
    const { handleVolumeChange: volumeChange } = playback;

    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleVolumeChange = useCallback((clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const newVolume = Math.round(((clientX - rect.left) / rect.width) * 100) / 100;
        volumeChange(Math.max(0, Math.min(1, newVolume)));
    },[volumeChange]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        handleVolumeChange(e.clientX);
    };
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            handleVolumeChange(e.clientX);
        }
    },[handleVolumeChange]);

    const handleMouseUp = () => isDragging.current = false;

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={sliderRef}
            className="relative btn-ghost overflow-hidden duration-300 h-2 w-24"
            onMouseDown={handleMouseDown}
        >
            <div className="absolute left-0 h-full bg-white rounded-full" style={{ width: `${volume * 100}%` }}/>
        </div>
    );
}
