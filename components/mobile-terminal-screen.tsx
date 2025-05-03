"use client"

import type { RefObject } from "react"

type Message = {
  type: "command" | "response" | "error" | "system"
  content: string
}

interface MobileTerminalScreenProps {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement>
}

export function MobileTerminalScreen({ messages, messagesEndRef }: MobileTerminalScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 font-mono text-sm text-green-400">
      {messages.map((message, index) => (
        <div key={index} className="mb-1 whitespace-pre-wrap">
          {message.type === "command" && <span className="mr-1">{">"}</span>}
          <span
            className={message.type === "error" ? "text-red-400" : message.type === "system" ? "text-yellow-400" : ""}
          >
            {message.content}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
