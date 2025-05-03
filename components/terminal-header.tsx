"use client"

import { ModeToggle } from "./mode-toggle"

interface TerminalHeaderProps {
  title: string
  onModeChange?: (mode: "clairvoyant" | "dissociative") => void
  currentMode: "clairvoyant" | "dissociative"
}

export function TerminalHeader({ title, onModeChange, currentMode }: TerminalHeaderProps) {
  return (
    <div className="flex h-10 items-center justify-between bg-gray-900 px-3">
      <div className="flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-sm font-bold text-cyan-400">{title}</div>
      <ModeToggle onChange={onModeChange} currentMode={currentMode} />
    </div>
  )
}
