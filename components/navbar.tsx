"use client"

import { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollPosition = useRef(0)
  const pendingScrollTarget = useRef<string | null>(null)

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      scrollPosition.current = window.scrollY
      // Disable body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      // Prevent iOS bounce scroll
      document.body.style.touchAction = 'none'
    } else {
      // Restore scroll position
      const scrollY = scrollPosition.current
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      
      // If there's a pending scroll target, scroll to it after body is restored
      if (pendingScrollTarget.current) {
        const targetId = pendingScrollTarget.current
        pendingScrollTarget.current = null
        
        // Wait for body to be fully restored
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const element = document.getElementById(targetId)
            if (element) {
              const offset = window.innerWidth < 640 ? 60 : 80
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - offset
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              })
            }
          })
        })
      } else if (scrollY) {
        // Restore scroll position if no target
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY)
        })
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    if (isMenuOpen) {
      // If menu is open, store target and close menu
      // The useEffect will handle scrolling after body is restored
      pendingScrollTarget.current = sectionId
      setIsMenuOpen(false)
    } else {
      // If menu is already closed, scroll directly
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = window.innerWidth < 640 ? 60 : 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 w-full relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-bold text-white">
              My Portfolio
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm md:text-base text-white/80 hover:text-white font-orbitron transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm md:text-base text-white/80 hover:text-white font-orbitron transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm md:text-base text-white/80 hover:text-white font-orbitron transition-colors duration-300"
              >
                Project
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm md:text-base text-white/80 hover:text-white font-orbitron transition-colors duration-300"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden relative z-[61]">
              <button 
                onClick={toggleMenu}
                className="text-white hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10 active:bg-white/15"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] sm:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Dropdown - Outside nav for better z-index control */}
      {isMenuOpen && (
        <div 
          className="sm:hidden fixed top-[60px] left-0 right-0 bg-black border-b border-white/20 shadow-2xl z-[70] w-full"
          style={{ 
            maxHeight: 'calc(100vh - 60px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex flex-col py-4 px-4 space-y-1">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-left text-base text-white font-orbitron transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[var(--neon-cyan)] active:bg-white/15"
              style={{ touchAction: 'manipulation' }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-base text-white font-orbitron transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[var(--neon-cyan)] active:bg-white/15"
              style={{ touchAction: 'manipulation' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left text-base text-white font-orbitron transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[var(--neon-cyan)] active:bg-white/15"
              style={{ touchAction: 'manipulation' }}
            >
              Project
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-base text-white font-orbitron transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[var(--neon-cyan)] active:bg-white/15"
              style={{ touchAction: 'manipulation' }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  )
}
