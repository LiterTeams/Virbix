import { ReactNode, Ref, RefObject, SyntheticEvent } from "react";
import { UsePlayerStateProps } from "./index";

type PlayerThemeT = "default" | "spotify" | "vk" | "custom";

export interface IconProps {
    color?: string;
    size?: number;
    className?: string;
}
export interface AuthorProps {
    id: number;
    name: string;
    url?: string;
}
export interface TrackInfoProps {
    name: string;
    description?: string;
    image?: string;
    author?: AuthorProps;
}
export interface TrackProps {
    source: string;
    info: TrackInfoProps;
}
export interface SourceProps {
    src: string;
    mimetype: string;
}
export interface OverlayProps {
    className?: string;
    children?: ReactNode;
}
export interface PlayerProps {
    audioRef: Ref<HTMLAudioElement>;
    isCollapse?: boolean;
    name?: string;
    image?: string;
    author?: AuthorProps;
    description?: string;
    iconSize?: number;
    timeSkip?: string;
    theme?: PlayerThemeT;
    source: string | null;
    loop?: boolean;
    ambientMode?: boolean;
    className?: string;
    preload?: "none" | "metadata" | "auto";
    children?: ReactNode;
    toggleCollapse: () => void;
}
export interface AudioProps extends Pick<PlayerProps, "preload"|"source"> {
    audioRef: RefObject<HTMLAudioElement | null>;
    isLooped: boolean;
    isMuted: boolean;
    handleLoadedMetadata: () => void;
    handleTimeUpdate: () => void;
    handleError: (event: SyntheticEvent<HTMLAudioElement, Event>) => void;
}
export interface ControlsProps extends 
    Pick<UsePlayerStateProps,
    | "isPlaying" 
    | "isEnded"
    | "isMuted"
    | "source"
    | "isLooped"
    | "volume"
    | "currentTime"
    | "totalTime"
> {
    progress: number;
    iconSize?: number;
    useAmbientMode: boolean;
    toggleAmbientMode: () => void;
    toggleLoop: () => void;
    toggleMute: () => void;
    onSeek: (time: number) => void;
    handleForwardSkip: () => void;
    handleBackwardSkip: () => void;
    handleTogglePlay: (url?: string) => void;
    handleVolumeChange: (newVolume: number) => void;
    handleRepeat: () => void;
}

export type PlayControlsProps =
    Pick<PlayerProps, 
    | "source"
> &
    Pick<ControlsProps, 
    | "isPlaying"
    | "isEnded" 
    | "isMuted" 
    | "volume" 
    | "iconSize" 
    | "handleForwardSkip" 
    | "handleBackwardSkip" 
    | "handleTogglePlay" 
    | "toggleMute" 
    | "handleVolumeChange" 
    | "handleRepeat"
>
export type PreferenseControlsProps = 
    Pick<ControlsProps, 
    | "useAmbientMode" 
    | "iconSize" 
    | "isLooped" 
    | "toggleLoop" 
    | "toggleAmbientMode"
>
export type TimelineProps = 
    Pick<ControlsProps, 
    | "progress" 
    | "currentTime" 
    | "totalTime" 
    | "onSeek"
>
export type ProgressBarProps = 
    Pick<TimelineProps, 
    | "progress"
>
export type OverlayVFXProps = 
    Pick<ControlsProps, 
    | "useAmbientMode"
> & Pick<AudioProps,
    | "audioRef"
>