import { FC } from "react";

import { IconProps } from "../types";

export const IcoReport: FC<IconProps> = ({ color = "currentColor", size = 64, className = "" }) => {
    return (
        <svg
            stroke={color}
            fill={color}
            strokeWidth={0}
            className={className}
            viewBox="0 0 24 24"
            height={`${size}px`}
            width={`${size}px`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 3H12.382C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3Z"></path>
        </svg>
    );
};