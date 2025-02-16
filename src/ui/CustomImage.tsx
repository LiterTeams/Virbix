"use client";
import { FC, ImgHTMLAttributes, useMemo } from "react";

const NextImage = (() => {
  try {
    return require("next/image").default;
  } catch (error) {
    return null;
  }
})();

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: "intrinsic" | "fixed" | "responsive" | "fill";
}

export const CustomImage: FC<ImageProps> = ({ src, alt, ...props }) => {
  const ImageComponent = useMemo(() => NextImage || "img", []);
  return <ImageComponent src={src} alt={alt} {...props} />;
};
