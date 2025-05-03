"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: ReactNode
  className?: string
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <div className={cn("glitch-wrapper relative", className)}>
      <div className="glitch relative inline-block" data-text={children}>
        {children}
      </div>

      <style jsx>{`
        .glitch {
          position: relative;
          color: white;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00ff;
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        
        .glitch::after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim-1 {
          0%, 100% { clip-path: inset(50% 0 30% 0); }
          20% { clip-path: inset(33% 0 33% 0); }
          40% { clip-path: inset(10% 0 60% 0); }
          60% { clip-path: inset(70% 0 20% 0); }
          80% { clip-path: inset(40% 0 43% 0); }
        }
        
        @keyframes glitch-anim-2 {
          0%, 100% { clip-path: inset(40% 0 40% 0); }
          20% { clip-path: inset(15% 0 45% 0); }
          40% { clip-path: inset(63% 0 36% 0); }
          60% { clip-path: inset(27% 0 50% 0); }
          80% { clip-path: inset(50% 0 30% 0); }
        }
      `}</style>
    </div>
  )
}
