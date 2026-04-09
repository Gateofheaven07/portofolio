"use client"

/**
 * HeroReveal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Wrapper khusus Hero section.
 * Animasi masuk saat page pertama load:
 *   • 3-D perspective tilt (rotateX 6° → 0°)
 *   • Scale (0.92 → 1)
 *   • Opacity (0 → 1)
 *   • Blur (6px → 0px)
 * Anak-anak bisa pakai motion.* untuk stagger individual.
 *
 * Contoh pemakaian:
 *   <HeroReveal>
 *     <h1>...</h1>
 *   </HeroReveal>
 */

import { motion } from "framer-motion"
import { pageRevealVariants, EASE_OUT_EXPO } from "./motion-config"

interface HeroRevealProps {
  children:   React.ReactNode
  className?: string
  /** Delay (seconds) sebelum animasi mulai. Default 0.05 */
  delay?:     number
}

export function HeroReveal({ children, className = "", delay = 0.05 }: HeroRevealProps) {
  return (
    /* perspective container — diperlukan agar rotateX terlihat 3-D */
    <div style={{ perspective: "1200px" }}>
      <motion.div
        className={className}
        variants={{
          ...pageRevealVariants,
          visible: {
            ...(pageRevealVariants.visible as object),
            transition: {
              duration: 1.1,
              ease:     EASE_OUT_EXPO,
              delay,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default HeroReveal
