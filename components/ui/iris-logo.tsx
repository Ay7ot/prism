"use client";

import { cn } from "@/lib/utils";

interface IrisLogoProps {
    className?: string;
    width?: number;
    height?: number;
    showText?: boolean;
    color?: "gold" | "white";
}

export function IrisLogo({
    className,
    width = 120,
    height = 40,
    showText = true,
    color = "gold",
}: IrisLogoProps) {
    const fillColor = color === "white" ? "#FFFFFF" : "#EEAC1D";

    if (!showText) {
        // Icon only version (iris/eye icon)
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 40 40"
                fill="none"
                className={className}
            >
                {/* Outer eye shape */}
                <ellipse
                    cx="20"
                    cy="20"
                    rx="18"
                    ry="12"
                    fill="none"
                    stroke={fillColor}
                    strokeWidth="2"
                />
                {/* Iris circle */}
                <circle
                    cx="20"
                    cy="20"
                    r="8"
                    fill={fillColor}
                    opacity="0.3"
                />
                {/* Pupil */}
                <circle
                    cx="20"
                    cy="20"
                    r="4"
                    fill={fillColor}
                />
                {/* Highlight */}
                <circle
                    cx="22"
                    cy="18"
                    r="1.5"
                    fill={color === "white" ? "#FFFFFF" : "#FFFFFF"}
                    opacity="0.8"
                />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 120 40"
            fill="none"
            className={className}
        >
            {/* Icon - Eye/Iris */}
            <ellipse
                cx="20"
                cy="20"
                rx="16"
                ry="11"
                fill="none"
                stroke={fillColor}
                strokeWidth="2"
            />
            <circle
                cx="20"
                cy="20"
                r="7"
                fill={fillColor}
                opacity="0.3"
            />
            <circle
                cx="20"
                cy="20"
                r="3.5"
                fill={fillColor}
            />
            <circle
                cx="21.5"
                cy="18.5"
                r="1.2"
                fill={color === "white" ? "#FFFFFF" : "#FFFFFF"}
                opacity="0.8"
            />

            {/* Text - IRIS */}
            <text
                x="45"
                y="28"
                fontFamily="Arial, sans-serif"
                fontSize="24"
                fontWeight="700"
                fill={fillColor}
                letterSpacing="2"
            >
                IRIS
            </text>
        </svg>
    );
}

// Icon-only version for smaller contexts
export function IrisIcon({
    className,
    size = 30,
    color = "gold",
}: {
    className?: string;
    size?: number;
    color?: "gold" | "white";
}) {
    const fillColor = color === "white" ? "#FFFFFF" : "#EEAC1D";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            className={className}
        >
            {/* Outer eye shape */}
            <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="12"
                fill="none"
                stroke={fillColor}
                strokeWidth="2"
            />
            {/* Iris circle */}
            <circle
                cx="20"
                cy="20"
                r="8"
                fill={fillColor}
                opacity="0.3"
            />
            {/* Pupil */}
            <circle
                cx="20"
                cy="20"
                r="4"
                fill={fillColor}
            />
            {/* Highlight */}
            <circle
                cx="22"
                cy="18"
                r="1.5"
                fill={color === "white" ? "#FFFFFF" : "#FFFFFF"}
                opacity="0.8"
            />
        </svg>
    );
}

