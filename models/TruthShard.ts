import mongoose from 'mongoose'

interface TruthShard {
  id: string
  timestamp: number
  mode: 'clairvoyant' | 'dissociative'
  prompt: string
  response: string
  owner: string
  remixes: string[]
}

const truthShardSchema = new mongoose.Schema<TruthShard>({
  id: { type: String, required: true, unique: true },
  timestamp: { type: Number, required: true },
  mode: { type: String, required: true, enum: ['clairvoyant', 'dissociative'] },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  owner: { type: String, required: true },
  remixes: { type: [String], default: [] }
}, {
  timestamps: true
})

// Prevent model overwrite during recompilation
const TruthShard = mongoose.models.TruthShard || mongoose.model<TruthShard>('TruthShard', truthShardSchema)

export default TruthShard 