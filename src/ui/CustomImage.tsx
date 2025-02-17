"use client";
import { FC, useState, useEffect } from "react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    useNextImage?: boolean;
    fill?: boolean;
    quality?: number;
}

let NextImage: any = null;
if (typeof window === "undefined") {
    try {
        NextImage = require("next/image").default;
    } catch (error) {
        NextImage = null;
    }
}

export const CustomImage: FC<CustomImageProps> = ({
    useNextImage = !!NextImage,
    fill = false,
    quality = 75,
    ...props
}) => {
    const [isNextAvailable, setIsNextAvailable] = useState(!!NextImage);

    useEffect(() => {
        if (!NextImage) {
            try {
                NextImage = require("next/image").default;
                setIsNextAvailable(true);
            } catch {
                setIsNextAvailable(false);
            }
        }
    }, []);

    if (isNextAvailable && useNextImage) {
        return <NextImage quality={quality} fill={fill} {...props} />;
    }
    return <img {...props} />;
};
