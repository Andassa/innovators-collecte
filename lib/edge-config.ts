// Default donation data structure
const defaultData = {
  cash: 0,
  orangeMoney: 0,
  airtelMoney: 0,
  mvola: 0,
  leetchi: 0,
  exchangeRate: 3650, // Ariary to Euro
  goal: 10000, // 10,000 EUR
}

export async function getDonationData() {
  try {
    // In a real implementation, this would fetch from Vercel Edge Config
    // For now, return default data with any stored data
    if (typeof window !== "undefined") {
      // Client-side fallback
      return defaultData
    }

    // Server-side: fetch from environment or storage
    const data = {
      cash: Number.parseInt(process.env.DONATION_CASH || "0"),
      orangeMoney: Number.parseInt(process.env.DONATION_ORANGE_MONEY || "0"),
      airtelMoney: Number.parseInt(process.env.DONATION_AIRTEL_MONEY || "0"),
      mvola: Number.parseInt(process.env.DONATION_MVOLA || "0"),
      leetchi: Number.parseFloat(process.env.DONATION_LEETCHI || "0"),
      exchangeRate: Number.parseFloat(process.env.EXCHANGE_RATE || "3650"),
      goal: Number.parseFloat(process.env.FUNDRAISING_GOAL || "10000"),
    }

    return data
  } catch (error) {
    console.error("Error fetching donation data:", error)
    return defaultData
  }
}
