"use client"

import { Navigation } from '@/components/Navigation'
import { TruthShardWall } from '@/components/TruthShardWall'
import { useTerminalTheme } from '@/hooks/use-terminal-theme'

export default function ShardsPage() {
  const { theme } = useTerminalTheme()

  return (
    <main className={`min-h-screen ${theme.backgroundColor}`}>
      <Navigation />
      <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-sans">
              TRUTH SHARD ARCHIVE
            </h1>
            <p className="text-gray-600 dark:text-gray-300 font-sans text-lg sm:text-xl text-center max-w-3xl mx-auto leading-relaxed">
              A collection of all interactions with the Oracle. Each shard represents a moment of cosmic insight or digital chaos.
            </p>
          </div>
          <TruthShardWall />
        </div>
      </div>
    </main>
  )
} 