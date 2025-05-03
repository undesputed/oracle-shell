"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
}

export function TypingEffect({ text, speed = 30, className }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        Math.random() * speed + speed / 2,
      )

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, speed, text])

  // Add random glitch effect to completed text
  useEffect(() => {
    if (isComplete) {
      const glitchInterval = setInterval(() => {
        // 5% chance of glitching a character
        if (Math.random() > 0.95) {
          const glitchIndex = Math.floor(Math.random() * text.length)
          const glitchChar = "!@#$%^&*()_+-=[]{}|;:,.<>?/"[Math.floor(Math.random() * 28)]

          const textArray = text.split("")
          textArray[glitchIndex] = glitchChar

          setDisplayedText(textArray.join(""))

          // Reset after a short delay
          setTimeout(() => {
            setDisplayedText(text)
          }, 100)
        }
      }, 2000)

      return () => clearInterval(glitchInterval)
    }
  }, [isComplete, text])

  return (
    <div className={className}>
      {displayedText}
      {!isComplete && <span className="ml-1 inline-block h-4 w-2 animate-blink bg-green-400"></span>}
    </div>
  )
}
