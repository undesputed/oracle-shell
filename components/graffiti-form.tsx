"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { GraffitiPost } from "./graffiti-wall"

interface GraffitiFormProps {
  onSubmit: (post: Omit<GraffitiPost, "id" | "timestamp" | "remixCount">) => void
  onCancel: () => void
  replyTo?: string
  originalPost?: GraffitiPost | null
}

export function GraffitiForm({ onSubmit, onCancel, replyTo, originalPost }: GraffitiFormProps) {
  const [message, setMessage] = useState(originalPost ? originalPost.message : "")
  const [author, setAuthor] = useState("ANON")
  const [color, setColor] = useState<"cyan" | "magenta" | "green" | "yellow" | "orange">(
    originalPost ? originalPost.color : "cyan",
  )
  const [style, setStyle] = useState<"neon" | "pixel" | "drip" | "glitch" | "stencil">(
    originalPost ? originalPost.style : "neon",
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    onSubmit({
      message: message.trim().toUpperCase(),
      author: author.trim() || "ANON",
      color,
      style,
      replyTo,
      truthShardId: originalPost?.truthShardId,
    })
  }

  // Preview style
  const getStylePreview = () => {
    const styleProps: Record<string, React.CSSProperties> = {
      neon: {
        fontFamily: "var(--font-press-start)",
        textShadow: `0 0 5px ${getColorValue(color)}, 0 0 10px ${getColorValue(color)}, 0 0 20px ${getColorValue(color)}`,
      },
      pixel: {
        fontFamily: "var(--font-vt323)",
        letterSpacing: "1px",
        textShadow: `2px 2px 0px ${getColorValue(color, 0.7)}`,
      },
      drip: {
        fontFamily: "var(--font-permanent-marker)",
        textShadow: `0 0 3px ${getColorValue(color, 0.8)}`,
      },
      glitch: {
        fontFamily: "var(--font-vt323)",
        textShadow: `1px 1px 2px ${getColorValue(color)}, -1px -1px 2px ${getColorValue(getComplementaryColor(color))}`,
      },
      stencil: {
        fontFamily: "var(--font-black-ops)",
        letterSpacing: "1px",
        textShadow: `1px 1px 0px ${getColorValue(color, 0.7)}`,
      },
    }

    return styleProps[style] || {}
  }

  // Get color value
  const getColorValue = (color: string, opacity = 1) => {
    const colors: Record<string, string> = {
      cyan: `rgba(0, 255, 255, ${opacity})`,
      magenta: `rgba(255, 0, 255, ${opacity})`,
      green: `rgba(0, 255, 0, ${opacity})`,
      yellow: `rgba(255, 255, 0, ${opacity})`,
      orange: `rgba(255, 165, 0, ${opacity})`,
    }

    return colors[color] || colors.cyan
  }

  // Get complementary color
  const getComplementaryColor = (color: string) => {
    const pairs: Record<string, string> = {
      cyan: "magenta",
      magenta: "cyan",
      green: "magenta",
      yellow: "cyan",
      orange: "cyan",
    }

    return pairs[color] || "cyan"
  }

  return (
    <div className="graffiti-form rounded-md border border-gray-700 bg-black/60 p-4 backdrop-blur-sm">
      <h3 className="mb-4 font-mono text-lg font-bold text-green-400">
        {originalPost ? "REMIX GRAFFITI" : replyTo ? "REPLY WITH GRAFFITI" : "ADD NEW GRAFFITI"}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Message input */}
        <div className="mb-4">
          <label htmlFor="message" className="mb-1 block text-xs text-gray-400">
            MESSAGE
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded border border-gray-700 bg-black/60 p-2 font-mono text-white placeholder-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="YOUR MESSAGE HERE..."
            rows={3}
            maxLength={100}
            required
          />
          <div className="mt-1 text-right text-xs text-gray-500">{message.length}/100</div>
        </div>

        {/* Author input */}
        <div className="mb-4">
          <label htmlFor="author" className="mb-1 block text-xs text-gray-400">
            SIGNATURE
          </label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded border border-gray-700 bg-black/60 p-2 font-mono text-white placeholder-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="ANON"
            maxLength={15}
          />
        </div>

        {/* Style options */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* Color selection */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">COLOR</label>
            <div className="flex flex-wrap gap-2">
              {["cyan", "magenta", "green", "yellow", "orange"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={cn("h-6 w-6 rounded-full border-2", color === c ? "border-white" : "border-transparent")}
                  style={{ backgroundColor: getColorValue(c) }}
                  onClick={() => setColor(c as any)}
                />
              ))}
            </div>
          </div>

          {/* Style selection */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">STYLE</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as any)}
              className="w-full rounded border border-gray-700 bg-black/60 p-2 font-mono text-white focus:border-green-500 focus:outline-none"
            >
              <option value="neon">NEON</option>
              <option value="pixel">PIXEL</option>
              <option value="drip">DRIP</option>
              <option value="glitch">GLITCH</option>
              <option value="stencil">STENCIL</option>
            </select>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-4">
          <label className="mb-1 block text-xs text-gray-400">PREVIEW</label>
          <div className="flex h-20 items-center justify-center rounded border border-gray-700 bg-black/40 p-3">
            <div
              className={cn(
                "text-center font-bold",
                `text-${color === "green" ? "green-400" : color === "cyan" ? "cyan-400" : color === "magenta" ? "pink-400" : color === "yellow" ? "yellow-400" : "orange-400"}`,
              )}
              style={getStylePreview()}
            >
              {message || "PREVIEW TEXT"}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-gray-700 bg-black/50 px-4 py-2 font-mono text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-300"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="rounded border border-green-700 bg-green-900/30 px-4 py-2 font-mono text-sm text-green-400 shadow-[0_0_8px_rgba(0,255,0,0.3)] transition-all hover:bg-green-900/50 hover:text-green-300"
          >
            {originalPost ? "REMIX" : "SPRAY"}
          </button>
        </div>
      </form>
    </div>
  )
}
