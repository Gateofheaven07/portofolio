"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    const onScroll = () => {
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[999] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      {/* Track */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Fill */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00bfff 0%, #7c3aed 50%, #00bfff 100%)",
          backgroundSize: "200% 100%",
          animation: "progress-shimmer 2s linear infinite",
          boxShadow: "0 0 8px rgba(0,191,255,0.6), 0 0 20px rgba(0,191,255,0.3)",
          transition: "width 0.1s linear",
          willChange: "width",
        }}
      />

      {/* Glow dot at tip */}
      {progress > 1 && (
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${progress}%`,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 8px rgba(0,191,255,1), 0 0 16px rgba(0,191,255,0.6)",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      )}
    </div>
  )
}
