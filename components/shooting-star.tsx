"use client"

import { useEffect, useRef, useState } from "react"

interface ShootingStar {
  id: number
  x: number       // start X (vw %)
  y: number       // start Y (vh %) — mulai dari atas
  length: number  // panjang tail (px)
  opacity: number
  delay: number   // detik — delay sebelum mulai
  duration: number // detik — durasi jatuh
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createStar(id: number): ShootingStar {
  return {
    id,
    x:        randomBetween(5, 95),   // spread di seluruh lebar layar
    y:        randomBetween(-15, -2),  // mulai di atas viewport
    length:   randomBetween(80, 160),  // panjang ekor
    opacity:  randomBetween(0.5, 0.85),
    delay:    randomBetween(1, 6),     // delay 1–6 detik (lebih bervariasi)
    duration: randomBetween(5, 10),    // jatuh 5–10 detik (lebih lambat & cinematic)
  }
}

export default function ShootingStars({ count = 5 }: { count?: number }) {
  const [stars, setStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    setStars(Array.from({ length: count }, (_, i) => createStar(i)))
  }, [count])

  const resetStar = (id: number) => {
    // Reset dengan delay baru agar tidak semua bintang muncul bersamaan
    setStars(prev =>
      prev.map(s =>
        s.id === id
          ? { ...createStar(id), delay: randomBetween(1, 4) }
          : s
      )
    )
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {stars.map(star => (
        <StarElement
          key={star.id}
          star={star}
          onComplete={() => resetStar(star.id)}
        />
      ))}
    </div>
  )
}

function StarElement({
  star,
  onComplete,
}: {
  star: ShootingStar
  onComplete: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Vertikal lurus ke bawah: hanya translateY yang berubah
    // Jarak tempuh: dari startY hingga melewati bawah layar (130vh total)
    const travelY = 130 // vh — cukup jauh melewati layar

    const anim = el.animate(
      [
        // State awal — belum muncul
        { transform: "translateY(0)",           opacity: 0 },
        // Muncul cepat di awal (5% pertama dari durasi)
        { transform: `translateY(${travelY * 0.05}vh)`, opacity: star.opacity, offset: 0.05 },
        // Mulai memudar di 90%
        { transform: `translateY(${travelY * 0.90}vh)`, opacity: star.opacity * 0.4, offset: 0.90 },
        // Hilang di bawah
        { transform: `translateY(${travelY}vh)`, opacity: 0 },
      ],
      {
        duration: star.duration * 1000,
        delay:    star.delay * 1000,
        easing:   "linear",
        fill:     "forwards",
      }
    )

    anim.onfinish = () => onComplete()
    return () => anim.cancel()
  }, [star, onComplete])

  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        left:        `${star.x}vw`,
        top:         `${star.y}vh`,
        willChange:  "transform, opacity",
        opacity:     0,
      }}
    >
      {/* Tail — vertikal (rotasi 90°, origin di bawah = kepala di bawah) */}
      <div
        style={{
          width:           2,
          height:          star.length,
          borderRadius:    "9999px",
          // Gradient dari atas (transparan) ke bawah (kepala yang bercahaya)
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0,191,255,0.08) 20%,
            rgba(0,191,255,0.5)  70%,
            rgba(255,255,255,0.95) 100%
          )`,
          filter:      "blur(0.5px)",
          boxShadow:   "0 0 6px 1px rgba(0,191,255,0.35)",
        }}
      />
      {/* Head glow — di bagian bawah tail */}
      <div
        style={{
          position:     "absolute",
          bottom:       0,
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        6,
          height:       6,
          borderRadius: "50%",
          background:   "rgba(255,255,255,0.95)",
          boxShadow: `
            0 0 4px 2px rgba(255,255,255,0.8),
            0 0 10px 4px rgba(0,191,255,0.6),
            0 0 20px 6px rgba(0,191,255,0.3)
          `,
        }}
      />
    </div>
  )
}
