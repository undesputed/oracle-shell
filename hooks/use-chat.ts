import { useState, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

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
      setMessages(prev => [...prev, userMessage])

      // Send message to the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode,
        }),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`)
      }

      const data = await response.json()
      console.log('Response data:', data)
      
      // Add assistant message to the state
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message to the state
      const errorMessage: Message = {
        role: 'assistant',
        content: `ERROR: ${error instanceof Error ? error.message : 'Signal lost in the void... Please try again.'}`,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    sendMessage,
  }
} 