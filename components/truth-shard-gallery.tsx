"use client"

import { useState } from "react"
import { TruthShardCard } from "./truth-shard-card"
import { TruthShardDetail } from "./truth-shard-detail"

export type TruthShardData = {
  id: string
  message: string
  timestamp: Date
  mode: "clairvoyant" | "dissociative"
  hash?: string
}

interface TruthShardGalleryProps {
  shards: TruthShardData[]
}

export function TruthShardGallery({ shards }: TruthShardGalleryProps) {
  const [selectedShard, setSelectedShard] = useState<TruthShardData | null>(null)

  return (
    <div className="truth-shard-gallery relative h-full w-full">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-ambient"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4 flex items-center justify-between border-b border-gray-700 pb-2">
        <h2 className="font-mono text-lg font-bold text-cyan-400">TRUTH SHARD ARCHIVE</h2>
        <div className="text-sm text-gray-400">
          <span>{shards.length} RECORDS FOUND</span>
        </div>
      </div>

      {/* Grid layout */}
      <div className="custom-scrollbar relative z-10 grid h-[calc(100%-40px)] grid-cols-1 gap-4 overflow-y-auto pb-4 sm:grid-cols-2 lg:grid-cols-3">
        {shards.map((shard) => (
          <TruthShardCard key={shard.id} shard={shard} onClick={() => setSelectedShard(shard)} />
        ))}
      </div>

      {/* Detail modal */}
      {selectedShard && <TruthShardDetail shard={selectedShard} onClose={() => setSelectedShard(null)} />}

      <style jsx>{`
        .bg-ambient {
          background: 
            radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(255, 0, 255, 0.05) 0%, transparent 20%),
            linear-gradient(to bottom, #000000, #050520);
          animation: ambient-shift 30s ease infinite alternate;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00ffff, #ff00ff);
          border-radius: 4px;
        }
        
        @keyframes ambient-shift {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  )
}
