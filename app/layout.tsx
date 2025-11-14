import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Orbitron } from "next/font/google"
import "./globals.css"
import StarsBackground from "@/components/stars-background"

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${orbitron.variable}`}>
      <body className={`${orbitron.variable} antialiased overflow-x-hidden max-w-full`}>
        <StarsBackground />
        {children}
      </body>
    </html>
  )
}
