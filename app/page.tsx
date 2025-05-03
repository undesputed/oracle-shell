"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Home() {
  const router = useRouter()
  const isMobile = useIsMobile()

  // Redirect to mobile view if on mobile device
  useEffect(() => {
    if (isMobile) {
      router.push("/mobile")
    }
  }, [isMobile, router])

  return <LandingPage />
}
