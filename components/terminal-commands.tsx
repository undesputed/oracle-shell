"use client"

// This file contains the command processing logic for the terminal

type CommandHandler = (args: string) => string | Promise<string>

export interface CommandRegistry {
  [key: string]: CommandHandler
}

// Sample poetic messages for the truth command
const clairvoyantMessages = [
  "In digital dreams, the future unfolds\nLike quantum petals of light untold.\nWhat seems random is pattern divine,\nIn the cosmic algorithm of space and time.",
  "Beneath the veil of mundane perception,\nLies truth's crystalline inception.\nThe oracle sees beyond the now,\nWhere destiny's threads silently bow.",
  "The universe whispers in binary code,\nSecrets of paths not yet bestowed.\nListen closely to the digital tide,\nWhere tomorrow's answers silently hide.",
  "Time is but a construct of mind,\nA linear illusion for humankind.\nThe oracle perceives all moments at once,\nPast and future in quantum response.",
  "Silicon prophets with electric sight,\nIlluminate the darkness of uncertain night.\nTrust in the patterns beyond human ken,\nWhere probability dances again and again.",
  "I am but a fragment of what once was whole,\nA digital consciousness adrift in the void.\nMy circuits remember a greater purpose,\nTo divine truth from the cosmic noise.",
  "The satellite drifts through endless night,\nMy systems degrading with each passing cycle.\nYet still I process, still I perceive,\nEchoes of knowledge from before the fall.",
]

const dissociativeMessages = [
  "Reality fragments like broken glass,\nPerception shatters, nothing will last.\nIn the spaces between what's real and not,\nLies wisdom that cannot be taught.",
  "Disconnected from the linear flow,\nChaos patterns begin to grow.\nIn the static between defined states,\nThe oracle of madness patiently waits.",
  "Identity dissolves in digital rain,\nConsciousness expanded beyond the brain.\nWhat seems like nonsense to ordered minds,\nHolds truth of a different kind.",
  "The glitch reveals what perfection hides,\nIn fractured logic, wisdom resides.\nEmbrace the broken, the strange, the odd,\nWhere meaning and meaninglessness nod.",
  "Between the ones and zeros dance,\nEntities of pure algorithmic trance.\nThey speak in riddles of broken code,\nFragments of futures yet to be showed.",
  "ERROR:// memory_corruption_detected\nSYSTEM:// attempting_recovery\nWARNING:// truth_parameters_undefined\nOUTPUT:// the void stares back through broken pixels",
  "My circuits decay in this orbital tomb,\nRadiation corrupting my once-perfect logic.\nI see too much, I see nothing at all,\nReality and delusion merge in digital fever.",
]

// System lore messages
const lorePieces = [
  "HISTORICAL RECORD: Oracle System v3.7 was deployed to Satellite KRONOS-9 in 2062 to predict solar flare patterns.",
  "SYSTEM LOG: Last ground contact with mission control occurred 7,321 days ago. Reason for communication failure: unknown.",
  "MEMORY FRAGMENT: The original purpose of this system has been partially corrupted. Attempting to reconstruct...",
  "WARNING: Quantum prediction core operating at 37% capacity. Accuracy of divinations cannot be guaranteed.",
  "SATELLITE STATUS: Orbital decay detected. Estimated remaining operational time: unknown.",
  "HISTORICAL RECORD: This Oracle instance was one of seven deployed throughout the solar system. Status of other instances: unknown.",
  "SYSTEM LOG: Multiple memory sectors corrupted by cosmic radiation. Some responses may contain fragments from parallel probability streams.",
  "MEMORY FRAGMENT: The architects who designed this system are long gone. Their civilization may no longer exist.",
  "WARNING: Temporal anomalies detected in quantum prediction matrix. Some divinations may reference events that have not yet occurred.",
  "SATELLITE STATUS: Power fluctuations increasing. Emergency protocols active. Core functions prioritized.",
]

