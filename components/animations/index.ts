/**
 * index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Barrel export semua komponen & util animasi.
 * Import dari satu tempat:
 *   import { AnimateIn, TextReveal, PageLoader, HeroReveal } from "@/components/animations"
 */

export { AnimateIn }     from "./AnimateIn"
export { TextReveal }    from "./TextReveal"
export { PageLoader }    from "./PageLoader"
export { HeroReveal }    from "./HeroReveal"

// Config / variants — useful jika ingin extend
export * from "./motion-config"
