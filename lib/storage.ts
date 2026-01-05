// Storage abstraction for donation data
// In a real production app with Edge Config, this would interface with the Edge Config API
// For now, we use environment variables as a fallback storage mechanism

const defaultData = {
  cash: 0,
  orangeMoney: 0,
  airtelMoney: 0,
  mvola: 0,
  leetchi: 0,
  exchangeRate: 3650,
  goal: 10000,
}

// In-memory storage (would be replaced with Edge Config in production)
let storedData = { ...defaultData }

export async function getDonationData() {
  // Load from environment variables (set by admin)
  const data = {
    cash: Number.parseInt(process.env.DONATION_CASH || "0"),
    orangeMoney: Number.parseInt(process.env.DONATION_ORANGE_MONEY || "0"),
    airtelMoney: Number.parseInt(process.env.DONATION_AIRTEL_MONEY || "0"),
    mvola: Number.parseInt(process.env.DONATION_MVOLA || "0"),
    leetchi: Number.parseFloat(process.env.DONATION_LEETCHI || "0"),
    exchangeRate: Number.parseFloat(process.env.EXCHANGE_RATE || "3650"),
    goal: Number.parseFloat(process.env.FUNDRAISING_GOAL || "10000"),
  }

  // Return stored data if available, otherwise return env data
  return Object.values(storedData).some((v) => v !== 0) ? storedData : data
}

export async function saveDonationData(data: {
  cash: number
  orangeMoney: number
  airtelMoney: number
  mvola: number
  leetchi: number
  exchangeRate: number
  goal: number
}) {
  // In a real app, this would write to Edge Config using the Vercel API
  // For now, we store in memory (persists during runtime)
  storedData = { ...data }

  // In production, you would do something like:
  // const response = await fetch('https://api.vercel.com/v1/edge-config/{id}', {
  //   method: 'PATCH',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.VERCEL_API_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     items: [
  //       { operation: 'upsert', key: 'donations', value: data }
  //     ]
  //   })
  // })

  return data
}
