"use client";
import { FC, useRef, useEffect } from "react";
import { useMusic } from "../hooks";

export const Visualizer: FC = () => {
    const { audioRef } = useMusic();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 🎵 Создаём AudioContext и Analyser один раз
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.connect(audioContextRef.current.destination);
        }

        const analyser = analyserRef.current;
        if (!analyser) return;

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10; // Усредняем низкие частоты

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 🔥 Генерируем эффект мерцания линии
            const intensity = bass / 255; // Нормализуем от 0 до 1
            const lineWidth = 4 + intensity * 6; // Увеличиваем толщину линии от 4px до 10px

            // Яркость увеличиваем за счет интенсивности
            const brightness = 0.8 + intensity * 0.7; // Повышаем яркость от 0.8 до 1.5

            // Усиливаем glow эффект
            ctx.shadowBlur = 30 + intensity * 30; // Размытие эффекта свечения (увеличиваем от 30 до 60)
            ctx.shadowColor = `rgba(255, 0, 0, ${brightness})`; // Цвет свечения (красный с динамичной прозрачностью)

            // Устанавливаем цвет линии
            ctx.fillStyle = `rgba(255, 0, 0, ${brightness})`; // Яркое мерцание с прозрачностью
            ctx.fillRect(0, canvas.height / 2 - lineWidth / 2, canvas.width, lineWidth);

            animationRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [audioRef]);

    return <canvas ref={canvasRef} width={window.innerWidth} height={5} style={{ width: "100%", height: "5px" }} />;
};
