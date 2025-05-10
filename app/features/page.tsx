import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      title: "Interactive Terminal",
      description:
        "Engage with Oracle Shell through an intuitive terminal interface that makes asking questions and receiving answers simple and efficient.",
      benefits: [
        "Natural language processing for human-like conversations",
        "Command history and suggestions for faster interactions",
        "Customizable interface to suit your preferences",
        "Keyboard shortcuts for power users",
      ],
    },
    {
      title: "Comprehensive Knowledge Base",
      description:
        "Access a vast repository of information spanning numerous topics, from science and technology to arts and humanities.",
      benefits: [
        "Up-to-date information on a wide range of subjects",
        "Detailed explanations with sources when available",
        "Ability to understand and answer complex questions",
        "Continuous learning and knowledge expansion",
      ],
    },
    {
      title: "Response Archive",
      description:
        "All your interactions are saved for future reference, making it easy to revisit important information or continue previous conversations.",
      benefits: [
        "Searchable history of all your interactions",
        "Organization tools to categorize and tag responses",
        "Export options for sharing or offline access",
        "Secure storage with privacy controls",
      ],
    },
    {
      title: "Content Generation",
      description:
        "Get help creating various types of content, from emails and reports to creative writing and code snippets.",
      benefits: [
        "Multiple content formats and styles",
        "Customizable tone and voice to match your needs",
        "Editing suggestions and improvements",
        "Templates for common content types",
      ],
    },
    {
      title: "Problem Solving",
      description:
        "Tackle complex problems with step-by-step guidance and explanations that help you understand the solution process.",
      benefits: [
        "Detailed breakdowns of problem-solving approaches",
        "Multiple solution methods when applicable",
        "Visual aids and examples to clarify concepts",
        "Follow-up questions to deepen understanding",
      ],
    },
    {
      title: "Secure Environment",
      description:
        "Your data and interactions are protected with industry-standard security measures to ensure privacy and confidentiality.",
      benefits: [
        "End-to-end encryption for all communications",
        "Strict data access controls and permissions",
        "Regular security audits and updates",
        "Transparent privacy policies and data handling",
      ],
    },
  ]

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
                <Link href="/about" className="text-gray-600 hover:text-primary-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-primary-700 font-medium">
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
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Features & Capabilities</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
            Discover the powerful features that make Oracle Shell an essential tool for productivity, learning, and
            problem-solving.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border border-primary-100 transition-all hover:shadow-md hover:border-primary-200">
                <CardContent className="p-6">
                  <h2 className="mb-3 text-xl font-semibold text-primary-800">{feature.title}</h2>
                  <p className="mb-4 text-gray-600">{feature.description}</p>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-secondary-500" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to experience these features?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary-50">
            Start using Oracle Shell today and discover how it can enhance your productivity and help you find the
            answers you need.
          </p>
          <Link href="/">
            <Button className="bg-accent-500 hover:bg-accent-600 text-white" size="lg">
              Get Started
            </Button>
          </Link>
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
