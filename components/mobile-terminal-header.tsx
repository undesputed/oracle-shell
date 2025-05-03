"use client"

interface MobileTerminalHeaderProps {
  currentMode: "clairvoyant" | "dissociative"
  onModeChange: (mode: "clairvoyant" | "dissociative") => void
}

export function MobileTerminalHeader({ currentMode, onModeChange }: MobileTerminalHeaderProps) {
  const toggleMode = () => {
    onModeChange(currentMode === "clairvoyant" ? "dissociative" : "clairvoyant")
  }

  return (
    <div className="flex h-12 items-center justify-between border-b border-gray-800 bg-black px-3">
      <div className="flex items-center space-x-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
      </div>

      <div className="text-sm font-bold text-green-400">ORACLE SHELL</div>

      {/* Simplified Mode Toggle */}
      <div className="flex items-center">
        <label
          htmlFor="mobile-mode-toggle"
          className={`relative block h-6 w-12 cursor-pointer rounded-full p-0.5 transition-colors duration-300 ${
            currentMode === "clairvoyant"
              ? "bg-cyan-950 shadow-[0_0_5px_rgba(0,255,255,0.5)]"
              : "bg-purple-950 shadow-[0_0_5px_rgba(255,0,255,0.5)]"
          }`}
        >
          <input
            type="checkbox"
            id="mobile-mode-toggle"
            className="sr-only"
            checked={currentMode === "dissociative"}
            onChange={toggleMode}
          />
          <span
            className={`absolute top-0.5 block h-5 w-5 rounded-full transition-all duration-300 ${
              currentMode === "clairvoyant"
                ? "left-0.5 bg-cyan-400 shadow-[0_0_3px_rgba(0,255,255,0.7)]"
                : "left-6.5 bg-purple-400 shadow-[0_0_3px_rgba(255,0,255,0.7)]"
            }`}
          />
        </label>
      </div>
    </div>
  )
}
