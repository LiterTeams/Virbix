"use client";
import { createContext, ReactNode, useRef } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI, useModal } from "../hooks";
import { VirbixPlayer } from ".";

import { MusicContextProps } from "../types";

export const MusicContext = createContext<MusicContextProps | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const iconSize = 18;
    const player = usePlayerState({volume: .05});
    const timeline = useTimeline({audioRef});
    const ui = usePlayerUI();
    const playback = usePlayerPlayback({audioRef, ...timeline, ...player, ...ui });
    const vfx = usePlayerVFX();
    const modal = useModal();
    
    return (
        <MusicContext.Provider value={{ audioRef, iconSize, player, timeline, ui, playback, vfx, modal }}>
            {children}
            <VirbixPlayer />
        </MusicContext.Provider>
    );
};
