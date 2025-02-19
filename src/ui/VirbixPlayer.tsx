"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { IcoArrowDown, IcoClose } from "../icons";
import { OverlayVFX, Controls, Audio, TrackDetails, Button } from ".";

export const VirbixPlayer: FC = () => {
    const { player, playback, ui } = useMusic();
    const { track } = player;
    const { isCollapse, isClose, toggleCollapse } = ui;
    const { handleToggleClose } = playback;

    const className = `fixed duration-300 flex items-center z-10 right-0 bottom-0 min-h-24 w-full backdrop-blur-sm border-t border-white/15 p-2 xl:p-6 ${isCollapse ? "translate-y-64" : "translate-y-0"} ${!track || isClose ? "opacity-0 pointer-events-none" : "opacity-100"}`

    return (
        <div className={className}>
            <Audio />
            <TrackDetails />
            <OverlayVFX />
            <Controls />
            <div className={`xl:absolute gap-3 duration-300 flex items-center xl:p-2 justify-center rounded-full xl:right-6 ${isCollapse ? "xl:-translate-y-64" : "xl:-translate-y-16"}`}>
                <Button className="hidden xl:block" onClick={toggleCollapse} active={isCollapse}>
                    <IcoArrowDown size={24} className={`duration-300 ${isCollapse && "rotate-180"}`} />
                </Button>
                <Button onClick={handleToggleClose}>
                    <IcoClose size={24} />
                </Button>
            </div>
        </div>
    );
};
