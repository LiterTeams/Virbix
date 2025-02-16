"use client";
import { SyntheticEvent, useCallback, useState } from "react";
import { TrackInfoProps } from "../types";

import { UsePlayerStateProps, UsePlayerProps } from "../types";

export const usePlayerState = ({ loop = false, mute = false, volume= 0.25 }: UsePlayerProps = {}) => {
    const [trackInfo, setTrackInfo] = useState<TrackInfoProps>({ name: "Unknown" });
    // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    // const [trackList, setTrackList] = useState<TrackProps[]>(tracks);
    const [state, setState] = useState<UsePlayerStateProps>({
        source: null as string | null,
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

    const updateTrackInfo = useCallback((trackDataInfo?: TrackInfoProps) => {
        if (!trackDataInfo) return;
        setTrackInfo(prev => ({ ...prev, ...trackDataInfo }));
    }, []);

    // const playNextTrack = useCallback(() => {
    //     setCurrentTrackIndex(prevIndex => {
    //         const index = (prevIndex + 1) % trackList.length;
    //         setTrackInfo(trackList[index].info);
    //         setPlayerState({ source: trackList[index].source, isPlaying: true });
    //         return index;
    //     });
    // }, [trackList, setPlayerState]);

    // const playPrevTrack = useCallback(() => {
    //     setCurrentTrackIndex(prevIndex => {
    //         const index = (prevIndex - 1 + trackList.length) % trackList.length;
    //         setTrackInfo(trackList[index].info);
    //         setPlayerState({ source: trackList[index].source, isPlaying: true });
    //         return index;
    //     });
    // }, [trackList, setPlayerState]);

    return {
        ...state,
        trackInfo,
        // trackList,
        // currentTrackIndex,
        setPlayerState,
        updateTrackInfo,
        handleError,
        // playPrevTrack,
        // playNextTrack,
    };

}