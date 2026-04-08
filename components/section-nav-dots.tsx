"use client"

import { useEffect, useRef, useState } from "react"

// ─── Sections ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "hero"      },
  { id: "projects"  },
  { id: "timeline"  },
  { id: "about"     },
  { id: "skills"    },
  { id: "contact"   },
] as const

type SectionId = typeof SECTIONS[number]["id"]

// ─── Component ────────────────────────────────────────────────────────────────
export default function SectionNavDots() {
  const [active,  setActive]  = useState<SectionId>("hero")
  const [visible, setVisible] = useState(false)
  const ratioRef = useRef<Record<string, number>>({})

  // ── Intersection Observer — real-time section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratioRef.current[id] = entry.intersectionRatio

          // Section dengan ratio terbesar = yang paling visible = aktif
          let maxRatio = 0
          let maxId: SectionId = "hero"
          for (const s of SECTIONS) {
            const r = ratioRef.current[s.id] ?? 0
            if (r > maxRatio) { maxRatio = r; maxId = s.id }
          }
          if (maxRatio > 0) setActive(maxId)
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        }
      )

      obs.observe(el)
      observers.push(obs)
    })

    const t = setTimeout(() => setVisible(true), 400)
    return () => { observers.forEach(o => o.disconnect()); clearTimeout(t) }
  }, [])

  // ── Scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    })
  }

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position:   "fixed",
        right:      "14px",
        top:        "50%",
        transform:  visible ? "translateY(-50%)" : "translateY(calc(-50% + 8px))",
        zIndex:     200,
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:        "14px",
        opacity:    visible ? 1 : 0,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        // Sembunyikan di mobile — ditangani oleh CSS class di bawah
      }}
      className="section-nav-dots-container"
    >
      {SECTIONS.map(({ id }) => {
        const isActive = active === id

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${id}`}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            style={{
              width:          "20px",
              height:         "20px",
              padding:        0,
              background:     "none",
              border:         "none",
              cursor:         "pointer",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              position:       "relative",
            }}
          >
            {/* Dot — ukuran aktif 10px, idle 8px, konsisten */}
            <span
              style={{
                display:      "block",
                width:        isActive ? "10px" : "8px",
                height:       isActive ? "10px" : "8px",
                borderRadius: "50%",
                background:   isActive ? "var(--neon-cyan, #00bfff)" : "transparent",
                border:       isActive
                  ? "2px solid var(--neon-cyan, #00bfff)"
                  : "2px solid rgba(156, 163, 175, 0.55)",
                boxShadow: isActive
                  ? "0 0 8px rgba(0,191,255,0.8), 0 0 16px rgba(0,191,255,0.3)"
                  : "none",
                transition: [
                  "width 0.3s cubic-bezier(0.22,1,0.36,1)",
                  "height 0.3s cubic-bezier(0.22,1,0.36,1)",
                  "background 0.3s ease",
                  "border-color 0.3s ease",
                  "box-shadow 0.3s ease",
                ].join(", "),
              }}
            />

            {/* Ripple ring hanya pada dot aktif */}
            {isActive && (
              <span
                style={{
                  position:      "absolute",
                  width:         "18px",
                  height:        "18px",
                  borderRadius:  "50%",
                  border:        "1px solid rgba(0,191,255,0.4)",
                  animation:     "dot-ripple 2s ease-out infinite",
                  pointerEvents: "none",
                }}
              />
            )}
          </button>
        )
      })}

      <style>{`
        @keyframes dot-ripple {
          0%   { transform: scale(0.5); opacity: 0.9; }
          100% { transform: scale(2);   opacity: 0;   }
        }
        /* Sembunyikan nav dots di mobile agar tidak mengganggu scroll */
        @media (max-width: 640px) {
          .section-nav-dots-container {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
