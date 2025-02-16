"use client";
import { FC } from "react";

import { AudioProps } from "../types";

export const Audio: FC<AudioProps> = ({...props}) => {

    const { audioRef, isLooped, isMuted, source, preload } = props;
    const { handleLoadedMetadata, handleTimeUpdate, handleError } = props;

    return(
        <audio
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={(event) => handleError(event)}
            ref={audioRef}
            crossOrigin="use-credentials"
            loop={isLooped}
            muted={isMuted}
            preload={preload}
            hidden
        >
            {source && typeof source == "object"
            ? <source src={source.src} type={`audio/${source.mimetype}`} />
            : <source src={source || undefined} />
            }
        </audio>
    )

}