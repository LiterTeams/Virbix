"use client";
import { FC } from "react";
import { useMusic } from "../hooks";

export const Audio: FC = () => {
    const { audioRef, player, playback } = useMusic();
    const { source, isLooped, isMuted, handleError } = player;
    const { handleTimeUpdate, handleLoadedMetadata } = playback;

    return(
        <audio
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={(event) => handleError(event)}
            ref={audioRef}
            crossOrigin="use-credentials"
            loop={isLooped}
            muted={isMuted}
            preload="auto"
            hidden
        >
            {source && typeof source == "object"
            ? <source src={source.src} type={`audio/${source.mimetype}`} />
            : <source src={source || undefined} />
            }
        </audio>
    )

}