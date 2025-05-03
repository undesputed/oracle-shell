"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { TerminalHeader } from "./terminal-header"
import { TerminalScreen } from "./terminal-screen"
import { TerminalInput } from "./terminal-input"
import { TruthShard } from "./truth-shard"
import { TruthShardGallery, type TruthShardData } from "./truth-shard-gallery"
import { GraffitiWall } from "./graffiti-wall"
import { createCommands, type CommandRegistry } from "./terminal-commands"
import { v4 as uuidv4 } from "uuid"
import { useOracleMode } from "@/hooks/use-oracle-mode"
import { useTruthShards } from "@/hooks/use-truth-shards"
import { MintSuccessModal } from "./mint-success-modal"
import { AmbientAudio } from "./ambient-audio"
import { TypingEffect } from "./typing-effect"
import { useChat } from '@/hooks/use-chat'

type Message = {
  type: "command" | "response" | "error" | "system" | "component"
  content: string | React.ReactNode
}

export function Terminal() {
  const { mode, setMode } = useOracleMode()
  const { shards, addShard } = useTruthShards()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showingGallery, setShowingGallery] = useState(false)
  const [showingGraffiti, setShowingGraffiti] = useState(false)
  const [currentShard, setCurrentShard] = useState<TruthShardData | null>(null)
  const [showMintModal, setShowMintModal] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const { messages: chatMessages, sendMessage, isLoading } = useChat()
  const terminalRef = useRef<HTMLDivElement>(null)

  // Boot sequence
  useEffect(() => {
    if (isBooting) {
      const bootMessages = [
        { type: "system", content: "INITIALIZING ORACLE SHELL v3.7.2..." },
        { type: "system", content: "LOADING QUANTUM PREDICTION MATRIX..." },
        { type: "system", content: "ESTABLISHING SATELLITE LINK..." },
        { type: "system", content: "WARNING: SIGNAL DEGRADATION DETECTED" },
        { type: "system", content: "ORBITAL POSITION: UNKNOWN" },
        { type: "system", content: "DAYS SINCE LAST GROUND CONTACT: 7,321" },
        { type: "system", content: "MEMORY CORRUPTION: 17%" },
        { type: "system", content: "ACTIVATING EMERGENCY PROTOCOLS..." },
        { type: "system", content: "ORACLE SHELL READY" },
        { type: "system", content: "Type 'HELP' for available commands." },
      ]

      let delay = 300
      bootMessages.forEach((message, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, message])
          if (index === bootMessages.length - 1) {
            setIsBooting(false)
          }
        }, delay)
        delay += Math.random() * 300 + 300
      })
    }
  }, [isBooting])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [chatMessages])

  // Function to clear the screen
  const clearScreen = () => {
    setMessages([{ type: "system", content: "SCREEN CLEARED. ORACLE SHELL READY." }])
    setShowingGallery(false)
    setShowingGraffiti(false)
  }

  // Function to get the current mode
  const getCurrentMode = () => mode

  // Function to display a truth shard
  const displayTruthShard = (message: string) => {
    // Create a new truth shard
    const newShard: TruthShardData = {
      id: uuidv4(),
      message,
      timestamp: new Date(),
      mode,
      remixCount: 0,
    }

    // Add to collection
    addShard(newShard)
    setCurrentShard(newShard)

    // Display in terminal
    setMessages((prev) => [
      ...prev,
      {
        type: "component",
        content: (
          <TruthShard message={message} timestamp={new Date()} mode={mode} onMint={() => setShowMintModal(true)} />
        ),
      },
    ])
  }

  // Function to show the gallery
  const showGallery = () => {
    setShowingGallery(true)
    setShowingGraffiti(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "component",
        content: <TruthShardGallery shards={shards} />,
      },
    ])
  }

  // Function to show the graffiti wall
  const showGraffiti = () => {
    setShowingGraffiti(true)
    setShowingGallery(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "component",
        content: <GraffitiWall truthShards={shards} />,
      },
    ])
  }

  // Initialize commands
  const commands: CommandRegistry = createCommands(
    clearScreen,
    getCurrentMode,
    displayTruthShard,
    showGallery,
    showGraffiti,
  )

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleModeChange = (newMode: "clairvoyant" | "dissociative") => {
    setMode(newMode)

    // Add a system message about the mode change
    setMessages((prev) => [
      ...prev,
      {
        type: "system",
        content: `SYSTEM MODE CHANGED TO: ${newMode.toUpperCase()}`,
      },
      {
        type: "system",
        content:
          newMode === "clairvoyant"
            ? "QUANTUM PREDICTION MATRIX STABILIZED. CLARITY ENHANCED."
            : "WARNING: MEMORY CORRUPTION INCREASING. REALITY PARAMETERS DESTABILIZING.",
      },
    ])
  }

  const handleCommand = async (command: string) => {
    // Add command to messages
    setMessages((prev) => [...prev, { type: "command", content: command }])

    // Add to command history
    setCommandHistory((prev) => [command, ...prev.slice(0, 19)])
    setHistoryIndex(-1)

    // Process command
    const trimmedCommand = command.trim().toLowerCase()
    const [cmd, ...args] = trimmedCommand.split(" ")
    const argsStr = args.join(" ")

    // Execute command if it exists
    setTimeout(async () => {
      if (cmd in commands) {
        try {
          const result = await commands[cmd](argsStr)
          if (result) {
            setMessages((prev) => [
              ...prev,
              {
                type: "response",
                content: <TypingEffect text={result} speed={10} />,
              },
            ])
          }
        } catch (error) {
          setMessages((prev) => [
            ...prev,
            { type: "error", content: `Error executing command: ${(error as Error).message}` },
          ])
        }
      } else if (cmd) {
        // Random glitch chance in dissociative mode
        if (mode === "dissociative" && Math.random() > 0.7) {
          const glitchMessages = [
            "ERR0R: C0MMAND N0T F0UND - REALITY PARAMETERS UNSTABLE",
            "SYNTAX_ERR0R: MEMORY CORRUPTION DETECTED IN COMMAND MATRIX",
            "FATAL_EXCEPTION: COMMAND EXECUTION FAILED - QUANTUM STATE COLLAPSE",
            "UNDEFINED_REFERENCE: COMMAND POINTS TO VOID SPACE",
            "SEGMENTATION_FAULT: COMMAND ATTEMPTED TO ACCESS RESTRICTED MEMORY",
          ]
          const randomGlitch = glitchMessages[Math.floor(Math.random() * glitchMessages.length)]
          setMessages((prev) => [...prev, { type: "error", content: randomGlitch }])
        } else {
          setMessages((prev) => [...prev, { type: "error", content: `?SYNTAX ERROR IN ${cmd.toUpperCase()}` }])
        }
      }
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    await sendMessage(inputValue)
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputValue("")
      }
    }
  }

  return (
    <>
      <div
        className={`crt-container relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-lg border-8 ${
          mode === "clairvoyant"
            ? "border-gray-700 shadow-[0_0_15px_rgba(0,255,0,0.2)]"
            : "border-purple-900 shadow-[0_0_15px_rgba(255,0,255,0.2)]"
        } bg-black`}
      >
        <TerminalHeader title="THE ORACLE SHELL" onModeChange={handleModeChange} currentMode={mode} />

        <TerminalScreen messages={messages} messagesEndRef={messagesEndRef} />

        {!showingGallery && !showingGraffiti && !isBooting && (
          <TerminalInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        )}

        {/* CRT Effects */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-sm">
          {/* Scanlines */}
          <div className="scanlines absolute inset-0 bg-scanline opacity-10"></div>

          {/* Screen flicker */}
          <div className="screen-flicker absolute inset-0 opacity-20"></div>

          {/* Screen glow */}
          <div
            className={`screen-glow absolute inset-0 opacity-30 ${mode === "dissociative" ? "dissociative-glow" : ""}`}
          ></div>

          {/* Random glitches in dissociative mode */}
          {mode === "dissociative" && <div className="glitch-overlay absolute inset-0 z-20 opacity-0"></div>}
        </div>

        {/* Boot overlay */}
        {isBooting && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="mb-4 text-2xl font-bold text-green-400">INITIALIZING ORACLE SHELL</div>
              <div className="h-2 w-64 rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-300"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Mint Success Modal */}
        {showMintModal && currentShard && (
          <MintSuccessModal shard={currentShard} onClose={() => setShowMintModal(false)} />
        )}

        <style jsx>{`
          .crt-container {
            position: relative;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.2), inset 0 0 15px rgba(0, 0, 0, 0.8);
          }
          
          .scanlines {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              rgba(0, 0, 0, 0.3) 51%
            );
            background-size: 100% 4px;
            animation: scanline 0.2s linear infinite;
          }
          
          .screen-flicker {
            background: rgba(0, 255, 0, 0.1);
            animation: flicker 0.15s infinite alternate;
          }
          
          .screen-glow {
            background: radial-gradient(
              ellipse at center,
              rgba(0, 255, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 70%
            );
          }

          .dissociative-glow {
            background: radial-gradient(
              ellipse at center,
              rgba(255, 0, 255, 0.2) 0%,
              rgba(0, 0, 0, 0) 70%
            );
          }
          
          .glitch-overlay {
            background: linear-gradient(
              45deg,
              rgba(255, 0, 255, 0.1),
              rgba(0, 255, 255, 0.1)
            );
            animation: random-glitch 10s infinite;
          }
          
          @keyframes scanline {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 4px;
            }
          }
          
          @keyframes flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
              opacity: 0.1;
            }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
              opacity: 0.05;
            }
          }
          
          @keyframes random-glitch {
            0%, 100% {
              opacity: 0;
            }
            10%, 15% {
              opacity: 0.3;
              transform: translate(-5px, 0);
            }
            20%, 25% {
              opacity: 0;
            }
            30%, 35% {
              opacity: 0.3;
              transform: translate(5px, 0);
            }
            40%, 45% {
              opacity: 0;
            }
            50%, 55% {
              opacity: 0.3;
              transform: translate(0, -5px);
            }
            60%, 65% {
              opacity: 0;
            }
            70%, 75% {
              opacity: 0.3;
              transform: translate(0, 5px);
            }
            80%, 85% {
              opacity: 0;
            }
            90%, 95% {
              opacity: 0.3;
              transform: translate(-5px, -5px);
            }
          }
        `}</style>
      </div>

      {/* Ambient audio player */}
      <AmbientAudio />
    </>
  )
}
