import { Hero } from "@/components/public/hero-wrapper"
import { TotalsSection } from "@/components/public/totals-wrapper"
import { Footer } from "@/components/public/footer"

// Désactiver le cache pour toujours afficher les données à jour
export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Innovators Collecte - Collecte de fonds",
  description: "Plateforme de collecte de fonds transparente des Innovators",
}

export default function PublicPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <TotalsSection />
      <Footer />
    </main>
  )
}
