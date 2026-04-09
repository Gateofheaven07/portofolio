"use client"

/**
 * TextReveal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Komponen animasi teks dengan stagger per-kata atau per-huruf.
 * Mendukung 3D rotateX flip, fade + slide, dengan perspective wrapper.
 *
 * Contoh pemakaian:
 *   <TextReveal text="Hello World" mode="word" delay={0.2} />
 *   <TextReveal text="PORTFOLIO" mode="char" className="text-6xl font-bold" />
 */

import { motion } from "framer-motion"
import { useMemo } from "react"
import { EASE_OUT_EXPO } from "./motion-config"

// ── Types ─────────────────────────────────────────────────────────────────────
interface TextRevealProps {
  text:        string
  mode?:       "word" | "char"        // stagger per kata atau per huruf
  delay?:      number                 // seconds — delay before stagger starts
  stagger?:    number                 // seconds between each word/char
  duration?:   number                 // per-item duration
  className?:  string                 // applied to each word/char span
  wrapClass?:  string                 // applied to outer wrapper
  once?:       boolean
  threshold?:  number
  as?:         "h1" | "h2" | "h3" | "p" | "span" | "div"
}

// ── Variants ──────────────────────────────────────────────────────────────────
const containerVariants = (stagger: number, delay: number) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const itemVariants = (duration: number) => ({
  hidden:  {
    opacity:  0,
    y:        22,
    rotateX:  20,           // subtle 3-D flip coming from "above"
  },
  visible: {
    opacity:  1,
    y:        0,
    rotateX:  0,
    transition: { duration, ease: EASE_OUT_EXPO },
  },
})

// ── Component ─────────────────────────────────────────────────────────────────
export function TextReveal({
  text,
  mode      = "word",
  delay     = 0,
  stagger   = 0.07,
  duration  = 0.55,
  className = "",
  wrapClass = "",
  once      = true,
  threshold = 0.1,
  as        = "span",
}: TextRevealProps) {

  // Split text into tokens (words or chars)
  const tokens = useMemo(() => {
    if (mode === "char") return text.split("")
    return text.split(" ")
  }, [text, mode])

  const Tag = motion[as] as typeof motion.span

  return (
    // perspective wrapper — gives depth to rotateX
    <span
      style={{ display: "inline-block", perspective: "800px" }}
      className={wrapClass}
    >
      <Tag
        style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: mode === "word" ? "0.28em" : "0" }}
        variants={containerVariants(stagger, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
      >
        {tokens.map((token, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", transformOrigin: "bottom center" }}
            variants={itemVariants(duration)}
            className={className}
          >
            {token === " " ? "\u00A0" : token}
            {/* add space after each word */}
            {mode === "word" && i < tokens.length - 1 ? "" : ""}
          </motion.span>
        ))}
      </Tag>
    </span>
  )
}

export default TextReveal
