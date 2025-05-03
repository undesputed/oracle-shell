"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { TruthShardData } from "./truth-shard-gallery"
import { X } from "lucide-react"

interface TruthShardDetailProps {
  shard: TruthShardData
  onClose: () => void
}

export function TruthShardDetail({ shard, onClose }: TruthShardDetailProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isGlitching, setIsGlitching] = useState(true)

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setIsVisible(true), 10)

    // Initial glitch effect
    setTimeout(() => setIsGlitching(false), 1000)

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for exit animation
  }

  const formatTimestamp = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}.${month}.${day} | ${hours}:${minutes}:${seconds}`
  }

  const modeIcon = shard.mode === "clairvoyant" ? "🔮" : "🌀"
  const modeColor = shard.mode === "clairvoyant" ? "cyan" : "purple"

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={handleClose}
    >
      {/* Modal content */}
      <div
        className={cn(
          "relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg border p-6 transition-all duration-300",
          shard.mode === "clairvoyant"
            ? "border-cyan-500 bg-black shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            : "border-purple-500 bg-black shadow-[0_0_20px_rgba(255,0,255,0.3)]",
          isVisible ? "scale-100" : "scale-95",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glitch overlay */}
        {isGlitching && <div className="glitch-overlay absolute inset-0 z-20 opacity-30"></div>}

        {/* Grid background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-xl font-bold">
              <span className={`text-${modeColor}-400`}>TRUTH_SHARD</span>
              <span className="ml-2 text-lg">{modeIcon}</span>
            </div>
            <div className="text-sm text-gray-400">{formatTimestamp(shard.timestamp)}</div>
          </div>

          {/* Message */}
          <div className={`mb-8 font-mono text-${modeColor}-300`}>
            <p className="whitespace-pre-wrap text-lg">{shard.message}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 border-t border-gray-800 pt-4 text-sm text-gray-400 md:grid-cols-2">
            <div>
              <div className="mb-1 text-xs text-gray-500">SHARD ID</div>
              <div className="font-mono">{shard.id}</div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">MODE</div>
              <div className="font-mono uppercase">{shard.mode}</div>
            </div>
            {shard.hash && (
              <div className="col-span-1 md:col-span-2">
                <div className="mb-1 text-xs text-gray-500">BLOCKCHAIN HASH</div>
                <div className="font-mono break-all">{shard.hash}</div>
              </div>
            )}
          </div>
        </div>
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
