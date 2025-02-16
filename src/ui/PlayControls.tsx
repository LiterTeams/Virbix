"use client";
import { FC } from "react";

import { IcoPlay, IcoPause, IcoRepeat, IcoForwardBack, IcoForwardNext, IcoVolume, IcoVolumeMute } from "../icons";

import { Button, VolumeSlider } from "./";

import { PlayControlsProps } from "../types";

export const PlayControls: FC<PlayControlsProps> = ({...props}) => {

    const { isPlaying, source, isEnded, isMuted, iconSize, volume } = props;
    const { handleTogglePlay, handleRepeat, toggleMute, handleBackwardSkip, handleForwardSkip, handleVolumeChange } = props;

    const currentPercentVolume = volume * 100;

    const togglePlay = () => {
        if (!isEnded) handleTogglePlay(source as string);
        else handleRepeat();
    }

    return(
        <div className="flex items-center flex-shrink-0 gap-2">
            <Button onClick={handleBackwardSkip}>
                <IcoForwardBack size={iconSize} />
            </Button>
            <Button className="group" onClick={togglePlay}>
                {!isEnded && (isPlaying ? <IcoPause size={iconSize} /> : <IcoPlay size={iconSize} />)}
                {isEnded && <IcoRepeat className="group-hover:rotate-90 duration-300" size={iconSize} />}
            </Button>
            <Button onClick={handleForwardSkip}>
                <IcoForwardNext size={iconSize} />
            </Button>
            <div className="flex items-center gap-2 group">
                <Button onClick={toggleMute}>
                    {isMuted || volume <= 0 ? <IcoVolumeMute size={iconSize} /> : <IcoVolume size={iconSize} />}
                </Button>
                <VolumeSlider volume={currentPercentVolume} volumeChange={handleVolumeChange} />
            </div>
        </div>
    )
}