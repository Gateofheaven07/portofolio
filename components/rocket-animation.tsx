"use client"

import { useEffect, useState } from "react"

export default function RocketAnimation() {
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number }>>([])
  const [isHovered, setIsHovered] = useState(false)

  // Particle generator
  useEffect(() => {
    let idCounter = 0
    const interval = setInterval(() => {
      setParticles(current => {
        // Add new particle
        const newParticle = {
          id: idCounter++,
          size: Math.random() * 15 + 10,
          left: Math.random() * 20 - 10, // random spread
        }
        
        // Keep max 20 particles to avoid memory issues
        const updated = [...current, newParticle].slice(-20)
        return updated
      })
    }, 150) // spawn rate

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center lg:justify-end lg:pr-[20vw]">
      {/* Container for positioned rocket */}
      <div 
        className={`pointer-events-auto relative transition-transform duration-300 ease-out cursor-pointer ${isHovered ? 'scale-110' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: isHovered 
            ? 'rocket-vibrate 0.1s linear infinite' 
            : 'rocket-float 4s ease-in-out infinite',
        }}
      >
        <div className="relative transform -rotate-45 flex flex-col items-center">
          
          {/* Rocket Emoji */}
          <span 
            className="text-6xl md:text-8xl filter drop-shadow-xl block relative z-20" 
            role="img" 
            aria-label="rocket"
          >
            🚀
          </span>

          {/* Glowing Engine pulsing effect */}
          <div className="absolute bottom-4 z-10 w-8 h-8 rounded-full bg-orange-500 opacity-50 blur-xl animate-pulse"></div>

          {/* Engine Exhaust Particles */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full flex justify-center -z-10">
            {isHovered && (
              <div className="absolute top-0 w-6 h-16 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent blur-md opacity-80 animate-pulse rounded-full z-0"></div>
            )}
            
            {/* Trail / Smoke system */}
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `calc(50% + ${p.left}px - ${p.size/2}px)`,
                  background: isHovered ? 'radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,69,0,0) 70%)' : 'radial-gradient(circle, rgba(156,163,175,0.6) 0%, rgba(107,114,128,0) 70%)',
                  animation: `smoke-fade ${isHovered ? '0.8s' : '1.5s'} ease-out forwards`,
                }}
              />
            ))}
          </div>

        </div>
      </div>
      
      {/* Internal Styles for Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rocket-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes rocket-vibrate {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2px, -2px) rotate(-2deg); }
          50% { transform: translate(2px, -2px) rotate(2deg); }
          75% { transform: translate(-2px, 2px) rotate(-1deg); }
          100% { transform: translate(2px, 2px) rotate(1deg); }
        }
        @keyframes smoke-fade {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(80px) scale(3);
            opacity: 0;
          }
        }
      `}} />
    </div>
  )
}
