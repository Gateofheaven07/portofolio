"use client"

import { useEffect, useRef, useState } from "react"

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // ─── Static stars ────────────────────────────────────────────────────
  useEffect(() => {
    const starsContainer = starsRef.current
    if (!starsContainer) return

    setTimeout(() => setIsLoaded(true), 500)

    const createStar = () => {
      const star = document.createElement("div")
      const size = Math.random() * 3 + 1
      const depth = Math.random() * 1000 + 100
      const baseOpacity = isMobile
        ? Math.random() * 0.15 + 0.05
        : Math.random() * 0.3 + 0.1
      const twinkleSpeed = Math.random() * 3 + 2

      let left, top
      do {
        left = Math.random() * 100
        top = Math.random() * 100
      } while (
        (left > 75 && top < 60) ||
        (left > 70 && top < 65) ||
        (left > 80 && top < 70)
      )

      star.className = "absolute bg-white rounded-full"
      star.style.width = size + "px"
      star.style.height = size + "px"
      star.style.left = left + "%"
      star.style.top = top + "%"
      star.style.opacity = baseOpacity.toString()
      // Di mobile: tanpa 3D transform untuk performa. Twinkle tetap jalan.
      if (!isMobile) {
        star.style.transform = `translateZ(${depth}px)`
      }
      star.style.animation = `twinkle ${twinkleSpeed}s ease-in-out infinite`

      const shadowOpacity = isMobile ? baseOpacity * 0.3 : baseOpacity * 0.5
      star.style.boxShadow = `0 0 ${size * 1.5}px rgba(255,255,255,${shadowOpacity})`

      starsContainer.appendChild(star)
      // Di mobile tidak perlu recycle karena jumlah kecil dan statik
      if (!isMobile) {
        setTimeout(() => {
          if (starsContainer.contains(star)) starsContainer.removeChild(star)
        }, 30000)
      }
    }

    // Mobile: 30 bintang statik saja, Desktop: 200 bintang animasi
    const count = isMobile ? 30 : 200
    for (let i = 0; i < count; i++) {
      if (isMobile) {
        createStar()  // langsung, tanpa stagger timeout
      } else {
        setTimeout(createStar, i * 80)
      }
    }
    if (!isMobile) {
      const iv = setInterval(createStar, 1500)
      return () => clearInterval(iv)
    }
  }, [isMobile])

  // Shooting stars moved to components/shooting-star.tsx to prevent duplication

  return (
    <div
      ref={starsRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity"
      style={{
        // Di mobile: tanpa 3D perspective untuk menghilangkan GPU composite layer yang berat
        ...(isMobile ? {} : {
          transformStyle: "preserve-3d" as const,
          perspective: "1000px",
        }),
        opacity: isLoaded ? (isMobile ? 0.6 : 1) : (isMobile ? 0.2 : 0.3),
        transitionDuration: "2000ms",
      }}
    />
  )
}
