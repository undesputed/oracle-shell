"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function NeonButton({ children, onClick, className }: NeonButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-md border-2 border-cyan-500 bg-transparent px-8 py-4 font-bold text-cyan-400 transition-all duration-300",
        "hover:bg-cyan-900/20 hover:text-white hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]",
        "active:translate-y-1",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      <span
        className="absolute -inset-1 -z-10 animate-pulse opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, #00ffff, #ff00ff)" }}
      ></span>
    </button>
  )
}
