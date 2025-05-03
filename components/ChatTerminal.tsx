"use client"

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@/hooks/use-chat'
import { useOracleMode } from '@/hooks/use-oracle-mode'

export function ChatTerminal() {
  const [input, setInput] = useState('')
  const { messages, isLoading, sendMessage } = useChat()
  const { mode, setMode } = useOracleMode()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (mounted) {
      scrollToBottom()
    }
  }, [messages, mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !mounted) return
    const message = input.trim()
    setInput('')
    await sendMessage(message, mode)
  }

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-black text-green-400 font-mono p-4 relative overflow-hidden">
        <div className="flex-1 overflow-auto space-y-2 mb-4 relative z-10">
          <div className="text-cyan-400">
            <span className="mr-2">{'>'}</span>
            <pre className="whitespace-pre-wrap font-mono">
              Initializing terminal...
            </pre>
          </div>
        </div>
      </div>
    )
  }

  // Helper to get the last assistant message
  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0]?.content || ''
  // Helper to get the last user prompt
  const lastUserPrompt = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || ''

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 90s CRT Monitor Outer Bezel */}
      <div className="crt-monitor relative w-[700px] h-[600px] mx-auto flex flex-col items-center rounded-[2.5rem] shadow-2xl overflow-visible" style={{boxShadow: '0 12px 64px #00ffcc33, 0 0 0 16px #232b23 inset, 0 0 0 36px #181c1b inset'}}>
        {/* Top highlight/reflection (behind everything) */}
        <div className="absolute top-0 left-0 w-full h-16 rounded-t-[2.5rem] bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none" />
        {/* Vents on the left and right */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
          <div className="w-6 h-1 bg-gray-700 rounded" />
          <div className="w-6 h-1 bg-gray-700 rounded" />
          <div className="w-6 h-1 bg-gray-700 rounded" />
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
          <div className="w-6 h-1 bg-gray-700 rounded" />
          <div className="w-6 h-1 bg-gray-700 rounded" />
          <div className="w-6 h-1 bg-gray-700 rounded" />
        </div>
        {/* CRT Screen Inset */}
        <div className="relative flex flex-col flex-1 m-10 mt-2 mb-20 rounded-[2.5rem] overflow-hidden crt-screen border-[20px] border-[#181c1b] w-full h-full" style={{boxShadow: '0 0 120px #00ffcc88, 0 0 0 20px #0f1a1a inset'}}>
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="crt absolute inset-0"></div>
            <div className="scanlines absolute inset-0"></div>
          </div>
          {/* Top label INSIDE the shell */}
          <div className="w-full flex flex-col items-center pt-2 pb-2 bg-transparent z-10 relative">
            <div className="text-green-400 font-mono text-lg tracking-widest">
              CLAIRVOYANT <span className="mx-2">→</span> DISSOCIATIVE
            </div>
            {/* Mode Switcher */}
            <div className="flex gap-2 mt-2">
              <button
                className={`px-3 py-1 rounded font-mono text-xs border transition focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  mode === 'clairvoyant'
                    ? 'bg-green-700 text-green-200 border-green-400 shadow'
                    : 'bg-transparent text-green-400 border-green-700 hover:bg-green-900/30'
                }`}
                onClick={() => setMode('clairvoyant')}
                type="button"
              >
                CLAIRVOYANT
              </button>
              <button
                className={`px-3 py-1 rounded font-mono text-xs border transition focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  mode === 'dissociative'
                    ? 'bg-green-700 text-green-200 border-green-400 shadow'
                    : 'bg-transparent text-green-400 border-green-700 hover:bg-green-900/30'
                }`}
                onClick={() => setMode('dissociative')}
                type="button"
              >
                DISSOCIATIVE
              </button>
            </div>
          </div>
          {/* Scrollable terminal content */}
          <div className="flex-1 flex flex-col justify-start items-start text-left px-10 pb-2 z-10 relative overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent w-full" style={{maxHeight: '320px', minHeight: '320px'}}>
            {/* Prompt label and prompt */}
            <div className="mb-2">
              <span className="text-blue-400 font-bold font-[VT323,monospace] text-lg">{'>> PROMPT:'}</span>
            </div>
            <div className="mb-2">
              <span className="text-green-400 font-[VT323,monospace] text-lg">{lastUserPrompt || (mode === 'clairvoyant' ? 'what is the meaning of life?' : '...')}</span>
            </div>
            {/* Separator line */}
            <div className="w-full border-t border-green-700 mb-4 opacity-60" />
            {/* Assistant response */}
            <div className="mb-4">
              <pre className="whitespace-pre-wrap font-[VT323,monospace] text-xl text-green-300 drop-shadow-[0_0_6px_#00ffcc] text-left">
                {lastAssistantMessage || (mode === 'clairvoyant'
                  ? 'existence is a question\nquestioned by the void itself -'
                  : 'H̸e̸l̴l̸o̵... W̵h̶a̴t̷ ̶d̵o̷ ̷y̵o̵u̵ ̴s̸e̶e̴k̶ ̴i̴n̶ ̵t̷h̵i̸s̶ ̷c̶o̶r̷r̵u̸p̴t̶e̵d̵ ̶s̷p̴a̷c̵e̴?')}
              </pre>
            </div>
            {/* Archiving label */}
            <div className="mb-2 text-green-400 font-[VT323,monospace] text-base tracking-widest text-left">
              ARCHIVING AS TRUTH SHARD...
            </div>
            {isLoading && (
              <div className="text-green-400 animate-blink text-left">_</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input form (re-enabled) */}
          <form onSubmit={handleSubmit} className="relative z-10 px-10 pb-4 w-full">
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 outline-none border-none font-[VT323,monospace] text-xl placeholder-green-700"
                placeholder={isLoading ? 'Processing...' : 'Enter your query...'}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
          </form>
          {/* Mint label */}
          <div className="w-full text-center py-1 text-green-400 font-[VT323,monospace] text-xs tracking-widest border-t border-green-900 bg-[#181c1b] z-10 relative">
            MINT • 0x442e496 •
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .crt {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          animation: flicker 0.15s infinite;
        }
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        @keyframes flicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.98; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .crt-monitor {
          background: linear-gradient(145deg, #232b23 0%, #181c1b 100%);
          border: 16px solid #232b23;
        }
        .crt-screen {
          background: radial-gradient(ellipse at 50% 40%, #1a2a1a 80%, #181c1b 100%);
          box-shadow: 0 0 64px #00ffcc44, 0 0 0 8px #0f1a1a inset;
        }
        /* Custom scrollbar for terminal content */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-green-900::-webkit-scrollbar-thumb {
          background: #14532d;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
      `}</style>
    </div>
  )
} 