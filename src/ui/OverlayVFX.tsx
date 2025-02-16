"use client";
import { FC } from "react";

import { Overlay, Visualizer } from "./";

import { OverlayVFXProps } from "../types";

export const OverlayVFX: FC<OverlayVFXProps> = ({...props}) => {

    const { audioRef, useAmbientMode = false } = props;

    return(
        <Overlay className="pointer-events-none z-[1] p-0">
            {useAmbientMode && <Visualizer audioRef={audioRef} />}
        </Overlay>
    )
}