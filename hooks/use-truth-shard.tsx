"use client"

import { useState, useEffect } from 'react'
import { useOracleMode } from './use-oracle-mode'
import { TruthShard } from '@/types/truth-shard'

export function useTruthShard() {
  const [shards, setShards] = useState<TruthShard[]>([])
  const { mode } = useOracleMode()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    // Load shards from API on mount
    fetchShards()
  }, [])

  const fetchShards = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/shards')
      if (!response.ok) throw new Error('Failed to fetch shards')
      const data = await response.json()
      setShards(data.shards)
    } catch (error) {
      console.error('Error fetching shards:', error)
      setError('Failed to load Truth Shards')
    } finally {
      setIsLoading(false)
    }
  }

  const mintShard = async (prompt: string, response: string) => {
    if (!mounted) return

    try {
      setIsLoading(true)
      setError(null)
      const newShard: TruthShard = {
        id: `shard_${Date.now()}`,
        timestamp: Date.now(),
        mode,
        prompt,
        response,
        owner: '0x' + Math.random().toString(16).substr(2, 40), // Placeholder for wallet address
        remixes: []
      }

      // Save to API
      const saveResponse = await fetch('/api/shards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShard),
      })

      if (!saveResponse.ok) throw new Error('Failed to save shard')

      // Update local state
      setShards(prev => [...prev, newShard])
      return newShard
    } catch (error) {
      console.error('Failed to mint Truth Shard:', error)
      setError('Failed to mint Truth Shard')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const remixShard = async (originalShardId: string, newPrompt: string, newResponse: string) => {
    if (!mounted) return

    try {
      setIsLoading(true)
      setError(null)
      const originalShard = shards.find(s => s.id === originalShardId)
      if (!originalShard) throw new Error('Original shard not found')

      const remixedShard = await mintShard(newPrompt, newResponse)
      if (!remixedShard) throw new Error('Failed to create remixed shard')
      
      // Update the original shard's remixes
      const updatedOriginalShard = {
        ...originalShard,
        remixes: [...originalShard.remixes, remixedShard.id]
      }

      // Save updated original shard
      const saveResponse = await fetch('/api/shards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOriginalShard),
      })

      if (!saveResponse.ok) throw new Error('Failed to update original shard')

      // Update local state
      setShards(prev => prev.map(shard => 
        shard.id === originalShardId ? updatedOriginalShard : shard
      ))

      return remixedShard
    } catch (error) {
      console.error('Failed to remix Truth Shard:', error)
      setError('Failed to remix Truth Shard')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    shards,
    isLoading,
    error,
    mintShard,
    remixShard,
    refreshShards: fetchShards
  }
} 