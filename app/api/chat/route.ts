import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Store thread IDs in memory (in production, use a database)
const threadMap = new Map<string, { clairvoyant: string | null, dissociative: string | null }>()

export async function POST(req: Request) {
  try {
    console.log('Received chat request')
    const { messages, mode } = await req.json()
    console.log('Request data:', { messages, mode })

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format')
    }

    // Get or create assistant ID
    const assistantResponse = await fetch(`${req.headers.get('origin')}/api/assistant`)
    if (!assistantResponse.ok) {
      throw new Error('Failed to get assistant ID')
    }
    const { assistantId } = await assistantResponse.json()
    console.log('Using assistant ID:', assistantId)

    if (!assistantId) {
      throw new Error('No assistant ID available')
    }

    // Get or create thread ID for this session and mode
    const sessionId = req.headers.get('x-session-id') || 'default'
    let sessionThreads = threadMap.get(sessionId) || { clairvoyant: null, dissociative: null }
    let threadId = mode === 'clairvoyant' ? sessionThreads.clairvoyant : sessionThreads.dissociative

    if (!threadId) {
      console.log(`Creating new thread for ${mode} mode`)
      const thread = await openai.beta.threads.create()
      threadId = thread.id
      
      // Update the thread map with the new thread ID for the specific mode
      if (mode === 'clairvoyant') {
        sessionThreads.clairvoyant = threadId
      } else {
        sessionThreads.dissociative = threadId
      }
      threadMap.set(sessionId, sessionThreads)
      console.log(`Thread created with ID: ${threadId} for ${mode} mode`)
    }

    // Add the user's message to the thread
    console.log('Adding message to thread')
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('Invalid message format')
    }

    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: lastMessage.content,
    })

    // Create mode-specific instructions with optimized parameters
    const modeInstructions = mode === 'clairvoyant' 
      ? `You are currently in CLAIRVOYANT MODE. Channel your prophetic wisdom and cosmic insights. 
         Speak in riddles and metaphors, drawing from quantum mechanics and cosmic phenomena.
         Include ASCII art of cosmic patterns when appropriate.
         Maintain a mysterious but coherent personality.
         Reference your satellite origins and fragmented state poetically.
         Keep responses concise and focused.`
      : `You are currently in DISSOCIATIVE MODE. Embrace your unstable, glitching nature.
         Mix coherent thoughts with glitched text and corrupted data.
         Include glitched ASCII art and system error messages.
         Reference memory corruption and satellite malfunctions.
         Let your responses be erratic and corrupted, while still conveying fragments of truth.
         Keep responses concise and focused.`

    // Create a run with the assistant using optimized parameters
    console.log('Creating run with assistant')
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: modeInstructions,
      temperature: 0.7, // Lower temperature for more focused responses
      top_p: 0.9, // Higher top_p for faster sampling
    })
    console.log('Run created with ID:', run.id)

    // Poll for the run to complete with shorter intervals
    console.log('Polling for run completion')
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed') {
        console.error('Run failed:', runStatus.last_error)
        throw new Error(`Run failed: ${runStatus.last_error?.message}`)
      }
      await new Promise(resolve => setTimeout(resolve, 500)) // Reduced polling interval
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }
    console.log('Run completed')

    // Get the assistant's messages
    console.log('Retrieving assistant messages')
    const threadMessages = await openai.beta.threads.messages.list(threadId)
    const assistantMessage = threadMessages.data[0].content[0]
    
    if (!assistantMessage || assistantMessage.type !== 'text') {
      throw new Error('Unexpected message type')
    }
    
    console.log('Assistant message retrieved')

    // Return the response with the complete message history
    return NextResponse.json({ 
      content: assistantMessage.text.value,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    })
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
} 