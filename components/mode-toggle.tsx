"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
  onChange?: (mode: "clairvoyant" | "dissociative") => void
  className?: string
  currentMode: "clairvoyant" | "dissociative"
}

export function ModeToggle({ onChange, className, currentMode }: ModeToggleProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  // Trigger glitch effect when mode changes
  useEffect(() => {
    if (currentMode) {
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [currentMode])

  const toggleMode = () => {
    const newMode = currentMode === "clairvoyant" ? "dissociative" : "clairvoyant"
    onChange?.(newMode)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-2 text-xs">
        <span
          className={cn(
            "transition-all duration-300",
            currentMode === "clairvoyant" ? "font-bold text-green-400" : "text-gray-600",
          )}
        >
          CLAIRVOYANT
        </span>
        <span className="text-cyan-400">→</span>
        <span
          className={cn(
            "transition-all duration-300",
            currentMode === "dissociative" ? "font-bold text-purple-400" : "text-gray-600",
          )}
        >
          DISSOCIATIVE
        </span>
      </div>

      <div className="relative">
        <label
          htmlFor="mode-toggle"
          className={cn(
            "relative block h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-300",
            currentMode === "clairvoyant"
              ? "bg-green-950 shadow-[0_0_8px_rgba(0,255,0,0.7)]"
              : "bg-purple-950 shadow-[0_0_8px_rgba(255,0,255,0.7)]",
          )}
        >
          <input
            type="checkbox"
            id="mode-toggle"
            className="sr-only"
            checked={currentMode === "dissociative"}
            onChange={toggleMode}
          />
          <span
            className={cn(
              "absolute top-1 block h-5 w-5 rounded-full transition-all duration-300",
              currentMode === "clairvoyant"
                ? "left-1 bg-green-400 shadow-[0_0_5px_rgba(0,255,0,1)]"
                : "left-8 bg-purple-400 shadow-[0_0_5px_rgba(255,0,255,1)]",
            )}
          />
        </label>

        {/* Glitch overlay */}
        {isGlitching && <div className="glitch-overlay absolute inset-0 z-10 rounded-full opacity-70"></div>}
      </div>

      <style jsx>{`
        .glitch-overlay {
          background: linear-gradient(
            45deg,
            rgba(0, 255, 255, 0.5),
            rgba(255, 0, 255, 0.5)
          );
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          10% {
            transform: translate(-2px, 2px);
          }
          20% {
            transform: translate(2px, -2px);
          }
          30% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-2px, 2px);
          }
          60% {
            transform: translate(2px, -2px);
          }
          70% {
            transform: translate(-2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          90% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}
