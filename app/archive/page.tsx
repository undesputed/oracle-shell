"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, Tag, Clock } from 'lucide-react'

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample archive data
  const archiveItems = [
    {
      id: "1",
      date: "May 10, 2025",
      question: "How do I improve my productivity while working from home?",
      response:
        "To improve productivity while working from home, establish a dedicated workspace, maintain a consistent schedule, take regular breaks, minimize distractions, set clear boundaries with household members, use productivity techniques like Pomodoro, and ensure you have proper equipment and ergonomic setup.",
      category: "Productivity",
      tags: ["work", "productivity", "remote"],
    },
    {
      id: "2",
      date: "May 9, 2025",
      question: "What are the best practices for data visualization?",
      response:
        "Best practices for data visualization include choosing the right chart type for your data, maintaining a clean and simple design, using color effectively, labeling clearly, providing context, ensuring accessibility, being consistent with scales, and avoiding distortion of data.",
      category: "Data Science",
      tags: ["data", "visualization", "design"],
    },
    {
      id: "3",
      date: "May 8, 2025",
      question: "Can you explain how blockchain technology works?",
      response:
        "Blockchain is a distributed ledger technology that records transactions across multiple computers. Each block contains a timestamp and transaction data, and is linked to the previous block using cryptography. This creates a secure, transparent, and tamper-resistant record of all transactions without requiring a central authority.",
      category: "Technology",
      tags: ["blockchain", "crypto", "technology"],
    },
    {
      id: "4",
      date: "May 7, 2025",
      question: "What are some effective strategies for learning a new language?",
      response:
        "Effective strategies for learning a new language include consistent daily practice, immersion through media and conversation, using spaced repetition for vocabulary, focusing on high-frequency words first, practicing with native speakers, setting specific goals, using varied learning resources, and maintaining motivation through enjoyable activities.",
      category: "Education",
      tags: ["language", "learning", "education"],
    },
    {
      id: "5",
      date: "May 6, 2025",
      question: "How can I improve my public speaking skills?",
      response:
        "To improve public speaking skills, practice regularly, record yourself speaking, join groups like Toastmasters, know your audience, prepare thoroughly, use storytelling techniques, work on body language and voice modulation, manage anxiety through breathing exercises, seek feedback, and watch great speakers to learn from them.",
      category: "Communication",
      tags: ["speaking", "communication", "skills"],
    },
  ]

  // Filter items based on search query
  const filteredItems = archiveItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
                <Link href="/features" className="text-gray-600 hover:text-primary-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-primary-700 font-medium">
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
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-primary-900">Your Interaction Archive</h1>
          <p className="text-gray-600">
            Browse and search through your past interactions with Oracle Shell. All your questions and responses are
            saved here for future reference.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search your archive..."
                className="pl-10 border-primary-200 focus:border-primary-400 focus:ring-primary-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center border-primary-200 text-primary-700 hover:bg-primary-50">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Filter by Date</span>
            </Button>
            <Button variant="outline" className="flex items-center border-primary-200 text-primary-700 hover:bg-primary-50">
              <Tag className="mr-2 h-4 w-4" />
              <span>Filter by Tag</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-primary-100 text-primary-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-primary-800">All Interactions</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-primary-800">Recent</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-white data-[state=active]:text-primary-800">Favorites</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-white data-[state=active]:text-primary-800">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {filteredItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-primary-200 p-8 text-center">
                <p className="text-gray-500">No results found. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="border border-primary-100 transition-all hover:shadow-md hover:border-primary-200">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg font-medium text-primary-900">{item.question}</CardTitle>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-secondary-50 text-secondary-700 border-secondary-200">{item.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{item.response}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-primary-50 text-primary-700 border-primary-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent">
            <div className="rounded-lg border border-dashed border-primary-200 p-8 text-center">
              <p className="text-gray-500">Your recent interactions will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="rounded-lg border border-dashed border-primary-200 p-8 text-center">
              <p className="text-gray-500">Your favorite interactions will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="categories">
            <div className="rounded-lg border border-dashed border-primary-200 p-8 text-center">
              <p className="text-gray-500">Your categorized interactions will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
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
