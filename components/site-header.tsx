"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          Oracle Shell
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/about"
                className={isActive("/about") ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className={isActive("/features") ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className={isActive("/archive") ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
              >
                Archive
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className={isActive("/faq") ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
