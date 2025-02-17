"use client";
import { FC } from "react";
import { useMusic } from "../hooks";

export const ProgressBar: FC = () => {
    const { progress } = useMusic().timeline;

    return(
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none bg-neutral-700 xl:rounded-full">
            <div style={{ width: `${progress}%` }} className="h-full bg-orange-500 xl:rounded-full"/>
            <div style={{ left: `${progress - 1}%` }} className="absolute hidden xl:block pointer-events-none top-0 bottom-0 my-auto cursor-pointer bg-orange-500 rounded-full size-3"/>
        </div>
    )
}