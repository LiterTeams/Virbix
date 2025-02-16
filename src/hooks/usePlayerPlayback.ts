"use client";
import { TrackInfoProps } from "../types";

import { UsePlayerPlaybackProps } from "../types";

export const usePlayerPlayback = ({
    audioRef,isError,isLooped,isMuted,totalTime,source,volume,isClose,
    startAnimation,stopAnimation,skipTime,updateTrackInfo,
    setPlayerState, toggleClose,
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

    const handleForwardSkip = () => skipTime("forward");
    const handleBackwardSkip = () => skipTime("backward");
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

    const setAudioSrc = withAudioRef(async function (url: string, trackInfo?: TrackInfoProps): Promise<void> {
        if (!url) return;
        this.src = url;
        this.load();
        this.volume = volume;
        setPlayerState({source: url});
        if (trackInfo) updateTrackInfo(trackInfo);
        setPlayerState({isLoading: true});
        this.onloadedmetadata = () => {
            setPlayerState({totalTime: audioRef.current!.duration, isLoading: false});
            handlePlay();
        };
    });

    const handleTogglePlay = withAudioRef(function (url?: string, trackInfo?: TrackInfoProps) {
        if (url && (!source || source !== url)) {
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
    };

    const handleRepeat = () => {
        if (!audioRef.current || isError) return;
        audioRef.current.currentTime = 0;
        handlePlay();
    };

    const handleVolumeChange = withAudioRef(function (newVolume: number) {
        setPlayerState({volume: newVolume});
        this.volume = newVolume;
    });

    const handleToggleClose = withAudioRef(function () {
        handlePause();
        toggleClose();
    });

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
        toggleMute,
        toggleLoop,
        onSeek,
    };
};