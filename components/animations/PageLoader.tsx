"use client"

/**
 * PageLoader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen loading overlay menggunakan Framer Motion.
 * Menampilkan spinner + teks animasi, lalu exit dengan 3-D scale-out.
 * Panggil onDone() callback saat animasi selesai.
 *
 * Contoh pemakaian (di page.tsx):
 *   {isLoading && <PageLoader onDone={() => setIsLoading(false)} />}
 */

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { EASE_OUT_EXPO, EASE_IN_OUT } from "./motion-config"

interface PageLoaderProps {
  onDone: () => void
  /** Total visible duration sebelum fade-out dimulai (ms). Default 1800 */
  holdMs?: number
  /** Durasi fade-out (ms). Default 650 */
  exitMs?: number
}

// ── Variants ──────────────────────────────────────────────────────────────────
const overlayVariants = {
  enter: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: {
    opacity:  0,
    scale:    0.94,
    y:        -24,
    filter:   "blur(6px)",
    transition: {
      duration: 0.7,
      ease:     EASE_IN_OUT,
    },
  },
}

const spinnerVariants = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}

const textVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.2 },
  },
}

const barVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.1 },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PageLoader({ onDone, holdMs = 1800, exitMs = 700 }: PageLoaderProps) {
  const [show,     setShow]     = useState(true)   // controls AnimatePresence
  const [dots,     setDots]     = useState("")

  // Animated dots ("..." cycling)
  useEffect(() => {
    const iv = setInterval(() => setDots(d => (d.length >= 3 ? "" : d + ".")), 400)
    return () => clearInterval(iv)
  }, [])

  // Sequence: hold → hide → callback
  useEffect(() => {
    const t1 = setTimeout(() => setShow(false), holdMs)
    const t2 = setTimeout(onDone,               holdMs + exitMs + 80)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [holdMs, exitMs, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950"
          variants={overlayVariants}
          initial="enter"
          exit="exit"
        >
          {/* Radial background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,191,255,0.07) 0%, transparent 68%)",
            }}
          />

          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,191,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6 px-4">
            {/* Spinner */}
            <motion.div
              className="relative w-16 h-16"
              variants={spinnerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-transparent"
                style={{
                  borderTopColor:   "rgba(0,191,255,1)",
                  borderRightColor: "rgba(0,191,255,0.25)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{ borderBottomColor: "rgba(124,58,237,0.85)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  style={{ boxShadow: "0 0 10px 2px rgba(0,191,255,0.9)" }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="text-center"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h2
                className="text-lg font-orbitron font-bold tracking-[0.3em] uppercase"
                style={{
                  color:      "rgba(0,191,255,1)",
                  textShadow: "0 0 14px rgba(0,191,255,0.6)",
                }}
              >
                INITIALIZING{dots}
              </h2>
              <p className="text-xs text-gray-600 font-orbitron mt-1 tracking-[0.2em]">
                LOADING PORTFOLIO
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-52 h-[2px] bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(0,191,255,1), #7c3aed)",
                  boxShadow:  "0 0 10px rgba(0,191,255,0.6)",
                }}
                variants={barVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
