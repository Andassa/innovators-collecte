"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  percentage: number
  animated?: boolean
}

export function ProgressBar({ percentage, animated = false }: ProgressBarProps) {
  const [width, setWidth] = useState(0)
  const [isClient, setIsClient] = useState(false)
  
  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    if (!isClient) return
    
    // Only animate when percentage > 0
    if (percentage > 0) {
      const timer = setTimeout(() => {
        setWidth(percentage)
      }, animated ? 300 : 0)
      return () => clearTimeout(timer)
    }
  }, [percentage, animated, isClient])

  // Use consistent initial render for hydration
  const displayWidth = isClient ? width : 0
  const displayPercentage = isClient ? Math.round(width) : 0

  return (
    <div className="space-y-3">
      <div className="relative h-3 bg-[#E6E4D6] rounded-full overflow-hidden">
        {/* Progress fill */}
        <div
          className="h-full bg-gradient-to-r from-[#2FB0AB] to-[#009EFF] rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${displayWidth}%` }}
        >
          {/* Shine effect on progress - only on client */}
          {isClient && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="font-[var(--font-rowdies)] text-xl font-light text-[#3A1700]">
          {displayPercentage}%
        </p>
        <p className="text-sm text-[#3A1700]/50 font-[var(--font-manrope)]">
          vers notre objectif
        </p>
      </div>
    </div>
  )
}
