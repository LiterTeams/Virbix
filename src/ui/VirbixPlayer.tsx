"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { IcoArrowDown, IcoClose } from "../icons";
import { OverlayVFX, Controls, Audio, TrackDetails, Button } from ".";

export const VirbixPlayer: FC = () => {
    const { audioRef, player, timeline, playback, ui, vfx } = useMusic();

    const audioProps = {
        audioRef,
        ...player,
        ...playback,
        preload: "auto" as "metadata" | "auto" | "none",
    };

    const controlsProps = {
        ...player,
        ...playback,
        ...vfx,
        ...timeline,
        iconSize: 24,
    };

    const vfxProps = {
        audioRef,
        ...vfx,
    }

    const className = `fixed duration-300 flex items-center z-10 right-0 bottom-0 min-h-24 w-full backdrop-blur-sm border-t border-white/15 p-6 ${ui.isCollapse ? "translate-y-64" : "translate-y-0"} ${!player.source || ui.isClose ? "opacity-0 pointer-events-none" : "opacity-100"}`

    return (
        <div className={className}>
            <Audio {...audioProps} />
            <TrackDetails {...player.trackInfo} />
            <OverlayVFX {...vfxProps} />
            <Controls {...controlsProps} />
            <div className={`absolute gap-3 duration-300 flex items-center p-2 justify-center rounded-full right-6 ${ui.isCollapse ? "-translate-y-64" : "-translate-y-16"}`}>
                <Button onClick={ui.toggleCollapse} active={ui.isCollapse}>
                    <IcoArrowDown size={24} className={`duration-300 ${ui.isCollapse && "rotate-180"}`} />
                </Button>
                <Button onClick={playback.handleToggleClose}>
                    <IcoClose size={24} />
                </Button>
            </div>
        </div>
    );
};
