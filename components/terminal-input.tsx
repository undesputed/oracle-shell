"use client"

import type React from "react"

import type { ChangeEvent, FormEvent, KeyboardEvent } from "react"
import { useEffect, useRef } from "react"

interface TerminalInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

export function TerminalInput({ value, onChange, onSubmit, onKeyDown }: TerminalInputProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      // Create audio element with error handling
      const audio = new Audio("/audio/key-press.mp3")
      audio.volume = 0.2

      // Preload the audio
      audio.preload = "auto"

      // Add error handling for loading
      audio.addEventListener("error", (e) => {
        console.warn("Audio failed to load:", e)
      })

      audioRef.current = audio

      // Test load the audio
      audio.load()
    } catch (e) {
      console.warn("Audio initialization failed:", e)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current = null
      }
    }
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Play typing sound with better error handling
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0
        const playPromise = audioRef.current.play()

        // Handle the play promise properly
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            // Suppress console error for user interaction requirement
            if (e.name !== "NotAllowedError") {
              console.warn("Audio playback failed:", e)
            }
          })
        }
      } catch (e) {
        // Silently fail if audio playback fails
        console.warn("Audio playback error:", e)
      }
    }

    // Call the original onKeyDown handler
    onKeyDown(e)
  }

  return (
    <form onSubmit={onSubmit} className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-black p-4">
      <div className="flex items-center">
        <span className="mr-2 text-cyan-400">&gt;&gt;</span>
        <span className="mr-2 text-purple-400">PROMPT:</span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          className="w-full bg-transparent font-mono text-cyan-400 outline-none"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        <span className="ml-1 h-5 w-3 animate-[blink_1s_steps(1)_infinite] bg-cyan-400"></span>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 49% {
            opacity: 0;
          }
          50%, 100% {
            opacity: 1;
          }
        }
      `}</style>
    </form>
  )
}
