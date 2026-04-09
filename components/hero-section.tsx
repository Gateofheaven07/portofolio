"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ProfileCard from "./profile-card"
import RocketAnimation from "./rocket-animation"

// Custom bezier easing for premium feel
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Custom variants untuk intro hero 
const introContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.20,
    }
  }
}

const introBgVariants = {
  hidden: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: customEase }
  }
}

const introTitleVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: customEase }
  }
}

const introSubVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: customEase }
  }
}

const introButtonVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: customEase }
  }
}

// ─── Hero section ─────────────────────────────────────────────────────────────
export default function HeroSection({ isReady = true }: { isReady?: boolean }) {
  const particlesRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const bgRef        = useRef<HTMLDivElement>(null)
  const fgRef        = useRef<HTMLDivElement>(null)

  const [displayText,  setDisplayText]  = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting,   setIsDeleting]   = useState(false)
  const [taglineText,  setTaglineText]  = useState("")

  const fullText = "Hi I'm Taufik Ramlan A"
  const tagline  = "IT Enthusiast"

  // ── Parallax via rAF — desktoponly ────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth <= 640) return

    let rafId: number
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const scrolled = -rect.top
        if (bgRef.current) bgRef.current.style.transform = `translateY(${scrolled * 0.25}px)`
        // Efek parallax pada foreground dihapus agar konten tetap di tempat
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId) }
  }, [])

  // ── Digital rain particles — desktop only ─────────────────────────────────
  useEffect(() => {
    if (window.innerWidth <= 640) return
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

  // ── Typewriter — main heading ─────────────────────────────────────────────
  useEffect(() => {
    const speed = isDeleting ? 50 : 100
    const pause = 2000
    if (!isDeleting && currentIndex < fullText.length) {
      const t = setTimeout(() => { setDisplayText(fullText.slice(0, currentIndex + 1)); setCurrentIndex(i => i + 1) }, speed)
      return () => clearTimeout(t)
    }
    if (!isDeleting && currentIndex === fullText.length) {
      const t = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (isDeleting && currentIndex > 0) {
      const t = setTimeout(() => { setDisplayText(fullText.slice(0, currentIndex - 1)); setCurrentIndex(i => i - 1) }, 50)
      return () => clearTimeout(t)
    }
    if (isDeleting && currentIndex === 0) setIsDeleting(false)
  }, [currentIndex, isDeleting, fullText])

  // ── Typewriter — tagline ──────────────────────────────────────────────────
  useEffect(() => {
    if (taglineText.length < tagline.length) {
      const t = setTimeout(() => setTaglineText(tagline.slice(0, taglineText.length + 1)), 80)
      return () => clearTimeout(t)
    }
  }, [taglineText, tagline])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden w-full max-w-full bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900"
    >
      <motion.div
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        variants={introContainerVariants}
        className="w-full h-full"
      >
        {/* ── Parallax background layer */}
        <motion.div
          variants={introBgVariants}
          ref={bgRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
        <div ref={particlesRef} className="absolute inset-0" />

        {/* Ambient glow blobs */}
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
      </motion.div>

      {/* Rocket */}
      <RocketAnimation />

      {/* Profile Card — desktop */}
      <div className="absolute top-24 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 z-20 hidden lg:block">
        <motion.div variants={introSubVariants}>
          <ProfileCard />
        </motion.div>
      </div>

      {/* ── 3-D perspective container — wraps foreground content */}
      <div style={{ perspective: "1200px" }} className="w-full">
        <div
          ref={fgRef}
          className="relative z-10 w-full max-w-7xl mx-auto
                     px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                     pt-20 sm:pt-24 md:pt-28 lg:pt-32
                     min-h-screen flex items-center"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 w-full">

            {/* ── Left: staggered reveal container */}
            <div
              className="text-left space-y-6 sm:space-y-8 max-w-full lg:max-w-3xl flex-1"
            >
              <div className="space-y-3 sm:space-y-4">

                {/* Quote — item 1 */}
                <motion.div
                  className="text-xs sm:text-sm text-gray-400 font-orbitron origin-left"
                  variants={introSubVariants}
                >
                  &quot;Learning today, innovating tomorrow.&quot;
                </motion.div>

                {/* Main heading — item 2 */}
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold text-white leading-tight break-words"
                  variants={introTitleVariants}
                >
                  {displayText}
                  <span className="animate-pulse">|</span>
                </motion.h1>

                {/* Tagline — item 3 */}
                <motion.div
                  className="h-6 sm:h-8 flex items-center"
                  variants={introSubVariants}
                >
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron font-semibold text-[var(--neon-cyan)] break-words">
                    {taglineText}
                    <span className="animate-pulse">|</span>
                  </span>
                </motion.div>

                {/* Description — item 4 */}
                <motion.p
                  className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-full lg:max-w-lg"
                  variants={introSubVariants}
                >
                  Seorang IT Enthusiast yang antusias mengeksplorasi berbagai teknologi terkini.
                  Berpengalaman dalam pengembangan web, analisis data, dan berbagai bidang
                  teknologi informasi. Terus mengembangkan keterampilan dan pengetahuan untuk
                  menciptakan solusi teknologi yang inovatif, efisien, dan berkualitas tinggi.
                </motion.p>
              </div>

              {/* Buttons — item 5 */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                variants={introButtonVariants}
              >
                <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-cyan-400 hover:text-white hover:shadow-[0_0_16px_rgba(0,191,255,0.25)] transition-all duration-300">
                  Download CV
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("about")
                    if (el) {
                      const offset = window.innerWidth < 640 ? 60 : 80
                      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: "smooth" })
                    }
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-cyan-400 hover:text-white hover:shadow-[0_0_16px_rgba(0,191,255,0.25)] transition-all duration-300"
                >
                  About Me
                </button>
              </motion.div>
            </div>

            {/* Profile Card — mobile, item 6 */}
            <motion.div
              className="block lg:hidden flex justify-center mt-8"
              variants={introSubVariants}
            >
              <ProfileCard />
            </motion.div>
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  )
}
