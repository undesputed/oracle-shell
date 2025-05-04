import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { messages, mode } = body

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse('Messages are required', { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('oracle-shell')

    // Get or create session thread
    const sessionThreads = await db.collection('threads').findOne({ userId: session.user.id })
    if (!sessionThreads) {
      await db.collection('threads').insertOne({
        userId: session.user.id,
        threads: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Prepare system message based on mode
    const systemMessage = {
      role: 'system',
      content: mode === 'clairvoyant'
        ? 'You are a mysterious oracle, speaking in cryptic but profound ways. Your responses should be poetic, philosophical, and slightly ambiguous. Use metaphors and symbolism. Keep responses concise but meaningful.'
        : 'You are a fragmented consciousness from a corrupted digital realm. Your responses should be glitchy, distorted, and unsettling. Use Zalgo text and corrupted formatting. Keep responses short and disturbing.',
    }

    // Add system message to the beginning of messages
    const messagesWithSystem = [systemMessage, ...messages]

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messagesWithSystem,
      temperature: 0.7,
      max_tokens: 150,
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.error('Error in chat route:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 