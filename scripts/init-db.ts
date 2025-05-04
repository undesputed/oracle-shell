import mongoose from 'mongoose'
import { config } from 'dotenv'

// Load environment variables
config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

async function initDB() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI as string)
    console.log('Successfully connected to MongoDB!')

    // Define the schema
    const truthShardSchema = new mongoose.Schema({
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

    // Create or get the model
    const TruthShard = mongoose.models.TruthShard || mongoose.model('TruthShard', truthShardSchema)

    // Create an index on the id field for faster lookups
    await TruthShard.createIndexes()
    console.log('Created indexes on TruthShard collection')

    // Verify we can perform basic operations
    const testShard = {
      id: 'test_' + Date.now(),
      timestamp: Date.now(),
      mode: 'clairvoyant' as const,
      prompt: 'Test prompt',
      response: 'Test response',
      owner: '0x' + Math.random().toString(16).substr(2, 40),
      remixes: []
    }

    const savedShard = await TruthShard.create(testShard)
    console.log('Successfully created test shard:', savedShard)

    // Clean up test data
    await TruthShard.deleteOne({ id: testShard.id })
    console.log('Cleaned up test data')

    console.log('Database initialization completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDB() 