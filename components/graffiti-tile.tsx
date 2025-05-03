"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { GraffitiPost } from "./graffiti-wall"
import { MessageSquare, RefreshCw } from "lucide-react"

interface GraffitiTileProps {
  post: GraffitiPost
  onRemix: () => void
  onReply: () => void
  relatedPosts: GraffitiPost[]
}

export function GraffitiTile({ post, onRemix, onReply, relatedPosts }: GraffitiTileProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + "Y AGO"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + "M AGO"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + "D AGO"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + "H AGO"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + "M AGO"

    return Math.floor(seconds) + "S AGO"
  }

  // Random glitch effect
  useEffect(() => {
    if (isHovered) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 150)
        }
      }, 1000)

      return () => clearInterval(glitchInterval)
    }
  }, [isHovered])

  // Style variables based on post properties
  const getStyleProps = () => {
    const styleProps: Record<string, any> = {
      neon: {
        className: "font-pixel",
        textShadow: `0 0 5px ${getColorValue(post.color)}, 0 0 10px ${getColorValue(post.color)}, 0 0 20px ${getColorValue(post.color)}`,
      },
      pixel: {
        className: "font-mono tracking-wider",
        textShadow: `2px 2px 0px ${getColorValue(post.color, 0.7)}`,
      },
      drip: {
        className: "font-marker",
        textShadow: `0 0 3px ${getColorValue(post.color, 0.8)}`,
      },
      glitch: {
        className: "font-mono",
        textShadow: `1px 1px 2px ${getColorValue(post.color)}, -1px -1px 2px ${getColorValue(getComplementaryColor(post.color))}`,
      },
      stencil: {
        className: "font-stencil tracking-wider",
        textShadow: `1px 1px 0px ${getColorValue(post.color, 0.7)}`,
      },
    }

    return styleProps[post.style] || {}
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
    <div
      className={cn(
        "graffiti-tile relative overflow-hidden rounded-md bg-black/40 p-4 transition-all duration-300",
        isHovered ? "scale-[1.02]" : "scale-100",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spray paint background effect */}
      <div
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${getColorValue(post.color, 0.6)}, transparent 70%)`,
          opacity: isHovered ? 0.6 : 0.4,
        }}
      ></div>

      {/* Drips effect for drip style */}
      {post.style === "drip" && (
        <div className="drips absolute inset-x-0 top-0 z-0 h-full w-full opacity-70">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-[2px] rounded-b-full"
              style={{
                left: `${10 + i * 20}%`,
                height: `${30 + Math.random() * 70}%`,
                background: `linear-gradient(to bottom, ${getColorValue(post.color)}, transparent)`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Glitch overlay */}
      {isGlitching && <div className="glitch-overlay absolute inset-0 z-20 opacity-40"></div>}

      {/* Content */}
      <div className="relative z-10">
        {/* Message */}
        <div
          className={cn(
            "mb-3 font-bold",
            `text-${post.color === "green" ? "green-400" : post.color === "cyan" ? "cyan-400" : post.color === "magenta" ? "pink-400" : post.color === "yellow" ? "yellow-400" : "orange-400"}`,
            getStyleProps().className,
          )}
          style={{
            textShadow: getStyleProps().textShadow,
            fontSize: post.message.length > 50 ? "1rem" : "1.25rem",
          }}
        >
          {post.message}
        </div>

        {/* Author and timestamp */}
        <div className="mb-3 flex items-center justify-between text-xs">
          <div className="font-mono font-bold text-gray-400">
            <span className="text-gray-500">BY:</span> {post.author}
          </div>
          <div className="font-mono text-gray-500">{formatTimeAgo(post.timestamp)}</div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Reply button */}
            <button
              onClick={onReply}
              className="flex items-center gap-1 rounded border border-gray-700 bg-black/50 px-2 py-1 text-xs text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-300"
            >
              <MessageSquare size={12} />
              <span>{relatedPosts.length > 0 ? relatedPosts.length : ""}</span>
            </button>

            {/* Remix button */}
            <button
              onClick={onRemix}
              className="flex items-center gap-1 rounded border border-gray-700 bg-black/50 px-2 py-1 text-xs text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-300"
            >
              <RefreshCw size={12} />
              <span>{post.remixCount > 0 ? post.remixCount : ""}</span>
            </button>
          </div>

          {/* Reply indicator */}
          {post.replyTo && <div className="text-xs text-gray-500">REPLY</div>}
        </div>
      </div>

      <style jsx>{`
        .glitch-overlay {
          background: linear-gradient(
            45deg,
            rgba(0, 255, 255, 0.2),
            rgba(255, 0, 255, 0.2)
          );
          animation: glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}
