"use client";
import { FC } from "react";

import { IcoReport, IcoEffect, IcoRepeat } from "../icons";

import { Button } from "./";

import { PreferenseControlsProps } from "../types";

export const PreferenseControls: FC<PreferenseControlsProps> = ({...props}) => {

    const {
        isLooped, iconSize = 18, useAmbientMode,
        toggleLoop, toggleAmbientMode,
    } = props;

    return(
        <>
            <div className="flex items-center flex-shrink-0 gap-3">
                <Button onClick={toggleLoop} active={isLooped}>
                    <IcoRepeat size={iconSize} />
                </Button>
                <Button onClick={toggleAmbientMode} active={useAmbientMode}>
                    <IcoEffect size={iconSize} />
                </Button>
                <Button>
                    <IcoReport size={iconSize} />
                </Button>
            </div>
        </>
    )
}