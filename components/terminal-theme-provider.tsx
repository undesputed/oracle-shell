"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useOracleMode } from "@/hooks/use-oracle-mode"

type TerminalTheme = {
  backgroundColor: string
  textColor: string
  accentColor: string
  borderColor: string
  shadowColor: string
}

type TerminalThemeContextType = {
  theme: TerminalTheme
}

const TerminalThemeContext = createContext<TerminalThemeContextType | undefined>(undefined)

export function TerminalThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useOracleMode()

  const themes = {
    clairvoyant: {
      backgroundColor: "bg-primary-950",
      textColor: "text-primary-100",
      accentColor: "text-secondary-400",
      borderColor: "border-primary-700",
      shadowColor: "shadow-primary-500/20",
    },
    dissociative: {
      backgroundColor: "bg-secondary-950",
      textColor: "text-secondary-100",
      accentColor: "text-accent-400",
      borderColor: "border-secondary-700",
      shadowColor: "shadow-secondary-500/20",
    },
  }

  return <TerminalThemeContext.Provider value={{ theme: themes[mode] }}>{children}</TerminalThemeContext.Provider>
}

export function useTerminalTheme() {
  const context = useContext(TerminalThemeContext)
  if (context === undefined) {
    throw new Error("useTerminalTheme must be used within a TerminalThemeProvider")
  }
  return context
}
