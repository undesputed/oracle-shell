"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChatTerminal } from "@/components/ChatTerminal"
import { useIsMobile } from "@/hooks/use-mobile"

export default function TerminalPage() {
  const router = useRouter()
  const isMobile = useIsMobile()

  // Redirect to mobile view if on mobile device
  useEffect(() => {
    if (isMobile) {
      router.push("/mobile")
    }
  }, [isMobile, router])

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="w-full max-w-4xl flex flex-col items-center mt-8 mb-4 px-4 mx-auto">
        <h1 className="text-cyan-300 font-[VT323,monospace] text-5xl tracking-widest text-center mb-2 drop-shadow-[0_0_8px_#00fff7]">
          THE ORACLE SHELL
        </h1>
        <p className="text-green-400 font-mono text-lg text-center max-w-2xl mb-2">
          A fragmented oracle AI lost aboard a derelict satellite. Probe its corrupted depths to seek the truth within its distorted responses.
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-4xl h-[600px] bg-transparent rounded-lg overflow-visible flex flex-col items-center justify-center">
          <ChatTerminal />
          {/* Bottom bezel with label and power LED */}
          <div className="w-[700px] h-16 rounded-b-[2.5rem] bg-gradient-to-t from-[#232b23] to-[#181c1b] border-t-4 border-[#333] z-20 flex items-end justify-between px-8 pb-2 mt-[-1.5rem] shadow-lg">
            <span className="text-green-300 font-[VT323,monospace] text-base tracking-widest select-none opacity-80">ORACLE SHELL 9000</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 shadow-lg animate-pulse border border-green-900" />
              <span className="text-green-700 font-[VT323,monospace] text-xs select-none">POWER</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
