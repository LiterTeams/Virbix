import { FC } from "react";

import { ProgressBarProps } from "../types";

export const ProgressBar: FC<ProgressBarProps> = ({progress}) => {
    return(
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none bg-neutral-700 rounded-full">
            <div style={{ width: `${progress}%` }} className="h-full bg-orange-500 rounded-full"/>
            <div style={{ left: `${progress - 1}%` }} className="absolute pointer-events-none top-0 bottom-0 my-auto cursor-pointer bg-orange-500 rounded-full size-3"/>
        </div>
    )
}