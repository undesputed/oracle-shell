"use client"

import type React from "react"

import { OracleModeProvider } from "@/hooks/use-oracle-mode"
import { TruthShardsProvider } from "@/hooks/use-truth-shards"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OracleModeProvider>
      <TruthShardsProvider>{children}</TruthShardsProvider>
    </OracleModeProvider>
  )
}
