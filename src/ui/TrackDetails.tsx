"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { IcoMusic } from "../icons";
import { CustomImage } from "./";

export const TrackDetails: FC = () => {
    const { name, description, image, author } = useMusic().player.track?.info ?? {name: "Unknown"};
    
    return(
        <div className="flex items-center gap-3 xl:gap-6">
            <div className="relative size-10 xl:size-14 rounded-full overflow-hidden">
                {image && <CustomImage quality={75} loading="lazy" className="object-cover" fill src={image} alt={name} />}
                {!image && <IcoMusic size={24} />}
            </div>
            <div>
                <h2 className="text-xs max-w-56 overflow-hidden text-nowrap xl:text-wrap xl:w-auto xl:text-lg text-white font-semibold">{name}</h2>
                {description && <p className="text-neutral-200 text-sm">{description}</p>}
            </div>
        </div>
    )
}