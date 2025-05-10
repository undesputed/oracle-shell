import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold text-primary-700">
            Oracle Shell
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/about" className="text-primary-700 font-medium">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-primary-900">About Oracle Shell</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600">
              Oracle Shell is an advanced AI assistant designed to help you find answers, generate content, and solve
              problems through natural conversation.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-primary-800">Our Mission</h2>
            <p>
              Our mission is to make artificial intelligence accessible and useful for everyone. We believe that AI
              should be a tool that enhances human capabilities, not replaces them. Oracle Shell is designed to be your
              partner in productivity, creativity, and problem-solving.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-primary-800">How It Works</h2>
            <p>
              Oracle Shell uses advanced natural language processing to understand your questions and provide relevant,
              accurate responses. The system is trained on a diverse range of topics and is constantly learning and
              improving.
            </p>
            <p>
              When you interact with Oracle Shell, your queries are processed in real-time, and the system draws on its
              vast knowledge base to generate helpful responses. All interactions are saved in your personal archive for
              future reference.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-primary-800">Our Team</h2>
            <p>
              Oracle Shell was developed by a team of AI researchers, engineers, and designers passionate about creating
              useful AI tools. Our team combines expertise in machine learning, natural language processing, and user
              experience design to create an assistant that's both powerful and easy to use.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-primary-800">Privacy & Security</h2>
            <p>
              We take your privacy seriously. All interactions with Oracle Shell are encrypted, and we never share your
              data with third parties without your explicit consent. You have full control over your data and can delete
              your interaction history at any time.
            </p>

            <div className="mt-12 rounded-lg bg-gradient-to-r from-secondary-50 to-secondary-100 p-8 border border-secondary-200">
              <h3 className="mb-4 text-xl font-semibold text-secondary-800">Start Your Journey with Oracle Shell</h3>
              <p className="mb-6 text-secondary-700">
                Whether you're looking for information, need help with a task, or just want to explore the capabilities
                of AI, Oracle Shell is here to assist you.
              </p>
              <Link href="/">
                <Button className="bg-accent-500 hover:bg-accent-600 text-white" size="lg">
                  Try Oracle Shell Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

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
