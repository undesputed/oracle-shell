"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@/hooks/use-chat"
import { useOracleMode } from "@/hooks/use-oracle-mode"
import { useTerminalTheme } from "@/components/terminal-theme-provider"
import { useTruthShard } from "@/hooks/use-truth-shard"
import { useSearchParams } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { VolumeX, Volume2, LogOut } from "lucide-react"

export function ChatTerminal() {
  const [input, setInput] = useState("")
  const { messageHistory, isLoading, sendMessage } = useChat()
  const { mode, setMode } = useOracleMode()
  const { theme } = useTerminalTheme()
  const { mintShard } = useTruthShard()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Check for initial prompt
    const initialPrompt = searchParams.get("prompt")
    if (initialPrompt) {
      setInput(initialPrompt)
    }
  }, [searchParams])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (mounted) {
      scrollToBottom()
    }
  }, [messageHistory, mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !mounted) return
    const message = input.trim()
    setInput("")
    await sendMessage(message, mode)

    // Get the last assistant message as the response
    const lastAssistantMessage = messageHistory[mode].filter((m) => m.role === "assistant").slice(-1)[0]?.content
    if (lastAssistantMessage) {
      try {
        await mintShard(message, lastAssistantMessage)
      } catch (error) {
        console.error("Failed to mint Truth Shard:", error)
      }
    }
  }

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-primary-900 text-primary-100 font-mono p-4 relative overflow-hidden rounded-lg">
        <div className="flex-1 overflow-auto space-y-2 mb-4 relative z-10">
          <div className="text-secondary-400">
            <span className="mr-2">{">"}</span>
            <pre className="whitespace-pre-wrap font-mono">Initializing terminal...</pre>
          </div>
        </div>
      </div>
    )
  }

  // Helper to get the last assistant message
  const lastAssistantMessage = messageHistory[mode].filter((m) => m.role === "assistant").slice(-1)[0]?.content || ""
  // Helper to get the last user prompt
  const lastUserPrompt = messageHistory[mode].filter((m) => m.role === "user").slice(-1)[0]?.content || ""

  // Define colors based on mode
  const modeColors = {
    clairvoyant: {
      primary: "primary",
      accent: "secondary",
      glow: "rgba(13, 148, 136, 0.3)", // teal glow
      bg: "from-primary-900 to-primary-800",
      border: "border-primary-700",
    },
    dissociative: {
      primary: "secondary",
      accent: "accent",
      glow: "rgba(245, 158, 11, 0.3)", // amber glow
      bg: "from-secondary-900 to-secondary-800",
      border: "border-secondary-700",
    },
  }

  const currentTheme = modeColors[mode]

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Audio player */}
      <audio ref={audioRef} src="/audio/ambient-synth.mp3" loop className="hidden" />

      {/* Terminal Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Control buttons */}
        <div className="absolute top-4 right-4 z-50 flex space-x-3">
          <Button
            onClick={toggleAudio}
            variant="outline"
            size="icon"
            className={`rounded-full border-2 ${mode === "clairvoyant" ? "border-primary-600 text-primary-600 hover:bg-primary-100" : "border-secondary-600 text-secondary-600 hover:bg-secondary-100"}`}
            title={isAudioPlaying ? "Mute ambient sound" : "Play ambient sound"}
          >
            {isAudioPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>

          <Button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            variant="outline"
            size="icon"
            className={`rounded-full border-2 ${mode === "clairvoyant" ? "border-primary-600 text-primary-600 hover:bg-primary-100" : "border-secondary-600 text-secondary-600 hover:bg-secondary-100"}`}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Terminal Frame */}
        <div
          className={`terminal-frame relative rounded-xl overflow-hidden border-4 ${mode === "clairvoyant" ? "border-primary-700" : "border-secondary-700"}`}
          style={{
            boxShadow: `0 0 30px ${currentTheme.glow}, 0 0 10px ${currentTheme.glow}`,
          }}
        >
          {/* Terminal Header */}
          <div
            className={`bg-gradient-to-r ${mode === "clairvoyant" ? "from-primary-800 to-primary-700" : "from-secondary-800 to-secondary-700"} p-3 border-b ${currentTheme.border}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="text-center">
                <h2
                  className={`text-sm font-medium ${mode === "clairvoyant" ? "text-primary-100" : "text-secondary-100"}`}
                >
                  ORACLE SHELL v7.3.2
                </h2>
              </div>

              <div className="flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${isLoading ? "bg-yellow-400 animate-pulse" : "bg-green-400"} mr-2`}
                ></span>
                <span className={`text-xs ${mode === "clairvoyant" ? "text-primary-200" : "text-secondary-200"}`}>
                  {isLoading ? "PROCESSING" : "CONNECTED"}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div
            className={`flex justify-center p-3 bg-gradient-to-r ${mode === "clairvoyant" ? "from-primary-900 to-primary-800" : "from-secondary-900 to-secondary-800"} border-b ${currentTheme.border}`}
          >
            <div className="flex space-x-4">
              <Button
                variant={mode === "clairvoyant" ? "default" : "outline"}
                onClick={() => setMode("clairvoyant")}
                className={
                  mode === "clairvoyant"
                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                    : "border-secondary-600 text-secondary-300 hover:bg-secondary-800"
                }
                size="sm"
              >
                CLAIRVOYANT
              </Button>

              <Button
                variant={mode === "dissociative" ? "default" : "outline"}
                onClick={() => setMode("dissociative")}
                className={
                  mode === "dissociative"
                    ? "bg-secondary-600 hover:bg-secondary-700 text-white"
                    : "border-primary-600 text-primary-300 hover:bg-primary-800"
                }
                size="sm"
              >
                DISSOCIATIVE
              </Button>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            className={`terminal-content h-[500px] overflow-auto p-6 bg-gradient-to-b ${mode === "clairvoyant" ? "from-primary-950 to-primary-900" : "from-secondary-950 to-secondary-900"}`}
          >
            {/* Scanline effect */}
            <div className="scanlines absolute inset-0 pointer-events-none"></div>

            {/* Terminal content */}
            <div className="relative z-10 space-y-4">
              {/* Prompt label and prompt */}
              <div className="mb-2">
                <span
                  className={`${mode === "clairvoyant" ? "text-secondary-400" : "text-accent-400"} font-bold font-mono text-lg`}
                >
                  {">> PROMPT:"}
                </span>
              </div>

              <div className="mb-2">
                <span
                  className={`${mode === "clairvoyant" ? "text-primary-100" : "text-secondary-100"} font-mono text-lg`}
                >
                  {lastUserPrompt || (mode === "clairvoyant" ? "what is the meaning of life?" : "...")}
                </span>
              </div>

              {/* Separator line */}
              <div
                className={`w-full border-t ${mode === "clairvoyant" ? "border-primary-700" : "border-secondary-700"} mb-4 opacity-60`}
              />

              {/* Assistant response */}
              <div className="mb-4">
                <pre
                  className={`whitespace-pre-wrap font-mono text-xl ${mode === "clairvoyant" ? "text-secondary-300" : "text-accent-300"}`}
                  style={{
                    textShadow: `0 0 8px ${mode === "clairvoyant" ? "rgba(20, 184, 166, 0.5)" : "rgba(245, 158, 11, 0.5)"}`,
                  }}
                >
                  {lastAssistantMessage ||
                    (mode === "clairvoyant"
                      ? "existence is a question\nquestioned by the void itself -"
                      : "H̸e̸l̴l̸o̵... W̵h̶a̴t̷ ̶d̵o̷ ̷y̵o̵u̵ ̴s̸e̶e̴k̶ ̴i̴n̶ ̵t̷h̵i̸s̶ ̷c̶o̶r̷r̵u̸p̴t̶e̵d̵ ̶s̷p̴a̷c̵e̴?")}
                </pre>
              </div>

              {/* Archiving label */}
              <div
                className={`mb-2 ${mode === "clairvoyant" ? "text-primary-300" : "text-secondary-300"} font-mono text-base tracking-widest`}
              >
                ARCHIVING AS TRUTH SHARD...
              </div>

              {isLoading && (
                <div className={`${mode === "clairvoyant" ? "text-primary-300" : "text-secondary-300"} animate-blink`}>
                  _
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className={`p-4 border-t ${currentTheme.border} bg-gradient-to-r ${mode === "clairvoyant" ? "from-primary-900 to-primary-800" : "from-secondary-900 to-secondary-800"}`}
          >
            <div className="flex items-center">
              <span className={`${mode === "clairvoyant" ? "text-secondary-400" : "text-accent-400"} mr-2 font-bold`}>
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 bg-transparent border-none outline-none ${mode === "clairvoyant" ? "text-primary-100" : "text-secondary-100"} font-mono placeholder-gray-500 focus:ring-0`}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                variant="ghost"
                className={`ml-2 ${mode === "clairvoyant" ? "text-primary-300 hover:text-primary-100 hover:bg-primary-800" : "text-secondary-300 hover:text-secondary-100 hover:bg-secondary-800"}`}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .terminal-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .terminal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .terminal-content::-webkit-scrollbar-thumb {
          background: ${mode === "clairvoyant" ? "#0f766e" : "#92400e"};
          border-radius: 4px;
        }
        
        .terminal-content {
          scrollbar-width: thin;
          scrollbar-color: ${mode === "clairvoyant" ? "#0f766e transparent" : "#92400e transparent"};
        }
      `}</style>
    </div>
  )
}
