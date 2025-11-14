"use client"

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white">
            My Portfolio
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("home")}
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
          <div className="sm:hidden">
            <button className="text-white/80 hover:text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
