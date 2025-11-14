"use client"

import { useEffect, useRef, useState } from "react"

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const starsContainer = starsRef.current
    if (!starsContainer) return

    // Fade in effect after a short delay
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const createStar = () => {
      const star = document.createElement("div")
      const size = Math.random() * 3 + 1
      const depth = Math.random() * 1000 + 100 // Z-depth for 3D effect
      // Reduced opacity range for mobile: 0.05-0.2, for desktop: 0.1-0.4
      const baseOpacity = isMobile ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.1
      const opacity = baseOpacity
      const twinkleSpeed = Math.random() * 3 + 2

      // Calculate position to avoid profile card area (now positioned at top right)
      let left, top
      do {
        left = Math.random() * 100
        top = Math.random() * 100
      } while (
        // Exclude area where profile card is positioned (top right corner)
        // Responsive exclusion based on screen size
        (left > 75 && top < 60) ||
        // Also exclude a bit more area to be safe
        (left > 70 && top < 65) ||
        // Additional exclusion for smaller screens
        (left > 80 && top < 70)
      )

      star.className = "absolute bg-white rounded-full"
      star.style.width = size + "px"
      star.style.height = size + "px"
      star.style.left = left + "%"
      star.style.top = top + "%"
      star.style.opacity = opacity.toString()
      star.style.transform = `translateZ(${depth}px)`
      star.style.animation = `twinkle ${twinkleSpeed}s ease-in-out infinite`
      // Reduced box shadow intensity - even more for mobile (multiply opacity by 0.3 for mobile, 0.5 for desktop)
      const shadowOpacity = isMobile ? opacity * 0.3 : opacity * 0.5
      star.style.boxShadow = `0 0 ${size * 1.5}px rgba(255, 255, 255, ${shadowOpacity})`

      starsContainer.appendChild(star)

      // Remove star after some time to prevent memory issues
      setTimeout(() => {
        if (starsContainer.contains(star)) {
          starsContainer.removeChild(star)
        }
      }, 30000)
    }

    // Create initial stars with slower fade-in
    for (let i = 0; i < 200; i++) {
      setTimeout(() => createStar(), i * 80) // Slower: 80ms instead of 50ms
    }

    // Continue creating stars
    const interval = setInterval(createStar, 1500)

    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <div 
      ref={starsRef} 
      className="fixed inset-0 pointer-events-none z-10 transition-opacity"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        // Start at lower opacity on mobile (20%), higher on desktop (30%)
        opacity: isLoaded ? (isMobile ? 0.6 : 1) : (isMobile ? 0.2 : 0.3),
        transitionDuration: "2000ms"
      }}
    />
  )
}
