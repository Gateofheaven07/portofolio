"use client"

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react"

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "scale-up"
type EasingType = "spring" | "smooth" | "snappy"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Animasi yang dipakai (default: fade-up) */
  variant?: AnimationVariant
  /** Delay sebelum animasi mulai (ms) */
  delay?: number
  /** Durasi animasi (ms) */
  duration?: number
  /** Jarak geser dalam px untuk slide animation */
  distance?: number
  /** Easing preset */
  easing?: EasingType
  /** Threshold viewport sebelum trigger (0-1) */
  threshold?: number
  /** Offset bawah sebelum trigger */
  rootMargin?: string
  /** Animasi hanya terjadi sekali */
  once?: boolean
  /** HTML tag yang digunakan */
  as?: keyof JSX.IntrinsicElements
}

const easingMap: Record<EasingType, string> = {
  spring: "cubic-bezier(0.22, 1, 0.36, 1)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  snappy: "cubic-bezier(0.4, 0, 0.2, 1)",
}

function getInitialTransform(variant: AnimationVariant, distance: number): string {
  switch (variant) {
    case "fade-up":    return `translateY(${distance}px)`
    case "fade-down":  return `translateY(-${distance}px)`
    case "fade-left":  return `translateX(${distance}px)`
    case "fade-right": return `translateX(-${distance}px)`
    case "scale-up":   return `scale(0.92) translateY(${distance * 0.5}px)`
    case "fade":       return "none"
    default:           return `translateY(${distance}px)`
  }
}

/**
 * AnimatedSection — Reusable scroll-reveal wrapper.
 * 
 * Contoh penggunaan:
 * ```tsx
 * <AnimatedSection variant="fade-up" delay={100}>
 *   <h2>Section Title</h2>
 * </AnimatedSection>
 * ```
 * 
 * Untuk stagger children, bungkus setiap item dengan delay berbeda:
 * ```tsx
 * {items.map((item, i) => (
 *   <AnimatedSection key={i} variant="fade-up" delay={i * 80}>
 *     <Card data={item} />
 *   </AnimatedSection>
 * ))}
 * ```
 */
export function AnimatedSection({
  children,
  className = "",
  style = {},
  variant = "fade-up",
  delay = 0,
  duration = 700,
  distance = 30,
  easing = "spring",
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Respek user prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsVisible(true)
          setHasAnimated(true)
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, hasAnimated])

  const easingFn = easingMap[easing]
  const initialTransform = getInitialTransform(variant, distance)

  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? (variant === "scale-up" ? "scale(1) translateY(0px)" : "none") : initialTransform,
    transition: isVisible
      ? `opacity ${duration}ms ${easingFn} ${delay}ms, transform ${duration}ms ${easingFn} ${delay}ms`
      : "none",
    // willChange dihapus agar tidak membuat composite layer permanen di mobile
    ...style,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any

  return (
    <Component ref={ref} className={className} style={animationStyle}>
      {children}
    </Component>
  )
}

/**
 * AnimatedGroup — Wrapper stagger untuk kumpulan children.
 * Setiap child diberi delay otomatis berdasarkan index.
 * 
 * Contoh:
 * ```tsx
 * <AnimatedGroup staggerDelay={80} variant="fade-up">
 *   <Card />
 *   <Card />
 *   <Card />
 * </AnimatedGroup>
 * ```
 */
interface AnimatedGroupProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
  variant?: AnimationVariant
  duration?: number
  easing?: EasingType
  threshold?: number
}

export function AnimatedGroup({
  children,
  className = "",
  staggerDelay = 80,
  baseDelay = 0,
  variant = "fade-up",
  duration = 650,
  easing = "spring",
  threshold = 0.1,
}: AnimatedGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimatedSection
          key={i}
          variant={variant}
          delay={baseDelay + i * staggerDelay}
          duration={duration}
          easing={easing}
          threshold={threshold}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  )
}
