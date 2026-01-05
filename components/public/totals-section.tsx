import { getDonationData } from "@/lib/edge-config"
import { ProgressBar } from "@/components/public/progress-bar"

export async function TotalsSection() {
  const data = await getDonationData()

  // Calculate total in euros
  const ariaryCampaigns = [data.cash, data.orangeMoney, data.airtelMoney, data.mvola]
  const totalAriary = ariaryCampaigns.reduce((sum, amount) => sum + amount, 0)
  const totalEuro = Math.round((totalAriary / data.exchangeRate + data.leetchi) * 100) / 100
  const goal = data.goal
  const remaining = Math.max(0, goal - totalEuro)
  const percentage = Math.min(100, (totalEuro / goal) * 100)

  const lastUpdated = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Main total */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Total Collecté</p>
            <p className="text-5xl sm:text-6xl font-bold text-foreground">
              {totalEuro.toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-lg text-foreground/60">€</p>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-6">
          <ProgressBar percentage={percentage} />

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-lg p-6">
              <p className="text-sm text-foreground/60 uppercase tracking-wider mb-2">Objectif</p>
              <p className="text-2xl font-bold text-foreground">
                {goal.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-lg p-6">
              <p className="text-sm text-foreground/60 uppercase tracking-wider mb-2">Restant</p>
              <p className="text-2xl font-bold text-foreground">
                {remaining.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </p>
            </div>
          </div>
        </div>

        {/* Transparency note */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Transparence & Confiance</p>
          <p className="text-sm text-foreground/70">
            Tous les montants des dons sont mis à jour manuellement par l&apos;organisation pour garantir l&apos;exactitude et maintenir notre engagement envers la transparence.
          </p>
          <p className="text-xs text-foreground/50 pt-4">Dernière mise à jour : {lastUpdated}</p>
        </div>
      </div>
    </section>
  )
}
