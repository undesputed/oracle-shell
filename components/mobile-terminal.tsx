"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MobileTerminalHeader } from "./mobile-terminal-header"
import { MobileTerminalScreen } from "./mobile-terminal-screen"
import { MobileTerminalInput } from "./mobile-terminal-input"
import { MobileTruthShard } from "./mobile-truth-shard"
import { v4 as uuidv4 } from "uuid"
import type { TruthShardData } from "./truth-shard-gallery"

type Message = {
  type: "command" | "response" | "error" | "system"
  content: string
}

// Sample poetic messages for the truth command
const clairvoyantMessages = [
  "In digital dreams, the future unfolds\nLike quantum petals of light untold.",
  "Beneath the veil of mundane perception,\nLies truth's crystalline inception.",
  "The universe whispers in binary code,\nSecrets of paths not yet bestowed.",
]

const dissociativeMessages = [
  "Reality fragments like broken glass,\nPerception shatters, nothing will last.",
  "Disconnected from the linear flow,\nChaos patterns begin to grow.",
  "Identity dissolves in digital rain,\nConsciousness expanded beyond the brain.",
]

export function MobileTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    { type: "system", content: "ORACLE TERMINAL OS v2.1" },
    { type: "system", content: "MOBILE INTERFACE ACTIVE" },
    { type: "system", content: "Type 'HELP' for commands." },
  ])
  const [inputValue, setInputValue] = useState("")
  const [currentMode, setCurrentMode] = useState<"clairvoyant" | "dissociative">("clairvoyant")
  const [latestShard, setLatestShard] = useState<TruthShardData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands: Record<string, (args: string) => string> = {
    help: () =>
      "Available commands:\n" +
      "HELP - Show commands\n" +
      "CLEAR - Clear screen\n" +
      "ECHO [text] - Display text\n" +
      "TRUTH - Generate shard\n" +
      "TIME - Show current time",

    clear: () => {
      setMessages([{ type: "system", content: "Screen cleared." }])
      return ""
    },

    echo: (args) => args || "",

    time: () => new Date().toLocaleTimeString(),

    truth: () => {
      const mode = currentMode
      const messages = mode === "clairvoyant" ? clairvoyantMessages : dissociativeMessages
      const randomIndex = Math.floor(Math.random() * messages.length)
      const message = messages[randomIndex]

      // Create a new truth shard
      const newShard: TruthShardData = {
        id: uuidv4(),
        message,
        timestamp: new Date(),
        mode: currentMode,
        remixCount: 0,
      }

      // Set as latest shard
      setLatestShard(newShard)

      return "Generating truth shard..."
    },
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleModeChange = (mode: "clairvoyant" | "dissociative") => {
    setCurrentMode(mode)
    setMessages((prev) => [
      ...prev,
      {
        type: "system",
        content: `MODE: ${mode.toUpperCase()}`,
      },
    ])
  }

  const handleCommand = (command: string) => {
    // Add command to messages
    setMessages((prev) => [...prev, { type: "command", content: command }])

    // Process command
    const trimmedCommand = command.trim().toLowerCase()
    const [cmd, ...args] = trimmedCommand.split(" ")
    const argsStr = args.join(" ")

    // Execute command if it exists
    setTimeout(() => {
      if (cmd in commands) {
        try {
          const result = commands[cmd](argsStr)
          if (result) {
            setMessages((prev) => [...prev, { type: "response", content: result }])
          }
        } catch (error) {
          setMessages((prev) => [...prev, { type: "error", content: `Error: ${(error as Error).message}` }])
        }
      } else if (cmd) {
        setMessages((prev) => [...prev, { type: "error", content: `Unknown command: ${cmd}` }])
      }
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    handleCommand(inputValue)
    setInputValue("")
  }

  return (
    <div className="mobile-terminal flex h-full w-full flex-col bg-black">
      {/* Header with mode toggle */}
      <MobileTerminalHeader currentMode={currentMode} onModeChange={handleModeChange} />

      {/* Terminal screen */}
      <MobileTerminalScreen messages={messages} messagesEndRef={messagesEndRef} />

      {/* Latest Truth Shard (if available) */}
      {latestShard && (
        <div className="px-2 py-1">
          <MobileTruthShard shard={latestShard} />
        </div>
      )}

      {/* Input field */}
      <MobileTerminalInput value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
    </div>
  )
}
