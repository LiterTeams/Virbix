"use client";
import { useEffect, useCallback, useRef } from "react";
import { useIsMac } from "./";
import { UseAudioShortcutsProps } from "../types";

export const usePlayerShortcuts = ({
    volume,handleForwardSkip,handleBackwardSkip,toggleMute,
    toggleLoop,handleTogglePlay,handleRepeat,handleToggleClose,
    handleVolumeChange,toggleCollapse,handleNextTrack,handlePrevTrack,
    toggleAmbientMode, handleShuffleTrackList,
}:UseAudioShortcutsProps) => {
    const volumeControlRef = useRef<HTMLDivElement | null>(null);
    const isMacOS = useIsMac();

    const handleTimeSkip = useCallback((event: KeyboardEvent) => {
        if (event.altKey && event.code === "ArrowRight") handleForwardSkip();
        else if (event.altKey && event.code === "ArrowLeft") handleBackwardSkip();
    },[handleBackwardSkip, handleForwardSkip]);

    const handleTrackSkip = useCallback((event: KeyboardEvent) => {
        const isCommand = isMacOS ? event.metaKey : event.ctrlKey;
        if (isCommand && event.code === "ArrowLeft") handlePrevTrack();
        else if (isCommand && event.code === "ArrowRight") handleNextTrack();
    },[isMacOS, handlePrevTrack, handleNextTrack]);

    const handleVolume = useCallback((event: KeyboardEvent) => {
        const isCommand = isMacOS ? event.metaKey : event.ctrlKey;
        if (isCommand && event.code === "ArrowUp" && volume !== 1) handleVolumeChange(Math.min(1, volume + 0.05));
        else if (isCommand && event.code === "ArrowDown" && volume !== 0) handleVolumeChange(Math.max(0, volume - 0.05));
    },[volume, isMacOS, handleVolumeChange]);

    const handleScrollVolume = useCallback((event: WheelEvent) => {
        if (event.target === volumeControlRef.current) { 
            event.preventDefault();
            const volumeChange = event.deltaY > 0 ? -0.025 : 0.025;
            const newVolume = Math.min(1, Math.max(0, volume + volumeChange));
            handleVolumeChange(newVolume);
        }
    },[handleVolumeChange, volume]);

    const handlePlaybackControls = useCallback((event: KeyboardEvent) => {
        const isCommand = isMacOS ? event.metaKey : event.ctrlKey;
        if (event.code === "Space") handleTogglePlay();
        else if (isCommand && event.code === "KeyM") toggleMute();
        else if (isCommand && event.code === "KeyL") toggleLoop();
        else if (isCommand && event.code === "KeyR") handleRepeat();
        else if (isCommand && event.code === "KeyS") handleShuffleTrackList();
        else if (isCommand && event.code === "KeyH") toggleCollapse();
        else if (isCommand && event.code === "KeyC") handleToggleClose();
        else if (isCommand && event.code === "KeyE") toggleAmbientMode();
    },[isMacOS, handleTogglePlay, toggleMute, toggleLoop, handleRepeat, handleShuffleTrackList, toggleCollapse, handleToggleClose, toggleAmbientMode]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            handleTimeSkip(event);
            handleTrackSkip(event);
            handleVolume(event);
            handlePlaybackControls(event);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePlaybackControls, handleTimeSkip, handleTrackSkip, handleVolume]);

    useEffect(() => {
        const volumeDiv = volumeControlRef.current;
        if (!volumeDiv) return;

        volumeDiv.addEventListener("wheel", handleScrollVolume, { passive: false });

        return () => volumeDiv.removeEventListener("wheel", handleScrollVolume);
    }, [handleScrollVolume, volumeControlRef]);

    return { volumeControlRef }
};