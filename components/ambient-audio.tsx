"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useOracleMode } from "@/hooks/use-oracle-mode"

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { mode } = useOracleMode()

  useEffect(() => {
    try {
      // Create audio element
      const audio = new Audio(mode === "clairvoyant" ? "/audio/ambient-synth.mp3" : "/audio/glitch-ambient.mp3")
      audio.loop = true
      audio.volume = volume
      audio.preload = "auto"

      // Add error handling
      audio.addEventListener("error", (e) => {
        console.warn("Ambient audio failed to load:", e)
      })

      audioRef.current = audio

      // Preload the audio
      audio.load()
    } catch (e) {
      console.warn("Ambient audio initialization failed:", e)
    }

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [mode])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Switch audio file when mode changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      try {
        audioRef.current.src = mode === "clairvoyant" ? "/audio/ambient-synth.mp3" : "/audio/glitch-ambient.mp3"
        audioRef.current.load()
        audioRef.current.play().catch((e) => {
          // Suppress console error for user interaction requirement
          if (e.name !== "NotAllowedError") {
            console.warn("Ambient audio playback failed:", e)
          }
        })
      } catch (e) {
        console.warn("Audio switch error:", e)
      }
    }
  }, [mode, isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => {
          // Suppress console error for user interaction requirement
          if (e.name !== "NotAllowedError") {
            console.warn("Ambient audio playback failed:", e)
          }
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-full border border-gray-700 bg-black/80 p-2 backdrop-blur-sm">
      <button
        onClick={togglePlay}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-cyan-400"
        title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
          className="h-1 w-20 appearance-none rounded-full bg-gray-700"
          style={{
            background: `linear-gradient(to right, ${mode === "clairvoyant" ? "#00ffff" : "#ff00ff"} 0%, ${mode === "clairvoyant" ? "#00ffff" : "#ff00ff"} ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
          }}
        />
      )}
    </div>
  )
}
