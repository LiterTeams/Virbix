import { ReactNode } from "react";

export interface IconProps {
    color?: string;
    size?: number;
    className?: string;
}
export interface AuthorProps {
    id: number;
    name: string;
    url?: string;
}
export interface TrackInfoProps {
    name: string;
    description?: string;
    image?: string;
    author?: AuthorProps;
}
export interface TrackProps {
    source: string;
    info: TrackInfoProps;
}
export interface SourceProps {
    src: string;
    mimetype: string;
}
export interface OverlayProps {
    className?: string;
    children?: ReactNode;
}