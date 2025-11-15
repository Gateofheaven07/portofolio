"use client"

import { useEffect, useRef } from "react"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sistem Informasi Kost Berbasis Web",
    description: "AKA Kost adalah website pencarian kamar kost dengan tampilan modern dan responsif, yang memudahkan pengguna menemukan kamar lengkap dengan detail fasilitas, harga, dan ketersediaan secara cepat dan praktis.",
    tech: ["React", "TypeScript", "Nextjs", "Neon.DB"],
    image: "/Aka Kost.png",
    demoUrl: "https://kost-kostan.vercel.app",
    githubUrl: "https://github.com/Gateofheaven07/kost-kostan",
  },
  {
    id: 2,
    title: "Plant Disease Detector",
    description: "Website ini menggunakan teknologi Vision AI untuk mendeteksi penyakit pada daun tanaman hanya dari foto. Pengguna dapat mengunggah gambar daun dan memperoleh diagnosis instan lengkap dengan penjelasan, rekomendasi perawatan, serta langkah pencegahan yang relevan.",
    tech: ["Python", "Nextjs", "Convolutional Neural Network"],
    image: "/Plant Disease.png",
    demoUrl: "https://plant-disease-frontend-mu.vercel.app",
    githubUrl: "https://github.com/Gateofheaven07/plant_disease",
  },
  {
    id: 3,
    title: "AI Background Remover",
    description: "Website berbasis AI yang dapat menghapus background gambar secara instan dengan hasil presisi tinggi. Pengguna cukup mengunggah foto dan background akan diproses otomatis dalam hitungan detik.",
    tech: ["TypeScript", "Nextjs", "Tailwind CSS"],
    image: "/bg_removal.png",
    demoUrl: "https://bg-removal-three-mu.vercel.app/",
    githubUrl: "https://github.com/Gateofheaven07/bg-removal",
  },
]

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      // Disable 3D effect on mobile to prevent scroll issues
      if (window.innerWidth < 768) return
      
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
      card.style.boxShadow = `
        0px 20px 40px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(0, 191, 255, 0.3),
        ${-rotateY * 2}px ${rotateX * 2}px 20px rgba(57, 255, 20, 0.2)
      `
    }

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)"
      card.style.boxShadow = "0px 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 191, 255, 0.1)"
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 h-full flex flex-col"
      style={{
        transformStyle: "preserve-3d",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0, 191, 255, 0.2)",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 191, 255, 0.1)",
        touchAction: "pan-y",
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cyber-darker)] via-transparent to-transparent opacity-60" />

        {/* Floating tech badges */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-1">
          {project.tech.slice(0, 2).map((tech, index) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-orbitron bg-[var(--neon-cyan)] text-black rounded-full opacity-90"
              style={{ transform: `translateZ(${30 + index * 10}px)` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-orbitron font-bold text-[var(--neon-cyan)] group-hover:text-[var(--neon-green)] transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 leading-relaxed flex-grow">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-orbitron border border-[var(--neon-green)] text-[var(--neon-green)] rounded-md hover:bg-[var(--neon-green)] hover:text-black transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 mt-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 font-orbitron text-sm border border-[var(--neon-cyan)] text-[var(--neon-cyan)] rounded-lg hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_var(--neon-cyan)] text-center"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 font-orbitron text-sm border border-[var(--neon-pink)] text-[var(--neon-pink)] rounded-lg hover:bg-[var(--neon-pink)] hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_var(--neon-pink)] text-center"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
      <div
        className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--neon-green)] rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent animate-pulse" />
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-x-hidden w-full max-w-full" style={{ touchAction: 'pan-y' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, 
            rgba(0, 191, 255, 0.05) 0%, 
            transparent 50%),
            radial-gradient(ellipse at 80% 50%, 
            rgba(57, 255, 20, 0.05) 0%, 
            transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold neon-text pulse-neon">Projects & Achievements</h2>
          <p className="text-base sm:text-lg text-gray-400 font-orbitron max-w-2xl mx-auto px-4">
          Temukan perjalanan saya dalam mengubah ide menjadi pengalaman digital yang bermakna.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[var(--neon-cyan)]" />
            <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[var(--neon-cyan)]" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch w-full" style={{ touchAction: 'pan-y' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card opacity-0 transform translate-y-8 transition-all duration-700 flex"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 font-orbitron font-medium text-[var(--neon-green)] border-2 border-[var(--neon-green)] rounded-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_var(--neon-green)]">
            <div className="absolute inset-0 bg-[var(--neon-green)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <span className="text-xl">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
