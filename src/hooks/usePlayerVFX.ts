"use client";
import { useState } from "react";

import { UsePlayerVFXProps } from "../types";

export const usePlayerVFX = ({ ambientMode = false }: UsePlayerVFXProps = {}) => {

    const [useAmbientMode, setAmbientMode] = useState(ambientMode);

    const toggleAmbientMode = () => setAmbientMode(prev => !prev);

    return {
        useAmbientMode, toggleAmbientMode,
    }
}