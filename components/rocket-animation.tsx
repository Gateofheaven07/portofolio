"use client"

import { useEffect, useState } from "react"

export default function RocketAnimation() {
  const [isFlying, setIsFlying] = useState(false)

  // Configuration
  const floatDuration = 6500 // 7s flight
  const pauseDuration = 3000 // 3s pause
  const cycleTime = floatDuration + pauseDuration

  useEffect(() => {
    // Initial start
    const startTimeout = setTimeout(() => {
      setIsFlying(true)
    }, 1000)

    return () => clearTimeout(startTimeout)
  }, [])

  useEffect(() => {
    if (!isFlying) return

    const stopFlightTimeout = setTimeout(() => {
      setIsFlying(false)
      
      const startNextFlightTimeout = setTimeout(() => {
        setIsFlying(true)
      }, pauseDuration)
      
      return () => clearTimeout(startNextFlightTimeout)
    }, floatDuration)

    return () => clearTimeout(stopFlightTimeout)
  }, [isFlying, floatDuration, pauseDuration])

  if (!isFlying) return null

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div 
        className="rocket-flight absolute top-0 left-0 w-full h-full"
        style={{
          '--flight-duration': `${floatDuration}ms`,
        } as React.CSSProperties}
      >
        {/* Inner container with counter-rotation for correct emoji orientation */}
        <div 
          className="relative transform -rotate-45"
        > 
          {/* Smoke Trail */}
          <div className="absolute top-14 md:top-20 left-0 w-full flex justify-center items-center -z-10">
             {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gray-400 rounded-full opacity-0 blur-md"
                  style={{
                    width: `${20 + Math.random() * 20}px`,
                    height: `${20 + Math.random() * 20}px`,
                    top: `${Math.random() * 20}px`,
                    left: `${Math.random() * 10 - 20}px`, // Slight random left offset
                    animation: `smoke-trail 1s ease-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
             ))}
             {/* Longer flowing trail */}
             <div 
                className="absolute top-10 w-2 h-32 bg-gradient-to-t from-transparent via-gray-300 to-transparent blur-sm opacity-50" 
                style={{ 
                   transform: 'rotate(45deg) translate(-20px, 20px)',
                   transformOrigin: 'top center' 
                }}
             />
          </div>

          {/* Rocket Emoji with Opacity */}
          <span className="text-6xl md:text-8xl filter drop-shadow-xl block opacity-70" role="img" aria-label="rocket">
            🚀
          </span>
        </div>
      </div>
    </div>
  )
}
