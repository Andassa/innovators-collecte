"use client"

interface DonationCardProps {
  name: string
  currency: string
  amount: number
  isConvertible: boolean
  exchangeRate?: number
  tag?: string
}

export function DonationCard({ name, currency, amount, isConvertible, exchangeRate = 1, tag }: DonationCardProps) {
  const convertedAmount = isConvertible ? Math.round((amount / exchangeRate) * 100) / 100 : amount
  const displayAmount = isConvertible ? convertedAmount : amount
  
  // Calculate a fake progress for visual effect (based on amount)
  const progress = Math.min(100, (displayAmount / 1000) * 100)

  return (
    <div className="bg-[#F3F2E7] rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Tag badge */}
      {tag && (
        <div className="p-4 pb-0">
          <span className="inline-block bg-[#009EFF] text-white text-xs font-bold uppercase px-4 py-2 rounded-full">
            {tag}
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="p-6 pt-4 space-y-4">
        <h3 className="font-[var(--font-rowdies)] text-2xl font-light text-[#3A1700] leading-tight">
          {name}
        </h3>

        {/* Amount display */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-medium text-[#3A1700]">
              {displayAmount.toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €
            </p>
            {isConvertible && (
              <p className="text-sm text-[#3A1700]/50 text-right">
                Objectif
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-2 bg-[#E6E4D6] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2FB0AB] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Original amount for convertible currencies */}
        {isConvertible && (
          <div className="pt-2">
            <p className="text-sm text-[#3A1700]/50">
              Original: {amount.toLocaleString("fr-FR")} {currency}
            </p>
          </div>
        )}

        {/* Donate button */}
        <button className="w-full bg-[#7E8AB8] text-white py-3 px-6 rounded-3xl font-[var(--font-rowdies)] text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
          Voir détails
        </button>
      </div>
    </div>
  )
}
