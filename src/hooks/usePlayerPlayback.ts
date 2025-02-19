"use client";
import { useCallback } from "react";
import { TrackInfoProps, UsePlayerPlaybackProps } from "../types";

export const usePlayerPlayback = ({
    audioRef,isError,isLooped,isMuted,totalTime,
    volume,isClose,track,trackList,
    startAnimation,stopAnimation,timeSkip,
    setPlayerState, toggleClose, setTrackList,
}:UsePlayerPlaybackProps) => {

    const withAudioRef = <T extends (this: HTMLAudioElement, ...args: Parameters<T>) => ReturnType<T>>(fn: T) => {
        return function (...args: Parameters<T>): ReturnType<T> | undefined {
            const audio = audioRef.current;
            if (!audio || isError) return;
            return fn.apply(audio, args);
        };
    };

    const handleTimeUpdate = withAudioRef(function () {
        const currentTime = this.currentTime;
        setPlayerState({ currentTime });
        if (this.ended || Math.abs(currentTime - totalTime) < 0.1){ handleEnded(); return}
        setPlayerState({ isEnded: false })
    });

    const handleLoadedMetadata = withAudioRef(function () {
        setPlayerState({ totalTime: this.duration, isLoading: false });
    });

    const handleForwardSkip = () => timeSkip("forward");
    const handleBackwardSkip = () => timeSkip("backward");
    const toggleMute = () => setPlayerState({isMuted: !isMuted});
    const toggleLoop = () => setPlayerState({isLooped: !isLooped});

    const handlePlay = withAudioRef(function () {
        this.play();
        if (isClose) toggleClose();
        setPlayerState({ isPlaying: true });
        startAnimation();
    });

    const handlePause = withAudioRef(function () {
        this.pause();
        setPlayerState({ isPlaying: false });
        stopAnimation();
    });

    const setAudioSrc = withAudioRef(async function (url: string, trackInfo: TrackInfoProps = { name: "Unknown" }): Promise<void> {
        if (!url) return;
    
        this.src = url;
        this.load();
        this.volume = volume;
        const newTrack = { source: url, info: trackInfo };
        
        setPlayerState({
            track: newTrack,
            isLoading: true
        });
    
        if (!trackList.some(trackItem => trackItem.source === newTrack.source)){
            setTrackList(prev => [...prev, newTrack]);
        }
    
        this.addEventListener("loadedmetadata", () => {
            setPlayerState({ totalTime: this.duration, isLoading: false });
            handlePlay();
        }, { once: true });
    });

    const handleTogglePlay = withAudioRef(function (url?: string, trackInfo?: TrackInfoProps) {
        if (url && (!track || track.source !== url)) {
            setAudioSrc(url, trackInfo);
            return;
        }
        if (this.paused) {
            handlePlay();
            return;
        }
        handlePause();
    });

    const handleEnded = () => {
        if (isError) return;
        setPlayerState({ isPlaying: false, isEnded: true });
        stopAnimation();
        handleNextTrack();
    };

    const handleRepeat = () => {
        if (!audioRef.current || isError) return;
        audioRef.current.currentTime = 0;
        handlePlay();
    };

    const handleShuffleTrackList = useCallback(() => {
        if (trackList.length <= 1 || !track) return;
        setTrackList((prev) => {
            const shuffledList = prev.filter(trackItem => trackItem.source !== track.source).sort(() => Math.random() - 0.5);
            return [track, ...shuffledList];
        });
    },[setTrackList, track, trackList.length]);

    const handleVolumeChange = withAudioRef(function (newVolume: number) {
        setPlayerState({volume: newVolume});
        this.volume = newVolume;
    });

    const handleToggleClose = withAudioRef(function () {
        handlePause();
        toggleClose();
    });

    const changeTrack = useCallback((direction: 1 | -1) => {
        if (!track || trackList.length <= 1) return;
    
        const currentIndex = trackList.findIndex((trackItem) => trackItem.source === track.source);
        if (currentIndex === -1) return;
    
        const trackIndex = (currentIndex + direction + trackList.length) % trackList.length;
        const newTrack = trackList[trackIndex];
        setAudioSrc(newTrack.source, newTrack.info);
    },[setAudioSrc, track, trackList]);

    const handleNextTrack = useCallback(() => changeTrack(+1),[changeTrack]);
    const handlePrevTrack = useCallback(() => changeTrack(-1),[changeTrack]);

    const onSeek = withAudioRef(function (time: number) {
        this.currentTime = time;
    });

    return {
        handleTogglePlay,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        handleVolumeChange,
        handleToggleClose,
        handleNextTrack,
        handlePrevTrack,
        handleShuffleTrackList,
        toggleMute,
        toggleLoop,
        onSeek,
    };
};