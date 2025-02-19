"use client";
import { createContext, ReactNode, useMemo, useRef } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI, useModal, usePlayerShortcuts } from "../hooks";
import { VirbixPlayer } from ".";

import { MusicContextProps } from "../types";

export const MusicContext = createContext<MusicContextProps | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const iconSize = 18;
    const crossOrigin: "anonymous" | "use-credentials" = "use-credentials";
    const player = usePlayerState({ volume: 0.05 });
    const timeline = useTimeline({ audioRef, totalTime: player.totalTime });
    const ui = usePlayerUI();
    const playback = usePlayerPlayback({ audioRef, ...timeline, ...player, ...ui });
    const vfx = usePlayerVFX();
    const modal = useModal();
    const shortcuts = usePlayerShortcuts({ ...player, ...playback, ...ui, ...vfx });
    
    const contextValue = useMemo(
        () => ({ audioRef, crossOrigin, iconSize, player, timeline, ui, playback, vfx, modal, shortcuts }),
        [player, timeline, ui, playback, vfx, modal, shortcuts]
    );

    return (
        <MusicContext.Provider value={contextValue}>
            {children}
            <VirbixPlayer />
        </MusicContext.Provider>
    );
};
