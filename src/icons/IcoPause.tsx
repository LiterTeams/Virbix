import { FC } from "react";

import { IconProps } from "../types";

export const IcoPause: FC<IconProps> = ({ color = "currentColor", size = 64, className = "" }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth={0}
            viewBox="0 0 24 24"
            className={className}
            height={`${size}px`}
            width={`${size}px`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H11V9H9ZM13 9V15H15V9H13Z"></path>
        </svg>
    );
};