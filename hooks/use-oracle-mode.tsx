"use client"

import { createContext, useContext, useState } from 'react'

type OracleMode = 'clairvoyant' | 'dissociative'

interface OracleModeContextType {
  mode: OracleMode
  setMode: (mode: OracleMode) => void
}

const OracleModeContext = createContext<OracleModeContextType | undefined>(undefined)

export function OracleModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<OracleMode>('clairvoyant')

  return (
    <OracleModeContext.Provider value={{ mode, setMode }}>
      {children}
    </OracleModeContext.Provider>
  )
}

export function useOracleMode() {
  const context = useContext(OracleModeContext)
  if (context === undefined) {
    throw new Error("useOracleMode must be used within an OracleModeProvider")
  }
  return context
}
