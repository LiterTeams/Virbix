"use client";
import { FC } from "react";
import { CustomImage } from "./CustomImage";
import { TrackInfoProps } from "../types";
import { IcoMusic } from "../icons";

export const TrackDetails: FC<TrackInfoProps> = ({...props}) => {

    const { name, description, image, author } = props;

    return(
        <div className="flex items-center gap-6">
            {image
            ? <CustomImage loading="lazy" className="object-cover rounded-full size-[56px]" width={56} height={56} src={image} alt={name} />
            : <div className="size-14 p-1 bg-additional rounded-full flex items-center justify-center"><IcoMusic size={24} /></div>
            }
            <div>
                <h2 className="text-lg text-white font-semibold">{name}</h2>
                {description && <p className="text-neutral-400 text-sm">{description}</p>}
            </div>
        </div>
    )
}