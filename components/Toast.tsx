"use client";

import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Animate in
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Auto-dismiss after duration (only when not hovering)
        if (!isHovering) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, isHovering]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300); // Match the exit animation duration
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const getToastStyles = () => {
        const baseStyles =
            "relative flex w-full max-w-sm items-start gap-4 rounded-2xl border p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out transform cursor-pointer";

        switch (type) {
            case "success":
                return `${baseStyles} bg-green-50/90 border-green-200/50 text-green-900 shadow-green-500/10`;
            case "error":
                return `${baseStyles} bg-red-50/90 border-red-200/50 text-red-900 shadow-red-500/10`;
            case "warning":
                return `${baseStyles} bg-yellow-50/90 border-yellow-200/50 text-yellow-900 shadow-yellow-500/10`;
            case "info":
                return `${baseStyles} bg-blue-50/90 border-blue-200/50 text-blue-900 shadow-blue-500/10`;
            default:
                return `${baseStyles} bg-gray-50/90 border-gray-200/50 text-gray-900 shadow-gray-500/10`;
        }
    };

    const getIcon = () => {
        const baseIconStyles =
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl shadow-sm";

        switch (type) {
            case "success":
                return (
                    <div
                        className={`${baseIconStyles} bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/25`}
                    >
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                );
            case "error":
                return (
                    <div
                        className={`${baseIconStyles} bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25`}
                    >
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                );
            case "warning":
                return (
                    <div
                        className={`${baseIconStyles} bg-gradient-to-br from-yellow-500 to-amber-600 shadow-yellow-500/25`}
                    >
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                );
            case "info":
                return (
                    <div
                        className={`${baseIconStyles} bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/25`}
                    >
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    const animationClasses =
        isVisible && !isExiting
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95";

    return (
        <div
            className={`transform ${animationClasses} ${getToastStyles()}`}
            style={{
                transform:
                    isVisible && !isExiting
                        ? "translateX(0) scale(1)"
                        : "translateX(100%) scale(0.95)",
                opacity: isVisible && !isExiting ? 1 : 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {getIcon()}
            <div className="flex-1 min-w-0">
                <div className="text-base font-semibold leading-tight">
                    {title}
                </div>
                {message && (
                    <div className="mt-3 space-y-2">
                        {(() => {
                            const lines = message.split("\n");
                            const result = [];
                            let currentJsonBlock: string[] = [];
                            let inJsonBlock = false;

                            for (let i = 0; i < lines.length; i++) {
                                const line = lines[i];
                                const isJsonLine =
                                    line.includes("{") ||
                                    line.includes("[") ||
                                    line.includes('"') ||
                                    line.includes("}") ||
                                    line.includes("]");

                                if (isJsonLine && !inJsonBlock) {
                                    // Start of JSON block
                                    inJsonBlock = true;
                                    currentJsonBlock = [line];
                                } else if (isJsonLine && inJsonBlock) {
                                    // Continue JSON block
                                    currentJsonBlock.push(line);
                                } else if (!isJsonLine && inJsonBlock) {
                                    // End of JSON block, render it
                                    result.push(
                                        <div
                                            key={`json-${i}`}
                                            className="bg-black/5 rounded-lg p-3 border border-black/10"
                                        >
                                            <pre className="text-xs font-mono text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                                {currentJsonBlock.join("\n")}
                                            </pre>
                                        </div>
                                    );
                                    inJsonBlock = false;
                                    currentJsonBlock = [];

                                    // Add the current non-JSON line
                                    if (line.trim()) {
                                        result.push(
                                            <div
                                                key={`text-${i}`}
                                                className="text-sm opacity-80 leading-relaxed"
                                            >
                                                {line}
                                            </div>
                                        );
                                    }
                                } else {
                                    // Regular text line
                                    if (line.trim()) {
                                        result.push(
                                            <div
                                                key={`text-${i}`}
                                                className="text-sm opacity-80 leading-relaxed"
                                            >
                                                {line}
                                            </div>
                                        );
                                    }
                                }
                            }

                            // Handle any remaining JSON block
                            if (inJsonBlock && currentJsonBlock.length > 0) {
                                result.push(
                                    <div
                                        key="json-final"
                                        className="bg-black/5 rounded-lg p-3 border border-black/10"
                                    >
                                        <pre className="text-xs font-mono text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                            {currentJsonBlock.join("\n")}
                                        </pre>
                                    </div>
                                );
                            }

                            return result;
                        })()}
                    </div>
                )}
            </div>
            <button
                onClick={handleClose}
                className="flex-shrink-0 rounded-xl p-2 opacity-60 hover:opacity-100 hover:bg-black/5 transition-all duration-200 group"
            >
                <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
