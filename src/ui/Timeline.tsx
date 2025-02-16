import { FC, MouseEvent } from "react";

import { ProgressBar } from "./";

import { durationFormat } from "../helpers";

import { TimelineProps } from "../types";

export const Timeline: FC<TimelineProps> = ({...props}) => {

    const { currentTime, totalTime, progress, onSeek } = props;
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
        <div className="flex flex-col gap-1 flex-grow">
            <div onClick={handleSeek} className="relative duration-300 w-full h-2 hover:h-3 bg-white/20 rounded-full group cursor-pointer">
                <ProgressBar progress={progress} />
            </div>
            <div className="flex items-center justify-between pointer-events-none">
                <p>{currentDuration}</p>
                <p>{totalDuration}</p>
            </div>
        </div>
    )
}