"use client";
import { FC } from "react";
import { useMusic } from "../hooks";

import { ProgressBar } from "./";

import { durationFormat } from "../helpers";

export const Timeline: FC = () => {
    const { player, timeline } = useMusic();
    const { currentTime, totalTime } = player;
    const { handleManualRewind } = timeline;

    const currentDuration = durationFormat(currentTime);
    const totalDuration = durationFormat(totalTime);

    return(
        <div className="absolute left-0 top-0 w-full xl:relative xl:left-auto xl:top-auto xl:w-auto flex flex-col gap-1 flex-grow">
            <div onClick={handleManualRewind} className="relative duration-300 w-full h-1 xl:h-2 xl:hover:h-3 bg-white/20 xl:rounded-full group cursor-pointer">
                <ProgressBar />
            </div>
            <div className="hidden xl:flex items-center justify-between pointer-events-none">
                <p>{currentDuration}</p>
                <p>{totalDuration}</p>
            </div>
        </div>
    )
}