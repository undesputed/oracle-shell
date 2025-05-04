import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TruthShard from '@/models/TruthShard'
import { TruthShard as TruthShardType } from '@/types/truth-shard'

export async function GET() {
  try {
    await connectDB()
    const shards = await TruthShard.find().sort({ timestamp: -1 })
    return NextResponse.json({ shards })
  } catch (error) {
    console.error('Error fetching shards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shards' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const shard: TruthShardType = await request.json()

    // Check if shard exists
    const existingShard = await TruthShard.findOne({ id: shard.id })
    
    if (existingShard) {
      // Update existing shard
      const updatedShard = await TruthShard.findOneAndUpdate(
        { id: shard.id },
        shard,
        { new: true }
      )
      return NextResponse.json(updatedShard)
    } else {
      // Create new shard
      const newShard = await TruthShard.create(shard)
      return NextResponse.json(newShard)
    }
  } catch (error) {
    console.error('Error saving shard:', error)
    return NextResponse.json(
      { error: 'Failed to save shard' },
      { status: 500 }
    )
  }
} 