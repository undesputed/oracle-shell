"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GraffitiWallPage } from "@/components/graffiti-wall-page"
import { SharedHeader } from "@/components/shared-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTruthShards } from "@/hooks/use-truth-shards"

export default function GraffitiShardPage({ params }: { params: { shardId: string } }) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { getShardById } = useTruthShards()
  const shard = getShardById(params.shardId)

  // Redirect to mobile view if on mobile device
  useEffect(() => {
    if (isMobile) {
      router.push(`/mobile/graffiti/${params.shardId}`)
    }
  }, [isMobile, router, params.shardId])

  // Redirect to main graffiti page if shard not found
  useEffect(() => {
    if (!shard) {
      router.push("/graffiti")
    }
  }, [shard, router])

  return (
    <div className="flex min-h-screen flex-col">
      <SharedHeader />
      <main className="flex flex-1 p-4">
        <GraffitiWallPage shardId={params.shardId} />
      </main>
    </div>
  )
}
