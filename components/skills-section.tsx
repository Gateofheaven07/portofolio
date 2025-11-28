"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface Skill {
  id: number
  name: string
  level: number
  category: "frontend" | "backend" | "design" | "ai"
  imageSrc: string
  description: string
}

const skills: Skill[] = [
  {
    id: 1,
    name: "HTML",
    level: 95,
    category: "frontend",
    imageSrc: "/Icon-logo/hmtl2.png",
    description: "Semantic HTML5 markup and accessibility best practices",
  },
  {
    id: 2,
    name: "CSS",
    level: 90,
    category: "frontend",
    imageSrc: "/Icon-logo/css.png",
    description: "Advanced CSS3, animations, and responsive design",
  },
  {
    id: 3,
    name: "JavaScript",
    level: 88,
    category: "frontend",
    imageSrc: "/Icon-logo/js.jpg",
    description: "ES6+, modern JavaScript patterns and DOM manipulation",
  },
  {
    id: 4,
    name: "TypeScript",
    level: 85,
    category: "frontend",
    imageSrc: "/Icon-logo/typescript.jpg",
    description: "Type-safe development with advanced TypeScript patterns",
  },
  {
    id: 5,
    name: "React",
    level: 90,
    category: "frontend",
    imageSrc: "/Icon-logo/react.png",
    description: "Advanced React development with hooks, context, and performance optimization",
  },
  {
    id: 6,
    name: "Next.js",
    level: 88,
    category: "frontend",
    imageSrc: "/Icon-logo/nextjs.png",
    description: "Full-stack React framework with SSR and API routes",
  },
  {
    id: 8,
    name: "Python",
    level: 85,
    category: "backend",
    imageSrc: "/Icon-logo/python.png",
    description: "Backend development and AI/ML with Python frameworks",
  },
  {
    id: 9,
    name: "PHP",
    level: 80,
    category: "backend",
    imageSrc: "/Icon-logo/PHP.png",
    description: "Server-side scripting and web application development",
  },
  {
    id: 12,
    name: "Flask",
    level: 75,
    category: "backend",
    imageSrc: "/Icon-logo/flask.png",
    description: "Lightweight Python web framework for microservices",
  },
  {
    id: 10,
    name: "MySQL",
    level: 82,
    category: "backend",
    imageSrc: "/Icon-logo/MySQL.png",
    description: "Relational database design and SQL optimization",
  },
  {
    id: 11,
    name: "PostgreSQL",
    level: 80,
    category: "backend",
    imageSrc: "/Icon-logo/PostgreSQL.png",
    description: "Advanced database design and query optimization",
  },
  {
    id: 15,
    name: "TensorFlow",
    level: 75,
    category: "ai",
    imageSrc: "/Icon-logo/tensorflow.png",
    description: "Machine learning and neural network development",
  },
]

function Tooltip({
  skill,
  position,
  isVisible,
}: { skill: Skill; position: { x: number; y: number }; isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div className="rounded-lg p-4 max-w-xs" style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
      }}>
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={skill.imageSrc} 
            alt={skill.name} 
            width={24} 
            height={24}
            className="object-contain"
          />
          <h4 className="font-orbitron font-bold text-[var(--neon-cyan)]">{skill.name}</h4>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-orbitron text-gray-400">Proficiency</span>
            <span className="text-xs font-orbitron text-[var(--neon-green)]">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-green)]"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{skill.description}</p>
      </div>
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "rgba(30, 41, 59, 0.95)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        padding: "2rem",
        minHeight: "200px",
        boxShadow: isHovered ? "0 8px 32px rgba(0, 0, 0, 0.5)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div 
        className="flex items-center justify-center mb-4"
        style={{
          width: "120px",
          height: "120px",
          minWidth: "120px",
          minHeight: "120px",
        }}
      >
        <img 
          src={skill.imageSrc} 
          alt={skill.name} 
          style={{ 
            objectFit: 'contain',
            width: '120px',
            height: '120px',
            maxWidth: '120px',
            maxHeight: '120px',
          }}
        />
      </div>
      <div 
        className="text-white font-sans text-center"
        style={{
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {skill.name}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const categoryColors = {
    frontend: "var(--neon-cyan)",
    backend: "var(--neon-green)",
    design: "#ff6b35",
    ai: "#9d4edd",
  }

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden overflow-x-hidden w-full max-w-full">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(0, 191, 255, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(57, 255, 20, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 10%, rgba(255, 0, 229, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold neon-text pulse-neon">Skills I Tech </h2>
          <p className="text-base sm:text-lg text-gray-400 font-orbitron max-w-2xl mx-auto px-4">
            Matriks teknologi yang dikuasai dalam ranah digital
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[var(--neon-cyan)]" />
            <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[var(--neon-cyan)]" />
          </div>
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
              <span className="text-sm font-orbitron text-gray-400 capitalize">
                {category === "ai" ? "AI/ML" : category}
              </span>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div 
          className="grid gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="text-center rounded-lg p-6" style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 191, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
          }}>
            <div className="text-3xl font-orbitron font-bold text-[var(--neon-cyan)] mb-2">
              {skillsByCategory.frontend?.length || 0}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Frontend</div>
          </div>
          <div className="text-center rounded-lg p-6" style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(57, 255, 20, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
          }}>
            <div className="text-3xl font-orbitron font-bold text-[var(--neon-green)] mb-2">
              {skillsByCategory.backend?.length || 0}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Backend</div>
          </div>
          <div className="text-center rounded-lg p-6" style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 107, 53, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
          }}>
            <div className="text-3xl font-orbitron font-bold" style={{ color: "#ff6b35" }}>
              {skillsByCategory.design?.length || 0}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Design</div>
          </div>
          <div className="text-center rounded-lg p-6" style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(157, 78, 221, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
          }}>
            <div className="text-3xl font-orbitron font-bold" style={{ color: "#9d4edd" }}>
              {skillsByCategory.ai?.length || 0}
            </div>
            <div className="text-sm font-orbitron text-gray-400">AI/ML</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="rounded-2xl p-8 max-w-2xl mx-auto" style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
          }}>
            <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)] mb-4">Siap Berkolaborasi?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Mari gabungkan keterampilan ini untuk membangun sesuatu yang luar biasa. Baik itu aplikasi web yang kompleks,
              solusi berbasis AI, atau inovasi blockchain, saya siap menangani tantangan Anda berikutnya.
            </p>
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
              className="group relative px-8 py-4 font-orbitron font-medium text-[var(--neon-green)] border-2 border-[var(--neon-green)] rounded-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_var(--neon-green)]"
            >
              <div className="absolute inset-0 bg-[var(--neon-green)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              <span className="relative z-10 flex items-center gap-2">
                Mari Membangun Bersama
                <span className="text-xl">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
