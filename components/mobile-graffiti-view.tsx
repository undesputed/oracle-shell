"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { MobileTruthShard } from "./mobile-truth-shard"
import { useTruthShards } from "@/hooks/use-truth-shards"

interface MobileGraffitiViewProps {
  shardId?: string
}

export function MobileGraffitiView({ shardId }: MobileGraffitiViewProps) {
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
    <div className="flex h-[100dvh] w-full flex-col bg-black">
      {/* Mobile Header */}
      <div className="flex h-12 items-center justify-between border-b border-gray-800 bg-black px-3">
        <Link href="/mobile" className="flex items-center text-gray-400">
          <ChevronLeft size={16} className="mr-1" />
          <span>BACK</span>
        </Link>
        <span className="text-sm font-bold text-cyan-400">GRAFFITI</span>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Focused Shard (if any) */}
      {focusShard && (
        <div className="border-b border-gray-800 p-3">
          <div className="mb-2 text-xs text-gray-500">FOCUSED TRUTH SHARD:</div>
          <MobileTruthShard shard={focusShard} />
        </div>
      )}

      {/* Graffiti Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Mobile-optimized graffiti wall would go here */}
        <div className="space-y-3">
          {/* Sample graffiti posts */}
          <div className="rounded border border-gray-800 bg-black/40 p-3">
            <div className="mb-2 text-cyan-400">REALITY IS JUST CODE WAITING TO BE HACKED</div>
            <div className="text-xs text-gray-500">CYPH3R • 3D AGO</div>
          </div>
          <div className="rounded border border-gray-800 bg-black/40 p-3">
            <div className="mb-2 text-purple-400">THE ORACLE SPEAKS IN GLITCHES AND DREAMS</div>
            <div className="text-xs text-gray-500">VOID_WALKER • 2D AGO</div>
          </div>
        </div>
      </div>

      {/* Add Graffiti Button */}
      <div className="border-t border-gray-800 p-3">
        <button className="w-full rounded bg-cyan-900/30 py-2 text-sm text-cyan-400">ADD GRAFFITI</button>
      </div>
    </div>
  )
}
