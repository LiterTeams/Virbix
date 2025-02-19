"use client";
import { useMusic } from "../hooks";

export const Audio = () => {
    const { audioRef, crossOrigin, player: { track, isLooped, isMuted, handleError }, playback: { handleTimeUpdate, handleLoadedMetadata } } = useMusic();
    return(
        <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleError}
            crossOrigin={crossOrigin}
            loop={isLooped}
            muted={isMuted}
            preload="auto"
            hidden
        >
            {track && <source key={track.source} src={track.source || undefined} />}
        </audio>
    )
}