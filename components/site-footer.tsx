import Link from "next/link"

export function SiteFooter() {
  return (
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
  )
}
