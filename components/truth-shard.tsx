"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface TruthShardProps {
  message: string
  timestamp: Date
  mode: "clairvoyant" | "dissociative"
  className?: string
  onMint?: () => void
}

export function TruthShard({ message, timestamp, mode, className, onMint }: TruthShardProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Blinking cursor effect
  useState(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  })

  const handleMint = () => {
    setIsMinting(true)
    // Simulate blockchain minting process
    setTimeout(() => {
      setIsMinting(false)
      setIsMinted(true)
      onMint?.()
    }, 2000)
  }

  const formatTimestamp = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}.${month}.${day} | ${hours}:${minutes}:${seconds}`
  }

  const modeColor = mode === "clairvoyant" ? "green" : "purple"
  const textColor = mode === "clairvoyant" ? "cyan" : "purple"

  return (
    <div
      className={cn(
        "truth-shard relative mx-auto my-4 max-w-md overflow-hidden rounded-lg border p-4",
        mode === "clairvoyant"
          ? "border-green-700 bg-black/80 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
          : "border-purple-700 bg-black/80 shadow-[0_0_15px_rgba(255,0,255,0.3)]",
        className,
      )}
    >
      {/* Mode indicator */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-mono">
          <span className={`text-${modeColor}-400`}>{mode === "clairvoyant" ? "CLAIRVOYANT" : "DISSOCIATIVE"}</span>
          <span className="mx-2 text-gray-500">|</span>
          <span className="text-gray-400">{formatTimestamp(timestamp)}</span>
        </div>
      </div>

      {/* Prompt indicator */}
      <div className="mb-2">
        <span className="text-cyan-400">&gt;&gt; </span>
        <span className="text-purple-400">PROMPT:</span>
      </div>

      {/* Message */}
      <div className={`mb-4 font-mono text-${textColor}-400`}>
        <p className="whitespace-pre-wrap">{message}</p>
      </div>

      {/* Archiving status */}
      <div className="mt-4 text-green-400">
        {isMinted ? (
          "ARCHIVED AS TRUTH SHARD"
        ) : (
          <>
            ARCHIVING AS TRUTH SHARD
            <span
              className={`ml-1 inline-block h-4 w-3 bg-green-400 ${showCursor ? "opacity-100" : "opacity-0"}`}
            ></span>
          </>
        )}
      </div>

      {/* Mint button */}
      {!isMinted && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleMint}
            disabled={isMinting}
            className={cn(
              "relative overflow-hidden rounded border px-6 py-2 font-mono text-sm transition-all duration-300",
              mode === "clairvoyant"
                ? "border-green-700 bg-green-900/30 text-green-400 hover:bg-green-800/50 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                : "border-purple-700 bg-purple-900/30 text-purple-400 hover:bg-purple-800/50 hover:shadow-[0_0_10px_rgba(255,0,255,0.5)]",
              isMinting && "opacity-70",
            )}
          >
            {isMinting ? (
              <span className="flex items-center">
                <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                MINTING...
              </span>
            ) : (
              "MINT • 0x442e496 ↻"
            )}
          </button>
        </div>
      )}

      {/* Blockchain hash (appears when minted) */}
      {isMinted && (
        <div className="mt-2 text-center text-xs text-gray-500">
          <span>TX: 0x442e496</span>
        </div>
      )}

      <style jsx>{`
        .truth-shard {
          animation: pulse-border 4s infinite alternate;
        }
        
        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 15px rgba(${mode === "clairvoyant" ? "0, 255, 0" : "255, 0, 255"}, 0.3);
          }
          100% {
            box-shadow: 0 0 25px rgba(${mode === "clairvoyant" ? "0, 255, 0" : "255, 0, 255"}, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
