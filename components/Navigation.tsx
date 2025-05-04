"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTerminalTheme } from '@/hooks/use-terminal-theme'
import { useOracleMode } from '@/hooks/use-oracle-mode'

export function Navigation() {
  const pathname = usePathname()
  const { theme } = useTerminalTheme()
  const { mode } = useOracleMode()

  const getTruthShardText = () => {
    switch (mode) {
      case 'clairvoyant':
        return 'TRUTH SHARD • CLAIRVOYANT'
      case 'dissociative':
        return 'TRUTH SHARD • DISSOCIATIVE'
      default:
        return 'TRUTH SHARD'
    }
  }

  return (
    <nav className={`border-b ${theme.borderColor} ${theme.backgroundColor} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Oracle Shell */}
          <div className="flex-shrink-0">
            <Link href="/" className={`${theme.textColor} font-[VT323,monospace] text-2xl tracking-wider`}>
              ORACLE SHELL
            </Link>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/terminal"
              className={`px-3 py-2 rounded-md text-sm font-mono transition-all ${
                pathname === '/terminal'
                  ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
                  : `${theme.textColor} opacity-70 hover:opacity-100`
              }`}
            >
              TERMINAL
            </Link>
            <Link
              href="/shards"
              className={`px-3 py-2 rounded-md text-sm font-mono transition-all ${
                pathname === '/shards'
                  ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
                  : `${theme.textColor} opacity-70 hover:opacity-100`
              }`}
            >
              {getTruthShardText()}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 