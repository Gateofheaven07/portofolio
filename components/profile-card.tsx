"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 5
      const rotateY = (centerX - x) / 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    }

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative group z-20">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[50px] scale-110"
        style={{
          background: `radial-gradient(circle, rgba(57, 255, 20, 0.8), rgba(134, 239, 172, 0.4), transparent)`,
        }}
      />

      <div
        ref={cardRef}
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-64 sm:w-72 h-[400px] sm:h-[450px] flex flex-col items-center justify-between transition-all duration-300 ease-out group-hover:shadow-[0_0_50px_rgba(57,255,20,0.5)]"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Profile Content */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pt-4 sm:pt-6" style={{ transform: "translateZ(30px)" }}>
          {/* Profile Image */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-900 via-purple-900 to-slate-800 overflow-hidden">
              <Image
                src="/taufiik foto.jpeg"
                alt="Taufik Ramlan"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover rounded-xl sm:rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white">Taufik Ramlan A</h3>
            <p className="text-gray-400 font-orbitron text-xs sm:text-sm">IT Enthusiast</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full space-y-3 sm:space-y-4" style={{ transform: "translateZ(30px)" }}>
          {/* Social Links */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
              <span className="truncate">@taupikramlan3590</span>
            </div>
            <span>Online</span>
          </div>

          <div className="space-y-2">
            {/* Contact Button */}
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  const offset = window.innerWidth < 640 ? 60 : 80
                  const elementPosition = contactSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - offset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              Contact Me
            </button>

            {/* Projects Button */}
            <button 
              onClick={() => {
                const projectsSection = document.getElementById('projects')
                if (projectsSection) {
                  const offset = window.innerWidth < 640 ? 60 : 80
                  const elementPosition = projectsSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - offset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="w-full py-2 sm:py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-orbitron text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Explore My Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
