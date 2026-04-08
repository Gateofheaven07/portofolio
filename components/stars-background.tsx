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
      // Di mobile: tanpa 3D transform dan tanpa animasi twinkle untuk performa terbaik
      if (!isMobile) {
        star.style.transform = `translateZ(${depth}px)`
        star.style.animation = `twinkle ${twinkleSpeed}s ease-in-out infinite`
      }
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

  // ─── Shooting stars (DOM-based, zero React re-render) ──────────────────
  useEffect(() => {
    // Dinonaktifkan di mobile untuk memaksimalkan performa scroll
    if (isMobile) return

    const container = starsRef.current
    if (!container) return

    const MAX_ACTIVE = 2
    let activeCount = 0

    function spawnShootingStar() {
      if (activeCount >= MAX_ACTIVE) return
      activeCount++

      const star = document.createElement("div")

      const startX    = 5 + Math.random() * 90
      const startY    = -15 + Math.random() * 10
      const travelY   = 130
      const duration  = 5 + Math.random() * 4
      const tailLen   = 100 + Math.random() * 80
      const opacity   = 0.5 + Math.random() * 0.35

      star.style.cssText = `
        position: absolute;
        left: ${startX}vw;
        top: ${startY}vh;
        pointer-events: none;
        will-change: transform, opacity;
        opacity: 0;
        z-index: 15;
      `

      const tail = document.createElement("div")
      tail.style.cssText = `
        width: 2px;
        height: ${tailLen}px;
        border-radius: 9999px;
        background: linear-gradient(
          to bottom,
          transparent 0%,
          rgba(0,191,255,0.08) 20%,
          rgba(0,191,255,0.5) 70%,
          rgba(255,255,255,0.95) 100%
        );
        filter: blur(0.5px);
        box-shadow: 0 0 5px 1px rgba(0,191,255,0.3);
      `

      const head = document.createElement("div")
      head.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255,255,255,0.95);
        box-shadow:
          0 0 4px 2px rgba(255,255,255,0.8),
          0 0 10px 4px rgba(0,191,255,0.55),
          0 0 18px 5px rgba(0,191,255,0.25);
      `

      star.appendChild(tail)
      star.appendChild(head)
      if (!starsRef.current) { activeCount--; return }
      starsRef.current.appendChild(star)

      const anim = star.animate(
        [
          { opacity: 0,             transform: "translateY(0)" },
          { opacity: opacity,       transform: `translateY(${travelY * 0.05}vh)`, offset: 0.05 },
          { opacity: opacity * 0.4, transform: `translateY(${travelY * 0.90}vh)`, offset: 0.90 },
          { opacity: 0,             transform: `translateY(${travelY}vh)` },
        ],
        { duration: duration * 1000, easing: "linear", fill: "forwards" }
      )

      const cleanup = () => {
        const c = starsRef.current
        if (c && c.contains(star)) c.removeChild(star)
        activeCount--
        setTimeout(spawnShootingStar, 1500 + Math.random() * 3500)
      }

      anim.onfinish = cleanup
      anim.oncancel = cleanup
    }

    const t1 = setTimeout(spawnShootingStar, 800)
    const t2 = setTimeout(spawnShootingStar, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      container.querySelectorAll("[data-shooting-star]").forEach(el => el.remove())
    }
  }, [isMobile])

  return (
    <div
      ref={starsRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity"
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
