"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to success page or login
      router.push("/auth/signin?registered=true")
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
        <p className="text-gray-600">Create your account</p>
      </div>

      <Card className="max-w-md w-full border-primary-100 shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-primary-50 to-white border-b border-primary-100">
          <CardTitle className="text-2xl font-bold text-center text-primary-900">Sign Up</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create an account to access Oracle Shell
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary-600 hover:text-primary-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-800">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-white to-primary-50 border-t border-primary-100 p-6">
          <div className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary-600 hover:text-primary-800 font-medium">
              Sign in
            </Link>
          </div>
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
