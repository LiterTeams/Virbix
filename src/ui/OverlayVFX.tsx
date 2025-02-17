"use client";
import { FC } from "react";
import { useMusic } from "../hooks";
import { Overlay, Visualizer } from "./";

export const OverlayVFX: FC = () => {
    const { useAmbientMode } = useMusic().vfx;

    return(
        <Overlay className="pointer-events-none z-[1] p-0">
            {useAmbientMode && <Visualizer />}
        </Overlay>
    )
}