"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { TruthShardData } from "./truth-shard-gallery"

interface TruthShardCardProps {
  shard: TruthShardData
  onClick: () => void
}

export function TruthShardCard({ shard, onClick }: TruthShardCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  // Format date to display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Truncate message for preview
  const truncateMessage = (message: string, maxLength = 70) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + "..."
  }

  // Trigger glitch effect on hover
  useEffect(() => {
    if (isHovered) {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }, 2000)

      return () => clearInterval(glitchInterval)
    }
  }, [isHovered])

  const modeIcon = shard.mode === "clairvoyant" ? "🔮" : "🌀"
  const modeColor = shard.mode === "clairvoyant" ? "cyan" : "purple"

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md border bg-black/80 p-4 transition-all duration-300",
        shard.mode === "clairvoyant"
          ? "border-cyan-800 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          : "border-purple-800 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay */}
      {isGlitching && <div className="glitch-overlay absolute inset-0 z-20 opacity-30"></div>}

      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs font-mono text-gray-400">{formatDate(shard.timestamp)}</div>
          <div className="text-lg" title={`Mode: ${shard.mode}`}>
            {modeIcon}
          </div>
        </div>

        {/* Message preview */}
        <div className={`mb-4 flex-grow font-mono text-sm text-${modeColor}-300`}>
          <p className="whitespace-pre-wrap">{truncateMessage(shard.message)}</p>
        </div>

        {/* ID */}
        <div className="mb-3 text-xs text-gray-500">ID: {shard.id.substring(0, 8)}...</div>

        {/* View button */}
        <button
          onClick={onClick}
          className={cn(
            "relative w-full rounded border px-3 py-1 font-mono text-xs transition-all duration-300",
            shard.mode === "clairvoyant"
              ? "border-cyan-800 bg-cyan-900/20 text-cyan-400 hover:border-cyan-600 hover:bg-cyan-900/40"
              : "border-purple-800 bg-purple-900/20 text-purple-400 hover:border-purple-600 hover:bg-purple-900/40",
          )}
        >
          VIEW FULL DETAIL
          <span
            className={cn(
              "absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-700 group-hover:w-full",
              shard.mode === "clairvoyant" ? "bg-cyan-400" : "bg-purple-400",
            )}
          ></span>
        </button>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(${shard.mode === "clairvoyant" ? "0, 255, 255" : "255, 0, 255"}, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(${shard.mode === "clairvoyant" ? "0, 255, 255" : "255, 0, 255"}, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .glitch-overlay {
          background: linear-gradient(
            45deg,
            rgba(0, 255, 255, 0.2),
            rgba(255, 0, 255, 0.2)
          );
          animation: glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}
