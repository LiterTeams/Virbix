"use client";
import { FC } from "react";

import { PlayControls, Timeline, PreferenseControls } from "./";


import { ControlsProps } from "../types";

export const Controls: FC<ControlsProps> = ({...props}) => {

    const {
        source,
        isPlaying, handleTogglePlay,
        isEnded,
        isMuted, toggleMute,
        volume, handleVolumeChange,
        progress,
        currentTime,
        totalTime,
        iconSize = 18,
        isLooped, toggleLoop,
        useAmbientMode, toggleAmbientMode,
        handleRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        onSeek,
    } = props;

    const PlayControlsProps = { 
        source,
        iconSize,
        volume,
        isPlaying,
        isEnded,
        isMuted,
        handleTogglePlay,
        handleRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        toggleMute,
        handleVolumeChange,
    }

    const TimelineProps = {
        currentTime,
        totalTime,
        progress,
        onSeek,
    }

    const PreferenseControlsProps = { 
        iconSize,
        useAmbientMode,
        isLooped,
        toggleLoop,
        toggleAmbientMode,
    }

    return(
        <div className="flex items-center ml-12 flex-grow gap-6 rounded-xl p-2 pointer-events-auto">
            <PlayControls {...PlayControlsProps} />
            <Timeline {...TimelineProps} />
            <PreferenseControls {...PreferenseControlsProps} />
        </div>
    )
}