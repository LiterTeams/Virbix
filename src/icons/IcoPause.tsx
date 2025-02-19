import { IconProps } from "../types";
export const IcoPause = ({ color = "currentColor", size = 64, className = "" }:IconProps) => {
    return (
        <svg fill={color} viewBox="0 0 24 24" height={`${size}px`} width={`${size}px`} className={className} >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H11V9H9ZM13 9V15H15V9H13Z" />
        </svg>
    );
};