"use client"

import { useState, useEffect, useRef } from "react"

interface Achievement {
  id: number
  year: string
  title: string
  organization: string
  description: string
  type: "certification" | "award" | "milestone"
  certificate?: string
  skills: string[]
}

const achievements: Achievement[] = [
  {
    id: 1,
    year: "2025",
    title: "Intro To Software Engineering",
    organization: "Revou",
    description:
      "Sertifikat keikutsertaan Coding Camp: Intro to Software Engineering, RevoU (25 Juli 2025).",
    type: "certification",
    certificate: "/sertifikat/SE%20sertifikat1.pdf",
    skills: ["Html", "Css", "Tailwind", "Java Script"],
  },
  {
    id: 2,
    year: "2024",
    title: "PCAP-Essentials in Python",
    organization: "Cisco Networking Academy",
    description: "Sertifikat penyelesaian kursus PCAP - Programming Essentials in Python, Cisco Networking Academy.",
    type: "certification",
    certificate: "/sertifikat/python%20sertifikat2.pdf",
    skills: ["Python"],
  },
      {
      id: 3,
      year: "2025",
      title: " Study Case Bootcamp Data Analyst with SQL & Python",
      organization: "DqLab",
      description: "Study Case Bootcamp Data Analyst with SQL & Python",
      type: "certification",
      certificate: "/sertifikat/sertifikat3.pdf",
      skills: ["Python", "SQL", "Excel",],
    },
  {
    id: 4,
    year: "2025",
    title: "CCNA: Introduction to Networks",
    organization: "Cisco Networking Academy",
    description: "Sertifikat penyelesaian kursus CCNA – Introduction to Networks, Cisco Networking Academy.",
    type: "certification",
    certificate: "/sertifikat/CCNA-_Introduction_to_Networks_certificate_taupikramlan3590-gmail-com_23aa5b7d-ea1b-405c-a9b7-b1341684fd11.pdf",
    skills: ["Networking", "Cisco Packet Tracer"],
  },
  {
    id: 5,
    year: "2023",
    title: "Profesional Programmer With Golang",
    organization: "Universitas Bina Sarana Informatika",
    description: "Sertifikat partisipasi sebagai peserta dalam seminar “Professional Programmer with Golang” yang diselenggarakan oleh Fakultas Teknik & Informatika Universitas BSI.",
    type: "certification",
    certificate: "/sertifikat/SERTIFIKAT SEMINAR WITH GOLANG.pdf",
    skills: ["Golang"],
  },
  {
    id: 6,
    year: "2024",
    title: "Programming Untuk Pengembangan Aplikasi AI",
    organization: "Universitas Bina Sarana Informatika",
    description: "Sertifikat partisipasi sebagai peserta dalam Workshop “Programming untuk Pengembangan Aplikasi AI” yang diselenggarakan oleh Program Studi Informatika Universitas BSI.",
    type: "certification",
    certificate: "/sertifikat/SertifikatDigitalmhs_20251014_081724.pdf",
    skills: ["Python"],
  },
]

