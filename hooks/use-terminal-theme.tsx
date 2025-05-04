"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useOracleMode } from './use-oracle-mode'

type TerminalTheme = {
  textColor: string
  backgroundColor: string
  borderColor: string
  shadowColor: string
  accentColor: string
}

const clairvoyantTheme: TerminalTheme = {
  textColor: 'text-green-400',
  backgroundColor: 'bg-[#1a2a1a]',
  borderColor: 'border-green-700',
  shadowColor: 'shadow-[0_0_64px_#00ffcc44]',
  accentColor: 'text-cyan-400'
}

const dissociativeTheme: TerminalTheme = {
  textColor: 'text-purple-400',
  backgroundColor: 'bg-[#1a001a]',
  borderColor: 'border-purple-700',
  shadowColor: 'shadow-[0_0_64px_#ff00ff44]',
  accentColor: 'text-purple-300'
}

interface TerminalThemeContextType {
  theme: TerminalTheme
}

const TerminalThemeContext = createContext<TerminalThemeContextType | undefined>(undefined)

export function TerminalThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useOracleMode()
  const [theme, setTheme] = useState<TerminalTheme>(clairvoyantTheme)

  useEffect(() => {
    setTheme(mode === 'clairvoyant' ? clairvoyantTheme : dissociativeTheme)
  }, [mode])

  return (
    <TerminalThemeContext.Provider value={{ theme }}>
      {children}
    </TerminalThemeContext.Provider>
  )
}

export function useTerminalTheme() {
  const context = useContext(TerminalThemeContext)
  if (context === undefined) {
    throw new Error('useTerminalTheme must be used within a TerminalThemeProvider')
  }
  return context
} 