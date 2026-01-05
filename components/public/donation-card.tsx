"use client"

interface DonationCardProps {
  name: string
  currency: string
  amount: number
  isConvertible: boolean
  exchangeRate?: number
}

export function DonationCard({ name, currency, amount, isConvertible, exchangeRate = 1 }: DonationCardProps) {
  const convertedAmount = isConvertible ? Math.round((amount / exchangeRate) * 100) / 100 : amount
  const displayAmount = isConvertible ? convertedAmount : amount

  return (
    <div className="group relative">
      {/* Glassmorphism card with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-card/40 backdrop-blur-xl border border-foreground/10 rounded-xl p-6 hover:border-foreground/20 transition-all duration-300 space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground/70 uppercase tracking-wider">{name}</p>
          <p className="text-xs text-foreground/50 mt-1">in {currency}</p>
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">
            {displayAmount.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
            {isConvertible ? "€" : "EUR"}
          </p>
        </div>

        {isConvertible && (
          <div className="pt-3 border-t border-foreground/10">
            <p className="text-xs text-foreground/50">Original</p>
            <p className="text-sm font-semibold text-foreground mt-1">
              {amount.toLocaleString("fr-FR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              {currency}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
