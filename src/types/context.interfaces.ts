import { RefObject } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI, useModal } from "../hooks";

interface MusicContextProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    iconSize: number;
    player: ReturnType<typeof usePlayerState>;
    timeline: ReturnType<typeof useTimeline>;
    playback: ReturnType<typeof usePlayerPlayback>;
    ui: ReturnType<typeof usePlayerUI>;
    vfx: ReturnType<typeof usePlayerVFX>;
    modal: ReturnType<typeof useModal>;
}

export type { MusicContextProps }