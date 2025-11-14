"use client"

import { useEffect, useRef, useState } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && parallaxRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5 // Parallax speed multiplier

        // Only apply parallax when section is in view
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          parallaxRef.current.style.transform = `translateY(${rate}px)`
        }

        setScrollY(scrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(57, 255, 20, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 50px 50px, 50px 50px",
          backgroundPosition: "0 0, 0 0, 25px 25px, 25px 25px",
        }}
      >
        {/* Circuit Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, var(--neon-cyan) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, var(--neon-green) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, var(--neon-pink) 1px, transparent 1px),
              linear-gradient(45deg, transparent 40%, rgba(0, 191, 255, 0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(57, 255, 20, 0.1) 50%, transparent 60%)
            `,
            backgroundSize: "200px 200px, 300px 300px, 250px 250px, 100px 100px, 100px 100px",
          }}
        />
      </div>

      {/* Atmospheric Effects */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 10% 20%, rgba(0, 191, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(57, 255, 20, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 0, 229, 0.04) 0%, transparent 70%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold neon-text pulse-neon">About Me</h2>
          <p className="text-lg text-gray-400 font-orbitron max-w-2xl mx-auto">
            Cerita di balik kode, visi di balik layar
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[var(--neon-green)]" />
            <div className="w-2 h-2 bg-[var(--neon-green)] rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[var(--neon-green)]" />
          </div>
        </div>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start content-start">
          {/* Left Column - Personal Story */}
          <div className="space-y-8">
            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-200 h-full">
              <div className="rounded-2xl p-8 space-y-6 h-full" style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
              }}>
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)] mb-4">Arsitek Digital</h3>
                <p className="text-gray-300 leading-relaxed">
                  Sebagai seorang IT Enthusiast, saya menciptakan pengalaman yang menjembatani kesenjangan antara
                  intuisi manusia dan presisi mesin. Perjalanan saya dimulai dari rasa ingin tahu yang mendalam, di mana
                  baris-baris kode menjadi bahasa pertama saya dalam menciptakan sesuatu.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Dari hari-hari awal debugging hingga larut malam hingga membangun sistem yang kompleks, setiap tantangan
                  telah menjadi batu loncatan menuju penguasaan seni kerajinan digital. Saya terus belajar dan berkembang
                  dalam berbagai bidang teknologi informasi untuk menciptakan solusi yang inovatif dan berkualitas.
                </p>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-400 h-full">
              <div className="rounded-2xl p-8 space-y-6 h-full" style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
              }}>
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-green)] mb-4">Filosofi & Visi</h3>
                <p className="text-gray-300 leading-relaxed">
                  Saya percaya bahwa teknologi seharusnya tidak terlihat namun kuat, intuitif namun canggih. Pendekatan saya
                  menggabungkan inovasi terdepan dengan desain yang berpusat pada manusia, menciptakan solusi yang tidak hanya
                  berfungsi—tetapi juga menginspirasi.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-0.5 bg-[var(--neon-green)]" />
                  <span className="text-[var(--neon-green)] font-orbitron text-sm">"Kode adalah puisi dalam gerakan"</span>
                </div>
              </div>
            </div>

            {/* CTA moved here to align and match width with left column cards */}
            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-500 h-full">
              <div className="rounded-2xl p-8 space-y-6 h-full" style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
              }}>
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)]">Mari Membangun Masa Depan</h3>
                <p className="text-gray-300 leading-relaxed">
                  Siap mengubah visi Anda menjadi kenyataan digital? Mari berkolaborasi dan menciptakan sesuatu yang luar biasa
                  bersama-sama.
                </p>
                <div>
                  <button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group relative px-8 py-4 font-orbitron font-medium text-[var(--neon-cyan)] border-2 border-[var(--neon-cyan)] rounded-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_var(--neon-cyan)]"
                  >
                    <div className="absolute inset-0 bg-[var(--neon-cyan)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Mulai Percakapan
                      <span className="text-xl">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Highlights */}
          <div className="space-y-8">
            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-300 h-full">
              <div className="rounded-2xl p-8 h-full" style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
              }}>
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-pink)] mb-6">Dengan Angka</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-[var(--neon-cyan)] mb-2">2+</div>
                    <div className="text-sm font-orbitron text-gray-400">Tahun Pengalaman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-[var(--neon-green)] mb-2">5+</div>
                    <div className="text-sm font-orbitron text-gray-400">Proyek Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-[var(--neon-pink)] mb-2">5+</div>
                    <div className="text-sm font-orbitron text-gray-400">Teknologi Dikuasai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-[var(--neon-cyan)] mb-2">100K+</div>
                    <div className="text-sm font-orbitron text-gray-400">Baris Kode</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-500 h-full">
              <div className="rounded-2xl p-8 space-y-6 h-full" style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
              }}>
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-cyan)] mb-4">Nilai Inti</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
                    <span className="text-gray-300 font-orbitron">Inovasi melalui iterasi</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-2 h-2 bg-[var(--neon-green)] rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span className="text-gray-300 font-orbitron">Berpikir desain berpusat pada pengguna</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-2 h-2 bg-[var(--neon-pink)] rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <span className="text-gray-300 font-orbitron">Pola pikir pembelajaran berkelanjutan</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    />
                    <span className="text-gray-300 font-orbitron">Pemecahan masalah kolaboratif</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-600 h-full">
              <div className="glassmorphism rounded-2xl p-8 space-y-6 h-full">
                <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-green)] mb-4">Di Luar Kode</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Ketika saya tidak sedang merancang pengalaman digital, Anda akan menemukan saya menjelajahi persimpangan antara seni dan
                  teknologi, berkontribusi pada komunitas open-source, atau membimbing generasi berikutnya dari para pencipta
                  digital.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {["Open Source", "Mentoring", "Tech Writing", "Digital Art", "Gaming", "Sci-Fi"].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 text-xs font-orbitron border border-[var(--neon-green)]/30 text-[var(--neon-green)] rounded-full hover:bg-[var(--neon-green)]/10 transition-all duration-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - removed from bottom (moved to left column) */}

      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-1 h-20 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent opacity-30 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-1 h-16 bg-gradient-to-t from-[var(--neon-green)] to-transparent opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-5 w-2 h-2 bg-[var(--neon-pink)] rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-5 w-1 h-1 bg-[var(--neon-cyan)] rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </section>
  )
}
