"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroProps {
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

// Animated counter component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    if (!isClient) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, isClient])
  
  return <>{isClient ? count.toLocaleString("fr-FR") : '0'}</>
}

// Diagonal lines component for hatching effect
function DiagonalLines() {
  const lines = Array.from({ length: 18 }, (_, i) => i)
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((i) => (
        <div
          key={i}
          className="absolute bg-black/10 origin-center"
          style={{
            width: '741px',
            height: '2px',
            left: `${803 - (i * 17)}px`,
            top: `${117 + (i * 17)}px`,
            transform: 'rotate(45deg)',
          }}
        />
      ))}
    </div>
  )
}

export function HeroClient({ data }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    // Small delay for animations
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Calculate amounts in euros
  const cashEuro = Math.round((data.cash / data.exchangeRate) * 100) / 100
  const orangeMoneyEuro = Math.round((data.orangeMoney / data.exchangeRate) * 100) / 100
  const airtelMoneyEuro = Math.round((data.airtelMoney / data.exchangeRate) * 100) / 100
  const mvolaEuro = Math.round((data.mvola / data.exchangeRate) * 100) / 100
  const leetchiEuro = data.leetchi
  const totalEuro = cashEuro + orangeMoneyEuro + airtelMoneyEuro + mvolaEuro + leetchiEuro

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  // Counter data with both EUR and Ariary
  const counterItems = [
    { euroAmount: cashEuro, ariaryAmount: data.cash, label: "Cash", isAriary: true },
    { euroAmount: orangeMoneyEuro, ariaryAmount: data.orangeMoney, label: "Orange Money", isAriary: true },
    { euroAmount: airtelMoneyEuro, ariaryAmount: data.airtelMoney, label: "Airtel Money", isAriary: true },
    { euroAmount: mvolaEuro, ariaryAmount: data.mvola, label: "MVola", isAriary: true },
    { euroAmount: leetchiEuro, ariaryAmount: 0, label: "Leetchi", isAriary: false },
  ]

  return (
    <section className="relative bg-[#F3F2E7] min-h-[880px] overflow-hidden">
      {/* ===== BACKGROUND DECORATIVE ELEMENTS - FIGMA EXACT ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Main blue oval - Rectangle from Figma */}
        {/* Figma: width: 673.47px, height: 1033.79px, left: 964px, top: 2px, rotate(45deg) */}
        <div 
          className={`absolute hidden lg:block transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
          style={{
            width: '673px',
            height: '1034px',
            right: '-200px',
            top: '-100px',
            background: '#009EFF',
            borderRadius: '380px',
            transform: 'rotate(45deg)',
          }}
        />
        
        {/* Cream circle - left (Oval) */}
        {/* Figma: width: 122px, height: 122px, left: -61px, top: 147px */}
        <div 
          className={`absolute hidden md:block transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '122px',
            height: '122px',
            left: '-61px',
            top: '147px',
            background: '#E3E2CD',
            borderRadius: '50%',
          }}
        />
        
        {/* Blue circle - bottom right (Oval) */}
        {/* Figma: width: 228px, height: 228px, left: 1076px, top: 526px */}
        <div 
          className={`absolute hidden lg:block transition-all duration-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            width: '228px',
            height: '228px',
            right: '136px',
            top: '526px',
            background: '#009EFF',
            borderRadius: '50%',
          }}
        />
        
        {/* Diagonal hatching lines - Combined Shape area */}
        {/* These create the striped pattern effect */}
        <div 
          className={`absolute hidden lg:block transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {isClient && <DiagonalLines />}
        </div>
        
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav 
        className={`relative z-20 w-full transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Figma: font-size: 40px */}
            <span 
              className="font-[var(--font-rowdies)] font-light text-[#3A1700] text-3xl lg:text-[40px] hover:text-[#009EFF] transition-colors cursor-pointer"
              style={{ letterSpacing: '-1px' }}
            >
              Innovators
            </span>
            
            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8 font-[var(--font-manrope)] text-base text-[#3A1700]">
              <a href="#about" className="hover:text-[#009EFF] transition-colors relative group">
                Notre Équipe
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#009EFF] transition-all group-hover:w-full" />
              </a>
              <a href="#project" className="hover:text-[#009EFF] transition-colors relative group">
                Le Projet
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#009EFF] transition-all group-hover:w-full" />
              </a>
              <a href="#donate" className="hover:text-[#009EFF] transition-colors relative group">
                Compétition
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#009EFF] transition-all group-hover:w-full" />
              </a>
            </div>
            
            {/* CTA Button - Figma: border-radius: 24px */}
            <a 
              href="#donate" 
              className="hidden md:flex border border-[rgba(126,138,184,0.3)] text-[#7E8AB8] px-6 py-3 rounded-[24px] font-[var(--font-rowdies)] font-normal text-sm uppercase hover:bg-[#7E8AB8] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Soutenir
            </a>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-[#3A1700]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[135px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 pt-12 lg:pt-[100px]">
          
          {/* LEFT - Text content */}
          <div className="flex-1 max-w-full lg:max-w-[400px] text-center lg:text-left">
            {/* Title - Figma: font-size: 72px, line-height: 80px */}
            <h1 
              className={`font-[var(--font-rowdies)] font-light text-[#3A1700] text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] leading-tight lg:leading-[80px] transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ letterSpacing: '-3px', transitionDelay: '200ms' }}
            >
              TEKBOT ROBOTICS 2025
            </h1>
            
            {/* Description - Figma: font-size: 16px, line-height: 32px */}
            <p 
              className={`font-[var(--font-manrope)] text-base text-[rgba(58,23,0,0.5)] leading-8 mt-6 lg:mt-8 max-w-[370px] mx-auto lg:mx-0 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Soutenez l'équipe Innovators de l'EMIT qui représente Madagascar à la compétition internationale de robotique. Chaque don nous rapproche de notre objectif !
            </p>
            
            {/* Button - Figma: background: #7E8AB8, border-radius: 24px */}
            <div 
              className={`mt-8 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <a 
                href="#donate"
                className="group inline-flex items-center justify-center gap-3 bg-[#7E8AB8] text-white px-8 py-4 rounded-[24px] font-[var(--font-rowdies)] font-normal text-sm uppercase hover:bg-[#6B77A3] hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Soutenir le Projet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT - Image section with decorations */}
          <div 
            className={`relative flex-shrink-0 w-full lg:w-auto transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* Main circular image */}
            {/* Cercle rétréci */}
            <div 
              className="relative mx-auto"
              style={{ 
                width: 'min(480px, 80vw)', 
                height: 'min(480px, 80vw)',
              }}
            >
              {/* Rotating decorative ring */}
              <div className="absolute inset-[-15px] rounded-full border-2 border-dashed border-[#009EFF]/20 animate-rotate-slow" />
              
              {/* Circle container with image - full fill like Figma */}
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl group cursor-pointer">
                {/* Image fills entire circle */}
                <Image
                  src="/Innovators.jpg"
                  alt="Équipe Innovators EMIT - TEKBOT Robotics 2025 Madagascar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              
              {/* Floating badge with animation */}
              <div 
                className={`absolute -bottom-2 -right-2 bg-[#FF0000] text-white px-4 py-2 rounded-full font-[var(--font-rowdies)] text-sm shadow-lg animate-float transition-all duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                🇲🇬 Madagascar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== COUNTER SECTION ===== */}
      <div className="relative z-20 max-w-[1100px] mx-auto px-4 sm:px-6 mt-12 lg:mt-16 pb-12">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {counterItems.map((item, index) => (
            <div 
              key={item.label}
              className={`bg-white rounded-xl p-5 shadow-md hover-lift shine-effect transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              {/* Label with tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-[var(--font-rowdies)] text-sm font-light text-[#3A1700]">
                  {item.label}
                </span>
                <span className="bg-[#009EFF] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  {item.isAriary ? "Ariary" : "Euro"}
                </span>
              </div>
              
              {/* Euro amount - main display */}
              <div className="mb-3">
                <p className="text-xs text-[#3A1700]/50 uppercase tracking-wider mb-1">
                  {item.isAriary ? "Converti en Euro" : "Montant"}
                </p>
                <p className="font-[var(--font-rowdies)] text-3xl sm:text-4xl font-normal text-[#009EFF]">
                  <AnimatedCounter value={Math.floor(item.euroAmount)} duration={2000 + index * 200} />
                  <span className="text-lg">,{String(Math.round((item.euroAmount % 1) * 100)).padStart(2, '0')} €</span>
                </p>
              </div>
              
              {/* Original Ariary amount */}
              {item.isAriary && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-[#3A1700]/50 uppercase tracking-wider mb-1">
                    Montant Original
                  </p>
                  <p className="font-[var(--font-manrope)] text-base font-medium text-[#3A1700]">
                    <AnimatedCounter value={item.ariaryAmount} duration={2500 + index * 200} />
                    <span className="text-sm text-[#3A1700]/60"> Ariary</span>
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {/* Total Card */}
          <div 
            className={`bg-[#FF0000] rounded-xl p-5 shadow-md text-white sm:col-span-2 lg:col-span-1 hover-lift overflow-hidden relative transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1400ms' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#CC0000]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-[var(--font-rowdies)] text-sm font-light">
                  Total Collecté
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  Global
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                  Équivalent Euro
                </p>
                <p className="font-[var(--font-rowdies)] text-4xl sm:text-5xl font-normal">
                  <AnimatedCounter value={Math.floor(totalEuro)} duration={3000} />
                  <span className="text-xl">,{String(Math.round((totalEuro % 1) * 100)).padStart(2, '0')} €</span>
                </p>
              </div>
              
              <a 
                href="#donate" 
                className="group inline-flex items-center gap-2 font-[var(--font-rowdies)] text-sm font-light uppercase bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-300"
              >
                <span>Nous soutenir</span>
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Exchange rate info */}
        <div 
          className={`text-center transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          <p className="text-xs text-[#3A1700]/50 font-[var(--font-manrope)]">
            Taux de change : 1 € = {formatAmount(data.exchangeRate)} Ariary
          </p>
        </div>
      </div>
    </section>
  )
}
