"use client"

import { useEffect, useState, useRef } from "react"
import { ProgressBar } from "@/components/public/progress-bar"

interface TotalsSectionProps {
  data: {
    cash: number
    orangeMoney: number
    airtelMoney: number
    mvola: number
    leetchi: number
    exchangeRate: number
    goal: number
  }
}

// Animated counter
function AnimatedValue({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    if (!isClient) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [isClient])
  
  useEffect(() => {
    if (!isVisible || !isClient) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(easeOutQuart * value)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, isClient, value, duration])
  
  const displayValue = isClient ? count : 0
  
  return (
    <span ref={ref}>
      {displayValue.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{suffix}
    </span>
  )
}

export function TotalsSectionClient({ data }: TotalsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsClient(true)
    // Set date only on client to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }))
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [isClient])

  // Calculate total in euros
  const ariaryCampaigns = [data.cash, data.orangeMoney, data.airtelMoney, data.mvola]
  const totalAriary = ariaryCampaigns.reduce((sum, amount) => sum + amount, 0)
  const totalEuro = Math.round((totalAriary / data.exchangeRate + data.leetchi) * 100) / 100
  const goal = data.goal
  const remaining = Math.max(0, goal - totalEuro)
  const percentage = Math.min(100, (totalEuro / goal) * 100)

  return (
    <section ref={sectionRef} id="about" className="py-16 lg:py-24 bg-[#F3F2E7] relative overflow-hidden">
      {/* Decorative elements with animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -left-16 top-0 w-32 h-32 rounded-full bg-[#009EFF]/10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute -right-16 bottom-0 w-40 h-40 rounded-3xl bg-[#009EFF]/10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Info */}
          <div className="space-y-6 text-center lg:text-left">
            <div>
              <p 
                className={`font-[var(--font-rowdies)] text-sm tracking-widest uppercase text-[#009EFF] mb-3 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                TEKBOT ROBOTICS 2025
              </p>
              <h2 
                className={`font-[var(--font-rowdies)] text-3xl sm:text-4xl lg:text-5xl font-light text-[#3A1700] leading-tight transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                Innovators représente Madagascar
              </h2>
            </div>
            
            <p 
              className={`font-[var(--font-manrope)] text-lg text-[#3A1700]/70 leading-relaxed max-w-lg mx-auto lg:mx-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              L'équipe Innovators de l'EMIT participe à la compétition internationale TEKBOT Robotics 2025. Votre soutien nous permet de porter haut les couleurs de Madagascar.
            </p>
            
            <a 
              href="#donate"
              className={`group inline-flex items-center gap-2 border border-[#7E8AB8]/30 text-[#7E8AB8] px-6 py-3 rounded-full font-[var(--font-rowdies)] text-sm uppercase hover:bg-[#7E8AB8] hover:text-white hover:shadow-lg transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              En Savoir Plus
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right side - Stats */}
          <div className="space-y-6">
            {/* Main total card */}
            <div 
              className={`bg-white rounded-xl p-6 sm:p-8 shadow-sm hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="text-center space-y-2 mb-6">
                <p className="text-xs sm:text-sm font-medium text-[#3A1700]/50 uppercase tracking-wider">
                  Total Collecté
                </p>
                <p className="font-[var(--font-rowdies)] text-4xl sm:text-5xl lg:text-6xl font-light text-[#009EFF]">
                  <AnimatedValue value={totalEuro} suffix=" €" duration={2500} />
                </p>
              </div>

              <ProgressBar percentage={isVisible ? percentage : 0} animated />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center hover-lift transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <p className="text-xs text-[#3A1700]/50 uppercase tracking-wider mb-1">Objectif</p>
                <p className="font-[var(--font-rowdies)] text-xl sm:text-2xl font-light text-[#3A1700]">
                  {goal.toLocaleString("fr-FR")} €
                </p>
              </div>

              <div 
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center hover-lift transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <p className="text-xs text-[#3A1700]/50 uppercase tracking-wider mb-1">Restant</p>
                <p className="font-[var(--font-rowdies)] text-xl sm:text-2xl font-light text-[#3A1700]">
                  {remaining.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>

            {/* Transparency note */}
            <div 
              className={`bg-[#009EFF]/5 border border-[#009EFF]/10 rounded-xl p-4 sm:p-6 text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#009EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="font-[var(--font-rowdies)] text-base font-light text-[#3A1700]">
                  Transparence & Confiance
                </p>
              </div>
              <p className="text-sm text-[#3A1700]/60 leading-relaxed">
                Tous les montants sont mis à jour manuellement pour garantir l'exactitude.
              </p>
              {lastUpdated && (
                <p className="text-xs text-[#3A1700]/40 mt-2">
                  Dernière mise à jour : {lastUpdated}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
