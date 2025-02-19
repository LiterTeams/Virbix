"use client";
import { useMemo } from "react";
import { useMusic } from "../hooks";
import { IcoPlay, IcoPause, IcoRepeat, IcoForwardBack, IcoForwardNext, IcoVolume, IcoVolumeMute } from "../icons";
import { Button, VolumeSlider } from "./";

export const PlayControls = () => {
    
    const { iconSize, player, playback, shortcuts } = useMusic();
    const { volumeControlRef } = shortcuts;
    const { track, trackList, volume, isPlaying, isEnded, isMuted } = player;
    const { handleTogglePlay, handleRepeat, toggleMute, handlePrevTrack, handleNextTrack } = playback;

    const togglePlay = () => {
        if (!track) return;
        if (!isEnded) handleTogglePlay(track.source);
        else handleRepeat();
    }

    const volumeIcon = useMemo(() => (isMuted || volume <= 0 ? <IcoVolumeMute size={iconSize} /> : <IcoVolume size={iconSize} />),[isMuted, volume, iconSize]);

    return(
        <div className="flex items-center flex-shrink-0 gap-2">
            <Button disabled={trackList.length <= 1} className="hidden group lg:flex" onClick={handlePrevTrack}>
                <IcoForwardBack size={iconSize} />
            </Button>
            <Button className="group" onClick={togglePlay}>
                {isEnded ? <IcoRepeat className="group-hover:rotate-90 duration-300" size={iconSize} /> : isPlaying ? <IcoPause size={iconSize} /> : <IcoPlay size={iconSize} />}
            </Button>
            <Button disabled={trackList.length <= 1} className="hidden lg:flex" onClick={handleNextTrack}>
                <IcoForwardNext size={iconSize} />
            </Button>
            <div ref={volumeControlRef} className="hidden lg:flex items-center gap-2 group">
                <Button onClick={toggleMute}>{volumeIcon}</Button>
                <VolumeSlider />
            </div>
        </div>
    )
}