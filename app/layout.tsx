import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Orbitron } from "next/font/google"
import "./globals.css"
import StarsBackground from "@/components/stars-background"
import ShootingStars from "@/components/shooting-star"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Portofolio Taufik",
  description: "Portofolio Taufik",
  icons: {
    icon: "/logoo.png",
    shortcut: "/logoo.png",
    apple: "/logoo.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${orbitron.variable} scroll-smooth`} style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
      <body className={`${orbitron.variable} antialiased overflow-x-hidden max-w-full`} style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900" />
        <StarsBackground />
        <ShootingStars />
        {children}
      </body>
    </html>
  )
}
