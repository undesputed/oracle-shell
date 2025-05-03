"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MobileGraffitiView } from "@/components/mobile-graffiti-view"
import { useTruthShards } from "@/hooks/use-truth-shards"

export default function MobileGraffitiShardPage({ params }: { params: { shardId: string } }) {
  const router = useRouter()
  const { getShardById } = useTruthShards()
  const shard = getShardById(params.shardId)

  // Redirect to main graffiti page if shard not found
  useEffect(() => {
    if (!shard) {
      router.push("/mobile/graffiti")
    }
  }, [shard, router])

  return <MobileGraffitiView shardId={params.shardId} />
}
