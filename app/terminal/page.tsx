"use client"

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChatTerminal } from '@/components/ChatTerminal'
import { Navigation } from '@/components/Navigation'
import { useTerminalTheme } from '@/hooks/use-terminal-theme'
import { useOracleMode } from '@/hooks/use-oracle-mode'

function TerminalContent() {
  const { theme } = useTerminalTheme()
  const { setMode } = useOracleMode()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for query parameters
    const mode = searchParams.get('mode') as 'clairvoyant' | 'dissociative' | null

    if (mode && (mode === 'clairvoyant' || mode === 'dissociative')) {
      setMode(mode)
    }
  }, [searchParams, setMode])

  return (
    <main className={`min-h-screen ${theme.backgroundColor}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <ChatTerminal />
      </div>
    </main>
  )
}

export default function TerminalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    }>
      <TerminalContent />
    </Suspense>
  )
}
