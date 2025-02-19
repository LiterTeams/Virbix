"use client";
import { useState, useCallback } from "react";

import { UsePlayerVFXProps } from "../types";

export const usePlayerVFX = ({ ambientMode = false }: UsePlayerVFXProps = {}) => {

    const [useAmbientMode, setAmbientMode] = useState(ambientMode);

    const toggleAmbientMode = useCallback(() => setAmbientMode(prev => !prev),[]);

    return {
        useAmbientMode, toggleAmbientMode,
    }
}