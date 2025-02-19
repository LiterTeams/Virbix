import { Dispatch, RefObject, SetStateAction } from "react";
import { TrackProps } from "./";

export interface UsePlayerStateProps {
    track: TrackProps | null;
    error: string | null;
    volume: number;
    currentTime: number;
    totalTime: number;
    isError: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    isEnded: boolean;
    isLooped: boolean;
    isMuted: boolean;
}

export interface UsePlayerProps {
    loop?: boolean;
    mute?: boolean;
    volume?: number;
    tracks?: TrackProps[];
}

export interface UsePlayerVFXProps {
    ambientMode?: boolean;
}

export interface UseTimelineProps extends Pick<UsePlayerStateProps, "totalTime"> {
    audioRef: RefObject<HTMLAudioElement | null>;
    skipTime?: string;
}

export interface UsePlayerPlaybackProps extends Pick<UsePlayerStateProps, "track"|"isError"|"isLooped"|"isMuted"|"totalTime"|"volume"> {
    audioRef: RefObject<HTMLAudioElement | null>;
    isClose: boolean;
    trackList: TrackProps[];
    setPlayerState: (state: Partial<UsePlayerStateProps>) => void; 
    startAnimation: () => void;
    stopAnimation: () => void;
    toggleClose: () => void;
    setTrackList: Dispatch<SetStateAction<TrackProps[]>>; 
    timeSkip: (direction: "forward" | "backward") => void;
}

export interface UseAudioShortcutsProps extends Pick<UsePlayerStateProps, "volume"> {
    handleForwardSkip: () => void;
    handleBackwardSkip: () => void;
    toggleMute: () => void;
    toggleLoop: () => void;
    handleTogglePlay: () => void;
    handleRepeat: () => void;
    handleToggleClose: () => void;
    toggleCollapse: () => void;
    handleNextTrack: () => void;
    handlePrevTrack: () => void;
    handleShuffleTrackList: () => void;
    toggleAmbientMode: () => void;
    handleVolumeChange: (newVolume: number) => void;
}