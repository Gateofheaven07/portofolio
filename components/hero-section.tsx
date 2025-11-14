"use client"

import { useEffect, useRef, useState } from "react"
import ProfileCard from "./profile-card"

export default function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const fullText = "Hi I'm Taufik Ramlan A"
  const tagline = "IT Enthusiast"
  const [taglineText, setTaglineText] = useState("")

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      const height = Math.random() * 20 + 10
      const opacity = Math.random() * 0.7 + 0.3

      particle.className = "absolute bg-gradient-to-b from-transparent via-teal-400 to-transparent"
      particle.style.width = "1px"
      particle.style.height = height + "px"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.opacity = opacity.toString()
      particle.style.animationDuration = Math.random() * 4 + 3 + "s"
      particle.style.animationName = "digital-rain"
      particle.style.animationTimingFunction = "linear"
      particle.style.animationIterationCount = "infinite"
      particle.style.animationDelay = Math.random() * 2 + "s"

      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 8000)
    }

    const interval = setInterval(createParticle, 400)

    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 200)
    }

    return () => clearInterval(interval)
  }, [])





  // Typewriter effect for main text
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const deleteSpeed = 50
    const pauseTime = 2000

    if (!isDeleting && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === fullText.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false)
    }
  }, [currentIndex, isDeleting, fullText])

  // Typewriter effect for tagline
  useEffect(() => {
    const typeSpeed = 80
    if (taglineText.length < tagline.length) {
      const timeout = setTimeout(() => {
        setTaglineText(tagline.slice(0, taglineText.length + 1))
      }, typeSpeed)
      return () => clearTimeout(timeout)
    }
  }, [taglineText, tagline])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-900 via-slate-900 to-slate-800"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Digital Rain Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Profile Card positioned at top right for desktop */}
      <div className="absolute top-24 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 z-20 hidden lg:block">
        <ProfileCard />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-28 min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 w-full">
          {/* Left Side - Main Content */}
          <div className="text-left space-y-6 sm:space-y-8 max-w-full lg:max-w-3xl flex-1">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-xs sm:text-sm text-gray-400 font-orbitron scale-90 origin-left">"Learning today, innovating tomorrow."</div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold text-white leading-tight break-words">
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>

              <div className="h-6 sm:h-8 flex items-center">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron font-semibold text-[var(--neon-cyan)] break-words">
                  {taglineText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-full lg:max-w-lg">
              Seorang IT Enthusiast yang antusias mengeksplorasi berbagai teknologi terkini. Berpengalaman dalam pengembangan web, analisis data, dan berbagai bidang teknologi informasi. Terus mengembangkan keterampilan dan pengetahuan untuk menciptakan solusi teknologi yang inovatif, efisien, dan berkualitas tinggi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-white hover:text-white transition-all duration-300">
                Download CV
              </button>
              <button 
                onClick={() => {
                  const aboutSection = document.getElementById('about')
                  aboutSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-gray-500 text-gray-300 font-orbitron rounded-lg hover:border-white hover:text-white transition-all duration-300"
              >
                About Me
              </button>
            </div>
          </div>

          {/* Profile Card for mobile and tablet - positioned next to main content */}
          <div className="block lg:hidden flex justify-center mt-8">
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  )
}
