"use client"

import { useState } from "react"
import Link from "next/link"
import { TruthShardCard } from "./truth-shard-card"
import { TruthShardDetail } from "./truth-shard-detail"
import type { TruthShardData } from "./truth-shard-gallery"

interface TruthShardArchiveProps {
  shards: TruthShardData[]
}

export function TruthShardArchive({ shards }: TruthShardArchiveProps) {
  const [selectedShard, setSelectedShard] = useState<TruthShardData | null>(null)
  const [filter, setFilter] = useState<"all" | "clairvoyant" | "dissociative">("all")

  const filteredShards = shards.filter((shard) => {
    if (filter === "all") return true
    return shard.mode === filter
  })

  return (
    <div className="truth-shard-archive relative h-full w-full">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-ambient"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="font-mono text-2xl font-bold text-cyan-400">TRUTH SHARD ARCHIVE</h2>
          <p className="text-sm text-gray-400">{filteredShards.length} RECORDS FOUND</p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">FILTER:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded px-3 py-1 text-xs ${
                filter === "all" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("clairvoyant")}
              className={`rounded px-3 py-1 text-xs ${
                filter === "clairvoyant" ? "bg-cyan-900/50 text-cyan-300" : "text-gray-400 hover:text-cyan-300"
              }`}
            >
              CLAIRVOYANT
            </button>
            <button
              onClick={() => setFilter("dissociative")}
              className={`rounded px-3 py-1 text-xs ${
                filter === "dissociative" ? "bg-purple-900/50 text-purple-300" : "text-gray-400 hover:text-purple-300"
              }`}
            >
              DISSOCIATIVE
            </button>
          </div>
        </div>
      </div>

      {/* Grid layout */}
      <div className="custom-scrollbar relative z-10 grid h-[calc(100%-80px)] grid-cols-1 gap-4 overflow-y-auto pb-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredShards.map((shard) => (
          <div key={shard.id} className="group relative">
            <TruthShardCard shard={shard} onClick={() => setSelectedShard(shard)} />

            {/* Graffiti link overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link
                href={`/graffiti/${shard.id}`}
                className={`rounded border px-3 py-1 text-xs backdrop-blur-sm ${
                  shard.mode === "clairvoyant"
                    ? "border-cyan-500 bg-black/70 text-cyan-300"
                    : "border-purple-500 bg-black/70 text-purple-300"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                VIEW REMIXES
              </Link>
            </div>
          </div>
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
