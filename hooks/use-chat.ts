"use client"

import { useState, useEffect } from 'react'
import { useOracleMode } from './use-oracle-mode'
import { useTruthShard } from './use-truth-shard'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface MessageHistory {
  clairvoyant: Message[]
  dissociative: Message[]
}

export function useChat() {
  const [messageHistory, setMessageHistory] = useState<MessageHistory>({
    clairvoyant: [],
    dissociative: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const { mode } = useOracleMode()
  const { mintShard } = useTruthShard()

  useEffect(() => {
    setMounted(true)
    // Generate a stable session ID using timestamp and a fixed string
    const id = `session_${Date.now()}`
    setSessionId(id)
  }, [])

  const sendMessage = async (content: string, mode: 'clairvoyant' | 'dissociative') => {
    if (!mounted) return

    try {
      setIsLoading(true)
      console.log('Sending message:', { content, mode })
      
      // Add user message to the state immediately
      const userMessage: Message = { role: 'user', content }
      setMessageHistory(prev => ({
        ...prev,
        [mode]: [...prev[mode], userMessage]
      }))

      // Send message to the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          messages: [...messageHistory[mode], userMessage],
          mode,
        }),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to send message: ${response.status}`)
      }

      const data = await response.json()
      console.log('Response data:', data)
      
      if (!data.content) {
        throw new Error('No content in response')
      }

      // Add assistant message to the state
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      }
      setMessageHistory(prev => ({
        ...prev,
        [mode]: [...prev[mode], assistantMessage]
      }))

      // Mint a new Truth Shard for this exchange
      try {
        await mintShard(content, data.content)
      } catch (error) {
        console.error('Failed to mint Truth Shard:', error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message to the state
      const errorMessage: Message = {
        role: 'assistant',
        content: `ERROR: ${error instanceof Error ? error.message : 'Signal lost in the void... Please try again.'}`,
      }
      setMessageHistory(prev => ({
        ...prev,
        [mode]: [...prev[mode], errorMessage]
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages: messageHistory[mode],
    isLoading,
    sendMessage,
  }
} 