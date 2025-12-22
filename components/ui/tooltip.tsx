"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
}

export function Tooltip({
    content,
    children,
    side = "right",
    className,
}: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 px-3 py-2 text-xs font-medium text-white bg-[#2c2c2c] rounded-lg shadow-lg whitespace-nowrap pointer-events-none",
                        "animate-in fade-in-0 zoom-in-95",
                        side === "right" && "left-full ml-2 top-1/2 -translate-y-1/2",
                        side === "left" && "right-full mr-2 top-1/2 -translate-y-1/2",
                        side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
                        side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
                        className
                    )}
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={cn(
                            "absolute w-2 h-2 bg-[#2c2c2c] rotate-45",
                            side === "right" && "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
                            side === "left" && "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
                            side === "top" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                            side === "bottom" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        )}
                    />
                </div>
            )}
        </div>
    );
}

