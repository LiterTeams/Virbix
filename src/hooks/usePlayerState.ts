"use client";
import { SyntheticEvent, useCallback, useState } from "react";
import { TrackProps } from "../types";

import { UsePlayerStateProps, UsePlayerProps } from "../types";

export const usePlayerState = ({ loop = false, mute = false, volume= 0.25, tracks = [] }: UsePlayerProps = {}) => {
    const [trackList, setTrackList] = useState<TrackProps[]>(tracks);
    const [state, setState] = useState<UsePlayerStateProps>({
        track: trackList[0],
        volume: volume,
        currentTime: 0,
        totalTime: 0,
        error: null as string | null,
        isError: false,
        isPlaying: false,
        isLoading: true,
        isEnded: false,
        isLooped: loop,
        isMuted: mute,
    });

    const setPlayerState = useCallback(
        (newState: Partial<typeof state>) => setState(prev => ({ ...prev, ...newState })),
    []);

    const handleError = useCallback((event: SyntheticEvent<HTMLAudioElement, Event>) => {
        event.preventDefault();
        setPlayerState({ isError: event.isTrusted, error: event.type})
    },[setPlayerState]);

    return {
        ...state,
        trackList,
        setPlayerState,
        handleError,
        setTrackList,
    };

}