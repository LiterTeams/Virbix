"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { IcoMusic } from "../icons";
import { Timeline, CustomImage } from "./";

export const Mobile: FC  = () => {
    const { name, description, image, author } = useMusic().player.track?.info ?? {name: "Unknown"};

    return(
        <div className="fixed flex flex-col gap-3 justify-center items-center z-20 left-0 top-0 size-full bg-black p-4">
            <div className="relative flex bg-neutral-950 justify-center items-center overflow-hidden rounded-xl w-full h-2/4">
                {image && <CustomImage quality={75} loading="lazy" className="object-cover" fill src={image} alt={name} />}
                {!image && <IcoMusic size={64} />}
            </div>
            <Timeline />
        </div>
    )
}