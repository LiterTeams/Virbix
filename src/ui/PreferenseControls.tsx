"use client";
import { FC } from "react";
import { useMusic } from "../hooks";

import { IcoReport, IcoEffect, IcoRepeat } from "../icons";

import { Button } from "./";

export const PreferenseControls: FC = () => {
    const { iconSize, player, playback, vfx } = useMusic();
    const { isLooped } = player;
    const { toggleLoop } = playback;
    const { useAmbientMode, toggleAmbientMode } = vfx;

    return(
        <>
            <div className="hidden lg:flex items-center flex-shrink-0 gap-3">
                <Button onClick={toggleLoop} active={isLooped}>
                    <IcoRepeat size={iconSize} />
                </Button>
                <Button onClick={toggleAmbientMode} active={useAmbientMode}>
                    <IcoEffect size={iconSize} />
                </Button>
                <Button>
                    <IcoReport size={iconSize} />
                </Button>
            </div>
        </>
    )
}