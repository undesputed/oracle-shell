"use client"

import type React from "react"

interface MobileTerminalInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function MobileTerminalInput({ value, onChange, onSubmit }: MobileTerminalInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-gray-800 bg-black p-2">
      <div className="flex items-center">
        <span className="mr-2 text-green-400">{">"}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-green-400 outline-none"
          autoFocus
          spellCheck="false"
          autoComplete="off"
          inputMode="text"
        />
        <span className="ml-1 h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-green-400"></span>
      </div>
    </form>
  )
}
