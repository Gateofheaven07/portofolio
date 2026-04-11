"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
                className="relative w-10 h-10 flex items-center justify-center p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-center items-center relative">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
                    className="w-6 h-[2px] bg-white rounded-full absolute"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                    className="w-6 h-[2px] bg-white rounded-full absolute"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
                    className="w-6 h-[2px] bg-white rounded-full absolute"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] sm:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown - Outside nav for better z-index control */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="sm:hidden fixed top-[60px] left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl z-[70] w-full"
            style={{ 
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col py-6 px-4 space-y-2"
            >
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "projects", label: "Project" },
                { id: "contact", label: "Contact" }
              ].map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center justify-between text-left text-lg text-white/90 font-orbitron transition-all duration-300 py-4 px-5 rounded-xl hover:bg-white/10 hover:text-[var(--neon-cyan)] active:bg-white/15 active:scale-[0.98]"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <span>{item.label}</span>
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
