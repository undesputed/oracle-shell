import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { VT323, Press_Start_2P, Permanent_Marker, Black_Ops_One } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
})

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops",
})

export const metadata: Metadata = {
  title: "The Oracle Shell",
  description:
    "A fragmented oracle AI lost aboard a derelict satellite. Probe its corrupted depths to seek the truth within its distorted responses.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${vt323.variable} ${pressStart2P.variable} ${permanentMarker.variable} ${blackOpsOne.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <div className="min-h-screen bg-black">
              {/* CRT effect overlay */}
              <div className="pointer-events-none fixed inset-0 z-50 opacity-10">
                <div className="scanlines h-full w-full"></div>
              </div>
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
