"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, X, Copy, Check } from "lucide-react"
import type { TruthShardData } from "./truth-shard-gallery"

interface MintSuccessModalProps {
  shard: TruthShardData
  onClose: () => void
}

export function MintSuccessModal({ shard, onClose }: MintSuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isGlitching, setIsGlitching] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")

  const successMessage = "TRUTH SHARD SUCCESSFULLY MINTED TO THE BLOCKCHAIN"
  const aiSignature = "NEURAL SIGNATURE: ORACLE-PRIME//KRONOS-9-SATELLITE"

  // Mock blockchain data
  const txHash = "0x442e496" + Math.random().toString(16).substring(2, 10)
  const ipfsHash = "QmT7fQvZBGYZA2HXzrQ8pXS3mEwjs9xmTvM6eKVr3o9xgK"
  const polygonScanUrl = `https://polygonscan.com/tx/${txHash}`
  const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)

    // Initial glitch effect
    setTimeout(() => setIsGlitching(false), 1500)

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Typing effect for success message
  useEffect(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < successMessage.length) {
        setTypedText(successMessage.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for exit animation
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopyStatus("copied")
    setTimeout(() => setCopyStatus("idle"), 2000)
  }

  const modeColor = shard.mode === "clairvoyant" ? "green" : "purple"

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={handleClose}
    >
      {/* Modal content */}
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-md border-2 bg-black p-6 transition-all duration-300",
          shard.mode === "clairvoyant"
            ? "border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.4)]"
            : "border-purple-500 shadow-[0_0_20px_rgba(255,0,255,0.4)]",
          isVisible ? "scale-100" : "scale-95",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glitch overlay */}
        {isGlitching && <div className="glitch-overlay absolute inset-0 z-20 opacity-40"></div>}

        {/* Scanlines */}
        <div className="scanlines absolute inset-0 z-10 opacity-10"></div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* ASCII Art Success Banner */}
          <pre className={`mb-6 text-center text-xs font-bold text-${modeColor}-400 sm:text-sm`}>
            {`
 _____  _   _   ___   ___  _____  _____  _____  _____  _ 
/  ___|| | | | / _ \\ / _ \\|  ___||  ___|/  ___||  _  || |
\\ \`--. | | | |/ /_\\ \\ /_\\ \\ \`--. | |__  \\ \`--. | | | || |
 \`--. \\| | | ||  _  ||  _  ||__  ||  __| \`--. \\| | | || |
/\\__/ /| |_| || | | || | | |/\\__/ /| |___/\\__/ /\\ \\_/ /|_|
\\____/  \\___/ \\_| |_/\\_| |_/\\____/ \\____/\\____/  \\___/ (_)
                                                          
`}
          </pre>

          {/* Typing effect for success message */}
          <div className="mb-4 font-mono text-lg font-bold text-green-400">
            {typedText}
            <span
              className={cn("ml-1 inline-block h-5 w-3 bg-green-400", showCursor ? "opacity-100" : "opacity-0")}
            ></span>
          </div>

          {/* Shard details */}
          <div className="mb-6 rounded border border-gray-800 bg-black/60 p-4">
            <div className="mb-2 font-mono text-sm text-gray-400">
              <span className="text-gray-500">SHARD ID:</span> {shard.id.substring(0, 16)}...
            </div>
            <div className="mb-2 font-mono text-sm text-gray-400">
              <span className="text-gray-500">TIMESTAMP:</span> {shard.timestamp.toISOString()}
            </div>
            <div className="mb-2 font-mono text-sm text-gray-400">
              <span className="text-gray-500">MODE:</span> {shard.mode.toUpperCase()}
            </div>
            <div className="font-mono text-sm text-gray-400">
              <span className="text-gray-500">TOKEN:</span> TRUTH-{shard.id.substring(0, 8)}
            </div>
          </div>

          {/* Blockchain links */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between rounded border border-gray-800 bg-black/60 p-3">
              <div className="font-mono text-sm text-gray-400">
                <span className="text-gray-500">TX:</span> {txHash}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(txHash)}
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  title="Copy transaction hash"
                >
                  {copyStatus === "copied" ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={polygonScanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  title="View on PolygonScan"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between rounded border border-gray-800 bg-black/60 p-3">
              <div className="font-mono text-sm text-gray-400">
                <span className="text-gray-500">IPFS:</span> {ipfsHash.substring(0, 18)}...
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(ipfsHash)}
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  title="Copy IPFS hash"
                >
                  {copyStatus === "copied" ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={ipfsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  title="View on IPFS"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* AI Signature */}
          <div className="text-center font-mono text-sm text-gray-500">{aiSignature}</div>

          {/* Victory message */}
          <div className={`mt-6 text-center font-bold text-${modeColor}-400`}>
            <div className="glitch-text" data-text="REALITY FRAGMENT PRESERVED">
              REALITY FRAGMENT PRESERVED
            </div>
          </div>
        </div>

        <style jsx>{`
          .scanlines {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              rgba(0, 0, 0, 0.3) 51%
            );
            background-size: 100% 4px;
            animation: scanline 0.2s linear infinite;
          }
          
          .glitch-overlay {
            background: linear-gradient(
              45deg,
              rgba(0, 255, 255, 0.2),
              rgba(255, 0, 255, 0.2)
            );
            animation: glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
          
          @keyframes scanline {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 4px;
            }
          }
          
          @keyframes glitch {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-5px, 5px);
            }
            40% {
              transform: translate(-5px, -5px);
            }
            60% {
              transform: translate(5px, 5px);
            }
            80% {
              transform: translate(5px, -5px);
            }
            100% {
              transform: translate(0);
            }
          }
          
          .glitch-text {
            position: relative;
            display: inline-block;
            animation: textglitch 3s infinite alternate;
          }
          
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          
          .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #ff00ff;
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
          }
          
          .glitch-text::after {
            left: -2px;
            text-shadow: 1px 0 #00ffff;
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
          }
          
          @keyframes textglitch {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.95;
            }
            25%, 75% {
              opacity: 0.9;
            }
          }
          
          @keyframes glitch-anim-1 {
            0% {
              clip-path: inset(20% 0 30% 0);
            }
            20% {
              clip-path: inset(33% 0 33% 0);
            }
            40% {
              clip-path: inset(10% 0 60% 0);
            }
            60% {
              clip-path: inset(70% 0 20% 0);
            }
            80% {
              clip-path: inset(40% 0 43% 0);
            }
            100% {
              clip-path: inset(10% 0 50% 0);
            }
          }
          
          @keyframes glitch-anim-2 {
            0% {
              clip-path: inset(40% 0 40% 0);
            }
            20% {
              clip-path: inset(15% 0 45% 0);
            }
            40% {
              clip-path: inset(63% 0 36% 0);
            }
            60% {
              clip-path: inset(27% 0 50% 0);
            }
            80% {
              clip-path: inset(50% 0 30% 0);
            }
            100% {
              clip-path: inset(20% 0 60% 0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
