"use client"

import { useEffect, useRef, useState } from "react"
import ProfileCard from "./profile-card"
import RocketAnimation from "./rocket-animation"

// ─── Easing constant ─────────────────────────────────────────────────────────
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// ─── Stagger reveal style helper ─────────────────────────────────────────────
// Each element starts: scale(0.95) opacity(0) translateY(40px)
// Revealed:            scale(1)    opacity(1) translateY(0)
function revealStyle(revealed: boolean, delayMs: number): React.CSSProperties {
  return {
    opacity:   revealed ? 1 : 0,
    transform: revealed
      ? "translateY(0px) scale(1)"
      : "translateY(40px) scale(0.95)",
    transition: revealed
      ? [
          `opacity   0.85s ${EASE} ${delayMs}ms`,
          `transform 0.85s ${EASE} ${delayMs}ms`,
        ].join(", ")
      : "none",
    willChange: "opacity, transform",
  }
}

export default function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const bgRef        = useRef<HTMLDivElement>(null)
  const fgRef        = useRef<HTMLDivElement>(null)

  const [displayText,   setDisplayText]   = useState("")
  const [currentIndex,  setCurrentIndex]  = useState(0)
  const [isDeleting,    setIsDeleting]    = useState(false)
  const [taglineText,   setTaglineText]   = useState("")
  const [revealed,      setRevealed]      = useState(false)

  const fullText = "Hi I'm Taufik Ramlan A"
  const tagline  = "IT Enthusiast"

  // ── Trigger reveal: small delay so CSS transition fires properly
  useEffect(() => {
    // requestAnimationFrame ensures the initial (hidden) state painted first
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setRevealed(true), 120)
      return () => clearTimeout(t)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── Parallax via rAF — background 0.25×, foreground 0.07× (subtle)
  useEffect(() => {
    let rafId: number

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return

        // Only apply while hero is in view
        const rect = section.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return

        const scrolled = -rect.top          // positive when scrolled down

        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${scrolled * 0.25}px)`
        }
        if (fgRef.current) {
          fgRef.current.style.transform = `translateY(${scrolled * 0.07}px)`
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Digital rain particles (DOM-only, no state)
  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const createParticle = () => {
      const p = document.createElement("div")
      const h = Math.random() * 20 + 10
      p.className = "absolute bg-gradient-to-b from-transparent via-teal-400 to-transparent"
      p.style.cssText = `
        width:1px; height:${h}px;
        left:${Math.random() * 100}%;
        opacity:${Math.random() * 0.7 + 0.3};
        animation-duration:${Math.random() * 4 + 3}s;
        animation-name:digital-rain;
        animation-timing-function:linear;
        animation-iteration-count:infinite;
        animation-delay:${Math.random() * 2}s;
      `
      container.appendChild(p)
      setTimeout(() => { if (container.contains(p)) container.removeChild(p) }, 7000)
    }

    for (let i = 0; i < 12; i++) setTimeout(createParticle, i * 200)
    const iv = setInterval(createParticle, 450)
    return () => clearInterval(iv)
  }, [])

  // ── Typewriter — main heading
  useEffect(() => {
    const speed = isDeleting ? 50 : 100
    const pause = 2000

    if (!isDeleting && currentIndex < fullText.length) {
      const t = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(i => i + 1)
      }, speed)
      return () => clearTimeout(t)
    }
    if (!isDeleting && currentIndex === fullText.length) {
      const t = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (isDeleting && currentIndex > 0) {
      const t = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex - 1))
        setCurrentIndex(i => i - 1)
      }, 50)
      return () => clearTimeout(t)
    }
    if (isDeleting && currentIndex === 0) setIsDeleting(false)
  }, [currentIndex, isDeleting, fullText])

  // ── Typewriter — tagline
  useEffect(() => {
    if (taglineText.length < tagline.length) {
      const t = setTimeout(
        () => setTaglineText(tagline.slice(0, taglineText.length + 1)),
        80
      )
      return () => clearTimeout(t)
    }
  }, [taglineText, tagline])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden w-full max-w-full bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900"
    >
      {/* ── Parallax background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {/* Digital rain container */}
        <div ref={particlesRef} className="absolute inset-0" />

        {/* Ambient glow blobs — drift slowly */}
        <div
          className="parallax-bg-blob absolute"
          style={{
            width: "60vw", height: "60vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)",
            top: "-10%", left: "-10%", animationDelay: "0s",
          }}
        />
        <div
          className="parallax-bg-blob absolute"
          style={{
            width: "40vw", height: "40vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
            bottom: "5%", right: "10%", animationDelay: "-4s",
          }}
        />
      </div>

      {/* Rocket */}
      <RocketAnimation />

      {/* Profile Card — desktop */}
      <div className="absolute top-24 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 z-20 hidden lg:block">
        <ProfileCard />
      </div>

      {/* ── Foreground parallax layer */}
      <div
        ref={fgRef}
        className="relative z-10 w-full max-w-7xl mx-auto
                   px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                   pt-20 sm:pt-24 md:pt-28 lg:pt-32
                   min-h-screen flex items-center"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 w-full">

          {/* ── Left: staggered reveal */}
          <div className="text-left space-y-6 sm:space-y-8 max-w-full lg:max-w-3xl flex-1">
            <div className="space-y-3 sm:space-y-4">

              {/* Quote — delay 0ms */}
              <div
                className="text-xs sm:text-sm text-gray-400 font-orbitron origin-left"
                style={{ ...revealStyle(revealed, 0), fontSize: "inherit" }}
              >
                &quot;Learning today, innovating tomorrow.&quot;
              </div>

              {/* Main heading — delay 120ms */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold text-white leading-tight break-words"
                style={revealStyle(revealed, 120)}
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>

              {/* Tagline — delay 240ms */}
              <div
                className="h-6 sm:h-8 flex items-center"
                style={revealStyle(revealed, 240)}
              >
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron font-semibold text-[var(--neon-cyan)] break-words">
                  {taglineText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              {/* Description — delay 360ms */}
              <p
                className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-full lg:max-w-lg"
                style={revealStyle(revealed, 360)}
              >
                Seorang IT Enthusiast yang antusias mengeksplorasi berbagai teknologi terkini.
                Berpengalaman dalam pengembangan web, analisis data, dan berbagai bidang
                teknologi informasi. Terus mengembangkan keterampilan dan pengetahuan untuk
                menciptakan solusi teknologi yang inovatif, efisien, dan berkualitas tinggi.
              </p>
            </div>

            {/* Buttons — delay 480ms */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={revealStyle(revealed, 480)}
            >
              <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-cyan-400 hover:text-white hover:shadow-[0_0_16px_rgba(0,191,255,0.25)] transition-all duration-300">
                Download CV
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("about")
                  if (el) {
                    const offset = window.innerWidth < 640 ? 60 : 80
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.pageYOffset - offset,
                      behavior: "smooth",
                    })
                  }
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-cyan-400 hover:text-white hover:shadow-[0_0_16px_rgba(0,191,255,0.25)] transition-all duration-300"
              >
                About Me
              </button>
            </div>
          </div>

          {/* Profile Card — mobile, delay 560ms */}
          <div
            className="block lg:hidden flex justify-center mt-8"
            style={revealStyle(revealed, 560)}
          >
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  )
}
