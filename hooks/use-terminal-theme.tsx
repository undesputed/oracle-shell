import { useOracleMode } from "./use-oracle-mode"

export function useTerminalTheme() {
  const { mode } = useOracleMode()

  const themes = {
    clairvoyant: {
      backgroundColor: "bg-primary-950",
      textColor: "text-primary-100",
      accentColor: "text-secondary-400",
      borderColor: "border-primary-700",
      shadowColor: "shadow-primary-500/20",
    },
    dissociative: {
      backgroundColor: "bg-secondary-950",
      textColor: "text-secondary-100",
      accentColor: "text-accent-400",
      borderColor: "border-secondary-700",
      shadowColor: "shadow-secondary-500/20",
    },
  }

  return { theme: themes[mode] }
}
