"use client"

import { cn } from "@/lib/utils"
import type { TruthShardData } from "./truth-shard-gallery"

interface MobileTruthShardProps {
  shard: TruthShardData
}

export function MobileTruthShard({ shard }: MobileTruthShardProps) {
  const formatTimestamp = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const modeIcon = shard.mode === "clairvoyant" ? "🔮" : "🌀"
  const modeColor = shard.mode === "clairvoyant" ? "cyan" : "purple"

  return (
    <div
      className={cn(
        "mobile-truth-shard overflow-hidden rounded-md border p-2",
        shard.mode === "clairvoyant"
          ? "border-cyan-800 bg-black shadow-[0_0_8px_rgba(0,255,255,0.2)]"
          : "border-purple-800 bg-black shadow-[0_0_8px_rgba(255,0,255,0.2)]",
      )}
    >
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <div className="text-xs font-mono">
          <span className={`text-${modeColor}-400`}>SHARD</span>
          <span className="mx-1 text-gray-500">|</span>
          <span className="text-gray-400">{formatTimestamp(shard.timestamp)}</span>
        </div>
        <div className="text-sm" title={`Mode: ${shard.mode}`}>
          {modeIcon}
        </div>
      </div>

      {/* Message */}
      <div className={`text-xs text-${modeColor}-300`}>
        <p className="line-clamp-3 whitespace-pre-wrap">{shard.message}</p>
      </div>

      <style jsx>{`
        .mobile-truth-shard {
          position: relative;
        }
        
        .mobile-truth-shard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${
            shard.mode === "clairvoyant"
              ? "linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, transparent 100%)"
              : "linear-gradient(135deg, rgba(255, 0, 255, 0.05) 0%, transparent 100%)"
          };
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
