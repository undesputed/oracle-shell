export interface TruthShard {
  id: string
  timestamp: number
  mode: 'clairvoyant' | 'dissociative'
  prompt: string
  response: string
  owner: string
  remixes: string[]
} 