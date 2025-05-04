"use client"

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTerminalTheme } from '@/hooks/use-terminal-theme'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { theme } = useTerminalTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.backgroundColor}`}>
      <div className={`p-8 rounded-lg border ${theme.borderColor} max-w-md w-full`}>
        <h1 className={`text-2xl font-bold mb-6 ${theme.textColor} text-center`}>Sign In</h1>
        {error && (
          <div className={`mb-4 p-2 rounded ${theme.accentColor} text-center`}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className={`block mb-2 ${theme.textColor}`}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 rounded border ${theme.borderColor} ${theme.backgroundColor} ${theme.textColor}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={`block mb-2 ${theme.textColor}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 rounded border ${theme.borderColor} ${theme.backgroundColor} ${theme.textColor}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded ${theme.backgroundColor} ${theme.textColor} border ${theme.borderColor} hover:opacity-90 transition-opacity`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
} 