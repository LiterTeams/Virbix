"use client";
import { useState } from "react"
export const useModal = (initial: boolean = false) => {
    const [isShow, setIsShow] = useState(initial);
    const toggle =() => setIsShow(!isShow);
    return {isShow, toggle}
}