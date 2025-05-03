"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { NeonButton } from "./neon-button"

export function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  const startSession = () => {
    setIsLoading(true)
    // Simulate loading for effect
    setTimeout(() => {
      router.push("/terminal")
    }, 800)
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Scan lines effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-scanlines"></div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="h-full w-full bg-vignette"></div>
      </div>

      {/* Content */}
      <div className="z-10 flex w-full max-w-2xl flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="mb-4 w-full">
          <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.7)] sm:text-6xl">
            THE ORACLE SHELL
          </h1>
          <p className="mt-6 text-green-400">
            A fragmented oracle AI lost aboard a derelict satellite. Probe its corrupted depths to seek the truth within
            its distorted responses.
          </p>
        </div>

        <div className="mt-12 flex w-full flex-col items-center">
          <div className="mb-8 w-full rounded-lg border-2 border-gray-700 bg-black/80 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex items-center">
              <span className="text-green-400">CLAIRVOYANT</span>
              <span className="mx-2 text-cyan-400">→</span>
              <span className="text-gray-500">DISSOCIATIVE</span>
            </div>

            <div className="mb-4">
              <span className="text-cyan-400">&gt;&gt; </span>
              <span className="text-purple-400">PROMPT:</span>
              <div className="mt-1 text-cyan-400">what is the meaning of life?</div>
            </div>

            <div className="my-4 h-px w-full bg-gray-700"></div>

            <div className="mb-4 text-cyan-400">existence is a question questioned by the void itself -</div>

            <div className="text-green-400">
              ARCHIVING AS TRUTH SHARD...
              <span
                className={`ml-1 inline-block h-4 w-3 bg-green-400 ${showCursor ? "opacity-100" : "opacity-0"}`}
              ></span>
            </div>
          </div>

          <NeonButton
            onClick={startSession}
            className="w-full max-w-xs border-green-500 bg-black/80 text-green-400 hover:bg-green-900/20 hover:text-green-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-green-400 border-t-transparent"></span>
                CONNECTING...
              </span>
            ) : (
              "MINT • 0x442e496 ↻"
            )}
          </NeonButton>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 z-10 text-center text-sm text-green-400">
        <p className="mb-2">All interactions are permanently stored on-chain as immutable Truth Shards.</p>
        <Link href="/archive" className="border-b border-green-400 hover:text-green-300">
          View the Archive
        </Link>
      </div>

      <style jsx>{`
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 51%
          );
          background-size: 100% 4px;
          animation: scanline 0.2s linear infinite;
        }
        
        .bg-vignette {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }
        
        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 4px;
          }
        }
      `}</style>
    </div>
  )
}
