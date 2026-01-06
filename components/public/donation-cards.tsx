import { getDonationData } from "@/lib/edge-config"
import { DonationCard } from "@/components/public/donation-card"

export async function DonationCards() {
  const data = await getDonationData()

  const donations = [
    {
      id: "cash",
      name: "Contributions en Cash",
      currency: "Ariary",
      amount: data.cash,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
      tag: "Cash",
    },
    {
      id: "orange-money",
      name: "Dons Orange Money",
      currency: "Ariary",
      amount: data.orangeMoney,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
      tag: "Mobile",
    },
    {
      id: "airtel-money",
      name: "Dons Airtel Money",
      currency: "Ariary",
      amount: data.airtelMoney,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
      tag: "Mobile",
    },
    {
      id: "mvola",
      name: "Dons MVola",
      currency: "Ariary",
      amount: data.mvola,
      isConvertible: true,
      exchangeRate: data.exchangeRate,
      tag: "Mobile",
    },
    {
      id: "leetchi",
      name: "Cagnotte Leetchi",
      currency: "Euro",
      amount: data.leetchi,
      isConvertible: false,
      tag: "Europe",
    },
  ]

  return (
    <section id="causes" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-rowdies)] text-base font-light tracking-[3px] uppercase text-[#009EFF] mb-4">
            Nos Causes
          </p>
          <h2 className="font-[var(--font-rowdies)] text-[40px] lg:text-[56px] font-light text-[#3A1700] tracking-[-2px]">
            Nos Sources de Dons
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.slice(0, 3).map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>
        
        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[800px] mx-auto">
          {donations.slice(3).map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button className="border border-[rgba(126,138,184,0.3)] text-[#7E8AB8] px-8 py-4 rounded-3xl font-[var(--font-rowdies)] text-sm uppercase tracking-wide hover:bg-[#7E8AB8] hover:text-white transition-all">
            Voir Tout
          </button>
        </div>
      </div>
    </section>
  )
}
