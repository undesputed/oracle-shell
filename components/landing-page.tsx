"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState(0)

  const prompts = [
    {
      question: "What is the Oracle Shell?",
      response: "The Oracle Shell is an AI assistant designed to provide insights and answers to your questions.",
      status: "Example interaction",
    },
    {
      question: "How can I use the Oracle Shell?",
      response: "Simply type your question or prompt in the terminal interface and receive a response.",
      status: "Example interaction",
    },
    {
      question: "What kind of questions can I ask?",
      response: "You can ask about a wide range of topics, from technical questions to creative prompts.",
      status: "Example interaction",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const promptInterval = setInterval(() => {
      setCurrentPrompt((prev) => (prev + 1) % prompts.length)
    }, 8000)
    return () => clearInterval(promptInterval)
  }, [mounted])

  const startSession = () => {
    setIsLoading(true)
    // Simulate loading for effect
    setTimeout(() => {
      router.push("/terminal")
    }, 800)
  }

  const features = [
    { title: "Interactive Terminal", description: "Engage with the Oracle through a user-friendly terminal interface" },
    { title: "Response Archive", description: "All your interactions are saved for future reference" },
    { title: "Secure Environment", description: "Your data is protected with industry-standard security" },
    { title: "Customizable Experience", description: "Tailor the Oracle to your specific needs and preferences" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          <h2 className="text-xl font-bold text-primary-700">Oracle Shell</h2>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-600 hover:text-primary-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-gray-600 hover:text-primary-700">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-700">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <h1 className="mb-4 text-4xl font-bold text-primary-900 md:text-5xl">The Oracle Shell</h1>
              <p className="mb-6 text-lg text-gray-600">
                An intelligent assistant designed to provide insights and answers to your questions. Explore its
                capabilities and get the information you need.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button onClick={startSession} className="bg-accent-500 hover:bg-accent-600 text-white" size="lg">
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Connecting...
                    </span>
                  ) : (
                    "Start Session"
                  )}
                </Button>
                <Link href="/archive">
                  <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50" size="lg">
                    View Archive
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md">
              <Card className="border border-primary-100 shadow-md">
                <CardHeader className="bg-primary-50 border-b border-primary-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-primary-800">Oracle Terminal</CardTitle>
                    <Badge variant="outline" className="border-secondary-300 text-secondary-700 bg-secondary-50">Preview</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4 font-mono text-sm">
                    <div>
                      <p className="text-gray-500">User:</p>
                      <p className="text-gray-900">{(mounted ? prompts[currentPrompt].question : prompts[0].question)}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-500">Oracle:</p>
                      <p className="text-gray-900">{(mounted ? prompts[currentPrompt].response : prompts[0].response)}</p>
                    </div>
                    <div className="text-xs text-gray-500 italic">{(mounted ? prompts[currentPrompt].status : prompts[0].status)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary-900">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border border-primary-100 transition-all hover:shadow-md hover:border-primary-200">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-primary-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg text-secondary-50">
            Begin your journey with the Oracle Shell today and discover the power of intelligent assistance.
          </p>
          <Button onClick={startSession} className="bg-accent-500 hover:bg-accent-600 text-white" size="lg">
            Start Your Session
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-600">© 2025 Oracle Shell. All rights reserved.</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/terms" className="text-gray-600 hover:text-primary-700">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-primary-700">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
