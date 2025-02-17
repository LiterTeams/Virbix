"use client";
import { FC } from "react";
import { useMusic } from "../hooks";

import { IcoPlay, IcoPause, IcoRepeat, IcoForwardBack, IcoForwardNext, IcoVolume, IcoVolumeMute } from "../icons";

import { Button, VolumeSlider } from "./";

export const PlayControls: FC = () => {
    const { iconSize, player, playback } = useMusic();
    const { source, volume, isPlaying, isEnded, isMuted } = player;
    const { handleTogglePlay, handleRepeat, toggleMute, handleBackwardSkip, handleForwardSkip } = playback;

    const togglePlay = () => {
        if (!isEnded) handleTogglePlay(source as string);
        else handleRepeat();
    }

    return(
        <div className="flex items-center flex-shrink-0 gap-2">
            <Button className="hidden group lg:flex" onClick={handleBackwardSkip}>
                <IcoForwardBack size={iconSize} />
            </Button>
            <Button className="group" onClick={togglePlay}>
                {!isEnded && (isPlaying ? <IcoPause size={iconSize} /> : <IcoPlay size={iconSize} />)}
                {isEnded && <IcoRepeat className="group-hover:rotate-90 duration-300" size={iconSize} />}
            </Button>
            <Button className="hidden lg:flex" onClick={handleForwardSkip}>
                <IcoForwardNext size={iconSize} />
            </Button>
            <div className="hidden lg:flex items-center gap-2 group">
                <Button onClick={toggleMute}>
                    {isMuted || volume <= 0 ? <IcoVolumeMute size={iconSize} /> : <IcoVolume size={iconSize} />}
                </Button>
                <VolumeSlider />
            </div>
        </div>
    )
}