function Modal({
  achievement,
  isOpen,
  onClose,
}: { achievement: Achievement | null; isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !achievement) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative glassmorphism rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 191, 255, 0.3)",
          boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 191, 255, 0.2)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-200"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-orbitron bg-[var(--neon-cyan)] text-black rounded-full">
                {achievement.year}
              </span>
              <span
                className={`px-3 py-1 text-xs font-orbitron rounded-full border ${
                  achievement.type === "certification"
                    ? "border-[var(--neon-green)] text-[var(--neon-green)]"
                    : achievement.type === "award"
                      ? "border-[var(--neon-pink)] text-[var(--neon-pink)]"
                      : "border-[var(--neon-cyan)] text-[var(--neon-cyan)]"
                }`}
              >
                {achievement.type.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)]">{achievement.title}</h3>
            <p className="text-[var(--neon-green)] font-orbitron">{achievement.organization}</p>
          </div>

          {/* Certificate Preview */}
          {achievement.certificate && (
            <div className="relative rounded-lg overflow-hidden border border-[var(--neon-cyan)]/30">
              {achievement.certificate.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={achievement.certificate}
                  title={`${achievement.title} Certificate`}
                  className="w-full h-[70vh] bg-black"
                />
              ) : (
                <img
                  src={achievement.certificate || "/placeholder.svg"}
                  alt={`${achievement.title} Certificate`}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 leading-relaxed">{achievement.description}</p>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-lg font-orbitron font-semibold text-[var(--neon-green)]">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {achievement.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm font-orbitron border border-[var(--neon-cyan)] text-[var(--neon-cyan)] rounded-md hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => {
                if (achievement.certificate) {
                  window.open(achievement.certificate, "_blank", "noopener,noreferrer")
                }
              }}
              className="flex-1 py-3 px-6 font-orbitron border border-[var(--neon-green)] text-[var(--neon-green)] rounded-lg hover:bg-[var(--neon-green)] hover:text-black transition-all duration-300"
            >
              View Certificate
            </button>
            <button className="flex-1 py-3 px-6 font-orbitron border border-[var(--neon-pink)] text-[var(--neon-pink)] rounded-lg hover:bg-[var(--neon-pink)] hover:text-black transition-all duration-300">
              Verify Credential
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineNode({
  achievement,
  onClick,
  index,
}: { achievement: Achievement; onClick: () => void; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-left")
            }, index * 200)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const getNodeColor = (type: string) => {
    switch (type) {
      case "certification":
        return "var(--neon-green)"
      case "award":
        return "var(--neon-pink)"
      case "milestone":
        return "var(--neon-cyan)"
      default:
        return "var(--neon-cyan)"
    }
  }

  return (
    <div
      ref={nodeRef}
      className="timeline-node opacity-0 transform translate-x-8 transition-all duration-700 relative flex items-center group cursor-pointer"
      onClick={onClick}
    >
      {/* Timeline Line Connection */}
      <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-[var(--neon-cyan)] to-transparent opacity-30" />

      {/* Node Circle */}
      <div
        className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
        style={{
          borderColor: getNodeColor(achievement.type),
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          boxShadow: `0 0 20px ${getNodeColor(achievement.type)}40`,
        }}
      >
        <div
          className="w-4 h-4 rounded-full animate-pulse"
          style={{ backgroundColor: getNodeColor(achievement.type) }}
        />

        {/* Pulse Ring */}
        <div
          className="absolute inset-0 rounded-full border-2 animate-ping opacity-30"
          style={{ borderColor: getNodeColor(achievement.type) }}
        />
      </div>

      {/* Content Card */}
      <div className="ml-8 glassmorphism rounded-lg p-6 flex-1 group-hover:border-[var(--neon-cyan)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,255,0.3)]">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-orbitron text-[var(--neon-cyan)] font-bold">{achievement.year}</span>
              <span
                className="px-2 py-1 text-xs font-orbitron rounded-full"
                style={{
                  backgroundColor: `${getNodeColor(achievement.type)}20`,
                  color: getNodeColor(achievement.type),
                  border: `1px solid ${getNodeColor(achievement.type)}40`,
                }}
              >
                {achievement.type}
              </span>
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">
              {achievement.title}
            </h3>
            <p className="text-[var(--neon-green)] font-orbitron text-sm">{achievement.organization}</p>
          </div>

          {/* Click Indicator */}
          <div className="text-[var(--neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{achievement.description}</p>

        {/* Skills Preview */}
        <div className="flex flex-wrap gap-1">
          {achievement.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs font-orbitron bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] rounded border border-[var(--neon-cyan)]/20"
            >
              {skill}
            </span>
          ))}
          {achievement.skills.length > 3 && (
            <span className="px-2 py-1 text-xs font-orbitron text-gray-500">+{achievement.skills.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TimelineSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNodeClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedAchievement(null), 300)
  }

  return (
    <section id="timeline" className="min-h-screen py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, 
            rgba(255, 0, 229, 0.05) 0%, 
            transparent 50%),
            radial-gradient(ellipse at 70% 80%, 
            rgba(57, 255, 20, 0.05) 0%, 
            transparent 50%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold neon-text pulse-neon">Achievement Timeline</h2>
          <p className="text-lg text-gray-400 font-orbitron max-w-2xl mx-auto">
          Perjalanan pencapaian dan sertifikasi profesional saya
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[var(--neon-pink)]" />
            <div className="w-2 h-2 bg-[var(--neon-pink)] rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[var(--neon-pink)]" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Main Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-green)] to-[var(--neon-pink)] opacity-50" />

          {achievements.map((achievement, index) => (
            <TimelineNode
              key={achievement.id}
              achievement={achievement}
              onClick={() => handleNodeClick(achievement)}
              index={index}
            />
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center glassmorphism rounded-lg p-6">
            <div className="text-3xl font-orbitron font-bold text-[var(--neon-green)] mb-2">
              {achievements.filter((a) => a.type === "certification").length}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Certifications</div>
          </div>
          <div className="text-center glassmorphism rounded-lg p-6">
            <div className="text-3xl font-orbitron font-bold text-[var(--neon-pink)] mb-2">
              {achievements.filter((a) => a.type === "award").length}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Awards</div>
          </div>
          <div className="text-center glassmorphism rounded-lg p-6">
            <div className="text-3xl font-orbitron font-bold text-[var(--neon-cyan)] mb-2">
              {achievements.filter((a) => a.type === "milestone").length}
            </div>
            <div className="text-sm font-orbitron text-gray-400">Milestones</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal achievement={selectedAchievement} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
