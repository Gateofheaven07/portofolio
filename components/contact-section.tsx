"use client"

import type React from "react"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek wajib diisi"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi"
    } else if (formData.message.length < 10) {
      newErrors.message = "Pesan minimal 10 karakter"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section id="contact" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-x-hidden w-full max-w-full">
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(0, 191, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(57, 255, 20, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold neon-text pulse-neon">Contact Me</h2>
          <p className="text-base sm:text-lg text-gray-400 font-orbitron max-w-2xl mx-auto px-4">
            Siap mewujudkan visi digital Anda? Mari mulai percakapan.
          </p>

          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div
              className="w-16 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div className="glassmorphism rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div
                className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-green-400 to-transparent animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6 relative z-10">Kirim Pesan</h3>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-lg border border-green-400 bg-green-400/10 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-orbitron text-green-400">
                    Pesan berhasil dikirim! Saya akan segera membalas Anda.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama Anda"
                    className={`w-full bg-transparent border-0 border-b-2 ${errors.name ? "border-red-400" : "border-gray-600"} focus:border-cyan-400 outline-none py-3 px-0 text-white font-orbitron transition-all duration-300 placeholder-gray-500`}
                    required
                  />
                  {errors.name && (
                    <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-orbitron flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Anda"
                    className={`w-full bg-transparent border-0 border-b-2 ${errors.email ? "border-red-400" : "border-gray-600"} focus:border-cyan-400 outline-none py-3 px-0 text-white font-orbitron transition-all duration-300 placeholder-gray-500`}
                    required
                  />
                  {errors.email && (
                    <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-orbitron flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subjek"
                    className={`w-full bg-transparent border-0 border-b-2 ${errors.subject ? "border-red-400" : "border-gray-600"} focus:border-cyan-400 outline-none py-3 px-0 text-white font-orbitron transition-all duration-300 placeholder-gray-500`}
                    required
                  />
                  {errors.subject && (
                    <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-orbitron flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Pesan Anda"
                    rows={5}
                    className={`w-full bg-transparent border-2 ${errors.message ? "border-red-400" : "border-gray-600"} focus:border-cyan-400 outline-none py-3 px-4 text-white font-orbitron transition-all duration-300 placeholder-gray-500 rounded-lg resize-none`}
                    required
                  />
                  {errors.message && (
                    <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-orbitron flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 font-orbitron font-medium text-cyan-400 border-2 border-cyan-400 rounded-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] disabled:opacity-50 mt-8"
              >
                <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glassmorphism rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-green)] mb-6">Contact Me</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--neon-cyan)] flex items-center justify-center">
                    <span className="text-[var(--neon-cyan)]">📧</span>
                  </div>
                  <div>
                    <div className="font-orbitron text-sm text-gray-400">Email</div>
                    <div className="font-orbitron text-white">taupikramlan3590@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--neon-green)] flex items-center justify-center">
                    <span className="text-[var(--neon-green)]">💼</span>
                  </div>
                  <div>
                    <div className="font-orbitron text-sm text-gray-400">LinkedIn</div>
                    <div className="font-orbitron text-white">linkedin.com/in/taufikramlan</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--neon-pink)] flex items-center justify-center">
                    <span className="text-[var(--neon-pink)]">🐙</span>
                  </div>
                  <div>
                    <div className="font-orbitron text-sm text-gray-400">GitHub</div>
                    <div className="font-orbitron text-white">github.com/gateofheaven7</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-2xl font-orbitron font-bold text-[var(--neon-pink)] mb-6">Waktu Respon</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Saya biasanya merespons pesan dalam 24 jam. Untuk proyek atau kolaborasi yang mendesak, jangan ragu untuk
                menghubungi saya langsung melalui email.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--neon-green)] rounded-full animate-pulse" />
                <span className="text-sm font-orbitron text-[var(--neon-green)]">
                  Saat ini tersedia untuk proyek baru
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
