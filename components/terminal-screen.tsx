"use client"

import type { RefObject, ReactNode } from "react"

type Message = {
  type: "command" | "response" | "error" | "system" | "component"
  content: string | ReactNode
}

interface TerminalScreenProps {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement>
}

export function TerminalScreen({ messages, messagesEndRef }: TerminalScreenProps) {
  return (
    <div className="custom-scrollbar h-[calc(100%-96px)] overflow-y-auto p-4 font-mono text-green-400">
      {messages.map((message, index) => (
        <div key={index} className="mb-1 whitespace-pre-wrap">
          {message.type === "component" ? (
            // Render React component
            message.content
          ) : (
            <>
              {message.type === "command" && <span className="mr-2">{">"}</span>}
              <span
                className={
                  message.type === "error" ? "text-red-400" : message.type === "system" ? "text-yellow-400" : ""
                }
              >
                {message.content as string}
              </span>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff00;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00cc00;
        }
      `}</style>
    </div>
  )
}
