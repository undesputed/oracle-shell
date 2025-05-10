"use client"

import type React from "react"

import { OracleModeProvider } from "@/hooks/use-oracle-mode"
import { TruthShardsProvider } from "@/hooks/use-truth-shards"
import { TerminalThemeProvider } from "@/components/terminal-theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OracleModeProvider>
      <TerminalThemeProvider>
        <TruthShardsProvider>{children}</TruthShardsProvider>
      </TerminalThemeProvider>
    </OracleModeProvider>
  )
}
