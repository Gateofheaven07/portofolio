"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import TimelineSection from "@/components/timeline-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import ScrollProgress from "@/components/scroll-progress"
import SectionNavDots from "@/components/section-nav-dots"
import { PageLoader } from "@/components/animations"

// LoadingScreen sudah diganti dengan <PageLoader /> dari Framer Motion (components/animations/PageLoader.tsx)
// Setiap section mengelola animasinya sendiri via Framer Motion AnimateIn

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

  // Custom cursor — hanya desktop (touch device tidak punya cursor)
  useEffect(() => {
    if (window.innerWidth <= 640) return  // skip on mobile

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
      {/* ── Framer Motion Loading overlay (AnimatePresence 3-D exit) */}
      {isLoading && <PageLoader onDone={handleLoadDone} holdMs={1700} exitMs={680} />}

      {/* ── Nav dots — OUTSIDE main to avoid CSS transform containing block bug */}
      <SectionNavDots />

      {/* ── Main content — cinematic 3-D reveal after loading */}
      <motion.main
        className="relative min-h-screen w-full max-w-full"
        style={{ overflowX: "clip" }}
        initial={{ opacity: 0, scale: 0.96, y: 28, filter: "blur(4px)" }}
        animate={contentVisible
          ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.96, y: 28, filter: "blur(4px)" }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Scanlines — disembunyikan di mobile untuk performa scroll */}
        <div
          className="fixed inset-0 pointer-events-none z-40 opacity-5 hidden sm:block"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.1) 2px, rgba(0,191,255,0.1) 4px)`,
            animation: "scanlines 20s linear infinite",
          }}
        />

        {/* ── Hero (no AnimatedSection — hero manages own reveal) */}
        <div id="hero">
          <HeroSection isReady={contentVisible} />
        </div>

        {/* ── Projects */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="projects">
          <ProjectsSection />
        </div>

        {/* ── Timeline */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="timeline">
          <TimelineSection />
        </div>

        {/* ── About */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="about">
          <AboutSection />
        </div>

        {/* ── Skills */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="skills">
          <SkillsSection />
        </div>

        {/* ── Contact */}
        <div className="section-divider mx-auto max-w-4xl" />
        <div id="contact">
          <ContactSection />
        </div>
      </motion.main>
    </>
  )
}
