import { FC } from "react";

import { IconProps } from "../types";

export const IcoPlay: FC<IconProps> = ({ color = "currentColor", size = 64, className = "" }) => {
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
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z"></path>
        </svg>
    );
};