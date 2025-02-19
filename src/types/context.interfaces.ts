import { RefObject } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI, useModal, usePlayerShortcuts } from "../hooks";

interface MusicContextProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    iconSize: number;
    crossOrigin: "anonymous" | "use-credentials";
    player: ReturnType<typeof usePlayerState>;
    timeline: ReturnType<typeof useTimeline>;
    playback: ReturnType<typeof usePlayerPlayback>;
    shortcuts: ReturnType<typeof usePlayerShortcuts>;
    ui: ReturnType<typeof usePlayerUI>;
    vfx: ReturnType<typeof usePlayerVFX>;
    modal: ReturnType<typeof useModal>;
}

export type { MusicContextProps }