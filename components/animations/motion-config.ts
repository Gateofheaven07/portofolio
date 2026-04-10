/**
 * motion-config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Central config untuk semua animasi Framer Motion di portfolio.
 * Import dari sini agar konsisten dan mudah di-tweak.
 */

import type { Variants, Transition, BezierDefinition } from "framer-motion"

// ── Easing curves ─────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO:  BezierDefinition = [0.16, 1, 0.3, 1]          // snappy & smooth
export const EASE_OUT_QUART: BezierDefinition = [0.25, 1, 0.5, 1]          // medium-fast
export const EASE_IN_OUT:    BezierDefinition = [0.83, 0, 0.17, 1]         // cinematic cross-fade
export const EASE_SPRING    = { type: "spring", stiffness: 100, damping: 20 }

// ── Reusable transitions ──────────────────────────────────────────────────────
export const transitionFast: Transition = {
  duration:  0.6,
  ease:      EASE_OUT_EXPO,
}

export const transitionSmooth: Transition = {
  duration:  0.9,
  ease:      EASE_OUT_EXPO,
}

export const transitionSlow: Transition = {
  duration:  1.2,
  ease:      EASE_OUT_EXPO,
}

// ── Fade + slide variants (reusable) ─────────────────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y:       0,
    transition: transitionSmooth,
  },
}

export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transitionSmooth },
}

export const scaleInVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: transitionSmooth },
}

// ── Stagger container variants ────────────────────────────────────────────────
export function staggerContainer(staggerChildren = 0.12, delayChildren = 0): Variants {
  return {
    hidden:  {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

// ── Page-load (hero) entry variants ──────────────────────────────────────────
export const heroContainerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.13,
      delayChildren:    0.15,  // small delay after loading screen disappears
    },
  },
}

export const heroItemVariants: Variants = {
  hidden:  { opacity: 0, y: 44, scale: 0.96 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: {
      duration: 0.85,
      ease:     EASE_OUT_EXPO,
    },
  },
}

// ── Text word/letter stagger ──────────────────────────────────────────────────
export const wordContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export const wordItemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity:  1,
    y:        0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}

// ── 3-D perspective entry (whole page) ───────────────────────────────────────
export const pageRevealVariants: Variants = {
  hidden: {
    opacity:    0,
    y:          30,
  },
  visible: {
    opacity:    1,
    y:          0,
    transition: {
      duration: 1.1,
      ease:     EASE_OUT_EXPO,
    },
  },
}
