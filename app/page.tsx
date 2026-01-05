import { Hero } from "@/components/public/hero"
import { DonationCards } from "@/components/public/donation-cards"
import { TotalsSection } from "@/components/public/totals-section"
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
    <main className="min-h-screen bg-background">
      <Hero />
      <DonationCards />
      <TotalsSection />
      <Footer />
    </main>
  )
}
