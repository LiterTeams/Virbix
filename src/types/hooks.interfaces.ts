import { RefObject } from "react";
import { TrackInfoProps, TrackProps } from "./";

interface UsePlayerStateProps {
    source: string | null;
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

interface UsePlayerProps {
    loop?: boolean;
    mute?: boolean;
    volume?: number;
    tracks?: TrackProps[];
}

interface UsePlayerVFXProps {
    ambientMode?: boolean;
}

interface UseTimelineProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    timeSkip?: string;
}

interface UsePlayerPlaybackProps extends Pick<UsePlayerStateProps, "source"|"isError"|"isLooped"|"isMuted"|"totalTime"|"volume"> {
    audioRef: RefObject<HTMLAudioElement | null>;
    isClose: boolean;
    setPlayerState: (state: Partial<UsePlayerStateProps>) => void; 
    updateTrackInfo: (trackDataInfo: TrackInfoProps) => void;
    startAnimation: () => void;
    stopAnimation: () => void;
    toggleClose: () => void;
    skipTime: (direction: "forward" | "backward") => void;
}

export type { UsePlayerStateProps, UsePlayerProps, UsePlayerVFXProps, UseTimelineProps, UsePlayerPlaybackProps }