"use client"

import { MobileArchiveView } from "@/components/mobile-archive-view"
import { useTruthShards } from "@/hooks/use-truth-shards"

export default function MobileArchivePage() {
  const { shards } = useTruthShards()

  return <MobileArchiveView shards={shards} />
}
