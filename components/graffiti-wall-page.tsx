"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { GraffitiWall } from "./graffiti-wall"
import { useTruthShards } from "@/hooks/use-truth-shards"

interface GraffitiWallPageProps {
  shardId?: string
}

export function GraffitiWallPage({ shardId }: GraffitiWallPageProps) {
  const { getShardById } = useTruthShards()
  const [focusShard, setFocusShard] = useState(shardId ? getShardById(shardId) : null)

  // Update focus shard if shardId changes
  useEffect(() => {
    if (shardId) {
      setFocusShard(getShardById(shardId))
    } else {
      setFocusShard(null)
    }
  }, [shardId, getShardById])

  return (
    <div className="w-full">
      {/* Header with back button if viewing a specific shard */}
      {focusShard && (
        <div className="mb-6">
          <Link
            href="/graffiti"
            className="mb-4 flex items-center text-sm text-gray-400 transition-colors hover:text-cyan-400"
          >
            <ChevronLeft size={16} className="mr-1" />
            BACK TO ALL GRAFFITI
          </Link>

          <div className="rounded border border-gray-800 bg-black/40 p-4">
            <div className="mb-2 text-sm text-gray-500">FOCUSED TRUTH SHARD:</div>
            <div className={`mb-2 font-mono text-${focusShard.mode === "clairvoyant" ? "cyan" : "purple"}-400`}>
              {focusShard.message}
            </div>
            <div className="text-xs text-gray-500">
              ID: {focusShard.id.substring(0, 8)}... • MODE: {focusShard.mode.toUpperCase()}
            </div>
          </div>
        </div>
      )}

      {/* Graffiti Wall */}
      <GraffitiWall truthShards={focusShard ? [focusShard] : undefined} />
    </div>
  )
}
