"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import TimelineSection from "@/components/timeline-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import ScrollProgress from "@/components/scroll-progress"
import SectionNavDots from "@/components/section-nav-dots"
import { AnimatedSection } from "@/components/animated-section"

// ─── Loading Screen ─────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in")
  const [dots, setDots] = useState("")

  // Animated dots
  useEffect(() => {
    const iv = setInterval(() => setDots(d => (d.length >= 3 ? "" : d + ".")), 400)
    return () => clearInterval(iv)
  }, [])

  // Sequence: fade-in → hold → fade-out → call onDone
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400)
    const t2 = setTimeout(() => setPhase("out"), 1800)
    const t3 = setTimeout(onDone, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900"
      style={{
        opacity:    phase === "out" ? 0 : 1,
        transform:  phase === "out" ? "scale(0.96) translateY(-20px)" : "scale(1) translateY(0)",
        transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Radial glow bg */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,191,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative flex flex-col items-center gap-6"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "var(--neon-cyan)",
              borderRightColor: "rgba(0,191,255,0.3)",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "rgba(124,58,237,0.8)",
              animation: "spin 1.4s linear infinite reverse",
            }}
          />
          {/* Center dot */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 8px rgba(0,191,255,0.8)" }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2
            className="text-xl font-orbitron font-bold tracking-widest"
            style={{
              color: "var(--neon-cyan)",
              textShadow: "0 0 10px rgba(0,191,255,0.5)",
            }}
          >
            INITIALIZING{dots}
          </h2>
          <p className="text-xs text-gray-500 font-orbitron mt-1 tracking-widest">
            LOADING PORTFOLIO
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--neon-cyan), #7c3aed)",
              boxShadow: "0 0 8px rgba(0,191,255,0.5)",
              animation: "loading-fill 1.8s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section Wrapper with blur transition ────────────────────────────────────
interface SectionWrapperProps {
  children: React.ReactNode
  delay?: number
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale-up"
}

function SectionWrapper({ children, delay = 0, variant = "fade-up" }: SectionWrapperProps) {
  return (
    <AnimatedSection
      variant={variant}
      delay={delay}
      duration={750}
      distance={40}
      easing="spring"
      threshold={0.08}
      rootMargin="0px 0px -60px 0px"
    >
      {children}
    </AnimatedSection>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  // ── Scroll to top on every page load / refresh
  useEffect(() => {
    // history.scrollRestoration = "manual" mencegah browser restore posisi scroll lama
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual"
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [])

  // Called when loading screen finishes
  const handleLoadDone = useCallback(() => {
    setIsLoading(false)
    // Small delay for cinematic feel before content slides in
    setTimeout(() => setContentVisible(true), 80)
  }, [])

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
      cursorDot.style.left = e.clientX + "px"
      cursorDot.style.top = e.clientY + "px"
    }
    const handleMouseEnter = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1.5)"
      cursorDot.style.transform = "translate(-50%,-50%) scale(0.5)"
    }
    const handleMouseLeave = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)"
      cursorDot.style.transform = "translate(-50%,-50%) scale(1)"
    }

    document.addEventListener("mousemove", handleMouseMove)
    const elems = document.querySelectorAll("button, a, input, textarea, .interactive")
    elems.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      elems.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])


  return (
    <>
      {/* Loading overlay */}
      {isLoading && <LoadingScreen onDone={handleLoadDone} />}

      {/* ── Nav dots — OUTSIDE main to avoid CSS transform containing block bug */}
      <SectionNavDots />

      {/* Main content — cinematic reveal after loading */}
      <main
        className="relative min-h-screen w-full max-w-full"
        style={{
          overflowX: "clip",
          opacity:    contentVisible ? 1 : 0,
          transform:  contentVisible ? "scale(1) translateY(0px)" : "scale(0.97) translateY(24px)",
          transition: contentVisible
            ? "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)"
            : "none",
        }}
      >
        {/* Scroll progress bar */}
        <ScrollProgress />

        <Navbar />

        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className="fixed w-8 h-8 pointer-events-none z-50"
          style={{
            background: "radial-gradient(circle, rgba(0,191,255,0.3), transparent)",
            filter: "blur(1px)",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.2s ease-out",
            willChange: "left, top, transform",
          }}
        />
        <div
          ref={cursorDotRef}
          className="fixed w-1 h-1 pointer-events-none z-50"
          style={{
            background: "var(--neon-cyan)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.1s ease-out",
            willChange: "left, top",
          }}
        />

        {/* Shooting stars are rendered inside StarsBackground (stars-background.tsx) */}

        {/* Scanlines */}
        <div
          className="fixed inset-0 pointer-events-none z-40 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.1) 2px, rgba(0,191,255,0.1) 4px)`,
            animation: "scanlines 20s linear infinite",
          }}
        />

        {/* ── Hero (no AnimatedSection — hero manages own reveal) */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* ── Projects */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="projects">
          <SectionWrapper delay={0}>
            <ProjectsSection />
          </SectionWrapper>
        </div>

        {/* ── Timeline */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="timeline">
          <SectionWrapper delay={0} variant="fade-left">
            <TimelineSection />
          </SectionWrapper>
        </div>

        {/* ── About */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="about">
          <SectionWrapper delay={0} variant="fade-right">
            <AboutSection />
          </SectionWrapper>
        </div>

        {/* ── Skills */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="skills">
          <SectionWrapper delay={0} variant="scale-up">
            <SkillsSection />
          </SectionWrapper>
        </div>

        {/* ── Contact */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="contact">
          <SectionWrapper delay={0} variant="fade-up">
            <ContactSection />
          </SectionWrapper>
        </div>
      </main>
    </>
  )
}
