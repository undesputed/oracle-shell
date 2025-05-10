"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSubmitted(true)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white p-4">
      {/* Logo/Brand Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-700 mb-2">Oracle Shell</h1>
        <p className="text-gray-600">Reset your password</p>
      </div>

      <Card className="max-w-md w-full border-primary-100 shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-primary-50 to-white border-b border-primary-100">
          <CardTitle className="text-2xl font-bold text-center text-primary-900">Forgot Password</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-4">
                We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center bg-gradient-to-r from-white to-primary-50 border-t border-primary-100 p-6">
          <Link href="/auth/signin" className="flex items-center text-primary-600 hover:text-primary-800 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-primary-100/40 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-secondary-100/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Oracle Shell. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="/terms" className="hover:text-primary-600">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary-600">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-primary-600">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
