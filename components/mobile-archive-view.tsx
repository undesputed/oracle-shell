"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { MobileTruthShard } from "./mobile-truth-shard"
import type { TruthShardData } from "./truth-shard-gallery"

interface MobileArchiveViewProps {
  shards: TruthShardData[]
}

export function MobileArchiveView({ shards }: MobileArchiveViewProps) {
  const [filter, setFilter] = useState<"all" | "clairvoyant" | "dissociative">("all")

  const filteredShards = shards.filter((shard) => {
    if (filter === "all") return true
    return shard.mode === filter
  })

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-black">
      {/* Mobile Header */}
      <div className="flex h-12 items-center justify-between border-b border-gray-800 bg-black px-3">
        <Link href="/mobile" className="flex items-center text-gray-400">
          <ChevronLeft size={16} className="mr-1" />
          <span>BACK</span>
        </Link>
        <span className="text-sm font-bold text-cyan-400">ARCHIVE</span>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Filter Controls */}
      <div className="border-b border-gray-800 p-3">
        <div className="flex justify-between">
          <button
            onClick={() => setFilter("all")}
            className={`rounded px-3 py-1 text-xs ${filter === "all" ? "bg-gray-800 text-white" : "text-gray-400"}`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("clairvoyant")}
            className={`rounded px-3 py-1 text-xs ${
              filter === "clairvoyant" ? "bg-cyan-900/50 text-cyan-300" : "text-gray-400"
            }`}
          >
            CLAIRVOYANT
          </button>
          <button
            onClick={() => setFilter("dissociative")}
            className={`rounded px-3 py-1 text-xs ${
              filter === "dissociative" ? "bg-purple-900/50 text-purple-300" : "text-gray-400"
            }`}
          >
            DISSOCIATIVE
          </button>
        </div>
      </div>

      {/* Shards List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {filteredShards.map((shard) => (
            <Link key={shard.id} href={`/mobile/graffiti/${shard.id}`} className="block">
              <MobileTruthShard shard={shard} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
