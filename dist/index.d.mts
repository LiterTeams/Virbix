import * as react from 'react';
import { RefObject, SyntheticEvent, ReactNode, FC } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface AuthorProps {
    id: number;
    name: string;
    url?: string;
}
interface TrackInfoProps {
    name: string;
    description?: string;
    image?: string;
    author?: AuthorProps;
}
interface TrackProps {
    source: string;
    info: TrackInfoProps;
}

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
interface UsePlayerPlaybackProps extends Pick<UsePlayerStateProps, "source" | "isError" | "isLooped" | "isMuted" | "totalTime" | "volume"> {
    audioRef: RefObject<HTMLAudioElement | null>;
    isClose: boolean;
    setPlayerState: (state: Partial<UsePlayerStateProps>) => void;
    updateTrackInfo: (trackDataInfo: TrackInfoProps) => void;
    startAnimation: () => void;
    stopAnimation: () => void;
    toggleClose: () => void;
    skipTime: (direction: "forward" | "backward") => void;
}

declare const usePlayerState: ({ loop, mute, volume }?: UsePlayerProps) => {
    trackInfo: TrackInfoProps;
    setPlayerState: (newState: Partial<UsePlayerStateProps>) => void;
    updateTrackInfo: (trackDataInfo?: TrackInfoProps) => void;
    handleError: (event: SyntheticEvent<HTMLAudioElement, Event>) => void;
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
};

declare const usePlayerPlayback: ({ audioRef, isError, isLooped, isMuted, totalTime, source, volume, isClose, startAnimation, stopAnimation, skipTime, updateTrackInfo, setPlayerState, toggleClose, }: UsePlayerPlaybackProps) => {
    handleTogglePlay: (url?: string | undefined, trackInfo?: TrackInfoProps | undefined) => void | undefined;
    handleTimeUpdate: () => void | undefined;
    handleLoadedMetadata: () => void | undefined;
    handleRepeat: () => void;
    handleForwardSkip: () => void;
    handleBackwardSkip: () => void;
    handleVolumeChange: (newVolume: number) => void | undefined;
    handleToggleClose: () => void | undefined;
    toggleMute: () => void;
    toggleLoop: () => void;
    onSeek: (time: number) => void | undefined;
};

declare const useTimeline: ({ audioRef, timeSkip }: UseTimelineProps) => {
    progress: number;
    startAnimation: () => void;
    stopAnimation: () => void;
    skipTime: (direction: "forward" | "backward") => void;
};

declare const usePlayerUI: () => {
    isCollapse: boolean;
    toggleCollapse: () => void;
    isClose: boolean;
    toggleClose: () => void;
};

declare const usePlayerVFX: ({ ambientMode }?: UsePlayerVFXProps) => {
    useAmbientMode: boolean;
    toggleAmbientMode: () => void;
};

interface MusicContextProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    player: ReturnType<typeof usePlayerState>;
    timeline: ReturnType<typeof useTimeline>;
    playback: ReturnType<typeof usePlayerPlayback>;
    ui: ReturnType<typeof usePlayerUI>;
    vfx: ReturnType<typeof usePlayerVFX>;
}

declare const useMusic: () => MusicContextProps;

declare const MusicContext: react.Context<MusicContextProps | null>;
declare const MusicProvider: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

declare const VirbixPlayer: FC;

export { MusicContext, MusicProvider, VirbixPlayer, useMusic };
