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

  // ─── Static stars ───────────────────────────────────────────────────────────
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
      star.style.transform = `translateZ(${depth}px)`
      star.style.animation = `twinkle ${twinkleSpeed}s ease-in-out infinite`
      const shadowOpacity = isMobile ? baseOpacity * 0.3 : baseOpacity * 0.5
      star.style.boxShadow = `0 0 ${size * 1.5}px rgba(255,255,255,${shadowOpacity})`

      starsContainer.appendChild(star)
      setTimeout(() => {
        if (starsContainer.contains(star)) starsContainer.removeChild(star)
      }, 30000)
    }

    for (let i = 0; i < 200; i++) setTimeout(createStar, i * 80)
    const iv = setInterval(createStar, 1500)
    return () => clearInterval(iv)
  }, [isMobile])

  // ─── Shooting stars (DOM-based, zero React re-render) ───────────────────────
  useEffect(() => {
    const container = starsRef.current
    if (!container) return

    // Max aktif: 2 desktop, 1 mobile
    const MAX_ACTIVE = isMobile ? 1 : 2
    let activeCount = 0

    function spawnShootingStar() {
      if (activeCount >= MAX_ACTIVE) return
      activeCount++

      const star = document.createElement("div")

      // Random start — spread di seluruh lebar, mulai di atas viewport
      const startX    = 5 + Math.random() * 90        // 5–95 vw
      const startY    = -15 + Math.random() * 10      // -15 hingga -5 vh (di atas layar)
      const travelY   = 130                           // vh — jatuh hingga bawah layar
      const duration  = (isMobile ? 6 : 5) + Math.random() * 4  // 5–9s lebih lambat
      const tailLen   = isMobile ? 70 + Math.random() * 50 : 100 + Math.random() * 80
      const opacity   = 0.5 + Math.random() * 0.35

      // Container
      star.style.cssText = `
        position: absolute;
        left: ${startX}vw;
        top: ${startY}vh;
        pointer-events: none;
        will-change: transform, opacity;
        opacity: 0;
        z-index: 15;
      `

      // Tail — vertikal (lebar 2px, tinggi = tailLen, gradient atas→bawah)
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

      // Head glow — di bagian bawah tail
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

      // Animasi vertikal — hanya translateY
      const anim = star.animate(
        [
          { opacity: 0,            transform: "translateY(0)" },
          { opacity: opacity,      transform: `translateY(${travelY * 0.05}vh)`, offset: 0.05 },
          { opacity: opacity * 0.4, transform: `translateY(${travelY * 0.90}vh)`, offset: 0.90 },
          { opacity: 0,            transform: `translateY(${travelY}vh)` },
        ],
        {
          duration: duration * 1000,
          easing: "linear",
          fill: "forwards",
        }
      )

      const cleanup = () => {
        const c = starsRef.current
        if (c && c.contains(star)) c.removeChild(star)
        activeCount--
        // Respawn dengan delay lebih panjang agar terasa cinematic
        const delay = isMobile
          ? 3000 + Math.random() * 5000   // 3–8s mobile
          : 1500 + Math.random() * 3500   // 1.5–5s desktop
        setTimeout(spawnShootingStar, delay)
      }

      anim.onfinish = cleanup
      anim.oncancel = cleanup
    }

    // Initial staggered spawns — jangan serentak
    const initialDelay = isMobile ? 2000 : 800
    const t1 = setTimeout(spawnShootingStar, initialDelay)
    const t2 = !isMobile ? setTimeout(spawnShootingStar, initialDelay + 2000) : undefined

    return () => {
      clearTimeout(t1)
      if (t2 !== undefined) clearTimeout(t2)
      // Cancel all running animations on unmount
      container.querySelectorAll("[data-shooting-star]").forEach(el => el.remove())
    }
  }, [isMobile])

  return (
    <div
      ref={starsRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        opacity: isLoaded ? (isMobile ? 0.6 : 1) : (isMobile ? 0.2 : 0.3),
        transitionDuration: "2000ms",
      }}
    />
  )
}
