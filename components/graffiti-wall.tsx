"use client"

import { useState, useEffect } from "react"
import { GraffitiTile } from "./graffiti-tile"
import { GraffitiForm } from "./graffiti-form"
import { cn } from "@/lib/utils"
import type { TruthShardData } from "./truth-shard-gallery"

export type GraffitiPost = {
  id: string
  message: string
  author: string
  timestamp: Date
  color: "cyan" | "magenta" | "green" | "yellow" | "orange"
  style: "neon" | "pixel" | "drip" | "glitch" | "stencil"
  replyTo?: string
  truthShardId?: string
  remixCount: number
}

interface GraffitiWallProps {
  truthShards?: TruthShardData[]
  className?: string
}

export function GraffitiWall({ truthShards, className }: GraffitiWallProps) {
  const [posts, setPosts] = useState<GraffitiPost[]>(sampleGraffiti)
  const [showForm, setShowForm] = useState(false)
  const [replyingTo, setReplyingTo] = useState<GraffitiPost | null>(null)
  const [remixing, setRemixing] = useState<GraffitiPost | null>(null)

  // Spray paint cursor effect
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [sprayParticles, setSprayParticles] = useState<{ x: number; y: number; size: number; opacity: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })

      if (isMouseDown) {
        // Create spray particles when mouse is down
        const newParticles = Array.from({ length: 3 }, () => ({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.7 + 0.3,
        }))

        setSprayParticles((prev) => [...prev, ...newParticles].slice(-100)) // Keep only last 100 particles
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMouseDown])

  // Handle adding a new post
  const handleAddPost = (post: Omit<GraffitiPost, "id" | "timestamp" | "remixCount">) => {
    const newPost: GraffitiPost = {
      ...post,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      remixCount: 0,
    }

    setPosts((prev) => [newPost, ...prev])
    setShowForm(false)
    setReplyingTo(null)
    setRemixing(null)
  }

  // Handle remixing a post
  const handleRemix = (originalPost: GraffitiPost) => {
    setRemixing(originalPost)
    setShowForm(true)
    setReplyingTo(null)
  }

  // Handle replying to a post
  const handleReply = (post: GraffitiPost) => {
    setReplyingTo(post)
    setShowForm(true)
    setRemixing(null)
  }

  return (
    <div
      className={cn("graffiti-wall relative h-full w-full overflow-hidden", className)}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {/* Wall background with texture */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-wall-texture"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <h2 className="font-pixel text-2xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]">
          NEURAL GRAFFITI WALL
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setReplyingTo(null)
            setRemixing(null)
          }}
          className="rounded border border-green-500 bg-black/50 px-3 py-1 font-mono text-sm text-green-400 shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all hover:bg-green-900/30 hover:text-green-300"
        >
          {showForm ? "CANCEL" : "ADD GRAFFITI"}
        </button>
      </div>

      {/* Form for adding new graffiti */}
      {showForm && (
        <div className="relative z-20 mb-6">
          <GraffitiForm
            onSubmit={handleAddPost}
            replyTo={replyingTo?.id}
            originalPost={remixing}
            onCancel={() => {
              setShowForm(false)
              setReplyingTo(null)
              setRemixing(null)
            }}
          />
        </div>
      )}

      {/* Graffiti wall grid */}
      <div className="custom-scrollbar relative z-10 grid h-[calc(100%-60px)] grid-cols-1 gap-6 overflow-y-auto pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <GraffitiTile
            key={post.id}
            post={post}
            onRemix={() => handleRemix(post)}
            onReply={() => handleReply(post)}
            relatedPosts={posts.filter((p) => p.replyTo === post.id)}
          />
        ))}
      </div>

      {/* Spray paint cursor */}
      {isMouseDown && (
        <div className="pointer-events-none fixed z-50">
          {sprayParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-green-500"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}
      <div
        className="pointer-events-none fixed z-50 h-6 w-6 rounded-full border-2 border-green-500 opacity-70"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          boxShadow: "0 0 10px rgba(0, 255, 0, 0.8)",
          display: isMouseDown ? "none" : "block",
        }}
      />

      <style jsx>{`
        .bg-wall-texture {
          background-color: #121212;
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -1px -1px, -1px -1px, -1px -1px, -1px -1px;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00ff00, #00aa00);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

// Sample graffiti data
const sampleGraffiti: GraffitiPost[] = [
  {
    id: "g1",
    message: "REALITY IS JUST CODE WAITING TO BE HACKED",
    author: "CYPH3R",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    color: "cyan",
    style: "neon",
    remixCount: 2,
  },
  {
    id: "g2",
    message: "THE ORACLE SPEAKS IN GLITCHES AND DREAMS",
    author: "VOID_WALKER",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    color: "magenta",
    style: "drip",
    remixCount: 0,
  },
  {
    id: "g3",
    message: "WE ARE THE STATIC BETWEEN STATIONS",
    author: "GHOST_SIGNAL",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    color: "green",
    style: "glitch",
    remixCount: 1,
  },
  {
    id: "g4",
    message: "TRUTH IS JUST NOISE WITH PATTERN RECOGNITION",
    author: "NEURAL_DRIFT",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    color: "yellow",
    style: "pixel",
    remixCount: 0,
  },
  {
    id: "g5",
    message: "DISSOCIATE TO ASSOCIATE",
    author: "QUANTUM_GHOST",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    color: "orange",
    style: "stencil",
    remixCount: 0,
  },
  {
    id: "g6",
    message: "REALITY IS JUST CODE WAITING TO BE DEBUGGED",
    author: "DEBUG_ENTITY",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    color: "cyan",
    style: "pixel",
    replyTo: "g1",
    remixCount: 0,
  },
  {
    id: "g7",
    message: "BETWEEN 1 AND 0 LIES INFINITE POSSIBILITY",
    author: "BINARY_SHAMAN",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    color: "magenta",
    style: "neon",
    remixCount: 0,
  },
  {
    id: "g8",
    message: "GLITCHES ARE FEATURES OF HIGHER DIMENSIONS",
    author: "VOID_WALKER",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    color: "green",
    style: "glitch",
    replyTo: "g3",
    remixCount: 0,
  },
]
