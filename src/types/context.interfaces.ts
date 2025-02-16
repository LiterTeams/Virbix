import { RefObject } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI } from "../hooks";

interface MusicContextProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    player: ReturnType<typeof usePlayerState>;
    timeline: ReturnType<typeof useTimeline>;
    playback: ReturnType<typeof usePlayerPlayback>;
    ui: ReturnType<typeof usePlayerUI>;
    vfx: ReturnType<typeof usePlayerVFX>;
}

export type { MusicContextProps }