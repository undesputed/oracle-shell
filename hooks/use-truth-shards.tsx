"use client"

import * as React from "react"

interface TruthShard {
  id: string
  content: string
  discovered: boolean
}

interface TruthShardsContextType {
  shards: TruthShard[]
  addShard: (content: string) => void
  markShardAsDiscovered: (id: string) => void
}

const TruthShardsContext = React.createContext<TruthShardsContextType | undefined>(undefined)

export function TruthShardsProvider({ children }: { children: React.ReactNode }) {
  const [shards, setShards] = React.useState<TruthShard[]>([])

  const addShard = React.useCallback((content: string) => {
    setShards((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content,
        discovered: false,
      },
    ])
  }, [])

  const markShardAsDiscovered = React.useCallback((id: string) => {
    setShards((prev) =>
      prev.map((shard) =>
        shard.id === id ? { ...shard, discovered: true } : shard
      )
    )
  }, [])

  return (
    <TruthShardsContext.Provider
      value={{
        shards,
        addShard,
        markShardAsDiscovered,
      }}
    >
      {children}
    </TruthShardsContext.Provider>
  )
}

export function useTruthShards() {
  const context = React.useContext(TruthShardsContext)
  if (context === undefined) {
    throw new Error("useTruthShards must be used within a TruthShardsProvider")
  }
  return context
}
