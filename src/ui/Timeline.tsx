"use client";
import { FC, MouseEvent } from "react";
import { useMusic } from "../hooks";

import { ProgressBar } from "./";

import { durationFormat } from "../helpers";

export const Timeline: FC = () => {
    const { player, playback } = useMusic();
    const { currentTime, totalTime } = player;
    const { onSeek } = playback;

    const currentDuration = durationFormat(currentTime);
    const totalDuration = durationFormat(totalTime);

    const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
        if (totalTime <= 0) return;

        const timeline = e.currentTarget;
        const rect = timeline.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / rect.width) * totalTime;

        onSeek(newTime);
    };

    return(
        <div className="absolute left-0 top-0 w-full xl:relative xl:left-auto xl:top-auto xl:w-auto flex flex-col gap-1 flex-grow">
            <div onClick={handleSeek} className="relative duration-300 w-full h-1 xl:h-2 xl:hover:h-3 bg-white/20 xl:rounded-full group cursor-pointer">
                <ProgressBar />
            </div>
            <div className="hidden xl:flex items-center justify-between pointer-events-none">
                <p>{currentDuration}</p>
                <p>{totalDuration}</p>
            </div>
        </div>
    )
}