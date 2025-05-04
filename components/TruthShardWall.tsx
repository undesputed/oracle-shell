"use client"

import { useState, useEffect } from 'react'
import { useTruthShard } from '@/hooks/use-truth-shard'
import { useTerminalTheme } from '@/hooks/use-terminal-theme'

export function TruthShardWall() {
  const { shards, remixShard } = useTruthShard()
  const { theme } = useTerminalTheme()
  const [selectedShard, setSelectedShard] = useState<string | null>(null)
  const [remixPrompt, setRemixPrompt] = useState('')
  const [mounted, setMounted] = useState(false)
  const [rotations, setRotations] = useState<number[]>([])
  const [filterMode, setFilterMode] = useState<'all' | 'clairvoyant' | 'dissociative'>('all')
  const [showRemixesOnly, setShowRemixesOnly] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate rotations only on client side
    setRotations(shards.map(() => Math.random() * 4 - 2))
  }, [shards])

  const handleRemix = async (shardId: string) => {
    if (!remixPrompt.trim()) return
    
    try {
      const originalShard = shards.find(s => s.id === shardId)
      if (!originalShard) return

      // In a real implementation, this would call the AI to generate a response
      const remixResponse = `Remix of "${originalShard.response}" with prompt: ${remixPrompt}`
      
      await remixShard(shardId, remixPrompt, remixResponse)
      setRemixPrompt('')
      setSelectedShard(null)
    } catch (error) {
      console.error('Failed to remix shard:', error)
    }
  }

  const filteredShards = shards.filter(shard => {
    if (filterMode !== 'all' && shard.mode !== filterMode) return false
    if (showRemixesOnly && shard.remixes.length === 0) return false
    return true
  })

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className={`${theme.textColor} font-mono animate-pulse`}>
          Loading shards...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
              filterMode === 'all'
                ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
                : `${theme.textColor} opacity-70 hover:opacity-100`
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilterMode('clairvoyant')}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
              filterMode === 'clairvoyant'
                ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
                : `${theme.textColor} opacity-70 hover:opacity-100`
            }`}
          >
            CLAIRVOYANT
          </button>
          <button
            onClick={() => setFilterMode('dissociative')}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
              filterMode === 'dissociative'
                ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
                : `${theme.textColor} opacity-70 hover:opacity-100`
            }`}
          >
            DISSOCIATIVE
          </button>
        </div>
        <button
          onClick={() => setShowRemixesOnly(!showRemixesOnly)}
          className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
            showRemixesOnly
              ? `${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor}`
              : `${theme.textColor} opacity-70 hover:opacity-100`
          }`}
        >
          SHOW REMIXES ONLY
        </button>
      </div>

      {/* Shards Grid */}
      {filteredShards.length === 0 ? (
        <div className="text-center py-12">
          <p className={`${theme.textColor} font-mono text-lg opacity-70`}>
            No shards found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShards.map((shard, index) => (
            <div
              key={shard.id}
              className={`p-6 border ${theme.borderColor} rounded-lg relative group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              style={{
                transform: `rotate(${rotations[index]}deg)`,
                boxShadow: `0 4px 8px ${theme.shadowColor}`
              }}
            >
              <div 
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedShard(shard.id)
                }}
              >
                <button
                  className={`px-3 py-1.5 text-xs ${theme.textColor} border ${theme.borderColor} rounded-full hover:${theme.backgroundColor} transition-colors`}
                >
                  REMIX
                </button>
              </div>

              <div className={`text-xs ${theme.textColor} opacity-70 mb-3`}>
                {new Date(shard.timestamp).toLocaleString()}
              </div>
              
              <div className={`font-bold ${theme.textColor} mb-3 text-lg`}>
                {shard.prompt}
              </div>
              
              <div className={`${theme.textColor} mb-4 leading-relaxed`}>
                {shard.response}
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`text-xs ${theme.textColor} opacity-70`}>
                  Mode: {shard.mode.toUpperCase()} • Owner: {shard.owner.slice(0, 6)}...{shard.owner.slice(-4)}
                </div>
                {shard.remixes.length > 0 && (
                  <div className={`text-xs ${theme.textColor} opacity-70`}>
                    {shard.remixes.length} remix{shard.remixes.length !== 1 ? 'es' : ''}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Remix dialog */}
      {selectedShard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className={`${theme.backgroundColor} p-8 rounded-lg max-w-2xl w-full shadow-2xl transform transition-all duration-300`}>
            <h3 className={`${theme.textColor} font-[VT323,monospace] text-2xl mb-6`}>
              REMIX TRUTH SHARD
            </h3>
            
            <textarea
              value={remixPrompt}
              onChange={(e) => setRemixPrompt(e.target.value)}
              className={`w-full p-4 mb-6 ${theme.backgroundColor} border ${theme.borderColor} rounded-lg ${theme.textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
              placeholder="Enter your remix prompt..."
              rows={4}
            />
            
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedShard(null)}
                className={`px-6 py-2 ${theme.textColor} border ${theme.borderColor} rounded-lg hover:${theme.backgroundColor} transition-colors`}
              >
                CANCEL
              </button>
              <button
                onClick={() => handleRemix(selectedShard)}
                className={`px-6 py-2 ${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor} rounded-lg hover:opacity-90 transition-opacity`}
              >
                REMIX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 