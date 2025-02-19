"use client";
import { FC } from "react";

import { ButtonProps } from "../types";

export const Button: FC<ButtonProps> = ({className, children, label, active = false, ...props}) => {
    const { disabled } = props;
    const btnClassName = `flex items-center justify-center rounded-md size-9 p-1 bg-black/25 border border-white border-opacity-15 duration-300 ${disabled ? "opacity-50" : "hover:bg-white/25"} ${active && "bg-white/25"} ${className}`
    return(
        <button className={btnClassName} {...props}>
            {children ?? label}
        </button>
    )
}