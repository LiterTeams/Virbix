import { IconProps } from "../types";
export const IcoClose = ({ color = "currentColor", size = 64, className = "" }:IconProps) => {
    return (
        <svg fill={color} viewBox="0 0 512 512" height={`${size}px`} width={`${size}px`} className={className}>
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z" />
        </svg>
    );
};