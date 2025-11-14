"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import TimelineSection from "@/components/timeline-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("")

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
      cursor.style.transform = "scale(1.5)"
      cursorDot.style.transform = "scale(0.5)"
    }

    const handleMouseLeave = () => {
      cursor.style.transform = "scale(1)"
      cursorDot.style.transform = "scale(1)"
    }

    document.addEventListener("mousemove", handleMouseMove)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, textarea, .interactive")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "timeline", "about", "skills", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-orbitron font-bold text-cyan-400 animate-pulse">Initializing</h2>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Enhanced Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(0,191,255,0.3), transparent)",
          filter: "blur(1px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          background: "var(--neon-cyan)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Navigation Indicator - Vertical layout, adjusted position for mobile */}
      <div className="flex flex-col fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-2 sm:space-y-3 md:space-y-4">
        {["hero", "projects", "timeline", "about", "skills", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section
                ? "border-cyan-400 bg-cyan-400 shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                : "border-gray-600 hover:border-cyan-400"
            }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </div>

      {/* Enhanced Scanlines Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,191,255,0.1) 2px,
            rgba(0,191,255,0.1) 4px
          )`,
          animation: "scanlines 20s linear infinite",
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div id="hero">
        <HeroSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="timeline">
        <TimelineSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  )
}
