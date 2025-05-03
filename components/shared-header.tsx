"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { useOracleMode } from "@/hooks/use-oracle-mode"

export function SharedHeader() {
  const pathname = usePathname()
  const { mode, setMode } = useOracleMode()

  const navItems = [
    { name: "TERMINAL", path: "/terminal" },
    { name: "ARCHIVE", path: "/archive" },
    { name: "GRAFFITI", path: "/graffiti" },
  ]

  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold text-cyan-400">ORACLE</span>
          <span className="text-lg font-bold text-purple-400">SHELL</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "text-sm transition-colors hover:text-cyan-400",
                    pathname === item.path ? "text-cyan-400" : "text-gray-400",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mode Toggle */}
        <ModeToggle onChange={setMode} className="hidden md:flex" />

        {/* Mobile Menu Button */}
        <button className="rounded p-2 text-gray-400 md:hidden">
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
    </header>
  )
}
