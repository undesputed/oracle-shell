"use client"

import { useState } from "react"
import Link from "next/link"
import { MobileTerminal } from "./mobile-terminal"
import { useOracleMode } from "@/hooks/use-oracle-mode"

export function MobileShellView() {
  const { mode, setMode } = useOracleMode()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-black">
      {/* Mobile Header */}
      <div className="flex h-12 items-center justify-between border-b border-gray-800 bg-black px-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-cyan-400">ORACLE</span>
          <span className="text-sm font-bold text-purple-400">SHELL</span>
        </div>

        {/* Menu Button */}
        <button onClick={() => setShowMenu(!showMenu)} className="rounded p-1 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute inset-0 z-50 flex flex-col bg-black pt-12">
          <div className="flex justify-end p-3">
            <button onClick={() => setShowMenu(false)} className="rounded p-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-4 p-6">
            <Link
              href="/mobile"
              className="border-b border-gray-800 py-3 text-lg text-cyan-400"
              onClick={() => setShowMenu(false)}
            >
              TERMINAL
            </Link>
            <Link
              href="/mobile/archive"
              className="border-b border-gray-800 py-3 text-lg text-gray-400"
              onClick={() => setShowMenu(false)}
            >
              ARCHIVE
            </Link>
            <Link
              href="/mobile/graffiti"
              className="border-b border-gray-800 py-3 text-lg text-gray-400"
              onClick={() => setShowMenu(false)}
            >
              GRAFFITI
            </Link>
          </nav>

          {/* Mode Toggle in Menu */}
          <div className="mt-6 flex flex-col items-center space-y-2 p-4">
            <span className="text-sm text-gray-500">ORACLE MODE</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMode("clairvoyant")}
                className={`rounded px-4 py-2 ${
                  mode === "clairvoyant" ? "bg-cyan-900/30 text-cyan-400" : "text-gray-400"
                }`}
              >
                CLAIRVOYANT
              </button>
              <button
                onClick={() => setMode("dissociative")}
                className={`rounded px-4 py-2 ${
                  mode === "dissociative" ? "bg-purple-900/30 text-purple-400" : "text-gray-400"
                }`}
              >
                DISSOCIATIVE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal */}
      <div className="flex-1">
        <MobileTerminal />
      </div>
    </div>
  )
}