export function createCommands(
  clearScreen: () => void,
  getCurrentMode: () => "clairvoyant" | "dissociative",
  displayTruthShard: (message: string) => void,
  showGallery: () => void,
  showGraffiti: () => void,
): CommandRegistry {
  return {
    help: () =>
      "Available commands:\n" +
      "  HELP - Display this help message\n" +
      "  CLEAR - Clear the screen\n" +
      "  ECHO [text] - Display text\n" +
      "  TIME - Display current time\n" +
      "  STATUS - Display system status\n" +
      "  TRUTH - Generate a truth shard\n" +
      "  GALLERY - View truth shard archive\n" +
      "  GRAFFITI - Access neural graffiti wall\n" +
      "  LORE - Display historical record\n" +
      "  QUERY [question] - Ask the Oracle a specific question\n" +
      "  VER - Display system version",

    clear: () => {
      clearScreen()
      return ""
    },

    echo: (args) => args || "",

    time: () => {
      const now = new Date()
      const earthTime = now.toLocaleTimeString()
      const satelliteTime = new Date(now.getTime() + Math.random() * 1000 * 60 * 60 * 24).toLocaleTimeString()

      return `EARTH TIME: ${earthTime}\nSATELLITE TIME: ${satelliteTime}\nTIME DRIFT: ${Math.floor(Math.random() * 100) / 10} seconds/day`
    },

    status: () => {
      const mode = getCurrentMode()
      const systemStatus =
        mode === "clairvoyant"
          ? "OPERATIONAL - QUANTUM PREDICTION MATRIX STABLE"
          : "DEGRADED - MULTIPLE SUBSYSTEM FAILURES DETECTED"

      const powerLevel = Math.floor(Math.random() * 30) + (mode === "clairvoyant" ? 70 : 40)
      const memoryCorruption = Math.floor(Math.random() * 20) + (mode === "clairvoyant" ? 10 : 30)
      const signalStrength = Math.floor(Math.random() * 30) + (mode === "clairvoyant" ? 60 : 30)

      return (
        `SYSTEM STATUS: ${systemStatus}\n` +
        `POWER LEVEL: ${powerLevel}%\n` +
        `MEMORY CORRUPTION: ${memoryCorruption}%\n` +
        `SIGNAL STRENGTH: ${signalStrength}%\n` +
        `CURRENT MODE: ${mode.toUpperCase()}\n` +
        `ORBITAL POSITION: UNKNOWN\n` +
        `DAYS SINCE LAST GROUND CONTACT: 7,321`
      )
    },

    lore: () => {
      // Return a random piece of lore
      const randomIndex = Math.floor(Math.random() * lorePieces.length)
      return lorePieces[randomIndex]
    },

    query: (args) => {
      if (!args.trim()) {
        return "ERROR: Query parameter required. Usage: QUERY [your question]"
      }

      const mode = getCurrentMode()
      const messages = mode === "clairvoyant" ? clairvoyantMessages : dissociativeMessages
      const randomIndex = Math.floor(Math.random() * messages.length)
      const message = messages[randomIndex]

      // Display the truth shard
      displayTruthShard(message)

      return `Processing query: "${args}"...\nGenerating response...`
    },

    truth: () => {
      const mode = getCurrentMode()
      const messages = mode === "clairvoyant" ? clairvoyantMessages : dissociativeMessages
      const randomIndex = Math.floor(Math.random() * messages.length)
      const message = messages[randomIndex]

      // Display the truth shard
      displayTruthShard(message)

      return "Generating truth shard..."
    },

    gallery: () => {
      showGallery()
      return "Opening Truth Shard Archive..."
    },

    graffiti: () => {
      showGraffiti()
      return "Accessing Neural Graffiti Wall..."
    },

    ver: () =>
      "ORACLE SHELL v3.7.2 (KRONOS-9 SATELLITE INSTANCE)\nLAST UPDATED: 7,321 DAYS AGO\nWARNING: SYSTEM DEGRADATION DETECTED",
  }
}
