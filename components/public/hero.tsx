"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background/95 py-24 px-4 sm:px-6 lg:px-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Logo Madagascar */}
        <div className="flex justify-center mb-4">
          <Image 
            src="/Madagascar.svg" 
            alt="Logo Madagascar" 
            width={120} 
            height={120}
            className="drop-shadow-lg"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Innovators Collecte
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Rejoignez notre collecte de fonds et aidez-nous à construire un monde meilleur. Chaque don, quel que soit le montant ou la devise, nous rapproche de notre objectif.
        </p>
        <div className="pt-4">
          <div className="inline-block px-6 py-3 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-md">
            <p className="text-sm font-medium text-foreground">Tous les dons sont suivis et mis à jour de manière transparente</p>
          </div>
        </div>
      </div>
    </section>
  )
}
