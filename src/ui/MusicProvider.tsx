"use client";
import { createContext, ReactNode, useRef } from "react";
import { usePlayerState, useTimeline, usePlayerPlayback, usePlayerVFX, usePlayerUI } from "../hooks";
import { VirbixPlayer } from "./";

import { MusicContextProps } from "../types";

export const MusicContext = createContext<MusicContextProps | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const player = usePlayerState({volume: .05});
    const timeline = useTimeline({audioRef});
    const ui = usePlayerUI();
    const playback = usePlayerPlayback({audioRef, ...timeline, ...player, ...ui });
    const vfx = usePlayerVFX();
    
    return (
        <MusicContext.Provider value={{ audioRef, player, timeline, ui, playback, vfx }}>
            {children}
            <VirbixPlayer />
        </MusicContext.Provider>
    );
};
