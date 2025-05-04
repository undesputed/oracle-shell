import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { TruthShard as TruthShardType } from '@/types/truth-shard'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('oracle-shell')
    
    // Ensure the collection exists
    const collections = await db.listCollections().toArray()
    if (!collections.some(c => c.name === 'truthshards')) {
      await db.createCollection('truthshards')
    }

    const shards = await db.collection('truthshards').find().sort({ timestamp: -1 }).toArray()
    return NextResponse.json({ shards })
  } catch (error) {
    console.error('Error fetching shards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shards', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('oracle-shell')
    
    // Ensure the collection exists
    const collections = await db.listCollections().toArray()
    if (!collections.some(c => c.name === 'truthshards')) {
      await db.createCollection('truthshards')
    }

    const shard: TruthShardType = await request.json()

    // Check if shard exists
    const existingShard = await db.collection('truthshards').findOne({ id: shard.id })
    
    if (existingShard) {
      // Update existing shard
      const result = await db.collection('truthshards').findOneAndUpdate(
        { id: shard.id },
        { $set: shard },
        { returnDocument: 'after' }
      )
      
      if (!result || !result.value) {
        throw new Error('Failed to update shard')
      }
      
      return NextResponse.json(result.value)
    } else {
      // Create new shard
      await db.collection('truthshards').insertOne(shard)
      return NextResponse.json(shard)
    }
  } catch (error) {
    console.error('Error saving shard:', error)
    return NextResponse.json(
      { error: 'Failed to save shard', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}   