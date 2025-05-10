"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ChatTerminal } from "@/components/ChatTerminal"
import { SiteHeader } from "@/components/site-header"
import { useOracleMode } from "@/hooks/use-oracle-mode"
import { TerminalThemeProvider } from "@/components/terminal-theme-provider"

function TerminalContent() {
  const searchParams = useSearchParams()
  const { setMode } = useOracleMode()

  useEffect(() => {
    // Check for query parameters
    const mode = searchParams.get("mode") as "clairvoyant" | "dissociative" | null

    if (mode && (mode === "clairvoyant" || mode === "dissociative")) {
      setMode(mode)
    }
  }, [searchParams, setMode])

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50/30 to-white">
      <SiteHeader />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <ChatTerminal />
      </div>
    </main>
  )
}

export default function TerminalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 text-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary-100 font-medium">Loading Terminal...</p>
          </div>
        </div>
      }
    >
      <TerminalThemeProvider>
        <TerminalContent />
      </TerminalThemeProvider>
    </Suspense>
  )
}
