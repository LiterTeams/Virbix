"use client";
import { useState } from "react";

export const usePlayerUI = () => {
    const [isCollapse, setIsCollapse] = useState(false);
    const [isClose, setIsClose] = useState(true);
    
    const toggleCollapse = () => {
        setIsCollapse(prev => !prev);
        setIsClose(false);
    }
    const toggleClose = () => {
        setIsClose(prev => !prev);
        setIsCollapse(false);
    }

    return {
        isCollapse, toggleCollapse,
        isClose, toggleClose,
    };
};