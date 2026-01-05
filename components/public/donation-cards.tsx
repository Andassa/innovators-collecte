import { getDonationData } from "@/lib/edge-config"
import { DonationCard } from "@/components/public/donation-card"

export async function DonationCards() {
  const data = await getDonationData()

  const donations = [
    {
      id: "cash",
      name: "Cash",
      currency: "Ariary",
      amount: data.cash,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
    },
    {
      id: "orange-money",
      name: "Orange Money",
      currency: "Ariary",
      amount: data.orangeMoney,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
    },
    {
      id: "airtel-money",
      name: "Airtel Money",
      currency: "Ariary",
      amount: data.airtelMoney,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
    },
    {
      id: "mvola",
      name: "MVola",
      currency: "Ariary",
      amount: data.mvola,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
    },
    {
      id: "leetchi",
      name: "Leetchi",
      currency: "Euro",
      amount: data.leetchi,
      isConvertible: false,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Sources des Dons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {donations.map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>
      </div>
    </section>
  )
}
