"use client"

import { useRef } from "react"
import { AnimateIn, TextReveal } from "./animations"

interface Skill {
  id: number
  name: string
  level: number
  category: "frontend" | "backend" | "design" | "ai"
  imageSrc: string
  description: string
}

const skills: Skill[] = [
  { id: 1,  name: "HTML",       level: 95, category: "frontend", imageSrc: "/Icon-logo/hmtl2.png",      description: "Semantic HTML5 markup and accessibility best practices" },
  { id: 2,  name: "CSS",        level: 90, category: "frontend", imageSrc: "/Icon-logo/css.png",         description: "Advanced CSS3, animations, and responsive design" },
  { id: 3,  name: "JavaScript", level: 88, category: "frontend", imageSrc: "/Icon-logo/js.jpg",          description: "ES6+, modern JavaScript patterns and DOM manipulation" },
  { id: 4,  name: "TypeScript", level: 85, category: "frontend", imageSrc: "/Icon-logo/typescript.jpg",  description: "Type-safe development with advanced TypeScript patterns" },
  { id: 5,  name: "React",      level: 90, category: "frontend", imageSrc: "/Icon-logo/react.png",       description: "Advanced React development with hooks, context, and performance optimization" },
  { id: 6,  name: "Next.js",    level: 88, category: "frontend", imageSrc: "/Icon-logo/nextjs.png",      description: "Full-stack React framework with SSR and API routes" },
  { id: 8,  name: "Python",     level: 85, category: "backend",  imageSrc: "/Icon-logo/python.png",      description: "Backend development and AI/ML with Python frameworks" },
  { id: 9,  name: "PHP",        level: 80, category: "backend",  imageSrc: "/Icon-logo/PHP.png",         description: "Server-side scripting and web application development" },
  { id: 12, name: "Flask",      level: 75, category: "backend",  imageSrc: "/Icon-logo/flask.png",       description: "Lightweight Python web framework for microservices" },
  { id: 10, name: "MySQL",      level: 82, category: "backend",  imageSrc: "/Icon-logo/MySQL.png",       description: "Relational database design and SQL optimization" },
  { id: 11, name: "PostgreSQL", level: 80, category: "backend",  imageSrc: "/Icon-logo/PostgreSQL.png",  description: "Advanced database design and query optimization" },
  { id: 15, name: "TensorFlow", level: 75, category: "ai",       imageSrc: "/Icon-logo/tensorflow.png",  description: "Machine learning and neural network development" },
]

const categoryColors = {
  frontend: "var(--neon-cyan)",
  backend:  "var(--neon-green)",
  design:   "#ff6b35",
  ai:       "#9d4edd",
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <AnimateIn variant="scale-in" delay={index * 0.06} duration={0.6} threshold={0.05}>
      <div className="card-shimmer group flex flex-col items-center justify-center w-full aspect-square rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer bg-slate-900/40 backdrop-blur-md border border-white/10 hover:bg-slate-800/60 shadow-lg hover:shadow-2xl">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-1 items-center justify-center mb-3">
          <img
            src={skill.imageSrc}
            alt={skill.name}
            className="object-contain w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="text-gray-200 font-sans text-sm sm:text-base font-medium text-center w-full">
          {skill.name}
        </div>
      </div>
    </AnimateIn>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const summaryCards = [
    { label: "Frontend", count: skillsByCategory.frontend?.length || 0, color: "rgba(0, 191, 255, 0.3)",  textColor: "var(--neon-cyan)"  },
    { label: "Backend",  count: skillsByCategory.backend?.length  || 0, color: "rgba(57, 255, 20, 0.3)",   textColor: "var(--neon-green)" },
    { label: "Design",   count: skillsByCategory.design?.length   || 0, color: "rgba(255, 107, 53, 0.3)",  textColor: "#ff6b35"          },
    { label: "AI/ML",    count: skillsByCategory.ai?.length       || 0, color: "rgba(157, 78, 221, 0.3)",  textColor: "#9d4edd"          },
  ]

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden overflow-x-hidden w-full max-w-full will-change-transform"
    >
      {/* Parallax background blobs */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div
        className="absolute inset-0 parallax-bg-blob pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(0, 191, 255, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(57, 255, 20, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 10%, rgba(255, 0, 229, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <AnimateIn variant="fade-up" delay={0} duration={0.8}>
          <div className="text-center mb-16 space-y-4">
            <TextReveal
              as="h2"
              text="Skills I Tech"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold neon-text pulse-neon"
            />
            <p className="text-base sm:text-lg text-gray-400 font-orbitron max-w-2xl mx-auto px-4">
              Matriks teknologi yang dikuasai dalam ranah digital
            </p>
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[var(--neon-cyan)]" />
              <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[var(--neon-cyan)]" />
            </div>
          </div>
        </AnimateIn>

        {/* ── Category Legend ── */}
        <AnimateIn variant="fade-up" delay={0.15} duration={0.7}>
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
        </AnimateIn>

        {/* ── Skills Grid — stagger per card ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>

        {/* ── Summary Cards ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {summaryCards.map((item, i) => (
            <AnimateIn key={item.label} variant="fade-up" delay={0.2 + i * 0.08} duration={0.65}>
              <div
                className="card-shimmer text-center rounded-lg p-6"
                style={{
                  background: "rgba(15, 23, 42, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${item.color}`,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
                }}
              >
                <div className="text-3xl font-orbitron font-bold mb-2" style={{ color: item.textColor }}>
                  {item.count}
                </div>
                <div className="text-sm font-orbitron text-gray-400">{item.label}</div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* ── Call to Action ── */}
        <AnimateIn variant="scale-in" delay={0.1} duration={0.8} threshold={0.2}>
          <div className="text-center mt-16">
            <div
              className="card-shimmer rounded-2xl p-8 max-w-2xl mx-auto"
              style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
              }}
            >
              <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)] mb-4">
                Siap Berkolaborasi?
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Mari gabungkan keterampilan ini untuk membangun sesuatu yang luar biasa. Baik itu aplikasi web yang
                kompleks, solusi berbasis AI, atau inovasi blockchain, saya siap menangani tantangan Anda berikutnya.
              </p>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    const offset = window.innerWidth < 640 ? 60 : 80
                    const offsetPosition =
                      contactSection.getBoundingClientRect().top + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                  }
                }}
                className="group relative px-8 py-4 font-orbitron font-medium text-[var(--neon-green)] border-2 border-[var(--neon-green)] rounded-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_var(--neon-green)]"
              >
                <div className="absolute inset-0 bg-[var(--neon-green)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                <span className="relative z-10 flex items-center gap-2">
                  Mari Membangun Bersama
                  <span className="text-xl">→</span>
                </span>
              </button>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
