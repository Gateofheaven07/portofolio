"use client"

/**
 * AnimateIn.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable wrapper komponen yang memberi animasi masuk (scroll-triggered / on-mount).
 * Mendukung beberapa variant, delay, dan stagger otomatis untuk children.
 *
 * Contoh pemakaian:
 *   <AnimateIn variant="fade-up" delay={0.2}>
 *     <MyComponent />
 *   </AnimateIn>
 */

import { motion } from "framer-motion"
import {
  fadeUpVariants,
  fadeInVariants,
  scaleInVariants,
  EASE_OUT_EXPO,
} from "./motion-config"
import type { Variants, Transition } from "framer-motion"

// ── Types ─────────────────────────────────────────────────────────────────────
type AnimVariant = "fade-up" | "fade-in" | "scale-in" | "fade-left" | "fade-right"

interface AnimateInProps {
  children:    React.ReactNode
  variant?:    AnimVariant
  delay?:      number        // seconds
  duration?:   number        // seconds
  className?:  string
  once?:       boolean       // default true — animate only once
  threshold?:  number        // 0–1, viewport fraction before animating
  as?:         "div" | "section" | "article" | "span" | "li"
}

// ── Variant map ───────────────────────────────────────────────────────────────
const variantMap: Record<AnimVariant, Variants> = {
  "fade-up":    fadeUpVariants,
  "fade-in":    fadeInVariants,
  "scale-in":   scaleInVariants,
  "fade-left":  {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden:  { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AnimateIn({
  children,
  variant    = "fade-up",
  delay      = 0,
  duration   = 0.85,
  className  = "",
  once       = true,
  threshold  = 0.12,
  as         = "div",
}: AnimateInProps) {

  const transition: Transition = {
    duration,
    ease:  EASE_OUT_EXPO,
    delay,
  }

  // Merge custom transition into the variants so delay/duration propagates cleanly
  const variants: Variants = {
    hidden:  variantMap[variant].hidden,
    visible: {
      ...(variantMap[variant].visible as object),
      transition,
    },
  }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {children}
    </MotionTag>
  )
}

export default AnimateIn
