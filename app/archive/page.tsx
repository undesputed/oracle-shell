"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TruthShardArchive } from "@/components/truth-shard-archive"
import { SharedHeader } from "@/components/shared-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTruthShards } from "@/hooks/use-truth-shards"

export default function ArchivePage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { shards } = useTruthShards()

  // Redirect to mobile view if on mobile device
  useEffect(() => {
    if (isMobile) {
      router.push("/mobile/archive")
    }
  }, [isMobile, router])

  return (
    <div className="flex min-h-screen flex-col">
      <SharedHeader />
      <main className="flex flex-1 p-4">
        <TruthShardArchive shards={shards} />
      </main>
    </div>
  )
}
