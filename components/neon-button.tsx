import type React from "react"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

// Export as default instead of named export
export default function NeonButton({ children, className, ...props }: NeonButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-md border-2 px-6 py-3 font-mono text-sm font-medium transition-all duration-300",
        "after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
