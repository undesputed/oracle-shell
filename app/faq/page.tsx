import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Oracle Shell?",
      answer:
        "Oracle Shell is an AI assistant designed to help you find answers, generate content, and solve problems through natural conversation. It uses advanced natural language processing to understand your questions and provide relevant, accurate responses.",
    },
    {
      question: "How do I get started with Oracle Shell?",
      answer:
        "Getting started is simple! Just click the 'Start Session' button on the homepage to open the terminal interface. From there, you can type your question or prompt and receive an immediate response. No registration is required to try it out.",
    },
    {
      question: "What kinds of questions can I ask?",
      answer:
        "You can ask Oracle Shell about a wide range of topics, including science, technology, history, arts, business, and more. It can help with factual questions, creative writing, problem-solving, code generation, and many other tasks. However, it cannot provide medical, legal, or financial advice that would require licensed professionals.",
    },
    {
      question: "Are my interactions with Oracle Shell private?",
      answer:
        "Yes, we take your privacy seriously. All interactions with Oracle Shell are encrypted, and we never share your data with third parties without your explicit consent. You have full control over your data and can delete your interaction history at any time from your account settings.",
    },
    {
      question: "How accurate is the information provided by Oracle Shell?",
      answer:
        "Oracle Shell strives to provide accurate and up-to-date information. However, like any AI system, it may occasionally make mistakes or provide incomplete information. We recommend verifying important information from authoritative sources, especially for critical decisions.",
    },
    {
      question: "Can I save or export my conversations?",
      answer:
        "Yes, all your interactions are automatically saved in your personal archive, which you can access at any time. You can also export conversations in various formats (PDF, TXT, JSON) for offline reference or sharing with others.",
    },
    {
      question: "Is there a limit to how many questions I can ask?",
      answer:
        "Free users can ask up to 20 questions per day. Premium subscribers have unlimited access to Oracle Shell with no daily limits. Check our pricing page for more details on subscription options.",
    },
    {
      question: "How is Oracle Shell different from other AI assistants?",
      answer:
        "Oracle Shell differentiates itself through its comprehensive knowledge base, intuitive interface, and focus on providing detailed, nuanced responses. It's designed to be more than just a question-answering tool—it's a thinking partner that helps you explore ideas and solve complex problems.",
    },
    {
      question: "Can I use Oracle Shell for commercial purposes?",
      answer:
        "Yes, with appropriate subscription plans. Our Business and Enterprise plans include commercial usage rights, along with additional features like team collaboration, custom knowledge bases, and priority support.",
    },
    {
      question: "How do I report issues or provide feedback?",
      answer:
        "We welcome your feedback! You can report issues or provide suggestions through the 'Feedback' button in the terminal interface, or by contacting our support team at support@oracleshell.com.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Oracle Shell
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-gray-600 hover:text-gray-900">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-600 font-medium">
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
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>

          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Still have questions?</h2>
            <p className="mb-6 text-gray-600">
              If you couldn&apos;t find the answer you were looking for, our support team is here to help.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
              <Link href="/">
                <Button variant="outline">Try Oracle Shell</Button>
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
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
