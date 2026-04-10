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
  metadataBase: new URL('https://portofolio-taufik-rmln.vercel.app'),
  title: "Portofolio Taufik Ramlan",
  description: "Portofolio profesional Taufik Ramlan Alfiansyah. Seorang web developer yang siap merealisasikan produk digital Anda.",
  openGraph: {
    title: "Portofolio Taufik Ramlan | Web Developer",
    description: "Jelajahi portofolio interaktif Taufik Ramlan Alfiansyah. Menampilkan berbagai proyek, skill, dan pengalaman di ranah web development.",
    url: "https://portofolio-taufik-rmln.vercel.app/",
    siteName: "Portofolio Taufik",
    images: [
      {
        url: "https://portofolio-taufik-rmln.vercel.app/taufik-og-image.jpeg",
        width: 573,
        height: 548,
        alt: "Portofolio Taufik Ramlan Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
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
