"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GraffitiWallPage } from "@/components/graffiti-wall-page"
import { SharedHeader } from "@/components/shared-header"
import { useIsMobile } from "@/hooks/use-mobile"

export default function GraffitiPage() {
  const router = useRouter()
  const isMobile = useIsMobile()

  // Redirect to mobile view if on mobile device
  useEffect(() => {
    if (isMobile) {
      router.push("/mobile/graffiti")
    }
  }, [isMobile, router])

  return (
    <div className="flex min-h-screen flex-col">
      <SharedHeader />
      <main className="flex flex-1 p-4">
        <GraffitiWallPage />
      </main>
    </div>
  )
}
