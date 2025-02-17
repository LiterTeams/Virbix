"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { IcoMusic } from "../icons";
import { CustomImage } from "./";

export const TrackDetails: FC = () => {
    const { iconSize, player } = useMusic();
    const { name, description, image, author } = player.trackInfo;

    return(
        <div className="flex items-center gap-3 xl:gap-6">
            <div className="relative size-10 xl:size-14 flex bg-neutral-950 justify-center items-center overflow-hidden rounded-full">
                {image && <CustomImage quality={75} loading="lazy" className="object-cover" fill src={image} alt={name} />}
                {!image && <IcoMusic size={iconSize} />}
            </div>
            <div>
                <h2 className="text-xs max-w-56 overflow-hidden text-nowrap xl:text-wrap xl:w-auto xl:text-lg text-white font-semibold">{name}</h2>
                {description && <p className="text-neutral-200 text-sm">{description}</p>}
            </div>
        </div>
    )
}